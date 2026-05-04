import { siteUrl } from '@/constants';
import RegisterClient from '@/features/auth/components/register-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your BodyWorks account and start your fitness journey.',
  alternates: {
    canonical: `${siteUrl}/register`,
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
