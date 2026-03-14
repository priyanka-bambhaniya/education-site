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

const kpis = [
  { label: "Active students", value: "2,480", delta: "+4.2% vs last term" },
  { label: "Mastery growth", value: "+8.1%", delta: "District target 6%" },
  { label: "Assessments live", value: "34", delta: "7 due this week" },
  { label: "Interventions", value: "128", delta: "42 prioritized" },
];

const performanceSeries = [
  { label: "Aug", value: 52 },
  { label: "Sep", value: 58 },
  { label: "Oct", value: 61 },
  { label: "Nov", value: 65 },
  { label: "Dec", value: 69 },
  { label: "Jan", value: 74 },
  { label: "Feb", value: 80 },
  { label: "Mar", value: 86 },
];

const classAnalytics = [
  { name: "Grade 5 Math", students: 28, mastery: 78, growth: "+6%" },
  { name: "Grade 6 ELA", students: 31, mastery: 72, growth: "+4%" },
  { name: "Grade 7 Science", students: 26, mastery: 69, growth: "+5%" },
];

const assessmentStatus: Record<string, BadgeVariant> = {
  Open: "success",
  Draft: "secondary",
  Scoring: "warning",
};

const recentAssessments = [
  { title: "Spring Math Benchmark", className: "Grade 6", due: "Apr 14", status: "Open", completion: 82 },
  { title: "Reading Fluency Check", className: "Grade 5", due: "Apr 11", status: "Scoring", completion: 68 },
  { title: "Science Diagnostic", className: "Grade 7", due: "Apr 18", status: "Draft", completion: 32 },
];

const gapAlerts = [
  {
    title: "Fractions and ratios",
    cohort: "Grade 6",
    severity: "High",
    detail: "42% below benchmark",
  },
  {
    title: "Informational text",
    cohort: "Grade 5",
    severity: "Moderate",
    detail: "18 students need small-group support",
  },
  {
    title: "Scientific reasoning",
    cohort: "Grade 7",
    severity: "Low",
    detail: "Targeted intervention recommended",
  },
];

const severityVariants: Record<string, BadgeVariant> = {
  High: "destructive",
  Moderate: "warning",
  Low: "secondary",
};

export default function DashboardOverviewPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Executive overview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">District health snapshot</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Monitor mastery growth, intervention readiness, and assessment performance across every campus in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Export snapshot</Button>
            <Button>Review alerts</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                  {kpi.label}
                </CardDescription>
                <CardTitle className="text-3xl text-brand-ink">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-teal-700">{kpi.delta}</CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Student performance chart
              </CardDescription>
              <CardTitle>Mastery trend line</CardTitle>
              <CardDescription>District-wide median proficiency across core subjects.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {performanceSeries.map((point) => (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-sky-500/80 to-teal-400/90"
                      style={{ height: `${point.value}%` }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Target mastery: 80%</span>
                <span>Current median: 86%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Learning gap alerts
              </CardDescription>
              <CardTitle>Priority interventions</CardTitle>
              <CardDescription>Immediate action items for instructional leaders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gapAlerts.map((alert) => (
                <div key={alert.title} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                    <Badge variant={severityVariants[alert.severity]}>{alert.severity}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{alert.cohort}</p>
                  <p className="mt-3 text-xs font-medium text-slate-600">{alert.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Class analytics
              </CardDescription>
              <CardTitle>Top instructional cohorts</CardTitle>
              <CardDescription>Performance and growth by priority class.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {classAnalytics.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.students} students</p>
                    </div>
                    <Badge variant="secondary">{item.growth} growth</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.mastery} />
                    <span className="text-xs font-semibold text-slate-600">{item.mastery}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Recent assessments
              </CardDescription>
              <CardTitle>Assessment activity</CardTitle>
              <CardDescription>Live windows and scoring readiness.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAssessments.map((assessment) => (
                    <TableRow key={assessment.title}>
                      <TableCell className="font-semibold text-slate-900">{assessment.title}</TableCell>
                      <TableCell>{assessment.className}</TableCell>
                      <TableCell>{assessment.due}</TableCell>
                      <TableCell>
                        <Badge variant={assessmentStatus[assessment.status]}>{assessment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Progress value={assessment.completion} className="h-2 w-20" />
                          <span className="text-xs font-semibold text-slate-600">{assessment.completion}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
