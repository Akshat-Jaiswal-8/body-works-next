import { siteUrl } from '@/constants';
import TrackerClient from '@/features/tracker/components/tracker-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Stats Tracker',
  description: 'Track your body statistics and fitness progress.',
  alternates: {
    canonical: `${siteUrl}/tracker`,
  },
};

export default function TrackerPage() {
  return <TrackerClient />;
}
