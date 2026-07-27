import { useEffect, useRef, useState, useMemo } from 'react';
import { useImgsManifest, useImgSlot } from '../context/ImgsManifestContext';

function useInView(options: IntersectionObserverInit = {}) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, isInView] as const;
}

function imgUrl(file: string): string {
    const b = import.meta.env.BASE_URL || '/';
    const normalized = b.endsWith('/') ? b : `${b}/`;
    return `${normalized}imgs/${encodeURIComponent(file)}`;
}

const sectionClass =
    'relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-background px-4 py-14 sm:px-6 md:px-8 md:py-24 dark:bg-stone-950';

const galleryItems: {
    file: string;
    alt: string;
    imgClass: string;
    cardClass: string;
    tall?: boolean;
}[] = [
    {
        file: 'banner-brisa-lilas.jpeg',
        alt: 'Limaréh — inspiração lavanda para Brisa Lilás',
        imgClass: 'object-cover object-center',
        cardClass: '',
    },
    {
        file: 'inspiracao-jardim-de-cristal.jpeg',
        alt: 'Limaréh — inspiração floral Jardim de Cristal',
        imgClass: 'object-cover object-center',
        cardClass: '',
    },
    {
        file: 'inspiracao-lavanda.jpeg',
        alt: 'Limaréh — campo de lavanda para Brisa Lilás',
        imgClass: 'object-cover object-center',
        cardClass: '',
        tall: true,
    },
    {
        file: 'inspiracao-citrica.jpeg',
        alt: 'Limaréh — inspiração cítrica para Campo dos Sonhos',
        imgClass: 'object-cover object-center',
        cardClass: '',
        tall: true,
    },
    {
        file: 'inspiracao-luz-da-tarde.jpeg',
        alt: 'Limaréh — inspiração dourada para Luz da Tarde',
        imgClass: 'object-cover object-center',
        cardClass: '',
    },
];

export function GallerySection() {
    const { status, manifest } = useImgsManifest();
    const slots = galleryItems.map((item) => useImgSlot(item.file));
    const [sectionRef, isInView] = useInView({ threshold: 0.05 });

    const allFailed = useMemo(() => {
        if (status === 'loading') return false;
        if (status === 'ok') {
            return galleryItems.every((item) => manifest[item.file] !== true);
        }
        return slots.every((slot) => !slot.shouldRender);
    }, [status, manifest, slots]);

    if (status === 'loading') {
        return (
            <section id="galeria" className={sectionClass}>
                <div className="mx-auto max-w-screen-2xl py-16 text-center">
                    <p className="font-body text-sm text-on-surface-variant">
                        Carregando imagens...
                    </p>
                </div>
            </section>
        );
    }

    if (allFailed) {
        return (
            <section id="galeria" className={sectionClass}>
                <div className="mx-auto max-w-screen-2xl py-16 text-center">
                    <p className="font-body text-sm text-on-surface-variant">
                        Imagens em breve.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            id="galeria"
            ref={sectionRef}
            className={`${sectionClass} transition-all duration-1000 ease-out transform ${
                isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
            }`}
        >
            <div className="relative z-10 mx-auto max-w-screen-2xl">
                <div className="mb-12 text-center md:mb-16">
                    <h2 className="font-headline text-2xl leading-tight text-on-surface sm:text-3xl md:text-4xl">
                        Momentos Limaréh
                    </h2>
                    <p className="mx-auto mt-4 max-w-[42rem] font-body text-on-surface-variant">
                        Detalhes de atmosfera que acompanham as fragrâncias da marca.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {galleryItems.map((item, i) => {
                        const slot = slots[i];
                        if (!slot.shouldRender) return null;
                        return (
                            <div
                                key={item.file}
                                className={`group relative w-full overflow-hidden rounded-lg transition-all duration-1000 transform ${item.cardClass} ${
                                    item.tall ? 'row-span-2' : ''
                                } ${
                                    isInView
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-95'
                                }`}
                                style={{
                                    transitionDelay: `${200 + i * 100}ms`,
                                    aspectRatio: item.tall ? '9/16' : '16/10',
                                }}
                            >
                                <img
                                    alt={item.alt}
                                    className={`absolute inset-0 h-full w-full transition-transform duration-[2000ms] group-hover:scale-105 ${item.imgClass}`}
                                    decoding="async"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    src={imgUrl(item.file)}
                                    onError={slot.onImgError}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
