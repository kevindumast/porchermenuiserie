import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/social";
import { LinkedInIcon } from "./icons";

// Crédit du développeur du site (distinct des réseaux de l'entreprise)
const DEVELOPER_LINKEDIN_URL = "https://www.linkedin.com/in/kevin-dumast-29aa5588/";

export default function Footer() {
  return (
    <footer className="bg-beige-light pt-16 pb-32 md:py-16 px-6 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-ocre flex items-center justify-center" aria-hidden="true">
            <span className="text-ocre font-serif text-sm">P</span>
          </div>
          <div className="text-lg font-serif tracking-tighter text-ocre">
            PORCHER
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 text-on-surface-variant type-caps">
          <a
            className="hover:text-ocre transition-colors"
            href="tel:0668133245"
          >
            06 68 13 32 45
          </a>
          <a
            className="hover:text-ocre transition-colors"
            href="mailto:porcher-menuiserie@outlook.fr"
          >
            porcher-menuiserie@outlook.fr
          </a>
          <Link
            className="hover:text-ocre transition-colors"
            href="/mentions-legales"
          >
            Mentions légales
          </Link>
          <Link
            className="hover:text-ocre transition-colors"
            href="/politique-confidentialite"
          >
            Confidentialité
          </Link>
          <a
            className="hover:text-ocre transition-colors"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivre Porcher Menuiserie sur Instagram"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Barre du bas, sous un filet : copyright à gauche, crédit du site à droite */}
      <div className="container mx-auto mt-12 pt-6 border-t border-ocre/15 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left type-caps text-on-surface-variant">
        {/* 80 % : plus discret que les liens du dessus, mais lisible (contraste AA dans les deux thèmes) */}
        <span className="opacity-80">
          © {new Date().getFullYear()} Porcher Menuiserie Agencement.
        </span>
        <a
          className="group inline-flex items-center gap-2 whitespace-nowrap opacity-80 hover:opacity-100 hover:text-ocre focus-visible:opacity-100 focus-visible:text-ocre transition-[color,opacity]"
          href={DEVELOPER_LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site réalisé par Kevin Dumast — profil LinkedIn (nouvel onglet)"
        >
          Site réalisé par Kevin Dumast
          <LinkedInIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>
    </footer>
  );
}
