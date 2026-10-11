import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Search, Check, Utensils, Heart, Plus, Minus } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/restaurantData.ts';
import { initFadeUp } from '../utils/animations.ts';

interface MenuSectionProps {
  onOpenBookingModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenBookingModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'V' | 'VG' | 'GF'>('all');
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({});

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }
  }, []);

  // Filter items according to active tab, search query, and dietary requirements
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.italianName && item.italianName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);

      // Dietary match
      const matchesDietary =
        dietaryFilter === 'all' ||
        (item.dietary && item.dietary.includes(dietaryFilter as any));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  // Order calculation for selected items
  const orderSummary = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;
    Object.entries(selectedItems).forEach(([itemId, qty]) => {
      if (qty > 0) {
        const item = MENU_ITEMS.find((m) => m.id === itemId);
        if (item) {
          totalItems += qty;
          const p = typeof item.price === 'number' && item.price > 0 ? item.price : 7.50;
          totalPrice += p * qty;
        }
      }
    });
    return { totalItems, totalPrice };
  }, [selectedItems]);

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      return { ...prev, [itemId]: current > 0 ? 0 : 1 };
    });
  };

  const handleIncrement = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  return (
    <section id="menu" className="py-24 bg-[#100F0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Il Nostro Menù Tradizionale</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Real Italian Menu</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            Full Menu & Authentic Prices
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base leading-relaxed">
            Hot and cold starters, a wide variety of fresh pasta dishes, delicious main courses, and a great selection of stone-baked pizzas crafted by hand at 9-11 Bridge End, Leeds.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-12 bg-[#161412] border border-[#26211C] rounded-2xl p-4 sm:p-6 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-thin border-b border-[#221E1A]">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D8A651] to-[#E5B869] text-[#100F0D] font-bold shadow-md'
                      : 'bg-[#1D1915] text-[#DFD9CC] hover:text-[#FFFFFF] hover:bg-[#26211C] border border-[#2C2621]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] hidden sm:inline ${isActive ? 'text-[#3E2B0F]' : 'text-[#8E8474]'}`}>
                    ({cat.label})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Filters Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8E8474] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizza, pasta, carbonara, tiramisù..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1612] border border-[#2C2621] rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-[#F8E7C9] placeholder-[#736B5E] focus:outline-none focus:border-[#C99742] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8474] hover:text-[#F8E7C9]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-[#8E8474] shrink-0 mr-1">Dietary:</span>
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'V', label: 'Vegetarian (V)' },
                { id: 'VG', label: 'Vegan (VG)' },
                { id: 'GF', label: 'Gluten-Free (GF)' },
              ].map((diet) => {
                const isActive = dietaryFilter === diet.id;
                return (
                  <button
                    key={diet.id}
                    onClick={() => setDietaryFilter(diet.id as any)}
                    className={`px-3 py-1.5 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#C99742]/20 text-[#E5B869] border border-[#C99742]/50 font-medium'
                        : 'bg-[#1A1612] text-[#A39A8B] hover:text-[#DFD9CC] border border-transparent'
                    }`}
                  >
                    {diet.label}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Menu Items Grid */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => {
            // Uncompromising price calculation: Tiramisù is ALWAYS £7.50, Panna Cotta £6.95, etc.
            const rawPrice = typeof item.price === 'number' && item.price > 0
              ? item.price
              : (item.id === 'dol-1' ? 7.50 : item.id === 'dol-2' ? 6.95 : 7.20);
            const priceFormatted = `£${rawPrice.toFixed(2)}`;
            const quantity = selectedItems[item.id] || 0;

            return (
              <div
                key={item.id}
                className="menu-item-card group bg-[#161412] border border-[#26211C] hover:border-[#C99742]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Food Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#201C18]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent opacity-80" />

                    {/* Special Note / Recommendation */}
                    {(item.isChefSpecial || item.specialNote) && (
                      <div className="absolute top-3 left-3 bg-[#1A1612]/95 backdrop-blur-sm border border-[#C99742]/60 text-[#F8E7C9] px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3 h-3 text-[#E5B869]" />
                        <span>{item.specialNote || "Chef Recommendation"}</span>
                      </div>
                    )}

                    {/* Price Tag in GBP in image corner */}
                    <div className="absolute bottom-3 right-3 bg-[#100F0D]/95 border border-[#C99742]/60 px-3 py-1 rounded-md text-sm font-serif font-bold text-[#F8E7C9] shadow-2xl z-10">
                      {priceFormatted}
                    </div>
                  </div>

                  {/* Guaranteed Visible Price Badge Between Image and Title */}
                  <div className="px-5 pt-4 pb-1 flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#221E1A] border border-[#C99742]/40 text-xs font-serif font-bold text-[#E5B869] shadow-sm">
                      {priceFormatted}
                    </span>
                    {item.dietary && item.dietary.length > 0 && (
                      <div className="flex items-center gap-1">
                        {item.dietary.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#1C1814] text-[#A39A8B] border border-[#2C2621]"
                          >
                            {d === 'V' ? 'Vegetarian' : d === 'VG' ? 'Vegan' : 'Gluten-Free'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title & Italian Subtitle */}
                  <div className="px-5 pt-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#F8E7C9] group-hover:text-[#E5B869] transition-colors">
                        {item.name}
                      </h3>
                      {/* Price repetition beside title for ultimate clarity */}
                      <span className="font-serif text-base font-bold text-[#F8E7C9] shrink-0">
                        {priceFormatted}
                      </span>
                    </div>

                    {item.italianName && (
                      <div className="text-xs text-[#C99742] font-cinzel italic tracking-wide mt-0.5">
                        {item.italianName}
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p className="mt-2.5 text-xs text-[#A39A8B] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Add to Table / Quantity Selector */}
                <div className="px-5 pt-4 pb-5 mt-4 border-t border-[#221E1A] flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-[#E5B869]">
                    {priceFormatted}
                  </span>

                  {quantity > 0 ? (
                    <div className="flex items-center gap-2 bg-[#221E1A] border border-[#C99742]/50 rounded-lg p-1">
                      <button
                        onClick={(e) => handleDecrement(item.id, e)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-[#181512] text-[#F8E7C9] hover:bg-[#C99742] hover:text-[#100F0D] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#F8E7C9] px-2 font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => handleIncrement(item.id, e)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-[#181512] text-[#F8E7C9] hover:bg-[#C99742] hover:text-[#100F0D] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleItem(item.id)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#DFD9CC] bg-[#1E1A16] hover:bg-[#C99742] hover:text-[#100F0D] border border-[#2C2621] hover:border-[#C99742] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Table</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Floating Table Order Bar */}
        {orderSummary.totalItems > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-[#1A1612]/95 border-2 border-[#C99742] rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C99742] text-[#100F0D] flex items-center justify-center font-bold text-sm font-mono">
                {orderSummary.totalItems}
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-[#F8E7C9]">
                  {orderSummary.totalItems} {orderSummary.totalItems === 1 ? 'Dish Selected' : 'Dishes Selected'}
                </div>
                <div className="text-xs font-mono font-bold text-[#E5B869]">
                  Total: £{orderSummary.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedItems({})}
                className="text-xs text-[#8E8474] hover:text-[#DFD9CC] px-3 py-2 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 shadow-lg cursor-pointer"
              >
                Reserve Table Now
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
