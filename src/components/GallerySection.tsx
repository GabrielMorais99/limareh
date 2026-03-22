import { useCallback, useState } from 'react';

function imgUrl(file: string): string {
    const b = import.meta.env.BASE_URL || '/';
    const normalized = b.endsWith('/') ? b : `${b}/`;
    return `${normalized}imgs/${encodeURIComponent(file)}`;
}

const galleryItems: { file: string; alt: string }[] = [
    {
        file: 'galeria-01.jpg',
        alt: 'Limaréh — Jardim de Cristal em uso',
    },
    {
        file: 'galeria-02.jpg',
        alt: 'Limaréh — Home Spray Jardim de Cristal, 200ml',
    },
];

export function GallerySection() {
    const [failed, setFailed] = useState<Record<string, boolean>>({});
    const markFailed = useCallback((file: string) => {
        setFailed((prev) => ({ ...prev, [file]: true }));
    }, []);

    const allFailed =
        galleryItems.length > 0 &&
        galleryItems.every((item) => failed[item.file] === true);

    if (allFailed) return null;

    return (
        <section
            id="galeria"
            className="bg-surface-container-low/30 px-4 py-14 sm:px-6 md:px-8 md:py-24"
        >
            <div className="mx-auto max-w-screen-2xl">
                <div className="mb-12 text-center md:mb-16">
                    <p className="font-label text-sm uppercase tracking-[0.25em] text-outline">
                        Galeria
                    </p>
                    <h2 className="font-headline mt-3 text-2xl leading-tight text-on-surface sm:text-3xl md:text-4xl">
                        Momentos Limaréh
                    </h2>
                    <p className="mx-auto mt-4 max-w-[42rem] font-body text-on-surface-variant">
                        Ambientes, detalhes e a assinatura olfativa da marca em
                        imagens.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {galleryItems.map((item) =>
                        failed[item.file] ? null : (
                            <div
                                key={item.file}
                                className="group relative aspect-[3/4] w-full max-h-[min(85vh,640px)] overflow-hidden rounded-xl bg-[#f0ebe7] ring-1 ring-stone-200/60"
                            >
                                <img
                                    alt={item.alt}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                    decoding="async"
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    src={imgUrl(item.file)}
                                    onError={() => markFailed(item.file)}
                                />
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
