import type { IUser } from '@/features/auth/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  setSession: (user: IUser) => void;
  updateUser: (userPatch: IUser) => void;
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
      updateUser: (userPatch: IUser) =>
        set((state) => ({ user: { ...(state.user ?? {}), ...userPatch } })),
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
