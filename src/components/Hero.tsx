import React, { useEffect, useRef } from 'react';
import { Star, Clock, MapPin, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initParallax, initCounter } from '../utils/animations.ts';

interface HeroProps {
  onOpenBookingModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ratingCounterRef = useRef<HTMLSpanElement>(null);
  const reviewCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (heroRef.current && bgRef.current) {
      initParallax(bgRef.current, heroRef.current, 0.2);
    }

    if (ratingCounterRef.current) {
      initCounter(ratingCounterRef.current, 4.7, { decimals: 1, duration: 1.6 });
    }

    if (reviewCounterRef.current) {
      initCounter(reviewCounterRef.current, 598, { decimals: 0, duration: 1.8, suffix: '+' });
    }
  }, []);

  // Determine today's opening hours
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' });
  const todaySchedule = RESTAURANT_INFO.openingHours.find((h) => h.day === today) || RESTAURANT_INFO.openingHours[0];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Parallax & Dark Overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none transform-gpu"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      {/* Gradient layers for readability and warm mood */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D] via-[#100F0D]/80 to-[#100F0D]/65 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,151,66,0.12)_0%,rgba(16,15,13,0.85)_75%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Unboxed Kicker metadata with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#D8A651] mb-6">
          <span className="font-cinzel">Est. Leeds Waterfront</span>
          <span aria-hidden="true" className="text-[#8E8474]">·</span>
          <span>9-11 Bridge End</span>
          <span aria-hidden="true" className="text-[#8E8474]">·</span>
          <span>Authentic Trattoria & Pizzeria</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F8E7C9] leading-[1.08] max-w-4xl">
          Authentic Italian Soul at{' '}
          <span className="italic font-normal text-gold-gradient">
            Bridge End, Leeds
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#DFD9CC] max-w-2xl font-light leading-relaxed">
          Experience true Italian hospitality in Leeds LS1. Handcrafted pasta, 48-hour fermented sourdough stone-baked pizzas, and heritage regional wines, prepared with unapologetic passion.
        </p>

        {/* Opening Hours & Location Indicator */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#B8B0A2]">
          <div className="flex items-center gap-2 bg-[#1A1612]/80 backdrop-blur-sm border border-[#C99742]/20 px-3.5 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-[#C99742]" />
            <span>Today ({todaySchedule.day}):{' '}<strong className="text-[#F8E7C9]">{todaySchedule.text}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-[#1A1612]/80 backdrop-blur-sm border border-[#C99742]/20 px-3.5 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#C99742]" />
            <span>9-11 Bridge End, Leeds LS1 7HG</span>
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto px-8 py-4 rounded-md text-sm font-semibold tracking-wider uppercase text-[#100F0D] bg-gradient-to-r from-[#D8A651] via-[#E5B869] to-[#C99742] shadow-[0_4px_25px_rgba(216,166,81,0.35)] hover:shadow-[0_4px_35px_rgba(216,166,81,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book a Table</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#menu"
            onClick={handleMenuClick}
            className="w-full sm:w-auto px-8 py-4 rounded-md text-sm font-medium tracking-wider uppercase text-[#F8E7C9] bg-[#181512]/90 hover:bg-[#25201A] border border-[#C99742]/40 hover:border-[#C99742] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C99742]" />
            <span>View Full Menu</span>
          </a>
        </div>

        {/* Live Metrics Trust Strip with Animated Counters */}
        <div className="mt-14 pt-8 border-t border-[#2C2621]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-3xl text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-serif font-bold text-[#F8E7C9]">
              <Star className="w-5 h-5 fill-[#E5B869] text-[#E5B869] inline" />
              <span ref={ratingCounterRef}>4.7</span>
            </div>
            <div className="text-xs text-[#A39A8B] mt-1 font-medium">Google Rating</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F8E7C9]">
              <span ref={reviewCounterRef}>598+</span>
            </div>
            <div className="text-xs text-[#A39A8B] mt-1 font-medium">Happy Customer Reviews</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F8E7C9]">
              <span>450°C</span>
            </div>
            <div className="text-xs text-[#A39A8B] mt-1 font-medium">Stone-Baked Pizza Oven</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F8E7C9]">
              <span>LS1 7HG</span>
            </div>
            <div className="text-xs text-[#A39A8B] mt-1 font-medium">Leeds Waterfront Location</div>
          </div>
        </div>
      </div>
    </section>
  );
};
