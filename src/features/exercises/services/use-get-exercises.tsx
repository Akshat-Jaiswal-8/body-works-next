import type { IExerciseData } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const exercisesQueryKey = (limit: number, page: number, search?: string) => [
  'exercises',
  limit,
  page,
  search,
];

export const getExercises = async (
  limit: number,
  page: number,
  search?: string,
): Promise<IExerciseData> => {
  const exercises = await apiCaller.get<IExerciseData>(`/exercises`, {
    params: {
      limit,
      page,
      search,
    },
  });
  return exercises.data;
};

export const useExercises = (limit: number = 9, page: number = 1, search?: string) => {
  const {
    isLoading,
    data: exercises,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: exercisesQueryKey(limit, page, search),
    queryFn: () => getExercises(limit, page, search),
    placeholderData: keepPreviousData,
  });
  return { isLoading, exercises, error, refetch, isRefetching };
};
