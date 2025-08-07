'use client'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/lib/authStore'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type LoginResponse = {
  success: boolean
  token: string
  email: string
  username: string
}

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation<LoginResponse, unknown, void>({
    mutationFn: async () => {
      const { data } = await axios.post<LoginResponse>(
        'http://localhost:5000/api/auth/login',
        { loginCred: { email, password } },
        { withCredentials: true }
      )
      return data
    },
    onSuccess(data) {
      setUser({ email: data.email, username: data.username })
      closeLoginModal()
    },
  })

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={val => {
        if (!val) closeLoginModal()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
          <DialogDescription>
            Enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={closeLoginModal}>
            Cancel
          </Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in…' : 'Log in'}
          </Button>
        </DialogFooter>

        {mutation.isError && (
          <p className="mt-2 text-sm text-red-500">
            Login failed. Check your email/password.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
