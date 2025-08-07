// src/store/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = { email: string; username: string } | null

interface AuthState {
  user      : User
  setUser   : (u: User) => void
  showModal : boolean
  openModal : () => void
  closeModal: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user      : null,
      setUser   : (u) => set({ user: u }),
      showModal : false,
      openModal : () => set({ showModal: true }),
      closeModal: () => set({ showModal: false }),
    }),
    { name: 'tuf-auth' }          // keeps the flag & user in localStorage
  )
)
