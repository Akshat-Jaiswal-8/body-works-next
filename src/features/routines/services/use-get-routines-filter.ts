import type {
  IRoutineFilterItem,
  IRoutineFilterName,
  IRoutineFiltersResponse,
} from '@/features/routines/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type { IRoutineFilterName };

export const routineFilterQueryKey = (filter: IRoutineFilterName) =>
  ['routine-filters', filter] as const;

export const getRoutineFilter = async (
  filter: IRoutineFilterName,
): Promise<IRoutineFilterItem[]> => {
  const routineFilter = await apiCaller.get<IRoutineFiltersResponse>(
    `routines/filters?filter=${filter}`,
  );

  return routineFilter.data.data[filter] || [];
};

export const useRoutinesFilter = (filter: IRoutineFilterName) => {
  const {
    isLoading,
    data: routineFilter,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: routineFilterQueryKey(filter),
    queryFn: () => getRoutineFilter(filter),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { isLoading, routineFilter, error, refetch, isRefetching };
};
