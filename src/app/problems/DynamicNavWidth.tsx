'use client';

import { useEffect } from 'react';

export default function DynamicNavWidth() {
    useEffect(() => {
        const updateNavWidth = () => {
            const width = window.innerWidth;
            document.documentElement.style.setProperty('--nav-min-w', `${width}px`);
        };

        // Set initial value
        updateNavWidth();

        // Update on window resize
        window.addEventListener('resize', updateNavWidth);

        // Cleanup
        return () => window.removeEventListener('resize', updateNavWidth);
    }, []);

    return null; // This component doesn't render anything
} 