'use client';

import {
  HydrationBoundary,
} from '@tanstack/react-query';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSheet } from './useSheet';
import { useSheetUI } from '@/store/sheet-ui';
import SheetAccordion from '@/components/SheetAccordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { SheetStep, Topic } from '@/types/sheet';

type Difficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

type Props = { dehydratedState: unknown };

export default function SheetClient({ dehydratedState }: Props) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<p className="p-4">Loading sheet…</p>}>
        <InnerSheet />
      </Suspense>
    </HydrationBoundary>
  );
}

/* ---------------------------------------------------------------- */

function InnerSheet() {
  /* 1 ─ server state */
  const { data: sheet, isLoading, error } = useSheet();

  /* 2 ─ client state */
  const {
    difficulty,
    setDifficulty,
    search,
    setSearch,
    showRandom,
    toggleRandom,
  } = useSheetUI();

  /* 3 ─ derive data (hooks must run unconditionally) */
  const safeSheet: SheetStep[] = sheet ?? [];                 // empty until fetch resolves

  const sheetFiltered = useMemo<SheetStep[]>(() => {
    const searchStr = search.trim().toLowerCase();

    const byDifficulty = (t: Topic) =>
      difficulty === 'All' ||
      (t.difficulty === 0 && difficulty === 'Easy') ||
      (t.difficulty === 1 && difficulty === 'Medium') ||
      (t.difficulty === 2 && difficulty === 'Hard');

    return safeSheet
      .map((step) => {
        const sub_steps = step.sub_steps
          .map((lec) => {
            let topics = lec.topics.filter(byDifficulty);
            if (searchStr)
              topics = topics.filter((x) =>
                x.question_title.toLowerCase().includes(searchStr),
              );
            return { ...lec, topics };
          })
          .filter((lec) => lec.topics.length);

        return sub_steps.length ? { ...step, sub_steps } : null;
      })
      .filter(Boolean) as SheetStep[];
  }, [safeSheet, difficulty, search]);

  /* 4 ─ random pick */
  const flatTopics = useMemo(
    () =>
      sheetFiltered.flatMap((s) => s.sub_steps.flatMap((l) => l.topics)),
    [sheetFiltered],
  );

  const [randomTopic, setRandomTopic] = useState<Topic | null>(null);
  useEffect(() => {
    if (showRandom && flatTopics.length) {
      setRandomTopic(
        flatTopics[Math.floor(Math.random() * flatTopics.length)],
      );
    }
  }, [showRandom, flatTopics]);

  /* 5 ─ render */
  if (isLoading) return <p className="p-4">Loading sheet…</p>;
  if (error)     return <p className="p-4 text-red-500">Failed to load sheet.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <Select
          value={difficulty}
          onValueChange={(v) => setDifficulty(v as Difficulty)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(['All', 'Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search problem…"
          className="sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="secondary"
          onClick={toggleRandom}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            showRandom && 'bg-brand/20 text-brand',
          )}
        >
          {showRandom ? 'Back to list' : 'Pick random'}
        </Button>
      </div>

      {/* Main content */}
      {showRandom && randomTopic ? (
        <div className="border rounded-xl p-6 bg-card">
          <h2 className="text-lg font-semibold mb-2">
            {randomTopic.question_title}
          </h2>
          {randomTopic.post_link && (
            <a
              href={randomTopic.post_link}
              target="_blank"
              rel="noreferrer"
              className="text-brand underline"
            >
              Open editorial
            </a>
          )}
        </div>
      ) : (
        <SheetAccordion sheet={sheetFiltered} />
      )}
    </div>
  );
}
