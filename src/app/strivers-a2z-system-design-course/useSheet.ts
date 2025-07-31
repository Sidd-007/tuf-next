'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchSheet } from '@/lib/api';

export function useSheet() {
  return useQuery({ queryKey: ['sheet'], queryFn: fetchSheet });
}
