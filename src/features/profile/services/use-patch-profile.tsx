import { getProfile, profileQueryKey } from '@/features/profile/services/use-get-profile';
import type { IUpdateProfilePayload, IUserProfile } from '@/features/profile/types';
import { privateApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateProfile = async (payload: IUpdateProfilePayload): Promise<IUserProfile> => {
  const response = await privateApiCaller.patch<{
    data: { profile: IUserProfile['profile']; updatedAt: string };
  }>('users/me/profile', payload);
  const current = await getProfile();
  return {
    ...current,
    profile: response.data.data.profile,
    updatedAt: response.data.data.updatedAt,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey() });
    },
  });
};
