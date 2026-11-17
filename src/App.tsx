import { useRef, type ReactNode, type MouseEvent } from 'react';
import {
    MotionConfig,
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from 'motion/react';
import { FragrancesCatalog } from './components/FragrancesCatalog';
import {
    ContraEmbalagemContent,
    RotuloTecnicoContent,
} from './components/ProductPackagingInfo';
import { InstagramIcon } from './components/InstagramIcon';
import { LeafIcon } from './components/LeafIcon';
import { SafeImg } from './components/SafeImg';
import {
    ChevronDownIcon,
    ClockIcon,
    EcoIcon,
    RabbitIcon,
} from './components/Icons';
import { INSTAGRAM_URL } from './lib/links';
import { EASE_SOFT, fadeUp, inViewOnce, mistIn, stagger } from './lib/motion';

interface RevealSectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

/** Seção que surge suavemente ao entrar na viewport. */
function RevealSection({ children, id, className }: RevealSectionProps) {
    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
        >
            {children}
        </motion.section>
    );
}

const HERO_TITLE = 'Limaréh';

function Hero() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    // Ken Burns guiado pela rolagem + texto que se dissolve ao descer.
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative isolate flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:px-6 md:px-8 md:pb-16 md:pt-[calc(5rem+env(safe-area-inset-top,0px))]"
        >
            <div className="absolute inset-0 z-0 bg-[#e8e4e0]">
                <motion.div
                    className="absolute inset-0 will-change-transform"
                    style={{ scale: imgScale, y: imgY }}
                >
                    <SafeImg
                        alt="Limaréh — ambiente natural e sofisticado"
                        className="h-full w-full object-cover object-center"
                        decoding="async"
                        fetchPriority="high"
                        sizes="100vw"
                        file={'capa-home-sprays.jpeg'}
                    />
                </motion.div>
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-stone-50/90 from-0% via-stone-50/25 via-45% to-transparent md:h-28"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-background via-background/55 to-transparent md:h-44"
                />
            </div>
            <motion.div
                className="hero-copy relative z-10 w-full max-w-4xl px-4 text-center"
                style={{ y: copyY, opacity: copyOpacity }}
            >
                <motion.h1
                    aria-label={HERO_TITLE}
                    className="mb-6 font-serif text-[clamp(2.75rem,12vw,6rem)] font-normal leading-none tracking-[0.08em] text-on-surface md:mb-8 md:text-8xl"
                    initial="hidden"
                    animate="show"
                    variants={stagger(0.07, 0.15)}
                >
                    {HERO_TITLE.split('').map((ch, i) => (
                        <motion.span
                            key={i}
                            aria-hidden
                            className="inline-block"
                            variants={mistIn}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.p
                    className="mx-auto max-w-2xl px-1 font-body text-lg font-light italic leading-snug text-on-surface-variant sm:text-xl md:text-2xl"
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: EASE_SOFT, delay: 0.8 }}
                >
                    Eleve seu refúgio com fragrâncias de ambiente assinadas
                    Limaréh.
                </motion.p>
            </motion.div>
            <motion.a
                href="#contra-embalagem"
                aria-label="Rolar para o conteúdo"
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-on-surface"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 1.6, duration: 1 },
                    y: { delay: 1.6, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                }}
            >
                <ChevronDownIcon />
            </motion.a>
        </section>
    );
}

const VALUES = [
    {
        Icon: EcoIcon,
        title: '100% natural',
        text: 'Extratos botânicos puros de origem responsável, sem propelentes sintéticos agressivos e sem ftalatos nocivos.',
    },
    {
        Icon: RabbitIcon,
        title: 'Cruelty-free',
        text: 'Compromisso com a vida: zero testes em animais em toda a cadeia de formulação.',
    },
    {
        Icon: ClockIcon,
        title: 'Longa duração',
        text: 'Óleos concentrados para que uma aplicação mantenha o perfil olfativo por horas.',
    },
];

function ValuesSection() {
    return (
        <section
            id="valores"
            className="relative bg-[#f6f0e7] px-4 py-16 sm:px-6 md:px-8 md:py-24"
        >
            <motion.div
                className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-stretch justify-between gap-12 md:flex-row md:items-start md:gap-16"
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                variants={stagger(0.18)}
            >
                {VALUES.map(({ Icon, title, text }) => (
                    <motion.div
                        key={title}
                        variants={fadeUp}
                        className="flex w-full flex-1 flex-col items-center space-y-4 text-center md:items-start md:text-left"
                    >
                        <motion.span
                            className="mb-2 text-primary"
                            whileHover={{ rotate: -8, scale: 1.12 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                        >
                            <Icon />
                        </motion.span>
                        <h3 className="font-headline text-xl text-on-surface">
                            {title}
                        </h3>
                        <p className="text-sm leading-relaxed text-on-surface-variant">
                            {text}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#f5f1eb] to-transparent md:h-32"
            />
        </section>
    );
}

/** Botão que é levemente "atraído" pelo cursor. */
function MagneticButton({ href, children }: { href: string; children: ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

    function onMove(e: MouseEvent<HTMLAnchorElement>) {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    }
    function onLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex min-h-[52px] items-center gap-3 bg-stone-900 px-8 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-stone-50 shadow-[0_18px_50px_rgba(45,38,30,0.25)] transition-colors duration-300 hover:bg-stone-800"
        >
            {children}
        </motion.a>
    );
}

function CtaSection() {
    return (
        <section
            id="cta"
            className="relative overflow-hidden bg-[#f6f0e7] px-4 py-20 text-center sm:px-6 md:px-8 md:py-40"
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-3xl"
                animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="relative z-10 mx-auto max-w-2xl px-1"
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                variants={stagger(0.2)}
            >
                <motion.h2
                    variants={mistIn}
                    className="font-headline text-3xl leading-tight text-on-surface sm:text-4xl md:text-6xl"
                >
                    Pronto para transformar seu ambiente?
                </motion.h2>
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mt-6 max-w-md font-body text-base font-light text-on-surface-variant"
                >
                    Fale com a gente pelo Instagram e escolha a fragrância do
                    seu refúgio.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-10">
                    <MagneticButton href={INSTAGRAM_URL}>
                        <InstagramIcon className="h-5 w-5" />
                        Encomendar pelo Instagram
                    </MagneticButton>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="selection:bg-primary-container selection:text-on-primary-container">
                <motion.nav
                    className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-stone-50/90 backdrop-blur-xl"
                    style={{
                        paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))',
                    }}
                    initial={{ y: -24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: EASE_SOFT }}
                >
                    <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8 md:py-6">
                        <div className="flex min-w-0 flex-1 items-center gap-6 md:gap-12">
                            <a
                                className="group flex items-center gap-2 font-serif text-lg tracking-[0.2em] text-stone-800 sm:text-xl md:gap-3 md:text-2xl"
                                href="#top"
                                aria-label="Limaréh Aromas"
                            >
                                <div className="flex flex-col items-center">
                                    <span>LIMARÉH</span>
                                    <span className="text-[0.5em] font-normal uppercase tracking-[0.3em]">
                                        Aromas
                                    </span>
                                </div>
                                <motion.span
                                    className="inline-flex"
                                    animate={{ rotate: [0, 6, 0, -4, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <LeafIcon className="h-5 w-5 text-stone-700 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                                </motion.span>
                            </a>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-outline-variant/30 px-3 py-2 text-stone-700 transition-colors duration-300 hover:bg-surface-container-low active:bg-stone-200/80"
                                aria-label="Abrir Instagram da Limaréh"
                            >
                                <InstagramIcon className="h-[22px] w-[22px]" />
                                <span className="hidden font-label text-xs font-semibold uppercase tracking-widest sm:inline">
                                    Instagram
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.nav>

                <main id="top">
                    <Hero />

                    <RevealSection
                        id="contra-embalagem"
                        className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-background px-4 py-16 sm:px-6 md:px-8 md:py-24"
                    >
                        <ContraEmbalagemContent />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-t from-surface to-transparent"
                        />
                    </RevealSection>

                    <FragrancesCatalog />

                    <RevealSection
                        id="informacoes-rotulo"
                        className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-[#f6f0e7] px-4 py-16 sm:px-6 md:px-8 md:py-24"
                    >
                        <RotuloTecnicoContent />
                    </RevealSection>

                    <ValuesSection />
                    <CtaSection />
                </main>

                <footer className="w-full bg-[#f6f0e7] px-4 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-12 sm:px-6 md:px-8 md:py-16">
                    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="font-serif text-xl italic text-stone-800">
                            Limaréh
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-600 transition-colors hover:text-stone-900"
                            >
                                Instagram
                            </a>
                            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-400">
                                Pinterest (em breve)
                            </span>
                        </div>
                        <div className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-stone-600">
                            © {new Date().getFullYear()} LIMARÉH. TODOS OS
                            DIREITOS RESERVADOS.
                        </div>
                    </div>
                </footer>
            </div>
        </MotionConfig>
    );
}
