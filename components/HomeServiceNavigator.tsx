"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "real-estate",
    label: "Real Estate",
    title: "Strategic property advisory and asset optimisation.",
    summary:
      "Position your portfolio for lasting value with disciplined real estate strategy, development support and property management.",
    bullets: [
      "Market insight for high-value decisions.",
      "Property advisory and asset planning.",
      "Development execution support.",
      "Property management for long-term returns.",
    ],
  },
  {
    id: "it-development",
    label: "IT Development",
    title: "Digital systems that accelerate business performance.",
    summary:
      "Build secure, scalable technology solutions with a focus on operational efficiency, user experience and automation.",
    bullets: [
      "Technology strategy and roadmaps.",
      "Web and business system development.",
      "Automation and analytics integration.",
      "Ongoing digital transformation support.",
    ],
  },
  {
    id: "financial-management",
    label: "Financial Management",
    title: "Operational finance for clearer, stronger decisions.",
    summary:
      "Improve cash flow, reporting and controls with financial systems designed for ambitious organizations.",
    bullets: [
      "Cash flow and liquidity planning.",
      "Reporting and performance monitoring.",
      "Budgeting and forecasting discipline.",
      "Financial systems alignment with strategy.",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    title: "Market growth through intelligent brand and demand strategy.",
    summary:
      "Attract, engage and convert with campaigns that reflect your company’s expertise and ambitions.",
    bullets: [
      "Brand position and narrative design.",
      "Digital campaign planning and activation.",
      "Lead generation with commercial focus.",
      "Customer retention and growth frameworks.",
    ],
  },
];

export function HomeServiceNavigator() {
  const [activeId, setActiveId] = useState(services[0].id);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-soft backdrop-blur-xl sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.38em] text-slate-500">Featured services</p>
          <h2 className="text-3xl font-semibold text-charcoal sm:text-4xl">A refined service experience built for your most important decisions.</h2>
          <p className="max-w-lg text-sm leading-7 text-slate-600">
            Navigate a select set of capabilities designed to deliver strategic clarity, reliable execution and measurable business outcomes.
          </p>
          <div className="space-y-3">
            {services.map((service) => {
              const active = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                    active
                      ? "border-gold bg-gold/10 text-charcoal shadow-soft"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-sm uppercase tracking-[0.36em]">{service.label}</span>
                  <span className="text-sm font-semibold text-charcoal">{active ? "Selected" : "View"}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-8 rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-soft sm:p-10">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.4em] text-gold">{activeService.label}</span>
            <h3 className="text-3xl font-semibold tracking-tight text-white">{activeService.title}</h3>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">{activeService.summary}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {activeService.bullets.map((bullet) => (
              <div key={bullet} className="rounded-3xl bg-white/5 p-5 text-sm leading-7 text-slate-300 ring-1 ring-white/10">
                {bullet}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Explore depth</p>
              <p className="mt-2 text-sm font-semibold text-white">Detailed service insights available on request.</p>
            </div>
            <Link href={`/services/${activeService.id}`} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-midnight transition hover:bg-[#b18c48]">
              Explore Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
