export type SortDir = "asc" | "desc";

export type Period = "3M" | "6M" | "12M";

export interface DataPoint {
  month: string;
  mrr: number;
}
