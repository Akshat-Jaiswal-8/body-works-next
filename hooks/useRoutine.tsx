import { useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

type IRoutinesProps = {
  routineId: string | undefined;
};

const getRoutine = async ({ routineId }: IRoutinesProps): Promise<IRoutine> => {
  const routine = await apiCaller.get<IRoutine>(`routines/${routineId}`);
  return routine.data;
};

type routineId = {
  routineId: string | undefined;
};

function useRoutine({ routineId }: routineId) {
  const {
    isLoading,
    data: routine,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["routine"],
    queryFn: () => getRoutine({ routineId }),
  });
  return { isLoading, routine, error, refetch, isRefetching };
}

export default useRoutine;
