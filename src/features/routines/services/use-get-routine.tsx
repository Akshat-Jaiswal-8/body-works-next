import type { IRoutine } from '@/features/routines/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useQuery } from '@tanstack/react-query';

type IRoutinesProps = {
  routineId: string | undefined;
};

export const routineQueryKey = (routineId: string | undefined) => ['routine', routineId] as const;

export const getRoutine = async ({ routineId }: IRoutinesProps): Promise<IRoutine> => {
  const routine = await publicApiCaller.get<{ data: IRoutine }>(`routines/${routineId}`);
  return routine.data.data;
};

type routineId = {
  routineId: string | undefined;
};

export function useRoutine({ routineId }: routineId) {
  return useQuery({
    queryKey: routineQueryKey(routineId),
    queryFn: () => getRoutine({ routineId }),
  });
}
