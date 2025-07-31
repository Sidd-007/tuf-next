export interface Topic {
  question_title: ReactNode;
  id: number;
  title: string;
  difficulty: 0 | 1 | 2;
  post_link?: string;
  yt_link?: string;
  lc_link?: string;
  plus_link?: string;
  editorial_link?: string;
  revision?: boolean;
  done?: number;
}

export interface SheetStep {
  step_no: number;
  step_title: string;
  sub_steps: {
    sub_step_no: number;
    sub_step_title: string;
    topics: Topic[];
  }[];
}