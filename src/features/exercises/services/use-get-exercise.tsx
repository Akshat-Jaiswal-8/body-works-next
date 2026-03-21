import type { IExercise, IExerciseResponse } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { useQuery } from '@tanstack/react-query';

export const getExercise = async (exerciseId: string | undefined): Promise<IExercise> => {
  if (!exerciseId) throw new Error('Exercise ID is required');
  const exercise = await apiCaller.get<IExerciseResponse>(`exercises/${exerciseId}`);
  return exercise.data.data;
};

export const useExercise = (exerciseId: string | undefined) => {
  const {
    isLoading,
    data: exercise,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getExercise(exerciseId),
  });
  return { isLoading, exercise, error, refetch, isRefetching };
};
