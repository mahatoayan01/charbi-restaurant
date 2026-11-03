import React from "react";
import { Link } from "react-router-dom";
import { Phone, Navigation, ShoppingBag } from "lucide-react";
import { restaurantConfig } from "../config/restaurant";
import { useCart } from "../context/CartContext";

export default function MobileStickyBar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-cream-200 px-4 py-2.5 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={restaurantConfig.contact.phoneTel}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-dark-900 bg-cream-100 hover:bg-cream-200 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-brand-600 mb-0.5" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        {/* Directions Button */}
        <a
          href={restaurantConfig.googleMaps.placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-dark-900 bg-cream-100 hover:bg-cream-200 active:scale-95 transition-all"
        >
          <Navigation className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold">Directions</span>
        </a>

        {/* Order Online / Cart */}
        <Link
          to="/order"
          className="relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-white bg-brand-500 hover:bg-brand-600 active:scale-95 shadow-md transition-all"
        >
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold">Order Online</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1 w-5 h-5 rounded-full bg-dark-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
