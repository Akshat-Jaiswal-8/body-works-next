import { apiCaller } from '@/lib/apiCaller';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const getExercise = async (exerciseId: string | undefined): Promise<IExercise> => {
  if (!exerciseId)
    toast.error('Exercise ID is required', {
      description: 'Please provide an exercise ID',
    });
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
