"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ANCHORS = [
  { id: "projets", label: "Projets", icon: "grid_view" },
  { id: "services", label: "Savoir-faire", icon: "handyman" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const BOOK_LINK = { href: "/archives", label: "Book", icon: "auto_stories" };

export default function Navigation() {
  const [active, setActive] = useState("projets");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isBook = pathname === BOOK_LINK.href;

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
    <>
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
        {NAV_ANCHORS.map(({ id, label }) => (
          <a
            key={id}
            href={isHome ? `#${id}` : `/#${id}`}
            onClick={(e) => handleNavClick(e, id)}
            className="relative font-serif font-light tracking-wide pb-2 group"
          >
            <span
              className={`transition-colors duration-300 ${
                isHome && active === id ? "text-ocre" : "text-on-surface-variant group-hover:text-ocre"
              }`}
            >
              {label}
            </span>
            <span
              className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                isHome && active === id ? "w-full bg-ocre" : "w-0 bg-ocre group-hover:w-full group-hover:opacity-40"
              }`}
            />
          </a>
        ))}

        <Link
          href={BOOK_LINK.href}
          className="relative font-serif font-light tracking-wide pb-2 group"
        >
          <span
            className={`transition-colors duration-300 ${
              isBook ? "text-ocre" : "text-on-surface-variant group-hover:text-ocre"
            }`}
          >
            {BOOK_LINK.label}
          </span>
          <span
            className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
              isBook ? "w-full bg-ocre" : "w-0 bg-ocre group-hover:w-full group-hover:opacity-40"
            }`}
          />
        </Link>
      </div>

      <a
        href={isHome ? "#contact" : "/#contact"}
        onClick={(e) => handleNavClick(e, "contact")}
        className="bg-ocre text-on-primary px-8 py-3 text-[10px] uppercase tracking-widest font-medium hover:bg-ocre-dark active:scale-95 transition-[background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        aria-label="Demander un devis — accéder au formulaire de contact"
      >
        Demander un devis
      </a>
    </nav>

    {/* Barre de navigation mobile — visible uniquement sur téléphone */}
    <nav
      className="fixed bottom-0 w-full md:hidden bg-surface/90 backdrop-blur-xl border-t border-ocre/20 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around items-center py-2">
        {NAV_ANCHORS.map(({ id, label, icon }) => (
          <a
            key={id}
            href={isHome ? `#${id}` : `/#${id}`}
            onClick={(e) => handleNavClick(e, id)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 group"
          >
            <span
              className={`material-symbols-outlined text-[22px] transition-colors duration-200 ${
                isHome && active === id ? "text-ocre" : "text-on-surface-variant"
              }`}
              style={{ fontVariationSettings: isHome && active === id ? "'FILL' 1" : "'FILL' 0" }}
            >
              {icon}
            </span>
            <span
              className={`text-[10px] tracking-wide transition-colors duration-200 ${
                isHome && active === id ? "text-ocre" : "text-on-surface-variant"
              }`}
            >
              {label}
            </span>
          </a>
        ))}

        <Link
          href={BOOK_LINK.href}
          className="flex flex-col items-center gap-0.5 px-2 py-1 group"
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-colors duration-200 ${
              isBook ? "text-ocre" : "text-on-surface-variant"
            }`}
            style={{ fontVariationSettings: isBook ? "'FILL' 1" : "'FILL' 0" }}
          >
            {BOOK_LINK.icon}
          </span>
          <span
            className={`text-[10px] tracking-wide transition-colors duration-200 ${
              isBook ? "text-ocre" : "text-on-surface-variant"
            }`}
          >
            {BOOK_LINK.label}
          </span>
        </Link>

        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={(e) => handleNavClick(e, "contact")}
          className="flex flex-col items-center gap-0.5 px-2 py-1"
          aria-label="Demander un devis"
        >
          <span className="material-symbols-outlined text-[22px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>
            request_quote
          </span>
          <span className="text-[10px] tracking-wide text-on-surface-variant">Devis</span>
        </a>
      </div>
    </nav>
    </>
  );
}
