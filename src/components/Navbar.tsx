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
    { name: 'Contact', href: '#reserve' },
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
      {/* Top Demo Disclaimer Ribbon */}
      <div className="bg-[#1A1612] border-b border-[#C99742]/20 text-[#DFD9CC] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C99742] animate-pulse"></span>
            <span className="font-medium text-[#F8E7C9]">Design Concept Demo</span>
            <span className="text-[#8E8474] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#B8B0A2]">
              Viva Italian Restaurant Bar & Pizzeria · 9-11 Bridge End, Leeds LS1
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-[#E5B869]">
              <Star className="w-3.5 h-3.5 fill-[#E5B869]" />
              <span className="font-semibold">{RESTAURANT_INFO.rating}</span>
              {' '}
              <span className="text-[#8E8474]">(~600 Google reviews)</span>
            </span>
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="hover:text-[#E5B869] transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-[#C99742]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#100F0D]/95 backdrop-blur-md border-b border-[#C99742]/15 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-[#100F0D]/90 via-[#100F0D]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99742] rounded-sm"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#F8E7C9] group-hover:text-[#E5B869] transition-colors">
                VIVA
              </span>
              <span className="font-cinzel text-xs tracking-widest text-[#C99742] uppercase font-semibold">
                LEEDS
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-[#A39A8B] font-light">
              Restaurant · Bar · Pizzeria
            </span>
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

          {/* Right Actions & Menu Toggle: Supports Mobile, Tablet (768px-1023px) and Desktop */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 md:space-x-4">
            {/* Phone link (Tablet & Desktop) */}
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden md:flex text-xs font-medium text-[#DFD9CC] hover:text-[#E5B869] transition-colors items-center gap-1.5 px-3 py-2 border border-[#C99742]/30 rounded-md hover:border-[#C99742] hover:bg-[#C99742]/10"
              title="Call restaurant directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#C99742]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Reserve Table CTA (Tablet & Desktop) */}
            <button
              onClick={onOpenBookingModal}
              className="hidden md:flex relative group overflow-hidden px-4 lg:px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase text-[#100F0D] bg-gradient-to-r from-[#D8A651] via-[#E5B869] to-[#C99742] shadow-[0_0_20px_rgba(216,166,81,0.25)] hover:shadow-[0_0_25px_rgba(216,166,81,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </span>
            </button>

            {/* Mobile-only Book button (< 768px) */}
            <button
              onClick={onOpenBookingModal}
              className="flex md:hidden px-3 py-1.5 text-xs font-semibold uppercase text-[#100F0D] bg-[#E5B869] rounded hover:bg-[#D8A651] transition-colors cursor-pointer"
            >
              Book
            </button>

            {/* Hamburger Menu Button: Visible on ALL screens below 1024px (Mobile & Tablet) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main navigation menu"
              aria-expanded={mobileMenuOpen}
              className="flex lg:hidden p-2 text-[#DFD9CC] hover:text-[#F8E7C9] rounded-md hover:bg-[#221E1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99742] cursor-pointer"
            >
              <MenuIcon className="w-6 h-6 text-[#F8E7C9]" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Navigation for Mobile and Tablet (< 1024px) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#141210] border-l border-[#C99742]/20 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#2C2621]">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#F8E7C9]">VIVA</div>
                  <div className="text-[11px] text-[#A39A8B] tracking-wider uppercase">
                    Leeds LS1 7HG
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#DFD9CC] hover:text-[#F8E7C9] rounded-md hover:bg-[#221E1A] transition-colors focus-visible:ring-2 focus-visible:ring-[#C99742] cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-lg font-serif text-[#DFD9CC] hover:text-[#E5B869] transition-colors py-2 border-b border-[#221E1A]/60 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-[#C99742]/50 font-sans">→</span>
                  </a>
                ))}
              </nav>

              {/* Quick Details in Drawer */}
              <div className="mt-8 pt-6 border-t border-[#2C2621] space-y-3 text-xs text-[#B8B0A2]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C99742] shrink-0" />
                  <span>9-11 Bridge End, Leeds LS1 7HG</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C99742] shrink-0" />
                  <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#E5B869]">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-[#E5B869] pt-1">
                  <Star className="w-4 h-4 fill-[#E5B869]" />
                  <span className="font-semibold text-sm">4.7 / 5.0</span>
                  {' '}
                  <span className="text-[#8E8474]">(~600 Google reviews)</span>
                </div>
              </div>
            </div>

            {/* Bottom Booking Button */}
            <div className="pt-6 border-t border-[#2C2621] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 px-4 rounded-md text-sm font-semibold tracking-wider uppercase text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
              <p className="text-[11px] text-center text-[#8E8474]">
                Design Concept Demo · Official site vivaitalianrestaurant.co.uk
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
