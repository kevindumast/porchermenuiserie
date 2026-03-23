"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Photo = {
  public_id: string;
  secure_url: string;
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

  return (
    <>
      {projects.map((project) => (
        <section key={project.name} className="mb-24">
          <div className="flex items-center gap-6 mb-8">
            <div className="h-px w-8 bg-ocre/30" aria-hidden="true" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-ocre font-bold">
              {project.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {project.images.map((image, i) => (
              <button
                key={image.public_id}
                onClick={() => setLightbox({ photos: project.images, index: i })}
                className="aspect-square overflow-hidden group relative bg-beige-medium/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocre"
                aria-label={`Agrandir la photo ${i + 1} — ${project.name}`}
              >
                <Image
                  src={image.secure_url}
                  alt={`${project.name} — réalisation Porcher Menuiserie`}
                  fill
                  className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
        </section>
      ))}

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
