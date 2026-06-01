import type { IBodyPartData } from '@/features/body-parts/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const bodyPartsQueryKey = (limit?: number) => ['body-parts', limit] as const;

export const getBodyParts = async (limit?: number): Promise<IBodyPartData> => {
  const bodyParts = await publicApiCaller.get<IBodyPartData>('bodyParts', {
    params: {
      limit,
    },
  });
  return bodyParts.data;
};

export const useBodyParts = (limit?: number) => {
  return useQuery({
    queryKey: bodyPartsQueryKey(limit),
    queryFn: () => getBodyParts(limit),
    placeholderData: keepPreviousData,
  });
};
