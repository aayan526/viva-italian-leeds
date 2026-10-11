import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Train, Car } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

interface DaySchedule {
  day: string;
  short: string;
  hours: string;
  open: string;
  close: string;
}

const SCHEDULE_DATA: DaySchedule[] = [
  { day: "Monday", short: "Mon", hours: "16:00–22:00", open: "16:00", close: "22:00" },
  { day: "Tuesday", short: "Tue", hours: "16:00–22:00", open: "16:00", close: "22:00" },
  { day: "Wednesday", short: "Wed", hours: "16:00–22:00", open: "16:00", close: "22:00" },
  { day: "Thursday", short: "Thu", hours: "16:00–22:00", open: "16:00", close: "22:00" },
  { day: "Friday", short: "Fri", hours: "12:00–22:00", open: "12:00", close: "22:00" },
  { day: "Saturday", short: "Sat", hours: "12:00–22:00", open: "12:00", close: "22:00" },
  { day: "Sunday", short: "Sun", hours: "14:00–21:00", open: "14:00", close: "21:00" },
];

export const HoursAndLocation: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentDayName, setCurrentDayName] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }

    const now = new Date();
    const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
    setCurrentDayName(day);

    const schedule = SCHEDULE_DATA.find((h) => h.day === day);
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
            <span>Visit Us In Leeds</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Hours & Location in Leeds
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base leading-relaxed">
            Find our restaurant at <strong>9-11 Bridge End, Leeds LS1 7HG</strong>, situated by Leeds Bridge and the River Aire. Just 300 yards from Leeds Corn Exchange and a 10-minute walk from the train and bus stations.
          </p>
        </div>

        {/* Content Grid: Schedule & Map */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours & Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status & Address Card */}
            <div className="bg-[#181512] border border-[#2C2621] rounded-2xl p-6 shadow-xl">
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
                      300 yards from Leeds Corn Exchange · LS1 7HG
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
                      className="text-sm font-medium text-[#E5B869] hover:text-[#F8E7C9] transition-colors mt-0.5 block font-mono"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <div className="text-xs text-[#8E8474] mt-0.5">
                      Table bookings & enquiries always welcome
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
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Schedule Card */}
            <div className="bg-[#181512] border border-[#2C2621] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#241F1A]">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#F8E7C9]">
                  <Clock className="w-4 h-4 text-[#C99742]" />
                  <span>Weekly Opening Times</span>
                </div>
                <span className="text-[11px] text-[#A39A8B] font-cinzel">Leeds LS1</span>
              </div>

              {/* Summary Pill Row matching Footer */}
              <div className="mb-5 grid grid-cols-3 gap-2 p-3 bg-[#141210] rounded-xl border border-[#26211C] text-center text-xs">
                <div className="border-r border-[#26211C] pr-1">
                  <div className="text-[#8E8474] text-[11px]">Mon – Thu</div>
                  <div className="font-mono text-[#F8E7C9] font-bold mt-0.5 text-xs">16:00–22:00</div>
                </div>
                <div className="border-r border-[#26211C] px-1">
                  <div className="text-[#8E8474] text-[11px]">Fri – Sat</div>
                  <div className="font-mono text-[#F8E7C9] font-bold mt-0.5 text-xs">12:00–22:00</div>
                </div>
                <div className="pl-1">
                  <div className="text-[#8E8474] text-[11px]">Sunday</div>
                  <div className="font-mono text-[#F8E7C9] font-bold mt-0.5 text-xs">14:00–21:00</div>
                </div>
              </div>

              {/* Explicit Daily Rows for Every Single Day with Guaranteed Hours Rendering */}
              <div className="divide-y divide-[#221E1A] text-xs">
                {SCHEDULE_DATA.map((item) => {
                  const isToday = item.day === currentDayName;
                  return (
                    <div
                      key={item.day}
                      className={`py-3.5 px-3 flex items-center justify-between gap-3 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-[#241F1A] border border-[#C99742]/40 text-[#E5B869]'
                          : 'text-[#DFD9CC] hover:bg-[#1C1814]'
                      }`}
                    >
                      {/* Left: Day Name & Short Code */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#F8E7C9]">
                          {item.day}
                        </span>
                        <span className="text-xs text-[#8E8474]">
                          ({item.short})
                        </span>
                        {isToday && (
                          <span className="text-[10px] text-[#100F0D] bg-[#E5B869] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                            Today
                          </span>
                        )}
                      </div>

                      {/* Right: Explicit Hours String Guaranteed to Render */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#F8E7C9] bg-[#12100E] px-3 py-1 rounded-md border border-[#2C2621]">
                          {item.hours}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#221E1A] text-[11px] text-[#8E8474] leading-relaxed">
                Kitchen accepts last table orders 30 minutes before close. Walk-ins and reservations both welcome.
              </div>
            </div>

            {/* Transport & Access Notes */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#A39A8B]">
              <div className="bg-[#181512] p-4 rounded-xl border border-[#221E1A] flex items-start gap-2.5">
                <Train className="w-4 h-4 text-[#C99742] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#F8E7C9] font-medium">Train & Bus</div>
                  <div className="text-[11px] mt-0.5">10 min walk from stations</div>
                </div>
              </div>
              <div className="bg-[#181512] p-4 rounded-xl border border-[#221E1A] flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#C99742] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#F8E7C9] font-medium">Corn Exchange</div>
                  <div className="text-[11px] mt-0.5">300 yards away</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed & Interactive Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#181512] border border-[#2C2621] rounded-2xl overflow-hidden shadow-2xl">
              {/* Map Frame Header */}
              <div className="bg-[#141210] px-5 py-3.5 border-b border-[#241F1A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C99742]" />
                  <span className="text-xs font-serif font-bold text-[#F8E7C9]">
                    9-11 Bridge End, Leeds LS1 7HG
                  </span>
                </div>
                <span className="text-[11px] text-[#A39A8B]">Leeds City Centre</span>
              </div>

              {/* Google Maps iFrame */}
              <div className="relative h-[380px] sm:h-[460px] w-full bg-[#100F0D]">
                <iframe
                  title="Viva Italian Restaurant Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.5516905581977!2d-1.5448554232386926!3d53.793393041416484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c192d192079%3A0xe543b3ae96924295!2sViva%20Italian%20Restaurant!5e0!3m2!1sen!2suk!4v1714000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.85)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Card Footer Location Features */}
              <div className="p-4 bg-[#141210] border-t border-[#241F1A] grid grid-cols-3 gap-2 text-center text-[11px] text-[#DFD9CC]">
                <div className="p-2 rounded bg-[#181512] border border-[#221E1A]">
                  <strong className="text-[#E5B869] block">Waterfront</strong>
                  <span>Opposite Leeds Bridge</span>
                </div>
                <div className="p-2 rounded bg-[#181512] border border-[#221E1A]">
                  <strong className="text-[#E5B869] block">Corn Exchange</strong>
                  <span>300 yards walking</span>
                </div>
                <div className="p-2 rounded bg-[#181512] border border-[#221E1A]">
                  <strong className="text-[#E5B869] block">LS1 7HG</strong>
                  <span>Heart of City Centre</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
