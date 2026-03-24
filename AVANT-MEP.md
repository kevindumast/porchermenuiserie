# Checklist Avant Mise En Production — Porcher Menuiserie

## SEO & Technique (fait)

- [x] `robots.txt` créé (`public/robots.txt`)
- [x] `sitemap.xml` auto-généré via `src/app/sitemap.ts`
- [x] `metadataBase` configuré sur `https://porcher-menuiserie.fr`
- [x] Title tag géolocalisé : "Menuisier sur mesure en Ille-et-Vilaine"
- [x] Description meta améliorée (géo + services + social proof)
- [x] Open Graph complet (titre, description, image, locale fr_FR)
- [x] Twitter Card configurée
- [x] Schema JSON-LD `HomeAndConstructionBusiness` dans le layout
- [x] Canonical tags sur `/` et `/archives`
- [x] Métadonnées dédiées pour la page `/archives` (title, description, OG)
- [x] H1 homepage enrichi avec mots-clés SEO (span `sr-only`)
- [x] Polices migrées vers `next/font/google` (Noto Serif + Manrope) — chargement local, meilleur CLS
- [x] ISR sur `/archives` : `revalidate = 3600` (au lieu de `0` = SSR systématique)
- [x] `lang="fr"` sur la balise `<html>`

---

## A faire avant MEP

### Contenu & Images

- [ ] **Remplacer les images de démonstration** — les 4 images `lh3.googleusercontent.com` dans `page.tsx` (hero, bibliothèque, détail assemblage, vue large) sont des images AI temporaires. Les uploader sur Cloudinary et mettre à jour les `src`.
- [ ] **Créer l'image Open Graph** — créer `/public/og-image.jpg` (1200×630px) avec une belle photo de réalisation + le nom "Porcher Menuiserie". Utilisée lors du partage sur les réseaux sociaux et WhatsApp.
- [ ] **Vérifier les alt text** des vraies photos Cloudinary (archives) — s'assurer qu'ils décrivent le contenu réel (ex : "Bibliothèque chêne massif sur mesure Rennes" plutôt qu'un nom de fichier générique).
- [ ] **Enrichir le texte des services** — ajouter 1-2 phrases descriptives pour Agencement, Menuiserie, Parquet, Cloison Sèche, Faux Plafond dans la section `#services`. Actuellement ce ne sont que des mots-clés, pas indexables.
- [ ] **Avis clients réels** — le témoignage "Ophélie & Kévin D." dans `page.tsx` est un placeholder. Le remplacer par un vrai avis avec permission du client.

### Légal & Conformité (obligatoire en France)

- [ ] **Créer la page Mentions Légales** (`/mentions-legales`) — obligatoire légalement. Contenu : nom/prénom ou raison sociale, SIRET, adresse, hébergeur, contact. Faire pointer le lien footer.
- [ ] **Politique de confidentialité / RGPD** — si Google Analytics ou tout cookie tiers est installé, un bandeau de consentement et une page dédiée sont obligatoires.
- [ ] **Vérifier les liens footer** — Instagram et Pinterest pointent vers `#`. Les faire pointer vers les vrais profils ou supprimer les liens jusqu'à l'ouverture des comptes.

### Domaine & Hébergement

- [ ] **Confirmer le nom de domaine** — `porcher-menuiserie.fr` est configuré dans les métadonnées. Vérifier qu'il est bien enregistré et pointé vers le serveur de production.
- [ ] **SSL / HTTPS actif** sur le domaine de production — vérifier que le certificat est valide et que HTTP redirige automatiquement vers HTTPS.
- [ ] **Variables d'environnement sur le serveur de prod** — copier les clés Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) et les clés d'envoi d'email dans les secrets de l'hébergeur (Vercel, Coolify, etc.).

### Email & Formulaire de contact

- [ ] **Tester le formulaire de bout en bout** — remplir le formulaire en production, vérifier que l'email arrive bien sur `porcher-menuiserie@outlook.fr` (vérifier spam).
- [ ] **Envisager un email professionnel** — `contact@porcher-menuiserie.fr` inspire plus confiance aux clients et à Google qu'une adresse Outlook. Possible via le registrar du domaine ou un service comme Zoho Mail (gratuit).

### Tests qualité

- [ ] **Test mobile** (iPhone Safari + Android Chrome) — vérifier l'affichage, les tap targets, le formulaire.
- [ ] **Test multi-navigateurs** — Chrome, Firefox, Safari, Edge.
- [ ] **PageSpeed Insights** (mobile + desktop) — cible LCP < 2.5s, CLS < 0.1. URL : `https://pagespeed.web.dev/`
- [ ] **Vérifier le rendu Open Graph** — coller l'URL dans le [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) après mise en production.
- [ ] **Valider le schema JSON-LD** — [Rich Results Test](https://search.google.com/test/rich-results) avec l'URL de prod.
- [ ] **Tester la page 404** — accéder à une URL inexistante, vérifier que Next.js renvoie bien une page d'erreur.
- [ ] **Vérifier le sitemap** — accéder à `https://porcher-menuiserie.fr/sitemap.xml` et confirmer que les URLs sont correctes.
- [ ] **Vérifier robots.txt** — accéder à `https://porcher-menuiserie.fr/robots.txt`.

### SEO post-lancement (à faire dans les 48h)

- [ ] **Google Search Console** — ajouter le site, vérifier la propriété via DNS ou balise HTML, soumettre le sitemap (`https://porcher-menuiserie.fr/sitemap.xml`).
- [ ] **Google Business Profile (GMB)** — créer ou réclamer la fiche Google Business de Porcher Menuiserie. C'est le levier local SEO le plus puissant : apparition dans Google Maps, panneaux latéraux, recherches "menuisier près de moi". Ajouter photos, horaires, description, services.
- [ ] **Bing Webmaster Tools** — moins prioritaire mais gratuit, soumettre le sitemap.

### Notoriété locale (moyen terme)

- [ ] **Pages Jaunes** — créer une fiche avec NAP cohérent (Nom, Adresse, Téléphone identiques au site).
- [ ] **Houzz** — plateforme de référence pour les artisans du bâtiment et de la déco. Créer un profil avec photos de réalisations.
- [ ] **Artisans.fr / Allovoisins** — annuaires locaux, backlinks gratuits.
- [ ] **Instagram & Pinterest** — ouvrir les comptes et publier les réalisations. Les liens footer sont déjà prêts. Chaque post Instagram peut générer du trafic direct et des backlinks indirects.
- [ ] **Demander des avis Google** aux clients satisfaits — les avis Google sont un signal de classement local majeur.
