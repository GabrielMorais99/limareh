/**
 * Sincroniza a pasta do projeto `imgs/` → `public/imgs/`.
 * Copia todos os arquivos presentes em `imgs/` preservando os nomes originais,
 * gera o `manifest.json` com o estado de cada arquivo e remove de `public/imgs/`
 * arquivos que não existem mais na origem.
 *
 * Isso mantém o site atualizado automaticamente quando novas fotos de produtos,
 * rótulos, inspirações ou banners são adicionadas à pasta `imgs/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const destDir = path.join(root, 'public', 'imgs');
const imgsDir = path.join(root, 'imgs');

const IMAGE_EXTENSIONS = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif',
    '.svg',
    '.avif',
]);

/** Arquivos de rótulo são apenas referência interna e não devem ir ao site. */
function isLabelFile(name) {
    return /^rotulo[-_]/i.test(name);
}

function isImageFile(name) {
    return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function copyFile(from, to) {
    try {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
        return true;
    } catch {
        return false;
    }
}

/** Lista arquivos de imagem em `imgs/`, excluindo rótulos de referência. */
function listSourceImages() {
    if (!fs.existsSync(imgsDir)) return [];
    return fs
        .readdirSync(imgsDir)
        .filter((name) => {
            const p = path.join(imgsDir, name);
            return (
                fs.statSync(p).isFile() &&
                isImageFile(name) &&
                !isLabelFile(name)
            );
        })
        .sort();
}

/** Limpa `public/imgs` removendo arquivos que não estão na origem. */
function syncDestDir(sourceNames) {
    if (!fs.existsSync(destDir)) return;
    const keep = new Set(sourceNames);
    for (const name of fs.readdirSync(destDir)) {
        const p = path.join(destDir, name);
        try {
            if (
                fs.statSync(p).isFile() &&
                isImageFile(name) &&
                !keep.has(name)
            ) {
                fs.unlinkSync(p);
                console.log(`[ensure-images] removido: ${name}`);
            }
        } catch {
            /* ignore */
        }
    }
}

function writeManifest(files) {
    const manifest = {};
    for (const name of files) {
        const p = path.join(destDir, name);
        manifest[name] = fs.existsSync(p) && fs.statSync(p).size > 0;
    }
    fs.writeFileSync(
        path.join(destDir, 'manifest.json'),
        `${JSON.stringify(manifest)}\n`,
    );
    console.log('[ensure-images] manifest.json atualizado');
}

fs.mkdirSync(destDir, { recursive: true });

const sourceFiles = listSourceImages();

if (sourceFiles.length === 0) {
    console.warn('[ensure-images] pasta imgs/ vazia ou inexistente.');
    syncDestDir([]);
    writeManifest([]);
    console.log('[ensure-images] →', destDir);
    process.exit(0);
}

syncDestDir(sourceFiles);

const copied = [];
for (const name of sourceFiles) {
    const from = path.join(imgsDir, name);
    const to = path.join(destDir, name);
    if (copyFile(from, to)) {
        copied.push(name);
        console.log(
            `[ensure-images] ${name} ← ${path.relative(root, from)}`,
        );
    }
}

writeManifest(copied);
console.log(
    '[ensure-images] →',
    destDir,
    `(${copied.length} arquivo(s) sincronizado(s))`,
);
