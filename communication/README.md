# Communication

Visuels et textes pour les réseaux sociaux de Porcher Menuiserie. Ce dossier ne fait pas partie du site.

```
communication/
├── instagram/
│   └── 2026-10-lancement/     Reel de lancement : vidéos, couvertures, légende
└── outils/
    ├── reel-lancement.html    Gabarit du Reel (logo animé + accroche)
    └── rendu-video.mjs        Rendu image par image en MP4 + couverture PNG
```

Chaque post a son dossier `instagram/AAAA-MM-sujet/`, avec un `legende.md` (texte à copier, étapes de publication).

## Charte

Mêmes couleurs, polices et logo que le site (`src/app/globals.css`, `src/app/HeroLogo.tsx`) :

- **Clair** : fond `#fff8f4`, texte `#221a11`, ocre `#A48654` / `#8B7247`
- **Sombre** : fond `#15110C`, texte `#F2E8DA`, ocre `#C4A26A` / `#D9BC88`
- **Polices** : Playfair Display (logo), Noto Serif + Gelasio italique (accroche), Manrope (texte)

Si le logo change sur le site, reporter la modification dans les gabarits de `outils/`.

## Formats Instagram

| Format | Taille | Zone à garder libre |
|---|---|---|
| Reel / Story | 1080 × 1920 | Bas de l'écran (légende, boutons) : rien d'important sous y = 1500 |
| Aperçu dans la grille | Recadrage 3:4 du Reel | Contenu entre y = 240 et y = 1680 |
| Post photo | 1080 × 1350 (4:5) ou 1080 × 1440 (3:4) | — |

## Régénérer une vidéo

Prérequis : Edge ou Chrome, `ffmpeg` dans le PATH, Node ≥ 22 (sur Node 21, ajouter `--experimental-websocket`).

```bash
node communication/outils/rendu-video.mjs communication/outils/reel-lancement.html communication/instagram/2026-10-lancement
```

Le script produit `reel-light.mp4`, `reel-dark.mp4`, `couverture-light.png` et `couverture-dark.png` (environ 5 minutes). L'option `--couverture-seule` ne rend que les couvertures, en quelques secondes, pour ajuster une mise en page.

Pour un aperçu en direct, ouvrir le gabarit HTML dans un navigateur (`?theme=dark` pour le thème sombre) : l'animation tourne en boucle.

Pour un nouveau Reel animé, dupliquer `reel-lancement.html` et modifier les textes. La durée, le format et l'instant de la couverture se règlent dans `window.REEL`, en bas du fichier.
