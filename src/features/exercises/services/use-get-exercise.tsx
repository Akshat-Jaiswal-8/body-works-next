import type { IExercise, IExerciseResponse } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useQuery } from '@tanstack/react-query';

export const getExercise = async (exerciseId: string | undefined): Promise<IExercise> => {
  if (!exerciseId) throw new Error('Exercise ID is required');
  const exercise = await publicApiCaller.get<IExerciseResponse>(`exercises/${exerciseId}`);
  return exercise.data.data;
};

export const useExercise = (exerciseId: string | undefined) => {
  return useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getExercise(exerciseId),
  });
};
