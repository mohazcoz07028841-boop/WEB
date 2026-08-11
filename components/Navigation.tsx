"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/95 shadow-soft/30 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-charcoal">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-bold uppercase tracking-[0.4em] text-gold">
            H
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-slate-500">Horizon</p>
            <p className="text-lg font-semibold">Alliance</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex lg:flex-1 lg:justify-end">
          <ul className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition ${
                      active
                        ? "text-charcoal before:block before:h-0.5 before:w-full before:bg-gold before:mt-1"
                        : "text-slate-600 hover:text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/request-consultation"
            className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-gold/20"
          >
            Request Consultation
            <ArrowRight size={16} />
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-slate-700 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200/60 bg-white/98 px-6 py-6 shadow-soft lg:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-3xl px-4 py-3 transition hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/request-consultation"
              className="inline-flex w-full items-center justify-center rounded-full border border-gold bg-gold/10 px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-gold/20"
              onClick={() => setOpen(false)}
            >
              Request Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
