import {
    useCallback,
    useState,
    type ImgHTMLAttributes,
    type SyntheticEvent,
} from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
};

/**
 * Não renderiza nada se a URL falhar (404, arquivo ausente) — evita ícone de imagem quebrada.
 */
export function SafeImg({ src, alt, onError, ...rest }: Props) {
    const [hide, setHide] = useState(false);
    const handleError = useCallback(
        (e: SyntheticEvent<HTMLImageElement>) => {
            setHide(true);
            onError?.(e);
        },
        [onError],
    );
    if (hide) return null;
    return <img src={src} alt={alt} onError={handleError} {...rest} />;
}
