import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GallerySection } from './components/GallerySection';
import { InstagramIcon } from './components/InstagramIcon';
import { useImgsManifest, useImgSlot } from './context/ImgsManifestContext';
import { INSTAGRAM_URL } from './lib/links';

/**
 * Imagens em public/imgs (servidas em /imgs/...).
 * capa.jpg = hero (opcional capa-2x.jpg em imgs/ para Retina via srcset);
 * produto = *.png; galeria = galeria-01.jpg + galeria-02.jpg
 */
function imgUrl(file: string): string {
    const b = import.meta.env.BASE_URL || '/';
    const normalized = b.endsWith('/') ? b : `${b}/`;
    return `${normalized}imgs/${encodeURIComponent(file)}`;
}

const imgHero = imgUrl('capa.jpg');
const imgProduto = imgUrl('jardim-de-cristal.png');
const imgProdutoDetalhe1 = imgUrl('produto-extra-1.png');
const imgProdutoDetalhe2 = imgUrl('produto-extra-2.png');

const NAV_SECTIONS = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'produto', label: 'Produto' },
    { id: 'galeria', label: 'Galeria' },
] as const;

type NavSectionId = (typeof NAV_SECTIONS)[number]['id'];

function computeActiveNavSection(navBottomViewport: number): NavSectionId | null {
    /*
     * Referência em coordenadas da viewport (base do nav fixo).
     * scroll-mt nas secções faz o topo em documento ficar "atrás" da linha do nav;
     * comparar só com offsetTop quebrava Sobre e saltava Galeria sem #galeria no DOM.
     */
    const bufferPx = 80;
    let active: NavSectionId | null = null;
    for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= navBottomViewport + bufferPx) {
            active = id;
        }
    }
    return active;
}

export default function App() {
    const [navOpen, setNavOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<NavSectionId | null>(null);
    const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLElement>(null);
    const navLinksRowRef = useRef<HTMLDivElement>(null);
    const navLinkRefs = useRef<
        Partial<Record<NavSectionId, HTMLAnchorElement>>
    >({});
    const { status: imgsStatus, manifest: imgsManifest } = useImgsManifest();
    const capa = useImgSlot('capa.jpg');
    const heroSrcSet =
        imgsStatus === 'ok' && imgsManifest['capa-2x.jpg'] === true
            ? `${imgHero} 1x, ${imgUrl('capa-2x.jpg')} 2x`
            : undefined;
    const imgProdutoMain = useImgSlot('jardim-de-cristal.png');
    const imgExtra1 = useImgSlot('produto-extra-1.png');
    const imgExtra2 = useImgSlot('produto-extra-2.png');

    useEffect(() => {
        if (navOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [navOpen]);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const onWide = () => setNavOpen(false);
        mq.addEventListener('change', onWide);
        return () => mq.removeEventListener('change', onWide);
    }, []);

    useEffect(() => {
        const updateActiveFromScroll = () => {
            const navEl = navRef.current;
            if (!navEl) return;
            const navBottom = navEl.getBoundingClientRect().bottom;
            setActiveNav(computeActiveNavSection(navBottom));
        };
        updateActiveFromScroll();
        const syncAfterPaint = window.setTimeout(updateActiveFromScroll, 0);
        window.addEventListener('scroll', updateActiveFromScroll, {
            passive: true,
        });
        window.addEventListener('resize', updateActiveFromScroll);
        window.addEventListener('hashchange', updateActiveFromScroll);
        window.addEventListener('scrollend', updateActiveFromScroll);
        return () => {
            clearTimeout(syncAfterPaint);
            window.removeEventListener('scroll', updateActiveFromScroll);
            window.removeEventListener('resize', updateActiveFromScroll);
            window.removeEventListener('hashchange', updateActiveFromScroll);
            window.removeEventListener('scrollend', updateActiveFromScroll);
        };
    }, []);

    useLayoutEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const updateIndicator = () => {
            if (!mq.matches || !activeNav) {
                setNavIndicator({ left: 0, width: 0 });
                return;
            }
            const row = navLinksRowRef.current;
            const link = navLinkRefs.current[activeNav];
            if (!row || !link) {
                setNavIndicator({ left: 0, width: 0 });
                return;
            }
            const rowRect = row.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            if (linkRect.width < 1) {
                setNavIndicator({ left: 0, width: 0 });
                return;
            }
            setNavIndicator({
                left: linkRect.left - rowRect.left,
                width: linkRect.width,
            });
        };
        updateIndicator();
        mq.addEventListener('change', updateIndicator);
        window.addEventListener('resize', updateIndicator);
        return () => {
            mq.removeEventListener('change', updateIndicator);
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeNav, navOpen]);

    const closeNav = () => setNavOpen(false);

    return (
        <div className="selection:bg-primary-container selection:text-on-primary-container">
            <nav
                ref={navRef}
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
                            onClick={closeNav}
                        >
                            LIMARÉH
                        </a>
                        <div
                            ref={navLinksRowRef}
                            className="relative hidden items-center gap-8 md:flex"
                        >
                            {NAV_SECTIONS.map(({ id, label }) => {
                                const isActive = activeNav === id;
                                return (
                                    <a
                                        key={id}
                                        ref={(el) => {
                                            if (el) {
                                                navLinkRefs.current[id] = el;
                                            } else {
                                                delete navLinkRefs.current[id];
                                            }
                                        }}
                                        className={`relative pb-1 font-headline text-lg tracking-wide transition-colors duration-300 ${
                                            isActive
                                                ? 'font-medium text-stone-900 dark:text-white'
                                                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
                                        }`}
                                        href={`#${id}`}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute bottom-0 h-px bg-stone-900 transition-[left,width] duration-300 ease-out dark:bg-stone-200"
                                style={{
                                    width: navIndicator.width,
                                    left: navIndicator.left,
                                    opacity: navIndicator.width > 0 ? 1 : 0,
                                }}
                            />
                        </div>
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
                        <button
                            type="button"
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-stone-800 transition-colors hover:bg-stone-200/70 active:bg-stone-300/80 md:hidden dark:text-stone-100 dark:hover:bg-stone-800/80"
                            aria-expanded={navOpen}
                            aria-controls="menu-mobile"
                            aria-label={navOpen ? 'Fechar menu' : 'Abrir menu'}
                            onClick={() => setNavOpen((o) => !o)}
                        >
                            <span className="material-symbols-outlined text-[26px]">
                                {navOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
                {navOpen ? (
                    <div
                        className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-stone-200/80 bg-stone-50/98 backdrop-blur-xl md:hidden dark:border-stone-700/80 dark:bg-stone-900/98"
                        id="menu-mobile"
                    >
                        <div className="mx-auto flex max-w-screen-2xl flex-col px-2 py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            {NAV_SECTIONS.map(({ id, label }) => {
                                const isActive = activeNav === id;
                                return (
                                    <a
                                        key={id}
                                        className={`font-headline min-h-[48px] rounded-lg px-4 py-3 text-lg tracking-wide active:bg-stone-200/80 dark:active:bg-stone-800/80 ${
                                            isActive
                                                ? 'font-medium text-stone-900 dark:text-white'
                                                : 'text-stone-600 dark:text-stone-300'
                                        }`}
                                        href={`#${id}`}
                                        onClick={closeNav}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </nav>

            <main id="top">
                <section className="relative isolate flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:px-6 md:px-8 md:pb-16 md:pt-[calc(5rem+env(safe-area-inset-top,0px))]">
                    <div className="absolute inset-0 z-0 bg-[#e8e4e0]">
                        {capa.shouldRender ? (
                            <img
                                alt="Limaréh — ambiente natural e sofisticado"
                                className="h-full w-full min-h-full min-w-full object-cover object-center [image-rendering:auto] [transform:translateZ(0)] [backface-visibility:hidden]"
                                decoding="async"
                                fetchPriority="high"
                                sizes="100vw"
                                src={imgHero}
                                srcSet={heroSrcSet}
                                onError={capa.onImgError}
                            />
                        ) : null}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
                    </div>
                    <div className="hero-copy relative z-10 w-full max-w-4xl px-4 text-center">
                        <h1 className="font-headline mb-6 text-[clamp(2.75rem,12vw,6rem)] leading-tight tracking-tight text-on-surface md:mb-8 md:text-8xl">
                            Limaréh
                        </h1>
                        <p className="mx-auto max-w-2xl px-1 font-body text-lg font-light italic leading-snug text-on-surface-variant sm:text-xl md:text-2xl">
                            Eleve seu refúgio com fragrâncias de ambiente
                            assinadas Limaréh.
                        </p>
                    </div>
                    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce opacity-40">
                        <span className="material-symbols-outlined">
                            expand_more
                        </span>
                    </div>
                </section>

                <section
                    id="sobre"
                    className="scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-background px-4 py-16 sm:px-6 md:px-8 md:py-24"
                >
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="font-headline text-2xl text-on-surface md:text-3xl">
                            Sobre a Limaréh
                        </h2>
                        <p className="mt-6 font-body text-lg font-light leading-relaxed text-on-surface-variant">
                            A Limaréh nasce do desejo de traduzir bem-estar e
                            sofisticação em fragrâncias de ambiente. Cada
                            criação é pensada como uma assinatura olfativa —
                            minimalista, sensorial e acolhedora.
                        </p>
                    </div>
                </section>

                <section
                    id="produto"
                    className="scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-[#f5f2ed] px-4 py-16 sm:px-6 md:px-8 md:py-32"
                >
                    <div className="mx-auto max-w-screen-xl">
                        <div
                            className={`grid grid-cols-1 items-center gap-14 md:gap-20 ${imgProdutoMain.shouldRender ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
                        >
                            {imgProdutoMain.shouldRender ? (
                                <div className="order-2 flex justify-center md:order-1">
                                    <div className="group relative w-full max-w-[min(100%,28rem)] rounded-xl bg-[#f5f0ea] p-6 shadow-sm ring-1 ring-stone-200/80">
                                        <div className="absolute -inset-4 rounded-full bg-white/50 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                                        <img
                                            alt="Limaréh Jardim de Cristal — Home Spray"
                                            className="relative mx-auto h-auto max-h-[min(85vh,720px)] w-full object-contain object-center [image-rendering:auto]"
                                            decoding="async"
                                            fetchPriority="high"
                                            sizes="(min-width: 768px) 28rem, 100vw"
                                            src={imgProduto}
                                            onError={imgProdutoMain.onImgError}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <div
                                className={`order-1 space-y-10 text-left md:order-2 md:pl-2 ${!imgProdutoMain.shouldRender ? 'md:mx-auto md:max-w-3xl md:text-center' : ''}`}
                            >
                                <div className="space-y-4">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                                        Linha assinatura
                                    </span>
                                    <h2 className="font-headline text-3xl italic leading-tight text-on-surface sm:text-4xl md:text-5xl">
                                        Jardim de Cristal
                                    </h2>
                                    <p className="font-label text-sm uppercase tracking-[0.25em] text-on-surface-variant">
                                        Home Spray · 200ml
                                    </p>
                                </div>
                                <p className="max-w-xl font-body text-lg font-light leading-[1.75] text-on-surface-variant">
                                    Frasco em vidro cristalino com acabamento
                                    dourado e fórmula com brilho perolado que
                                    dança na luz. O{' '}
                                    <span className="text-on-surface">
                                        Jardim de Cristal
                                    </span>{' '}
                                    traduz delicadeza e frescor em cada
                                    borrifada — presença elegante para ambientes
                                    que pedem quietude com luminosidade.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                                    {[
                                        'Frescor cristalino',
                                        '200ml',
                                        'Home spray',
                                    ].map((tag) => (
                                        <div
                                            key={tag}
                                            className="rounded-sm bg-secondary-container px-6 py-2"
                                        >
                                            <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-secondary-container">
                                                {tag}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-outline-variant/20 py-6 md:py-8">
                                    <div className="flex flex-col gap-6 md:gap-8">
                                        <p className="text-sm italic text-on-surface-variant">
                                            “A delicadeza infinita envolta em um
                                            frescor cristalino.”
                                        </p>
                                        <p className="font-label text-xs uppercase tracking-widest text-outline">
                                            limareh aromas
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {imgExtra1.shouldRender || imgExtra2.shouldRender ? (
                            <div
                                className={`mt-16 grid grid-cols-1 gap-6 md:mt-20 md:gap-8 ${imgExtra1.shouldRender && imgExtra2.shouldRender ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
                            >
                                {imgExtra1.shouldRender ? (
                                    <div className="flex min-h-[280px] overflow-hidden rounded-xl bg-[#f5f0ea] p-4 shadow-sm ring-1 ring-stone-200/80 md:min-h-[320px]">
                                        <img
                                            alt="Limaréh Jardim de Cristal em detalhe — lifestyle"
                                            className="m-auto h-full max-h-[min(70vh,640px)] w-full object-contain object-center"
                                            decoding="async"
                                            loading="lazy"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            src={imgProdutoDetalhe1}
                                            onError={imgExtra1.onImgError}
                                        />
                                    </div>
                                ) : null}
                                {imgExtra2.shouldRender ? (
                                    <div className="flex min-h-[280px] overflow-hidden rounded-xl bg-[#f5f0ea] p-4 shadow-sm ring-1 ring-stone-200/80 md:min-h-[320px]">
                                        <img
                                            alt="Limaréh Jardim de Cristal — borrifação"
                                            className="m-auto h-full max-h-[min(70vh,640px)] w-full object-contain object-center"
                                            decoding="async"
                                            loading="lazy"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            src={imgProdutoDetalhe2}
                                            onError={imgExtra2.onImgError}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </section>

                <section
                    id="valores"
                    className="bg-surface px-4 py-16 sm:px-6 md:px-8 md:py-24"
                >
                    <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-12 md:flex-row md:gap-16">
                        <div className="w-full flex-1 space-y-4 border-l border-outline-variant/30 pl-6 sm:pl-8">
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
                        <div className="w-full flex-1 space-y-4 border-l border-outline-variant/30 pl-6 sm:pl-8">
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
                        <div className="w-full flex-1 space-y-4 border-l border-outline-variant/30 pl-6 sm:pl-8">
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
                </section>

                <GallerySection />

                <section className="bg-surface-container-highest/20 px-4 py-16 text-center sm:px-6 md:px-8 md:py-40">
                    <div className="mx-auto max-w-2xl px-1">
                        <h2 className="font-headline text-3xl leading-tight text-on-surface sm:text-4xl md:text-6xl">
                            Pronto para transformar seu ambiente?
                        </h2>
                    </div>
                </section>
            </main>

            <footer className="mt-12 w-full bg-stone-100 px-4 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-12 dark:bg-stone-950 sm:px-6 md:px-8 md:py-16">
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
