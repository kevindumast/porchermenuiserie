import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/social";

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

        <div className="type-caps text-on-surface-variant opacity-60">
          © {new Date().getFullYear()} Porcher Menuiserie Agencement.
        </div>
      </div>
    </footer>
  );
}
