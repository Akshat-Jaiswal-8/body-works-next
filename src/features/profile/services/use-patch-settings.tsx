import { getProfile, profileQueryKey } from '@/features/profile/services/use-get-profile';
import type { IUpdateSettingsPayload, IUserProfile } from '@/features/profile/types';
import { privateApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateSettings = async (payload: IUpdateSettingsPayload): Promise<IUserProfile> => {
  const response = await privateApiCaller.patch<{
    data: { settings: IUserProfile['settings']; updatedAt: string };
  }>('users/me/settings', payload);
  const current = await getProfile();
  return {
    ...current,
    settings: response.data.data.settings,
    updatedAt: response.data.data.updatedAt,
  };
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey() });
    },
  });
};
