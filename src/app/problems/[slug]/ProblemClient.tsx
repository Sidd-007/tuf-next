'use client';

import {
  Action,
  Layout as FlexLayout,
  Model,
  TabNode,
} from 'flexlayout-react';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { Problem } from '@/app/problems/types';
import { jsonModel } from './layoutModel';

const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type Props = { problem: Problem };

type Lang = 'cpp' | 'java' | 'python' | 'javascript';

export default function ProblemClient({ problem }: Props) {
  const [lang] = useState<Lang>('cpp');
  const starter = useMemo(() => {
    // Map language to the correct property on Problem
    const langKeyMap: Record<Lang, keyof Problem> = {
      cpp: 'publicCpp',
      java: 'publicJava',
      python: 'publicPy',
      javascript: 'publicJs',
    };
    const key = langKeyMap[lang];
    const value = problem[key];
    return typeof value === 'string' ? value : '';
  }, [lang, problem]);
  const [code, setCode] = useState(starter);

  /* ───── FlexLayout bits ───── */
  const model = useMemo(() => Model.fromJson(jsonModel), []);
  const layoutRef = useRef<FlexLayout | null>(null);

  const handleAction = useCallback((a: Action) => a, []);

  const factory = (node: TabNode) => {
    switch (node.getComponent()) {
      case 'description':
        return (
          <article
            className="prose prose-invert max-w-none p-6 overflow-y-auto scrollbar"
            dangerouslySetInnerHTML={{ __html: problem.problem_statement }}
          />
        );

      case 'code':
        return (
          <Monaco
            language={lang === 'cpp' ? 'cpp' : lang}
            theme="vs-dark"
            value={typeof code === 'string' ? code : ''}
            onChange={(v) => setCode(v || '')}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
            className="h-full w-full"
          />
        );

      case 'tests':
        return (
          <pre className="p-4 text-sm overflow-y-auto scrollbar">
            {JSON.stringify(problem.testcases, null, 2)}
          </pre>
        );

      default:
        return <div className="p-4">No component</div>;
    }
  };

  /* ───── render ───── */
  return (
    <div className="h-full bg-black p-2 scrollbar">
      <div className="h-full rounded-lg overflow-hidden border border-zinc-800">
        <FlexLayout
          ref={layoutRef}
          model={model}
          factory={factory}
          onAction={handleAction}
          realtimeResize
        />
      </div>
    </div>
  );
}
