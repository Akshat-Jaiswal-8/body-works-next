import { siteUrl } from '@/constants';
import DashboardClient from '@/features/dashboard/components/dashboard-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your fitness dashboard and statistics.',
  alternates: {
    canonical: `${siteUrl}/dashboard`,
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
