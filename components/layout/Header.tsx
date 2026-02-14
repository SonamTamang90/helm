"use client";

import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { pageTitles } from "@/constants/nav";

interface HeaderProps {
  onToggle: () => void;
  collapsed: boolean;
}

export default function Header({ onToggle, collapsed }: HeaderProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "";
  const showDateRange = pathname !== "/settings";

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border bg-surface px-4">
      {/* Sidebar toggle — hamburger on mobile, chevron on desktop */}
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
      >
        {/* Mobile: always show hamburger */}
        <svg className="lg:hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6"  x2="21" y2="6"  />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        {/* Desktop: chevron direction reflects sidebar state */}
        {collapsed ? (
          <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        ) : (
          <svg className="hidden lg:block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
      </button>

      {/* Page title */}
      {title && (
        <span className="ml-3 text-sm font-medium text-foreground">{title}</span>
      )}

      <div className="ml-auto flex items-center gap-3">
        {showDateRange && <DateRangePicker />}

        <button
          aria-label="Notifications"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <Avatar initials="ST" />
      </div>
    </header>
  );
}
