import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../Navigation";
import GalleryClient from "./GalleryClient";
import { getProjectFolders, loadProjectPhotos, type Photo } from "./actions";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Book & Réalisations — Porcher Menuiserie, Ille-et-Vilaine",
  description:
    "Galerie des réalisations Porcher Menuiserie : bibliothèques sur mesure, agencement intérieur, parquet, cloisons sèches et faux plafonds en Ille-et-Vilaine.",
  alternates: {
    canonical: "/archives",
  },
  openGraph: {
    title: "Book & Réalisations — Porcher Menuiserie",
    description:
      "Découvrez nos réalisations : agencement sur mesure, menuiserie, parquet en Ille-et-Vilaine.",
    url: "https://porchermenuiserie.vercel.app/archives",
  },
};

export type Project = {
  name: string;
  images: Photo[];
};

export default async function ArchivesPage() {
  const folders = await getProjectFolders();
  const [first, ...rest] = folders;

  // Seul le premier projet est chargé côté serveur pour un affichage rapide.
  // Les suivants se chargent au fur et à mesure du scroll (voir GalleryClient).
  const firstPhotos = first ? await loadProjectPhotos(first.slug) : [];
  const initialProjects: Project[] =
    first && firstPhotos.length > 0 ? [{ name: first.name, images: firstPhotos }] : [];

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-surface pt-24">
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
                Le Book
              </span>
              <h1 className="text-3xl md:text-4xl font-light leading-tight">
                Archives —{" "}
                <span className="font-serif italic">2025 à aujourd&apos;hui</span>
              </h1>
              <p className="text-on-surface-variant text-sm font-light mt-2">
                {folders.length} projet{folders.length > 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/"
              className="self-start md:self-auto flex items-center gap-2 text-on-surface-variant text-[11px] uppercase tracking-widest hover:text-ocre transition-colors"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_back
              </span>
              Retour
            </Link>
          </div>

          {folders.length > 0 ? (
            <GalleryClient initialProjects={initialProjects} pending={rest} />
          ) : (
            <p className="text-on-surface-variant font-light text-center py-24">
              Aucune réalisation pour le moment.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
