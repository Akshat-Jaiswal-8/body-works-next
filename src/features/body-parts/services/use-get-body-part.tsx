import type { IExerciseData } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getBodyPart = async (
  bodyPart: string | undefined,
  limit: number,
  page: number,
): Promise<IExerciseData> => {
  const bodypart = await apiCaller.get<IExerciseData>('exercises', {
    params: {
      bodyPart,
      limit,
      page,
    },
  });

  return bodypart.data;
};

export const useBodyPart = (bodypart: string | undefined, limit: number, page: number) => {
  const {
    isLoading,
    data: bodyPart,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['body-part', limit, page],
    queryFn: () => getBodyPart(bodypart, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, bodyPart, error, refetch, isRefetching };
};
