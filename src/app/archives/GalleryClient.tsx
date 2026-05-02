"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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

export default function GalleryClient({ projects }: { projects: Project[] }) {
  const [lightbox, setLightbox] = useState<{
    photos: Photo[];
    index: number;
  } | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length } : null
    );
  }, []);

  const next = useCallback(() => {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : null
    );
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  useEffect(() => {
    if (!lightbox) return;

    const { photos, index } = lightbox;
    const nextIndex = (index + 1) % photos.length;
    const prevIndex = (index - 1 + photos.length) % photos.length;

    const preloadImage = (url: string) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    };

    preloadImage(photos[nextIndex].secure_url);
    preloadImage(photos[prevIndex].secure_url);
  }, [lightbox?.index, lightbox?.photos]);

  return (
    <>
      {projects.map((project) => {
        const [hero, ...rest] = project.images;
        return (
          <section key={project.name} className="mb-20">
            {/* Project header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-6 bg-ocre/40" aria-hidden="true" />
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-ocre font-bold">
                  {project.name}
                </h2>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                {project.images.length} photo{project.images.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Editorial grid: hero + masonry */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3">
              {/* Hero image — prend 7 colonnes, hauteur généreuse */}
              {hero && (
                <button
                  onClick={() => setLightbox({ photos: project.images, index: 0 })}
                  className="md:col-span-7 overflow-hidden group relative bg-beige-medium/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocre cursor-pointer"
                  style={{ aspectRatio: hero.width && hero.height ? `${hero.width}/${hero.height}` : "4/3" }}
                  aria-label={`Agrandir la photo 1 — ${project.name}`}
                >
                  <Image
                    src={hero.secure_url}
                    alt={`${project.name} — réalisation Porcher Menuiserie`}
                    fill
                    className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 58vw"
                    priority
                  />
                </button>
              )}

              {/* Remaining images — colonne masonry de 5 */}
              {rest.length > 0 && (
                <div className="md:col-span-5 columns-2 gap-2 md:gap-3">
                  {rest.map((image, i) => (
                    <button
                      key={image.public_id}
                      onClick={() => setLightbox({ photos: project.images, index: i + 1 })}
                      className="break-inside-avoid mb-2 md:mb-3 block w-full overflow-hidden group relative bg-beige-medium/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocre cursor-pointer"
                      aria-label={`Agrandir la photo ${i + 2} — ${project.name}`}
                    >
                      <Image
                        src={image.secure_url}
                        alt={`${project.name} — réalisation Porcher Menuiserie`}
                        width={image.width || 400}
                        height={image.height || 400}
                        className="w-full h-auto object-cover motion-safe:group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 20vw"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.photos[lightbox.index].secure_url}
              alt={`Photo ${lightbox.index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Fermer */}
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Précédent */}
          {lightbox.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                aria-label="Photo précédente"
              >
                <span className="material-symbols-outlined text-4xl">arrow_back</span>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                aria-label="Photo suivante"
              >
                <span className="material-symbols-outlined text-4xl">arrow_forward</span>
              </button>
            </>
          )}

          {/* Compteur */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}
    </>
  );
}
