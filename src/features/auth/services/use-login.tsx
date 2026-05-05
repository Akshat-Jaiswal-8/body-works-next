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
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (user) => {
      const { accessToken, ...userWithoutToken } = user;
      setSession(userWithoutToken);
      Cookies.set('accessToken', accessToken, { expires: 7, secure: true, sameSite: 'Lax' });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
