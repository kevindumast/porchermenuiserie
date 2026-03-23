import { v2 as cloudinary } from "cloudinary";
import Link from "next/link";
import Navigation from "../Navigation";
import GalleryClient from "./GalleryClient";

export const revalidate = 0;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

type Project = {
  name: string;
  images: CloudinaryResource[];
};

async function getProjects(): Promise<Project[]> {
  const { folders } = (await cloudinary.api.sub_folders(
    "porchermenuiserie/projects"
  )) as { folders: { name: string; path: string }[] };

  const projects: Project[] = [];

  for (const folder of folders) {
    const result = (await cloudinary.api.resources_by_asset_folder(
      folder.path,
      { max_results: 200, resource_type: "image" }
    )) as { resources: CloudinaryResource[] };

    if (result.resources.length > 0) {
      projects.push({
        name: folder.name
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        images: result.resources,
      });
    }
  }

  return projects;
}

export default async function ArchivesPage() {
  const projects = await getProjects();

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-surface pt-24">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div>
              <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Le Book
              </span>
              <h1 className="text-5xl md:text-7xl font-light leading-tight">
                Archives
                <br />
                <span className="font-serif italic">2025 — Aujourd&apos;hui</span>
              </h1>
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
