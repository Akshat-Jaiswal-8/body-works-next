import { apiCaller } from '@/lib/apiCaller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getTargetMuscle = async (
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
    queryKey: ['target-muscle', limit, page],
    queryFn: () => getTargetMuscle(searchTargetMuscle, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, targetMuscle, error, refetch, isRefetching };
};
