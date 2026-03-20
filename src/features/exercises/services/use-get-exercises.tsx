import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const exercisesQueryKey = (limit: number, page: number) => ['exercises', limit, page];

export const getExercises = async (limit: number, page: number): Promise<IExerciseData> => {
  const exercises = await apiCaller.get<IExerciseData>(`/exercises`, {
    params: {
      limit,
      page,
    },
  });
  return exercises.data;
};

export const useExercises = (limit: number = 9, page: number = 1) => {
  const {
    isLoading,
    data: exercises,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: exercisesQueryKey(limit, page),
    queryFn: () => getExercises(limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, exercises, error, refetch, isRefetching };
};
