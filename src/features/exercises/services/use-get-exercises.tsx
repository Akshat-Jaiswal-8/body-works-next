import type { IExerciseData, IExerciseFilterName } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type IExercisesFilters = Partial<Record<IExerciseFilterName, string>> & {
  search?: string;
};

export const exercisesQueryKey = (limit: number, page: number, filters?: IExercisesFilters) =>
  [
    'exercises',
    limit,
    page,
    filters?.search,
    filters?.equipment,
    filters?.target,
    filters?.bodyPart,
  ] as const;

export const getExercises = async (
  limit: number,
  page: number,
  filters?: IExercisesFilters,
): Promise<IExerciseData> => {
  const params: Record<string, number | string> = {
    limit,
    page,
  };

  if (filters) {
    const entries = Object.entries(filters).filter(([, value]) => Boolean(value));

    for (const [key, value] of entries) {
      params[key] = value as string;
    }
  }

  const exercises = await publicApiCaller.get<IExerciseData>('/exercises', {
    params,
  });
  return exercises.data;
};

export const useExercises = (limit: number = 9, page: number = 1, filters?: IExercisesFilters) => {
  return useQuery({
    queryKey: exercisesQueryKey(limit, page, filters),
    queryFn: () => getExercises(limit, page, filters),
    placeholderData: keepPreviousData,
  });
};
