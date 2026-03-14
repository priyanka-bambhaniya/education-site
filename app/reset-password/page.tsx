import Link from "next/link";

import { resetPasswordAction } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";

const errorMessages: Record<string, string> = {
  missing_supabase_env: "Supabase environment variables are missing.",
  invalid_email: "Enter a valid email address.",
  reset_failed: "Unable to send the reset email. Try again shortly.",
};

const successMessages: Record<string, string> = {
  sent: "Password reset link sent. Check your inbox.",
};

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { error?: string; success?: string };
}) {
  const errorMessage = searchParams?.error ? errorMessages[searchParams.error] : undefined;
  const successMessage = searchParams?.success ? successMessages[searchParams.success] : undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-panel border border-slate-200 bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Password reset</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Recover access to your account.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We will send a secure link to reset your password. The link expires after a short period.
        </p>

        <form action={resetPasswordAction} className="mt-6 space-y-4">
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
            Send reset link
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/login" className="font-semibold text-slate-700 hover:text-slate-900">
            Back to sign in
          </Link>
          <Link href="/signup" className="font-semibold text-teal-700 hover:text-teal-600">
            Create an account
          </Link>
        </div>
      </article>
    </main>
  );
}


