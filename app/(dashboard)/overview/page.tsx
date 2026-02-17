import type { Metadata } from "next";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import StatCard from "@/components/dashboard/StatCard";
import TopCustomers from "@/components/dashboard/TopCustomers";
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
import { currentUser } from "@/constants/user";

export const metadata: Metadata = {
  title: "Overview | Helm",
  description: "MRR, ARR, churn, and active customers at a glance.",
};

const MrrIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ArrIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
  </svg>
);

const ChurnIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const CustomersIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const stats = [
  { label: "Monthly Recurring Revenue", value: "$48,200",  change: "+12.5%", trend: "up"   as const, icon: MrrIcon },
  { label: "Annual Recurring Revenue",  value: "$578,400", change: "+12.5%", trend: "up"   as const, icon: ArrIcon },
  { label: "Churn Rate",                value: "2.4%",     change: "-0.3%",  trend: "down" as const, goodDirection: "down" as const, icon: ChurnIcon },
  { label: "Active Customers",          value: "1,240",    change: "+8.2%",  trend: "up"   as const, icon: CustomersIcon },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <WelcomeMessage name={currentUser.name} />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <ChartsSection />

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <TopCustomers />
      </div>
    </div>
  );
}
