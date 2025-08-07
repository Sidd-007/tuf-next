// src/types/problem.ts
export interface Problem {
  problem_slug: string;
  problem_name: string;
  problem_statement: string;
  example1: string;
  example2: string;
  constraints: string;
  testcases: { inputs: { nums: string } }[];
  publicCpp?: string;
  publicJava?: string;
  publicPython?: string;
  publicJavascript?: string;
}
