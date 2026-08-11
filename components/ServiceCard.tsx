import Link from "next/link";

export function ServiceCard({ title, summary, href }: { title: string; summary: string; href: string }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 h-12 w-12 rounded-2xl bg-warm text-gold ring-1 ring-slate-200 flex items-center justify-center text-xl font-bold">{title.charAt(0)}</div>
      <h3 className="text-xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
      <Link href={href} className="mt-6 inline-flex items-center text-sm font-semibold text-midnight transition hover:text-gold">
        Learn more
      </Link>
    </article>
  );
}
