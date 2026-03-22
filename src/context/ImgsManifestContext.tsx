import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type ImgsManifestStatus = 'loading' | 'legacy' | 'ok';

type ManifestMap = Record<string, boolean>;

const ImgsManifestContext = createContext<{
    status: ImgsManifestStatus;
    manifest: ManifestMap;
}>({ status: 'loading', manifest: {} });

const MANIFEST_URL_KEY = 'jardim-de-cristal.png';

function manifestLooksValid(data: unknown): data is ManifestMap {
    return (
        typeof data === 'object' &&
        data !== null &&
        MANIFEST_URL_KEY in (data as ManifestMap)
    );
}

export function ImgsManifestProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<ImgsManifestStatus>('loading');
    const [manifest, setManifest] = useState<ManifestMap>({});

    useEffect(() => {
        const b = import.meta.env.BASE_URL || '/';
        const normalized = b.endsWith('/') ? b : `${b}/`;
        const url = `${normalized}imgs/manifest.json`;

        fetch(url, { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (manifestLooksValid(data)) {
                    setManifest(data);
                    setStatus('ok');
                } else {
                    setManifest({});
                    setStatus('legacy');
                }
            })
            .catch(() => {
                setManifest({});
                setStatus('legacy');
            });
    }, []);

    const value = useMemo(() => ({ status, manifest }), [status, manifest]);

    return (
        <ImgsManifestContext.Provider value={value}>
            {children}
        </ImgsManifestContext.Provider>
    );
}

export function useImgsManifest() {
    return useContext(ImgsManifestContext);
}

/**
 * Controla se o <img> deve existir no DOM.
 * - ok: só se manifest disser que o arquivo existe; se mesmo assim der 404, some.
 * - legacy: tenta até onError (deploy antigo sem manifest.json).
 */
export function useImgSlot(filename: string) {
    const { status, manifest } = useImgsManifest();
    const [loadErr, setLoadErr] = useState(false);

    const shouldRender = useMemo(() => {
        if (status === 'loading') return false;
        if (loadErr) return false;
        if (status === 'ok') return manifest[filename] === true;
        return true;
    }, [status, manifest, filename, loadErr]);

    const onImgError = useCallback(() => {
        setLoadErr(true);
    }, []);

    return { shouldRender, onImgError };
}
