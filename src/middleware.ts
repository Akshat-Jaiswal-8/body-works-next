import { AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '@/features/auth/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/exercises',
  '/routines',
  '/routine-category',
  '/target-muscles',
  '/equipments',
  '/body-parts',
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/'),
  );

  const accessToken = request.cookies.get(AUTH_ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(AUTH_REFRESH_TOKEN_KEY)?.value;
  const hasSessionToken = Boolean(accessToken || refreshToken);

  if (!hasSessionToken && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSessionToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp|.*\\.css|.*\\.js).*)',
  ],
};
