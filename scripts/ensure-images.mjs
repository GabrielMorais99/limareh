/**
 * Sincroniza APENAS a pasta do projeto `imgs/` → `public/imgs/`.
 * Nada é puxado de cache do Cursor, assets soltos ou nomes por hash.
 * Se um arquivo não existir em `imgs/`, não entra no site (public fica sem ele).
 * O site lê `manifest.json` para não pedir arquivos inexistentes (evita 404 no console).
 *
 * Nomes esperados em imgs/:
 * - capa.jpg (ou Capa.jpg / .jpeg)
 * - jardim-de-cristal.png, produto-extra-1.png, produto-extra-2.png
 * - galeria-01.jpg, galeria-02.jpg (ou galera-NN com typo, ver findGallerySource)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const destDir = path.join(root, "public", "imgs");
const imgsDir = path.join(root, "imgs");

function copyIfExists(from, to) {
  try {
    if (from && fs.existsSync(from)) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/** Remove só arquivos em public/imgs (mantém a pasta). */
function emptyDestDir() {
  if (!fs.existsSync(destDir)) return;
  for (const name of fs.readdirSync(destDir)) {
    const p = path.join(destDir, name);
    try {
      if (fs.statSync(p).isFile()) fs.unlinkSync(p);
    } catch {
      /* ignore */
    }
  }
}

function findGallerySource(n) {
  const pad = String(n).padStart(2, "0");
  const explicit = [
    `galeria-${pad}.jpg`,
    `galeria-${pad}.jpeg`,
    `Galeria-${pad}.jpg`,
    `Galeria-${pad}.jpeg`,
    `galera-${pad}.jpg`,
    `galera-${pad}.jpeg`,
    `Galera-${pad}.jpg`,
    `Galera-${pad}.jpeg`,
    `galeria-${pad}.png`,
    `galera-${pad}.png`,
  ];
  for (const name of explicit) {
    const p = path.join(imgsDir, name);
    if (fs.existsSync(p) && fs.statSync(p).size > 0) return p;
  }
  if (!fs.existsSync(imgsDir)) return null;
  const re = new RegExp(`^(galeria|galera)-${pad}\\.(jpe?g|png)$`, "i");
  for (const f of fs.readdirSync(imgsDir)) {
    if (!re.test(f)) continue;
    const p = path.join(imgsDir, f);
    if (fs.statSync(p).size > 0) return p;
  }
  return null;
}

function findCapaSource() {
  const names = [
    "capa.jpg",
    "Capa.jpg",
    "capa.jpeg",
    "Capa.jpeg",
  ];
  for (const name of names) {
    const p = path.join(imgsDir, name);
    if (fs.existsSync(p) && fs.statSync(p).size > 0) return p;
  }
  return null;
}

const TRACKED_FILES = [
  "capa.jpg",
  "jardim-de-cristal.png",
  "produto-extra-1.png",
  "produto-extra-2.png",
  "galeria-01.jpg",
  "galeria-02.jpg",
];

function writeManifest() {
  const manifest = {};
  for (const name of TRACKED_FILES) {
    const p = path.join(destDir, name);
    manifest[name] = fs.existsSync(p) && fs.statSync(p).size > 0;
  }
  fs.writeFileSync(
    path.join(destDir, "manifest.json"),
    `${JSON.stringify(manifest)}\n`
  );
  console.log("[ensure-images] manifest.json (evita 404 no browser)");
}

fs.mkdirSync(destDir, { recursive: true });
emptyDestDir();

if (!fs.existsSync(imgsDir)) {
  console.warn("[ensure-images] pasta imgs/ não existe — public/imgs ficou vazio.");
  writeManifest();
  console.log("[ensure-images] →", destDir);
  process.exit(0);
}

/** Hero → capa.jpg */
const capaFrom = findCapaSource();
if (capaFrom) {
  const to = path.join(destDir, "capa.jpg");
  if (copyIfExists(capaFrom, to)) {
    console.log(`[ensure-images] capa.jpg ← ${path.relative(root, capaFrom)}`);
  }
}

/** Produto (nomes fixos, só se estiverem em imgs/) */
for (const name of [
  "jardim-de-cristal.png",
  "produto-extra-1.png",
  "produto-extra-2.png",
]) {
  const from = path.join(imgsDir, name);
  if (fs.existsSync(from) && fs.statSync(from).size > 0) {
    const to = path.join(destDir, name);
    if (copyIfExists(from, to)) {
      console.log(`[ensure-images] ${name} ← imgs/${name}`);
    }
  }
}

/** Galeria → galeria-NN.jpg */
for (let n = 1; n <= 2; n++) {
  const pad = String(n).padStart(2, "0");
  const dest = path.join(destDir, `galeria-${pad}.jpg`);
  const from = findGallerySource(n);
  if (from) {
    if (copyIfExists(from, dest)) {
      console.log(
        `[ensure-images] galeria-${pad}.jpg ← ${path.relative(root, from)}`
      );
    }
  }
}

writeManifest();
console.log("[ensure-images] →", destDir, "(somente arquivos presentes em imgs/)");
