import Link from "next/link";
import { redirect } from "next/navigation";

import { updatePasswordAction } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const errorMessages: Record<string, string> = {
  invalid_input: "Enter a secure password (minimum 8 characters).",
  password_mismatch: "Passwords do not match.",
  update_failed: "Unable to update the password. Try again.",
};

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const errorMessage = searchParams?.error ? errorMessages[searchParams.error] : undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-panel border border-slate-200 bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">Secure update</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink">Set a new password.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Reset the password for <span className="font-semibold">{data.user.email}</span>.
        </p>

        <form action={updatePasswordAction} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            New password
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
          {errorMessage ? (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Update password
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/login" className="font-semibold text-slate-700 hover:text-slate-900">
            Back to sign in
          </Link>
        </div>
      </article>
    </main>
  );
}


