"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { Customer, CustomerStatus } from "@/types/customer";
import type { SortDir } from "@/types/common";
import { customerStatusVariant } from "@/constants/status";
import { useTableState } from "@/hooks/useTableState";

const allCustomers: Customer[] = [
  { id: "1",  name: "Acme Corp",          email: "billing@acme.com",       plan: "Pro",        mrr: "$299",  ltv: "$3,588",  status: "active",  joined: "Mar 2024" },
  { id: "2",  name: "Globex Inc",          email: "finance@globex.com",     plan: "Basic",      mrr: "$99",   ltv: "$1,188",  status: "active",  joined: "Apr 2024" },
  { id: "3",  name: "Initech",             email: "accounts@initech.com",   plan: "Enterprise", mrr: "$599",  ltv: "$7,188",  status: "trial",   joined: "Jan 2026" },
  { id: "4",  name: "Umbrella Co",         email: "billing@umbrella.com",   plan: "Pro",        mrr: "$299",  ltv: "$1,196",  status: "churned", joined: "Jun 2024" },
  { id: "5",  name: "Stark Industries",    email: "tony@stark.com",         plan: "Enterprise", mrr: "$599",  ltv: "$14,376", status: "active",  joined: "Jan 2024" },
  { id: "6",  name: "Bluth Company",       email: "gob@bluth.com",          plan: "Basic",      mrr: "$99",   ltv: "$594",    status: "active",  joined: "Sep 2024" },
  { id: "7",  name: "Pied Piper",          email: "richard@piedpiper.com",  plan: "Pro",        mrr: "$299",  ltv: "$897",    status: "trial",   joined: "Feb 2026" },
  { id: "8",  name: "Hooli",               email: "gavin@hooli.com",        plan: "Enterprise", mrr: "$599",  ltv: "$10,782", status: "active",  joined: "Feb 2024" },
  { id: "9",  name: "Dunder Mifflin",      email: "michael@dm.com",         plan: "Basic",      mrr: "$99",   ltv: "$693",    status: "churned", joined: "Jul 2024" },
  { id: "10", name: "Vandelay Industries", email: "art@vandelay.com",       plan: "Pro",        mrr: "$299",  ltv: "$5,382",  status: "active",  joined: "May 2023" },
  { id: "11", name: "Prestige Worldwide",  email: "boats@prestige.com",     plan: "Basic",      mrr: "$99",   ltv: "$1,485",  status: "active",  joined: "Nov 2023" },
  { id: "12", name: "Waystar Royco",       email: "logan@waystar.com",      plan: "Enterprise", mrr: "$599",  ltv: "$21,564", status: "active",  joined: "Aug 2022" },
  { id: "13", name: "Cyberdyne Systems",   email: "miles@cyberdyne.com",    plan: "Pro",        mrr: "$299",  ltv: "$598",    status: "trial",   joined: "Feb 2026" },
  { id: "14", name: "Soylent Corp",        email: "nate@soylent.com",       plan: "Basic",      mrr: "$99",   ltv: "$396",    status: "churned", joined: "Oct 2024" },
  { id: "15", name: "Buy n Large",         email: "ceo@buynlarge.com",      plan: "Enterprise", mrr: "$599",  ltv: "$8,386",  status: "active",  joined: "Mar 2023" },
];

type Filter = "all" | CustomerStatus;
const filters: { label: string; value: Filter }[] = [
  { label: "All",     value: "all"     },
  { label: "Active",  value: "active"  },
  { label: "Trial",   value: "trial"   },
  { label: "Churned", value: "churned" },
];

type SortField = "name" | "plan" | "mrr" | "ltv" | "status" | "joined";

function parseDollar(v: string) {
  return parseFloat(v.replace(/[$,]/g, ""));
}

function parseJoinedDate(v: string) {
  return new Date(v).getTime();
}

function sortCustomers(data: Customer[], field: SortField, dir: SortDir) {
  return [...data].sort((a, b) => {
    let cmp = 0;
    if (field === "mrr" || field === "ltv") {
      cmp = parseDollar(a[field]) - parseDollar(b[field]);
    } else if (field === "joined") {
      cmp = parseJoinedDate(a.joined) - parseJoinedDate(b.joined);
    } else {
      cmp = a[field].localeCompare(b[field]);
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
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
  const {
    filter, search, page, setPage,
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

  const thClass = "px-5 py-3 text-left text-xs font-medium text-muted select-none";

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
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted">
                  No customers found.
                </td>
              </tr>
            ) : (
              paginated.map((customer, i) => (
                <tr
                  key={customer.id}
                  className={`transition-colors hover:bg-surface-raised/40 ${i !== paginated.length - 1 ? "border-b border-border" : ""}`}
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
        <p className="text-xs text-muted">
          Showing {sorted.length === 0 ? 0 : (page - 1) * 10 + 1}–{Math.min(page * 10, sorted.length)} of {sorted.length}
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
