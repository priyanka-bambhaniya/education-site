import { AppShell } from "@/components/dashboard/app-shell";
import { ModulePage } from "@/components/dashboard/module-page";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <ModulePage slug="analytics" />
    </AppShell>
  );
}
