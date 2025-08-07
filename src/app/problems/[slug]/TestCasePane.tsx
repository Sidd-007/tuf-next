import type { Problem } from '@/app/problems/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type Props = { problem: Problem };

export default function TestCasePane({ problem }: Props) {
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="case1" className="border-b border-border">
        <TabsList>
          {problem.testcases?.map((_, i: number) => (
            <TabsTrigger key={i} value={`case${i + 1}`}>Case {i + 1}</TabsTrigger>
          ))}
        </TabsList>

        {problem.testcases?.map((tc, i: number) => (
          <TabsContent key={i} value={`case${i + 1}`} className="flex-1 p-4">
            <label className="text-xs font-mono text-muted-foreground">Nums</label>
            <Textarea value={tc.inputs.nums} readOnly className="h-32 resize-none mt-1" />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
