import type { IUser } from '@/features/auth/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  setSession: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setSession: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),
      updateUser: (user) => set({ user }),
      clearSession: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'bw-auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
