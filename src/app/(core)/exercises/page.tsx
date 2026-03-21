import { ExercisesClient } from '@/features/exercises/components/exercises-client';
import { exercisesQueryKey, getExercises } from '@/features/exercises/services/use-get-exercises';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type SearchParams = {
  page?: string;
};

const ExercisesPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const queryClient = new QueryClient();
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

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
