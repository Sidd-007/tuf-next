import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10  bg-[#171717] mt-2.5 mr-2 rounded-md ">
      <div className="mx-4 sm:mx-8 flex h-10 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <span className="font-bold text-[14px]">{title}</span>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
