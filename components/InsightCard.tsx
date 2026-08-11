import Link from "next/link";

export function InsightCard({ title, category, excerpt, href }: { title: string; category: string; excerpt: string; href: string }) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-600">{category}</div>
      <h3 className="text-2xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{excerpt}</p>
      <Link href={href} className="mt-6 inline-flex items-center text-sm font-semibold text-midnight transition hover:text-gold">
        Read more
      </Link>
    </article>
  );
}
