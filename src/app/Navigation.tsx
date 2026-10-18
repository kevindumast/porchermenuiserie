"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ANCHORS = [
  { id: "projets", label: "Projets" },
  { id: "services", label: "Savoir-faire" },
  { id: "contact", label: "Contact" },
];

const BOOK_LINK = { href: "/archives", label: "Book" };

const PHONE = { href: "tel:+33668133245", label: "06 68 13 32 45" };

// Onglets de la barre mobile (Contact est porté par le bouton Devis)
const MOBILE_TABS = [
  { id: "projets", label: "Projets", Icon: ShelfIcon },
  { id: "services", label: "Savoir-faire", Icon: SquareIcon },
] as const;

export default function Navigation() {
  const [active, setActive] = useState("");
  const [typing, setTyping] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isBook = pathname === BOOK_LINK.href;

  // Suit la section qui traverse le milieu de l'écran
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_ANCHORS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else if (entry.target.id === "projets" && entry.boundingClientRect.top > 0) setActive("");
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Masque la barre mobile pendant la saisie : le clavier la ferait remonter sur le formulaire
  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable='true']");
    const onFocusIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onFocusOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // « Projets » reste actif sur la page Book
  const isActive = (id: string) => (isHome && active === id) || (isBook && id === "projets");
  const activeTab = MOBILE_TABS.findIndex(({ id }) => isActive(id));

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
        <div className="text-xl font-serif tracking-tighter text-ocre">
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

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Sur mobile, le devis est porté par la barre du bas */}
        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={(e) => handleNavClick(e, "contact")}
          className="hidden md:inline-block bg-ocre text-on-primary px-8 py-3 text-[10px] uppercase tracking-widest font-medium hover:bg-ocre-dark active:scale-95 transition-[background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label="Demander un devis — accéder au formulaire de contact"
        >
          Demander un devis
        </a>
      </div>
    </nav>

    {/* Barre mobile : navigation à gauche, action principale à droite */}
    <nav
      aria-label="Navigation mobile"
      className={`pm-bar-in fixed inset-x-0 bottom-0 z-50 md:hidden bg-surface/85 backdrop-blur-xl border-t border-ocre/15 shadow-[0_-12px_32px_-16px_rgba(34,26,17,0.18)] transition-transform duration-300 ease-out ${
        typing ? "translate-y-full" : ""
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16">
        <div className="relative grid flex-1 grid-cols-3">
          {/* Repère actif : glisse d'un onglet à l'autre */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 h-0.5 w-1/3 bg-ocre transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(${Math.max(activeTab, 0) * 100}%) scaleX(${activeTab < 0 ? 0 : 0.5})`,
              opacity: activeTab < 0 ? 0 : 1,
            }}
          />

          {MOBILE_TABS.map(({ id, label, Icon }) => {
            const current = isActive(id);
            return (
              <a
                key={id}
                href={isHome ? `#${id}` : `/#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                aria-current={current ? "location" : undefined}
                className={`group flex flex-col items-center justify-center gap-1 transition-colors duration-300 active:bg-ocre/5 focus-visible:outline-none focus-visible:bg-ocre/10 ${
                  current ? "text-ocre-dark" : "text-on-surface-variant"
                }`}
              >
                <Icon active={current} />
                <span className={`text-[11px] tracking-wide ${current ? "font-medium" : "font-light"}`}>{label}</span>
              </a>
            );
          })}

          <a
            href={PHONE.href}
            aria-label={`Appeler Porcher Menuiserie au ${PHONE.label}`}
            className="group flex flex-col items-center justify-center gap-1 text-on-surface-variant active:bg-ocre/5 focus-visible:outline-none focus-visible:bg-ocre/10"
          >
            <PhoneIcon />
            <span className="text-[11px] tracking-wide font-light">Appeler</span>
          </a>
        </div>

        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={(e) => handleNavClick(e, "contact")}
          aria-label="Demander un devis — accéder au formulaire de contact"
          className="group flex items-center gap-2 bg-ocre px-5 text-on-primary text-[11px] uppercase tracking-[0.2em] font-medium transition-colors active:bg-ocre-dark focus-visible:outline-none focus-visible:bg-ocre-dark"
        >
          Devis
          <svg className="w-4 h-4 transition-transform duration-300 group-active:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </nav>
    </>
  );
}

// Icônes au trait, angles vifs comme le reste du site
const ICON_CLASS = "w-[22px] h-[22px] transition-transform duration-300 group-active:scale-90";

function ShelfIcon({ active }: { active: boolean }) {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" fill="currentColor" fillOpacity={active ? 0.15 : 0} className="transition-[fill-opacity] duration-300" />
      <path d="M12 4v16M4 10h8M12 14h8" />
    </svg>
  );
}

function SquareIcon({ active }: { active: boolean }) {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 4h4v12h12v4H4z" fill="currentColor" fillOpacity={active ? 0.15 : 0} className="transition-[fill-opacity] duration-300" />
      <path d="M6 8h2M6 12h2M12 18v-2M16 18v-2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3 4.5 1.8V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
    </svg>
  );
}
