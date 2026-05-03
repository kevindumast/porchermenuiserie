import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-surface mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Porcher Menuiserie
            </h3>
            <p className="text-sm text-gray-600">
              Artisan menuisier spécialisé en agencement intérieur sur mesure depuis 2011.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="tel:0668133245"
                  className="hover:text-gray-900 transition-colors"
                >
                  06 68 13 32 45
                </a>
              </li>
              <li>
                <a
                  href="mailto:porcher-menuiserie@outlook.fr"
                  className="hover:text-gray-900 transition-colors"
                >
                  porcher-menuiserie@outlook.fr
                </a>
              </li>
              <li className="text-gray-600">
                3 LE PATIS NOEL, 35580 SAINT-SENOUX
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Porcher Menuiserie. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
