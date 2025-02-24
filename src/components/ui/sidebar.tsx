"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from '@/context/ThemeContext'

const SidebarContext = React.createContext<{ expanded: boolean; toggleSidebar: () => void }>({
  expanded: true,
  toggleSidebar: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)

  const toggleSidebar = () => setExpanded((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded } = React.useContext(SidebarContext)
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <aside className={cn(
      "h-screen transition-all duration-300 border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700", 
      expanded ? "w-64" : "w-16"
    )}>
      <nav className="flex h-full flex-col">
        {children}
      </nav>
    </aside>
  )
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b p-4 border-gray-200 dark:border-gray-700">{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p-4">{children}</div>
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return <div className="border-t p-4 border-gray-200 dark:border-gray-700">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2">{children}</ul>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  children,
  className,
  isActive,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
        isActive && "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarTrigger() {
  const { toggleSidebar } = React.useContext(SidebarContext)

  return (
    <button 
      className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
      onClick={toggleSidebar}
    >
      ☰
    </button>
  )
}
