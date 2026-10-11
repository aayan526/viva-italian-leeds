import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu as MenuIcon, X, MapPin, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface NavbarProps {
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Hours & Location', href: '#location' },
    { name: 'Reserve', href: '#reserve' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Header Wrapper: Always stays at top on scroll */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
        {/* Top Welcome & Contact Ribbon (subtle collapse/compact on scroll if desired, kept seamless) */}
        <div
          className={`bg-[#181512]/95 backdrop-blur-md border-b border-[#C99742]/20 text-[#DFD9CC] text-xs px-4 transition-all duration-300 ${
            isScrolled ? 'py-1.5' : 'py-2'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5B869] animate-pulse"></span>
              <span className="font-medium text-[#F8E7C9]">VIVA Italian Restaurant & Pizzeria</span>
              <span className="text-[#8E8474] hidden sm:inline">·</span>
              <span className="hidden sm:inline text-[#B8B0A2]">
                9-11 Bridge End, Leeds LS1 7HG
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-[#E5B869]">
                <Star className="w-3.5 h-3.5 fill-[#E5B869]" />
                <span className="font-semibold">{RESTAURANT_INFO.rating}</span>
                {' '}
                <span className="text-[#8E8474]">(~598 Google reviews)</span>
              </span>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="hover:text-[#E5B869] transition-colors flex items-center gap-1 font-medium font-mono"
              >
                <Phone className="w-3 h-3 text-[#C99742]" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar: Always visible & sticky backdrop */}
        <header
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#100F0D]/95 backdrop-blur-md border-b border-[#C99742]/25 shadow-2xl py-3'
              : 'bg-[#100F0D]/85 backdrop-blur-md border-b border-[#C99742]/15 py-4'
          }`}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand: Original Client Logo ONLY (no fake text duplicate) */}
          <a
            href="#"
            className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99742] rounded-md transition-opacity hover:opacity-90"
            aria-label="VIVA Italian Restaurant & Pizzeria Leeds"
          >
            <img
              src="/client-images/logo.png"
              alt="VIVA Italian Restaurant & Pizzeria"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain brightness-110"
            />
          </a>

          {/* Desktop Nav Links (Visible on screens >= 1024px) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-[#DFD9CC] hover:text-[#F8E7C9] transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99742] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions & Menu Toggle: Supports Mobile, Tablet (< 1024px) and Desktop */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 md:space-x-4">
            
            {/* Phone link (Tablet & Desktop) */}
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden md:flex text-xs font-medium text-[#DFD9CC] hover:text-[#E5B869] transition-colors items-center gap-1.5 px-3 py-2 border border-[#C99742]/30 rounded-lg hover:border-[#C99742] hover:bg-[#C99742]/10"
              title="Call restaurant directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#C99742]" />
              <span className="font-mono">{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Reserve Table CTA */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:flex relative group overflow-hidden px-4 lg:px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-[#100F0D] bg-gradient-to-r from-[#D8A651] via-[#E5B869] to-[#C99742] shadow-[0_0_20px_rgba(216,166,81,0.25)] hover:shadow-[0_0_25px_rgba(216,166,81,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </span>
            </button>

            {/* Mobile-only Book button (< 640px) */}
            <button
              onClick={onOpenBookingModal}
              className="flex sm:hidden px-3 py-1.5 text-xs font-semibold uppercase text-[#100F0D] bg-[#E5B869] rounded hover:bg-[#D8A651] transition-colors cursor-pointer"
            >
              Book
            </button>

            {/* Hamburger Menu Button: Visible on ALL screens below 1024px (Mobile & Tablet 768px-1023px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="flex lg:hidden p-2 text-[#DFD9CC] hover:text-[#F8E7C9] rounded-lg hover:bg-[#221E1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99742] cursor-pointer"
            >
              <MenuIcon className="w-6 h-6 text-[#F8E7C9]" />
            </button>

          </div>
        </div>
      </header>
      </div>

      {/* Drawer Navigation for Mobile and Tablet (< 1024px) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#161412] border-l border-[#C99742]/30 h-full p-6 flex flex-col justify-between shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#2C2621]">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                  aria-label="VIVA Italian Restaurant & Pizzeria"
                >
                  <img
                    src="/client-images/logo.png"
                    alt="VIVA Italian Restaurant & Pizzeria"
                    className="h-8 w-auto object-contain brightness-110"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#DFD9CC] hover:text-[#FFFFFF] rounded-full bg-[#221E1A] border border-[#2C2621] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block px-4 py-3 text-base font-serif font-medium text-[#DFD9CC] hover:text-[#F8E7C9] hover:bg-[#201C18] rounded-lg transition-colors border border-transparent hover:border-[#C99742]/30"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Contact */}
            <div className="pt-6 border-t border-[#2C2621] space-y-4">
              <div className="text-xs text-[#A39A8B] space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C99742]" />
                  <span>9-11 Bridge End, Leeds LS1 7HG</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C99742]" />
                  <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="text-[#E5B869] font-mono">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] shadow-lg cursor-pointer"
              >
                Reserve Table Now
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
