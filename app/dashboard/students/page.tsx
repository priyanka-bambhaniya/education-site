import { AppShell } from "@/components/dashboard/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const summaryCards = [
  { label: "Active students", value: "824", helper: "Across 18 classes" },
  { label: "At-risk learners", value: "64", helper: "12 flagged this week" },
  { label: "Average mastery", value: "76%", helper: "+4% since fall" },
  { label: "Interventions", value: "32", helper: "6 awaiting review" },
];

const performanceSeries = [
  { label: "Week 1", value: 62 },
  { label: "Week 2", value: 65 },
  { label: "Week 3", value: 67 },
  { label: "Week 4", value: 71 },
  { label: "Week 5", value: 74 },
  { label: "Week 6", value: 78 },
  { label: "Week 7", value: 81 },
  { label: "Week 8", value: 85 },
];

const riskVariants: Record<string, BadgeVariant> = {
  Low: "success",
  Moderate: "warning",
  High: "destructive",
};

const students = [
  {
    name: "Ava Thompson",
    grade: "5",
    mastery: 84,
    risk: "Low",
    lastAssessment: "ELA Benchmark",
    growth: "+6%",
  },
  {
    name: "Mason Lee",
    grade: "6",
    mastery: 72,
    risk: "Moderate",
    lastAssessment: "Math Check",
    growth: "+3%",
  },
  {
    name: "Sophia Patel",
    grade: "7",
    mastery: 66,
    risk: "High",
    lastAssessment: "Science Diagnostic",
    growth: "+1%",
  },
  {
    name: "Liam Carter",
    grade: "5",
    mastery: 78,
    risk: "Low",
    lastAssessment: "Reading Fluency",
    growth: "+4%",
  },
];

const gapAlerts = [
  {
    title: "Vocabulary acquisition",
    cohort: "Grade 5",
    detail: "15 students below expectation",
    severity: "Moderate",
  },
  {
    title: "Multi-step equations",
    cohort: "Grade 6",
    detail: "9 students flagged",
    severity: "High",
  },
  {
    title: "Scientific argumentation",
    cohort: "Grade 7",
    detail: "Support requested",
    severity: "Low",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function StudentsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Students</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Learner performance hub</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track mastery, growth, and intervention readiness for every student in your district.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Export roster</Button>
            <Button>Add student</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                  {card.label}
                </CardDescription>
                <CardTitle className="text-3xl text-brand-ink">{card.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-500">{card.helper}</CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Student performance chart
              </CardDescription>
              <CardTitle>Mastery momentum</CardTitle>
              <CardDescription>8-week median proficiency trend.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {performanceSeries.map((point) => (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-teal-500/80 to-sky-500/80"
                      style={{ height: `${point.value}%` }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Target proficiency 80%</span>
                <span>Current median 85%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Learning gap alerts
              </CardDescription>
              <CardTitle>Students needing support</CardTitle>
              <CardDescription>Prioritized by risk level.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gapAlerts.map((alert) => (
                <div key={alert.title} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                    <Badge variant={riskVariants[alert.severity]}>{alert.severity}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{alert.cohort}</p>
                  <p className="mt-3 text-xs font-medium text-slate-600">{alert.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
              Student roster
            </CardDescription>
            <CardTitle>Active learners</CardTitle>
            <CardDescription>Mastery, risk indicators, and recent assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Mastery</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Last assessment</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-slate-900">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>Grade {student.grade}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={student.mastery} className="h-2 w-24" />
                        <span className="text-xs font-semibold text-slate-600">{student.mastery}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={riskVariants[student.risk]}>{student.risk}</Badge>
                    </TableCell>
                    <TableCell>{student.lastAssessment}</TableCell>
                    <TableCell className="text-right text-xs font-semibold text-teal-700">
                      {student.growth}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
