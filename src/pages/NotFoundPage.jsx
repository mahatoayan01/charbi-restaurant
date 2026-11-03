import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Utensils, Home, Compass } from "lucide-react";
import { restaurantConfig } from "../config/restaurant";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | CHARBI Restaurant RR Nagar";
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4 pt-24 pb-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center shadow-soft border border-cream-200">
        <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
          ERROR 404
        </span>

        <h1 className="font-serif text-3xl font-black text-dark-900 mt-1 mb-3">
          Feast Not Found
        </h1>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          The page or dish you're searching for seems to have moved off the menu.
          Head back to our home kitchen or explore the delicious specialties of RR Nagar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto px-5 py-3 bg-cream-100 hover:bg-cream-200 text-dark-900 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-brand-600" />
            <span>View Full Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
