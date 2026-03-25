import { PAGE_LIMIT, PAGE_SIZE, siteUrl } from '@/constants';
import RoutinesClient from '@/features/routines/components/routines-client';
import {
  getRoutines,
  type IRoutinesFilters,
  routinesQueryKey,
} from '@/features/routines/services/use-get-routines';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type SearchParams = IRoutinesFilters & {
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
  const params = await searchParams;
  const page = Number(params?.page) || PAGE_SIZE;
  const filters: IRoutinesFilters = {
    search: params?.search,
    main_goal: params?.main_goal,
    workout_type: params?.workout_type,
    level: params?.level,
    duration: params?.duration,
    days_per_week: params?.days_per_week,
    equipment: params?.equipment,
    gender: params?.gender,
    category: params?.category,
  };

  await queryClient.prefetchQuery({
    queryKey: routinesQueryKey(PAGE_LIMIT, page, filters),
    queryFn: () => getRoutines(PAGE_LIMIT, page, filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutinesClient />
    </HydrationBoundary>
  );
};

export default RoutinesPage;
