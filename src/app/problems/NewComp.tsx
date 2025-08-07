"use client"

import { Sidebar } from '@/components/admin-panel/sidebar'
import React from 'react'
import { Navbar } from '../NavBar'
import { cn } from '@/lib/utils'
import { useStore } from 'zustand'
import { useSidebar } from '@/hooks/use-sidebar'

const NewComp = ({ children }: { children: React.ReactNode }) => {
    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { getOpenState, settings } = sidebar;
    return (
        <div className='h-[100vh] flex'>
            <Sidebar />
            <div className="flex h-full w-full flex-col">
                {/* LEFT RAIL */}
                {/* MAIN PANE */}
                <Navbar title="Problems" />
                <div className={cn('flex w-full   flex-grow overflow-y-hidden p-[10px] pl-1', !settings.disabled && (!getOpenState() ? "min-w-[var(--nav-min-w,0px)]" : "min-w-[var(--nav-min-w-open,0px)]"))}>

                    <div className="relative flex h-full w-full">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default NewComp