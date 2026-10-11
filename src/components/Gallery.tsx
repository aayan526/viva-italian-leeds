import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const activeImg = activeImageIndex !== null ? GALLERY_IMAGES[activeImageIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#141210] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Momenti & Atmosfera</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Real Restaurant Gallery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Inside Viva Restaurant & Pizzeria
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base leading-relaxed">
            Real photos from our restaurant at 9-11 Bridge End, Leeds. Stone oven pizza baking, intimate candlelit dining tables, private party room, and authentic Italian food.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#2C2621] hover:border-[#C99742]/50 transition-all duration-300 shadow-xl bg-[#181512]"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D]/90 via-[#100F0D]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Hover Overlay Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
                <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#E5B869] font-medium">
                  {img.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F8E7C9] group-hover:text-[#FFFFFF] transition-colors mt-0.5">
                  {img.title}
                </h3>
                <p className="text-xs text-[#DFD9CC]/90 mt-1 line-clamp-1">
                  {img.subtitle}
                </p>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#100F0D]/80 text-[#DFD9CC] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-[#C99742]/30">
                <Maximize2 className="w-4 h-4 text-[#E5B869]" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#221E1A] text-[#DFD9CC] hover:text-[#FFFFFF] border border-[#C99742]/30 hover:border-[#C99742] transition-colors cursor-pointer z-10"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1A1612]/80 text-[#DFD9CC] hover:text-[#FFFFFF] border border-[#C99742]/30 hover:border-[#C99742] transition-colors cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1A1612]/80 text-[#DFD9CC] hover:text-[#FFFFFF] border border-[#C99742]/30 hover:border-[#C99742] transition-colors cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="max-w-4xl w-full bg-[#161412] border border-[#C99742]/40 rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] flex items-center justify-center bg-[#0C0B0A]">
              <img
                src={activeImg.url}
                alt={activeImg.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#161412] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#26211C]">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#E5B869] font-medium">
                  {activeImg.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#F8E7C9] mt-0.5">
                  {activeImg.title}
                </h4>
                <p className="text-xs text-[#A39A8B] mt-1">
                  {activeImg.subtitle}
                </p>
              </div>
              <span className="text-xs text-[#8E8474] font-mono shrink-0">
                {(activeImageIndex ?? 0) + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
