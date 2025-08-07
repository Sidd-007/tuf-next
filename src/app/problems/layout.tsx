
import NewComp from './NewComp';

export const metadata = { title: 'Problems | takeUforward' };

export default function ProblemsLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <NewComp>
      {children}
    </NewComp>
  );
}
