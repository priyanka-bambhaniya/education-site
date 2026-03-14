import { moduleCatalog } from "@/lib/module-data";
import type { DashboardModuleSlug, NavItem } from "@/types/domain";

const moduleOrder: DashboardModuleSlug[] = [
  "students",
  "schools",
  "classes",
  "assessments",
  "question-bank",
  "responses",
  "analytics",
  "reports",
];

export const dashboardNavigation: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    description: "Cross-platform KPI summary",
    roles: ["student", "teacher", "admin", "parent"],
  },
  ...moduleOrder.map((slug) => ({
    title: moduleCatalog[slug].title,
    href: `/dashboard/${slug}` as const,
    description: moduleCatalog[slug].eyebrow,
    roles: ["teacher", "admin", "parent"],
  })),
];
