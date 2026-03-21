import type { IRoutine } from '@/features/routines/types';
import { apiCaller } from '@/lib/api-caller';
import { useQuery } from '@tanstack/react-query';

type IRoutinesProps = {
  routineId: string | undefined;
};

export const routineQueryKey = (routineId: string | undefined) => ['routine', routineId] as const;

export const getRoutine = async ({ routineId }: IRoutinesProps): Promise<IRoutine> => {
  const routine = await apiCaller.get<{ data: IRoutine }>(`routines/${routineId}`);
  return routine.data.data;
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
    queryKey: routineQueryKey(routineId),
    queryFn: () => getRoutine({ routineId }),
  });
  return { isLoading, routine, error, refetch, isRefetching };
}

export default useRoutine;
