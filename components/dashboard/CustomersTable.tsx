"use client";

import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { Customer, CustomerStatus } from "@/types/customer";
import type { SortDir } from "@/types/common";
import { customerStatusVariant } from "@/constants/status";
import { allCustomers } from "@/constants/customers";
import { useTableState } from "@/hooks/useTableState";
import { parseCurrency, parseDate, getInitials, exportToCsv, getPaginationRange } from "@/lib/utils";
import EmptyState from "@/components/ui/EmptyState";

type Filter = "all" | CustomerStatus;
const filters: { label: string; value: Filter }[] = [
  { label: "All",     value: "all"     },
  { label: "Active",  value: "active"  },
  { label: "Trial",   value: "trial"   },
  { label: "Churned", value: "churned" },
];

type SortField = "name" | "plan" | "mrr" | "ltv" | "status" | "joined";

function sortCustomers(data: Customer[], field: SortField, dir: SortDir) {
  return [...data].sort((a, b) => {
    let cmp = 0;
    if (field === "mrr" || field === "ltv") {
      cmp = parseCurrency(a[field]) - parseCurrency(b[field]);
    } else if (field === "joined") {
      cmp = parseDate(a.joined) - parseDate(b.joined);
    } else {
      cmp = a[field].localeCompare(b[field]);
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

const SearchIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField | null; sortDir: SortDir }) {
  const active = sortField === field;
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ml-1 inline-block shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-30"}`}
    >
      {!active || sortDir === "asc" ? (
        <polyline points="18 15 12 9 6 15" />
      ) : (
        <polyline points="6 9 12 15 18 9" />
      )}
    </svg>
  );
}

export default function CustomersTable() {
  const router = useRouter();
  const {
    filter, search, page, setPage,
    pageSize, handlePageSizeChange,
    sortField, sortDir,
    handleFilterChange, handleSearch, handleSort,
    paginate,
  } = useTableState<Filter, SortField>("all");

  const filtered = allCustomers.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sorted = sortField ? sortCustomers(filtered, sortField, sortDir) : filtered;
  const { paginated, totalPages } = paginate(sorted);

  function handleExport() {
    exportToCsv(
      "customers.csv",
      ["Customer", "Email", "Plan", "MRR", "LTV", "Status", "Joined"],
      sorted.map((c) => [c.name, c.email, c.plan, c.mrr, c.ltv, c.status, c.joined])
    );
  }

  const thClass = "sticky top-0 z-10 bg-surface px-5 py-3 text-left text-xs font-medium text-muted select-none";

  return (
    <Card className="p-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-surface-raised text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
          <Input
            icon={SearchIcon}
            placeholder="Search customer..."
            value={search}
            onChange={handleSearch}
            className="w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-300px)] scrollbar-hide">
      <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("name")}>
                Customer <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("plan")}>
                Plan <SortIcon field="plan" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("mrr")}>
                MRR <SortIcon field="mrr" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("ltv")}>
                LTV <SortIcon field="ltv" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("status")}>
                Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("joined")}>
                Joined <SortIcon field="joined" sortField={sortField} sortDir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    title="No customers found"
                    description="Try adjusting your search or filters."
                  />
                </td>
              </tr>
            ) : (
              paginated.map((customer, i) => (
                <tr
                  key={customer.id}
                  onClick={() => router.push(`/customers/${customer.id}`)}
                  className={`cursor-pointer transition-colors hover:bg-surface-raised/40 ${i !== paginated.length - 1 ? "border-b border-border" : ""}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={getInitials(customer.name)} size="sm" />
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-xs text-muted">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{customer.plan}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{customer.mrr}</td>
                  <td className="px-5 py-3.5 text-muted">{customer.ltv}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={customer.status} variant={customerStatusVariant[customer.status]} />
                  </td>
                  <td className="px-5 py-3.5 text-muted">{customer.joined}</td>
                </tr>
              ))
            )}
          </tbody>
      </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted">
            Showing {sorted.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </p>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-7 rounded border border-border bg-surface px-2 text-xs text-muted focus:outline-none focus:ring-1 focus:ring-border"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>{n} / page</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            ← Prev
          </button>
          {getPaginationRange(page, totalPages).map((p, i) =>
            p === null ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted select-none">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-7 rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                  page === p
                    ? "bg-surface-raised text-foreground"
                    : "text-muted hover:bg-surface-raised hover:text-foreground"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </Card>
  );
}
