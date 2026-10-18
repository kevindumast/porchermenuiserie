# Communication

Visuels et textes pour les réseaux sociaux de Porcher Menuiserie. Ce dossier ne fait pas partie du site.

```
communication/
├── instagram/
│   ├── profil/                Photo de profil (logo sur fond ocre)
│   └── 2026-10-lancement/     Reel de lancement : vidéos, couvertures, légende
└── outils/
    ├── photo-profil.html      Gabarit de la photo de profil
    ├── reel-lancement.html    Gabarit du Reel (logo animé + accroche)
    └── rendu-video.mjs        Rendu image par image en MP4 + couverture PNG
```

## Photo de profil

`instagram/profil/photo-profil.png` : le logo du site sur le fond ocre `#C08C46` du compte, en 1080 × 1080. Le texte est crème `#F4E7DD`, le soleil `#FFDABE`, les lattes `#FFECBD`.

Instagram recadre la photo en rond. Le logo est centré sur le soleil, et le nom en arc suit le bord du rond (à 86 % du rayon) : il n'y a rien à recadrer au moment de l'envoi (**Modifier le profil → Modifier la photo**).

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

## Régénérer la photo de profil

Image fixe : une capture d'Edge (ou de Chrome, mêmes options) sans fenêtre suffit, depuis Git Bash à la racine du dépôt.

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu \
  --hide-scrollbars --force-color-profile=srgb --window-size=1080,1080 --virtual-time-budget=8000 \
  --screenshot="$(pwd -W)/communication/instagram/profil/photo-profil.png" \
  "file:///$(pwd -W)/communication/outils/photo-profil.html"
```

Les couleurs se changent en haut de `photo-profil.html` (`--fond`, `--soleil`, `--lattes`, `--texte`).
