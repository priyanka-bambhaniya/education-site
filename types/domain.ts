export const userRoles = ["student", "teacher", "admin", "parent"] as const;

export type UserRole = (typeof userRoles)[number];

export const dashboardModuleSlugs = [
  "students",
  "schools",
  "classes",
  "assessments",
  "question-bank",
  "responses",
  "analytics",
  "reports",
] as const;

export type DashboardModuleSlug = (typeof dashboardModuleSlugs)[number];

export type Metric = {
  label: string;
  value: string;
  delta: string;
};

export type NavItem = {
  title: string;
  href: `/dashboard/${DashboardModuleSlug}` | "/dashboard";
  description: string;
  roles: UserRole[];
};
