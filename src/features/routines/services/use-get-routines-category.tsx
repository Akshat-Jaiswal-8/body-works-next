import type { IRoutineCategory, IRoutineCategoryResponse } from '@/features/routines/types';
import { apiCaller } from '@/lib/api-caller';
import { useQuery } from '@tanstack/react-query';

const getRoutineCategories = async (): Promise<IRoutineCategory[]> => {
  const routineCategory = await apiCaller.get<IRoutineCategoryResponse>(
    'routines/filters?filter=category',
  );

  return routineCategory.data.data.category;
};

export const useRoutinesCategory = () => {
  const {
    isLoading,
    data: routineCategory,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['routine-categories'],
    queryFn: getRoutineCategories,
  });
  return { isLoading, routineCategory, error, refetch, isRefetching };
};
