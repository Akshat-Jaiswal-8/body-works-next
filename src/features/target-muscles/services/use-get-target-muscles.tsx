import type { ITargetMuscleData } from '@/features/target-muscles/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const targetMusclesQueryKey = (limit?: number) => ['target-muscle', limit] as const;

export const getTargetMuscles = async (limit?: number): Promise<ITargetMuscleData> => {
  const targetMuscles = await publicApiCaller.get<ITargetMuscleData>('targetMuscles', {
    params: {
      limit,
    },
  });
  return targetMuscles.data;
};

export const useTargetMuscles = (limit?: number) => {
  return useQuery({
    queryKey: targetMusclesQueryKey(limit),
    queryFn: () => getTargetMuscles(limit),
    placeholderData: keepPreviousData,
  });
};
