import Navigation from "../Navigation";

export default function MentionsLegales() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Éditeur du site</h2>
            <p>
              <strong>Entreprise :</strong> Porcher Menuiserie<br />
              <strong>Gérant :</strong> Porcher Aurélien<br />
              <strong>Adresse :</strong> 3 LE PATIS NOEL, 35580 SAINT-SENOUX<br />
              <strong>Téléphone :</strong> <a href="tel:0668133245" className="text-blue-600 hover:underline">06 68 13 32 45</a><br />
              <strong>Email :</strong> <a href="mailto:porcher-menuiserie@outlook.fr" className="text-blue-600 hover:underline">porcher-menuiserie@outlook.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Statut juridique</h2>
            <p>
              <strong>Forme juridique :</strong> SASU (Société par Actions Simplifiée Unipersonnelle)<br />
              <strong>SIREN :</strong> 992212761<br />
              <strong>SIRET :</strong> 99221276100017<br />
              <strong>Numéro de TVA intracommunautaire :</strong> FR71992212761
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Hébergeur</h2>
            <p>
              <strong>Nom :</strong> Vercel Inc.<br />
              <strong>Adresse :</strong> 440 N Barranca Ave, Covina, CA 91723, États-Unis<br />
              <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Propriété intellectuelle</h2>
            <p>
              Tous les éléments de ce site (textes, images, logos, etc.) sont la propriété de Porcher Menuiserie ou utilisés avec autorisation.
              Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation de responsabilité</h2>
            <p>
              Porcher Menuiserie ne peut être tenu responsable des erreurs ou omissions qui pourraient figurer sur ce site.
              Les informations contenues sont fournies à titre informatif. Porcher Menuiserie se réserve le droit de modifier à tout moment
              le contenu de ce site sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Données personnelles</h2>
            <p>
              Pour toute question relative au traitement de vos données personnelles, veuillez consulter notre
              <a href="/politique-confidentialite" className="text-blue-600 hover:underline"> politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
            <p>
              Pour toute question ou réclamation, vous pouvez nous contacter à l'adresse email suivante :<br />
              <a href="mailto:porcher-menuiserie@outlook.fr" className="text-blue-600 hover:underline">porcher-menuiserie@outlook.fr</a>
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
