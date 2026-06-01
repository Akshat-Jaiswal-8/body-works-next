import { siteUrl } from '@/constants';
import ProfileClient from '@/features/profile/components/profile-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile & Settings',
  description: 'Manage your profile and settings.',
  alternates: {
    canonical: `${siteUrl}/profile`,
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
