export default function CustomScooter({ className }: { className?: string }) {
    return (
        <svg
            fill="currentColor"
            width="1.2em"
            height="1em"
            viewBox="0 0 400 320"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Delivery Box - Prominent and square */}
            <rect x="20" y="120" width="90" height="90" rx="8" fill="currentColor" />

            {/* Scooter Body Main */}
            <path d="M100 230 L280 230 L270 190 Q265 170 245 175 L140 175 Q110 175 110 210 Z" fill="currentColor" />

            {/* Front Shield/Stem */}
            <path d="M250 230 L270 140 L290 140 L290 230 Z" fill="currentColor" />

            {/* Handlebars */}
            <path d="M260 140 L300 135" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />

            {/* Rider Leg */}
            <path d="M160 180 L180 225 L210 225" stroke="currentColor" strokeWidth="16" strokeLinecap="round" fill="none" />

            {/* Rider Torso */}
            <path d="M150 180 Q145 140 170 130 L200 135 L190 185 Z" fill="currentColor" />

            {/* Rider Arm */}
            <path d="M185 140 L220 145 L265 140" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none" />

            {/* Rider Head/Helmet */}
            <circle cx="180" cy="100" r="28" fill="currentColor" />
            <path d="M180 100 L210 100 A28 28 0 0 0 180 72 Z" fill="currentColor" opacity="0.5" /> {/* Visor detail */}

            {/* Wheels - Solid base + Spinning tread */}
            <circle cx="90" cy="250" r="36" fill="currentColor" />
            <circle cx="90" cy="250" r="36" className="scooter-wheel" fill="none" stroke="#1a1e26" strokeWidth="6" strokeDasharray="18 10" />

            <circle cx="290" cy="250" r="36" fill="currentColor" />
            <circle cx="290" cy="250" r="36" className="scooter-wheel" fill="none" stroke="#1a1e26" strokeWidth="6" strokeDasharray="18 10" />

            {/* Speed Lines for motion effect */}
            <path d="M-20 180 L40 180" stroke="currentColor" strokeWidth="4" opacity="0.6" />
            <path d="M-40 220 L20 220" stroke="currentColor" strokeWidth="4" opacity="0.6" />
        </svg>
    );
}
