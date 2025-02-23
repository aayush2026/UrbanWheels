"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{ expanded: boolean }>({ expanded: true })

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)
  return (
    <SidebarContext.Provider value={{ expanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen w-64 border-r">
      <nav className="flex h-full flex-col">{children}</nav>
    </aside>
  )
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b p-4">{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p-4">{children}</div>
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return <div className="border-t p-4">{children}</div>
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
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900",
        isActive && "bg-gray-100 text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
} 