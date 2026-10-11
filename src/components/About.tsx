import React, { useEffect, useRef } from 'react';
import { Flame, Sparkles, Wine, Award, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      initFadeUp(contentRef.current, { yOffset: 30, duration: 0.8 });
    }
  }, []);

  const pillars = [
    {
      icon: Flame,
      title: "450°C Stone-Baked Pizza",
      description: "Our signature dough undergoes a slow 48-hour cold fermentation for light digestibility, topped with San Marzano D.O.P. tomatoes and baked over roaring stone heat."
    },
    {
      icon: Sparkles,
      title: "Fresh Hand-Rolled Pasta",
      description: "Crafted daily using Italian '00' flour and free-range golden egg yolks, tossed in rich braised ragùs, fresh seafood broths, and shaved seasonal truffles."
    },
    {
      icon: Wine,
      title: "Curated Italian Cellar & Bar",
      description: "From classic Venetian Spritzes and barrel-aged Negronis to robust Chianti Classicos and crisp Gavi di Gavi, our drinks celebrate Italy's finest terroir."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#141210] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C99742]/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image: Pizza stone oven & artisanal crafting */}
              <div className="relative rounded-lg overflow-hidden border border-[#C99742]/25 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=1000&auto=format&fit=crop"
                  alt="Viva Italian stone oven pizza preparation"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D] via-transparent to-transparent opacity-60" />
              </div>

              {/* Overlapping secondary image: Handmade pasta */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-lg overflow-hidden border-2 border-[#D8A651]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=600&auto=format&fit=crop"
                  alt="Fresh handmade tagliatelle pasta"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge on Corner */}
              <div className="absolute -top-4 -left-4 bg-[#1A1612] border border-[#C99742]/40 rounded-lg p-3.5 shadow-xl flex items-center gap-3">
                <Award className="w-8 h-8 text-[#E5B869] shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A39A8B] font-medium">Proudly Local</div>
                  <div className="text-sm font-serif font-bold text-[#F8E7C9]">Bridge End, Leeds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy & Pillars */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-3">
              <span className="font-cinzel">La Nostra Storia</span>
              <span aria-hidden="true" className="text-[#8E8474]">·</span>
              <span>Our Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9] leading-[1.15]">
              Passionate Italian Flavours on the Leeds Waterfront
            </h2>

            <p className="mt-6 text-[#DFD9CC] leading-relaxed text-base">
              Nestled at <strong className="text-[#F8E7C9] font-medium">9-11 Bridge End</strong>, just steps from Leeds Bridge and the River Aire, Viva Italian Restaurant Bar & Pizzeria was born from an enduring devotion to authentic regional Italian culinary culture.
            </p>

            <p className="mt-4 text-[#B8B0A2] leading-relaxed text-sm">
              We believe great Italian dining relies on simplicity and uncompromising quality. From genuine Caputo flour for our sourdough pizza bases to 24-month aged Parmigiano Reggiano and slow-braised sauces, every dish honours Italian culinary traditions in an atmosphere that welcomes you like family.
            </p>

            {/* Feature Pillars */}
            <div className="mt-8 space-y-6">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-[#181512]/60 border border-[#2C2621] hover:border-[#C99742]/30 transition-colors">
                    <div className="p-2.5 rounded-md bg-[#221E1A] border border-[#C99742]/20 text-[#E5B869] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-[#F8E7C9]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#A39A8B] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location Quote */}
            <div className="mt-8 pt-6 border-t border-[#2C2621] flex items-center gap-3 text-xs text-[#8E8474]">
              <MapPin className="w-4 h-4 text-[#C99742] shrink-0" />
              <span>
                Located at 9-11 Bridge End, Leeds LS1 7HG · 5 minutes stroll from Leeds Central Station.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
