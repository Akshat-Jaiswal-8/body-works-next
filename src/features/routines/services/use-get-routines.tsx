import type { IRoutinesResponse } from '@/features/routines/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type IRoutinesFilters = {
  main_goal?: string;
  workout_type?: string;
  level?: string;
  duration?: string;
  days_per_week?: string;
  equipment?: string;
  gender?: string;
  category?: string;
  search?: string;
};

export const routinesQueryKey = (limit: number, page: number, filters?: IRoutinesFilters) =>
  [
    'routines',
    limit,
    page,
    filters?.search,
    filters?.main_goal,
    filters?.workout_type,
    filters?.level,
    filters?.duration,
    filters?.days_per_week,
    filters?.equipment,
    filters?.gender,
    filters?.category,
  ] as const;

export const getRoutines = async (
  limit: number,
  page: number = 1,
  filters?: IRoutinesFilters,
): Promise<IRoutinesResponse> => {
  const params: Record<string, number | string> = {
    limit,
    page,
  };

  if (filters) {
    const entries = Object.entries(filters).filter(([, value]) => Boolean(value));

    for (const [key, value] of entries) {
      params[key] = value as string;
    }
  }

  const routines = await apiCaller.get<IRoutinesResponse>('routines', {
    params,
  });

  return routines?.data;
};

export const useRoutines = (limit: number, page: number = 1, filters?: IRoutinesFilters) => {
  const {
    isLoading,
    data: routines,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: routinesQueryKey(limit, page, filters),
    queryFn: () => getRoutines(limit, page, filters),
    placeholderData: keepPreviousData,
  });
  return { isLoading, routines, error, refetch, isRefetching };
};

export default useRoutines;
