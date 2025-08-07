"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from './TufDarkCircleLogo.png';
import logo2 from './TufPlus.png';

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;


  return (
    <aside
      className={cn(
        " top-0 left-0  z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 p-2 pt-2.5 pb-2.5",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      {isOpen && <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={cn("relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md  bg-[#17171799] border border-zinc-800 rounded-xl",
          !isOpen && "items-center"
        )}
      >
        <div
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            {isOpen ? (
              <Image src={logo2} alt="logo" width={62} height={62} />
            ) : (
              <Image src={logo} alt="logo" width={62} height={62} />
            )}

          </Link>
        </div>
        {!isOpen && (
          <Button
            onClick={() => toggleOpen?.()}
            className="rounded-md w-8 h-8"
            variant="outline"
            size="icon"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform ease-in-out duration-700",
                isOpen === false ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>
        )}

        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
