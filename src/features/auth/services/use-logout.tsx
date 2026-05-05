import { authQueryKeys } from '@/features/auth/services/use-login';
import { useAuthStore } from '@/features/auth/store/use-auth-store';
import { privateApiCaller } from '@/lib/api-caller';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const logoutUser = async (): Promise<void> => {
  await privateApiCaller.post('auth/logout');
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: async () => {
      useAuthStore.getState().clearSession();
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
