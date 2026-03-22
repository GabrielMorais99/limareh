import { useEffect, useState } from 'react';
import { GallerySection } from './components/GallerySection';
import { SafeImg } from './components/SafeImg';
import { SiteQr } from './components/SiteQr';
import { getWhatsAppUrl } from './lib/links';

/**
 * Imagens em public/imgs (servidas em /imgs/...).
 * capa.jpg = hero; produto = *.png; galeria = galeria-01.jpg + galeria-02.jpg
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

export default function App() {
    const wa = getWhatsAppUrl();
    const [navOpen, setNavOpen] = useState(false);
    const [okProduto, setOkProduto] = useState(true);
    const [okExtra1, setOkExtra1] = useState(true);
    const [okExtra2, setOkExtra2] = useState(true);

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

    const closeNav = () => setNavOpen(false);

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
                            onClick={closeNav}
                        >
                            LIMARÉH
                        </a>
                        <div className="hidden items-center gap-8 md:flex">
                            <a
                                className="font-headline text-lg tracking-wide text-stone-500 transition-colors duration-300 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                                href="#sobre"
                            >
                                Sobre
                            </a>
                            <a
                                className="border-b border-stone-400 pb-1 font-headline text-lg font-medium tracking-wide text-stone-900 dark:border-stone-500 dark:text-white"
                                href="#produto"
                            >
                                Produto
                            </a>
                            <a
                                className="font-headline text-lg tracking-wide text-stone-500 transition-colors duration-300 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                                href="#galeria"
                            >
                                Galeria
                            </a>
                            <a
                                className="font-headline text-lg tracking-wide text-stone-500 transition-colors duration-300 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                                href="#contato"
                            >
                                Contato
                            </a>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                        <a
                            href={wa}
                            target="_blank"
                            rel="noreferrer"
                            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-outline-variant/30 px-3 py-2 text-stone-700 transition-colors duration-300 hover:bg-surface-container-low active:bg-stone-200/80 dark:text-stone-300"
                            aria-label="Abrir WhatsApp"
                        >
                            <span className="material-symbols-outlined text-[22px]">
                                chat
                            </span>
                            <span className="hidden font-label text-xs font-semibold uppercase tracking-widest sm:inline">
                                WhatsApp
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
                            <a
                                className="font-headline min-h-[48px] rounded-lg px-4 py-3 text-lg tracking-wide text-stone-600 active:bg-stone-200/80 dark:text-stone-300 dark:active:bg-stone-800/80"
                                href="#sobre"
                                onClick={closeNav}
                            >
                                Sobre
                            </a>
                            <a
                                className="font-headline min-h-[48px] rounded-lg px-4 py-3 text-lg font-medium tracking-wide text-stone-900 active:bg-stone-200/80 dark:text-white dark:active:bg-stone-800/80"
                                href="#produto"
                                onClick={closeNav}
                            >
                                Produto
                            </a>
                            <a
                                className="font-headline min-h-[48px] rounded-lg px-4 py-3 text-lg tracking-wide text-stone-600 active:bg-stone-200/80 dark:text-stone-300 dark:active:bg-stone-800/80"
                                href="#galeria"
                                onClick={closeNav}
                            >
                                Galeria
                            </a>
                            <a
                                className="font-headline min-h-[48px] rounded-lg px-4 py-3 text-lg tracking-wide text-stone-600 active:bg-stone-200/80 dark:text-stone-300 dark:active:bg-stone-800/80"
                                href="#contato"
                                onClick={closeNav}
                            >
                                Contato
                            </a>
                        </div>
                    </div>
                ) : null}
            </nav>

            <main id="top">
                <section className="relative isolate flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:px-6 md:px-8 md:pb-16 md:pt-[calc(5rem+env(safe-area-inset-top,0px))]">
                    <div className="absolute inset-0 z-0 bg-[#e8e4e0]">
                        <SafeImg
                            alt="Limaréh — ambiente natural e sofisticado"
                            className="h-full w-full object-cover object-center"
                            decoding="async"
                            fetchPriority="high"
                            sizes="100vw"
                            src={imgHero}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
                    </div>
                    <div className="hero-copy relative z-10 w-full max-w-4xl px-4 text-center">
                        <h1 className="font-headline mb-6 text-[clamp(2.75rem,12vw,6rem)] leading-tight tracking-tight text-on-surface md:mb-8 md:text-8xl">
                            Limaréh
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl px-1 font-body text-lg font-light italic leading-snug text-on-surface-variant sm:text-xl md:mb-12 md:text-2xl">
                            Eleve seu refúgio com fragrâncias de ambiente
                            assinadas Limaréh.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                            <a
                                className="inline-flex min-h-[48px] min-w-[min(100%,280px)] items-center justify-center rounded bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-on-primary transition-colors duration-300 hover:bg-primary-dim active:brightness-95 sm:px-10 sm:py-4"
                                href="#produto"
                            >
                                Conheça o produto
                            </a>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce opacity-40">
                        <span className="material-symbols-outlined">
                            expand_more
                        </span>
                    </div>
                </section>

                <section
                    id="sobre"
                    className="bg-background px-4 py-16 sm:px-6 md:px-8 md:py-24"
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
                    className="bg-[#f5f2ed] px-4 py-16 sm:px-6 md:px-8 md:py-32"
                >
                    <div className="mx-auto max-w-screen-xl">
                        <div
                            className={`grid grid-cols-1 items-center gap-14 md:gap-20 ${okProduto ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
                        >
                            {okProduto ? (
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
                                            onError={() => setOkProduto(false)}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <div
                                className={`order-1 space-y-10 text-left md:order-2 md:pl-2 ${!okProduto ? 'md:mx-auto md:max-w-3xl md:text-center' : ''}`}
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
                                <div className="flex flex-wrap gap-3 md:gap-4">
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
                                <div className="border-t border-outline-variant/20 pt-6">
                                    <p className="text-sm italic text-on-surface-variant">
                                        “A delicadeza infinita envolta em um
                                        frescor cristalino.”
                                    </p>
                                    <p className="mt-4 font-label text-xs uppercase tracking-widest text-outline">
                                        @limareh.aromas
                                    </p>
                                </div>
                            </div>
                        </div>

                        {okExtra1 || okExtra2 ? (
                            <div
                                className={`mt-16 grid grid-cols-1 gap-6 md:mt-20 md:gap-8 ${okExtra1 && okExtra2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
                            >
                                {okExtra1 ? (
                                    <div className="flex min-h-[280px] overflow-hidden rounded-xl bg-[#f5f0ea] p-4 shadow-sm ring-1 ring-stone-200/80 md:min-h-[320px]">
                                        <img
                                            alt="Limaréh Jardim de Cristal em detalhe — lifestyle"
                                            className="m-auto h-full max-h-[min(70vh,640px)] w-full object-contain object-center"
                                            decoding="async"
                                            loading="lazy"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            src={imgProdutoDetalhe1}
                                            onError={() => setOkExtra1(false)}
                                        />
                                    </div>
                                ) : null}
                                {okExtra2 ? (
                                    <div className="flex min-h-[280px] overflow-hidden rounded-xl bg-[#f5f0ea] p-4 shadow-sm ring-1 ring-stone-200/80 md:min-h-[320px]">
                                        <img
                                            alt="Limaréh Jardim de Cristal — borrifação"
                                            className="m-auto h-full max-h-[min(70vh,640px)] w-full object-contain object-center"
                                            decoding="async"
                                            loading="lazy"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            src={imgProdutoDetalhe2}
                                            onError={() => setOkExtra2(false)}
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
                        <h2 className="font-headline mb-8 text-3xl leading-tight text-on-surface sm:text-4xl md:mb-12 md:text-6xl">
                            Pronto para transformar seu ambiente?
                        </h2>
                        <a
                            className="inline-flex min-h-[44px] items-center justify-center gap-3 border-b border-primary/20 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary transition-all duration-300 hover:border-primary sm:text-sm sm:tracking-[0.3em]"
                            href="#contato"
                        >
                            Fale com a Limaréh
                            <span className="material-symbols-outlined">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </section>

                <section
                    id="contato"
                    className="bg-surface-container-low px-4 py-16 sm:px-6 md:px-8 md:py-28"
                >
                    <div className="mx-auto grid max-w-screen-lg grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <h2 className="font-headline text-3xl text-on-surface md:text-4xl">
                                Contato
                            </h2>
                            <p className="mt-4 max-w-md font-body text-on-surface-variant">
                                Tire dúvidas sobre o{' '}
                                <strong className="font-medium text-on-surface">
                                    Jardim de Cristal
                                </strong>
                                , disponibilidade ou parcerias. Também geramos o
                                QR Code do site para você compartilhar em
                                cartões ou materiais impressos.
                            </p>
                            <a
                                href={wa}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-8 inline-flex min-h-[48px] w-full max-w-sm items-center justify-center gap-3 rounded bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:brightness-105 sm:w-auto sm:px-8 sm:py-4"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                            <p className="mt-4 text-sm text-on-surface-variant">
                                +55 31 9291-5190
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <SiteQr />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="mt-12 w-full bg-stone-100 px-4 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-12 dark:bg-stone-950 sm:px-6 md:px-8 md:py-16">
                <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="font-serif text-xl italic text-stone-800 dark:text-stone-200">
                        Limaréh
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                        <a
                            className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-500 transition-colors duration-500 hover:text-stone-800 dark:hover:text-stone-200"
                            href="https://www.instagram.com/limareh.aromas/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Instagram
                        </a>
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
