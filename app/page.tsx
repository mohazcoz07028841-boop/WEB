import Link from "next/link";
import { CredibilityStrip } from "@/components/CredibilityStrip";
import { HomeServiceNavigator } from "@/components/HomeServiceNavigator";

export default async function HomePage() {

  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_24%),linear-gradient(180deg,_rgba(8,27,51,0.88),_rgba(8,27,51,0.96))]" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[url('https://images.unsplash.com/photo-1535168565606-9c57ef651860?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.9fr] lg:items-end">
            <div className="max-w-2xl space-y-8">
              <p className="text-xs uppercase tracking-[0.55em] text-gold/80">REAL ESTATE • TECHNOLOGY • FINANCE • BUSINESS</p>
              <div className="space-y-6">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Building better businesses, properties & digital solutions.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
                  A premium advisory partner for organisations seeking strategic clarity, commercial growth and lasting value across Kenya and East Africa.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/request-consultation"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-midnight shadow-glow transition duration-300 hover:bg-[#b18c48]"
                >
                  Request a Consultation
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:border-gold hover:bg-white/20"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950 p-8 shadow-glow backdrop-blur-xl sm:p-10">
              <div className="absolute right-6 top-6 h-24 w-1 rounded-full bg-gold/80 blur-xl opacity-80" />
              <div className="relative space-y-6">
                <div className="rounded-[28px] bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Nairobi • East Africa</p>
                  <p className="mt-4 text-xl font-semibold leading-8 text-white">Modern property, technology and finance solutions shaped for regional growth.</p>
                </div>
                <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-5 text-sm text-slate-200">
                      <p className="text-4xl font-semibold text-gold">12+</p>
                      <p className="mt-2 uppercase tracking-[0.35em] text-slate-400">Years of market insight</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-5 text-sm text-slate-200">
                      <p className="text-4xl font-semibold text-gold">30+</p>
                      <p className="mt-2 uppercase tracking-[0.35em] text-slate-400">Strategies delivered</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[32px] bg-white/5 p-6 text-sm leading-7 text-slate-300">
                  <p className="uppercase tracking-[0.35em] text-slate-400">Insight</p>
                  <p className="mt-3">We help clients move beyond short-term fixes to architect long-term performance across property, systems and finance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CredibilityStrip />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <HomeServiceNavigator />
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.45em] text-slate-500">Real estate</p>
              <h2 className="text-4xl font-semibold text-charcoal sm:text-5xl">Turning property opportunities into strategic possibilities.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Expert advice and delivery support for investors, developers and institutions seeking resilient real estate returns.
              </p>
              <ul className="grid gap-3 text-sm leading-7 text-slate-700 sm:grid-cols-2">
                <li>Property advisory</li>
                <li>Development support</li>
                <li>Property management</li>
                <li>Real estate consulting</li>
              </ul>
              <Link href="/services/real-estate" className="inline-flex rounded-full border border-charcoal bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal/90">
                Explore Real Estate
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-slate-950 text-white shadow-soft">
              <div className="h-[420px] bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center filter brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-gold">Featured capability</p>
                <p className="mt-3 text-lg font-semibold text-white">Portfolio and asset strategy built for long-term resilience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-midnight py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.45em] text-gold/80">Technology</p>
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">Technology that moves business forward.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                Modern digital systems, secure platforms and analytics that unlock efficiency and insight.
              </p>
              <ul className="grid gap-3 text-sm leading-7 text-slate-300 sm:grid-cols-2">
                <li>IT strategy</li>
                <li>Software development</li>
                <li>Business systems</li>
                <li>Digital transformation</li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900 p-8 shadow-soft">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[28px] bg-slate-950 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold/75">Dashboard</p>
                  <p className="mt-3 text-lg font-semibold text-white">Performance metrics and controls in one place.</p>
                </div>
                <div className="rounded-[28px] bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Analytics</p>
                  <p className="mt-3 text-lg font-semibold text-white">Clear insight for faster decisions.</p>
                </div>
                <div className="rounded-[28px] bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Automation</p>
                  <p className="mt-3 text-lg font-semibold text-white">Workflow efficiency without compromise.</p>
                </div>
                <div className="rounded-[28px] bg-slate-950 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold/75">Systems</p>
                  <p className="mt-3 text-lg font-semibold text-white">Reliable solutions for core operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.45em] text-slate-500">Finance</p>
              <h2 className="text-4xl font-semibold text-charcoal sm:text-5xl">Know your numbers. Make better decisions.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Financial advisory and management designed to help leadership act with confidence and control.
              </p>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                <li>Financial management</li>
                <li>Financial advisory</li>
                <li>Bookkeeping</li>
                <li>Commercial planning</li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-slate-950 text-white shadow-soft p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,161,102,0.18),_transparent_22%)]" />
              <div className="relative grid gap-6">
                <div className="rounded-[28px] bg-slate-900/95 p-6">
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-2 w-[72%] rounded-full bg-gold" />
                  </div>
                  <p className="mt-4 text-sm text-slate-300">Cash flow visibility and capital planning.</p>
                </div>
                <div className="rounded-[28px] bg-slate-900/95 p-6">
                  <div className="grid gap-2 text-sm text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Revenue</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800">
                      <div className="h-2 w-[68%] rounded-full bg-gold" />
                    </div>
                  </div>
                </div>
                <div className="rounded-[28px] bg-slate-900/95 p-6">
                  <p className="text-sm text-slate-300">Financial systems built for clarity, control and compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70">Marketing</p>
              <h2 className="text-4xl font-semibold text-charcoal sm:text-5xl">Attract, engage, convert and retain with purpose.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Brand, campaign and digital marketing that supports your growth ambitions with measurable execution.
              </p>
            </div>
            <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[28px] bg-slate-100 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">ATTRACT</p>
                  <p className="mt-3 text-base text-slate-700">Build awareness with a compelling market position.</p>
                </div>
                <div className="rounded-[28px] bg-slate-100 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">ENGAGE</p>
                  <p className="mt-3 text-base text-slate-700">Create relevance through consistent digital experiences.</p>
                </div>
                <div className="rounded-[28px] bg-slate-100 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">CONVERT</p>
                  <p className="mt-3 text-base text-slate-700">Drive commercial outcomes with disciplined campaigns.</p>
                </div>
                <div className="rounded-[28px] bg-slate-100 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">RETAIN</p>
                  <p className="mt-3 text-base text-slate-700">Keep your clients engaged with practical growth systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-midnight py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-10 sm:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Ready to talk</p>
                <h2 className="mt-4 text-4xl font-semibold">Let’s build what comes next.</h2>
                <p className="mt-4 max-w-xl leading-8 text-slate-300">
                  Whether you are planning a property project, improving business systems, strengthening financial management or growing your market presence, let’s talk.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
                <Link href="/request-consultation" className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-[#b18c48]">
                  Request a Consultation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
