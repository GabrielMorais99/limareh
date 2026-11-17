import images from '../generated/images.json';

type ImageMeta = { width: number; height: number; widths: number[] };

const IMAGES = images as Record<string, ImageMeta>;

function base(): string {
    const b = import.meta.env.BASE_URL || '/';
    return b.endsWith('/') ? b : `${b}/`;
}

/** URL de uma imagem em `public/imgs/`, respeitando o `base` do Vite. */
export function imgUrl(file: string): string {
    return `${base()}imgs/${encodeURIComponent(file)}`;
}

/** Dimensões e larguras geradas por `scripts/optimize-images.mjs`. */
export function imageMeta(file: string): ImageMeta | undefined {
    return IMAGES[file];
}

/** `srcset` das versões otimizadas (`public/imgs/opt/`) de uma imagem. */
export function optimizedSrcSet(file: string, ext: 'avif' | 'webp'): string {
    const meta = IMAGES[file];
    if (!meta) return '';
    const name = file.replace(/\.[^.]+$/, '');
    return meta.widths
        .map((w) => `${base()}imgs/opt/${encodeURIComponent(`${name}-${w}.${ext}`)} ${w}w`)
        .join(', ');
}
