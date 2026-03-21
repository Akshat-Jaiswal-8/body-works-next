import type { ITargetMuscleData } from '@/features/target-muscles/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const targetMusclesQueryKey = (limit?: number) => ['target-muscle', limit] as const;

export const getTargetMuscles = async (limit?: number): Promise<ITargetMuscleData> => {
  const targetMuscles = await apiCaller.get<ITargetMuscleData>('targetMuscles', {
    params: {
      limit,
    },
  });
  return targetMuscles.data;
};

const useTargetMuscles = (limit?: number) => {
  const {
    isLoading,
    data: targetMuscle,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: targetMusclesQueryKey(limit),
    queryFn: () => getTargetMuscles(limit),
    placeholderData: keepPreviousData,
  });
  return { isLoading, targetMuscle, error, refetch, isRefetching };
};

export default useTargetMuscles;
