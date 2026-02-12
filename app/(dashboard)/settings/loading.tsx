import Skeleton from "@/components/ui/Skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-20" />
        <Skeleton className="mt-2 h-4 w-60" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar nav */}
        <div className="flex w-44 shrink-0 flex-col gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded border border-border bg-surface p-6">
          {/* Section header */}
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-2 h-4 w-56" />

          <div className="my-6 h-px bg-border" />

          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div>
              <Skeleton className="h-7 w-28" />
              <Skeleton className="mt-1.5 h-3 w-36" />
            </div>
          </div>

          {/* Form fields */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* Save button */}
          <div className="mt-6 flex justify-end">
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
