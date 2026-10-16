"use server";

import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";

export type Photo = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

export type ProjectFolder = { slug: string; name: string };

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 jours

export async function getProjectFolders(): Promise<ProjectFolder[]> {
  const { data: files, error } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .list("projects", { limit: 1000 });

  if (error || !files) return [];

  const slugs = new Set<string>();
  for (const file of files) {
    // Un dossier Supabase n'a pas de metadata/mimetype
    if (!file.metadata?.mimetype) slugs.add(file.name);
  }

  return Array.from(slugs)
    .sort()
    .map((slug) => ({
      slug,
      name: slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
}

export async function loadProjectPhotos(slug: string): Promise<Photo[]> {
  const { data: files, error } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .list(`projects/${slug}`, { limit: 500 });

  if (error || !files) return [];

  const imageFiles = files.filter((f) => f.metadata?.mimetype?.startsWith("image/"));
  if (imageFiles.length === 0) return [];

  const paths = imageFiles.map((f) => `projects/${slug}/${f.name}`);

  // Un seul aller-retour réseau pour toutes les photos du projet,
  // au lieu d'un createSignedUrl séquentiel par photo (très lent).
  const { data: signed, error: signError } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL);

  if (signError || !signed) return [];

  return imageFiles
    .map((file, i) => {
      const entry = signed[i];
      if (!entry?.signedUrl) return null;
      return {
        public_id: paths[i],
        secure_url: entry.signedUrl,
        width: file.metadata?.width || 400,
        height: file.metadata?.height || 400,
      };
    })
    .filter((p): p is Photo => p !== null);
}
