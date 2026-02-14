"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { mainNav, bottomNav } from "@/constants/nav";
import { allCustomers } from "@/constants/customers";
import { getInitials } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  icon?: React.ReactNode;
  group: "navigation" | "customers";
}

export default function CommandPalette() {
  const [open, setOpen]               = useState(false);
  const [query, setQuery]             = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router   = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Refs for stale-closure-safe access inside event listener callbacks
  const openRef   = useRef(false);
  const activeRef = useRef(0);
  const itemsRef  = useRef<CommandItem[]>([]);

  useEffect(() => { openRef.current   = open;        }, [open]);
  useEffect(() => { activeRef.current = activeIndex; }, [activeIndex]);

  const q = query.toLowerCase().trim();

  const navItems = useMemo<CommandItem[]>(
    () =>
      [...mainNav, ...bottomNav]
        .filter((n) => !q || n.label.toLowerCase().includes(q))
        .map((n) => ({
          id:    `nav:${n.href}`,
          label: n.label,
          href:  n.href,
          icon:  n.icon,
          group: "navigation" as const,
        })),
    [q]
  );

  const customerItems = useMemo<CommandItem[]>(
    () =>
      allCustomers
        .filter(
          (c) =>
            !!q &&
            (c.name.toLowerCase().includes(q) ||
              c.email.toLowerCase().includes(q))
        )
        .slice(0, 5)
        .map((c) => ({
          id:       `customer:${c.id}`,
          label:    c.name,
          sublabel: c.email,
          href:     `/customers/${c.id}`,
          group:    "customers" as const,
        })),
    [q]
  );

  const items = useMemo(
    () => [...navItems, ...customerItems],
    [navItems, customerItems]
  );

  useEffect(() => { itemsRef.current = items; }, [items]);

  // Focus input when opening (pure DOM side-effect — no setState)
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Global Cmd+K / Ctrl+K — setState calls are inside the event callback, not the effect body
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!((e.metaKey || e.ctrlKey) && e.key === "k")) return;
      e.preventDefault();
      if (openRef.current) {
        setOpen(false); setQuery(""); setActiveIndex(0);
      } else {
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []); // safe: reads open via ref

  // Keyboard navigation — setState calls are inside the event callback
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false); setQuery(""); setActiveIndex(0);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, itemsRef.current.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const item = itemsRef.current[activeRef.current];
        if (item) { router.push(item.href); setOpen(false); setQuery(""); setActiveIndex(0); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, router]);

  function go(href: string) {
    router.push(href);
    setOpen(false); setQuery(""); setActiveIndex(0);
  }

  function dismiss() {
    setOpen(false); setQuery(""); setActiveIndex(0);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={dismiss} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border border-border bg-surface shadow-xl">

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Search pages and customers..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
          />
          <kbd className="hidden items-center rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted sm:flex">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto scrollbar-hide">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No results</p>
          ) : (
            <div className="py-2">
              {/* Navigation group */}
              {navItems.length > 0 && (
                <div>
                  <p className="px-4 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-muted">
                    Navigation
                  </p>
                  {navItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => go(item.href)}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                        activeIndex === i
                          ? "bg-surface-raised text-foreground"
                          : "text-muted hover:bg-surface-raised hover:text-foreground"
                      }`}
                    >
                      <span className="shrink-0 text-muted">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Customers group */}
              {customerItems.length > 0 && (
                <div className={navItems.length > 0 ? "mt-1" : ""}>
                  <p className="px-4 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-muted">
                    Customers
                  </p>
                  {customerItems.map((item, i) => {
                    const idx = navItems.length + i;
                    return (
                      <button
                        key={item.id}
                        onClick={() => go(item.href)}
                        className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
                          activeIndex === idx
                            ? "bg-surface-raised"
                            : "hover:bg-surface-raised"
                        }`}
                      >
                        <Avatar initials={getInitials(item.label)} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.sublabel && (
                            <p className="text-xs text-muted">{item.sublabel}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2">
          {([["↑↓", "navigate"], ["↵", "open"], ["esc", "close"]] as const).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1 text-[11px] text-muted">
              <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[10px]">{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
