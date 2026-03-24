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
    'relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-surface-container-low/30 px-4 py-14 sm:px-6 md:px-8 md:py-24';

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
    const { status, manifest } = useImgsManifest();
    const g1 = useImgSlot('galeria-01.jpg');
    const g2 = useImgSlot('galeria-02.jpg');
    const [sectionRef, isInView] = useInView({ threshold: 0.1 });

    const slots = [g1, g2];

    const allFailed = useMemo(() => {
        if (status === 'loading') return false;
        if (status === 'ok') {
            return (
                manifest['galeria-01.jpg'] !== true &&
                manifest['galeria-02.jpg'] !== true
            );
        }
        return !g1.shouldRender && !g2.shouldRender;
    }, [status, manifest, g1.shouldRender, g2.shouldRender]);

    if (status === 'loading') {
        return (
            <section id="galeria" className={sectionClass}>
                <div className="mx-auto max-w-screen-2xl py-16 text-center">
                    <p className="font-label text-sm uppercase tracking-[0.25em] text-outline">
                        Galeria
                    </p>
                    <p className="mt-4 font-body text-sm text-on-surface-variant">
                        Carregando imagens…
                    </p>
                </div>
            </section>
        );
    }

    if (allFailed) {
        return (
            <section id="galeria" className={sectionClass}>
                <div className="mx-auto max-w-screen-2xl py-16 text-center">
                    <p className="font-label text-sm uppercase tracking-[0.25em] text-outline">
                        Galeria
                    </p>
                    <p className="mt-4 font-body text-sm text-on-surface-variant">
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
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
            <div className="relative z-10 mx-auto max-w-screen-2xl">
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
                    {galleryItems.map((item, i) => {
                        const slot = slots[i];
                        if (!slot.shouldRender) return null;
                        return (
                            <div
                                key={item.file}
                                className={`group relative aspect-[3/4] w-full max-h-[min(85vh,640px)] overflow-hidden rounded-xl bg-[#f0ebe7] ring-1 ring-stone-200/60 transition-all duration-1000 transform ${
                                    isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                }`}
                                style={{ transitionDelay: `${200 + i * 200}ms` }}
                            >
                                <img
                                    alt={item.alt}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                    decoding="async"
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    src={imgUrl(item.file)}
                                    onError={slot.onImgError}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-surface-container-highest/20 to-transparent"
            />
        </section>
    );
}
