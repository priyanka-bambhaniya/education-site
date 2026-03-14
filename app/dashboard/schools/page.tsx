import { AppShell } from "@/components/dashboard/app-shell";
import { ModulePage } from "@/components/dashboard/module-page";

export default function SchoolsPage() {
  return (
    <AppShell>
      <ModulePage slug="schools" />
    </AppShell>
  );
}
