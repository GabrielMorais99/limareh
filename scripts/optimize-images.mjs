/**
 * Gera versões otimizadas (AVIF + WebP, em várias larguras) das imagens de
 * `public/imgs/` em `public/imgs/opt/`, além da imagem de compartilhamento
 * (Open Graph) e de `src/generated/images.json` com dimensões e larguras.
 *
 * Roda depois de `ensure-images.mjs`. Arquivos já gerados e mais novos que a
 * origem são reaproveitados, então rodar de novo é rápido.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'public', 'imgs');
const optDir = path.join(srcDir, 'opt');
const genDir = path.join(root, 'src', 'generated');

const TARGET_WIDTHS = [480, 960, 1600];
const FORMATS = {
    avif: (img) => img.avif({ quality: 52, effort: 4 }),
    webp: (img) => img.webp({ quality: 74 }),
};
const OG = { source: 'capa-home-sprays.jpeg', out: 'og-image.jpg', w: 1200, h: 630 };

const isSourceImage = (name) => /\.(jpe?g|png)$/i.test(name);
const baseName = (name) => name.replace(/\.[^.]+$/, '');

function isFresh(out, srcMtime) {
    return fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcMtime;
}

fs.mkdirSync(optDir, { recursive: true });
fs.mkdirSync(genDir, { recursive: true });

const files = fs.existsSync(srcDir)
    ? fs.readdirSync(srcDir).filter(isSourceImage).sort()
    : [];

const meta = {};
let generated = 0;

for (const file of files) {
    const from = path.join(srcDir, file);
    const srcMtime = fs.statSync(from).mtimeMs;
    const { width, height } = await sharp(from).metadata();
    const widths = [...TARGET_WIDTHS.filter((w) => w < width), width];

    for (const w of widths) {
        for (const [ext, encode] of Object.entries(FORMATS)) {
            const out = path.join(optDir, `${baseName(file)}-${w}.${ext}`);
            if (isFresh(out, srcMtime)) continue;
            await encode(sharp(from).resize({ width: w })).toFile(out);
            generated++;
        }
    }
    meta[file] = { width, height, widths };
}

const ogFrom = path.join(srcDir, OG.source);
const ogOut = path.join(optDir, OG.out);
if (fs.existsSync(ogFrom) && !isFresh(ogOut, fs.statSync(ogFrom).mtimeMs)) {
    await sharp(ogFrom)
        .resize(OG.w, OG.h, { fit: 'cover' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(ogOut);
    generated++;
}

fs.writeFileSync(
    path.join(genDir, 'images.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
);
console.log(
    `[optimize-images] ${files.length} imagem(ns), ${generated} arquivo(s) novo(s) → public/imgs/opt`,
);
