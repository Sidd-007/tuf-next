// src/lib/rq.ts
import { QueryClient } from '@tanstack/react-query'

/**
 * A single, shared QueryClient instance.
 * Don't accidentally export a plain object here!
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // you can tune these or leave them off entirely
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      // same here
      retry: false,
    },
  },
})
