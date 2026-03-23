"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { id: "projets", label: "Projets" },
  { id: "services", label: "Savoir-faire" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("projets");

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
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(id);
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
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
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          setActive("contact");
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="bg-ocre text-on-primary px-8 py-3 text-[10px] uppercase tracking-widest font-medium hover:opacity-90 active:scale-95 transition-all"
        aria-label="Demander un devis — accéder au formulaire de contact"
      >
        Demander un devis
      </a>
    </nav>
  );
}
