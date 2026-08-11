import { notFound } from "next/navigation";
import { getInsightBySlug } from "@/lib/queries";

interface Props {
  params: { slug: string };
}

export default async function InsightDetailPage({ params }: Props) {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) notFound();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-soft">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.35em] text-slate-500">
              <span>{insight.category}</span>
              <span>•</span>
              <span>{insight.readTime}</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-charcoal">{insight.title}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">By {insight.author}</p>
            <div className="mt-10 space-y-6 text-base leading-8 text-slate-700">{insight.content}</div>
            <div className="mt-10 border-t border-slate-200 pt-8 text-sm text-slate-500">
              Published on {insight.publishedAt?.toISOString().substring(0, 10)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
