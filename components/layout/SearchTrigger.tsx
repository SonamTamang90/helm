"use client";

import { useEffect, useState } from "react";

interface SearchTriggerProps {
  onClick: () => void;
}

export default function SearchTrigger({ onClick }: SearchTriggerProps) {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <button
      onClick={onClick}
      aria-label="Search (Cmd+K)"
      className="flex h-7 items-center justify-center gap-2 border border-border px-2 text-muted transition-colors hover:text-foreground sm:px-3"
    >
      {/* Search icon — always visible */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      {/* Keyboard shortcut badge */}
      <kbd className="flex items-center gap-px bg-surface-raised px-1.5 py-0.5 font-mono">
        {isMac
          ? <><span className="text-sm leading-none">⌘</span><span className="text-[11px] leading-none">K</span></>
          : <span className="text-[10px] leading-none">Ctrl K</span>
        }
      </kbd>
    </button>
  );
}
