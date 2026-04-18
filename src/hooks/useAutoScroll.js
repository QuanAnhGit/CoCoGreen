import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for auto-scrolling carousel/marquee
 * Scrolls to next page every interval, pauses when out of view or hovered
 * Loops back to beginning when reaching the end
 * 
 * Usage:
 * const { containerRef, trackRef, isHovering } = useAutoScroll({
 *   interval: 5000,           // Scroll every 5 seconds
 *   scrollAmount: 500,        // Scroll 500px per interval by default
 *   isVertical: true,         // Scroll down instead of right by default
 *   pauseOnHover: true,       // Pause when hovering
 * });
 * 
 * <div ref={containerRef} className="marquee-wrap">
 *   <div ref={trackRef} className="marquee-track">
 *     {items}
 *   </div>
 * </div>
 */
export function useAutoScroll(options = {}) {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef(null);

    const {
        interval = 5000,
        scrollPercentage = 0.7,
        isVertical = true,
        pauseOnHover = true,
    } = options;

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;

        if (!container || !track) return;

        const scroll = () => {
            const trackSize = isVertical ? track.scrollHeight : track.scrollWidth;
            const containerSize = isVertical ? container.clientHeight : container.clientWidth;
            const maxScroll = trackSize - containerSize;
            const scrollAmount = containerSize * scrollPercentage;

            if (maxScroll <= 0) return;

            let currentScroll = isVertical ? container.scrollTop : container.scrollLeft;
            let nextScroll = currentScroll + scrollAmount;
            console.log('Scrolling from', currentScroll, 'to', nextScroll, 'max:', maxScroll);

            if (Math.ceil(currentScroll) >= maxScroll - 1) {
                nextScroll = 0;
            }
            else if (nextScroll >= maxScroll) {
                nextScroll = maxScroll;
            }

            const scrollOptions = { behavior: 'smooth' };
            if (isVertical) scrollOptions.top = nextScroll;
            else scrollOptions.left = nextScroll;

            container.scrollTo(scrollOptions);
        };

        // Observer to detect if element is in viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If element is in view and not hovering, start scrolling
                if (entry.isIntersecting && !isHovering) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(scroll, interval);
                } else {
                    // Pause if out of view or hovering
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(container);

        // Cleanup
        return () => {
            observer.disconnect();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [interval, isHovering, isVertical]);

    // Handle hover
    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsHovering(true);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsHovering(false);
        }
    };

    return { containerRef, trackRef, isHovering, handleMouseEnter, handleMouseLeave };
}
