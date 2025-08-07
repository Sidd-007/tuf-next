// app/strivers-a2z-system-design-course/page.tsx
import { fetchSheet } from '@/lib/api'; // same as before
import { getUserFromCookie } from '@/lib/auth';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import Providers from '../providers';
import SheetClient from './SheetClient';

export const metadata: Metadata = {
  title: 'Strivers A2Z DSA Course/Sheet - Crack Any FAANG or PBCs',
  description:
    'Master Data Structures concepts such as Linked Lists, Heaps, DP, Graphs, Arrays & more. Free, Self-Paced with Lifetime Access using Strivers A2Z DSA Course.',
  alternates: {
    canonical:
      'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
  },
  openGraph: {
    type: 'website',
    url:
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
    card: 'summary',
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
  const user = await getUserFromCookie();

  // build your sheet data
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ['sheet'], queryFn: fetchSheet });

  return (
    // pass user **and** whether we should open at mount
    <Providers
      user={user}
      initialLoginModalOpen={!user}
      dehydratedState={dehydrate(qc)}
    >
      <SheetClient dehydratedState={dehydrate(qc)} />
    </Providers>
  );
}