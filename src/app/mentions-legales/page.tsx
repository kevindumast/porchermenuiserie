import Navigation from "../Navigation";

export default function MentionsLegales() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-3xl mx-auto">
          <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Informations légales
          </span>
          <h1 className="text-4xl font-light text-on-surface mb-12">Mentions Légales</h1>

          <div className="space-y-10 text-on-surface-variant font-light">
            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">1. Éditeur du site</h2>
              <p>
                <strong className="text-on-surface font-medium">Entreprise :</strong> Porcher Menuiserie<br />
                <strong className="text-on-surface font-medium">Gérant :</strong> Porcher Aurélien<br />
                <strong className="text-on-surface font-medium">Adresse :</strong> 3 LE PATIS NOEL, 35580 SAINT-SENOUX<br />
                <strong className="text-on-surface font-medium">Téléphone :</strong> <a href="tel:0668133245" className="text-ocre hover:underline">06 68 13 32 45</a><br />
                <strong className="text-on-surface font-medium">Email :</strong> <a href="mailto:porcher-menuiserie@outlook.fr" className="text-ocre hover:underline">porcher-menuiserie@outlook.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">2. Statut juridique</h2>
              <p>
                <strong className="text-on-surface font-medium">Forme juridique :</strong> SASU (Société par Actions Simplifiée Unipersonnelle)<br />
                <strong className="text-on-surface font-medium">SIREN :</strong> 992212761<br />
                <strong className="text-on-surface font-medium">SIRET :</strong> 99221276100017<br />
                <strong className="text-on-surface font-medium">Numéro de TVA intracommunautaire :</strong> FR71992212761
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">3. Hébergeur</h2>
              <p>
                <strong className="text-on-surface font-medium">Nom :</strong> Vercel Inc.<br />
                <strong className="text-on-surface font-medium">Adresse :</strong> 440 N Barranca Ave, Covina, CA 91723, États-Unis<br />
                <strong className="text-on-surface font-medium">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ocre hover:underline">https://vercel.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">4. Propriété intellectuelle</h2>
              <p>
                Tous les éléments de ce site (textes, images, logos, etc.) sont la propriété de Porcher Menuiserie ou utilisés avec autorisation.
                Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">5. Limitation de responsabilité</h2>
              <p>
                Porcher Menuiserie ne peut être tenu responsable des erreurs ou omissions qui pourraient figurer sur ce site.
                Les informations contenues sont fournies à titre informatif. Porcher Menuiserie se réserve le droit de modifier à tout moment
                le contenu de ce site sans préavis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">6. Données personnelles</h2>
              <p>
                Pour toute question relative au traitement de vos données personnelles, veuillez consulter notre
                <a href="/politique-confidentialite" className="text-ocre hover:underline"> politique de confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">7. Contact</h2>
              <p>
                Pour toute question ou réclamation, vous pouvez nous contacter à l&apos;adresse email suivante :<br />
                <a href="mailto:porcher-menuiserie@outlook.fr" className="text-ocre hover:underline">porcher-menuiserie@outlook.fr</a>
              </p>
            </section>

            <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 pt-4 border-t border-ocre/20">
              Dernière mise à jour : mai 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
