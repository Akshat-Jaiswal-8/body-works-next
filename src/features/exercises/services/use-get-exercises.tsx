import type { IExerciseData } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const exercisesQueryKey = (limit: number, page: number, search?: string) => [
  'exercises',
  limit,
  page,
  ...(search != null ? [search] : []),
];

export const getExercises = async (
  limit: number,
  page: number,
  search?: string,
): Promise<IExerciseData> => {
  const exercises = await publicApiCaller.get<IExerciseData>(`/exercises`, {
    params: {
      limit,
      page,
      search,
    },
  });
  return exercises.data;
};

export const useExercises = (limit: number = 9, page: number = 1, search?: string) => {
  return useQuery({
    queryKey: exercisesQueryKey(limit, page, search),
    queryFn: () => getExercises(limit, page, search),
    placeholderData: keepPreviousData,
  });
};
