import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SafeImg } from './SafeImg';
import { InstagramIcon } from './InstagramIcon';
import { INSTAGRAM_DM_URL } from '../lib/links';
import { EASE_SOFT, fadeUp, inViewOnce, mistIn, stagger } from '../lib/motion';

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
        subtitle: 'Home Spray · 200ml',
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
        subtitle: 'Home Spray · 200ml',
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
        subtitle: 'Home Spray · 200ml',
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
        subtitle: 'Home Spray · 200ml',
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

/** Partículas de "névoa" que sobem do borrifador, em loop suave. */
function SprayMist({ accent }: { accent: string }) {
    const particles = [
        { x: -14, size: 10, delay: 0 },
        { x: 6, size: 14, delay: 0.9 },
        { x: -2, size: 8, delay: 1.8 },
        { x: 16, size: 11, delay: 2.6 },
        { x: -20, size: 7, delay: 3.4 },
    ];
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[6%] z-20 h-0 w-0"
        >
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute rounded-full blur-[3px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x,
                        background: `radial-gradient(circle, rgba(255,255,255,0.95), ${accent})`,
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.4 }}
                    animate={{
                        opacity: [0, 0.85, 0],
                        y: [0, -90, -150],
                        x: [0, p.x * 0.8, p.x * 1.6],
                        scale: [0.4, 1.1, 1.8],
                    }}
                    transition={{
                        duration: 4.2,
                        delay: p.delay,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}

function FragranceCard({ fragrance }: { fragrance: Fragrance }) {
    const ref = useRef<HTMLElement>(null);
    const isTextFirst = fragrance.align === 'left';

    // Parallax: fundo, frasco e painel andam em velocidades diferentes.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    const productY = useTransform(scrollYProgress, [0, 1], [70, -70]);
    const productRotate = useTransform(
        scrollYProgress,
        [0, 1],
        isTextFirst ? [-3, 3] : [3, -3],
    );
    const panelY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <article
            ref={ref}
            className="fragrance-section relative min-h-[760px] overflow-hidden bg-[#f5f1eb] md:min-h-[700px]"
        >
            <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundColor: fragrance.accent }}
            />
            <motion.div
                aria-hidden
                className="absolute inset-x-0 -inset-y-[10%] will-change-transform"
                style={{ y: bgY }}
            >
                <SafeImg
                    alt=""
                    className="fragrance-bg h-full w-full object-cover"
                    decoding="async"
                    loading="lazy"
                    sizes="100vw"
                    file={fragrance.backgroundImg}
                    style={{ objectPosition: fragrance.backgroundPosition }}
                />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,244,0.98)_0%,rgba(250,248,244,0.9)_38%,rgba(250,248,244,0.68)_72%,rgba(250,248,244,0.52)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#f7f4ee] via-[#f7f4ee]/72 via-45% to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f7f4ee] via-[#f7f4ee]/76 via-42% to-transparent" />
            <div
                className={`relative mx-auto grid min-h-[760px] w-full max-w-screen-2xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 md:min-h-[700px] md:grid-cols-2 md:px-8 md:py-28 lg:px-14 ${
                    isTextFirst ? '' : 'md:[&>*:first-child]:order-2'
                }`}
            >
                <motion.div
                    className="relative flex w-full justify-center"
                    style={{ y: productY, rotate: productRotate }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={inViewOnce}
                    transition={{ duration: 1.3, ease: EASE_SOFT }}
                >
                    <motion.div
                        className="absolute inset-x-10 top-1/2 h-36 -translate-y-1/2 rounded-full blur-3xl"
                        style={{ backgroundColor: fragrance.accent }}
                        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="relative w-full max-w-[21rem] sm:max-w-[24rem]"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.03 }}
                    >
                        <SprayMist accent={fragrance.accent} />
                        <SafeImg
                            alt={`Limaréh ${fragrance.name} — Home Spray`}
                            className="relative h-auto max-h-[min(70vh,560px)] w-full object-contain object-center drop-shadow-[0_28px_48px_rgba(62,54,43,0.22)]"
                            decoding="async"
                            loading="lazy"
                            sizes="(min-width: 768px) 28rem, 78vw"
                            file={fragrance.productImg}
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="flex flex-col justify-center text-center md:text-left"
                    style={{ y: panelY }}
                >
                    <motion.div
                        className="max-w-xl space-y-6 bg-stone-50/86 px-5 py-7 shadow-[0_28px_90px_rgba(45,38,30,0.13)] backdrop-blur-md sm:px-8 md:bg-stone-50/80"
                        initial="hidden"
                        whileInView="show"
                        viewport={inViewOnce}
                        variants={stagger(0.12, 0.15)}
                    >
                        <div className="space-y-2">
                            <motion.span
                                variants={fadeUp}
                                className="block text-xs font-semibold uppercase tracking-[0.2em] text-stone-700"
                            >
                                Linha assinatura
                            </motion.span>
                            <motion.h3
                                variants={mistIn}
                                className="font-headline text-3xl italic leading-tight text-stone-950 sm:text-4xl md:text-5xl"
                            >
                                {fragrance.name}
                            </motion.h3>
                            <motion.p
                                variants={fadeUp}
                                className="font-label text-xs uppercase tracking-[0.25em] text-stone-700"
                            >
                                {fragrance.subtitle}
                            </motion.p>
                        </div>
                        <motion.p
                            variants={fadeUp}
                            className="font-body text-base font-light leading-[1.75] text-stone-800 sm:text-lg"
                        >
                            {fragrance.description}
                        </motion.p>
                        <motion.div
                            variants={stagger(0.1)}
                            className="flex flex-wrap justify-center gap-2 md:justify-start"
                        >
                            {fragrance.notes.map((note) => (
                                <motion.div
                                    key={note}
                                    variants={fadeUp}
                                    whileHover={{ y: -3, backgroundColor: fragrance.accent }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                                    className="bg-stone-100/95 px-5 py-2 shadow-sm"
                                >
                                    <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-stone-800">
                                        {note}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <motion.a
                                href={INSTAGRAM_DM_URL}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Quero o ${fragrance.name} — conversar pelo Instagram`}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="inline-flex min-h-[48px] items-center gap-3 border-[0.5px] border-stone-500/45 px-6 py-3 font-label text-xs font-medium uppercase tracking-[0.2em] text-stone-600 transition-colors duration-300 hover:border-stone-700/60 hover:bg-stone-800/90 hover:text-stone-50"
                            >
                                <InstagramIcon className="h-4 w-4" />
                                Quero este
                                <span aria-hidden>→</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </article>
    );
}

function CollectionShowcase() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
    const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);

    return (
        <section
            ref={ref}
            className="relative isolate overflow-hidden bg-[#f5f1eb]"
            aria-label="Exposição completa dos produtos Limaréh"
        >
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f7f4ee] via-[#f7f4ee]/70 to-transparent" />
            <div className="mx-auto flex min-h-[860px] max-w-screen-2xl flex-col items-center justify-center gap-10 px-4 py-24 text-center sm:px-6 md:px-8 md:py-32 lg:px-14">
                <motion.div
                    className="relative z-10 max-w-2xl space-y-4"
                    initial="hidden"
                    whileInView="show"
                    viewport={inViewOnce}
                    variants={stagger(0.15)}
                >
                    <motion.span
                        variants={fadeUp}
                        className="block text-xs font-semibold uppercase tracking-[0.24em] text-outline"
                    >
                        Coleção completa
                    </motion.span>
                    <motion.h2
                        variants={mistIn}
                        className="font-headline text-3xl italic leading-tight text-stone-950 sm:text-4xl md:text-5xl"
                    >
                        As quatro assinaturas Limaréh em exposição
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto max-w-xl font-body text-base font-light leading-[1.8] text-on-surface-variant"
                    >
                        Brisa Lilás, Campo dos Sonhos, Luz da Tarde e Jardim de
                        Cristal reunidos em uma apresentação suave, com brilho
                        perolado e acabamento dourado.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="relative z-10 w-full max-w-[34rem]"
                    style={{ scale }}
                >
                    <div className="absolute inset-8 rounded-full bg-white/70 blur-3xl" />
                    <motion.div
                        className="relative overflow-hidden shadow-[0_30px_90px_rgba(69,58,43,0.2)]"
                        style={{ borderRadius: radius }}
                    >
                        <SafeImg
                            alt="Coleção completa de Home Sprays Limaréh"
                            className="h-auto max-h-[min(82vh,780px)] w-full object-cover object-center"
                            decoding="async"
                            loading="lazy"
                            sizes="(min-width: 768px) 34rem, 92vw"
                            file={'catalogo-home-sprays.jpeg'}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export function FragrancesCatalog() {
    return (
        <section
            id="fragrancias"
            className="relative scroll-mt-[calc(5.25rem+env(safe-area-inset-top,0px))] bg-[#f7f4ee]"
        >
            <div className="relative z-10">
                <motion.div
                    className="mx-auto max-w-screen-xl px-4 py-16 text-center sm:px-6 md:px-8 md:py-20"
                    initial="hidden"
                    whileInView="show"
                    viewport={inViewOnce}
                    variants={stagger(0.15)}
                >
                    <motion.h2
                        variants={mistIn}
                        className="font-headline text-3xl leading-tight text-on-surface sm:text-4xl md:text-5xl"
                    >
                        Coleção Home Sprays
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-4 max-w-[42rem] font-body text-on-surface-variant"
                    >
                        Quatro fragrâncias assinadas para transformar cada
                        ambiente em refúgio. Escolha a que ressoa com o seu
                        momento.
                    </motion.p>
                </motion.div>
                {fragrances.map((fragrance) => (
                    <FragranceCard key={fragrance.key} fragrance={fragrance} />
                ))}
                <CollectionShowcase />
            </div>
        </section>
    );
}
