# Architecture Guide

> A reference for building consistent, performant React/Next.js applications for
> **BodyWorks** — a fitness exercise guide and workout routine library.
> Use this as a source of patterns and examples, not as a rigid rulebook.

---

## 1) Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + `tw-animate-css` |
| UI Primitives | Radix UI (`react-dropdown-menu`, `react-navigation-menu`, `react-slot`, `react-tooltip`) + shadcn/ui (New York style) |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 |
| URL state | nuqs |
| Forms | react-hook-form + Zod |
| HTTP | Axios |
| Icons | Lucide React, Tabler Icons, HugeIcons |
| Carousel | Embla |
| Toast | Sonner |
| Theme | next-themes |
| Animations | motion (framer-motion) |
| Markdown | react-markdown + remark-gfm |
| Video | react-player |

### Module alias

```json
// tsconfig.json
{ "paths": { "@/*": ["./src/*"] } }
```

All imports use `@/` — no relative path chains.

---

## 2) Top-Level Directory Layout

```
src/
  app/                 # Next.js routes, route groups, layouts, pages
  components/
    ui/                # Low-level primitives (Button, Card, Input, Skeleton, etc.)
    shared/            # Domain-agnostic reusable components (ExerciseCard, Navbar, Footer, etc.)
  features/            # Domain modules (auth, exercises, routines, tracker, etc.)
  hooks/               # Cross-feature custom hooks (useError, useQueryErrorHandler, useDevice)
  lib/                 # Infrastructure (api-caller, error, query-client, utils)
  providers/           # React context providers (app-providers, theme-provider)
  constants.ts         # App-wide constants (siteUrl, PAGE_LIMIT)
  middleware.ts         # Cookie-based route protection
```

### Architecture layers (bottom to top)

```
4. Routing/Layout  ──  src/app (route groups, layouts, pages)
3. Feature layer   ──  src/features/* (components, services, types, store, constants)
2. Shared layer    ──  src/components, hooks, lib, providers
1. Styling layer   ──  src/app/globals.css (Tailwind v4 @theme tokens)
```

**Data flow**: Route → Page (server prefetch) → HydrationBoundary → Feature component → React Query
hook → Fetcher → API caller → API

---

## 3) Feature Module Convention

Every domain is self-contained. This is the single most important pattern.

### Directory anatomy

```
src/features/<feature>/
  components/     # Feature UI (page clients, sections, cards)
  services/       # API calls + React Query hooks
  types/          # DTOs, payloads, response contracts
  constants.ts    # Feature constants (optional)
  store/          # Zustand store (only when feature-local state needed)
```

### Actual features

| Feature | Purpose | Services |
|---------|---------|----------|
| `auth` | Login, register, logout, session | `use-login`, `use-register`, `use-logout` |
| `body-parts` | Browse and filter by body part | `use-get-body-parts`, `use-get-body-part` |
| `dashboard` | User stats, BMI, goals | `use-get-dashboard-stats` |
| `equipments` | Browse exercises by equipment | `use-get-equipments`, `use-get-equipment` |
| `exercises` | Exercise catalog with search/pagination | `use-get-exercises`, `use-get-exercise` |
| `home` | Landing page sections (hero, features, FAQ) | _(static content, no API)_ |
| `profile` | User profile view and edit | `use-get-profile`, `use-patch-profile`, `use-patch-settings` |
| `routines` | Workout routine library | `use-get-routines`, `use-get-routine`, `use-get-routines-filter` |
| `target-muscles` | Browse by target muscle | `use-get-target-muscles`, `use-get-target-muscle` |
| `tracker` | Body stats tracking (weight, etc.) | `use-get-tracker-entries`, `use-post-body-stat` |

### Example feature layout

```
features/exercises/
  components/
    exercise-client.tsx
    exercise-header.tsx
    exercises-client.tsx
  services/
    use-get-exercise.tsx
    use-get-exercises.tsx
  types/
    index.ts
```

```
features/auth/
  components/
    brand-header.tsx
    login-client.tsx
    register-client.tsx
  constants.ts
  services/
    use-login.tsx
    use-logout.tsx
    use-register.tsx
  store/
    use-auth-store.ts
  types/
    index.ts
```

---

## 4) Service File Patterns

### Pattern A — Query hook

Each service file exports: query keys, a standalone fetcher, and a React Query hook.

```typescript
// src/features/exercises/services/use-get-exercises.tsx
import type { IExerciseData } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// 1) Query key — simple array for cache identity
export const exercisesQueryKey = (limit: number, page: number, search?: string) => [
  'exercises', limit, page, search,
];

// 2) Fetcher — exported for SSR prefetch in Server Components
export const getExercises = async (
  limit: number, page: number, search?: string,
): Promise<IExerciseData> => {
  const exercises = await publicApiCaller.get<IExerciseData>('/exercises', {
    params: { limit, page, search },
  });
  return exercises.data;
};

// 3) Hook — wires query key + fetcher + options
export const useExercises = (limit = 9, page = 1, search?: string) => {
  return useQuery({
    queryKey: exercisesQueryKey(limit, page, search),
    queryFn: () => getExercises(limit, page, search),
    placeholderData: keepPreviousData,
  });
};
```

**Key points**:
- Fetcher takes individual positional parameters, not a single payload object
- Fetcher is *separate* from the hook so it can be called in Server Components for prefetch
- `keepPreviousData` (v5 `placeholderData` from `@tanstack/react-query`) shows stale data during refetches
- Query keys are simple arrays; some features use `as const` tuples for structured keys (see below)

### Alternative — query keys with `as const`

For features with multiple key variants, an object pattern is used:

```typescript
// src/features/tracker/services/use-get-tracker-entries.tsx
export const trackerEntriesQueryKeys = {
  all: ['tracker-entries'] as const,
  list: (page: number, limit: number) => ['tracker-entries', page, limit] as const,
};
```

### Pattern B — Mutation hook

```typescript
// src/features/auth/services/use-login.tsx
import { useAuthStore } from '@/features/auth/store/use-auth-store';
import type { IAuthUser, ILoginCredentials } from '@/features/auth/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const authQueryKeys = {
  all: ['auth'] as const,
};

export const loginUser = async (credentials: ILoginCredentials): Promise<IAuthUser> => {
  const response = await publicApiCaller.post<{ data: IAuthUser }>('auth/login', credentials);
  return response.data.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (user) => {
      useAuthStore.getState().setSession(user);
      Cookies.set('accessToken', user.accessToken, { expires: 7 });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
```

**Key points**:
- Mutation hooks are zero-argument factories — payload is passed when `mutate()` is called
- `onSuccess` uses `getState()` to imperatively update Zustand stores
- Cross-feature invalidation in `onSuccess` to refresh affected cache keys

### Service file — convention summary

Every service file exports:
1. **Query keys** — a function or object (`exercisesQueryKey(...)`, `trackerEntriesQueryKeys`)
2. **Fetcher** — exported standalone function (`getExercises`, `loginUser`, `createBodyStat`)
3. **Hook** — React Query hook (`useExercises`, `useLogin`, `useCreateBodyStat`)

---

## 5) Component Patterns

### A. UI Primitives (`src/components/ui/`)

Low-level, generic components built on Radix primitives + `class-variance-authority` (CVA) for variants.
Follow the standard shadcn/ui pattern.

```typescript
// src/components/ui/button.tsx
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
export { Button, buttonVariants };
```

**Key points**:
- `cva` for variant/size props
- `Slot` from Radix for `asChild` polymorphic composition
- `cn()` from `tailwind-merge` + `clsx` for safe class merging
- Both component and `buttonVariants` are exported

### Full list of UI primitives

`3d-card`, `accordion`, `avatar`, `badge`, `box-reveal`, `button`, `card`, `carousel`, `checkbox`,
`drawer`, `dropdown-menu`, `floating-dock`, `form`, `infinite-moving-cards`, `input`, `label`,
`navigation-menu`, `pagination`, `progress`, `select`, `skeleton`, `sonner`, `tooltip`

### B. Shared Components (`src/components/shared/`)

Domain-agnostic but specific to a data concept or layout. Used by multiple features.

| Component | Purpose |
|-----------|---------|
| `custom-spinner` | Loading spinner |
| `data-loading-skeleton` | Skeleton loader for data pages |
| `descripted-card` | Card with title, description, and image |
| `exercise-card` | Exercise display card |
| `filter-section` | Filter UI section |
| `footer`, `footer-navbar` | Site footer + mobile footer nav |
| `form-error` | Form error display |
| `hint` | Tooltip/hint component |
| `mode-toggle` | Dark/light mode toggle |
| `navbar`, `navbar-data`, `desktop-navigation-menu` | Main navigation |
| `pagination-provider` | Pagination state/HOC |
| `routine-card` | Routine display card |
| `search-bar` | Search input with debounce |
| `testimonial-card` | Testimonial display |
| `with-filtered-exercises-client` | HOC for filtered exercises |
| `with-taxonomy-cards-client` | HOC for taxonomy cards |
| `workout-summary-table` | Workout summary table |

**Placement guide**:

| If the component... | Put it in |
|---------------------|-----------|
| Is a low-level HTML wrapper | `src/components/ui/` |
| Is a reusable domain card (used by 2+ features) | `src/components/shared/` |
| Is only meaningful to one feature | `src/features/<feature>/components/` |

### C. Feature Components

Full page sections that compose UI primitives, shared components, and data hooks.

```typescript
// src/features/exercises/components/exercises-client.tsx
'use client';

import { DataLoadingSkeleton } from '@/components/shared/data-loading-skeleton';
import { DescriptedCard } from '@/components/shared/descripted-card';
import { PaginationProvider } from '@/components/shared/pagination-provider';
import { SearchBar } from '@/components/shared/search-bar';
import { useExercises } from '@/features/exercises/services/use-get-exercises';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { useDebounce } from '@uidotdev/usehooks';
import { useQueryState } from 'nuqs';

export const ExercisesClient = () => {
  const [page] = useQueryState('page', { defaultValue: '1' });
  const [searchQuery] = useQueryState('search');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const pageNumber = Number(page) || 1;

  const { isLoading, data: exercises, error, refetch, isRefetching } = useExercises(
    9, pageNumber, debouncedSearchQuery ?? undefined,
  );

  useQueryErrorHandler(error, refetch);

  return (
    <>
      <SearchBar />
      {isLoading || isRefetching ? (
        <DataLoadingSkeleton />
      ) : exercises && exercises.data.length > 0 ? (
        <div className='h-full w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
          {exercises.data.map((exercise) => (
            <DescriptedCard key={exercise.id_} id={exercise.id_} gif={exercise.gifUrl}
              title={exercise.title} blog={exercise.blog} />
          ))}
        </div>
      ) : (
        <h1 className='mt-20 text-center text-2xl font-bold'>
          No exercises found.
        </h1>
      )}
      {exercises && exercises.data.length > 0 && (
        <PaginationProvider currentPage={pageNumber} totalPages={exercises.totalPages} />
      )}
    </>
  );
};
```

### D. shadcn/ui Compound Form Pattern (`src/components/ui/form.tsx`)

The project uses the shadcn/ui Form component, which follows a **compound component pattern** built on
top of `react-hook-form`. Each sub-component is a standalone named export that reads form state via
React Context.

```typescript
// src/components/ui/form.tsx — shadcn/ui form compound components

// Exports: Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField
//
// Each sub-component is independently importable and works together via shared context:
//   Form (FormProvider) wraps the entire form
//   FormField wraps Controller + FormFieldContext
//   FormItem / FormLabel / FormControl / FormDescription / FormMessage read via useFormField()
//
// Usage with react-hook-form + Zod:
//
// const form = useForm<LoginFormValues>({
//   resolver: zodResolver(loginFormSchema),
//   defaultValues: { email: '', password: '', rememberMe: false },
// });
//
// <Form {...form}>
//   <form onSubmit={form.handleSubmit(onSubmit)}>
//     <FormField control={form.control} name="email"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Email</FormLabel>
//           <FormControl>
//             <Input placeholder="email@example.com" {...field} />
//           </FormControl>
//           <FormMessage />   {/* renders error message from Zod validation */}
//         </FormItem>
//       )}
//     />
//     <Button type="submit">Login</Button>
//   </form>
// </Form>
```

**Key points**:
- Composes `react-hook-form`'s `FormProvider`, `Controller`, and `useFormContext`
- Uses `data-slot` attributes for parent-child CSS selectors
- `FormMessage` returns `null` early when there's no error (no empty DOM nodes)
- `FormDescription` renders helper text below input fields
- `FormControl` uses Radix `Slot` to forward `id` and `aria-*` to child inputs

**Available shadcn/ui primitives in the project**:
`accordion`, `avatar`, `badge`, `button`, `card`, `carousel`, `checkbox`, `drawer`, `dropdown-menu`,
`form`, `input`, `label`, `navigation-menu`, `pagination`, `progress`, `select`, `skeleton`, `sonner`,
`tooltip` — plus custom ones: `3d-card`, `box-reveal`, `floating-dock`, `infinite-moving-cards`

### E. State Components

For reusable empty/error/loading states, prefer a dedicated component per feature:

```typescript
// Pattern: <feature>-section-state.tsx
// Handles three states:
// 1. Error + refetch button
// 2. Empty data with custom message
// 3. Loading skeleton

// Usage in page clients:
// if (isLoading) return <ExercisesSkeleton />;
// if (error) return <ExercisesSectionState error={error} refetch={refetch} />;
// if (!exercises?.data.length) return <ExercisesSectionState emptyMessage="No exercises found." />;
```

### F. Memoized Feature Components

List/row components used in `.map()` loops should be wrapped in `memo` to prevent unnecessary re-renders. Use the named export pattern with `displayName`:

```typescript
// src/features/tracker/components/history-row.tsx
import { getBodyFatAssessment } from '@/features/tracker/lib/utils';
import type { IBodyStatEntry } from '@/features/tracker/types';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export type HistoryRowProps = {
  entry: IBodyStatEntry;
  index: number;
};

export const HistoryRow = memo(({ entry, index }: HistoryRowProps) => {
  const date = new Date(entry.loggedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const { label: assessment, colorClass } = getBodyFatAssessment(entry.bodyFatPct);

  return (
    <div className={cn('...', index !== 0 && 'border-t ...')}>
      <span>{date}</span>
      {/* ... */}
    </div>
  );
});

HistoryRow.displayName = 'HistoryRow';
```

**Conventions**:
- Import `memo` directly: `import { memo } from 'react'` (not `React.memo`)
- Named export: `export const ComponentName = memo(...)`
- Props type co-located and exported: `export type ComponentNameProps = { ... }`
- Set `displayName` after the component for better DevTools debugging
- Props type uses `export type` (not `export interface`) following the `I` prefix convention for interfaces only

**About `'use client'`**: Use it on feature components that need hooks, state, or browser APIs.
Leave page components as Server Components, delegating interactivity to feature components.

---

## 6) Hooks Patterns

### `src/hooks/` — Cross-feature hooks

Only used for logic spanning multiple features or generic concerns.

| Hook | Purpose |
|------|---------|
| `use-error` | Toast-based error handler with retry support |
| `use-query-error-handler` | Wraps `useEffect` to surface query errors as toasts |
| `use-device` | Responsive breakpoint detection using `matchMedia` |

### When to place a hook in `src/hooks/`

A hook belongs in `src/hooks/` when it orchestrates **multiple stores, services, or router concerns** —
especially across feature boundaries. Examples:

- Auth-related routing decisions (`useAuth` → redirect)
- Combining query data from two features (`useDashboard` that joins stats + profile)
- Generic utilities that use React APIs (`useDevice`, `useDebounce`)

If a hook is tightly coupled to one feature's data, colocate it in the feature's component file or as
a helper hook in `features/<feature>/hooks/`.

```typescript
// src/hooks/use-error.ts
'use client';

import { resolveError } from '@/lib/error';
import { useCallback } from 'react';
import { toast } from 'sonner';

export const useError = () => {
  const handleError = useCallback((error: unknown, options = {}) => {
    const appError = resolveError(error, options.fallbackMessage);
    toast.error(options.title ?? 'Uh oh! Something went wrong.', {
      description: appError.message,
      action: options.retry
        ? { label: options.retryLabel ?? 'Retry', onClick: () => void options.retry?.() }
        : undefined,
    });
    return appError;
  }, []);

  const handleQueryError = useCallback((error, refetch, fallbackMessage?) => {
    return handleError(error, { fallbackMessage, retry: refetch, retryLabel: 'Refetch' });
  }, [handleError]);

  return { handleError, handleQueryError };
};
```

```typescript
// src/hooks/use-query-error-handler.tsx
import { useError } from '@/hooks/use-error';
import { useEffect } from 'react';

export function useQueryErrorHandler(error: unknown, refetch?: () => void) {
  const { handleQueryError } = useError();
  useEffect(() => {
    if (error) handleQueryError(error, refetch);
  }, [error, refetch, handleQueryError]);
}
```

---

## 7) Store Patterns (Zustand)

### Feature-local store

The only Zustand store in the project is the auth store, kept at the feature level:

```typescript
// src/features/auth/store/use-auth-store.ts
import type { IUser } from '@/features/auth/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  setSession: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setSession: (user) => set({ user, isAuthenticated: true }),
      updateUser: (user) => set({ user }),
      clearSession: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'bw-auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

### Store conventions

| Concern | Pattern |
|---------|---------|
| Accessing state in component | `useAuthStore((state) => state.isAuthenticated)` (selective subscription) |
| Reading outside React | `useAuthStore.getState().setSession(...)` |
| Persist to localStorage | `persist` middleware with `createJSONStorage(() => localStorage)` |
| Feature-local store | Keep in `features/<name>/store/` |
| Global store | If needed later, create `src/store/` |

---

## 8) Type Patterns

### Naming convention — `I` prefix

All interface types use the `I` prefix:

```typescript
// src/features/exercises/types/index.ts
export interface IExercise {
  name: string;
  title: string;
  target: string;
  muscles_worked: string;
  bodyPart: string;
  equipment: string;
  id: string;
  id_: string;
  blog: string;
  images: string[];
  gifUrl: string;
  videos: string[];
  keywords: string[];
}

export interface IExerciseData {
  totalExercises: number;
  totalPages: number;
  data: IExercise[];
}
```

```typescript
// src/features/auth/types/index.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}
```

### Type placement guide

- Feature types → `src/features/<feature>/types/index.ts`
- Use `interface` for object shapes; use `type` when union/intersection is needed
- Payload types (request) and response types are colocated in the same file

### API response patterns

The backend doesn't use a uniform envelope. Each feature defines its own response shape, but they
follow consistent conventions:

| Response type | Shape |
|---------------|-------|
| **List with pagination** | `{ data: T[], totalPages: number, totalXxx: number }` |
| **List with count** | `{ data: T[], total: number, totalPages: number, page: number }` |
| **Single entity** | `{ data: T }` |

```typescript
// List response example (exercises)
export interface IExerciseData {
  totalExercises: number;
  totalPages: number;
  data: IExercise[];
}

// Paginated list response (tracker)
export interface IBodyStatsResponse {
  data: IBodyStatEntry[];
  count: number;
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

// Single entity response (profile)
export interface IProfileResponse {
  data: IUserProfile;
}
```

**Pattern**: The fetcher function transforms the raw API response into the domain-specific shape,
so hooks consume a clean, predictable type rather than the raw Axios response.

---

## 9) Constants Patterns

### App-level constants

```typescript
// src/constants.ts
export const siteUrl = 'https://bodyworks.akshatjaiswal.me';
export const PAGE_LIMIT = 9;
export const PAGE_SIZE = 1;
```

### Feature constants

```typescript
// src/features/auth/constants.ts
export const AUTH_ACCESS_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const AUTH_USER_KEY = 'user';
```

```typescript
// src/features/home/constants.ts
export const faqs = [
  { question: 'How many exercises are available on BodyWorks?',
    answer: 'BodyWorks features over 1300 exercises covering all major muscle groups and fitness levels.' },
  { question: 'Can I filter exercises by body parts?',
    answer: 'Yes, you can filter exercises by 10+ body parts, 20+ target muscles, and 30+ equipment types.' },
  // ...
];
```

### URL parameter constants

URL params used with nuqs `useQueryState` are defined at the point of use:

```typescript
const [page] = useQueryState('page', { defaultValue: '1' });
const [searchQuery] = useQueryState('search');
const [bodyPart] = useQueryState('bodyPart');
```

---

## 10) Utils Patterns

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeDecode = (value?: string) => {
  if (!value) return undefined;
  try { return decodeURIComponent(value); }
  catch { return value; }
};

export const toTitleCase = (value: string) => {
  return value.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
```

---

## 11) API Caller Pattern

```typescript
// src/lib/api-caller.ts
```

Two Axios instances, created via factory functions:

| Instance | Purpose | Auth |
|----------|---------|------|
| `publicApiCaller` | Unauthenticated endpoints (login, register, public catalog) | None |
| `privateApiCaller` | Authenticated endpoints (dashboard, profile, tracker) | Bearer token from `js-cookie` |

### Private API caller features:
- **Server-side cookie forwarding**: On the server, reads cookies via `next/headers` and forwards them
- **401 interception**: On first 401, performs a single-flight token refresh and retries the request
- **Shared in-flight promise**: Prevents concurrent refresh races
- **Force logout**: If refresh fails, calls `useAuthStore.getState().clearSession()`

### Base URL resolution:
- Client-side: uses `NEXT_PUBLIC_API_BASE_URL` or falls back to relative `/api/`
- Server-side: uses `API_URL` or falls back to the production API URL

**Rules**:
- Never use `axios.create()` directly in components
- Always use `publicApiCaller` or `privateApiCaller`

---

## 12) Provider Patterns

```typescript
// src/providers/app-providers.tsx
'use client';
import { ThemeProvider } from '@/providers/theme-provider';
import { getQueryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const ReactQueryDevtools = process.env.NODE_ENV === 'development'
  ? dynamic(() => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools), { ssr: false })
  : () => null;

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <NuqsAdapter>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem enableColorScheme>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
```

**Provider hierarchy**: `NuqsAdapter` > `ThemeProvider` > `QueryClientProvider` > Devtools

### Theme provider wrapper

```typescript
// src/providers/theme-provider.tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

## 13) Query Client (SSR-safe singleton)

```typescript
// src/lib/query-client.ts
import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};
```

**Key points**:
- New `QueryClient` per request on the server (prevents cross-request data leaks)
- Lazy singleton on the client
- 60s default `staleTime`

---

## 14) Next.js Page Patterns

### A. SSR data prefetching with HydrationBoundary

The preferred pattern for list/catalog pages:

```typescript
// src/app/(core)/exercises/page.tsx
import { ExercisesClient } from '@/features/exercises/components/exercises-client';
import { exercisesQueryKey, getExercises } from '@/features/exercises/services/use-get-exercises';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ExercisesPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const queryClient = new QueryClient();
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

  // Prefetch current page + next page for instant navigation
  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(9, pageNumber),
    queryFn: () => getExercises(9, pageNumber),
  });
  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(9, pageNumber + 1),
    queryFn: () => getExercises(9, pageNumber + 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExercisesClient />
    </HydrationBoundary>
  );
};

export default ExercisesPage;
```

### B. Thin page delegating to client component

For pages that don't need SSR prefetch:

```typescript
// src/app/(core)/profile/page.tsx
import { ProfileClient } from '@/features/profile/components/profile-client';

export default function ProfilePage() {
  return <ProfileClient />;
}
```

### C. Root layout with full SEO metadata

```typescript
// src/app/layout.tsx
// - Fonts: Urbanist, Poppins, Montserrat
// - Metadata: title template, description, keywords, OpenGraph, Twitter cards
// - JSON-LD structured data (WebSite, WebApplication, Organization)
// - Providers wrapper
// - Navbar + Footer
// - Vercel Analytics + Speed Insights
// - Toaster (Sonner)
```

### D. Server-side redirect pattern

When a page conditionally redirects based on fetched data, use the redirect from `next/navigation`:

```typescript
// src/app/(core)/profile/page.tsx
import { getProfile } from '@/features/profile/services/use-get-profile';
import { ProfileClient } from '@/features/profile/components/profile-client';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  try {
    const profile = await getProfile();
    return <ProfileClient profile={profile} />;
  } catch {
    redirect('/login');
  }
}
```

### E. Infinite query prefetch (when needed)

For true infinite-scroll pages that benefit from SSR:

```typescript
// Server component
const queryClient = new QueryClient();

await queryClient.prefetchInfiniteQuery({
  queryKey: exercisesQueryKey(9, 1),
  queryFn: () => getExercises(9, 1),
  initialPageParam: 1,
});

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <ExercisesClient />
  </HydrationBoundary>
);
```

---

## 15) Route Groups

```
src/app/
  layout.tsx              # Root: fonts, metadata, JSON-LD, providers, Navbar, Footer, Toaster
  globals.css             # Tailwind v4 @theme + custom properties + utility classes
  page.tsx                # Homepage (/) — hero, features, testimonials, FAQ
  (core)/                 # Route group: navigation wrapper with navbar-offset spacing
    layout.tsx            # Container wrapper with mt-[calc(var(--navbar-height)+2rem)]
    body-parts/
      page.tsx            # /body-parts
      [body-part]/page.tsx  # /body-parts/[body-part]
    dashboard/page.tsx    # /dashboard (auth required)
    equipments/
      page.tsx            # /equipments
      [equipment]/page.tsx  # /equipments/[equipment]
    exercises/
      page.tsx            # /exercises
      [exercise-id]/page.tsx  # /exercises/[exercise-id]
    profile/page.tsx      # /profile (auth required)
    routine-category/page.tsx  # /routine-category
    routines/
      page.tsx            # /routines
      [routine]/page.tsx  # /routines/[routine]
    target-muscles/
      page.tsx            # /target-muscles
      [target-muscle]/page.tsx  # /target-muscles/[target-muscle]
    tracker/page.tsx      # /tracker (auth required)
  login/page.tsx          # /login
  register/page.tsx       # /register
  robots.ts               # robots.txt config
  sitemap.ts              # Dynamic sitemap generation
  global-error.tsx        # Global error boundary ('use client')
  not-found.tsx           # 404 page
```

### Layout composition

- **Root layout** → global CSS, fonts, `<Providers>`, `<Navbar>`, `<main>`, `<Footer>`, `<Toaster>`
- **(core) layout** → container wrapper with navbar-offset top margin, wraps children in `<main>`

---

## 16) Middleware / Route Protection

```typescript
// src/middleware.ts
```

Cookie-based auth guarding (no i18n middleware):

- **Public paths**: `/`, `/login`, `/register`, `/exercises`, `/routines`, `/routine-category`,
  `/target-muscles`, `/equipments`, `/body-parts` (and sub-routes)
- **Auth check**: Looks for `accessToken` or `refreshToken` cookies
- **Unauthenticated → private route**: Redirects to `/login?next=<original-url>`
- **Authenticated → login/register**: Redirects to `/dashboard`
- **Matcher**: Excludes `api`, `_next`, `_vercel`, `favicon.ico`, static assets (images, CSS, JS)

---

## 17) SEO Patterns

### Metadata (root layout)

The root layout defines comprehensive metadata:
- `title.template: '%s | BodyWorks'` with a default
- `description`, `keywords`, `openGraph`, `twitter` cards
- `robots: { index: true, follow: true }`
- `metadataBase` pointing to production URL
- JSON-LD structured data: `WebSite` (with SearchAction), `WebApplication`, `Organization`

### Per-page metadata

Pages that need custom metadata export their own `generateMetadata` or `metadata` object following
Next.js conventions.

### robots.ts

```typescript
// src/app/robots.ts — allows all, links to sitemap.xml
```

### sitemap.ts

```typescript
// src/app/sitemap.ts — dynamic sitemap
```
Fetches all exercises, body parts, equipments, target muscles from the API and generates individual
pages. Uses `Promise.all()` for parallel fetching. Static routes (`/`, `/exercises`, `/routines`, etc.)
hardcoded with appropriate priorities.

---

## 18) State Management Summary

| Concern | Tool | Location |
|---------|------|----------|
| Server data | TanStack Query | `src/features/*/services/` |
| Client state | Zustand | `src/features/auth/store/` |
| URL state | nuqs (`useQueryState`) | Feature components |
| Form state | react-hook-form + Zod | Inline in feature components |
| Theme state | next-themes | `src/providers/theme-provider.tsx` |

### Server state rules

- TanStack Query is the source of truth for remote data
- SSR prefetch + `HydrationBoundary` for list/catalog routes
- `getQueryClient()` returns SSR-safe singleton
- Default config: `staleTime: 60s`
- `keepPreviousData` for smooth pagination/filter transitions

### Client state rules

- Zustand for session/auth state
- `persist` middleware with localStorage
- `createJSONStorage(() => localStorage)` for SSR safety
- `useStore((state) => state.specificKey)` for selective subscription
- `.getState()` for imperative reads outside React (mutations, api-caller)

### URL state rules

- nuqs for query-string sync (search params, pagination, filters)
- `useQueryState` in feature client components
- `useDebounce` (`@uidotdev/usehooks`) for search input debouncing

---

## 19) Error Handling

```typescript
// src/lib/error.ts
```

- `AppError` class with `statusCode` and `retryable` fields
- `resolveError()` extracts messages from: `AppError` → `string` → `AxiosError` (detail/message/error
  field extraction) → `Error` → fallback
- Axios error detection: network errors, timeouts, and 5xx are marked `retryable`
- `useError` hook surfaces errors as Sonner toasts with optional Retry action
- `useQueryErrorHandler` wraps query errors into toasts via `useEffect`

---

## 20) Vercel React Best Practices

Patterns to follow from [Vercel React Best Practices](https://vercel.com/blog/react-performance):

### Critical (always apply)

| Rule | How we apply it |
|------|----------------|
| `async-parallel` | Use `Promise.all()` for independent fetches on server pages (see `sitemap.ts`) |
| `bundle-barrel-imports` | Import directly (`@/components/ui/button`), never from barrel `index.ts` files |
| `bundle-dynamic-imports` | Use `next/dynamic` for heavy components (ReactQueryDevtools, react-player) |
| `async-suspense-boundaries` | Wrap page content in `<Suspense>` with skeleton fallbacks where beneficial |
| `async-defer-await` | Only `await` where data is actually used, not at the top of the component |

### High (always apply)

| Rule | How we apply it |
|------|----------------|
| `server-cache-react` | Use `React.cache()` for per-request deduplication in data fetching |
| `server-parallel-fetching` | Restructure server components to fetch data in parallel with `Promise.all` |
| `server-serialization` | Minimize data passed to client components — only send what's rendered |
| `server-hoist-static-io` | Static data (fonts, FAQ items, mock data) at module level, not in components |

### Medium (apply when relevant)

| Rule | How we apply it |
|------|----------------|
| `rerender-memo` | `memo()` on shared card/list components — see [§5-F](#f-memoized-feature-components) |
| `rerender-no-inline-components` | Never define components inside render functions or other components |
| `rerender-derived-state` | Derive during render (`useMemo`), not in effects |
| `rerender-functional-setstate` | Use functional updater in Zustand `set()` callbacks |
| `rerender-transitions` | Use `startTransition` for non-urgent UI updates (tab switches, filter changes) |
| `rerender-lazy-state-init` | Pass factory function to `useState(() => expensiveComputation())` |
| `rendering-conditional-render` | Use ternary, not `&&`, for conditional rendering |

### Low (nice to have)

| Rule | How we apply it |
|------|----------------|
| `js-early-exit` | Return early for null/undefined/empty cases |
| `js-hoist-regexp` | Hoist RegExp creation outside functions/loops |
| `js-index-maps` | Build `Map` for O(1) lookups instead of `Array.find()` in hot paths |
| `advanced-init-once` | Singleton initialization (query client via `getQueryClient()`, API caller) |

---

## 21) Naming Conventions

| What | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `use-get-exercises.tsx`, `exercises-client.tsx` |
| Components | PascalCase | `ExercisesClient`, `Button`, `ExerciseCard` |
| Hooks | `useXxx` | `useExercises`, `useError` |
| Query keys | `<feature>QueryKey(...)` or `<feature>QueryKeys` | `exercisesQueryKey(...)`, `trackerEntriesQueryKeys.all` |
| Fetchers | `camelCase` verb-noun | `getExercises`, `loginUser`, `createBodyStat` |
| Query hooks | `useXxx` | `useExercises`, `useTrackerEntries` |
| Mutation hooks | `use<Verb><Noun>` | `useLogin`, `useUpdateProfile`, `useCreateBodyStat` |
| Stores | `use<Name>Store` | `useAuthStore` |
| Types (interfaces) | `I` prefix + PascalCase | `IUser`, `IExercise`, `ILoginCredentials` |
| Constants | UPPER_SNAKE_CASE | `AUTH_ACCESS_TOKEN_KEY`, `PAGE_LIMIT` |
| Utils | camelCase | `cn`, `safeDecode`, `toTitleCase` |
| Imports | `@/*` alias | `import { Button } from '@/components/ui/button'` |

---

## 22) File-Level Conventions

### One file, one purpose

| File should contain | Rule |
|---------------------|------|
| **Components** | One exported component per file. Never define two components in the same file. If a component has internal sub-parts that aren't reused elsewhere, define them as private functions in the same module. |
| **Service hooks** | One query or one mutation per file. Each file has a single job: either fetching data (query) or changing data (mutation). This keeps dependencies clear and testable. |
| **Types** | One `index.ts` per feature. Colocate all payload, response, and domain model types for a feature in one file. Only split into separate files if the type surface grows large (>100 lines). |

### Where to place files

| You're creating... | Place it in... |
|---------------------|----------------|
| A shared UI primitive (Button, Input, Card) | `src/components/ui/` |
| A domain-agnostic reusable component (ExerciseCard, SearchBar) | `src/components/shared/` |
| A component specific to one feature | `src/features/<feature>/components/` |
| An API call + React Query hook | `src/features/<feature>/services/` |
| Types for a feature | `src/features/<feature>/types/index.ts` |
| A Zod schema or form config | `src/features/<feature>/lib/` or colocate in the service file |
| A Zustand store used across features | `src/store/` (create directory) |
| A Zustand store for one feature | `src/features/<feature>/store/` |
| A cross-feature hook (involves 2+ features or generic) | `src/hooks/` |
| A utility function used across the app | `src/lib/` |
| A feature-specific pure utility | `src/features/<feature>/utils.ts` |
| App-wide constants | `src/constants.ts` |
| Feature-specific constants | `src/features/<feature>/constants.ts` |
| A page route | `src/app/.../page.tsx` |
| A route group layout | `src/app/(group)/layout.tsx` |

### When you need a small local component

If a component is only used inside one feature page component, keep it in `features/<feature>/components/`. Don't extract to `shared/` until a second feature needs it.

### When you need a reactive utility

If a utility needs React hooks (`useState`, `useEffect`, `useCallback`), it's a custom hook. Put it in `src/hooks/` if it's cross-feature, or colocate in the component file if it's trivial and only used there.

### When you need a shared Zod schema

```typescript
// src/features/auth/lib/login-form-schema.ts
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
```

---

## 23) Practical Guardrails

- **Do not** bypass `src/lib/api-caller.ts` for HTTP calls
- **Do not** use `axios.create()` directly in components or services
- **Do not** place domain business logic inside `src/components/ui` primitives
- **Do not** define components inside other components (re-render perf issue)
- **Do not** put two exported components in one file
- **Do not** put a query and a mutation in the same service file
- **Do not** use `index.ts` barrel files in features/components — import directly from the file
- **Do not** use enums — prefer string literal unions or `as const` objects
- **Do not** place feature-specific logic in hooks outside the feature unless it needs cross-feature orchestration
- **Prefer** feature-level types/services before writing large page components
- **Keep** route-level pages focused on composition, prefetch, and layout wiring
- **Use** `privateApiCaller` for authenticated endpoints, `publicApiCaller` for public ones
- **Always** use `@/*` alias for imports — no relative path chains
- **Always** handle null/undefined in utils with fallbacks (not crashes)
- **Always** add routes to `PUBLIC_PATHS` in middleware if unauthenticated users should access them
- **Always** update `sitemap.ts` when adding new publicly accessible routes
- **Always** use React Server Components for SEO-critical content (metadata, layouts, static data)
- **Always** return `null` early from components when there's nothing to render (no empty wrapper divs)

---

## 24) New Feature — Golden Path

1. Create `src/features/<feature>/types/index.ts` — define interfaces with `I` prefix
2. Add service files in `services/` — query keys + fetcher + hook
3. Build UI in `components/` — compose from `src/components/ui` and `src/components/shared`
4. Add route page in `src/app/.../page.tsx` — server component, prefetch + delegate to feature
5. Wire mutations with `onSuccess` invalidation of affected query keys
6. If route is public, add to `PUBLIC_PATHS` in middleware and update `sitemap.ts`

---

*This guide is a living reference. When you find a better pattern or add a new pattern from Vercel
best practices, update it.*
