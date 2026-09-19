import Link from "next/link";

const services = [
  { label: "Real Estate", href: "/services/real-estate" },
  { label: "IT Development", href: "/services/it-development" },
  { label: "Financial Management", href: "/services/financial-management" },
  { label: "Financial Advisory", href: "/services/financial-advisory" },
  { label: "Bookkeeping", href: "/services/bookkeeping" },
  { label: "Marketing", href: "/services/marketing" },
  { label: "Business Development", href: "/services/business-development" },
  { label: "Warehousing", href: "/services/warehousing" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/20 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Professional solutions</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white">Professional solutions for businesses ready to move forward.</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Sudmo Company Limited combines real estate, technology, finance and marketing expertise with local market insight to help organisations make confident decisions and execute with precision.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Services</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="transition hover:text-gold">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Contact</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>
                <span className="block text-slate-400">Phone</span>
                <a href="tel:0713768539" className="text-white hover:text-gold">0713768539</a>
              </li>
              <li>
                <span className="block text-slate-400">Email</span>
                <a href="mailto:sudmocompany@gmail.com" className="text-white hover:text-gold">sudmocompany@gmail.com</a>
              </li>
              <li>
                <span className="block text-slate-400">Location</span>
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sudmo Company Limited. Premium professional services across East Africa.</p>
          <div className="mt-4 flex flex-wrap gap-4 sm:mt-0">
            <Link href="#" className="transition hover:text-gold">LinkedIn</Link>
            <Link href="#" className="transition hover:text-gold">Twitter</Link>
            <Link href="#" className="transition hover:text-gold">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
