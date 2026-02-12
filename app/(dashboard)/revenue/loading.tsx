import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

function StatCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-3.5 w-36" />
      <Skeleton className="mt-3 h-7 w-24" />
      <Skeleton className="mt-2.5 h-3 w-20" />
    </Card>
  );
}

export default function RevenueLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>

      {/* Revenue trend */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1.5 h-3 w-48" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
        <Skeleton className="mt-6 h-72 w-full" />
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-1.5 h-3 w-44" />
          <Skeleton className="mt-6 h-60 w-full" />
        </Card>

        <Card className="p-0 lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-1.5 h-3 w-44" />
          </div>
          <div className="flex flex-col gap-0 px-5 py-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border py-3 last:border-0">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
