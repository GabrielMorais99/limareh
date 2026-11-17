interface LeafIconProps {
    className?: string;
}

export function LeafIcon({ className = 'h-6 w-6' }: LeafIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {/* Haste e Espinha Central */}
            <path d="M 5.8 20.4 C 7.8 20.2 9.5 18.8 10.4 16.8 C 11.2 13.6 12.0 9.2 17.2 3.2" />

            {/* Contorno Externo Esquerdo */}
            <path d="M 10.4 16.8 C 8.2 13.2 8.6 7.5 17.2 3.2" />

            {/* Contorno Externo Direito */}
            <path d="M 17.2 3.2 C 20.6 7.5 20.2 13.2 16.2 17.5 C 13.8 19.2 11.6 18.4 10.4 16.8" />

            {/* Nervuras Longitudinais do Lado Esquerdo */}
            <path d="M 9.8 15.6 C 8.8 12.0 10.2 7.0 15.2 4.2" strokeWidth="1.1" />
            <path d="M 10.4 13.8 C 9.8 10.2 11.4 6.2 16.2 3.6" strokeWidth="1.0" />
            <path d="M 9.5 17.0 C 8.6 14.0 9.2 9.5 13.2 6.0" strokeWidth="1.0" />

            {/* Nervuras Laterais Onduladas do Lado Direito */}
            <path d="M 10.4 16.8 C 12.0 17.5 14.0 17.8 16.2 17.5" strokeWidth="1.2" />
            <path d="M 10.8 14.8 C 12.8 16.0 15.8 16.4 18.4 15.2" strokeWidth="1.2" />
            <path d="M 11.4 12.4 C 13.5 13.6 17.2 14.0 19.8 12.2" strokeWidth="1.2" />
            <path d="M 12.1 10.0 C 14.2 10.8 18.0 11.0 20.1 8.8" strokeWidth="1.2" />
            <path d="M 13.2 7.6 C 15.2 7.8 18.2 7.6 19.4 5.8" strokeWidth="1.2" />
            <path d="M 14.8 5.2 C 16.2 5.0 17.5 4.4 18.2 3.6" strokeWidth="1.1" />
        </svg>
    );
}
