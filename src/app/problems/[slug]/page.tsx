// ───────────────────────────────────────────────────────────────
// src/app/problems/[slug]/page.tsx
// ───────────────────────────────────────────────────────────────
import { notFound } from 'next/navigation';
import ProblemClient from './ProblemClient';

import type { Problem } from '@/app/problems/types';
import { selectionSort } from '../static/selection-sort';
// ↓ import (and register) any new problems here
// import insertionSort from '@/lib/problems/insertion-sort';
// import mergeSort     from '@/lib/problems/merge-sort';

/* ----------------------------------------------------------------
   1)  A single dictionary of every static problem object.
       The keys are their route slugs.
----------------------------------------------------------------- */
const problems: Record<string, Problem> = {
  'selection-sort': selectionSort,
  // 'insertion-sort': insertionSort,
  // 'merge-sort'    : mergeSort,
} as const;

/* ----------------------------------------------------------------
   2)  Tell Next.js which /​problems/[slug] pages to pre-generate
       at build time (static generation).
----------------------------------------------------------------- */
export function generateStaticParams() {
  return Object.keys(problems).map((slug) => ({ slug }));
}

/* ----------------------------------------------------------------
   3)  Page component – lookup the problem, 404 if it doesn't exist.
----------------------------------------------------------------- */
type PageProps = { params: Promise<{ slug: string }> };

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = problems[slug];
  if (!problem) notFound();

  return <ProblemClient problem={problem} />;
}
