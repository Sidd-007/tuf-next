import { SheetStep } from '@/types/sheet';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function fetchSheet() {
  const { data } = await api.get('/api/sheets/double/strivers_a2z_sheet');
  return data as SheetStep[];           // add your TS types
}
