import { useEffect, useRef, useState } from 'react';
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

interface Fragrance {
    key: string;
    name: string;
    subtitle: string;
    description: string;
    notes: string[];
    productImg: string;
    backgroundImg: string;
    backgroundPosition: string;
    align: 'left' | 'right';
    accent: string;
}

const fragrances: Fragrance[] = [
    {
        key: 'brisa-lilas',
        name: 'Brisa Lilás',
        subtitle: 'Home Spray · 250ml',
        description:
            'Suave como a brisa do entardecer sobre um campo de lavanda. Conforto floral que acalma o espaço e convida à respiração profunda.',
        notes: ['Lavanda', 'Toque amadeirado'],
        productImg: 'produto-brisa-lilas.jpeg',
        backgroundImg: 'inspiracao-lavanda.jpeg',
        backgroundPosition: 'center',
        align: 'left',
        accent: '#d8c8d6',
    },
    {
        key: 'campo-dos-sonhos',
        name: 'Campo dos Sonhos',
        subtitle: 'Home Spray · 250ml',
        description:
            'A leveza de um campo florido ao amanhecer. Notas verdes e florais que evocam liberdade, sonho e a doçura do presente.',
        notes: ['Flores silvestres', 'Verde natural'],
        productImg: 'produto-campo-dos-sonhos.jpeg',
        backgroundImg: 'inspiracao-citrica.jpeg',
        backgroundPosition: 'center',
        align: 'right',
        accent: '#d6d8c8',
    },
    {
        key: 'luz-da-tarde',
        name: 'Luz da Tarde',
        subtitle: 'Home Spray · 250ml',
        description:
            'O calor dourado da tarde em notas cítricas e envolventes. Brilho, leveza e memória de bons momentos em cada borrifada.',
        notes: ['Cítrico luminoso', 'Aconchego'],
        productImg: 'produto-luz-da-tarde.jpeg',
        backgroundImg: 'inspiracao-luz-da-tarde.jpeg',
        backgroundPosition: 'center',
        align: 'left',
        accent: '#d6cfc8',
    },
    {
        key: 'jardim-de-cristal',
        name: 'Jardim de Cristal',
        subtitle: 'Home Spray · 250ml',
        description:
            'A delicadeza infinita envolta em um frescor cristalino. Flores brancas e acordes aquosos que dançam na luz, como orvalho sobre pétalas de vidro.',
        notes: ['Frescor cristalino', 'Flores brancas'],
        productImg: 'produto-jardim-de-cristal.jpeg',
        backgroundImg: 'inspiracao-jardim-de-cristal.jpeg',
        backgroundPosition: 'center',
        align: 'right',
        accent: '#c8d6d5',
    },
];

function FragranceCard({
    fragrance,
    index,
}: {
    fragrance: Fragrance;
    index: number;
}) {
    const [cardRef, isInView] = useInView({ threshold: 0.18 });
    const productSlot = useImgSlot(fragrance.productImg);
    const backgroundSlot = useImgSlot(fragrance.backgroundImg);
    const isTextFirst = fragrance.align === 'left';

    return (
        <article
            ref={cardRef}
            className={`fragrance-section relative min-h-[760px] overflow-hidden bg-[#f5f1eb] transition-all duration-1000 ease-out transform md:min-h-[700px] ${
                isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${160 + index * 90}ms` }}
        >
            <div className="absolute inset-0 opacity-28" style={{ backgroundColor: fragrance.accent }} />
            {backgroundSlot.shouldRender ? (
                <img
                    alt=""
                    aria-hidden="true"
                    className="fragrance-bg absolute inset-0 h-full w-full scale-[1.02] object-cover"
                    decoding="async"
                    loading="lazy"
                    sizes="100vw"
                    src={imgUrl(fragrance.backgroundImg)}
                    style={{ objectPosition: fragrance.backgroundPosition }}
                    onError={backgroundSlot.onImgError}
                />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,244,0.98)_0%,rgba(250,248,244,0.9)_38%,rgba(250,248,244,0.68)_72%,rgba(250,248,244,0.52)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#f7f4ee] via-[#f7f4ee]/72 via-45% to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f7f4ee] via-[#f7f4ee]/76 via-42% to-transparent" />
            <div
                className={`relative mx-auto grid min-h-[760px] w-full max-w-screen-2xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 md:min-h-[700px] md:grid-cols-2 md:px-8 md:py-28 lg:px-14 ${
                    isTextFirst ? '' : 'md:[&>*:first-child]:order-2'
                }`}
            >
                {productSlot.shouldRender ? (
                    <div className="relative flex w-full justify-center">
                        <div className="absolute inset-x-10 top-1/2 h-36 -translate-y-1/2 rounded-full bg-white/55 blur-3xl" />
                        <img
                            alt={`Limaréh ${fragrance.name} — Home Spray`}
                            className="fragrance-product relative h-auto max-h-[min(70vh,560px)] w-full max-w-[21rem] object-contain object-center drop-shadow-[0_28px_48px_rgba(62,54,43,0.22)] sm:max-w-[24rem]"
                            decoding="async"
                            loading="lazy"
                            sizes="(min-width: 768px) 28rem, 78vw"
                            src={imgUrl(fragrance.productImg)}
                            onError={productSlot.onImgError}
                        />
                    </div>
                ) : null}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <div
                        className={`max-w-xl space-y-6 bg-stone-50/86 px-5 py-7 shadow-[0_28px_90px_rgba(45,38,30,0.13)] backdrop-blur-md transition-all duration-1000 ease-out sm:px-8 md:bg-stone-50/80 ${
                            isInView
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-6 scale-[0.98]'
                        }`}
                        style={{ transitionDelay: `${320 + index * 110}ms` }}
                    >
                        <div className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                                Linha assinatura
                            </span>
                            <h3 className="font-headline text-3xl italic leading-tight text-stone-950 sm:text-4xl md:text-5xl">
                                {fragrance.name}
                            </h3>
                            <p className="font-label text-xs uppercase tracking-[0.25em] text-stone-700">
                                {fragrance.subtitle}
                            </p>
                        </div>
                        <p className="font-body text-base font-light leading-[1.75] text-stone-800 sm:text-lg">
                            {fragrance.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                            {fragrance.notes.map((note) => (
                                <div
                                    key={note}
                                    className="bg-stone-100/95 px-5 py-2 shadow-sm"
                                >
                                    <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-stone-800">
                                        {note}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
function CollectionShowcase() {
    const [showcaseRef, isInView] = useInView({ threshold: 0.18 });
    const catalogSlot = useImgSlot('catalogo-home-sprays.jpeg');

    if (!catalogSlot.shouldRender) return null;

    return (
        <section
            ref={showcaseRef}
            className={`relative isolate overflow-hidden bg-[#f5f1eb] transition-all duration-1000 ease-out transform ${
                isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '520ms' }}
            aria-label="Exposição completa dos produtos Limaréh"
        >
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f7f4ee] via-[#f7f4ee]/70 to-transparent" />
            <div className="mx-auto flex min-h-[860px] max-w-screen-2xl flex-col items-center justify-center gap-10 px-4 py-24 text-center sm:px-6 md:px-8 md:py-32 lg:px-14">
                <div className="relative z-10 max-w-2xl space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-outline">
                        Coleção completa
                    </span>
                    <h2 className="font-headline text-3xl italic leading-tight text-stone-950 sm:text-4xl md:text-5xl">
                        As quatro assinaturas Limaréh em exposição
                    </h2>
                    <p className="mx-auto max-w-xl font-body text-base font-light leading-[1.8] text-on-surface-variant">
                        Brisa Lilás, Campo dos Sonhos, Luz da Tarde e Jardim de
                        Cristal reunidos em uma apresentação suave, com brilho
                        perolado e acabamento dourado.
                    </p>
                </div>
                <div className="relative z-10 w-full max-w-[34rem]">
                    <div className="absolute inset-8 rounded-full bg-white/70 blur-3xl" />
                    <img
                        alt="Coleção completa de Home Sprays Limaréh"
                        className="relative h-auto max-h-[min(82vh,780px)] w-full object-cover object-center shadow-[0_30px_90px_rgba(69,58,43,0.2)]"
                        decoding="async"
                        loading="lazy"
                        sizes="(min-width: 768px) 34rem, 92vw"
                        src={imgUrl('catalogo-home-sprays.jpeg')}
                        onError={catalogSlot.onImgError}
                    />
                </div>
            </div>
        </section>
    );
}

export function FragrancesCatalog() {
    const [sectionRef] = useInView({ threshold: 0.05 });
    const { status } = useImgsManifest();

    return (
        <section
            id="fragrancias"
            ref={sectionRef}
            className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-[#f7f4ee]"
        >
            <div className="relative z-10">
                <div className="mx-auto max-w-screen-xl px-4 py-16 text-center sm:px-6 md:px-8 md:py-20">
                    <h2 className="font-headline text-3xl leading-tight text-on-surface sm:text-4xl md:text-5xl">
                        Coleção Home Sprays
                    </h2>
                    <p className="mx-auto mt-4 max-w-[42rem] font-body text-on-surface-variant">
                        Quatro fragrâncias assinadas para transformar cada ambiente
                        em refúgio. Escolha a que ressoa com o seu momento.
                    </p>
                </div>
                {status === 'loading' ? (
                    <div className="py-16 text-center">
                        <p className="font-body text-sm text-on-surface-variant">
                            Carregando fragrâncias...
                        </p>
                    </div>
                ) : (
                    <div>
                        {fragrances.map((fragrance, index) => (
                            <FragranceCard
                                key={fragrance.key}
                                fragrance={fragrance}
                                index={index}
                            />
                        ))}
                        <CollectionShowcase />
                    </div>
                )}
            </div>
        </section>
    );
}
