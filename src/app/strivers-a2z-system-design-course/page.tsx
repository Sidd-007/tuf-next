// app/strivers-a2z-system-design-course/page.tsx
import type { Metadata } from 'next';
import SheetClient from './SheetClient';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchSheet } from '@/lib/api';    // same as before

export const metadata: Metadata = {
  title: 'Strivers A2Z DSA Course/Sheet - Crack Any FAANG or PBCs',
  description:
    'Master Data Structures concepts such as Linked Lists, Heaps, DP, Graphs, Arrays & more. Free, Self-Paced with Lifetime Access using Strivers A2Z DSA Course.',
  alternates: {
    canonical:
      'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
  },
  openGraph: {
    type : 'website',
    url  :
      'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    title:
      'Strivers A2Z DSA Course/Sheet - Crack Any FAANG or PBCs',
    description:
      'Master Data Structures concepts such as Linked Lists, Heaps, DP, Graphs, Arrays & more. Free, Self-Paced with Lifetime Access using Strivers A2Z DSA Course.',
    images: [
      'https://takeuforward-content-images.s3.ap-south-1.amazonaws.com/content/wallpaperYoutube-2.webp',
    ],
  },
  twitter: {
    card : 'summary',
    title:
      'Strivers A2Z DSA Course/Sheet - Crack Any FAANG or PBCs',
    description:
      'Master Data Structures concepts such as Linked Lists, Heaps, DP, Graphs, Arrays & more. Free, Self-Paced with Lifetime Access using Strivers A2Z DSA Course.',
    images: [
      'https://takeuforward-content-images.s3.ap-south-1.amazonaws.com/content/wallpaperYoutube-2.webp',
    ],
  },
};

export const runtime = 'edge';

export default async function Page() {
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ['sheet'], queryFn: fetchSheet });

  return <SheetClient dehydratedState={dehydrate(qc)} />;
}
