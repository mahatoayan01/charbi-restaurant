import React from "react";
import { Flame, UtensilsCrossed, Users, Clock, ShieldCheck } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

const iconMap = {
  Flame: Flame,
  UtensilsCrossed: UtensilsCrossed,
  Users: Users,
  Clock: Clock,
};

export default function HighlightsSection() {
  return (
    <section className="py-16 bg-white border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
            THE CHARBI DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark-900 mt-2">
            Why Bengaluru Meat Lovers Choose Us
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            Every dish we serve is crafted with traditional recipes, authentic spice blends, and the warmest hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurantConfig.highlights.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-cream-50/80 border border-cream-200 hover:border-brand-300 hover:shadow-soft transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-500 text-brand-600 group-hover:text-white flex items-center justify-center transition-colors mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-dark-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cream-200/60 text-xs font-bold text-brand-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Guaranteed Quality</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
