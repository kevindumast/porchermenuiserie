import Navigation from "../Navigation";

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-3xl mx-auto">
          <span className="text-ocre uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Vos données
          </span>
          <h1 className="text-4xl font-light text-on-surface mb-12">Politique de Confidentialité</h1>

          <div className="space-y-10 text-on-surface-variant font-light">
            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">1. Responsable de traitement</h2>
              <p>
                <strong className="text-on-surface font-medium">Entreprise :</strong> Porcher Menuiserie<br />
                <strong className="text-on-surface font-medium">Gérant :</strong> Porcher Aurélien<br />
                <strong className="text-on-surface font-medium">Email :</strong> <a href="mailto:porcher-menuiserie@outlook.fr" className="text-ocre hover:underline">porcher-menuiserie@outlook.fr</a><br />
                <strong className="text-on-surface font-medium">Téléphone :</strong> <a href="tel:0668133245" className="text-ocre hover:underline">06 68 13 32 45</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">2. Données personnelles collectées</h2>
              <p className="mb-3">
                Ce site ne collecte généralement pas de données personnelles. Cependant, si vous nous contactez via le formulaire ou par email,
                nous pouvons traiter les données suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Toute autre information que vous choisissez de nous communiquer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">3. Base légale du traitement</h2>
              <p>
                Le traitement de vos données personnelles est basé sur :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Votre consentement explicite lorsque vous nous contactez</li>
                <li>L&apos;exécution d&apos;une relation contractuelle (demande de devis, commande)</li>
                <li>Nos intérêts légitimes (répondre à vos demandes, améliorer nos services)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">4. Finalités du traitement</h2>
              <p>
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Répondre à vos demandes de contact ou de devis</li>
                <li>Vous fournir les services demandés</li>
                <li>Vous envoyer des informations commerciales (si vous avez consenti)</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">5. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pendant la durée nécessaire pour atteindre les finalités décrites ci-dessus,
                et au maximum 3 ans après le dernier contact ou la dernière transaction, sauf obligation légale contraire.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">6. Destinataires des données</h2>
              <p>
                Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notre prestataire d&apos;hébergement (Vercel Inc.)</li>
                <li>Nos partenaires commerciaux directs si nécessaire (avec votre consentement)</li>
                <li>Les autorités publiques si légalement requises</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">7. Sécurité des données</h2>
              <p>
                Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles
                contre l&apos;accès non autorisé, la modification ou la suppression.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">8. Vos droits</h2>
              <p className="mb-3">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-on-surface font-medium">Droit d&apos;accès :</strong> Accéder à vos données personnelles</li>
                <li><strong className="text-on-surface font-medium">Droit de rectification :</strong> Corriger les données inexactes</li>
                <li><strong className="text-on-surface font-medium">Droit à l&apos;effacement :</strong> Demander la suppression de vos données</li>
                <li><strong className="text-on-surface font-medium">Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                <li><strong className="text-on-surface font-medium">Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
                <li><strong className="text-on-surface font-medium">Droit d&apos;opposition :</strong> Vous opposer au traitement de vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:porcher-menuiserie@outlook.fr" className="text-ocre hover:underline">porcher-menuiserie@outlook.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">9. Cookies</h2>
              <p>
                Ce site n&apos;utilise aucun cookie. Aucune donnée n&apos;est stockée sur votre appareil par notre site.
                Votre navigateur peut utiliser des cookies techniques pour son propre fonctionnement, mais cela ne relève pas de notre responsabilité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">10. Modifications de cette politique</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Les modifications prendront effet dès leur publication sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-on-surface mb-3">11. Contact</h2>
              <p>
                Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou le traitement
                de vos données personnelles, veuillez nous contacter :
              </p>
              <p className="mt-3">
                <strong className="text-on-surface font-medium">Email :</strong> <a href="mailto:porcher-menuiserie@outlook.fr" className="text-ocre hover:underline">porcher-menuiserie@outlook.fr</a><br />
                <strong className="text-on-surface font-medium">Téléphone :</strong> <a href="tel:0668133245" className="text-ocre hover:underline">06 68 13 32 45</a>
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
