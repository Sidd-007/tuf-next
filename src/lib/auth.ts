// lib/auth.ts (Edge-compatible)
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function getUserFromCookie() {
  const token = (await cookies()).get('takeuforward')?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    )
    return { email: payload.email as string,
             username: payload.username as string }
  } catch (e) {
    console.error('JWT error on edge', e)
    return null
  }
}
