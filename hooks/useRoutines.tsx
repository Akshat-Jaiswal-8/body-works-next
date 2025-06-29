import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getRoutines = async (
  limit: number,
  page: number
): Promise<IRoutine[]> => {
  const routines = await apiCaller.get<IRoutinesResponse>("routines", {
    params: {
      limit,
      page,
    },
  });

  console.log(routines);

  return routines?.data?.data;
};

export const useRoutines = (limit: number, page: number) => {
  const {
    isLoading,
    data: routines,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["routines", limit, page],
    queryFn: () => getRoutines(limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, routines, error, refetch, isRefetching };
};

export default useRoutines;
