import { useAuthStore } from '@/features/auth/store/use-auth-store';
import type { IAuthUser, IRegisterCredentials } from '@/features/auth/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { authQueryKeys } from './use-login';

export const registerUser = async (credentials: IRegisterCredentials): Promise<IAuthUser> => {
  const response = await publicApiCaller.post<{ data: IAuthUser }>('auth/register', credentials);
  return response.data.data;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (user) => {
      useAuthStore.getState().setSession(user);
      Cookies.set('accessToken', user.accessToken, { expires: 7 });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
