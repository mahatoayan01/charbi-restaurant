import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, MessageCircle, Users, ArrowRight } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

export default function ReservationCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-saffron-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-6 border border-white/20">
          <Users className="w-4 h-4 text-saffron-300" />
          <span>FAMILY GATHERINGS & WEEKEND FEASTS</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
          Planning a Sunday Lunch or Special Gathering?
        </h2>

        <p className="text-base sm:text-lg text-cream-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Reserve your table in advance to skip the weekend lunch rush. We’ll keep your favorite
          mutton dum biryani and hot kebabs ready!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white text-brand-700 hover:bg-cream-100 font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-5 h-5 text-brand-600" />
            <span>Book a Table Online</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={restaurantConfig.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Instant WhatsApp Booking</span>
          </a>
        </div>
      </div>
    </section>
  );
}
