import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safety Net: After 3 seconds, ensure no content stays hidden if animations failed
    const safetyNetTimer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>('.gsap-fade-up, .gsap-stagger-item, [data-reveal]');
      elements.forEach((el) => {
        const computedOpacity = window.getComputedStyle(el).opacity;
        if (parseFloat(computedOpacity) < 0.95) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.visibility = 'visible';
        }
      });
    }, 3000);

    if (prefersReducedMotion) {
      // Reveal all immediately if user prefers reduced motion
      const elements = document.querySelectorAll<HTMLElement>('.gsap-fade-up, .gsap-stagger-item, [data-reveal]');
      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
      });
      return () => clearTimeout(safetyNetTimer);
    }

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(safetyNetTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
