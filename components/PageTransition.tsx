"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(false);
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className={`transition duration-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>{children}</div>
  );
}
