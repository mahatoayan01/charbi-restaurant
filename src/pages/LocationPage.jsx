import React, { useEffect } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  Car,
  Phone,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { restaurantConfig, getLiveRestaurantStatus } from "../config/restaurant";

export default function LocationPage() {
  const status = getLiveRestaurantStatus();

  useEffect(() => {
    document.title = "Location & Opening Hours | CHARBI Restaurant RR Nagar Bengaluru";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-24 bg-cream-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-dark-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-widest">
            FIND OUR CASUAL DINING RESTAURANT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mt-2 mb-3">
            Location & Timings
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 max-w-2xl mx-auto">
            Conveniently located along BEML 5th Stage Double Road in Halagevaderahalli, RR Nagar.
            Ample street and two-wheeler parking available.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Address, Live Hours, Landmarks (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Status Card */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-100">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    CURRENT RESTAURANT STATUS
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                      }`}
                    />
                    <h2 className="font-serif font-black text-2xl text-dark-900">
                      {status.statusText}
                    </h2>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-2xl border text-xs font-semibold ${status.color}`}>
                  {status.message}
                </div>
              </div>

              {/* Weekly Opening Hours Table */}
              <div className="mt-6">
                <h3 className="font-serif font-bold text-base text-dark-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>Weekly Service Hours</span>
                </h3>
                <div className="divide-y divide-cream-100 text-sm">
                  {restaurantConfig.openingHours.map((slot) => {
                    const isClosed = slot.isClosed;
                    return (
                      <div
                        key={slot.day}
                        className="py-3 flex items-center justify-between"
                      >
                        <span className="font-semibold text-dark-900">{slot.day}</span>
                        {isClosed ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                            Closed (Weekly Off)
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            {slot.slots}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Address & Parking Details */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-dark-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <span>Address & Getting Here</span>
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {restaurantConfig.address.formatted}
                </p>
                <p className="text-xs text-brand-700 font-semibold mt-1">
                  Landmark: {restaurantConfig.address.landmark}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={restaurantConfig.googleMaps.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions in Google Maps</span>
                </a>
                <a
                  href={restaurantConfig.contact.phoneTel}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-dark-900 font-bold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call {restaurantConfig.contact.phoneFormatted}</span>
                </a>
              </div>

              {/* Parking & Amenities */}
              <div className="pt-4 border-t border-cream-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-dark-900 uppercase">Parking Availability</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Dedicated space for 2-wheelers directly in front; ample street car parking along Double Road.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-dark-900 uppercase">Seating Comfort</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Ground floor easy access with both casual indoor seating and breezy outdoor dining.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby RR Nagar Landmarks */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
              <h3 className="font-serif font-bold text-lg text-dark-900 mb-3">
                Key Nearby Landmarks in Rajarajeshwari Nagar
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {restaurantConfig.nearbyLandmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs"
                  >
                    <span className="font-bold text-dark-900 block truncate">{lm.name}</span>
                    <span className="text-gray-500 text-[11px]">{lm.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Iframe (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-soft p-3">
              <div className="rounded-2xl overflow-hidden h-[480px] lg:h-[620px] relative bg-cream-200">
                <iframe
                  title="CHARBI Restaurant Google Maps Location"
                  src={restaurantConfig.googleMaps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-gray-500">
                <span>Google Place ID: {restaurantConfig.googleMaps.placeId}</span>
                <a
                  href={restaurantConfig.googleMaps.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Full Screen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

