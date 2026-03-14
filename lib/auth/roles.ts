import type { UserRole } from "@/types/domain";

export const selfSignupRoles = ["student", "teacher", "parent"] as const;

export type SelfSignupRole = (typeof selfSignupRoles)[number];

export const roleLabels: Record<UserRole, { label: string; description: string }> = {
  student: {
    label: "Student",
    description: "Access assessments, track progress, and review goals.",
  },
  teacher: {
    label: "Teacher",
    description: "Manage classes, assessments, and student insights.",
  },
  admin: {
    label: "Admin",
    description: "Oversee schools, users, and district-wide analytics.",
  },
  parent: {
    label: "Parent",
    description: "View student progress, reports, and interventions.",
  },
};

export const roleDashboardPaths: Record<UserRole, string> = {
  student: "/dashboard/assessments",
  teacher: "/dashboard/classes",
  parent: "/dashboard/reports",
  admin: "/dashboard/schools",
};

export function getRoleDashboardPath(role: UserRole) {
  return roleDashboardPaths[role] ?? "/dashboard";
}

export function isSelfSignupRole(value: string | null | undefined): value is SelfSignupRole {
  return value === "student" || value === "teacher" || value === "parent";
}

export function normalizeSelfSignupRole(value: string | null | undefined): SelfSignupRole {
  if (isSelfSignupRole(value)) {
    return value;
  }

  return "student";
}
