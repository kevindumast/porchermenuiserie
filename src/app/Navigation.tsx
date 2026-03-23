"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { id: "projets", label: "Projets" },
  { id: "services", label: "Savoir-faire" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("projets");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setActive(id);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-12 py-6 bg-surface/70 backdrop-blur-xl z-50">
      <Link href="/" className="flex items-center gap-4">
        <div className="w-10 h-10 border border-ocre flex items-center justify-center">
          <span className="text-ocre font-serif text-xl">P</span>
        </div>
        <div className="hidden md:block text-xl font-serif tracking-tighter text-ocre">
          PORCHER
        </div>
      </Link>

      <div className="hidden md:flex gap-12 items-center">
        {NAV_LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={isHome ? `#${id}` : `/#${id}`}
            onClick={(e) => handleNavClick(e, id)}
            className="relative font-serif font-light tracking-wide pb-2 group"
          >
            <span
              className={`transition-colors duration-300 ${
                active === id ? "text-ocre" : "text-on-surface-variant group-hover:text-ocre"
              }`}
            >
              {label}
            </span>
            <span
              className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                active === id ? "w-full bg-ocre" : "w-0 bg-ocre group-hover:w-full group-hover:opacity-40"
              }`}
            />
          </a>
        ))}
      </div>

      <a
        href={isHome ? "#contact" : "/#contact"}
        onClick={(e) => handleNavClick(e, "contact")}
        className="bg-ocre text-on-primary px-8 py-3 text-[10px] uppercase tracking-widest font-medium hover:opacity-90 active:scale-95 transition-all"
        aria-label="Demander un devis — accéder au formulaire de contact"
      >
        Demander un devis
      </a>
    </nav>
  );
}
