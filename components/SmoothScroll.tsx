"use client";
import { ReactLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Disable smooth scroll on admin pages to prevent layout issues
    if (pathname.startsWith('/admin')) {
        return <>{children}</>;
    }
    
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
