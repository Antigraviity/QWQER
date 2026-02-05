export default function CustomFleetTruck({ className }: { className?: string }) {
    return (
        <svg
            fill="currentColor"
            width="2.51em"
            height="1em"
            viewBox="0 0 640 255" // Custom wide aspect ratio - cropped exactly to wheel bottom (220+35)
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Speed Lines */}
            <path d="M0,50 L100,50 L100,70 L0,70 Z" opacity="0.6" />
            <path d="M-50,100 L80,100 L80,120 L-50,120 Z" opacity="0.8" />
            <path d="M0,150 L60,150 L60,170 L0,170 Z" opacity="0.6" />

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
            {/* Trailer Wheel 1 */}
            <circle cx="180" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
            {/* Trailer Wheel 2 */}
            <circle cx="270" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
            {/* Cab Wheel */}
            <circle cx="580" cy="220" r="35" className="truck-wheel" stroke="#1a1e26" strokeWidth="4" strokeDasharray="20 10" />
        </svg>
    );
}
