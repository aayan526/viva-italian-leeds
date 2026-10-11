import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Search, Check, Utensils } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/restaurantData.ts';
import { initFadeUp, initStaggerReveal } from '../utils/animations.ts';

interface MenuSectionProps {
  onOpenBookingModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenBookingModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({});
  const [showOrderFeedback, setShowOrderFeedback] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      initFadeUp(headerRef.current, { yOffset: 25, duration: 0.8 });
    }
  }, []);

  // Filter items based on category, dietary preference, and search
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Dietary match
      let matchesDietary = true;
      if (dietaryFilter === 'V') matchesDietary = item.dietary?.includes('V') || false;
      if (dietaryFilter === 'VG') matchesDietary = item.dietary?.includes('VG') || false;
      if (dietaryFilter === 'GF') matchesDietary = item.dietary?.includes('GF') || false;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.italianName && item.italianName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // Re-run stagger animation when filtered items change
  useEffect(() => {
    if (gridRef.current) {
      initStaggerReveal(gridRef.current, '.menu-item-card', {
        stagger: 0.08,
        yOffset: 24,
        duration: 0.6,
      });
    }
  }, [filteredItems, activeCategory, dietaryFilter]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    setShowOrderFeedback(`Added "${item.name}" to your table wishlist!`);
    setTimeout(() => setShowOrderFeedback(null), 3000);
  };

  const totalWishlistCount = Object.values(selectedItems).reduce((a, b) => a + b, 0);

  return (
    <section id="menu" className="py-24 bg-[#100F0D] relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#C99742]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8A651] mb-2">
            <span className="font-cinzel">Il Nostro Menu</span>
            <span aria-hidden="true" className="text-[#8E8474]">·</span>
            <span>Authentic Dining</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8E7C9]">
            The Taste of Italy in Leeds
          </h2>

          <p className="mt-4 text-[#A39A8B] text-sm sm:text-base leading-relaxed">
            From wood-fired sourdough pizzas with blistered crusts to bronze-die handmade pasta ribbons, every dish is prepared fresh to order using finest imported Italian provisions.
          </p>

          {/* Feedback Toast */}
          {showOrderFeedback && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#221E1A] border border-[#C99742] text-[#F8E7C9] text-xs rounded-full shadow-lg transition-all animate-bounce">
              <Check className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>{showOrderFeedback}</span>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-12 space-y-5">
          {/* Category Tabs (Functional segmented buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#181512] border border-[#2C2621] rounded-xl max-w-3xl mx-auto">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D8A651] to-[#C99742] text-[#100F0D] font-semibold shadow-md'
                      : 'text-[#DFD9CC] hover:text-[#F8E7C9] hover:bg-[#221E1A]'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filter & Search Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto pt-2">
            {/* Dietary Filter Segmented Control */}
            <div className="flex items-center gap-1.5 text-xs text-[#B8B0A2]">
              <span className="text-xs uppercase tracking-wider text-[#8E8474] mr-1 hidden sm:inline">Dietary:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'V', label: 'Vegetarian' },
                { id: 'VG', label: 'Vegan' },
                { id: 'GF', label: 'Gluten-Free' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setDietaryFilter(diet.id)}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors cursor-pointer ${
                    dietaryFilter === diet.id
                      ? 'bg-[#2A241E] text-[#E5B869] border border-[#C99742]/40 font-medium'
                      : 'bg-[#181512] text-[#8E8474] hover:text-[#DFD9CC] border border-transparent'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#8E8474] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pizza, pasta, wine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181512] border border-[#2C2621] focus:border-[#C99742] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F8E7C9] placeholder-[#8E8474] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8474] hover:text-[#F8E7C9]"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-item-card group bg-[#161412] border border-[#26211C] hover:border-[#C99742]/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
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

                  {/* Chef Special Marker */}
                  {item.isChefSpecial && (
                    <div className="absolute top-3 left-3 bg-[#1A1612]/90 backdrop-blur-sm border border-[#C99742]/50 text-[#F8E7C9] px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 text-[#E5B869]" />
                      <span>Chef's Choice</span>
                    </div>
                  )}

                  {/* Price Tag in GBP on image */}
                  <div className="absolute bottom-3 right-3 bg-[#141210]/95 backdrop-blur-sm border border-[#C99742]/40 px-3 py-1 rounded-md text-sm font-serif font-bold text-[#F8E7C9] shadow-lg">
                    £{item.price.toFixed(2)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title and Prominent Price Display */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-bold text-[#F8E7C9] group-hover:text-[#E5B869] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.italianName && (
                        <div className="text-xs italic text-[#C99742]/80 mt-0.5">
                          {item.italianName}
                        </div>
                      )}
                    </div>
                    {/* Explicitly rendered £ price beside title */}
                    <div className="shrink-0 text-right">
                      <span className="font-serif font-bold text-base text-[#E5B869]">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#A39A8B] line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Clean Dietary metadata + Action */}
              <div className="px-5 pb-5 pt-3 border-t border-[#221E1A] flex items-center justify-between">
                {/* Clean unboxed dietary indicator */}
                <div className="text-xs text-[#8E8474] flex items-center gap-1.5">
                  {item.dietary && item.dietary.length > 0 ? (
                    item.dietary.map((d) => (
                      <span key={d} className="font-medium text-[#C99742]">
                        {d === 'V' && 'Vegetarian'}
                        {d === 'VG' && 'Vegan'}
                        {d === 'GF' && 'GF Option'}
                      </span>
                    ))
                  ) : (
                    <span>Italian Classic</span>
                  )}
                </div>

                {/* Wishlist / Order button */}
                <button
                  onClick={() => handleSelectItem(item)}
                  className="text-xs font-medium text-[#E5B869] hover:text-[#F8E7C9] bg-[#221E1A] hover:bg-[#2C2621] px-3 py-1.5 rounded-md border border-[#C99742]/20 hover:border-[#C99742] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Utensils className="w-3 h-3" />
                  <span>{selectedItems[item.id] ? `Selected (${selectedItems[item.id]})` : 'Add to Table'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#8E8474]">
            <Utensils className="w-10 h-10 mx-auto text-[#C99742]/40 mb-3" />
            <p className="text-base text-[#DFD9CC]">No dishes found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-3 text-xs text-[#E5B869] hover:underline"
            >
              Reset filters to view full menu
            </button>
          </div>
        )}

        {/* Bottom Menu Action Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#181512] via-[#201C18] to-[#181512] border border-[#C99742]/30 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#F8E7C9]">
              Ready to taste authentic Italian cooking?
            </h4>
            <p className="text-xs sm:text-sm text-[#A39A8B] mt-1">
              Reserve your table at 9-11 Bridge End, Leeds. Walk-ins are also welcome!
              {totalWishlistCount > 0 && ` (${totalWishlistCount} dishes selected in your wishlist)`}
            </p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="shrink-0 px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-wider text-[#100F0D] bg-gradient-to-r from-[#D8A651] to-[#E5B869] hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            Reserve Table Now
          </button>
        </div>

      </div>
    </section>
  );
};
