export default function CustomFleetTruck({ className }: { className?: string }) {
    return (
        <svg
            fill="currentColor"
            width="2.51em"
            height="1em"
            viewBox="0 0 640 255"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Speed Lines */}
            <path d="M60,50 L120,50 L120,70 L60,70 Z" opacity="0.6" />
            <path d="M30,100 L120,100 L120,120 L30,120 Z" opacity="0.8" />
            <path d="M0,150 L120,150 L120,170 L0,170 Z" opacity="0.6" />

            {/* Truck Body (Long Trailer + Cab) */}
            {/* Trailer */}
            <path d="M120,20 L500,20 L500,220 L120,220 Z" />

            {/* Connector */}
            <path d="M500,180 L520,180 L520,200 L500,200 Z" />

            {/* Cab */}
            <path d="M520,80 L600,80 L640,140 L640,220 L520,220 Z" />
            {/* Window */}
            <path d="M530,90 L590,90 L620,140 L530,140 Z" fill="white" opacity="0.3" />

            {/* Wheels */}
            <circle cx="180" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
            <circle cx="270" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
            <circle cx="580" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
        </svg>
    );
}
