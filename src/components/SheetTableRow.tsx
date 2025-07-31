'use client';
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { CheckIcon, Plus, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToggleProgress } from '@/lib/mutations';
import { Topic } from '@/types/sheet';
import { cn } from '@/lib/utils';

export default function SheetTableRow({ topic }: { topic: Topic }) {
  const { mutate: toggleProgress } = useToggleProgress('demo@tuf.com');
  const [checked, setChecked] = useState(false);

  /** hydrate progress state once */
  useEffect(() => setChecked(topic.done === 1), [topic.done]);

  return (
    <TableRow className="bg-card dark:bg-[#252629]">
      {/* Status */}
      <TableCell className="text-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            toggleProgress({ id: topic.id, value: checked ? 0 : 1 });
            setChecked((c) => !c);
          }}
          className="h-4 w-4 accent-brand"
        />
      </TableCell>

      {/* Problem */}
      <TableCell>
        <a
          href={topic.post_link}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          {topic.question_title}
        </a>
      </TableCell>

      {/* Free resource */}
      <TableCell className="text-center">
        {topic.post_link ? (
          <a href={topic.post_link} target="_blank" rel="noreferrer">
            <CheckIcon className="h-4 w-4 stroke-brand" />
          </a>
        ) : (
          '-'
        )}
      </TableCell>

      {/* Note */}
      <TableCell className="text-center">
        <Plus className="h-4 w-4 cursor-pointer" /* open modal */ />
      </TableCell>

      {/* Revision */}
      <TableCell className="text-center">
        <Star className={topic.revision ? 'fill-yellow-500' : ''} />
      </TableCell>

      {/* Difficulty */}
      <TableCell className="text-center">
        <span
          className={cn(
            'rounded px-2 py-[2px] text-xs font-medium',
            topic.difficulty === 0 && 'bg-emerald-100 text-emerald-700',
            topic.difficulty === 1 && 'bg-amber-100 text-amber-700',
            topic.difficulty === 2 && 'bg-rose-100 text-rose-700'
          )}
        >
          {['Easy', 'Medium', 'Hard'][topic.difficulty]}
        </span>
      </TableCell>
    </TableRow>
  );
}
