// src/features/auth/useLogin.ts
import { useMutation }  from '@tanstack/react-query';
import { apiFetch }     from '@/lib/fetcher';
import { useAuthStore } from '@/lib/authStore';

type Cred = { email: string; password: string };
type ApiOk = { success: true; email: string; username: string };

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (cred: Cred) =>
      apiFetch<ApiOk>('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ loginCred: cred }),
      }),
    onSuccess: (data) => setUser({ email: data.email, username: data.username }),
  });
}
