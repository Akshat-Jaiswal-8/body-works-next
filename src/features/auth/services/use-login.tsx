import { useAuthStore } from '@/features/auth/store/use-auth-store';
import type { IAuthUser, ILoginCredentials } from '@/features/auth/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const authQueryKeys = {
  all: ['auth'] as const,
};

export const loginUser = async (credentials: ILoginCredentials): Promise<IAuthUser> => {
  const response = await publicApiCaller.post<{ data: IAuthUser }>('auth/login', credentials);
  return response.data.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (user) => {
      useAuthStore.getState().setSession(user);
      Cookies.set('accessToken', user.accessToken, { expires: 7 });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
