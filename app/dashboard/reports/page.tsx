import { AppShell } from "@/components/dashboard/app-shell";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const reportSummary = [
  { label: "Reports queued", value: "18", note: "6 scheduled today" },
  { label: "On-time delivery", value: "96%", note: "Last 30 days" },
  { label: "Stakeholders served", value: "4,320", note: "Families + staff" },
  { label: "Exports delivered", value: "312", note: "CSV + PDF" },
];

const statusVariants: Record<string, BadgeVariant> = {
  Ready: "success",
  Generating: "warning",
  Queued: "secondary",
  Failed: "destructive",
};

const reports = [
  {
    title: "District Mastery Overview",
    audience: "Superintendent",
    cadence: "Weekly",
    status: "Ready",
    completion: 100,
  },
  {
    title: "Classroom Intervention Plan",
    audience: "Principals",
    cadence: "Bi-weekly",
    status: "Generating",
    completion: 62,
  },
  {
    title: "Family Progress Digest",
    audience: "Guardians",
    cadence: "Monthly",
    status: "Queued",
    completion: 24,
  },
  {
    title: "Assessment Readiness",
    audience: "Instructional Coach",
    cadence: "Weekly",
    status: "Failed",
    completion: 12,
  },
];

const gapAlerts = [
  {
    title: "Middle school math",
    severity: "High",
    detail: "22 students below benchmark",
  },
  {
    title: "Grade 5 reading fluency",
    severity: "Moderate",
    detail: "10 students need daily practice",
  },
  {
    title: "Grade 7 science reasoning",
    severity: "Low",
    detail: "Monitor intervention outcomes",
  },
];

const severityVariants: Record<string, BadgeVariant> = {
  High: "destructive",
  Moderate: "warning",
  Low: "secondary",
};

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Reports</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Reporting command center</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Deliver stakeholder-ready insights for district leadership, educators, and families.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Schedule report</Button>
            <Button>Download batch</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reportSummary.map((item) => (
            <Card key={item.label}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                  {item.label}
                </CardDescription>
                <CardTitle className="text-3xl text-brand-ink">{item.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-500">{item.note}</CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Report pipeline
              </CardDescription>
              <CardTitle>Scheduled deliverables</CardTitle>
              <CardDescription>Generation status across stakeholder audiences.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Cadence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.title}>
                      <TableCell className="font-semibold text-slate-900">{report.title}</TableCell>
                      <TableCell>{report.audience}</TableCell>
                      <TableCell>{report.cadence}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[report.status]}>{report.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Progress value={report.completion} className="h-2 w-20" />
                          <span className="text-xs font-semibold text-slate-600">{report.completion}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Learning gap alerts
              </CardDescription>
              <CardTitle>Priority narratives</CardTitle>
              <CardDescription>Summaries to include in executive reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gapAlerts.map((alert) => (
                <div key={alert.title} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                    <Badge variant={severityVariants[alert.severity]}>{alert.severity}</Badge>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{alert.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
