import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Scroll-triggered fade-up animation for container/section headers
 */
export function initFadeUp(
  target: HTMLElement | string,
  options: {
    yOffset?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  if (isReducedMotion()) return null;

  const {
    yOffset = 36,
    duration = 0.85,
    delay = 0,
    start = 'top 85%'
  } = options;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: yOffset,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}

/**
 * Scroll-triggered stagger for card grids (menu items, reviews, gallery)
 */
export function initStaggerReveal(
  container: HTMLElement | string,
  itemSelector: string,
  options: {
    stagger?: number;
    yOffset?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  if (isReducedMotion()) return null;

  const {
    stagger = 0.12,
    yOffset = 30,
    duration = 0.75,
    start = 'top 82%'
  } = options;

  return gsap.fromTo(
    typeof container === 'string'
      ? `${container} ${itemSelector}`
      : container.querySelectorAll(itemSelector),
    {
      opacity: 0,
      y: yOffset,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}

/**
 * Smooth counter animation for metrics (4.7 rating, 600+ reviews, etc.)
 */
export function initCounter(
  element: HTMLElement,
  finalValue: number,
  options: {
    decimals?: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
  } = {}
) {
  if (isReducedMotion()) {
    element.textContent = `${options.prefix || ''}${finalValue.toFixed(options.decimals || 0)}${options.suffix || ''}`;
    return null;
  }

  const {
    decimals = 0,
    duration = 2.0,
    suffix = '',
    prefix = '',
  } = options;

  const counterObj = { val: 0 };

  return gsap.to(counterObj, {
    val: finalValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
    onUpdate: () => {
      element.textContent = `${prefix}${counterObj.val.toFixed(decimals)}${suffix}`;
    },
  });
}

/**
 * Subtle parallax effect for hero background
 */
export function initParallax(element: HTMLElement, triggerElement: HTMLElement, speed: number = 0.25) {
  if (isReducedMotion()) return null;

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}
