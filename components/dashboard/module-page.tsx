import Link from "next/link";

import { moduleCatalog } from "@/lib/module-data";
import type { DashboardModuleSlug } from "@/types/domain";

export function ModulePage({ slug }: { slug: DashboardModuleSlug }) {
  const module = moduleCatalog[slug];

  return (
    <section className="space-y-6">
      <div className="rounded-panel border border-slate-200 bg-white/90 p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-teal-700">{module.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-brand-ink">{module.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{module.description}</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-panel border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-ink">Core capabilities</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {module.highlights.map((item) => (
              <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-panel border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <h3 className="text-lg font-semibold">Expected product outcomes</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {module.outcomes.map((item) => (
              <li key={item} className="rounded-2xl bg-white/10 px-4 py-3">{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
