"use server";

import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";

export type Photo = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

export type ProjectFolder = { slug: string; name: string };

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

  // URLs publiques stables : Vercel ne retransforme une image que si son URL change.
  // Le paramètre v change quand le fichier est remplacé, ce qui invalide le cache.
  return imageFiles.map((file) => {
    const path = `projects/${slug}/${file.name}`;
    const { data } = supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(path);
    const version = file.updated_at ? `?v=${Date.parse(file.updated_at)}` : "";
    return {
      public_id: path,
      secure_url: `${data.publicUrl}${version}`,
      width: file.metadata?.width || 400,
      height: file.metadata?.height || 400,
    };
  });
}
