import { AppShell } from "@/components/dashboard/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const classCards = [
  {
    name: "Grade 5 Math",
    teacher: "Ms. Rivera",
    students: 28,
    mastery: 78,
    alerts: 4,
  },
  {
    name: "Grade 6 ELA",
    teacher: "Mr. Patel",
    students: 31,
    mastery: 72,
    alerts: 6,
  },
  {
    name: "Grade 7 Science",
    teacher: "Dr. Nguyen",
    students: 26,
    mastery: 69,
    alerts: 5,
  },
  {
    name: "Grade 8 Social Studies",
    teacher: "Ms. Carter",
    students: 29,
    mastery: 74,
    alerts: 3,
  },
];

const cohortAnalytics = [
  { label: "Mastery growth", value: 82, note: "+6% semester" },
  { label: "Assessment readiness", value: 68, note: "7 classes due" },
  { label: "Intervention coverage", value: 74, note: "32 plans active" },
];

const classAlerts = [
  "Grade 6 ELA needs reading fluency support for 12 students.",
  "Grade 7 Science has 3 assessments awaiting scoring.",
  "Grade 5 Math intervention group ready for progress check.",
];

export default function ClassesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Classes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Instructional cohort analytics</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Monitor every class with mastery, intervention coverage, and assessment readiness at a glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Sync rosters</Button>
            <Button>Create class</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {classCards.map((item) => (
            <Card key={item.name}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                  {item.teacher}
                </CardDescription>
                <CardTitle className="text-xl text-brand-ink">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{item.students} students</span>
                  <Badge variant="secondary">{item.alerts} alerts</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Mastery level</span>
                    <span className="font-semibold text-slate-700">{item.mastery}%</span>
                  </div>
                  <Progress value={item.mastery} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Class analytics
              </CardDescription>
              <CardTitle>District cohort performance</CardTitle>
              <CardDescription>Aggregate performance across core cohorts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {cohortAnalytics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{metric.label}</p>
                      <p className="text-xs text-slate-500">{metric.note}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em]">
                Operational alerts
              </CardDescription>
              <CardTitle>Class action list</CardTitle>
              <CardDescription>Immediate next steps for campus leads.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {classAlerts.map((alert) => (
                <div key={alert} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
                  {alert}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
