/**
 * Ícones em SVG inline (substituem a fonte Material Symbols inteira).
 */
type IconProps = { className?: string };

const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
};

export function EcoIcon({ className = 'h-7 w-7' }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
            <path d="M5 19c3-4 6-7 10-9" />
        </svg>
    );
}

export function RabbitIcon({ className = 'h-7 w-7' }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M9 10C7.5 7 7.5 3.5 8.8 3c1.3-.5 2.4 3 2.4 6" />
            <path d="M13 9c.4-3 2-6.2 3.2-5.6 1.3.6.4 4.2-1.4 6.8" />
            <path d="M6.5 15.5c0-3.3 2.6-6 5.8-6s5.7 2.7 5.7 6c0 2.5-1.8 4.5-4.6 4.5H10c-2 0-3.5-2-3.5-4.5Z" />
            <circle cx="10.5" cy="14" r=".6" fill="currentColor" stroke="none" />
            <path d="M18 17.5c1 0 1.8.6 1.8 1.4" />
        </svg>
    );
}

export function ClockIcon({ className = 'h-7 w-7' }: IconProps) {
    return (
        <svg {...base} className={className}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </svg>
    );
}

export function ChevronDownIcon({ className = 'h-6 w-6' }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}
