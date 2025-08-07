// src/app/login/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogin } from '../features/auth/useLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(
      { email, password },
      { onSuccess: () => router.replace('/strivers-a2z-system-design-course') }
    );
  }

  return (
    <main className="mx-auto max-w-sm py-16">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}
        <Button className="w-full" disabled={isPending}>Log in</Button>
      </form>
    </main>
  );
}
