import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../Navigation";
import GalleryClient from "./GalleryClient";
import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";

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

type Photo = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

type Project = {
  name: string;
  images: Photo[];
};

async function getProjects(): Promise<Project[]> {
  // Liste les dossiers dans porchermenuiserie/projects/
  const { data: files, error } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .list("projects", {
      limit: 1000,
    });

  console.log("📁 Listing porchermenuiserie/projects/");
  console.log("Erreur:", error);
  console.log("Fichiers/dossiers:", files?.map((f) => ({ name: f.name, type: f.id?.endsWith("/") ? "dossier" : "fichier" })));

  if (error || !files) {
    console.error("Erreur Supabase:", error);
    return [];
  }

  // Extrait les noms de dossiers uniques (projets)
  // Un dossier Supabase n'a pas de metadata ou pas de mimetype
  const projectFolders = new Set<string>();
  for (const file of files) {
    if (!file.metadata?.mimetype) {
      projectFolders.add(file.name);
    }
  }

  console.log("📂 Dossiers trouvés:", Array.from(projectFolders));

  const projects: Project[] = [];

  // Pour chaque projet, récupère les images
  for (const projectFolder of Array.from(projectFolders).sort()) {
    const { data: images, error: imageError } = await supabase.storage
      .from(PROJECTS_BUCKET)
      .list(`projects/${projectFolder}`, {
        limit: 500,
      });

    console.log(`📸 Listing ${projectFolder}:`, images?.length, "fichiers");

    if (imageError || !images) {
      console.log(`❌ Erreur pour ${projectFolder}:`, imageError);
      continue;
    }

    const photoList: Photo[] = [];
    for (const image of images) {
      if (image.metadata?.mimetype?.startsWith("image/")) {
        const path = `projects/${projectFolder}/${image.name}`;
        const { data, error: signError } = await supabase.storage
          .from(PROJECTS_BUCKET)
          .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 jours

        console.log(`URL pour ${image.name}:`, data?.signedUrl, signError);

        if (data?.signedUrl) {
          photoList.push({
            public_id: path,
            secure_url: data.signedUrl,
            width: image.metadata.width || 400,
            height: image.metadata.height || 400,
          });
        }
      }
    }

    console.log(`✅ ${projectFolder}: ${photoList.length} images`);

    if (photoList.length > 0) {
      projects.push({
        name: projectFolder
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        images: photoList,
      });
    }
  }

  console.log("🎉 Total projets:", projects.length);
  return projects;
}

export default async function ArchivesPage() {
  const projects = await getProjects();

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
                {projects.reduce((acc, p) => acc + p.images.length, 0)} photos
                &nbsp;·&nbsp; {projects.length} projet{projects.length > 1 ? "s" : ""}
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

          {projects.length > 0 ? (
            <GalleryClient projects={projects} />
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
