import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 2000, startOnVisible = false) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const animationFrameId = useRef(null);

    const startAnimation = () => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentCount = Math.floor(end * percentage);
            setCount(currentCount);

            if (progress < duration) {
                animationFrameId.current = requestAnimationFrame(animate);
            }
        };
        animationFrameId.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (!startOnVisible) {
            startAnimation();
        }
        // Cleanup function
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [end, duration, startOnVisible]);

    // This effect is for starting the animation when it becomes visible
    useEffect(() => {
        if (startOnVisible && ref.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        startAnimation();
                        observer.unobserve(entry.target); // Animate only once
                    }
                },
                { threshold: 0.5 }
            );
            observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [startOnVisible]);

    return [ref, count];
};

export default useCountUp;