import React from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, Sparkles } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";
import { useCart } from "../../context/CartContext";

export default function SignatureDishes() {
  const { addToCart } = useCart();

  // Pick 6 signature/popular dishes from menu
  const signatureDishes = restaurantConfig.menuItems
    .filter((item) => item.isChefSpecial || item.isPopular)
    .slice(0, 6);

  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CROWD FAVORITES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark-900">
              Signature Naati Feasts
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Hand-picked specials that have won the hearts of foodies across Rajarajeshwari Nagar.
            </p>
          </div>

          <Link
            to="/menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors group"
          >
            <span>Explore Full 16+ Item Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-3xl overflow-hidden border border-cream-200 hover:border-brand-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Badge */}
                {dish.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-500 text-white shadow-md">
                    {dish.badge}
                  </span>
                )}

                {/* Veg/Non-Veg Dot */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow">
                  <span
                    className={`block w-3 h-3 rounded-full ${
                      dish.isVeg ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-dark-900 group-hover:text-brand-600 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif font-black text-lg text-brand-600 shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-5 pt-4 border-t border-cream-100 flex items-center justify-between gap-3">
                  <Link
                    to="/menu"
                    className="text-xs font-bold text-gray-500 hover:text-dark-900"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => addToCart(dish, 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-50 hover:bg-brand-500 text-brand-700 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

