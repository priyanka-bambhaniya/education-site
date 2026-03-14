import Link from "next/link";

import { magicLinkAction, signInAction } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { roleMetadata } from "@/lib/rbac";

const errorMessages: Record<string, string> = {
  missing_supabase_env: "Supabase environment variables are missing.",
  invalid_credentials: "Enter a valid email address and password.",
  invalid_email: "Enter a valid email address.",
  email_not_confirmed: "Check your inbox to confirm your email before signing in.",
  auth_failed: "We could not sign you in. Check your credentials and try again.",
  magic_link_failed: "Unable to send the magic link. Try again shortly.",
  unauthorized: "You do not have access to that area. Sign in with an authorized account.",
};

const successMessages: Record<string, string> = {
  confirm_email: "Check your inbox to confirm your email before signing in.",
  magic_link_sent: "Magic link sent. Check your inbox to continue.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string; success?: string };
}) {
  const next = searchParams?.next ?? "/dashboard";
  const errorMessage = searchParams?.error ? errorMessages[searchParams.error] : undefined;
  const successMessage = searchParams?.success ? successMessages[searchParams.success] : undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-panel border border-slate-200 bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Secure access</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Sign in to EduInsight Pro.</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use your district credentials to access analytics, assessments, and reporting modules.
          </p>

          <form action={signInAction} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block text-sm font-semibold text-slate-700">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
            {errorMessage ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            ) : null}
            {successMessage ? (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={!hasSupabaseEnv}
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Sign in with password
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            Or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form action={magicLinkAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block text-sm font-semibold text-slate-700">
              Email for magic link
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
            <button
              type="submit"
              disabled={!hasSupabaseEnv}
              className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Send magic link
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link href="/reset-password" className="font-semibold text-teal-700 hover:text-teal-600">
              Reset password
            </Link>
            <Link href="/signup" className="font-semibold text-slate-700 hover:text-slate-900">
              Create a new account
            </Link>
          </div>
        </article>

        <article className="rounded-panel border border-slate-200 bg-white/90 p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Role architecture</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {Object.entries(roleMetadata).map(([role, meta]) => (
              <div key={role} className="rounded-3xl bg-slate-50 p-5">
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${meta.accent}`} />
                <h2 className="mt-4 text-xl font-semibold text-brand-ink">{meta.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{meta.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}



