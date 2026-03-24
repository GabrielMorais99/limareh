/**
 * Textos informativos extraídos da contra-embalagem e do rótulo do produto Limaréh.
 */
export function ContraEmbalagemContent() {
    return (
        <div className="relative z-10 mx-auto max-w-lg text-center">
            <h2 className="font-headline text-2xl font-semibold leading-snug text-on-surface md:text-3xl">
                Entre aromas e silêncios...
            </h2>
            <div className="mt-8 space-y-5 font-headline text-base font-normal leading-relaxed text-on-surface md:text-lg">
                <p>Há um instante que paira no ar,</p>
                <p>feito brisa leve em tarde serena.</p>
                <p>Um perfume que não apenas perfuma,</p>
                <p>mas guarda memórias, acalma o tempo</p>
                <p>e floresce sentimentos.</p>
                <p className="pt-2">
                    <em className="text-on-surface">Limaréh</em> nasceu desse
                    desejo:
                </p>
                <p>tornar o cotidiano mais sensível,</p>
                <p>a casa mais viva,</p>
                <p>e a alma, mais presente.</p>
                <p className="pt-2">
                    Neste frasco, há mais do que fragrância.
                </p>
                <p>Há cuidado, há intenção, há memória.</p>
                <p>Que este aroma encontre morada em você</p>
                <p>e transforme o espaço ao redor</p>
                <p>em poesia que se respira.</p>
            </div>
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
