"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Switch from "@/components/ui/Switch";
import { useToast } from "@/context/ToastContext";
import { currentUser } from "@/constants/user";

type Tab = "profile" | "account" | "notifications" | "billing";

const tabs: { label: string; value: Tab }[] = [
  { label: "Profile",       value: "profile"       },
  { label: "Account",       value: "account"       },
  { label: "Notifications", value: "notifications" },
  { label: "Billing",       value: "billing"       },
];

/* ─── Profile ─────────────────────────────────────────────── */
function ProfileSection() {
  const { addToast } = useToast();
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName,  setLastName]  = useState(currentUser.lastName);
  const [email,     setEmail]     = useState(currentUser.email);
  const [role,      setRole]      = useState(currentUser.role);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Profile</h2>
        <p className="mt-1 text-sm text-muted">Update your personal information.</p>
      </div>

      <div className="h-px bg-border" />

      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <Avatar initials={currentUser.initials} size="lg" />
        <div>
          <Button variant="secondary" size="sm">Change photo</Button>
          <p className="mt-1.5 text-xs text-muted">JPG or PNG. Max 2MB.</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="role">Role</Label>
          <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => addToast("Profile saved.")}>Save changes</Button>
      </div>
    </div>
  );
}

/* ─── Account ─────────────────────────────────────────────── */
function AccountSection() {
  const { addToast } = useToast();
  const [company,  setCompany]  = useState(currentUser.company);
  const [timezone, setTimezone] = useState(currentUser.timezone);
  const [currency, setCurrency] = useState(currentUser.currency);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Account</h2>
        <p className="mt-1 text-sm text-muted">Manage your workspace settings.</p>
      </div>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="company">Company name</Label>
          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="max-w-sm" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="timezone">Timezone</Label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="h-8 rounded border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border"
          >
            {["UTC", "UTC-5 (EST)", "UTC-8 (PST)", "UTC+1 (CET)", "UTC+5:30 (IST)", "UTC+8 (SGT)"].map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="currency">Currency</Label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="h-8 rounded border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border"
          >
            {["USD", "EUR", "GBP", "CAD", "AUD", "SGD"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => addToast("Account settings saved.")}>Save changes</Button>
      </div>
    </div>
  );
}

/* ─── Notifications ───────────────────────────────────────── */
interface NotificationItem {
  id: string;
  label: string;
  description: string;
}

const notificationItems: NotificationItem[] = [
  { id: "receipts",   label: "Payment receipts",      description: "Get notified whenever a payment is successfully processed." },
  { id: "failures",   label: "Failed payments",        description: "Receive an alert when a payment fails or a charge is declined." },
  { id: "churn",      label: "Churn alerts",           description: "Be notified when a customer cancels their subscription." },
  { id: "newcustomer",label: "New customer",           description: "Get notified when a new customer subscribes." },
  { id: "report",     label: "Monthly revenue report", description: "Receive a monthly summary of your revenue metrics." },
];

function NotificationsSection() {
  const { addToast } = useToast();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    receipts:    true,
    failures:    true,
    churn:       true,
    newcustomer: false,
    report:      true,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        <p className="mt-1 text-sm text-muted">Choose which email notifications you receive.</p>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col divide-y divide-border">
        {notificationItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted">{item.description}</p>
            </div>
            <Switch
              id={item.id}
              checked={enabled[item.id] ?? false}
              onChange={(val) => setEnabled((prev) => ({ ...prev, [item.id]: val }))}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => addToast("Notification preferences saved.")}>Save changes</Button>
      </div>
    </div>
  );
}

/* ─── Billing ─────────────────────────────────────────────── */
function BillingSection() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Billing</h2>
        <p className="mt-1 text-sm text-muted">Manage your plan and payment details.</p>
      </div>

      <div className="h-px bg-border" />

      {/* Current plan */}
      <div className="rounded border border-border bg-background p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-muted">Current plan</p>
            <p className="mt-1 text-base font-semibold text-foreground">Pro</p>
            <p className="mt-0.5 text-sm text-muted">$299 / month · Renews Mar 12, 2026</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" size="sm" className="whitespace-nowrap">Change plan</Button>
            <Button variant="destructive" size="sm" className="whitespace-nowrap">Cancel</Button>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div>
        <p className="text-xs font-medium text-muted mb-3">Payment method</p>
        <div className="flex items-center justify-between rounded border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-12 items-center justify-center rounded border border-border bg-surface text-xs font-semibold text-foreground">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted">Expires 08 / 27</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Update</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────── */
const sectionMap: Record<Tab, React.ReactNode> = {
  profile:       <ProfileSection />,
  account:       <AccountSection />,
  notifications: <NotificationsSection />,
  billing:       <BillingSection />,
};

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Horizontal tabs on mobile, vertical sidebar on desktop */}
      <nav className="scrollbar-hide -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:w-44 lg:shrink-0 lg:flex-col lg:gap-0.5 lg:overflow-x-visible lg:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 rounded px-3 py-2 text-sm font-medium transition-colors lg:text-left ${
              activeTab === tab.value
                ? "bg-surface-raised text-foreground"
                : "text-muted hover:bg-surface-raised/60 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 rounded border border-border bg-surface p-4 sm:p-6">
        {sectionMap[activeTab]}
      </div>
    </div>
  );
}
