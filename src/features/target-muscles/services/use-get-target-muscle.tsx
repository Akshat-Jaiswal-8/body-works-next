import type { IExerciseData } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const targetMuscleExercisesQueryKey = (
  searchTargetMuscle: string | undefined,
  limit: number,
  page: number,
) => ['target-muscle', searchTargetMuscle, limit, page] as const;

export const getTargetMuscleExercises = async (
  searchTargetMuscle: string | undefined,
  limit: number,
  page: number,
): Promise<IExerciseData> => {
  const targetMuscles = await apiCaller.get<IExerciseData>('exercises', {
    params: {
      targetMuscle: searchTargetMuscle,
      limit,
      page,
    },
  });
  return targetMuscles.data;
};

export const useTargetMuscle = (
  searchTargetMuscle: string | undefined,
  limit: number,
  page: number,
) => {
  const {
    isLoading,
    data: targetMuscle,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: targetMuscleExercisesQueryKey(searchTargetMuscle, limit, page),
    queryFn: () => getTargetMuscleExercises(searchTargetMuscle, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, targetMuscle, error, refetch, isRefetching };
};
