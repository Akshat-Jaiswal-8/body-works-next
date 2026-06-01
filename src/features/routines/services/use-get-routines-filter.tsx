import type {
  IRoutineFilterItem,
  IRoutineFilterName,
  IRoutineFiltersResponse,
} from '@/features/routines/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type { IRoutineFilterName };

export const routineFilterQueryKey = (filter: IRoutineFilterName) =>
  ['routine-filters', filter] as const;

export const getRoutineFilter = async (
  filter: IRoutineFilterName,
): Promise<IRoutineFilterItem[]> => {
  const routineFilter = await publicApiCaller.get<IRoutineFiltersResponse>(
    `routines/filters?filter=${filter}`,
  );

  return routineFilter.data.data[filter] || [];
};

export const useRoutinesFilter = (filter: IRoutineFilterName) => {
  return useQuery({
    queryKey: routineFilterQueryKey(filter),
    queryFn: () => getRoutineFilter(filter),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
