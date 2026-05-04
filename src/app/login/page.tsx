import { siteUrl } from '@/constants';
import LoginClient from '@/features/auth/components/login-client';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your BodyWorks account.',
  alternates: {
    canonical: `${siteUrl}/login`,
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
