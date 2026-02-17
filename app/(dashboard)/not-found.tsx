import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-5xl font-semibold text-foreground">404</p>
      <p className="text-sm text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/overview"
        className="mt-2 rounded border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
      >
        Back to Overview
      </Link>
    </div>
  );
}
