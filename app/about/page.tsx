import type { Metadata } from "next";
import { getSettings } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About SUDMO Company Limited | Business Development, IT & Supply Kenya",
  description:
    "Learn about SUDMO Company Limited in Nairobi, Kenya, including our objective, vision, mission, values and areas of operation in business development, IT, real estate, warehousing and supply.",
  alternates: {
    canonical: "https://web-mfik-eight.vercel.app/about",
  },
  openGraph: {
    title: "About SUDMO Company Limited | Business Development, IT & Supply Kenya",
    description:
      "Learn about SUDMO Company Limited in Nairobi, Kenya, including our objective, vision, mission, values and areas of operation in business development, IT, real estate, warehousing and supply.",
    url: "https://web-mfik-eight.vercel.app/about",
    type: "website",
  },
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="About us"
            title="A multidisciplinary partner for sustainable growth."
            description={
              settings?.aboutIntro ||
              "To provide clients with an 'I am assured experience' when executing their services through professionalism, quality delivery and customer satisfaction across every engagement."
            }
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_0.8fr] lg:items-start">
            <div className="space-y-8 rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Our purpose</p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  SUDMO Company Limited was founded in 2024 to provide quality services in real estate, business consultancy, information technology and the supply of electronics and computer equipment to fill identified market gaps.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { title: "Accountability", description: "We ensure accountability across the services and products we provide, building trust and confidence with current and prospective clients." },
                  { title: "Quality Management", description: "We implement quality control in services and delivery processes to satisfy clients and strengthen our market position." },
                  { title: "Honesty", description: "Honesty is applied in transactions, business engagements and service delivery at every level." },
                  { title: "Integrity", description: "We maintain a high level of integrity in all engagements with partners, stakeholders and customers." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
                    <p className="text-base font-semibold text-charcoal">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Our focus</p>
                <div className="mt-8 grid gap-6">
                  {[
                    { label: "Objective", text: "To provide clients with an 'I am assured experience' through professional execution and timely delivery." },
                    { label: "Vision", text: "To be the leading company in Kenya and across the East Africa Region." },
                    { label: "Mission", text: "To partner with local and international stakeholders to deliver quality services and products in line with market standards." },
                    { label: "Execution", text: "We implement a detailed plan, maintain supervision, and ensure health, safety and quality standards are upheld in every engagement." },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-base leading-7 text-slate-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Get in touch</p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  If you are ready to strengthen your business, property or technology capability, our team is ready to help.
                </p>
                <Link
                  href="/request-consultation"
                  className="mt-6 inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal"
                >
                  Request a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
