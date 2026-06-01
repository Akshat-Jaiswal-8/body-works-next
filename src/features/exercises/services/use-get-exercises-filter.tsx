import type { IExerciseFilterItem, IExerciseFilterName } from '@/features/exercises/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type { IExerciseFilterName };

const FILTER_ENDPOINTS: Record<IExerciseFilterName, string> = {
  equipment: 'equipments',
  target: 'targetMuscles',
  bodyPart: 'bodyParts',
};

const NAME_FIELD: Record<IExerciseFilterName, string> = {
  equipment: 'equipment',
  target: 'targetMuscle',
  bodyPart: 'bodyPart',
};

type RawFilterItem = {
  id: string;
  exerciseCount: number;
  imageUrl: string;
  [key: string]: string | number;
};

interface RawFilterResponse {
  data: RawFilterItem[];
  totalPages: number;
  count: number;
}

export const exerciseFilterQueryKey = (filter: IExerciseFilterName) =>
  ['exercise-filters', filter] as const;

export const getExerciseFilterOptions = async (
  filter: IExerciseFilterName,
): Promise<IExerciseFilterItem[]> => {
  const endpoint = FILTER_ENDPOINTS[filter];
  const nameField = NAME_FIELD[filter];

  const response = await publicApiCaller.get<RawFilterResponse>(endpoint, {
    params: { limit: 1000, page: 1 },
  });

  return response.data.data.map((item) => ({
    title: (item[nameField] as string) ?? '',
    exerciseCount: item.exerciseCount,
    imageUrl: item.imageUrl,
  }));
};

export const useExerciseFilterOptions = (filter: IExerciseFilterName) => {
  return useQuery({
    queryKey: exerciseFilterQueryKey(filter),
    queryFn: () => getExerciseFilterOptions(filter),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
