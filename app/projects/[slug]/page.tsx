import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/queries";

interface Props {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_0.5fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Project</p>
              <h1 className="mt-4 text-4xl font-semibold text-charcoal">{project.title}</h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                <p><strong>Industry:</strong> {project.industry}</p>
                <p><strong>Location:</strong> {project.location}</p>
                <p><strong>Client type:</strong> {project.clientType}</p>
                <p><strong>Date:</strong> {project.date}</p>
              </div>
              <div className="mt-10 grid gap-6">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
                  <h2 className="text-xl font-semibold text-charcoal">Challenge</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{project.challenge}</p>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
                  <h2 className="text-xl font-semibold text-charcoal">Solution</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{project.solution}</p>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
                  <h2 className="text-xl font-semibold text-charcoal">Outcome</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{project.outcome}</p>
                </div>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Services provided</p>
                <p className="mt-4 text-base leading-7 text-slate-700">{project.services}</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-midnight p-8 text-white shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Next step</p>
                <p className="mt-4 text-lg leading-8">If you have a project needing practical professional support, we are ready to help.</p>
                <Link href="/request-consultation" className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-midnight transition hover:bg-[#b18c48]">
                  Request consultation
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
