import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

function StatCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-3.5 w-32" />
      <Skeleton className="mt-3 h-7 w-24" />
      <Skeleton className="mt-2.5 h-3 w-20" />
    </Card>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="px-5 py-3.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-1.5 h-3 w-24" />
      </td>
      <td className="px-5 py-3.5"><Skeleton className="h-4 w-14" /></td>
      <td className="px-5 py-3.5"><Skeleton className="h-4 w-10" /></td>
      <td className="px-5 py-3.5"><Skeleton className="h-5 w-14 rounded" /></td>
      <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
    </tr>
  );
}

export default function OverviewLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-1.5 h-3 w-52" />
          <Skeleton className="mt-6 h-60 w-full" />
        </Card>
        <Card>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-1.5 h-3 w-40" />
          <Skeleton className="mt-6 h-60 w-full" />
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-1.5 h-3 w-28" />
          </div>
          <Skeleton className="h-3 w-14" />
        </div>
        <table className="w-full">
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
