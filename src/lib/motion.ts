import type { Transition, Variants } from 'motion/react';

/** Curva suave, "respirada" — usada em todo o site. */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

export const softTransition: Transition = {
    duration: 1.1,
    ease: EASE_SOFT,
};

/** Bloco que sobe e aparece ao entrar na tela. */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: softTransition },
};

/** Como fadeUp, mas com leve desfoque — sensação de névoa/aroma. */
export const mistIn: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.2, ease: EASE_SOFT },
    },
};

/** Container que escalona a entrada dos filhos. */
export function stagger(staggerChildren = 0.12, delayChildren = 0): Variants {
    return {
        hidden: {},
        show: { transition: { staggerChildren, delayChildren } },
    };
}

/** Viewport padrão para animações `whileInView` (anima uma vez só). */
export const inViewOnce = { once: true, amount: 0.2 } as const;
