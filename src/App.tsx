import { useEffect, useRef, useState, ReactNode } from 'react';
import { FragrancesCatalog } from './components/FragrancesCatalog';
import {
    ContraEmbalagemContent,
    RotuloTecnicoContent,
} from './components/ProductPackagingInfo';
import { InstagramIcon } from './components/InstagramIcon';
import { useImgsManifest, useImgSlot } from './context/ImgsManifestContext';
import { INSTAGRAM_URL } from './lib/links';

/**
 * Hook para detectar quando um elemento entra na viewport.
 */
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

interface AnimatedSectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

/**
 * Componente Wrapper para seções animadas.
 */
function AnimatedSection({ children, id, className, delay = 0 }: AnimatedSectionProps) {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    
    return (
        <section
            id={id}
            ref={ref}
            className={`${className} transition-all duration-1000 ease-out transform ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </section>
    );
}

function imgUrl(file: string): string {
    const b = import.meta.env.BASE_URL || '/';
    const normalized = b.endsWith('/') ? b : `${b}/`;
    return `${normalized}imgs/${encodeURIComponent(file)}`;
}

const imgHero = imgUrl('capa.jpg');
const imgHeroFallback = imgUrl('capa-home-sprays.jpeg');
export default function App() {
    const { status: imgsStatus, manifest: imgsManifest } = useImgsManifest();
    const capa = useImgSlot('capa.jpg');
    const capaHomeSprays = useImgSlot('capa-home-sprays.jpeg');
    const heroSrc = capa.shouldRender ? imgHero : imgHeroFallback;
    const heroSrcSet =
        imgsStatus === 'ok' && imgsManifest['capa-2x.jpg'] === true
            ? `${heroSrc} 1x, ${imgUrl('capa-2x.jpg')} 2x`
            : undefined;
    const [heroRef, heroInView] = useInView();

    return (
        <div className="selection:bg-primary-container selection:text-on-primary-container">
            <nav
                className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-stone-50/90 backdrop-blur-xl dark:border-stone-800/60 dark:bg-stone-900/90"
                style={{
                    paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))',
                }}
            >
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8 md:py-6">
                    <div className="flex min-w-0 flex-1 items-center gap-6 md:gap-12">
                        <a
                            className="font-serif text-lg tracking-[0.2em] text-stone-800 dark:text-stone-100 sm:text-xl md:text-2xl"
                            href="#top"
                        >
                            LIMARÉH
                        </a>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-outline-variant/30 px-3 py-2 text-stone-700 transition-colors duration-300 hover:bg-surface-container-low active:bg-stone-200/80 dark:text-stone-300"
                            aria-label="Abrir Instagram da Limaréh"
                        >
                            <InstagramIcon className="h-[22px] w-[22px]" />
                            <span className="hidden font-label text-xs font-semibold uppercase tracking-widest sm:inline">
                                Instagram
                            </span>
                        </a>
                    </div>
                </div>
            </nav>

            <main id="top">
                <section 
                    ref={heroRef}
                    className="relative isolate flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:px-6 md:px-8 md:pb-16 md:pt-[calc(5rem+env(safe-area-inset-top,0px))]"
                >
                    <div className={`absolute inset-0 z-0 bg-[#e8e4e0] transition-opacity duration-1000 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
                        {capa.shouldRender || capaHomeSprays.shouldRender ? (
                            <img
                                alt="Limaréh — ambiente natural e sofisticado"
                                className="h-full w-full min-h-full min-w-full object-cover object-center [image-rendering:auto] [transform:translateZ(0)] [backface-visibility:hidden]"
                                decoding="async"
                                fetchPriority="high"
                                sizes="100vw"
                                src={heroSrc}
                                srcSet={heroSrcSet}
                                onError={capa.onImgError}
                            />
                        ) : null}
                        {/* Topo: funde barra fixa → imagem (curto, não “corta” o hero) */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-stone-50/90 from-0% via-stone-50/25 via-45% to-transparent md:h-28 dark:from-stone-950/90 dark:via-stone-950/30"
                        />
                        {/* Fundo: transição moderada para a secção seguinte */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-background via-background/55 to-transparent md:h-44 dark:from-stone-950 dark:via-stone-950/55"
                        />
                    </div>
                    <div className={`hero-copy relative z-10 w-full max-w-4xl px-4 text-center transition-all duration-1000 delay-300 transform ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="font-headline mb-6 text-[clamp(2.75rem,12vw,6rem)] leading-tight tracking-tight text-on-surface md:mb-8 md:text-8xl">
                            Limaréh
                        </h1>
                        <p className="mx-auto max-w-2xl px-1 font-body text-lg font-light italic leading-snug text-on-surface-variant sm:text-xl md:text-2xl">
                            Eleve seu refúgio com fragrâncias de ambiente
                            assinadas Limaréh.
                        </p>
                    </div>
                    <div className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce transition-opacity duration-1000 delay-700 ${heroInView ? 'opacity-40' : 'opacity-0'}`}>
                        <span className="material-symbols-outlined">
                            expand_more
                        </span>
                    </div>
                </section>

                <AnimatedSection
                    id="contra-embalagem"
                    className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-background px-4 py-16 sm:px-6 md:px-8 md:py-24"
                >
                    <ContraEmbalagemContent />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-t from-surface to-transparent"
                    />
                </AnimatedSection>

                <FragrancesCatalog />

                <AnimatedSection
                    id="informacoes-rotulo"
                    className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-[#f6f0e7] px-4 py-16 sm:px-6 md:px-8 md:py-24"
                >
                    <RotuloTecnicoContent />
                </AnimatedSection>

                <AnimatedSection
                    id="valores"
                    className="relative bg-[#f6f0e7] px-4 py-16 sm:px-6 md:px-8 md:py-24"
                    delay={200}
                >
                    <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-stretch justify-between gap-12 md:flex-row md:items-start md:gap-16">
                        <div className="flex w-full flex-1 flex-col items-center space-y-4 border-l-0 pl-0 text-center md:items-start md:text-left">
                            <span className="material-symbols-outlined mb-2 text-3xl text-primary">
                                eco
                            </span>
                            <h3 className="font-headline text-xl text-on-surface">
                                100% natural
                            </h3>
                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                Extratos botânicos puros de origem responsável,
                                sem propelentes sintéticos agressivos e sem
                                ftalatos nocivos.
                            </p>
                        </div>
                        <div className="flex w-full flex-1 flex-col items-center space-y-4 border-l-0 pl-0 text-center md:items-start md:text-left">
                            <span className="material-symbols-outlined mb-2 text-3xl text-primary">
                                cruelty_free
                            </span>
                            <h3 className="font-headline text-xl text-on-surface">
                                Cruelty-free
                            </h3>
                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                Compromisso com a vida: zero testes em animais
                                em toda a cadeia de formulação.
                            </p>
                        </div>
                        <div className="flex w-full flex-1 flex-col items-center space-y-4 border-l-0 pl-0 text-center md:items-start md:text-left">
                            <span className="material-symbols-outlined mb-2 text-3xl text-primary">
                                schedule
                            </span>
                            <h3 className="font-headline text-xl text-on-surface">
                                Longa duração
                            </h3>
                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                Óleos concentrados para que uma aplicação
                                mantenha o perfil olfativo por horas.
                            </p>
                        </div>
                    </div>
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#f5f1eb] to-transparent md:h-32"
                    />
                </AnimatedSection>

                <AnimatedSection
                    className="relative overflow-hidden bg-[#f6f0e7] px-4 py-16 text-center sm:px-6 md:px-8 md:py-40"
                    id="cta"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[#f6f0e7] to-transparent md:h-40"
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-2xl px-1">
                        <h2 className="font-headline text-3xl leading-tight text-on-surface sm:text-4xl md:text-6xl">
                            Pronto para transformar seu ambiente?
                        </h2>
                    </div>
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#f6f0e7] to-transparent"
                    />
                </AnimatedSection>
            </main>

            <footer className="w-full bg-[#f6f0e7] px-4 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-12 dark:bg-stone-950 sm:px-6 md:px-8 md:py-16">
                <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="font-serif text-xl italic text-stone-800 dark:text-stone-200">
                        Limaréh
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-400">
                            Pinterest (em breve)
                        </span>
                        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-400">
                            Privacidade
                        </span>
                        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-400">
                            Termos
                        </span>
                    </div>
                    <div className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-600 dark:text-stone-400">
                        © {new Date().getFullYear()} LIMARÉH. TODOS OS DIREITOS
                        RESERVADOS.
                    </div>
                </div>
            </footer>
        </div>
    );
}

