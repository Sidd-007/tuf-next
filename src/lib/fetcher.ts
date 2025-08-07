// src/lib/fetcher.ts   – thin wrapper around fetch
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',              // ← keeps cookie on every call!
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}
