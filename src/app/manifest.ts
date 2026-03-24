import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Porcher Menuiserie",
    short_name: "Porcher",
    description:
      "Artisan menuisier spécialisé en agencement intérieur sur mesure en Ille-et-Vilaine.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f4",
    theme_color: "#A48654",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
