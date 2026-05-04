import { trackerEntriesQueryKeys } from '@/features/tracker/services/use-get-tracker-entries';
import type { ICreateBodyStatPayload } from '@/features/tracker/types';
import { privateApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createBodyStat = async (payload: ICreateBodyStatPayload): Promise<void> => {
  await privateApiCaller.post('users/me/stats', payload);
};

export const useCreateBodyStat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBodyStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trackerEntriesQueryKeys.all });
    },
  });
};
