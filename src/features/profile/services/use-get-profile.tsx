import type { IProfileResponse, IUserProfile } from '@/features/profile/types';
import { privateApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const profileQueryKey = () => ['profile'] as const;

export const getProfile = async (): Promise<IUserProfile> => {
  const response = await privateApiCaller.get<IProfileResponse>('users/me');
  return response.data.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: profileQueryKey(),
    queryFn: () => getProfile(),
    placeholderData: keepPreviousData,
  });
};
