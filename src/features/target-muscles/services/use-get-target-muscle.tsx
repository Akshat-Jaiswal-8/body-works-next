import type { IExerciseData } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
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
  const targetMuscles = await publicApiCaller.get<IExerciseData>('exercises', {
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
  return useQuery({
    queryKey: targetMuscleExercisesQueryKey(searchTargetMuscle, limit, page),
    queryFn: () => getTargetMuscleExercises(searchTargetMuscle, limit, page),
    placeholderData: keepPreviousData,
  });
};
