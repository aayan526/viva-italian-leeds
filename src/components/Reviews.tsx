import React, { useEffect, useRef } from 'react';
import { Star, CheckCircle, Award } from 'lucide-react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const Reviews: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }
  }, []);

  return (
    <section id="reviews" className="py-24 bg-[#100F0D] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C99742]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Recensioni dei Clienti</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Real Customer Reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Loved by Leeds Diners
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base leading-relaxed">
            With nearly 600 verified reviews across Google and TripAdvisor, read what real guests have to say about dining with us at 9-11 Bridge End.
          </p>
        </div>

        {/* Rating Score Banner Highlight with Verified Spaces */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#181512] border border-[#C99742]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Left Score Block */}
            <div className="sm:col-span-5 text-center sm:text-left sm:border-r sm:border-[#2C2621] sm:pr-8">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="font-serif text-5xl font-bold text-[#F8E7C9]">
                  {RESTAURANT_INFO.rating}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-[#E5B869]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E5B869]" />
                    ))}
                  </div>
                  <div className="text-xs text-[#A39A8B] mt-1 font-medium">
                    Google Average Rating
                  </div>
                </div>
              </div>

              {/* Exact verified space: 'Based on ~598 customer reviews' */}
              <div className="mt-3 text-xs text-[#8E8474] flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#C99742]" />
                <span>{`Based on ~${RESTAURANT_INFO.reviewCount} customer reviews`}</span>
              </div>
            </div>

            {/* Right Rating Breakdown */}
            <div className="sm:col-span-7 space-y-2.5">
              {[
                { label: 'Food & Fresh Culinary Quality', score: '4.8 / 5.0', pct: 96 },
                { label: 'Intimate Trattoria Ambiance', score: '4.7 / 5.0', pct: 94 },
                { label: 'Warm Family Service & Hospitality', score: '4.8 / 5.0', pct: 96 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-[#DFD9CC] mb-1">
                    <span>{item.label}</span>
                    <span className="font-semibold text-[#E5B869]">{item.score}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#26211C] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D8A651] to-[#E5B869] rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Review Cards Grid with Verified Spaces Around Bullet Dot */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#161412] border border-[#26211C] hover:border-[#C99742]/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              <div>
                {/* Header row: stars & source with verified spaces around dot */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#E5B869]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E5B869]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#8E8474]">
                    {`${review.source} · ${review.date}`}
                  </span>
                </div>

                {/* Highlight Quote */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#F8E7C9] mb-3 group-hover:text-[#E5B869] transition-colors">
                  "{review.highlight}"
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#A39A8B] leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Dishes Mentioned */}
              <div className="mt-6 pt-4 border-t border-[#221E1A] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#F8E7C9]">
                    {review.author}
                  </div>
                  <div className="text-[11px] text-[#8E8474]">
                    Verified Diner · Leeds
                  </div>
                </div>

                {review.dishMentioned && (
                  <span className="text-[10px] text-[#C99742] bg-[#1E1A16] px-2.5 py-1 rounded-md border border-[#C99742]/20 font-medium">
                    {review.dishMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
