"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "business-development-and-training-services",
    label: "Business Development",
    title: "Business development and training that strengthen capability and growth.",
    summary:
      "We help organizations build stronger teams, improve operations and unlock business opportunities through practical development and training support.",
    bullets: [
      "Corporate training and mentorship.",
      "Business strategy and capability building.",
      "Partnership development and market opportunity mapping.",
      "Organizational growth support with clear execution plans.",
    ],
  },
  {
    id: "it-planning-and-development-services",
    label: "IT Planning & Development",
    title: "Technology solutions designed for business performance and operational clarity.",
    summary:
      "We support organizations with planning, development and digital systems that improve business processes and deliver measurable outcomes.",
    bullets: [
      "IT strategy and planning.",
      "Website and management information systems.",
      "Business process and workflow improvement.",
      "Digital transformation support.",
    ],
  },
  {
    id: "real-estate-services",
    label: "Real Estate",
    title: "Strategic property support for better decisions and stronger returns.",
    summary:
      "Our real estate services help clients evaluate opportunities, plan effectively and manage property-related decisions with clarity and professionalism.",
    bullets: [
      "Market insight and property advisory.",
      "Development support and project planning.",
      "Asset and portfolio guidance.",
      "Operational supervision and delivery oversight.",
    ],
  },
  {
    id: "warehousing-services",
    label: "Warehousing",
    title: "Operational support for dependable storage and supply chain efficiency.",
    summary:
      "We provide warehousing support that helps businesses improve logistics coordination, storage management and service continuity.",
    bullets: [
      "Warehousing and logistics planning.",
      "Operational coordination and oversight.",
      "Supply chain efficiency support.",
      "Service continuity and resource alignment.",
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
