import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerUserProfile } from "@/lib/auth";
import { env, hasSupabaseEnv } from "@/lib/env";

import { Sidebar } from "./sidebar";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getServerUserProfile();

  if (!session?.profile) {
    redirect("/login?error=unauthorized");
  }

  const role = session.profile.role;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_25%),linear-gradient(180deg,_#fffef9_0%,_#f8fafc_58%,_#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Sidebar role={role} />
        <div className="flex-1 space-y-6">
          <header className="rounded-panel border border-slate-200 bg-white/90 p-6 shadow-panel backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                  {env.NEXT_PUBLIC_APP_NAME}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                  Production-grade K-12 analytics workspace
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase Auth, Postgres, Storage, and Vercel-ready deployment conventions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                  App Router
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                  {hasSupabaseEnv ? "Supabase linked" : "Supabase env pending"}
                </span>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                >
                  Auth flow
                </Link>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
