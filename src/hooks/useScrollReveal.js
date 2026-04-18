import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Elements fade in and optionally slide/float when scrolled into view
 * They fade out and reverse when scrolled out of view
 * 
 * Available effects:
 * - 'slideUp' (default): Slides up with fade in
 * - 'fade': Only fades in/out
 * - 'floatLeft': Floats in from left with fade
 * - 'floatRight': Floats in from right with fade
 * - 'fadeRotateInLeft': Fades in while rotating from left
 * - 'fadeRotateInRight': Fades in while rotating from right
 * 
 * Usage:
 * const { ref, isVisible, classNames } = useScrollReveal('slideUp');
 * <div ref={ref} className={classNames}>Content</div>
 * 
 * Or manually:
 * const { ref, isVisible } = useScrollReveal('floatLeft');
 * <div ref={ref} className={`${isVisible ? 'scroll-float-left-reveal' : 'scroll-float-left-hidden'}`}>
 */
export function useScrollReveal(effect = 'slideUp', options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    threshold = 0.2,  // Trigger when 20% of element is in viewport
    rootMargin = '0px',
  } = options;

  // Map effect types to class names
  const effectClasses = {
    slideUp: { reveal: 'scroll-reveal', hidden: 'scroll-hidden' },
    fade: { reveal: 'scroll-fade-reveal', hidden: 'scroll-fade-hidden' },
    floatLeft: { reveal: 'scroll-float-left-reveal', hidden: 'scroll-float-left-hidden' },
    floatRight: { reveal: 'scroll-float-right-reveal', hidden: 'scroll-float-right-hidden' },
    fadeRotateInLeft: { reveal: 'scroll-fade-rotate-left-reveal', hidden: 'scroll-fade-rotate-left-hidden' },
    fadeRotateInRight: { reveal: 'scroll-fade-rotate-right-reveal', hidden: 'scroll-fade-rotate-right-hidden' },
  };

  const classes = effectClasses[effect] || effectClasses.slideUp;
  const classNames = isVisible ? classes.reveal : classes.hidden;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible, classNames };
}
