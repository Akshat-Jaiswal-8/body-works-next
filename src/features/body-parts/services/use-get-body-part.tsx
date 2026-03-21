import type { IExerciseData } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const bodyPartExercisesQueryKey = (
  bodyPart: string | undefined,
  limit: number,
  page: number,
) => ['body-part', bodyPart, limit, page] as const;

export const getBodyPartExercises = async (
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
    queryKey: bodyPartExercisesQueryKey(bodypart, limit, page),
    queryFn: () => getBodyPartExercises(bodypart, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, bodyPart, error, refetch, isRefetching };
};
