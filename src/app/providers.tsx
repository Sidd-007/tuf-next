// src/app/providers.tsx
'use client';

import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

import LoginModal from '@/components/LoginModal';
import { useAuthStore } from '@/lib/authStore';
import { queryClient } from '@/lib/rq';

type Props = {
  user: { email: string; username: string } | null;
  initialLoginModalOpen: boolean;
  dehydratedState: unknown;  // pass this to SheetClient or hydrateQueryClient
  children: React.ReactNode;
};

export default function Providers({
  user,
  initialLoginModalOpen,
  dehydratedState,
  children,
}: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const openLoginModal = useAuthStore((s) => s.openLoginModal);

  useEffect(() => {
    // hydrate the user once
    setUser(user);
    // if server said "no user" then open the modal
    if (initialLoginModalOpen) {
      // openLoginModal();
    }
  }, [user, initialLoginModalOpen, setUser, openLoginModal]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          {children}
          <LoginModal />
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
