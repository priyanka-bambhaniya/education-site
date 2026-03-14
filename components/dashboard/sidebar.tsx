"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/domain";

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = dashboardNavigation.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden w-80 shrink-0 rounded-panel border border-slate-200 bg-white/85 p-6 shadow-panel backdrop-blur xl:block">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
          EduInsight Pro
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-brand-ink">Learning analytics SaaS</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Multi-tenant K-12 data platform for assessment delivery, mastery tracking, and district reporting.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-2xl px-4 py-3 transition",
                active
                  ? "bg-slate-950 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100",
              )}
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <p className={cn("mt-1 text-xs", active ? "text-slate-300" : "text-slate-500")}>{item.description}</p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
