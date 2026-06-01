import { PAGE_LIMIT, siteUrl } from '@/constants';
import { ExercisesClient } from '@/features/exercises/components/exercises-client';
import {
  exercisesQueryKey,
  getExercises,
  type IExercisesFilters,
} from '@/features/exercises/services/use-get-exercises';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

type SearchParams = IExercisesFilters & {
  page?: string;
};

export const metadata: Metadata = {
  title: 'Exercises',
  description: 'Find exercises by equipment and build better training plans.',
  alternates: {
    canonical: `${siteUrl}/exercises`,
  },
};

const ExercisesPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const queryClient = new QueryClient();
  const params = await searchParams;
  const pageNumber = Number(params?.page) || 1;
  const filters: IExercisesFilters = {
    search: params?.search,
    equipment: params?.equipment,
    target: params?.target,
    bodyPart: params?.bodyPart,
  };

  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(PAGE_LIMIT, pageNumber, filters),
    queryFn: () => getExercises(PAGE_LIMIT, pageNumber, filters),
  });

  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(PAGE_LIMIT, pageNumber + 1, filters),
    queryFn: () => getExercises(PAGE_LIMIT, pageNumber + 1, filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExercisesClient />
    </HydrationBoundary>
  );
};

export default ExercisesPage;
