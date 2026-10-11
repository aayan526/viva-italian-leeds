import React, { useEffect, useRef } from 'react';
import { Award, Users, Wine, MapPin, Check, Heart, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      initFadeUp(contentRef.current, { yOffset: 30, duration: 0.8 });
    }
  }, []);

  const features = [
    {
      icon: Award,
      title: "TripAdvisor Certificate of Excellence",
      description: "Recognised since 2017 for consistent quality, genuine Italian recipes, and warm Leeds hospitality."
    },
    {
      icon: Users,
      title: "Free Private Room Hire (Up to 35 People)",
      description: "Our dedicated private room upstairs is available completely FREE of charge for birthdays, family parties, weddings, and work celebrations."
    },
    {
      icon: Wine,
      title: "Full Bar & Extensive Wine Cellar",
      description: "Classic Italian cocktails at £10.50, regional Italian wines by the glass and bottle, cold Italian Peroni on tap, and Prosecco."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#141210] relative overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C99742]/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Client Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: Real client about-us photo */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C99742]/30 shadow-2xl bg-[#1A1612]">
                <img
                  src="/client-images/about-us.png"
                  alt="VIVA Italian Restaurant and Pizzeria Leeds"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D] via-transparent to-transparent opacity-60" />
              </div>

              {/* Overlapping secondary image: Real client food presentation */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-xl overflow-hidden border-2 border-[#D8A651]/50 shadow-2xl bg-[#1A1612]">
                <img
                  src="/client-images/gallery-28.jpg"
                  alt="Authentic Italian Antipasto and dishes at Viva"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge on Corner */}
              <div className="absolute -top-4 -left-4 bg-[#1A1612]/95 border border-[#C99742]/50 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 backdrop-blur-sm">
                <Award className="w-8 h-8 text-[#E5B869] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#A39A8B] font-medium">Award Winner</div>
                  <div className="text-xs font-serif font-bold text-[#F8E7C9]">TripAdvisor Certificate</div>
                  <div className="text-[10px] text-[#E5B869]">Certificate of Excellence</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Authentic Owner-Voice Copy */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-3">
              <span className="font-cinzel">Benvenuti da Viva</span>
              <span aria-hidden="true" className="text-[#8E8474]">·</span>
              <span>Our Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9] leading-[1.18]">
              Authentic Italian Heart in the Heart of Leeds
            </h2>

            <p className="mt-6 text-[#DFD9CC] leading-relaxed text-sm sm:text-base">
              Welcome to <strong className="text-[#F8E7C9]">VIVA Italian Restaurant & Pizzeria</strong>. We are situated in a warm, intimate spot at <strong>9-11 Bridge End</strong>, just 300 yards from the historic Leeds Corn Exchange and a gentle 10-minute stroll from Leeds bus and train station.
            </p>

            <p className="mt-4 text-[#A39A8B] leading-relaxed text-sm">
              We started Viva because we wanted to give Leeds a true taste of traditional Italian cooking — the kind you find in busy family trattorias across Italy. We offer hot and cold starters, a wide variety of fresh pasta dishes, delicious main courses, and a great selection of stone-baked pizzas crafted by hand.
            </p>

            <p className="mt-4 text-[#A39A8B] leading-relaxed text-sm">
              Everything is prepared fresh to order. Whether you are popping in for a quick lunchtime pasta, lingering over a bottle of Chianti and our Bistecca al Gamberoni, or gathering 30 friends upstairs in our private function room, you will be treated like family.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 space-y-4">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#181512] border border-[#2C2621] hover:border-[#C99742]/40 transition-colors">
                    <div className="p-2 rounded-lg bg-[#221E1A] border border-[#C99742]/30 text-[#E5B869] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[#F8E7C9]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#A39A8B] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Amenities strip */}
            <div className="mt-8 pt-6 border-t border-[#26211C] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#DFD9CC]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E5B869]" /> Full Bar & Alcohol
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E5B869]" /> Wheelchair Accessible
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E5B869]" /> Free Room Hire (Up to 35)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E5B869]" /> Table Reservations & Walk-ins
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
