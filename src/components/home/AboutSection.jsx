import React from "react";
import { Link } from "react-router-dom";
import { Award, Flame, HeartHandshake, CheckCircle2 } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

export default function AboutSection() {
  return (
    <section className="py-20 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase (Images Grid) */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80"
                  alt="Slow cooked Mutton Dum Biryani at Charbi"
                  className="rounded-3xl shadow-lg object-cover h-56 w-full transform hover:scale-102 transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80"
                  alt="Spicy Chicken Ghee Roast"
                  className="rounded-3xl shadow-lg object-cover h-64 w-full transform hover:scale-102 transition-transform"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
                  alt="Charbi Casual Dining Ambience in RR Nagar"
                  className="rounded-3xl shadow-lg object-cover h-64 w-full transform hover:scale-102 transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
                  alt="Hot Ragi Mudde and Country Chicken Saaru"
                  className="rounded-3xl shadow-lg object-cover h-56 w-full transform hover:scale-102 transition-transform"
                />
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-brand-500 text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 text-saffron-300" />
              </div>
              <div>
                <p className="font-serif font-black text-2xl leading-none">4.4 ★</p>
                <p className="text-xs text-cream-100 font-medium mt-1">
                  780+ Real Google Reviews in RR Nagar
                </p>
              </div>
            </div>
          </div>

          {/* Story & Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
              <Award className="w-3.5 h-3.5" />
              <span>THE CHARBI HERITAGE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
              Honest Karnataka Naati Flavours, Born for Meat Lovers.
            </h2>

            <p className="text-base text-gray-700 leading-relaxed">
              Nestled along Halagevaderahalli Double Road in BEML 5th Stage, <b>CHARBI</b> was
              founded on a simple, uncompromising promise: to serve authentic Karnataka military hotel
              style feasts prepared with genuine passion, home-ground spices, and unadulterated fresh meat.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              We reject commercial gravy bases and artificial colors. Instead, our chefs slow-roast
              Byadgi chilies in desi ghee, crush whole Tellicherry black peppercorns, and simmer our mutton
              for hours until it yields effortlessly to the fork. Whether you’re dipping steaming Ragi Mudde
              into fiery Naati Koli Saaru or savoring our signature Seeraga Samba Biryani, every bite is a
              celebration of rich regional culinary tradition.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-dark-900">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Zero Artificial Food Colors</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-dark-900">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>100% Fresh Daily Halal Cuts</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-dark-900">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Fragrant Seeraga Samba Rice</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-dark-900">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Pocket-Friendly Family Dining</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/menu"
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                View Full Menu
              </Link>
              <Link
                to="/location"
                className="px-6 py-3 bg-cream-200 hover:bg-cream-300 text-dark-900 font-bold rounded-xl text-sm transition-all"
              >
                Find Our Restaurant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

