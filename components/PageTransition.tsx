"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timeout = window.setTimeout(() => setMounted(true), 20);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={`transition duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>{children}</div>
  );
}
