import type { UserRole } from "@/types/domain";

export const roleMetadata: Record<
  UserRole,
  {
    label: string;
    summary: string;
    accent: string;
  }
> = {
  student: {
    label: "Student",
    summary: "Track growth, mastery, and readiness across daily learning activities.",
    accent: "from-sky-500 to-cyan-400",
  },
  teacher: {
    label: "Teacher",
    summary: "Monitor class performance, identify intervention groups, and act quickly.",
    accent: "from-emerald-500 to-teal-400",
  },
  admin: {
    label: "Admin",
    summary: "Manage schools, benchmark outcomes, and drive district-wide accountability.",
    accent: "from-orange-500 to-amber-400",
  },
  parent: {
    label: "Parent",
    summary: "Stay informed on student progress, attendance patterns, and assessment outcomes.",
    accent: "from-fuchsia-500 to-rose-400",
  },
};

export function isUserRole(value: string | null | undefined): value is UserRole {
  return value === "student" || value === "teacher" || value === "admin" || value === "parent";
}

export function resolveUserRole(value: string | null | undefined): UserRole {
  return isUserRole(value) ? value : "admin";
}
