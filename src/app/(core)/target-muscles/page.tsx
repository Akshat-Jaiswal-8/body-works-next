import { siteUrl } from '@/constants';
import TargetMusclesClient from '@/features/target-muscles/components/target-muscles-client';
import {
  getTargetMuscles,
  targetMusclesQueryKey,
} from '@/features/target-muscles/services/use-get-target-muscles';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Target Muscles',
  description: 'Browse exercises by target muscle and train with precision.',
  alternates: {
    canonical: `${siteUrl}/target-muscles`,
  },
};

const TargetMusclesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: targetMusclesQueryKey(),
    queryFn: () => getTargetMuscles(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TargetMusclesClient />
    </HydrationBoundary>
  );
};

export default TargetMusclesPage;
