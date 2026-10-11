import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Clock, MapPin, ArrowRight, UtensilsCrossed, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface HeroProps {
  onOpenBookingModal: () => void;
}

interface SlideData {
  id: number;
  image: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/client-images/slider-1.jpg',
    badge: 'Welcome · To VIVA',
    titlePrefix: 'Maaamaaa Mia Amore, Welcome to',
    titleHighlight: 'VIVA Italian Restaurant & Pizzeria',
    description: 'Authentic Italian food in a warm, intimate atmosphere in the heart of Leeds city centre, right by Leeds Bridge.'
  },
  {
    id: 2,
    image: '/client-images/slider-2.jpg',
    badge: 'The Elegant · Italian Restaurant',
    titlePrefix: 'Situated in the Heart of',
    titleHighlight: 'Leeds City Centre',
    description: 'Only 300 yards from Leeds Corn Exchange and a 10-minute stroll from the Bus and Train station.'
  },
  {
    id: 3,
    image: '/client-images/slider-3.jpg',
    badge: 'Delicious · Italian Food Choice',
    titlePrefix: 'Hot & Cold Starters, Handcrafted Pasta,',
    titleHighlight: 'Stone-Baked Pizzas & Prime Steaks',
    description: 'We offer hot and cold starters, a wide variety of pasta dishes, delicious main courses, and a great selection of pizzas.'
  },
  {
    id: 4,
    image: '/client-images/gallery-26.jpg',
    badge: 'Private Room Hire · Up to 35 Guests',
    titlePrefix: 'Celebrate with Family & Friends',
    titleHighlight: 'Free of Charge Room Hire',
    description: 'Private room hire for up to 35 people, completely FREE of charge for birthdays, weddings, work parties, and gatherings.'
  },
  {
    id: 5,
    image: '/client-images/gallery-28.jpg',
    badge: 'Excellence · Leeds LS1',
    titlePrefix: 'TripAdvisor Certificate of Excellence',
    titleHighlight: '4.7 Stars · ~600 Reviews',
    description: 'Full bar, attentive waitstaff, fine Italian wines, and authentic dishes prepared fresh every single day.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Smooth auto-play slider with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Determine today's schedule
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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Viva Italian Restaurant Hero Slider"
    >
      {/* Background Image Slider with smooth crossfades */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
          </div>
        );
      })}

      {/* Cinematic dark gradients for contrast and warm atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D] via-[#100F0D]/75 to-[#100F0D]/60 pointer-events-none z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,151,66,0.14)_0%,rgba(16,15,13,0.85)_80%)] pointer-events-none z-1" />

      {/* Slider Left Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#181512]/80 hover:bg-[#25201A] text-[#DFD9CC] hover:text-[#E5B869] border border-[#C99742]/30 hover:border-[#C99742] transition-all cursor-pointer backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#181512]/80 hover:bg-[#25201A] text-[#DFD9CC] hover:text-[#E5B869] border border-[#C99742]/30 hover:border-[#C99742] transition-all cursor-pointer backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D8A651] mb-5 bg-[#1A1612]/80 border border-[#C99742]/30 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-md">
          <span className="font-cinzel">{HERO_SLIDES[currentSlide].badge}</span>
        </div>

        {/* Dynamic Hero Headings */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8E7C9] leading-[1.12] max-w-4xl min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center transition-all duration-500">
          <span className="text-[#DFD9CC] font-normal text-2xl sm:text-3xl md:text-4xl block mb-1">
            {HERO_SLIDES[currentSlide].titlePrefix}
          </span>
          <span className="italic text-gold-gradient font-bold">
            {HERO_SLIDES[currentSlide].titleHighlight}
          </span>
        </h1>

        {/* Dynamic Narrative Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#DFD9CC] max-w-2xl font-light leading-relaxed min-h-[50px] transition-opacity duration-300">
          {HERO_SLIDES[currentSlide].description}
        </p>

        {/* Opening Hours & Leeds Location Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#B8B0A2]">
          <div className="flex items-center gap-2 bg-[#1A1612]/90 backdrop-blur-md border border-[#C99742]/25 px-4 py-2 rounded-full shadow-md">
            <Clock className="w-3.5 h-3.5 text-[#C99742]" />
            <span>Today ({todaySchedule.short}):{' '}<strong className="text-[#F8E7C9]">{todaySchedule.text}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-[#1A1612]/90 backdrop-blur-md border border-[#C99742]/25 px-4 py-2 rounded-full shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#C99742]" />
            <span>9-11 Bridge End, Leeds LS1 7HG</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
            className="w-full sm:w-auto px-8 py-4 rounded-md text-sm font-medium tracking-wider uppercase text-[#F8E7C9] bg-[#181512]/90 hover:bg-[#25201A] border border-[#C99742]/40 hover:border-[#C99742] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C99742]" />
            <span>View Full Menu</span>
          </a>
        </div>

        {/* Slider Dot Indicators */}
        <div className="mt-8 flex items-center gap-2.5 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 h-2.5 bg-[#E5B869] shadow-[0_0_10px_rgba(229,184,105,0.7)]'
                  : 'w-2.5 h-2.5 bg-[#8E8474]/50 hover:bg-[#DFD9CC]'
              }`}
            />
          ))}
        </div>

        {/* Live Metrics Trust Strip with Verified Spaces */}
        <div className="mt-12 pt-7 border-t border-[#2C2621]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-2xl font-serif font-bold text-[#F8E7C9]">
              <Star className="w-4 h-4 fill-[#E5B869] text-[#E5B869] inline" />
              <span>4.7</span>
            </div>
            <div className="text-xs text-[#8E8474] mt-0.5">Google Rating</div>
          </div>

          <div>
            <div className="text-2xl font-serif font-bold text-[#F8E7C9]">
              ~598+
            </div>
            <div className="text-xs text-[#8E8474] mt-0.5">Diner Reviews</div>
          </div>

          <div>
            <div className="text-2xl font-serif font-bold text-[#F8E7C9]">
              300 yds
            </div>
            <div className="text-xs text-[#8E8474] mt-0.5">From Corn Exchange</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-xl font-serif font-bold text-[#F8E7C9]">
              <Award className="w-4 h-4 text-[#E5B869] inline" />
              <span>TripAdvisor</span>
            </div>
            <div className="text-xs text-[#8E8474] mt-0.5">Certificate of Excellence</div>
          </div>
        </div>

      </div>
    </section>
  );
};
