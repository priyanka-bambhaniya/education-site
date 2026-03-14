import Link from "next/link";

import { implementationChecklist, platformMetrics } from "@/lib/module-data";
import { roleMetadata } from "@/lib/rbac";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-panel border border-white/70 bg-white/85 px-6 py-10 shadow-panel backdrop-blur sm:px-10 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">EduInsight Pro</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-brand-ink sm:text-6xl">
              Production-grade learning analytics for K-12 schools, classrooms, and families.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Built on Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase, and Vercel. The starter includes role-based architecture, assessment workflows, response capture, analytics, and reporting foundations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Open product workspace
              </Link>
              <Link href="/login" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
                Review auth architecture
              </Link>
            </div>
          </div>
          <div className="rounded-panel bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Included foundations</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {implementationChecklist.map((item) => (
                <li key={item} className="rounded-2xl bg-white/10 px-4 py-3">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {platformMetrics.map((metric) => (
          <article key={metric.label} className="rounded-panel border border-slate-200 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-brand-ink">{metric.value}</p>
            <p className="mt-2 text-sm text-teal-700">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-4">
        {Object.entries(roleMetadata).map(([role, meta]) => (
          <article key={role} className="rounded-panel border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${meta.accent}`} />
            <h2 className="mt-5 text-2xl font-semibold text-brand-ink">{meta.label}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{meta.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

