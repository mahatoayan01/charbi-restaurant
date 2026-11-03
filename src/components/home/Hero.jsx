import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Utensils, CalendarCheck, ShieldCheck, MapPin } from "lucide-react";
import { restaurantConfig, getLiveRestaurantStatus } from "../../config/restaurant";

export default function Hero() {
  const status = getLiveRestaurantStatus();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=2000&q=85"
          alt="Charbi Authentic Naati Biryani and Ghee Roast"
          className="w-full h-full object-cover scale-105 transform animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/75 to-dark-950/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        {/* Live Status Pill & Google Rating Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-6 animate-fade-in">
          {/* Live Open Status */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${
              status.isOpen
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-red-500/20 text-red-300 border-red-500/40"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"
              }`}
            />
            <span>{status.statusText}</span>
          </div>

          {/* Google Maps Review Badge */}
          <a
            href={restaurantConfig.googleMaps.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-cream-100 transition-colors shadow-sm"
          >
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-white">{restaurantConfig.ratings.google.rating}</span>
            <span className="text-white/80">({restaurantConfig.ratings.google.totalReviews}+ Google Reviews)</span>
          </a>
        </div>

        {/* Main Title & Brand */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-xl">
          CHARBI
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-cream-100/90 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
          Best Casual Dining Restaurant in RR Nagar, Bengaluru
        </p>
        <p className="text-sm sm:text-base text-cream-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {restaurantConfig.tagline}. Authentic slow-cooked mutton, bold village masalas,
          fragrant Seeraga Samba biryanis, and comforting Karnataka countryside feasts.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Utensils className="w-5 h-5" />
            <span>Explore Menu & Prices</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-5 h-5 text-saffron-300" />
            <span>Reserve a Table</span>
          </Link>
        </div>

        {/* Location & Delivery Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-cream-200/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-400" />
            <span>BEML 5th Stage, Halagevaderahalli Double Road</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Fresh Daily Halal Meat</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Order on:</span>
            <span className="font-bold text-white">Direct</span> •
            <span className="font-bold text-white">Swiggy</span> •
            <span className="font-bold text-white">Zomato</span>
          </div>
        </div>
      </div>
    </section>
  );
}

