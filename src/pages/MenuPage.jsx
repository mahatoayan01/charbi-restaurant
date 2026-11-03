import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Sparkles, Check, ShoppingBag } from "lucide-react";
import { restaurantConfig } from "../config/restaurant";
import { useCart } from "../context/CartContext";
import { getMenuItems } from "../lib/storage";

export default function MenuPage() {
  const [items, setItems] = useState(restaurantConfig.menuItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all"); // 'all', 'veg', 'non-veg'
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    document.title = "Dine-in & Takeaway Menu | CHARBI Restaurant RR Nagar";
    window.scrollTo(0, 0);

    // Fetch dynamic menu from storage (supports owner updates in demo/firestore mode)
    getMenuItems().then((data) => {
      if (data && data.length) setItems(data);
    });
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    // Hidden toggle from admin
    if (item.isAvailable === false) return false;

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    // Diet filter
    const matchesDiet =
      dietFilter === "all" ||
      (dietFilter === "veg" && item.isVeg) ||
      (dietFilter === "non-veg" && !item.isVeg);

    // Search query
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDiet && matchesSearch;
  });

  return (
    <div className="pt-24 pb-24 bg-cream-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-dark-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-widest">
            AUTHENTIC NAATI SPECIALTIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mt-2 mb-3">
            Our Feasting Menu
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 max-w-2xl mx-auto">
            Traditional military hotel recipes crafted with hand-crushed masalas, pure desi ghee,
            and 100% fresh halal cuts. No artificial food coloring.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search biryani, kebab, gojju..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all text-dark-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-dark-900"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Diet Filter (Veg / Non-Veg) */}
            <div className="flex items-center gap-1.5 bg-cream-100 p-1 rounded-xl self-stretch md:self-auto justify-center">
              <button
                type="button"
                onClick={() => setDietFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dietFilter === "all"
                    ? "bg-white text-dark-900 shadow-sm"
                    : "text-gray-600 hover:text-dark-900"
                }`}
              >
                All Dishes
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("non-veg")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dietFilter === "non-veg"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-dark-900"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Non-Veg Only</span>
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("veg")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dietFilter === "veg"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-dark-900"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Pure Veg</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {restaurantConfig.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-cream-100 text-dark-900 hover:bg-cream-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8">
            <p className="font-serif text-xl font-bold text-dark-900 mb-2">
              No dishes found matching your selection
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Try adjusting your search terms or dietary filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setDietFilter("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-cream-200 hover:border-brand-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isChefSpecial && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Chef's Special
                      </span>
                    )}
                    {item.isPopular && !item.isChefSpecial && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-500 text-white shadow-md">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                    <span
                      className={`block w-3 h-3 rounded-full ${
                        item.isVeg ? "bg-emerald-600" : "bg-red-600"
                      }`}
                      title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg font-bold text-dark-900 group-hover:text-brand-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif font-black text-xl text-brand-600 shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to order action */}
                  <div className="pt-4 border-t border-cream-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500 capitalize">
                      {item.category.replace("-", " ")}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(item, 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-md active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating cart pill if items in cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-40 animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-2xl font-bold text-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>View Cart ({cartCount})</span>
          </button>
        </div>
      )}
    </div>
  );
}

