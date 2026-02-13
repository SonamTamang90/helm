import { useState } from "react";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { SortDir } from "@/types/common";

const PAGE_SIZE = 10;

interface UseTableStateReturn<TFilter extends string, TSortField extends string> {
  filter: TFilter;
  search: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sortField: TSortField | null;
  sortDir: SortDir;
  handleFilterChange: (value: TFilter) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSort: (field: TSortField) => void;
  paginate: <T>(data: T[]) => { paginated: T[]; totalPages: number };
}

export function useTableState<TFilter extends string, TSortField extends string>(
  initialFilter: TFilter
): UseTableStateReturn<TFilter, TSortField> {
  const [filter,    setFilter]    = useState<TFilter>(initialFilter);
  const [search,    setSearch]    = useState("");
  const [page,      setPage]      = useState(1);
  const [sortField, setSortField] = useState<TSortField | null>(null);
  const [sortDir,   setSortDir]   = useState<SortDir>("asc");

  function handleFilterChange(value: TFilter) {
    setFilter(value);
    setPage(1);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleSort(field: TSortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function paginate<T>(data: T[]): { paginated: T[]; totalPages: number } {
    const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
    const paginated  = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    return { paginated, totalPages };
  }

  return {
    filter,
    search,
    page,
    setPage,
    sortField,
    sortDir,
    handleFilterChange,
    handleSearch,
    handleSort,
    paginate,
  };
}
