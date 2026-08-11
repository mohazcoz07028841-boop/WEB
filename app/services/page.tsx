import Link from "next/link";
import { getPublishedServices } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="Professional service offerings built for results."
            description="Explore our multidisciplinary services across real estate, technology, finance, marketing and business advisory."
          />
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
