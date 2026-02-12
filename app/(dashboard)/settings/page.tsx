import SettingsTabs from "@/components/dashboard/SettingsTabs";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account and preferences.</p>
      </div>

      <SettingsTabs />
    </div>
  );
}
