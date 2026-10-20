import type { Metadata } from "next";
import { Noto_Serif, Manrope, Playfair_Display, Gelasio } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

// Italique de l'accent « Geste » du hero (dessin équivalent à Georgia, identique sur tous les appareils)
const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-gelasio",
  display: "swap",
});

// Police du logo (lettrage très gras, contrasté)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Porcher Menuiserie",
  description:
    "Artisan menuisier spécialisé en agencement intérieur sur mesure, menuiserie, parquet, cloison sèche et faux plafond en Ille-et-Vilaine.",
  url: "https://www.porcher-menuiserie.com",
  telephone: "+33668133245",
  email: "porcher-menuiserie@outlook.fr",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Ille-et-Vilaine",
  },
  knowsAbout: [
    "Menuiserie sur mesure",
    "Agencement intérieur",
    "Parquet",
    "Cloison sèche",
    "Faux plafond",
    "Ébénisterie",
  ],
  foundingDate: "2011",
  priceRange: "€€€",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.porcher-menuiserie.com"),
  title: "Porcher Menuiserie — Menuisier sur mesure en Ille-et-Vilaine",
  description:
    "Artisan menuisier en Ille-et-Vilaine. Agencement intérieur, menuiserie sur mesure, parquet, cloison sèche et faux plafond. 15 ans d'expérience, 150+ réalisations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Porcher Menuiserie — Menuisier sur mesure, Ille-et-Vilaine",
    description:
      "Menuiserie et agencement intérieur sur mesure. 15 ans d'expérience, 150+ réalisations en Ille-et-Vilaine.",
    url: "https://www.porcher-menuiserie.com",
    siteName: "Porcher Menuiserie",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Porcher Menuiserie — Agencement et menuiserie sur mesure, Ille-et-Vilaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porcher Menuiserie — Menuisier sur mesure, Ille-et-Vilaine",
    description:
      "Menuiserie et agencement intérieur sur mesure en Ille-et-Vilaine.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`scroll-smooth ${notoSerif.variable} ${manrope.variable} ${playfair.variable} ${gelasio.variable}`}
      lang="fr"
      suppressHydrationWarning
    >
      <head>
        {/* Applique le thème avant le premier affichage (choix mémorisé, sinon réglage système) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </head>
      <body
        className="bg-surface text-on-surface selection:bg-ocre/20 selection:text-ocre-dark"
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
