'use client';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { useSheetUI } from '@/store/sheet-ui';      // shadcn helper
// Make sure SheetTableRow.tsx exists in the same folder, or update the path if it's elsewhere
import Row from './SheetTableRow';
import { Topic } from '@/types/sheet';

export default function SheetTable({ topics }: { topics: Topic[] }) {
  const showRandom = useSheetUI((s) => s.showRandom);
  if (showRandom) return null;

  return (
    <div className="rounded-xl border dark:border-dark_40 overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-[5%] text-center">Status</TableHead>
            <TableHead className="w-[25%]">Problem</TableHead>
            <TableHead className="w-[10%] text-center">Free</TableHead>
            <TableHead className="w-[10%] text-center">Note</TableHead>
            <TableHead className="w-[10%] text-center">Revision</TableHead>
            <TableHead className="w-[10%] text-center">Difficulty</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {topics.map((t) => (
            <Row key={t.id} topic={t} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
