"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type Status = "paid" | "pending" | "failed";

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: Status;
  date: string;
}

const allTransactions: Transaction[] = [
  { id: "1",  customer: "Acme Corp",         email: "billing@acme.com",       plan: "Pro",        amount: "$299", status: "paid",    date: "Feb 12, 2026" },
  { id: "2",  customer: "Globex Inc",         email: "finance@globex.com",     plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 11, 2026" },
  { id: "3",  customer: "Initech",            email: "accounts@initech.com",   plan: "Enterprise", amount: "$599", status: "pending", date: "Feb 11, 2026" },
  { id: "4",  customer: "Umbrella Co",        email: "billing@umbrella.com",   plan: "Pro",        amount: "$299", status: "failed",  date: "Feb 10, 2026" },
  { id: "5",  customer: "Stark Industries",   email: "tony@stark.com",         plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 10, 2026" },
  { id: "6",  customer: "Bluth Company",      email: "gob@bluth.com",          plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 09, 2026" },
  { id: "7",  customer: "Pied Piper",         email: "richard@piedpiper.com",  plan: "Pro",        amount: "$299", status: "pending", date: "Feb 09, 2026" },
  { id: "8",  customer: "Hooli",              email: "gavin@hooli.com",        plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 08, 2026" },
  { id: "9",  customer: "Dunder Mifflin",     email: "michael@dm.com",         plan: "Basic",      amount: "$99",  status: "failed",  date: "Feb 08, 2026" },
  { id: "10", customer: "Vandelay Industries",email: "art@vandelay.com",       plan: "Pro",        amount: "$299", status: "paid",    date: "Feb 07, 2026" },
  { id: "11", customer: "Prestige Worldwide", email: "boats@prestige.com",     plan: "Basic",      amount: "$99",  status: "paid",    date: "Feb 07, 2026" },
  { id: "12", customer: "Waystar Royco",      email: "logan@waystar.com",      plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 06, 2026" },
  { id: "13", customer: "Cyberdyne Systems",  email: "miles@cyberdyne.com",    plan: "Pro",        amount: "$299", status: "pending", date: "Feb 06, 2026" },
  { id: "14", customer: "Soylent Corp",       email: "nate@soylent.com",       plan: "Basic",      amount: "$99",  status: "failed",  date: "Feb 05, 2026" },
  { id: "15", customer: "Buy n Large",        email: "ceo@buynlarge.com",      plan: "Enterprise", amount: "$599", status: "paid",    date: "Feb 05, 2026" },
];

const statusVariant: Record<Status, "success" | "warning" | "destructive"> = {
  paid:    "success",
  pending: "warning",
  failed:  "destructive",
};

type Filter = "all" | Status;
const filters: { label: string; value: Filter }[] = [
  { label: "All",     value: "all"     },
  { label: "Paid",    value: "paid"    },
  { label: "Pending", value: "pending" },
  { label: "Failed",  value: "failed"  },
];

type SortField = "customer" | "plan" | "amount" | "status" | "date";
type SortDir   = "asc" | "desc";

const PAGE_SIZE = 10;

function parseDollar(v: string) {
  return parseFloat(v.replace(/[$,]/g, ""));
}

function parseTxDate(v: string) {
  return new Date(v).getTime();
}

function sortTransactions(data: Transaction[], field: SortField, dir: SortDir) {
  return [...data].sort((a, b) => {
    let cmp = 0;
    if (field === "amount") {
      cmp = parseDollar(a.amount) - parseDollar(b.amount);
    } else if (field === "date") {
      cmp = parseTxDate(a.date) - parseTxDate(b.date);
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
  const [filter,    setFilter]    = useState<Filter>("all");
  const [search,    setSearch]    = useState("");
  const [page,      setPage]      = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir,   setSortDir]   = useState<SortDir>("asc");

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  const filtered = allTransactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.status === filter;
    const matchesSearch =
      tx.customer.toLowerCase().includes(search.toLowerCase()) ||
      tx.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sorted    = sortField ? sortTransactions(filtered, sortField, sortDir) : filtered;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(value: Filter) {
    setFilter(value);
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  const thClass = "px-5 py-3 text-left text-xs font-medium text-muted select-none";

  return (
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

        {/* Search */}
        <Input
          icon={SearchIcon}
          placeholder="Search customer..."
          value={search}
          onChange={handleSearch}
          className="w-48"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginated.map((tx, i) => (
                <tr
                  key={tx.id}
                  className={`transition-colors hover:bg-surface-raised/40 ${i !== paginated.length - 1 ? "border-b border-border" : ""}`}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{tx.customer}</p>
                    <p className="text-xs text-muted">{tx.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{tx.plan}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{tx.amount}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={tx.status} variant={statusVariant[tx.status]} />
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
        <p className="text-xs text-muted">
          Showing {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`min-w-[28px] rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                page === p
                  ? "bg-surface-raised text-foreground"
                  : "text-muted hover:bg-surface-raised hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
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
