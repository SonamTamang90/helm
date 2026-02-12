import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-2 h-4 w-56" />
      </div>

      <Card className="p-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-14" />
            ))}
          </div>
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Table header */}
        <div className="border-b border-border px-5 py-3">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`grid grid-cols-5 gap-4 px-5 py-3.5 ${i !== 9 ? "border-b border-border" : ""}`}
          >
            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-1.5 h-3 w-36" />
            </div>
            <Skeleton className="h-4 w-14 self-center" />
            <Skeleton className="h-4 w-10 self-center" />
            <Skeleton className="h-5 w-14 self-center rounded" />
            <Skeleton className="h-4 w-20 self-center" />
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
          <Skeleton className="h-3 w-32" />
          <div className="flex gap-1">
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-7" />
            <Skeleton className="h-6 w-7" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      </Card>
    </div>
  );
}
