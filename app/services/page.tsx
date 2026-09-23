import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedServices } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SUDMO Services | Business Development, IT, Real Estate & Warehousing Kenya",
  description:
    "Explore SUDMO Company Limited services in Kenya including business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment and electronics supply.",
  alternates: {
    canonical: "https://web-mfik-eight.vercel.app/services",
  },
  openGraph: {
    title: "SUDMO Services | Business Development, IT, Real Estate & Warehousing Kenya",
    description:
      "Explore SUDMO Company Limited services in Kenya including business development and training, IT planning and development, real estate, warehousing, construction materials, computer equipment and electronics supply.",
    url: "https://web-mfik-eight.vercel.app/services",
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="Business development, IT, real estate, warehousing and supply solutions built for results."
            description="SUDMO Company Limited supports businesses and organizations in Kenya and East Africa through business development and training, IT planning and development, real estate services, warehousing support, and the supply of construction materials, computer equipment and electronics."
          />
          <div className="mt-10 rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Supply offerings</p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
              In addition to service delivery, SUDMO supplies construction materials, computer equipment and electronics to support projects, office operations and business growth across Kenya.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{service.category}</p>
                <h3 className="mt-4 text-2xl font-semibold text-charcoal">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.summary}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-midnight transition group-hover:text-gold">
                  Learn more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
