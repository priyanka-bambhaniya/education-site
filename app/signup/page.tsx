import Link from "next/link";

import { signUpAction } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { roleMetadata } from "@/lib/rbac";
import { selfSignupRoles } from "@/lib/auth/roles";

const errorMessages: Record<string, string> = {
  missing_supabase_env: "Supabase environment variables are missing.",
  invalid_input: "Please complete every field with valid values.",
  invalid_email: "Enter a valid email address.",
  weak_password: "Your password is too weak. Use at least 8 characters with a mix of letters and numbers.",
  signup_disabled: "Signups are currently disabled. Contact your administrator.",
  email_disabled: "Email/password signups are disabled in Supabase. Contact your administrator.",
  account_exists: "An account with this email already exists. Sign in or reset your password.",
  password_mismatch: "Passwords do not match.",
  signup_failed: "Unable to create the account. Try again or contact support.",
  role_assignment_unavailable: "Role assignment requires server configuration. Choose student or contact an admin.",
  role_update_failed: "Role assignment failed. Contact your administrator.",
};

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const errorMessage = searchParams?.error ? errorMessages[searchParams.error] : undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-panel border border-slate-200 bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Account setup</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Create your EduInsight Pro account.</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Select the role that matches your day-to-day responsibilities. Admin accounts are provisioned by district leadership.
          </p>

          <form action={signUpAction} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
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
                autoComplete="new-password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Confirm password
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Role
              <select
                name="role"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              >
                {selfSignupRoles.map((role) => (
                  <option key={role} value={role}>
                    {roleMetadata[role].label}
                  </option>
                ))}
              </select>
            </label>
            {errorMessage ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={!hasSupabaseEnv}
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link href="/login" className="font-semibold text-slate-700 hover:text-slate-900">
              Back to sign in
            </Link>
            <Link href="/reset-password" className="font-semibold text-teal-700 hover:text-teal-600">
              Forgot password?
            </Link>
          </div>
        </article>

        <article className="rounded-panel border border-slate-200 bg-white/90 p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Role expectations</p>
          <div className="mt-5 grid gap-4">
            {selfSignupRoles.map((role) => (
              <div key={role} className="rounded-3xl bg-slate-50 p-5">
                <h2 className="text-xl font-semibold text-brand-ink">{roleMetadata[role].label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{roleMetadata[role].summary}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-600">
              Admin roles are assigned by district leadership after verification.
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}






