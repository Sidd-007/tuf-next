// src/lib/authStore.ts
import {create} from 'zustand';

type AuthState = {
  user: { email: string; username: string } | null;
  isLoginModalOpen: boolean;
  setUser: (u: AuthState['user']) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoginModalOpen: false,

  setUser: (u) => set({ user: u }),

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
