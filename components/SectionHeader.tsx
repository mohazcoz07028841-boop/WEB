export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-charcoal sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
    </div>
  );
}
