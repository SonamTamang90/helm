import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function CustomerDetailLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Skeleton className="h-4 w-32" />

      {/* Header */}
      <Card>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3.5 w-56" />
          </div>
        </div>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-2 h-6 w-16" />
          </Card>
        ))}
      </div>

      {/* Transactions */}
      <Card className="p-0">
        <div className="border-b border-border px-5 py-4 flex flex-col gap-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-5 py-3.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-12" />
              <Skeleton className="h-3.5 w-10" />
              <Skeleton className="h-5 w-14 rounded" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
