import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-12 py-6 bg-surface/70 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-ocre flex items-center justify-center">
            <span className="text-ocre font-serif text-xl">P</span>
          </div>
          <div className="hidden md:block text-xl font-serif tracking-tighter text-ocre">
            PORCHER
          </div>
        </div>
        <div className="hidden md:flex gap-12 items-center">
          <a
            className="text-ocre border-b border-ocre/30 pb-1 font-serif font-light tracking-wide hover:border-ocre transition-colors"
            href="#projets"
          >
            Projets
          </a>
          <a
            className="text-on-surface-variant hover:text-ocre transition-colors font-serif font-light tracking-wide"
            href="#services"
          >
            Savoir-faire
          </a>
          <a
            className="text-on-surface-variant hover:text-ocre transition-colors font-serif font-light tracking-wide"
            href="#contact"
          >
            Contact
          </a>
        </div>
        <button className="bg-ocre text-on-primary px-8 py-3 text-[10px] uppercase tracking-widest font-medium hover:opacity-90 transition-all">
          Demander un devis
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="High-end minimalist interior"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRijYKZbPgilz3AiZCdn34K2GIjIkG03yk5AtCC3d2Mgu3gkUhaIGKaC2KnXXiTSz0TveH8M-ejQRiWtvNXMSeGfxH4wwF6RxZ2BHMJav6wZ8a654LGiVlS_yVdIQ7sMzz4S9Q5i-6MUnNwdkgPhWslBxwclOlAnSHHhgjEBhlMMPJKEq1nnrrJzKBpv7IGQfMIOcLyOC9kmxYXQvdoQSPHLC5rp8dMkWiEgWAPn2RqGDgYMzXqq--UC_z32AJvPclq1w4ZjCoz7g"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-beige-light/90 via-beige-light/40 to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            {/* Circular Logo */}
            <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
              <svg
                className="absolute w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    id="circlePath"
                  />
                </defs>
                <text className="fill-ocre text-[11px] font-serif tracking-widest uppercase">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    Porcher Menuiserie
                  </textPath>
                </text>
              </svg>
              <div className="w-16 h-16 flex flex-col items-center justify-center border-t border-ocre/30 pt-1">
                <div className="flex gap-0.5">
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                  <div className="w-px h-4 bg-ocre/40" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-light text-on-surface leading-tight mb-8">
              L&apos;Art du <br />
              <span className="italic font-serif">Geste</span>
            </h1>

            <div className="space-y-1 mb-12">
              <p className="text-xl md:text-2xl font-light text-ocre tracking-widest">
                06 68 13 32 45
              </p>
              <p className="text-sm tracking-widest font-light text-on-surface-variant">
                porcher-menuiserie@outlook.fr
              </p>
            </div>

            <div className="flex items-center gap-8">
              <a
                className="bg-ocre text-on-primary px-10 py-5 text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
                href="#projets"
              >
                Explorer le book
              </a>
              <a
                className="group flex items-center gap-3 text-ocre font-medium tracking-wide"
                href="#services"
              >
                <span className="border-b border-ocre/30 group-hover:border-ocre transition-colors pb-1">
                  Savoir-faire
                </span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Book (Asymmetric Grid) */}
      <section className="py-24 md:py-48 bg-surface" id="projets">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-light mb-6">Le Book</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Portfolio numérique : une extension de notre présence à
                l&apos;atelier, illustrant la rigueur et l&apos;esthétique de
                nos réalisations.
              </p>
            </div>
            <div className="text-ocre text-xs uppercase tracking-widest border-b border-ocre/20 pb-2">
              Archives 2023-2024
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            {/* Main Piece */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="aspect-[4/5] bg-beige-medium/10 overflow-hidden group relative">
                <Image
                  alt="Agencement haut de gamme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9jFFnA0FrG7ewJCisVB5aHJh9crHitakI2-ZPGMz5XtzLP4dkTx3mw0SGeWbj7AdA6XWEqb0Gge__KpzeRA3llAuOdp9ER9iZkdCgBC38VgU1eTgAfBLvZ-Z6Q6mhB7LQ_7HjNDnadBHQVXnjZofDHOBbwuMN8mjAPHM4g0N5NtDnHOeRCQUbycRMtDFWt3N3Wd2hAD1S2i5hyWlYa0IiexdY5TYEkuvZAgLF1IVB45UNV84eJPFayfbjqTQKe9edhFg9X8Xs8Bg"
                  fill
                />
                <div className="absolute bottom-0 left-0 p-10 bg-surface/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ocre mb-2 block">
                    Agencement Résidentiel
                  </span>
                  <h3 className="text-2xl font-serif">Projet Héritage</h3>
                </div>
              </div>
            </div>

            {/* Detail & Text */}
            <div className="md:col-span-5 md:pt-32 flex flex-col gap-16">
              <div className="aspect-square bg-blue-gray/10 overflow-hidden group relative">
                <Image
                  alt="Détail menuiserie"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUrr4mhoNVfqIjSaRquBp2F4g7HC7pWOZtoT_RGyvI-rqRYthoouJc1uvsEerBLxbuLAV27gFV4_Pu6fVsFsxP3ehjpLyUmb9aA0HqdSZCZDasL0MdCJsxdROdtwj5PSyhzmzV8jtQ9OVTUHqJDbhNZft8y3Pxvz3VIJF3TRfiOV-P4VXZDqBWqxJqjLBPVLSgYYn6eRbsebpKX0AWy3veJPl4X0cFuwYrq_kIbQHbeAZKCYn1F8AU51h_eyGU_7O92XgOd9QZ7AE"
                  fill
                />
              </div>
              <div className="pr-12">
                <h3 className="text-3xl font-light mb-6">
                  L&apos;exigence du détail
                </h3>
                <p className="text-on-surface-variant font-light leading-relaxed">
                  De la conception à la pose, chaque millimètre compte pour
                  garantir un résultat pérenne et harmonieux. Un dialogue entre
                  la structure et l&apos;esthétique.
                </p>
              </div>
            </div>

            {/* Services List */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="aspect-square bg-beige-light p-12 flex flex-col justify-center">
                <span className="text-ocre uppercase tracking-[0.4em] text-[10px] mb-8 block font-bold">
                  Nos Métiers
                </span>
                <ul className="space-y-5">
                  {[
                    "Agencement",
                    "Menuiserie",
                    "Parquet",
                    "Cloison Sèche",
                    "Faux Plafond",
                  ].map((metier) => (
                    <li
                      key={metier}
                      className="flex items-center gap-4 text-2xl font-serif text-on-surface group cursor-default"
                    >
                      <span className="w-1.5 h-1.5 bg-ocre rounded-full group-hover:scale-150 transition-transform" />
                      {metier}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wide view */}
            <div className="md:col-span-8 -mt-12 md:-mt-24">
              <div className="aspect-[16/9] md:aspect-[21/9] bg-blue-gray/5 overflow-hidden group relative">
                <Image
                  alt="Large library project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDadGTk_5lm4jwPn23QKz2H5CBRNYd8mP4S1SDMyF-yV30xY31xngw-shybNRRb0Y5mo6--ByVhO4soX1_ZxOMite4Az8T9Ch_ewNHMO4F7LM1Z6Jw5kLsxtGJ2obxBOiqF1-juuYbV5qjWZsO0gGj_1F8jO-6_UOk86mnzubiC4Gi_Ak2BTTMeVZbkrl-5YsH2Bu-SOtaBqPhdbVu_epHhwHgja2jARVqafT5dfuIGc28uFgfovV3nIo5kaAi7v4Q7EOk7zBGbPxM"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-Faire */}
      <section className="py-24 md:py-48 bg-beige-light" id="services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-ocre/10 -z-10" />
              <div className="relative w-full h-[600px]">
                <Image
                  alt="Artisan working"
                  className="object-cover shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj1o8PUXM2RnpdILcc9ebrjI5uomogfnbRG5mimRoWNM_TPgUFnS7W0pKWhgItut9zICckd_X7x1qxDvvyYTBDjQqOrLErsGqgNYLoZYpTvpu0oQnP8GDWE-GYRvJ9W5cf4Bd9X0gvRrDs2MEMIQWrBQDvSOJRtajelWElWvH5WP3RbWAY1n5mEqJO6rXCAYBDHyyedyoPg48279Zb4aSyIzZklDtTkaBqnc9dZmH-Rpg7TrM9CCPuCsPP4d3B0V6_Ogy8-4Uzj5A"
                  fill
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-12 bg-surface max-w-xs border border-beige-medium">
                <span className="text-4xl font-serif text-ocre italic">
                  &ldquo;Le bois a une âme, nous ne faisons que la
                  révéler.&rdquo;
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-12">
              <span className="text-ocre uppercase tracking-[0.4em] text-xs font-bold">
                L&apos;expertise Porcher
              </span>
              <h2 className="text-5xl md:text-6xl font-light leading-tight">
                Tradition &amp; <br />
                Innovation
              </h2>
              <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                Allier les techniques ancestrales de l&apos;ébénisterie
                française aux solutions d&apos;agencement contemporaines. Nous
                créons des environnements où chaque pièce de bois raconte une
                histoire de passion et de précision.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre">
                    Matières
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Chêne Massif", "Noyer", "Laiton"].map((mat) => (
                      <span
                        key={mat}
                        className="border border-ocre/20 text-ocre text-[10px] px-3 py-1 uppercase tracking-wider"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-2xl font-serif mb-4 text-ocre">
                    Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Second Œuvre", "Sur Mesure"].map((exp) => (
                      <span
                        key={exp}
                        className="border border-ocre/20 text-ocre text-[10px] px-3 py-1 uppercase tracking-wider"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-48 bg-surface" id="contact">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Entrer en contact
              </span>
              <h2 className="text-5xl md:text-6xl font-light">
                Donnons vie à vos projets
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
              <div className="md:col-span-4 bg-ocre p-12 text-on-primary">
                <h3 className="text-3xl font-serif italic mb-12">
                  Contact Direct
                </h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined font-thin">
                      call
                    </span>
                    <span className="text-2xl font-light tracking-widest">
                      06 68 13 32 45
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined font-thin">
                      mail
                    </span>
                    <span className="text-sm font-light tracking-wide break-all">
                      porcher-menuiserie@outlook.fr
                    </span>
                  </div>
                </div>
                <div className="mt-16 pt-8 border-t border-white/20">
                  <span className="block text-[10px] uppercase tracking-widest opacity-70 mb-2">
                    Zone d&apos;intervention
                  </span>
                  <p className="font-light text-sm">
                    Secteur local et alentours
                  </p>
                </div>
              </div>

              <form className="md:col-span-8 grid grid-cols-1 gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <input
                    className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
                    placeholder="Votre Nom"
                    type="text"
                  />
                  <input
                    className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <input
                  className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
                  placeholder="Type de projet (Cuisine, Parquet, Cloison...)"
                  type="text"
                />
                <textarea
                  className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40 resize-none"
                  placeholder="Votre message..."
                  rows={4}
                />
                <button
                  className="bg-ocre text-on-primary px-12 py-5 text-xs uppercase tracking-widest font-bold hover:opacity-90 active:scale-95 transition-all w-max"
                  type="submit"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-beige-light py-24 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-ocre flex items-center justify-center">
            <span className="text-ocre font-serif text-sm">P</span>
          </div>
          <div className="text-lg font-serif tracking-tighter text-ocre">
            PORCHER
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 text-on-surface-variant text-[10px] uppercase tracking-[0.2em]">
          <a className="hover:text-ocre transition-colors" href="#">
            Instagram
          </a>
          <a className="hover:text-ocre transition-colors" href="#">
            Pinterest
          </a>
          <a className="hover:text-ocre transition-colors" href="#">
            Mentions Légales
          </a>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
          © 2024 Porcher Menuiserie Agencement.
        </div>
      </footer>
    </>
  );
}
