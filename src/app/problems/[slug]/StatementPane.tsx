import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Card } from '@/components/ui/card';
import '@/styles/problem.css';           // bullet & heading tweaks

type Problem = {
  problem_name: string;
  problem_statement: string;
  example1: string;
  example2: string;
  constraints: string;
};

interface StatementPaneProps {
  problem: Problem;
}

export default function StatementPane({ problem }: StatementPaneProps) {
  return (
    <Card className="h-full overflow-y-auto prose prose-invert px-8 py-6">
      <h1>{problem.problem_name}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSlug]}>
        {problem.problem_statement
          + '\n\n' + problem.example1
          + '\n\n' + problem.example2
          + '\n\n### Constraints\n' + problem.constraints}
      </ReactMarkdown>
    </Card>
  );
}
