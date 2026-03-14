import type { DashboardModuleSlug, Metric } from "@/types/domain";

export const platformMetrics: Metric[] = [
  { label: "Students monitored", value: "48,320", delta: "+12.4% annual growth" },
  { label: "Assessments delivered", value: "1.8M", delta: "94% completion rate" },
  { label: "Teachers active weekly", value: "3,420", delta: "+8.1% from prior term" },
];

export const moduleCatalog: Record<
  DashboardModuleSlug,
  {
    title: string;
    eyebrow: string;
    description: string;
    highlights: string[];
    outcomes: string[];
  }
> = {
  students: {
    title: "Students",
    eyebrow: "Learner profiles",
    description: "Centralized student records with mastery, intervention, and assessment history context.",
    highlights: ["Profile timelines", "Growth snapshots", "Risk indicators"],
    outcomes: ["Targeted supports", "Family engagement", "Intervention readiness"],
  },
  schools: {
    title: "Schools & Classes",
    eyebrow: "Organization management",
    description: "Model schools, campuses, cohorts, rosters, and grade bands with audit-friendly ownership.",
    highlights: ["Multi-school tenancy", "Class roster sync", "Term-based archiving"],
    outcomes: ["District rollups", "Teacher assignment health", "Enrollment exceptions"],
  },
  classes: {
    title: "Classes",
    eyebrow: "Instructional delivery",
    description: "Track homerooms, intervention groups, and subject blocks with role-aware access for staff.",
    highlights: ["Flexible sections", "Teacher ownership", "Guardian visibility"],
    outcomes: ["Roster variance", "Attendance impact", "Schedule readiness"],
  },
  assessments: {
    title: "Assessments",
    eyebrow: "Measurement workflow",
    description: "Launch benchmark, screening, and formative assessments with scheduling and publishing controls.",
    highlights: ["Draft to publish lifecycle", "Scheduled windows", "Version control"],
    outcomes: ["Completion trends", "Standards coverage", "Risk alerts"],
  },
  "question-bank": {
    title: "Question Bank",
    eyebrow: "Content operations",
    description: "Curate standards-aligned items with metadata for difficulty, domain, and instructional purpose.",
    highlights: ["Reusable item library", "Metadata tagging", "Coverage gaps"],
    outcomes: ["Item reuse rate", "Authoring workflow", "Blueprint alignment"],
  },
  responses: {
    title: "Student Responses",
    eyebrow: "Learner evidence",
    description: "Capture raw responses, confidence signals, and submission details for downstream analytics.",
    highlights: ["Event capture", "Submission audit trail", "Manual review support"],
    outcomes: ["Response quality", "Missing submissions", "Scoring turnaround"],
  },
  analytics: {
    title: "Progress Analytics",
    eyebrow: "Learning intelligence",
    description: "Surface growth, mastery, subgroup, and risk analytics to power intervention planning.",
    highlights: ["Growth models", "Mastery heatmaps", "At-risk thresholds"],
    outcomes: ["Intervention prioritization", "Trend dashboards", "Cohort comparisons"],
  },
  reports: {
    title: "Reports Dashboard",
    eyebrow: "Executive reporting",
    description: "Deliver stakeholder-ready reports for classrooms, campuses, districts, and families.",
    highlights: ["Export pipelines", "Scheduled reports", "Audience-specific views"],
    outcomes: ["Board reporting", "Family summaries", "Compliance snapshots"],
  },
};

export const implementationChecklist = [
  "Wire Supabase Auth providers and map profile roles into app metadata.",
  "Add Row Level Security policies for schools, classes, assessments, and responses.",
  "Connect analytics models to materialized views or scheduled jobs.",
  "Provision Vercel project variables before the first production deployment.",
];
