import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Train, Car, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const HoursAndLocation: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentDayName, setCurrentDayName] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Exact schedule definition matching business data
  const scheduleRows = [
    { day: "Monday", short: "Mon", hours: "16:00–22:00" },
    { day: "Tuesday", short: "Tue", hours: "16:00–22:00" },
    { day: "Wednesday", short: "Wed", hours: "16:00–22:00" },
    { day: "Thursday", short: "Thu", hours: "16:00–22:00" },
    { day: "Friday", short: "Fri", hours: "12:00–22:00" },
    { day: "Saturday", short: "Sat", hours: "12:00–22:00" },
    { day: "Sunday", short: "Sun", hours: "14:00–21:00" },
  ];

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }

    // Determine current day and open status based on current time
    const now = new Date();
    const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
    setCurrentDayName(day);

    const schedule = RESTAURANT_INFO.openingHours.find((h) => h.day === day);
    if (schedule) {
      const [openHour, openMin] = schedule.open.split(':').map(Number);
      const [closeHour, closeMin] = schedule.close.split(':').map(Number);

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;

      setIsOpenNow(currentMinutes >= openMinutes && currentMinutes <= closeMinutes);
    }
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    RESTAURANT_INFO.address
  )}`;

  return (
    <section id="location" className="py-24 bg-[#141210] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Dove Trovarci & Orari</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Visit Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Hours & Location in Leeds
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base">
            Conveniently situated at the south end of Leeds Bridge, near the River Aire waterfront and 5 minutes from Leeds Station.
          </p>
        </div>

        {/* Content Grid: Schedule & Map */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours & Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status & Address Card */}
            <div className="bg-[#181512] border border-[#2C2621] rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#241F1A]">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-sm font-semibold text-[#F8E7C9]">
                    {isOpenNow ? 'Open Now for Dining' : 'Currently Closed'}
                  </span>
                </div>
                <span className="text-xs text-[#8E8474]">Leeds Local Time</span>
              </div>

              {/* Address & Phone */}
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C99742] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-[#8E8474] uppercase tracking-wider font-medium">
                      Restaurant Address
                    </div>
                    <div className="text-sm font-medium text-[#F8E7C9] mt-0.5">
                      {RESTAURANT_INFO.address}
                    </div>
                    <div className="text-xs text-[#A39A8B] mt-0.5">
                      Directly opposite Leeds Bridge · Waterfront District
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C99742] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-[#8E8474] uppercase tracking-wider font-medium">
                      Telephone
                    </div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-medium text-[#E5B869] hover:text-[#F8E7C9] transition-colors mt-0.5 block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <div className="text-xs text-[#8E8474] mt-0.5">
                      Table reservations & inquiries welcome
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="mt-6 pt-5 border-t border-[#241F1A]">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Schedule Card */}
            <div className="bg-[#181512] border border-[#2C2621] rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#241F1A]">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#F8E7C9]">
                  <Clock className="w-4 h-4 text-[#C99742]" />
                  <span>Weekly Opening Times</span>
                </div>
                <span className="text-[11px] text-[#A39A8B] font-cinzel">Leeds LS1</span>
              </div>

              {/* Summary Pill Row matching Footer */}
              <div className="mb-4 grid grid-cols-3 gap-2 p-2.5 bg-[#141210] rounded-lg border border-[#26211C] text-center text-[11px]">
                <div className="border-r border-[#26211C] pr-1">
                  <div className="text-[#8E8474]">Mon – Thu</div>
                  <div className="font-mono text-[#F8E7C9] font-medium mt-0.5">16:00–22:00</div>
                </div>
                <div className="border-r border-[#26211C] px-1">
                  <div className="text-[#8E8474]">Fri – Sat</div>
                  <div className="font-mono text-[#F8E7C9] font-medium mt-0.5">12:00–22:00</div>
                </div>
                <div className="pl-1">
                  <div className="text-[#8E8474]">Sunday</div>
                  <div className="font-mono text-[#F8E7C9] font-medium mt-0.5">14:00–21:00</div>
                </div>
              </div>

              {/* Explicit Daily Rows for Monday through Sunday */}
              <div className="divide-y divide-[#221E1A] text-xs">
                {scheduleRows.map((item) => {
                  const isToday = item.day === currentDayName;
                  return (
                    <div
                      key={item.day}
                      className={`py-3 flex items-center justify-between ${
                        isToday
                          ? 'text-[#E5B869] font-semibold bg-[#221E1A]/80 px-3 rounded'
                          : 'text-[#DFD9CC]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#F8E7C9]">{item.day}</span>
                        <span className="text-xs text-[#8E8474]">({item.short})</span>
                        {isToday && (
                          <span className="text-[10px] text-[#C99742] uppercase tracking-wider font-sans bg-[#141210] px-1.5 py-0.5 rounded border border-[#C99742]/30">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#F8E7C9] bg-[#141210] px-2.5 py-1 rounded border border-[#C99742]/30 shrink-0">
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#221E1A] text-[11px] text-[#8E8474] leading-relaxed">
                Kitchen closes 30 minutes prior to closing time. Last table bookings accepted 1 hour before close.
              </div>
            </div>

            {/* Transport & Access Notes */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#A39A8B]">
              <div className="bg-[#181512] p-3.5 rounded-lg border border-[#221E1A] flex items-start gap-2.5">
                <Train className="w-4 h-4 text-[#C99742] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#F8E7C9] font-medium">By Rail</div>
                  <div className="text-[11px] mt-0.5">5 min walk from Leeds Station</div>
                </div>
              </div>
              <div className="bg-[#181512] p-3.5 rounded-lg border border-[#221E1A] flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#C99742] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#F8E7C9] font-medium">Parking</div>
                  <div className="text-[11px] mt-0.5">Crown Point & on-street bays</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame & Interactive View */}
          <div className="lg:col-span-7">
            <div className="bg-[#181512] border border-[#2C2621] rounded-xl overflow-hidden shadow-2xl h-[560px] flex flex-col">
              
              {/* Map Header Bar */}
              <div className="p-4 bg-[#1F1B16] border-b border-[#2C2621] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#DFD9CC]">
                  <Compass className="w-4 h-4 text-[#C99742]" />
                  <span className="font-medium">9-11 Bridge End, Leeds LS1 7HG</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E5B869] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open Full Map</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative flex-1 w-full bg-[#100F0D]">
                <iframe
                  title="Viva Italian Restaurant Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.666114620573!2d-1.544855423377755!3d53.79339284144365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c3d258b6cb1%3A0xe5aa658a58eb2260!2s9-11%20Bridge%20End%2C%20Leeds%20LS1%207HG!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Map Overlay Card Badge */}
                <div className="absolute bottom-4 left-4 bg-[#141210]/95 backdrop-blur-md border border-[#C99742]/40 p-3.5 rounded-lg shadow-2xl max-w-xs text-xs pointer-events-none">
                  <div className="font-serif font-bold text-sm text-[#F8E7C9]">Viva Italian Restaurant</div>
                  <div className="text-[11px] text-[#A39A8B] mt-0.5">Bar & Pizzeria · 9-11 Bridge End</div>
                  <div className="text-[10px] text-[#E5B869] mt-1 font-medium">★ 4.7 (~600 Google reviews)</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
