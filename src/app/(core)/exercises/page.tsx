import { siteUrl } from '@/constants';
import { ExercisesClient } from '@/features/exercises/components/exercises-client';
import { exercisesQueryKey, getExercises } from '@/features/exercises/services/use-get-exercises';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

type SearchParams = {
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
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(9, pageNumber),
    queryFn: () => getExercises(9, pageNumber),
  });

  await queryClient.prefetchQuery({
    queryKey: exercisesQueryKey(9, pageNumber + 1),
    queryFn: () => getExercises(9, pageNumber + 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExercisesClient />
    </HydrationBoundary>
  );
};

export default ExercisesPage;
