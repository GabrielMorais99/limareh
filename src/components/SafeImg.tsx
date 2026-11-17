import { useState, type ImgHTMLAttributes } from 'react';
import { imgUrl, optimizedSrcSet, imageMeta } from '../lib/img';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
    /** Nome do arquivo em `public/imgs/`. */
    file: string;
};

/**
 * Imagem responsiva (AVIF/WebP em várias larguras, com o JPEG original como
 * fallback). Não renderiza nada se o arquivo falhar — evita ícone de imagem
 * quebrada.
 */
export function SafeImg({ file, alt, onError, ...rest }: Props) {
    const [hide, setHide] = useState(false);
    if (hide) return null;

    const meta = imageMeta(file);
    return (
        <picture style={{ display: 'contents' }}>
            {meta ? (
                <>
                    <source type="image/avif" srcSet={optimizedSrcSet(file, 'avif')} sizes={rest.sizes} />
                    <source type="image/webp" srcSet={optimizedSrcSet(file, 'webp')} sizes={rest.sizes} />
                </>
            ) : null}
            <img
                src={imgUrl(file)}
                alt={alt}
                width={meta?.width}
                height={meta?.height}
                onError={(e) => {
                    setHide(true);
                    onError?.(e);
                }}
                {...rest}
            />
        </picture>
    );
}
