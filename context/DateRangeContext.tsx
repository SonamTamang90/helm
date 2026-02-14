"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Period } from "@/types/common";

interface DateRangeContextValue {
  period: Period;
  setPeriod: (period: Period) => void;
}

const DateRangeContext = createContext<DateRangeContextValue>({
  period: "12M",
  setPeriod: () => {},
});

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<Period>("12M");

  return (
    <DateRangeContext.Provider value={{ period, setPeriod }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange(): DateRangeContextValue {
  return useContext(DateRangeContext);
}
