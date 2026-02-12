import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

export default function CustomersLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <Card className="p-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16" />
            ))}
          </div>
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Table header */}
        <div className="border-b border-border px-5 py-3">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-14" />
            ))}
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-3.5 ${i !== 9 ? "border-b border-border" : ""}`}
          >
            {/* Customer col with avatar */}
            <div className="flex flex-1 items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full shrink-0" />
              <div>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-1.5 h-3 w-36" />
              </div>
            </div>
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-14 rounded" />
            <Skeleton className="h-4 w-16" />
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
