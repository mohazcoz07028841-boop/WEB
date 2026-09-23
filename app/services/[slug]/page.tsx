import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return {
    title: service ? `${service.title} | SUDMO Company Limited` : "Service | SUDMO Company Limited",
    description: service
      ? `${service.summary} SUDMO Company Limited offers ${service.title.toLowerCase()} services in Kenya and East Africa.`
      : "SUDMO Company Limited service offering in Kenya and East Africa.",
    alternates: {
      canonical: `https://web-mfik-eight.vercel.app/services/${slug}`,
    },
    openGraph: {
      title: service ? `${service.title} | SUDMO Company Limited` : "Service | SUDMO Company Limited",
      description: service
        ? `${service.summary} SUDMO Company Limited offers ${service.title.toLowerCase()} services in Kenya and East Africa.`
        : "SUDMO Company Limited service offering in Kenya and East Africa.",
      url: `https://web-mfik-eight.vercel.app/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_0.5fr] lg:items-start">
            <div>
              <SectionHeader eyebrow="Service" title={service.title} description={service.summary} />
              <div className="mt-10 rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Service overview</p>
                <p className="mt-4 text-base leading-8 text-slate-700">{service.details}</p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  "Professional execution for every engagement.",
                  "Transparent guidance and quality management.",
                  "Client-focused support aligned with your strategy.",
                  "Practical solutions for sustainable growth.",
                ].map((item) => (
                  <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Service category</p>
                <p className="mt-4 text-xl font-semibold text-charcoal">{service.category}</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-midnight p-8 text-white shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Consultation</p>
                <p className="mt-4 text-lg leading-8">Ready to discuss how this service can support your organization?</p>
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
