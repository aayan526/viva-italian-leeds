import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Reviews } from './components/Reviews.tsx';
import { HoursAndLocation } from './components/HoursAndLocation.tsx';
import { ReservationSection } from './components/ReservationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { ChevronDown, HelpCircle, Utensils, Award } from 'lucide-react';
import { FAQS } from './data/restaurantData.ts';

export default function App() {
  // Initialize buttery smooth scrolling via Lenis + GSAP ScrollTrigger sync & 3s safety net
  useLenisScroll();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#100F0D] text-[#F3EFE6] flex flex-col selection:bg-[#C99742]/30 selection:text-[#F8E7C9] overflow-x-hidden">
      
      {/* Top Navigation */}
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section with Parallax, Live Status & Rating Counters */}
        <Hero onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* Our Story / About Section */}
        <About />

        {/* Full Menu Section with Filters, Search, GBP Prices */}
        <MenuSection onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* Photo Gallery with Interactive Lightbox */}
        <Gallery />

        {/* Guest Reviews Highlighting 4.7 Google Rating & ~600 Reviews */}
        <Reviews />

        {/* Hours & Location Section with Leeds Map Embed */}
        <HoursAndLocation />

        {/* Table Reservation Form with Instant Confirmation Card */}
        <ReservationSection />

        {/* Frequently Asked Questions Accordion */}
        <section className="py-20 bg-[#12100E] border-t border-[#221E1A] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Domande Frequenti · FAQs</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8E7C9]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#26211C] hover:border-[#C99742]/30 rounded-xl overflow-hidden bg-[#161412] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base font-semibold text-[#F8E7C9]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#C99742] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A39A8B] leading-relaxed border-t border-[#221E1A]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Concept Demo Disclaimer */}
      <Footer />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
