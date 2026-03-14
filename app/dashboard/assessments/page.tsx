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

const pipeline = [
  { label: "Draft", value: 32, note: "In authoring" },
  { label: "Scheduled", value: 48, note: "Next 14 days" },
  { label: "Live", value: 67, note: "Active windows" },
  { label: "Scoring", value: 54, note: "Awaiting scoring" },
];

const statusVariants: Record<string, BadgeVariant> = {
  Scheduled: "secondary",
  Live: "success",
  Scoring: "warning",
  Draft: "outline",
};

const assessmentRows = [
  {
    title: "Spring Math Benchmark",
    owner: "District",
    due: "Apr 14",
    status: "Live",
    completion: 82,
  },
  {
    title: "ELA Writing Prompt",
    owner: "Grade 6",
    due: "Apr 16",
    status: "Scheduled",
    completion: 0,
  },
  {
    title: "Science Diagnostic",
    owner: "Grade 7",
    due: "Apr 11",
    status: "Scoring",
    completion: 68,
  },
  {
    title: "Algebra Readiness",
    owner: "Grade 8",
    due: "Apr 20",
    status: "Draft",
    completion: 20,
  },
];

const recentAssessments = [
  { title: "Reading Fluency", completion: 91, growth: "+5% mastery" },
  { title: "Fractions Exit Ticket", completion: 76, growth: "+3% mastery" },
  { title: "Argumentative Writing", completion: 64, growth: "+2% mastery" },
];

export default function AssessmentsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Assessments</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Assessment operations center</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Launch, monitor, and score assessments with real-time completion and mastery impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Create assessment</Button>
            <Button>Publish schedule</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pipeline.map((item) => (
            <Card key={item.label}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                  {item.label}
                </CardDescription>
                <CardTitle className="text-3xl text-brand-ink">{item.value}%</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={item.value} />
                <p className="text-xs text-slate-500">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Assessment pipeline
              </CardDescription>
              <CardTitle>Live and upcoming assessments</CardTitle>
              <CardDescription>Track completion and scoring readiness.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessmentRows.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell className="font-semibold text-slate-900">{row.title}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>{row.due}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[row.status]}>{row.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Progress value={row.completion} className="h-2 w-20" />
                          <span className="text-xs font-semibold text-slate-600">{row.completion}%</span>
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
                Recent assessments
              </CardDescription>
              <CardTitle>Completed windows</CardTitle>
              <CardDescription>Mastery uplift since last cycle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAssessments.map((assessment) => (
                <div key={assessment.title} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{assessment.title}</p>
                    <Badge variant="secondary">{assessment.completion}% complete</Badge>
                  </div>
                  <p className="mt-3 text-xs text-teal-700">{assessment.growth}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
