import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        const ref = containerRef.current;
        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};