/**  ─── High-level ────────────────────────────────────────── */
export interface Problem {
  // identity
  problem_id:    string;
  problem_slug:  string;
  problem_name:  string;
  problem_type:  'DSA' | 'SystemDesign' | string;

  // description & examples (raw HTML from backend)
  problem_statement: string;
  example1?: string;
  example2?: string;
  example3?: string;
  constraints: string;

  // metadata & grouping
  subject_name: string;
  subject_slug: string;
  cat_id:       string;
  subcatid:     string;
  rank:         number;
  points:       number;
  difficulty:   'Easy' | 'Medium' | 'Hard' | string;

  // IDE / code
  hasIDE:                 0 | 1;
  publicCpp?:             string;
  publicJava?:            string;
  publicPy?:              string;
  publicJs?:              string;
  publicCsharp?:          string;
  publicGo?:              string;
  languages_supported?:   Record<string, unknown>; // backend sends "{}"

  /** Miscellaneous nested info */
  misc: Misc;

  /** Rich editorial pieces (solutions, videos …) */
  new_editorial?:  EditorialPiece[];
  dsa_editorial_data?: EditorialPiece[];

  /** Test-runner */
  inputAndOutputStructure?: IOShape;
  testcases?:              TestCase[];

  /** Gamification options */
  hasGamification?:      0 | 1;
  gamificationOptions?:  string[];
  gamification_ouput?:   string;

  /** Crowd feedback */
  totalLikes?:    number;
  totalDislikes?: number;
}

/**  ─── Nested helper types ───────────────────────────────── */
export interface Misc {
  tags?:          string[];
  facts?:         string;
  hints?:         { hint: string }[];
  language?:      string[];
  topicTags?:     string[];
  difficulty?:    'Easy' | 'Medium' | 'Hard' | string;
  similarProblems?: SimilarProblem[];
  frequently_occuring_doubts?: QA[];
  interview_followup_questions?: QA[];
}

export interface SimilarProblem {
  name:   string;
  slug:   string;
  isPaid: boolean;
}

export interface QA {
  question: string;
  answer:   string;
}

export interface EditorialPiece {
  id?:    number;
  name:   string;
  asset_id?:  string;       // video id
  editorial:  string;       // gigantic HTML string
  placeholder?: string;     // tpstreams embed
}

export interface IOShape {
  input_structure:  IOField[];
  output_structure: { type: 'array' | 'string' | 'integer' | string };
}

export interface IOField {
  type:    string;          // "array"
  label:   string;          // "nums"
  subtype: string;          // "integer"
}

export interface TestCase {
  inputs:        Record<string, string>; // { nums: "[1,2,3]" }
  parsedInput:   string;
  parsedOutput?: string;
}
