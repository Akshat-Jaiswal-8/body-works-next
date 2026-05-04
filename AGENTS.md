# AI Assistant Instructions

Always adhere to the architectural patterns, directory structure, conventions, and rendering
strategies outlined in `docs/architecture.md`.

## Key Architectural Rules:

1. **Feature-Driven Architecture**: Place all domain-specific logic in
   `src/features/[feature-name]/` (structured internally with `components/`, `services/`, `types/`).
2. **Routing & Pages**: Use Next.js App Router in `src/app/`. Keep page components thin and delegate
   complex UI and data fetching logic to feature components.
3. **Generic Components**: Place shared, reusable UI components in `src/components/` or
   `src/components/ui/`.
4. **Rendering Strategy**: Use React Server Components (RSC) by default for layouts and SEO-critical
   content. Use the `'use client';` directive only when necessary for state, hooks, browser APIs, or
   interactive data fetching.
5. **Data Fetching**: Use `@tanstack/react-query` in client components for interactive data
   fetching. Keep previous data for smooth transitions (`placeholderData: keepPreviousData`).
6. **SEO**: Implement static/dynamic metadata, update `robots.ts` and `sitemap.ts` when adding new
   public routes, and use semantic HTML.
7. **Naming Conventions**: Use `kebab-case` for all files and directories.

If in doubt about where to place a file or how to structure a component, read `docs/architecture.md`
for comprehensive guidelines.
