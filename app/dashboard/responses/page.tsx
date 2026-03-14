import { AppShell } from "@/components/dashboard/app-shell";
import { ModulePage } from "@/components/dashboard/module-page";

export default function ResponsesPage() {
  return (
    <AppShell>
      <ModulePage slug="responses" />
    </AppShell>
  );
}
