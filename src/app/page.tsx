import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import ContactForm from "./ContactForm";
import CopyableContact from "./CopyableContact";
import Reveal from "./Reveal";
import Counter from "./Counter";
import HeroLogo from "./HeroLogo";
import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";
import { BLUR_BEIGE_MEDIUM, BLUR_BLUE_GRAY } from "@/lib/blur";

// Pas de cache - regenère à chaque visite pour récupérer les images fraîches
export const revalidate = 0;

// Noms des images attendues dans le dossier landing/ du bucket
// Accepte n'importe quel format (.jpg, .png, .webp, etc.)
const LANDING_IMAGE_NAMES = ["1", "2", "3", "4", "5"] as const;

// Métiers affichés dans la carte « Nos métiers » de la section Book
const METIERS = [
  { name: "Agencement", detail: "Dressings, bibliothèques, cuisines" },
  { name: "Menuiserie", detail: "Menuiseries extérieures, portes de garage" },
  { name: "Parquet", detail: "Pose, ponçage et finitions" },
  { name: "Cloison sèche", detail: "Cloisons, doublages, isolation" },
  { name: "Faux plafond", detail: "Plafonds suspendus en plaque de plâtre, plafonds en dalles acoustiques" },
];

type LandingImages =Record<(typeof LANDING_IMAGE_NAMES)[number], string>;

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
          {/* Voile uni tant que le texte occupe toute la largeur ; au-delà, la photo respire à droite */}
          <div className="absolute inset-0 bg-beige-light/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-beige-light/95 lg:from-40% lg:via-beige-light/80 lg:via-60% lg:to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Logo animé sur médaillon beige */}
          <div className="absolute right-6 top-8 w-32 h-32 min-[420px]:w-36 min-[420px]:h-36 sm:w-40 sm:h-40 md:right-12 md:w-52 md:h-52 lg:top-1/2 lg:-translate-y-1/2 lg:w-80 lg:h-80 xl:right-24 rounded-full bg-surface/80 backdrop-blur-sm">
            <HeroLogo className="w-full h-full" />
          </div>
          <div className="max-w-3xl">
            <p className="type-eyebrow text-ocre-dark mb-4" aria-hidden="true">
              Menuisier · Bretagne et alentours
            </p>
            <h1 className="text-5xl min-[420px]:text-6xl md:text-8xl font-light text-on-surface leading-tight md:leading-[1.05] mb-6">
              <span className="sr-only">
                Menuisier sur mesure — Porcher Menuiserie, Bretagne et alentours.{" "}
              </span>
              <span aria-hidden="true">
                {/* Une ligne sur grand écran ; deux en dessous, à côté du médaillon */}
                L&apos;Art du <br className="xl:hidden" />
                <span className="italic font-accent">Geste</span>
              </span>
            </h1>

            {/* Hero subtitle — Jobs To Be Done */}
            <p className="text-base md:text-lg text-on-surface-variant mb-8 max-w-md">
              Menuiserie sur mesure, agencement intérieur et second&nbsp;œuvre —
              de la conception à la pose.
            </p>

            {/* Une action principale (devis), une secondaire (photos) */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                className="bg-ocre-dark text-on-primary px-10 py-5 type-button hover:bg-on-surface active:scale-95 transition-[background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href="#contact"
              >
                Demander un devis
              </a>
              <Link
                className="group flex items-center gap-3 min-h-11 text-ocre-dark font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href="/archives"
              >
                <span className="border-b border-ocre group-hover:border-ocre-dark transition-colors pb-1">
                  Voir les réalisations
                </span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* Zone tactile de 44 px, soulignement porté par le span pour rester collé au texte */}
            <p className="mt-3 text-base text-on-surface-variant">
              ou appelez le{" "}
              <a
                href="tel:+33668133245"
                className="group inline-flex items-center min-h-11 text-ocre-dark font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-dark"
              >
                <span className="border-b border-ocre group-hover:border-ocre-dark transition-colors">
                  06&nbsp;68&nbsp;13&nbsp;32&nbsp;45
                </span>
              </a>
            </p>

            {/* Preuves : le socle du bloc */}
            <dl className="mt-10 pt-5 border-t border-ocre/20 grid grid-cols-2 gap-6 max-w-sm">
              {[
                { value: <Counter to={15} />, label: "ans d'expérience" },
                { value: <><Counter to={150} />+</>, label: "réalisations" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 type-caps leading-relaxed text-on-surface-variant">
                    {label}
                  </dt>
                  <dd className="font-serif text-4xl md:text-5xl font-light text-on-surface tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The Book (Asymmetric Grid) */}
      <section className="py-24 md:py-48 bg-surface" id="projets">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-light mb-6">Le Book</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Portfolio numérique : une extension de notre présence à
                l&apos;atelier, illustrant la rigueur et l&apos;esthétique de
                nos réalisations.
              </p>
            </div>
            <Link href="/archives" className="group inline-flex items-center gap-3 text-ocre-dark type-caps border-b border-ocre/20 pb-2 hover:border-ocre transition-colors">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" />
                <circle cx="9" cy="10" r="1.5" />
                <path d="M3 17l5-5 4 4 2.5-2.5L21 19" />
              </svg>
              Photos projets
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            {/* Main Piece */}
            <Reveal className="md:col-span-7 flex flex-col gap-6">
              <div className="aspect-[4/5] bg-beige-medium/10 overflow-hidden group relative">
                <Image
                  alt="Bibliothèque sur mesure en chêne massif — Projet Héritage"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-[1500ms]"
                  src={img["2"]}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_BEIGE_MEDIUM}
                />
              </div>
            </Reveal>

            {/* Detail & Text */}
            <Reveal delay={150} className="md:col-span-5 md:pt-32 flex flex-col gap-16">
              <div className="aspect-square bg-blue-gray/10 overflow-hidden group relative">
                <Image
                  alt="Détail de finition menuiserie — assemblage tenon-mortaise en noyer"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-110 transition-transform duration-[1500ms]"
                  src={img["3"]}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_BLUE_GRAY}
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
            </Reveal>

            {/* Métiers — index éditorial, les filets se tracent à l'apparition */}
            <Reveal delay={300} className="group/reveal md:col-span-5 lg:col-span-4">
              <div className="bg-beige-light p-8 lg:p-10">
                <span className="type-eyebrow text-ocre-dark block mb-3">
                  Nos métiers
                </span>
                <h3 className="text-2xl font-serif text-on-surface leading-tight mb-8">
                  Un seul interlocuteur, <span className="italic">cinq&nbsp;métiers</span>
                </h3>

                <ol className="border-t border-ocre/20">
                  {METIERS.map(({ name, detail }, i) => (
                    <li key={name} className="relative grid grid-cols-[2rem_1fr] items-baseline gap-x-2 py-4">
                      <span className="font-serif italic text-sm text-ocre-dark tabular-nums" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="block text-lg font-serif text-on-surface leading-snug">{name}</span>
                        <span className="block text-xs font-light tracking-wide text-on-surface-variant mt-1">
                          {detail}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px w-full bg-ocre/20 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[visible=true]/reveal:scale-x-100"
                        style={{ transitionDelay: `${500 + i * 90}ms` }}
                      />
                    </li>
                  ))}
                </ol>

                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-3 text-ocre-dark type-caps focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-dark focus-visible:ring-offset-2 focus-visible:ring-offset-beige-light"
                >
                  <span className="border-b border-ocre/30 group-hover:border-ocre transition-colors pb-1">
                    Parlons de votre projet
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </Reveal>

            {/* Wide view */}
            <Reveal className="md:col-span-7 lg:col-span-8 -mt-12 md:-mt-24 md:self-stretch">
              <div className="aspect-[16/9] md:aspect-auto md:h-full bg-blue-gray/5 overflow-hidden group relative">
                <Image
                  alt="Agencement complet d'une pièce de vie — menuiserie bois et laiton"
                  className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-[1500ms]"
                  src={img["4"]}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_BLUE_GRAY}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Savoir-Faire */}
      <section className="py-24 md:py-48 bg-beige-light" id="services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <Reveal className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-ocre/10 -z-10" aria-hidden="true" />
              <div className="relative w-full h-[600px]">
                <Image
                  alt="Artisan menuisier en atelier, travaillant le chêne massif à la main"
                  className="object-cover shadow-2xl"
                  src={img["5"]}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_BEIGE_MEDIUM}
                />
              </div>
              <div className="absolute -bottom-8 -left-6 md:-left-8 p-8 md:p-12 bg-surface max-w-[16rem] md:max-w-xs border border-beige-medium">
                <blockquote className="text-3xl md:text-4xl font-serif text-ocre italic">
                  &ldquo;Le bois a une âme, nous ne faisons que la
                  révéler.&rdquo;
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={150} className="flex flex-col gap-12">
              <span className="type-eyebrow text-ocre-dark">
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
                <span className="type-caps text-ocre-dark">
                  Ophélie &amp; Kévin D. — Ille-et-Vilaine
                </span>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-4">
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre-dark">
                    Matières
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Chêne Massif", "Noyer", "Laiton"].map((mat) => (
                      <span
                        key={mat}
                        className="border border-ocre/20 text-ocre-dark type-caps px-3 py-1"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre-dark">
                    Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Second Œuvre", "Sur Mesure"].map((exp) => (
                      <span
                        key={exp}
                        className="border border-ocre/20 text-ocre-dark type-caps px-3 py-1"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 pb-36 md:py-48 md:pb-48 bg-surface" id="contact">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-24">
              <span className="type-eyebrow text-ocre-dark mb-4 block">
                Entrer en contact
              </span>
              <h2 className="text-5xl md:text-6xl font-light">
                Donnons vie à vos projets
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-12 xl:gap-x-24 items-start">
              <Reveal className="md:col-span-4 bg-ocre-dark p-8 text-on-primary">
                <h3 className="text-xl font-serif italic mb-8">
                  Contact Direct
                </h3>
                <div className="space-y-5">
                  <CopyableContact />
                </div>
                <div className="mt-10 pt-6 border-t border-on-primary/20">
                  <span className="block type-caps opacity-80 mb-1">
                    Zone d&apos;intervention
                  </span>
                  <p className="font-light text-sm">
                    Ille-et-Vilaine
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150} className="md:col-span-8">
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
