import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar, Clock, Users, CheckCircle2, Phone, Mail, User, Info, Utensils, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, getTimeSlotsForDate } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

export const ReservationSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:00');
  const [partySize, setPartySize] = useState('2');
  const [seatingPreference, setSeatingPreference] = useState('Main Dining Room');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }
  }, []);

  // Compute available time slots based on selected date (matching Sunday 14:00–20:30 in 30-min increments)
  const availableTimeSlots = useMemo(() => getTimeSlotsForDate(date), [date]);

  // Adjust time if current time is not in available slots
  useEffect(() => {
    if (availableTimeSlots.length > 0 && !availableTimeSlots.includes(time)) {
      setTime(availableTimeSlots[0]);
    }
  }, [availableTimeSlots, time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const confirmationCode = `VIVA-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        code: confirmationCode,
        name,
        email,
        phone,
        date,
        time,
        partySize,
        seatingPreference,
        specialRequests,
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
  };

  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <section id="reserve" className="py-24 bg-[#100F0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Prenota un Tavolo</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Table Reservations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Reserve Your Table at Viva
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base">
            Join us for an authentic Italian lunch or dinner at 9-11 Bridge End, Leeds. Instant confirmation for your dining experience.
          </p>
        </div>

        {/* Reservation Container */}
        <div className="mt-14 max-w-3xl mx-auto bg-[#161412] border border-[#2C2621] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {submittedData ? (
            /* Confirmation State */
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 rounded-full bg-[#1F2C20] border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-cinzel uppercase tracking-widest text-[#E5B869] font-medium">
                Demo Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8E7C9] mt-1">
                We Look Forward to Welcoming You!
              </h3>
              <p className="text-xs text-[#8E8474] mt-2">
                Booking Reference: <span className="font-mono font-bold text-[#E5B869]">{submittedData.code}</span>
              </p>

              {/* Booking Summary Card */}
              <div className="mt-8 bg-[#1B1815] border border-[#2C2621] rounded-xl p-6 text-left max-w-lg mx-auto space-y-3.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#241F1A]">
                  <span className="text-[#8E8474]">Guest Name</span>
                  <span className="font-semibold text-[#F8E7C9]">{submittedData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#241F1A]">
                  <span className="text-[#8E8474]">Date & Time</span>
                  <span className="font-semibold text-[#F8E7C9]">
                    {formattedDate} at {submittedData.time}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#241F1A]">
                  <span className="text-[#8E8474]">Party Size</span>
                  <span className="font-semibold text-[#F8E7C9]">
                    {submittedData.partySize} {Number(submittedData.partySize) === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#241F1A]">
                  <span className="text-[#8E8474]">Seating Area</span>
                  <span className="font-semibold text-[#F8E7C9]">{submittedData.seatingPreference}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#241F1A]">
                  <span className="text-[#8E8474]">Contact</span>
                  <span className="font-semibold text-[#F8E7C9]">{submittedData.phone}</span>
                </div>
                {submittedData.specialRequests && (
                  <div className="flex justify-between py-1">
                    <span className="text-[#8E8474]">Notes</span>
                    <span className="italic text-[#DFD9CC] text-right">{submittedData.specialRequests}</span>
                  </div>
                )}
              </div>

              {/* Fictional Demo Disclaimer Callout with guaranteed spaces */}
              <div className="mt-6 p-4 rounded-lg bg-[#221E1A]/80 border border-[#C99742]/30 max-w-lg mx-auto text-xs text-[#DFD9CC] flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-[#E5B869] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#F8E7C9]">Design Concept Showcase Notice</div>
                  <div className="text-[11px] text-[#A39A8B] mt-0.5 leading-relaxed">
                    <span>{`This is a design concept demo for Viva Italian Restaurant Bar & Pizzeria. No real table was booked. For actual bookings, please call `}</span>
                    <strong className="text-[#E5B869]">{RESTAURANT_INFO.phone}</strong>
                    <span>{` or visit `}</span>
                    <a href={`https://${RESTAURANT_INFO.officialWebsite}`} target="_blank" rel="noreferrer" className="underline text-[#E5B869]">
                      {RESTAURANT_INFO.officialWebsite}
                    </a>.
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 cursor-pointer"
                >
                  Make Another Test Reservation
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alessandro Rossi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] placeholder-[#6E6659] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] placeholder-[#6E6659] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Email */}
                <div className="sm:col-span-3">
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. alessandro@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] placeholder-[#6E6659] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Date, Time, Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] focus:outline-none transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] focus:outline-none transition-colors cursor-pointer"
                    >
                      {availableTimeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#181512]">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                    Guests *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#F8E7C9] focus:outline-none transition-colors cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '12+'].map((num) => (
                        <option key={num} value={num} className="bg-[#181512]">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                  Seating Area Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Main Dining Room', desc: 'Lively trattoria atmosphere' },
                    { id: 'Cozy Candlelit Booth', desc: 'Intimate setting for 2-4' },
                    { id: 'Bar & Aperitivo Area', desc: 'Near wine & cocktail counter' },
                  ].map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => setSeatingPreference(seat.id)}
                      className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                        seatingPreference === seat.id
                          ? 'bg-[#25201A] border-[#C99742] text-[#F8E7C9]'
                          : 'bg-[#141210] border-[#26211C] text-[#8E8474] hover:text-[#DFD9CC]'
                      }`}
                    >
                      <div className="text-xs font-semibold">{seat.id}</div>
                      <div className="text-[10px] text-[#8E8474] mt-0.5">{seat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests / Dietary */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39A8B] font-medium mb-1.5">
                  Special Requests or Dietary Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration, high chair requested, vegan or gluten-free options..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#2C2621] focus:border-[#C99742] rounded-lg p-3 text-xs sm:text-sm text-[#F8E7C9] placeholder-[#6E6659] focus:outline-none transition-colors"
                />
              </div>

              {/* Disclaimer Notice: Explicit spacing in calling 0113 242 0185 */}
              <div className="p-3 bg-[#1A1612] rounded-lg border border-[#C99742]/20 text-[11px] text-[#A39A8B] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C99742] shrink-0" />
                <span>
                  {`Demo Concept Form · Real table bookings can be made directly by calling ${RESTAURANT_INFO.phone}.`}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] via-[#E5B869] to-[#C99742] hover:brightness-110 shadow-lg hover:shadow-[0_0_30px_rgba(216,166,81,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
