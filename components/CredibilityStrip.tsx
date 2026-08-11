export function CredibilityStrip() {
  const items = [
    { label: "ACCOUNTABILITY", detail: "Clear ownership and professional delivery." },
    { label: "QUALITY MANAGEMENT", detail: "Rigorous review at every stage." },
    { label: "INTEGRITY", detail: "Honest guidance built on trust." },
    { label: "CLIENT FOCUS", detail: "Solutions aligned with your priorities." },
  ];

  return (
    <section className="bg-slate-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid divide-x divide-slate-700 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-soft sm:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.label} className="px-6 py-8 sm:px-8">
              <p className="text-4xl font-semibold tracking-tight text-gold">0{index + 1}</p>
              <p className="mt-3 uppercase tracking-[0.35em] text-xs text-slate-400">{item.label}</p>
              <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
