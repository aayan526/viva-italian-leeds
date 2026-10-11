import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Phone, User, Info } from 'lucide-react';
import { RESTAURANT_INFO, getTimeSlotsForDate } from '../data/restaurantData.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:00');
  const [partySize, setPartySize] = useState('2');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Dynamically compute exact time slots based on selected day (14:00–20:30 for Sunday, etc.)
  const availableTimeSlots = useMemo(() => getTimeSlotsForDate(date), [date]);

  // Ensure selected time is valid for the current day
  useEffect(() => {
    if (availableTimeSlots.length > 0 && !availableTimeSlots.includes(time)) {
      setTime(availableTimeSlots[0]);
    }
  }, [availableTimeSlots, time]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingRef(`VIVA-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161412] border border-[#C99742]/40 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#221E1A] text-[#DFD9CC] hover:text-[#FFFFFF] border border-[#2C2621] hover:border-[#C99742] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#1F2C20] border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#F8E7C9]">Table Reserved</h3>
            <p className="text-xs text-[#8E8474] mt-1">
              Ref: <span className="font-mono text-[#E5B869] font-bold">{bookingRef}</span>
            </p>
            <div className="mt-4 p-4 rounded-lg bg-[#1B1815] border border-[#2C2621] text-xs text-[#DFD9CC] space-y-2">
              <div><strong>Name:</strong> {name}</div>
              <div><strong>Date & Time:</strong> {date} at {time}</div>
              <div><strong>Party Size:</strong> {partySize} {Number(partySize) === 1 ? 'Guest' : 'Guests'}</div>
            </div>
            <div className="mt-4 text-[11px] text-[#A39A8B] bg-[#221E1A] p-3 rounded border border-[#C99742]/20 text-left">
              * Design Concept Demo: This reservation is simulated for demonstration purposes. For official reservations, call{' '}{RESTAURANT_INFO.phone}.
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-6 w-full py-3 rounded-md text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-1">
              <span>Quick Reservation</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#F8E7C9]">
              Book at Viva Leeds
            </h3>
            <p className="text-xs text-[#A39A8B] mt-1">
              9-11 Bridge End, Leeds LS1 7HG
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39A8B] mb-1">
                  Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E8474] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#2C2621] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39A8B] mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8E8474] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="Contact Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#2C2621] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#2C2621] rounded-lg p-2.5 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] mb-1">
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#2C2621] rounded-lg p-2.5 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742] cursor-pointer"
                  >
                    {availableTimeSlots.map((t) => (
                      <option key={t} value={t} className="bg-[#181512]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A39A8B] mb-1">
                    Guests
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#2C2621] rounded-lg p-2.5 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-[#181512]">
                        {n === 1 ? '1 Guest' : `${n} Guests`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#1B1815] rounded border border-[#2C2621] text-[11px] text-[#8E8474] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#C99742] shrink-0" />
                <span>
                  Demo Concept Form · Real bookings call{' '}{RESTAURANT_INFO.phone}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 shadow-lg transition-all cursor-pointer"
              >
                Reserve Table
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
