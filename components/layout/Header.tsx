import Avatar from "@/components/ui/Avatar";

export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border bg-surface px-6">
      <div className="ml-auto flex items-center gap-3">
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
