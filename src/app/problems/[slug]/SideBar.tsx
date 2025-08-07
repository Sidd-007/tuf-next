import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import clsx from 'clsx';
import sheet from '@/lib/staticProblemList';      // tiny JSON list

export default function SideBar({ selected }: { selected: string }) {
  return (
    <aside className="w-64 bg-zinc-900 text-white border-r border-border hidden md:block">
      <div className="h-14 flex items-center px-4 font-bold">TUF ▸ DSA Basic</div>
      <ScrollArea className="h-[calc(100%-3.5rem)]">
        {sheet.map(item => (
          <Link
            key={item.problem_slug}
            href={`/problems/${item.problem_slug}`}
            className={clsx(
              'block px-4 py-2 text-sm hover:bg-zinc-800/60 transition-colors',
              item.problem_slug === selected && 'bg-zinc-800 text-brand-400'
            )}
          >
            {item.problem_name}
          </Link>
        ))}
      </ScrollArea>
    </aside>
  );
}
