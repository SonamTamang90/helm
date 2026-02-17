"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TransactionDetailModal from "@/components/dashboard/TransactionDetailModal";
import type { Transaction, TransactionStatus } from "@/types/transaction";
import type { SortDir } from "@/types/common";
import { transactionStatusVariant } from "@/constants/status";
import { allTransactions } from "@/constants/transactions";
import { useTableState } from "@/hooks/useTableState";
import { parseCurrency, parseDate, getPeriodCutoff, exportToCsv, getPaginationRange } from "@/lib/utils";
import { useDateRange } from "@/context/DateRangeContext";
import EmptyState from "@/components/ui/EmptyState";

type Filter = "all" | TransactionStatus;
const filters: { label: string; value: Filter }[] = [
  { label: "All",     value: "all"     },
  { label: "Paid",    value: "paid"    },
  { label: "Pending", value: "pending" },
  { label: "Failed",  value: "failed"  },
];

type SortField = "customer" | "plan" | "amount" | "status" | "date";

function sortTransactions(data: Transaction[], field: SortField, dir: SortDir) {
  return [...data].sort((a, b) => {
    let cmp = 0;
    if (field === "amount") {
      cmp = parseCurrency(a.amount) - parseCurrency(b.amount);
    } else if (field === "date") {
      cmp = parseDate(a.date) - parseDate(b.date);
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

export default function TransactionsTable() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const { period } = useDateRange();
  const {
    filter, search, page, setPage,
    pageSize, handlePageSizeChange,
    sortField, sortDir,
    handleFilterChange, handleSearch, handleSort,
    paginate,
  } = useTableState<Filter, SortField>("all");

  const cutoff = getPeriodCutoff(period);
  const filtered = allTransactions.filter((tx) => {
    const inPeriod    = new Date(tx.date) >= cutoff;
    const matchesFilter = filter === "all" || tx.status === filter;
    const matchesSearch =
      tx.customer.toLowerCase().includes(search.toLowerCase()) ||
      tx.email.toLowerCase().includes(search.toLowerCase());
    return inPeriod && matchesFilter && matchesSearch;
  });

  const sorted = sortField ? sortTransactions(filtered, sortField, sortDir) : filtered;
  const { paginated, totalPages } = paginate(sorted);

  function handleExport() {
    exportToCsv(
      "transactions.csv",
      ["Customer", "Email", "Plan", "Amount", "Status", "Date"],
      sorted.map((tx) => [tx.customer, tx.email, tx.plan, tx.amount, tx.status, tx.date])
    );
  }

  const thClass = "sticky top-0 z-10 bg-surface px-5 py-3 text-left text-xs font-medium text-muted select-none";

  return (
    <>
    <Card className="p-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        {/* Status filters */}
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
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("customer")}>
                Customer <SortIcon field="customer" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("plan")}>
                Plan <SortIcon field="plan" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("amount")}>
                Amount <SortIcon field="amount" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("status")}>
                Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thClass} cursor-pointer hover:text-foreground`} onClick={() => handleSort("date")}>
                Date <SortIcon field="date" sortField={sortField} sortDir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState
                    title="No transactions found"
                    description="Try adjusting your search, filters, or date range."
                  />
                </td>
              </tr>
            ) : (
              paginated.map((tx, i) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className={`cursor-pointer transition-colors hover:bg-surface-raised/40 ${i !== paginated.length - 1 ? "border-b border-border" : ""}`}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{tx.customer}</p>
                    <p className="text-xs text-muted">{tx.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{tx.plan}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{tx.amount}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={tx.status} variant={transactionStatusVariant[tx.status]} />
                  </td>
                  <td className="px-5 py-3.5 text-muted">{tx.date}</td>
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

    <TransactionDetailModal
      transaction={selectedTx}
      onClose={() => setSelectedTx(null)}
    />
    </>
  );
}
