export default function CustomScooter({ className }: { className?: string }) {
    return (
        <div className={`relative ${className}`} style={{ width: '1.28em', height: '1em', transform: 'scaleX(-1)' }}>
            {/* 1. The Official Asset as a White Mask */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    maskImage: "url('/scooter.svg')",
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain',
                    WebkitMaskImage: "url('/scooter.svg')",
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    WebkitMaskSize: 'contain',
                }}
            />

            {/* 2. Speed Strips (Trailing from Box) */}
            <svg
                viewBox="0 0 128 100"
                className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
                fill="white"
            >
                {/* Top Strip (Shortest) */}
                <path d="M105,32 L140,32 L140,35 L105,35 Z" opacity="0.6" />
                {/* Middle Strip (Moderate) */}
                <path d="M105,42 L155,42 L155,45 L105,45 Z" opacity="0.8" />
                {/* Bottom Strip (Longest) */}
                <path d="M105,52 L170,52 L170,55 L105,55 Z" opacity="0.6" />
            </svg>

            {/* 3. Rotating Wheel Overlays - Synchronized with Fleet Truck Style */}
            {/* Front Wheel Animation (Visual Right) */}
            <div
                className="absolute"
                style={{
                    left: '21%',
                    top: '78%',
                    transform: 'translate(-50%, -50%)',
                    width: '0.22em',
                    height: '0.22em'
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                        cx="50" cy="50" r="45"
                        className="scooter-wheel"
                        fill="white"
                        stroke="#1a1e26"
                        strokeWidth="4"
                        strokeDasharray="20 10"
                    />
                </svg>
            </div>

            {/* Rear Wheel Animation (Visual Left) */}
            <div
                className="absolute"
                style={{
                    left: '72.5%',
                    top: '78%',
                    transform: 'translate(-50%, -50%)',
                    width: '0.22em',
                    height: '0.22em'
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                        cx="50" cy="50" r="45"
                        className="scooter-wheel"
                        fill="white"
                        stroke="#1a1e26"
                        strokeWidth="4"
                        strokeDasharray="20 10"
                    />
                </svg>
            </div>
        </div>
    );
}
