# Checklist de mise en production (MEP)

Checklist réutilisable pour mettre en ligne un site vitrine : Next.js (App Router) sur Vercel, domaine chez OVH, formulaire de contact par email. Elle reprend tout ce qu'il a fallu faire pour Porcher Menuiserie, y compris les oublis découverts après la mise en ligne.

**Pour un nouveau site** : copier ce fichier à la racine du projet, supprimer la dernière section (« Porcher Menuiserie — reste à faire ») et cocher au fur et à mesure. Les chemins cités (`src/app/…`, `communication/outils/…`) renvoient à ce dépôt, comme exemples.

---

## 1. Avant de commencer : à demander au client

- [ ] **Identité légale** : raison sociale, forme juridique, capital social (société), adresse du siège, SIREN/SIRET, numéro d'immatriculation (RCS ou RNE), TVA intracommunautaire (ou franchise), nom du directeur de la publication
- [ ] **Médiateur de la consommation** — obligatoire si l'entreprise travaille pour des particuliers : nom et site du médiateur auquel elle adhère
- [ ] **Assurance professionnelle** (décennale dans le bâtiment) : assureur et zone couverte — recommandé sur le site
- [ ] **Contact** : téléphone, et email qui recevra les demandes du formulaire
- [ ] **Nom de domaine** souhaité, disponibilité vérifiée chez OVH
- [ ] **Comptes au nom du client** : le domaine (compte OVH du client), et si possible les services (Resend, Supabase). Noter qui a les accès
- [ ] **Identité visuelle** : logo vectoriel (SVG), couleurs, polices
- [ ] **Contenus réels** : photos de réalisations (avec le droit de les publier), textes des services, avis clients avec leur accord
- [ ] **Réseaux** : comptes existants (Instagram…) et leurs adresses exactes

## 2. Contenu

- [ ] Plus aucune image de démonstration ou générée : chercher les domaines provisoires dans le code **et** dans `images.remotePatterns` de `next.config.ts`
- [ ] Services décrits en phrases (indexables), pas seulement en mots-clés
- [ ] Avis clients réels uniquement, avec l'accord des personnes
- [ ] Textes alternatifs descriptifs sur toutes les images, y compris les vues agrandies d'une galerie (« {projet} — photo 3 sur 8 », pas « Photo 3 »)
- [ ] Chiffres et promesses vérifiables : années d'expérience, nombre de réalisations, « devis gratuit »…

## 3. SEO technique (dans le code)

- [ ] `metadataBase` sur l'URL définitive, avec ou sans `www` comme le domaine principal choisi à l'étape 6
- [ ] `title` et `description` avec le métier et la zone (« Menuisier sur mesure en Ille-et-Vilaine »)
- [ ] URL canonique sur chaque page
- [ ] Open Graph et Twitter Card complets
- [ ] **Image de partage `public/og-image.jpg` (1200 × 630) présente** — sur Porcher Menuiserie, elle était déclarée mais absente : les liens partagés s'affichaient sans image. Gabarit : `communication/outils/image-partage.html`
- [ ] Données structurées JSON-LD (`LocalBusiness` ou un sous-type comme `HomeAndConstructionBusiness`) avec nom, adresse et téléphone **identiques** au reste du site
- [ ] `robots.txt` et `src/app/sitemap.ts`
- [ ] `lang="fr"`, un seul `h1` par page
- [ ] Polices chargées avec `next/font`
- [ ] Icônes et manifeste : `icon.tsx`, `apple-icon.tsx`, `manifest.ts`
- [ ] Page 404 personnalisée en français (`src/app/not-found.tsx`) — sinon Next.js affiche sa page par défaut, en anglais
- [ ] Pages alimentées par une base ou un stockage en ISR (`revalidate`), pas rendues à chaque requête

## 4. Légal et RGPD (obligatoire en France)

Base : la section « Mentions légales et conformité » de `CLAUDE.md`.

- [ ] **Mentions légales** (`/mentions-legales`) : identité complète (étape 1), directeur de la publication, contact, médiateur de la consommation, hébergeur (nom, adresse, téléphone), propriété intellectuelle
- [ ] **Politique de confidentialité** (`/politique-confidentialite`) : responsable, données du formulaire, base légale, finalités, durée de conservation, droits et contact
- [ ] **Inventaire de tout ce qui est stocké sur l'appareil du visiteur**, cookies **et** stockage local. Exemple : le choix du thème clair/sombre est en `localStorage`. Il ne demande pas de consentement, mais la politique doit le dire (elle affirmait « aucune donnée stockée »). Sans mesure d'audience, pas de bandeau ; avec, bandeau de consentement obligatoire
- [ ] **Footer** : liens légaux et contact ; pas de lien `#` vers un réseau qui n'existe pas encore
- [ ] Pas de CGV sans vente en ligne

## 5. Accessibilité et qualité

- [ ] Contraste AA : 4,5:1 pour le texte courant, 3:1 pour le grand texte. Attention aux textes en opacité réduite : un copyright à 60 % d'opacité tombait à 2,9:1
- [ ] Focus clavier visible, avec le même retour qu'au survol
- [ ] Liens-icônes et liens qui ouvrent un nouvel onglet : `aria-label` qui commence par le texte visible
- [ ] Animations coupées avec le réglage « réduire les animations » (`prefers-reduced-motion`)
- [ ] Aucun défilement horizontal de 320 px à 1440 px
- [ ] Thème sombre (s'il existe) vérifié sur toutes les pages
- [ ] `npx tsc --noEmit` et `npm run build` sans erreur

## 6. Hébergement, domaine et services

- [ ] **Vercel** : importer le dépôt GitHub ; `main` part en production, chaque PR a son aperçu
- [ ] **Plan Vercel** : le plan gratuit (Hobby) est réservé à un usage personnel non commercial ; le site d'une entreprise relève en principe du plan Pro
- [ ] **Variables d'environnement** dans Vercel, pour la production et les aperçus. Ici : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, `EMAIL_TO`
- [ ] **Domaine OVH relié à Vercel** :
  - ajouter le domaine nu et `www` dans Vercel (Settings → Domains) ;
  - dans la zone DNS OVH, créer exactement les enregistrements affichés par Vercel (A pour le domaine nu, CNAME pour `www`) ;
  - **supprimer les enregistrements A, AAAA et CNAME créés par défaut par OVH** (page de parking), qui entrent en conflit ;
  - choisir le domaine principal (ici `www`) et rediriger l'autre dessus, dans Vercel.
- [ ] **HTTPS** : certificat émis automatiquement par Vercel ; vérifier que `http://` redirige vers `https://`
- [ ] **Email du formulaire (Resend)** : vérifier le domaine dans Resend (enregistrements SPF et DKIM à ajouter chez OVH) et envoyer depuis une adresse du domaine (`contact@…`). L'expéditeur de test `onboarding@resend.dev` ne délivre qu'à l'adresse du compte Resend, et finit plus souvent en spam
- [ ] **Réponse directe** : `replyTo` = email du visiteur, pour que « Répondre » lui écrive
- [ ] **Supabase gratuit** : un projet sans activité pendant 7 jours est mis en pause. Prévoir une tâche planifiée qui l'interroge chaque jour (`vercel.json` + `src/app/api/cron/keep-alive`)

## 7. Tests en production

- [ ] Formulaire de bout en bout : réception, dossier spam, bouton « Répondre »
- [ ] Mobile (iPhone Safari, Android Chrome) et navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/), mobile et ordinateur : LCP < 2,5 s, INP < 200 ms, CLS < 0,1
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) sur les données structurées
- [ ] Une URL inexistante renvoie la page 404, avec le code 404
- [ ] `/sitemap.xml` et `/robots.txt` en ligne, avec les bonnes URL
- [ ] Aperçu de partage : [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) et [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). Ils forcent aussi la mise à jour de l'aperçu gardé en cache
- [ ] Ouvrir le site depuis un réseau d'entreprise : un domaine récent peut y être bloqué comme « non catégorisé » (c'était le cas de Porcher Menuiserie derrière Cisco Umbrella). Demander une catégorisation sur le [Reputation Center de Cisco Talos](https://talosintelligence.com/reputation_center)

## 8. Référencement, les jours suivants

- [ ] [Google Search Console](https://search.google.com/search-console) : valider la propriété par un enregistrement TXT chez OVH, soumettre le sitemap
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) : import direct depuis Search Console
- [ ] **Google Business Profile** : créer ou réclamer la fiche (Google Maps, recherches « près de moi ») avec photos, horaires, services et lien du site. C'est le levier local le plus puissant
- [ ] Demander des **avis Google** aux clients satisfaits
- [ ] Annuaires, avec nom, adresse et téléphone identiques au site : Pages Jaunes, Houzz, annuaires locaux

## 9. Communication

Gabarits dans `communication/outils/` (voir `communication/README.md`).

- [ ] Photo de profil des réseaux : le logo calé pour le rond (`photo-profil.html`)
- [ ] Bio des réseaux avec le lien du site
- [ ] Post de lancement : Reel animé du logo et sa légende (`reel-lancement.html`)
- [ ] Lien du site dans la signature email du client
- [ ] Email professionnel sur le domaine (optionnel), chez OVH ou Zoho Mail
- [ ] Ajouter le projet à son portfolio ou à LinkedIn

---

## Porcher Menuiserie — reste à faire

Site en production sur https://www.porcher-menuiserie.com (domaine OVH, hébergement Vercel). Points encore ouverts au 18/10/2026 :

- [ ] Mettre en ligne `public/og-image.jpg`, puis vérifier l'aperçu (Post Inspector, Sharing Debugger)
- [ ] Mentions légales : ajouter directeur de la publication, capital social, numéro d'immatriculation, médiateur de la consommation, téléphone de l'hébergeur
- [ ] Resend : vérifier `porcher-menuiserie.com`, envoyer depuis une adresse du domaine, ajouter `replyTo`
- [ ] Page 404 en français (`src/app/not-found.tsx`)
- [ ] Retirer `lh3.googleusercontent.com` de `next.config.ts` (reste des images de démo)
- [ ] Vérifier le plan Vercel (Hobby = usage non commercial)
- [ ] Demander la catégorisation du domaine à Cisco Talos
- [ ] Google Search Console, Bing Webmaster Tools, Google Business Profile
- [ ] Avis Google, Pages Jaunes, Houzz, annuaires
- [ ] Email professionnel et Pinterest (optionnels)
