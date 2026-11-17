import { motion } from 'motion/react';
import { mistIn, stagger } from '../lib/motion';

/**
 * Textos informativos extraídos da contra-embalagem e do rótulo do produto Limaréh.
 */
export function ContraEmbalagemContent() {
    return (
        <div className="relative z-10 mx-auto max-w-lg text-center">
            <h2 className="font-headline text-2xl font-semibold leading-snug text-on-surface md:text-3xl">
                Entre aromas e silêncios...
            </h2>
            <motion.div variants={stagger(0.16, 0.2)} className="mt-8 space-y-5 font-headline text-base font-normal leading-relaxed text-on-surface md:text-lg">
                <motion.p variants={mistIn}>Há um instante que paira no ar,</motion.p>
                <motion.p variants={mistIn}>feito brisa leve em tarde serena.</motion.p>
                <motion.p variants={mistIn}>Um perfume que não apenas perfuma,</motion.p>
                <motion.p variants={mistIn}>mas guarda memórias, acalma o tempo</motion.p>
                <motion.p variants={mistIn}>e floresce sentimentos.</motion.p>
                <motion.p variants={mistIn} className="pt-2">
                    <em className="text-on-surface">Limaréh</em> nasceu desse
                    desejo:
                </motion.p>
                <motion.p variants={mistIn}>tornar o cotidiano mais sensível,</motion.p>
                <motion.p variants={mistIn}>a casa mais viva,</motion.p>
                <motion.p variants={mistIn}>e a alma, mais presente.</motion.p>
                <motion.p variants={mistIn} className="pt-2">
                    Neste frasco, há mais do que fragrância.
                </motion.p>
                <motion.p variants={mistIn}>Há cuidado, há intenção, há memória.</motion.p>
                <motion.p variants={mistIn}>Que este aroma encontre morada em você</motion.p>
                <motion.p variants={mistIn}>e transforme o espaço ao redor</motion.p>
                <motion.p variants={mistIn}>em poesia que se respira.</motion.p>
            </motion.div>
        </div>
    );
}

export function RotuloTecnicoContent() {
    return (
        <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-headline text-center text-2xl text-on-surface md:text-3xl">
                Uso, precauções e armazenamento
            </h2>
            <div className="mt-10">
                <div className="space-y-8 text-center font-headline text-sm leading-relaxed text-on-surface md:text-base">
                    <section>
                        <h3 className="font-semibold text-on-surface">
                            Modo de usar
                        </h3>
                        <p className="mt-2 text-on-surface-variant">
                            Borrife a fragrância no ambiente desejado, mantendo
                            uma distância mínima de 30cm de paredes, tecidos e
                            superfícies delicadas. Ideal para perfumar salas,
                            quartos, closets e banheiros.
                        </p>
                    </section>
                    <section>
                        <h3 className="font-semibold text-on-surface">
                            Precauções
                        </h3>
                        <p className="mt-2 text-on-surface-variant">
                            Uso externo. Manter fora do alcance de crianças e
                            animais. Evite contato com olhos, pele irritada e
                            superfícies sensíveis. Inflamável: mantenha afastado
                            do fogo e fontes de calor. Em caso de irritação,
                            suspenda o uso. Não ingerir.
                        </p>
                    </section>
                    <section className="border-t border-stone-800/10 pt-6 dark:border-stone-500/20">
                        <h3 className="font-semibold text-on-surface">
                            Armazenamento
                        </h3>
                        <p className="mt-2 text-on-surface-variant">
                            Conservar em local fresco, ao abrigo da luz e do
                            calor.
                        </p>
                    </section>
                </div>
                <p className="mt-8 border-t border-stone-800/10 pt-6 text-center font-headline text-sm italic text-on-surface dark:border-stone-500/20">
                    Feito à mão com carinho no Brasil.
                </p>
            </div>
        </div>
    );
}
