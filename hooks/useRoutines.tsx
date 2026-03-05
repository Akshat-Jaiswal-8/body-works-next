import { apiCaller } from '@/lib/apiCaller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getRoutines = async (limit: number, page: number): Promise<IRoutinesResponse> => {
  const routines = await apiCaller.get<IRoutinesResponse>('routines', {
    params: {
      limit,
      page,
    },
  });

  return routines?.data;
};

export const useRoutines = (limit: number, page: number) => {
  const {
    isLoading,
    data: routines,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['routines', limit, page],
    queryFn: () => getRoutines(limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, routines, error, refetch, isRefetching };
};

export default useRoutines;
