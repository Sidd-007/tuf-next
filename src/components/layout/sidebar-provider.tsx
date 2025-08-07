// src/components/layout/sidebar-provider.tsx
'use client'
import * as React from 'react'
import { SidebarContext, SidebarTrigger } from '@/components/ui/sidebar'

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <SidebarContext.Provider value={{
      state: open ? "expanded" : "collapsed",
      openMobile: open,
      setOpenMobile: setOpen,
      isMobile: false,
      toggleSidebar: () => setOpen(o => !o),
      open: open,
      setOpen: setOpen,
    }}>
      {children}
      {/* trigger (only visible on < md) */}
      <SidebarTrigger className="fixed bottom-4 left-4 z-50 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-lg md:hidden">
        Menu
      </SidebarTrigger>
    </SidebarContext.Provider>
  )
}
