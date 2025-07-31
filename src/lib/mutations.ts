// lib/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';

export function useToggleProgress(email: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; value: 0|1 }) =>
      api.put(`/progress/${email}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sheet'] }),
  });
}
