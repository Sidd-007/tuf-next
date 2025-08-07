import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible  absolute b top-[24px] backdrop-filter backdrop-blur-sm bg-opacity-10 -right-[10px]  z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8 bg-primary/90"
        variant="outline"
        size="icon"
      >
        <ArrowLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
