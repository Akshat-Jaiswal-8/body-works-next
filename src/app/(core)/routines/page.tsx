import { siteUrl } from '@/constants';
import RoutinesClient from '@/features/routines/components/routines-client';
import { getRoutines, routinesQueryKey } from '@/features/routines/services/use-get-routines';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type SearchParams = {
  page?: string;
};

export const metadata: Metadata = {
  title: 'Routines',
  description: 'Discover complete workout routines for different goals and levels.',
  alternates: {
    canonical: `${siteUrl}/routines`,
  },
};

const RoutinesPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const queryClient = new QueryClient();
  const page = Number((await searchParams)?.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: routinesQueryKey(9, page + 1),
    queryFn: () => getRoutines(9, page + 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutinesClient />
    </HydrationBoundary>
  );
};

export default RoutinesPage;
