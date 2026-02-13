"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { mainNav, bottomNav } from "@/constants/nav";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ collapsed, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-background transition-all duration-200 ease-in-out lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 ${collapsed ? "lg:w-14" : "lg:w-60"} ${mobileOpen ? "w-60 translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className={`flex h-14 shrink-0 items-center border-b border-border ${collapsed ? "lg:justify-center lg:px-0" : "gap-2.5 px-5"}`}>
        <Logo />
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight text-foreground">Helm</span>
        )}
      </div>

      {/* Main navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {mainNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${collapsed ? "lg:justify-center" : "gap-3"} ${isActive ? "bg-surface-raised text-foreground" : "text-muted hover:bg-surface-raised/60 hover:text-foreground"}`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <div className="flex flex-col gap-0.5 border-t border-border p-2">
        {bottomNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${collapsed ? "lg:justify-center" : "gap-3"} ${isActive ? "bg-surface-raised text-foreground" : "text-muted hover:bg-surface-raised/60 hover:text-foreground"}`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
