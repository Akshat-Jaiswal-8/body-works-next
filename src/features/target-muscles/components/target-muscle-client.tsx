'use client';

import { withFilteredExercisesClient } from '@/components/with-filtered-exercises-client';
import { useTargetMuscle } from '@/features/target-muscles/services/use-get-target-muscle';

const useTargetMuscleExercises = (
  targetMuscle: string | undefined,
  limit: number,
  page: number,
) => {
  const {
    targetMuscle: data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useTargetMuscle(targetMuscle, limit, page);

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const TargetMuscleClient = withFilteredExercisesClient({
  paramKey: 'target-muscle',
  useData: useTargetMuscleExercises,
  gridClassName: 'grid lg:grid-cols-2 xl:grid-cols-3',
});

export default TargetMuscleClient;
