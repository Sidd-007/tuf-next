import { create } from 'zustand';

type Difficulty = 'All'|'Easy'|'Medium'|'Hard';

export const useSheetUI = create<{
  difficulty: Difficulty;
  search: string;
  showRevision: boolean;
  showRandom: boolean;
  setDifficulty(d: Difficulty): void;
  setSearch(q: string): void;
  toggleRevision(): void;
  toggleRandom(): void;
}>()((set) => ({
  difficulty: 'All',
  search: '',
  showRevision: false,
  showRandom : false,
  setDifficulty: (difficulty) => set({ difficulty }),
  setSearch   : (search)     => set({ search }),
  toggleRevision: () => set((s) => ({ showRevision: !s.showRevision })),
  toggleRandom : () => set((s) => ({ showRandom : !s.showRandom  })),
}));
