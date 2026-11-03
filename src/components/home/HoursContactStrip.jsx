import React from "react";
import { Link } from "react-router-dom";
import { Clock, Phone, MapPin, Navigation, ArrowRight } from "lucide-react";
import { restaurantConfig, getLiveRestaurantStatus } from "../../config/restaurant";

export default function HoursContactStrip() {
  const status = getLiveRestaurantStatus();

  return (
    <section className="bg-dark-900 text-white py-10 border-y border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Live Timing Status */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-saffron-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-base">Service Hours</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    status.isOpen
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}
                >
                  {status.statusText}
                </span>
              </div>
              <p className="text-xs text-cream-200/80">
                Tue – Sun: 11:30 AM – 4:00 PM & 7:00 PM – 11:00 PM
              </p>
              <p className="text-[11px] text-red-300/80 mt-0.5">Monday Closed for Kitchen Prep</p>
            </div>
          </div>

          {/* Quick Call */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-brand-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif font-bold text-base block mb-1">Direct Call & Enquiries</span>
              <a
                href={restaurantConfig.contact.phoneTel}
                className="text-base font-bold text-brand-400 hover:text-brand-300 transition-colors block"
              >
                {restaurantConfig.contact.phoneFormatted}
              </a>
              <span className="text-[11px] text-cream-200/70">
                Call for instant table availability & parcel pre-orders
              </span>
            </div>
          </div>

          {/* Address & Direction CTA */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="font-serif font-bold text-base block mb-1">Double Road, RR Nagar</span>
              <p className="text-xs text-cream-200/80 line-clamp-1">
                BEML 5th Stage, Halagevaderahalli, Bengaluru
              </p>
              <div className="mt-2 flex items-center gap-4">
                <a
                  href={restaurantConfig.googleMaps.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-saffron-300 hover:text-white"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
                <Link
                  to="/location"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cream-200/70 hover:text-white"
                >
                  <span>More details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
