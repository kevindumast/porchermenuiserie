// Rend une page HTML animée en vidéo MP4 et en image de couverture, thèmes clair et sombre.
// La page fixe elle-même son format, sa durée et l'instant de la couverture (window.REEL),
// et expose window.ready (polices chargées) et window.seek(t) (animations figées à l'instant t).
//
// Prérequis : Edge ou Chrome (ou CHROME_PATH), ffmpeg dans le PATH,
// Node ≥ 22 — ou Node 21 avec l'option --experimental-websocket.
//
// Usage :
//   node communication/outils/rendu-video.mjs <page.html> <dossier-de-sortie> [--couverture-seule]

import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const THEMES = ["light", "dark"];

const [page, sortie, ...options] = process.argv.slice(2);
if (!page || !sortie) {
  console.error("Usage : node rendu-video.mjs <page.html> <dossier-de-sortie> [--couverture-seule]");
  process.exit(1);
}
if (typeof WebSocket === "undefined") {
  console.error("WebSocket indisponible : utiliser Node ≥ 22, ou lancer node --experimental-websocket");
  process.exit(1);
}
const couvertureSeule = options.includes("--couverture-seule");

const navigateur = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((chemin) => chemin && existsSync(chemin));
if (!navigateur) {
  console.error("Aucun navigateur trouvé : définir CHROME_PATH vers Chrome ou Edge");
  process.exit(1);
}

// Navigateur sans fenêtre ; il annonce son adresse DevTools sur stderr
const profil = mkdtempSync(join(tmpdir(), "pm-rendu-"));
const chrome = spawn(
  navigateur,
  [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profil}`,
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--no-first-run",
    "--mute-audio",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);
const adresse = await new Promise((ok, ko) => {
  let journal = "";
  chrome.stderr.on("data", (d) => {
    journal += d;
    const trouve = journal.match(/ws:\/\/\S+/);
    if (trouve) ok(trouve[0]);
  });
  chrome.on("exit", () => ko(new Error(`Le navigateur s'est arrêté :\n${journal}`)));
});

// Client DevTools minimal : commandes avec réponse, attente d'un événement
const ws = new WebSocket(adresse);
await once(ws, "open");
let dernierId = 0;
const reponses = new Map();
const ecouteurs = [];
ws.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && reponses.has(message.id)) {
    const { ok, ko } = reponses.get(message.id);
    reponses.delete(message.id);
    if (message.error) ko(new Error(message.error.message));
    else ok(message.result);
  } else if (message.method) {
    const i = ecouteurs.findIndex((e) => e.method === message.method);
    if (i >= 0) ecouteurs.splice(i, 1)[0].ok(message.params);
  }
});
const envoyer = (method, params = {}, sessionId) =>
  new Promise((ok, ko) => {
    const id = ++dernierId;
    reponses.set(id, { ok, ko });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
const evenement = (method) => new Promise((ok) => ecouteurs.push({ method, ok }));

const { targetId } = await envoyer("Target.createTarget", { url: "about:blank" });
const { sessionId } = await envoyer("Target.attachToTarget", { targetId, flatten: true });
const cmd = (method, params) => envoyer(method, params, sessionId);
const evaluer = async (expression) => {
  const { result, exceptionDetails } = await cmd("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
  return result.value;
};
const capture = async () => Buffer.from((await cmd("Page.captureScreenshot", { format: "png" })).data, "base64");

await cmd("Page.enable");
mkdirSync(sortie, { recursive: true });

try {
  for (const theme of THEMES) {
    const url = new URL(pathToFileURL(resolve(page)));
    url.search = new URLSearchParams({ theme, rendu: "1" }).toString();
    const charge = evenement("Page.loadEventFired");
    await cmd("Page.navigate", { url: url.href });
    await charge;
    const reel = await evaluer("window.ready.then(() => window.REEL)");
    await cmd("Emulation.setDeviceMetricsOverride", { width: reel.width, height: reel.height, deviceScaleFactor: 1, mobile: false });

    if (!couvertureSeule) {
      const fichier = join(sortie, `reel-${theme}.mp4`);
      // PNG → H.264 en couleurs BT.709 (celles qu'attendent les lecteurs pour de la HD)
      const ffmpeg = spawn(
        "ffmpeg",
        [
          "-v", "error", "-y",
          "-f", "image2pipe", "-framerate", String(reel.fps), "-c:v", "png", "-i", "-",
          "-vf", [
            "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int",
            "format=yuv420p",
            "setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv",
          ].join(","),
          "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high",
          "-movflags", "+faststart",
          fichier,
        ],
        { stdio: ["pipe", "inherit", "inherit"] },
      );
      const total = Math.round(reel.duration * reel.fps);
      for (let i = 0; i < total; i++) {
        await evaluer(`seek(${i / reel.fps})`);
        if (!ffmpeg.stdin.write(await capture())) await once(ffmpeg.stdin, "drain");
        process.stdout.write(`\r${theme} : image ${i + 1}/${total}`);
      }
      ffmpeg.stdin.end();
      const [code] = await once(ffmpeg, "exit");
      if (code !== 0) throw new Error(`ffmpeg a échoué (code ${code})`);
      process.stdout.write(`\r${theme} : ${fichier}\n`);
    }

    // Couverture en dernier : seek(still) fige définitivement le reflet des lattes
    await evaluer(`seek(${reel.cover}, { still: true })`);
    const couverture = join(sortie, `couverture-${theme}.png`);
    writeFileSync(couverture, await capture());
    console.log(`${theme} : ${couverture}`);
  }
} finally {
  ws.close();
  chrome.kill();
  await once(chrome, "exit");
  rmSync(profil, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
