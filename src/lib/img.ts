/** URL de uma imagem em `public/imgs/`, respeitando o `base` do Vite. */
export function imgUrl(file: string): string {
    const b = import.meta.env.BASE_URL || '/';
    const normalized = b.endsWith('/') ? b : `${b}/`;
    return `${normalized}imgs/${encodeURIComponent(file)}`;
}
