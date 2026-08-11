import { getSettings } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

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
              "We combine real estate, technology, finance, business and marketing expertise to help organizations in Kenya and East Africa achieve long-term results."
            }
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_0.8fr] lg:items-start">
            <div className="space-y-8 rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Our purpose</p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  We support businesses, investors and institutions with professional guidance, strong delivery and the systems they need to grow with confidence.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { title: "Accountability", description: "Responsibility and transparent communication in every engagement." },
                  { title: "Quality Management", description: "Careful planning, review and consistent execution standards." },
                  { title: "Honesty", description: "Clear, honest advice without overpromising." },
                  { title: "Integrity", description: "Ethical conduct and trusted long-term partnerships." },
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
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">How we work</p>
                <div className="mt-8 grid gap-6">
                  {[
                    { label: "Discovery", text: "We begin by listening to your business context, goals and priorities." },
                    { label: "Planning", text: "We craft a focused roadmap that balances ambition with practical delivery." },
                    { label: "Execution", text: "We implement with precision, clarity and reliable timelines." },
                    { label: "Support", text: "We stay engaged to maintain momentum and identify opportunities for improvement." },
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
