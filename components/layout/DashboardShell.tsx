"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { DateRangeProvider } from "@/context/DateRangeContext";
import { ToastProvider } from "@/context/ToastContext";
import Toaster from "@/components/ui/Toaster";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);

  function handleToggle() {
    if (window.innerWidth >= 1024) {
      setCollapsed((prev) => !prev);
    } else {
      setMobileOpen((prev) => !prev);
    }
  }

  return (
    <DateRangeProvider>
      <ToastProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Mobile backdrop */}
          {mobileOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          <Sidebar
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <Header
              onToggle={handleToggle}
              collapsed={collapsed}
              onOpenSearch={() => setSearchOpen(true)}
            />
            <main className="flex-1 overflow-auto bg-surface p-6">{children}</main>
          </div>
        </div>
        <Toaster />
        <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      </ToastProvider>
    </DateRangeProvider>
  );
}
