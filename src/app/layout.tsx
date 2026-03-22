import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PORCHER | Menuiserie & Agencement d'Art",
  description:
    "Porcher Menuiserie - L'Art du Geste. Agencement, menuiserie, parquet, cloison sèche et faux plafond. Artisan menuisier d'art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface selection:bg-ocre/20 selection:text-ocre">
        {children}
      </body>
    </html>
  );
}
