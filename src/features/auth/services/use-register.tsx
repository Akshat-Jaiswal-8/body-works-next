import { AUTH_ACCESS_TOKEN_KEY } from '@/features/auth/constants';
import { authQueryKeys } from '@/features/auth/services/use-login';
import { useAuthStore } from '@/features/auth/store/use-auth-store';
import type { IAuthUser, IRegisterCredentials } from '@/features/auth/types';
import { publicApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const registerUser = async (credentials: IRegisterCredentials): Promise<IAuthUser> => {
  const response = await publicApiCaller.post<{ data: IAuthUser }>('auth/register', credentials);
  return response.data.data;
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (user) => {
      const { accessToken, ...userWithoutToken } = user;
      setSession(userWithoutToken);
      Cookies.set(AUTH_ACCESS_TOKEN_KEY, accessToken, { expires: 7, secure: true, sameSite: 'Lax' });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
