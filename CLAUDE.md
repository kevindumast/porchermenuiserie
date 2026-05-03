# Porcher Menuiserie — Documentation

## Checklist pour les nouveaux sites

### ⚖️ Mentions légales et conformité

Pour **tout nouveau site web**, il faut ajouter obligatoirement :

#### 1. Page Mentions Légales (`/mentions-legales`)
- [ ] Identité du propriétaire (nom, prénom, adresse)
- [ ] Statut juridique (SASU, EIRL, Auto-entrepreneur, etc.)
- [ ] SIRET / SIREN
- [ ] Numéro de TVA (si assujetti)
- [ ] Téléphone et email
- [ ] Nom et adresse de l'hébergeur
- [ ] Mention de propriété intellectuelle
- [ ] Limitation de responsabilité

#### 2. Page Politique de Confidentialité (`/politique-confidentialite`)
- [ ] Responsable de traitement
- [ ] Données collectées (selon le site)
- [ ] Base légale du traitement (RGPD)
- [ ] Finalités du traitement
- [ ] Durée de conservation
- [ ] Droits des utilisateurs (accès, rectification, suppression, etc.)
- [ ] Cookies utilisés (ou absence de cookies)
- [ ] Contact pour exercer les droits

#### 3. Footer
- [ ] Ajouter un composant Footer avec liens vers :
  - Mentions légales
  - Politique de confidentialité
  - Contact de l'entreprise

#### 4. Intégration au Layout
- [ ] Importer et intégrer le Footer dans `src/app/layout.tsx`
- [ ] Utiliser une structure `flex flex-col min-h-screen` pour que le footer reste en bas

### 📋 Points importants
- La **politique de confidentialité est obligatoire** même sans e-commerce (RGPD)
- Si pas de Google Analytics → Mentionner "aucun cookie"
- Si pas d'e-commerce → Pas besoin de CGV, conditions de vente, etc.
- Adapter le background du footer au design du site (pas de gris par défaut)

---

## Gabarit pour mentions légales (SASU)

Utiliser comme base pour les futurs sites :
```
Nom/Prénom : [À remplir]
Adresse : [À remplir]
Statut : SASU
SIREN : [À remplir]
SIRET : [À remplir]
TVA : [À remplir - ou "N/A" si franchise]
Téléphone : [À remplir]
Email : [À remplir]
Hébergeur : [Généralement Vercel]
```
