import { siteUrl } from '@/constants';
import RoutineCategoryClient from '@/features/routines/components/routine-category-client';
import {
  getRoutineCategories,
  routineCategoriesQueryKey,
} from '@/features/routines/services/use-get-routines-category';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Routine Categories',
  description: 'Browse routine categories and pick a training focus that fits your goal.',
  alternates: {
    canonical: `${siteUrl}/routine-category`,
  },
};

const RoutineCategoryPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: routineCategoriesQueryKey(),
    queryFn: () => getRoutineCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutineCategoryClient />
    </HydrationBoundary>
  );
};

export default RoutineCategoryPage;
