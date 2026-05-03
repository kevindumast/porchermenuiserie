import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import ContactForm from "./ContactForm";
import CopyableContact from "./CopyableContact";
import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";

// Pas de cache - regenère à chaque visite pour récupérer les images fraîches
export const revalidate = 0;

// Noms des images attendues dans le dossier landing/ du bucket
// Accepte n'importe quel format (.jpg, .png, .webp, etc.)
const LANDING_IMAGE_NAMES = ["1", "2", "3", "4", "5"] as const;

type LandingImages = Record<(typeof LANDING_IMAGE_NAMES)[number], string>;

async function getLandingImages(): Promise<LandingImages> {
  // Liste tous les fichiers du dossier landing/
  const { data: files, error: listError } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .list("landing", { limit: 100 });

  if (listError || !files) {
    console.warn("Erreur listage landing/:", listError);
    return LANDING_IMAGE_NAMES.reduce((acc, name) => ({ ...acc, [name]: "" }), {} as LandingImages);
  }

  // Crée un map des fichiers par nom (sans extension)
  const fileMap = new Map<string, string>();
  for (const file of files) {
    if (file.metadata?.mimetype?.startsWith("image/")) {
      const nameWithoutExt = file.name.split(".")[0];
      fileMap.set(nameWithoutExt, file.name);
    }
  }

  // Génère les URLs signées pour chaque image
  const images: Partial<LandingImages> = {};

  for (const imageName of LANDING_IMAGE_NAMES) {
    const filename = fileMap.get(imageName);
    if (filename) {
      const { data, error } = await supabase.storage
        .from(PROJECTS_BUCKET)
        .createSignedUrl(`landing/${filename}`, 60 * 60 * 24 * 7);

      if (data?.signedUrl) {
        images[imageName] = data.signedUrl;
      } else {
        console.warn(`Erreur URL signée pour landing/${filename}:`, error);
        images[imageName] = "";
      }
    } else {
      console.warn(`Image "${imageName}" introuvable dans le dossier landing/`);
      images[imageName] = "";
    }
  }

  return images as LandingImages;
}

export default async function Home() {
  const img = await getLandingImages();
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Intérieur haut de gamme en bois massif réalisé par Porcher Menuiserie"
            className="w-full h-full object-cover"
            src={img["1"]}
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-beige-light/90 via-beige-light/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            {/* Circular Logo */}
            <div
              className="relative w-32 h-32 mb-12 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                className="absolute w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    id="circlePath"
                  />
                </defs>
                <text className="fill-ocre text-[11px] font-serif tracking-widest uppercase">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    Porcher Menuiserie
                  </textPath>
                </text>
              </svg>
              <div className="w-16 h-16 flex flex-col items-center justify-center border-t border-ocre/30 pt-1">
                <div className="flex gap-0.5">
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-light text-on-surface leading-tight mb-4">
              <span className="sr-only">
                Menuisier sur mesure — Porcher Menuiserie, Ille-et-Vilaine.{" "}
              </span>
              <span aria-hidden="true">
                L&apos;Art du <br />
                <span className="italic font-serif">Geste</span>
              </span>
            </h1>

            {/* Hero subtitle — Jobs To Be Done */}
            <p className="text-base md:text-lg text-on-surface-variant font-light tracking-wide mb-10 max-w-md">
              Menuiserie sur mesure, agencement intérieur et second&nbsp;œuvre —
              de la conception à la pose.
            </p>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px w-8 bg-ocre/30" aria-hidden="true" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-on-surface-variant font-light">
                15&nbsp;ans d&apos;expérience &nbsp;·&nbsp; 150+ réalisations
              </p>
            </div>

            <div className="space-y-1 mb-12">
              <p className="text-xl md:text-2xl font-light text-ocre tracking-widest">
                06&nbsp;68&nbsp;13&nbsp;32&nbsp;45
              </p>
              <p className="text-sm tracking-widest font-light text-on-surface-variant">
                porcher-menuiserie@outlook.fr
              </p>
            </div>

            <div className="flex items-center gap-8">
              <a
                className="bg-ocre text-on-primary px-10 py-5 text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
                href="#projets"
              >
                Explorer le book
              </a>
              <a
                className="group flex items-center gap-3 text-ocre font-medium tracking-wide"
                href="#services"
              >
                <span className="border-b border-ocre/30 group-hover:border-ocre transition-colors pb-1">
                  Savoir-faire
                </span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Book (Asymmetric Grid) */}
      <section className="py-24 md:py-48 bg-surface" id="projets">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-light mb-6">Le Book</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Portfolio numérique : une extension de notre présence à
                l&apos;atelier, illustrant la rigueur et l&apos;esthétique de
                nos réalisations.
              </p>
            </div>
            <Link href="/archives" className="text-ocre text-xs uppercase tracking-widest border-b border-ocre/20 pb-2 hover:border-ocre transition-colors">
              Archives 2025 — Aujourd&apos;hui
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            {/* Main Piece */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="aspect-[4/5] bg-beige-medium/10 overflow-hidden group relative">
                <Image
                  alt="Bibliothèque sur mesure en chêne massif — Projet Héritage"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-[1500ms]"
                  src={img["2"]}
                  fill
                />
              </div>
            </div>

            {/* Detail & Text */}
            <div className="md:col-span-5 md:pt-32 flex flex-col gap-16">
              <div className="aspect-square bg-blue-gray/10 overflow-hidden group relative">
                <Image
                  alt="Détail de finition menuiserie — assemblage tenon-mortaise en noyer"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-110 transition-transform duration-[1500ms]"
                  src={img["3"]}
                  fill
                />
              </div>
              <div className="pr-12">
                <h3 className="text-3xl font-light mb-6">
                  L&apos;exigence du détail
                </h3>
                <p className="text-on-surface-variant font-light">
                  De la conception à la pose, chaque millimètre compte pour
                  garantir un résultat pérenne et harmonieux. Un dialogue entre
                  la structure et l&apos;esthétique.
                </p>
              </div>
            </div>

            {/* Services List */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="aspect-square bg-beige-light p-10 flex flex-col justify-start gap-6">
                <div>
                  <span className="text-ocre uppercase tracking-[0.3em] text-xs block font-bold mb-3">
                    Nos Métiers
                  </span>
                  <h3 className="text-2xl font-serif text-on-surface leading-tight whitespace-nowrap">
                    Ce que nous faisons
                  </h3>
                  <div className="w-8 h-px bg-ocre/40 mt-4" aria-hidden="true" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Agencement",
                    "Menuiserie",
                    "Parquet",
                    "Cloison Sèche",
                    "Faux Plafond",
                  ].map((metier) => (
                    <li
                      key={metier}
                      className="flex items-center gap-3 text-lg font-serif text-on-surface group cursor-default"
                    >
                      <span
                        className="w-1 h-1 bg-ocre rounded-full flex-shrink-0 motion-safe:group-hover:scale-150 transition-transform"
                        aria-hidden="true"
                      />
                      {metier}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wide view */}
            <div className="md:col-span-8 -mt-12 md:-mt-24">
              <div className="aspect-[16/9] md:aspect-[21/9] bg-blue-gray/5 overflow-hidden group relative">
                <Image
                  alt="Agencement complet d'une pièce de vie — menuiserie bois et laiton"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-[1500ms]"
                  src={img["4"]}
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-Faire */}
      <section className="py-24 md:py-48 bg-beige-light" id="services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-ocre/10 -z-10" aria-hidden="true" />
              <div className="relative w-full h-[600px]">
                <Image
                  alt="Artisan menuisier en atelier, travaillant le chêne massif à la main"
                  className="object-cover shadow-2xl"
                  src={img["5"]}
                  fill
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-12 bg-surface max-w-xs border border-beige-medium">
                <blockquote className="text-4xl font-serif text-ocre italic">
                  &ldquo;Le bois a une âme, nous ne faisons que la
                  révéler.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <span className="text-ocre uppercase tracking-[0.4em] text-xs font-bold">
                L&apos;expertise Porcher
              </span>
              <h2 className="text-5xl md:text-6xl font-light leading-tight">
                Tradition &amp; <br />
                Innovation
              </h2>
              <p className="text-lg text-on-surface-variant font-light">
                Fort de 15 années d&apos;expérience dans le milieu de la menuiserie, le gérant de l&apos;entreprise Porcher Menuiserie Agencement saura 
                mettre en œuvre toutes ses compétences pour répondre au mieux à vos 
                attentes. Le sérieux ainsi que le travail minutieux sont les qualités 
                principales de cette entreprise ! Faites appel à Porcher Menuiserie 
                Agencement pour vos travaux de menuiserie intérieure et extérieure !
              </p>

              {/* Testimonial */}
              <div className="border-l-2 border-ocre/30 pl-6">
                <p className="text-on-surface-variant font-light italic mb-3">
                  &ldquo;Un travail d&apos;une précision remarquable, du
                  premier rendez-vous à la pose. Notre agencement sur mesure est
                  exactement ce qu&apos;on imaginait.&rdquo;
                </p>
                <span className="text-[11px] uppercase tracking-widest text-ocre font-medium">
                  Ophélie &amp; Kévin D. — Ille-et-Vilaine
                </span>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-4">
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre">
                    Matières
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Chêne Massif", "Noyer", "Laiton"].map((mat) => (
                      <span
                        key={mat}
                        className="border border-ocre/20 text-ocre text-[10px] px-3 py-1 uppercase tracking-wider"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre">
                    Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Second Œuvre", "Sur Mesure"].map((exp) => (
                      <span
                        key={exp}
                        className="border border-ocre/20 text-ocre text-[10px] px-3 py-1 uppercase tracking-wider"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 pb-36 md:py-48 md:pb-48 bg-surface" id="contact">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Entrer en contact
              </span>
              <h2 className="text-5xl md:text-6xl font-light">
                Donnons vie à vos projets
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
              <div className="md:col-span-4 bg-ocre p-8 text-on-primary">
                <h3 className="text-xl font-serif italic mb-8">
                  Contact Direct
                </h3>
                <div className="space-y-5">
                  <CopyableContact />
                </div>
                <div className="mt-10 pt-6 border-t border-white/20">
                  <span className="block text-[10px] uppercase tracking-widest opacity-70 mb-1">
                    Zone d&apos;intervention
                  </span>
                  <p className="font-light text-sm">
                    Ille-et-Vilaine
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-beige-light py-16 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-ocre flex items-center justify-center" aria-hidden="true">
            <span className="text-ocre font-serif text-sm">P</span>
          </div>
          <div className="text-lg font-serif tracking-tighter text-ocre">
            PORCHER
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 text-on-surface-variant text-[10px] uppercase tracking-[0.2em]">
          <a className="hover:text-ocre transition-colors" href="#">
            Instagram
          </a>
          <a className="hover:text-ocre transition-colors" href="#">
            Pinterest
          </a>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
          © 2026 Porcher Menuiserie Agencement.
        </div>
      </footer>
    </>
  );
}
