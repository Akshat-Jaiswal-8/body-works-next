import type { IBodyPartData } from '@/features/body-parts/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const getBodyParts = async (limit?: number): Promise<IBodyPartData> => {
  const bodyParts = await apiCaller.get<IBodyPartData>('bodyParts', {
    params: {
      limit,
    },
  });
  return bodyParts.data;
};

export const useBodyParts = (limit?: number) => {
  const {
    isLoading,
    data: bodyParts,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['body-parts', limit],
    queryFn: () => getBodyParts(limit),
    placeholderData: keepPreviousData,
  });
  return { isLoading, bodyParts, error, isRefetching, refetch };
};
