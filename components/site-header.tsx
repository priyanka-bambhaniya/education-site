import Link from "next/link";

import { getRoleDashboardPath } from "@/lib/auth/roles";
import { getServerUserProfile, signOutAction } from "@/lib/auth";
import { env, hasSupabaseEnv } from "@/lib/env";
import { dashboardNavigation } from "@/lib/navigation";

export async function SiteHeader() {
  const session = await getServerUserProfile();
  const profile = session?.profile ?? null;
  const hasSession = Boolean(session?.user);
  const dashboardPath = profile ? getRoleDashboardPath(profile.role) : "/dashboard";
  const dashboardLinks = profile
    ? dashboardNavigation.filter((item) => item.roles.includes(profile.role))
    : [];

  return (
    <header className="border-b border-slate-200/60 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
            {env.NEXT_PUBLIC_APP_NAME}
          </Link>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 md:block">
            K-12 analytics
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
          <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-slate-100">
            Home
          </Link>
          <Link href={dashboardPath} className="rounded-full px-3 py-2 transition hover:bg-slate-100">
            Dashboard
          </Link>
          {dashboardLinks.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {hasSession ? (
            <form action={signOutAction}>
              <button
                type="submit"
                disabled={!hasSupabaseEnv}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Log out
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-slate-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
