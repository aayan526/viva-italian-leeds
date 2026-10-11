import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink, ArrowUp, CheckCircle, Heart, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exploreLinks = [
    { label: 'About Viva', target: '#about' },
    { label: 'Full Menu', target: '#menu' },
    { label: 'Photo Gallery', target: '#gallery' },
    { label: 'Guest Reviews', target: '#reviews' },
    { label: 'Opening Times', target: '#location' },
    { label: 'Book a Table', target: '#reserve' },
  ];

  return (
    <footer className="bg-[#0C0B0A] border-t border-[#26211C] text-[#DFD9CC] relative overflow-hidden">
      
      {/* Primary Demo Disclaimer Notice Box */}
      <div className="bg-[#1A1612] border-b border-[#C99742]/25 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#B8B0A2]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5B869]" />
            <strong className="text-[#F8E7C9] uppercase tracking-wider font-cinzel">
              Design concept demo — not the official website
            </strong>
          </div>
          <div className="flex items-center gap-3">
            <span>Official restaurant website:</span>
            <a
              href={`https://${RESTAURANT_INFO.officialWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#E5B869] hover:underline"
            >
              <span>{RESTAURANT_INFO.officialWebsite}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-bold tracking-wider text-[#F8E7C9]">
                VIVA
              </span>
              <span className="font-cinzel text-xs tracking-widest text-[#C99742] uppercase font-semibold">
                LEEDS
              </span>
            </div>
            <p className="text-xs text-[#A39A8B] leading-relaxed">
              Italian Restaurant · Bar · Pizzeria located at 9-11 Bridge End, Leeds LS1 7HG. Celebrating traditional Neapolitan stone oven pizzas, handcrafted pasta ribbons, and authentic regional Italian hospitality.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E5B869] pt-2">
              <Star className="w-4 h-4 fill-[#E5B869]" />
              <span className="font-semibold">{RESTAURANT_INFO.rating}{' '}Stars</span>
              <span className="text-[#8E8474]">· Over{' '}{RESTAURANT_INFO.reviewCount}{' '}Google Reviews</span>
            </div>
          </div>

          {/* Quick Navigation Links - Scrolls cleanly without modifying URL */}
          <div className="lg:col-span-2">
            <div className="text-xs font-cinzel uppercase tracking-widest text-[#E5B869] font-semibold mb-4">
              Explore
            </div>
            <ul className="space-y-2 text-xs text-[#DFD9CC]">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.target}
                    onClick={(e) => handleScrollToSection(e, link.target)}
                    className="hover:text-[#E5B869] transition-colors cursor-pointer block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="lg:col-span-3">
            <div className="text-xs font-cinzel uppercase tracking-widest text-[#E5B869] font-semibold mb-4">
              Opening Times
            </div>
            <div className="space-y-2 text-xs text-[#A39A8B]">
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-[#F8E7C9] font-mono">14:00 – 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Mon – Thu:</span>
                <span className="text-[#F8E7C9] font-mono">16:00 – 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Fri – Sat:</span>
                <span className="text-[#F8E7C9] font-mono">12:00 – 22:00</span>
              </div>
              <p className="text-[11px] text-[#8E8474] pt-2 border-t border-[#221E1A]">
                Last kitchen orders 30 minutes before close.
              </p>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-cinzel uppercase tracking-widest text-[#E5B869] font-semibold mb-4">
              Find Us
            </div>
            <div className="space-y-2.5 text-xs text-[#B8B0A2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C99742] shrink-0 mt-0.5" />
                <span>9-11 Bridge End, Leeds LS1 7HG, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C99742] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#E5B869]">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Newsletter VIP Club */}
            <div className="pt-3">
              <div className="text-xs font-medium text-[#DFD9CC] mb-1.5">
                Italian Food & Wine Newsletter
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#161412] border border-[#2C2621] rounded px-3 py-2 text-xs text-[#F8E7C9] focus:outline-none focus:border-[#C99742] flex-1"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#C99742] text-[#100F0D] text-xs font-semibold rounded hover:bg-[#D8A651] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
              {newsletterSuccess && (
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Subscribed! (Demo feedback)</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-14 pt-8 border-t border-[#201C18] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8474]">
          <div>
            {'© '}{new Date().getFullYear()}{' '}Viva Italian Restaurant Bar & Pizzeria. Design concept demo — not the official website.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with Italian passion{' '}<Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-0.5" />{' '}for Leeds
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#1C1814] hover:bg-[#2A241E] text-[#DFD9CC] hover:text-[#E5B869] border border-[#2C2621] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
