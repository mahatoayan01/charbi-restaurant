import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { restaurantConfig } from "../config/restaurant";

export default function Footer() {
  return (
    <footer className="bg-dark-950 text-cream-100 pt-16 pb-28 md:pb-12 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-serif font-black text-2xl shadow-lg">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black text-white tracking-wide">
                  {restaurantConfig.name}
                </span>
                <span className="text-[10px] tracking-widest text-brand-300 uppercase font-semibold">
                  Casual Dining • RR Nagar
                </span>
              </div>
            </Link>
            <p className="text-sm text-cream-200/80 leading-relaxed">
              {restaurantConfig.tagline}. Renowned for authentic Karnataka countryside masalas,
              rich slow-cooked mutton, and comforting weekend biryani feasts.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={restaurantConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={restaurantConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={restaurantConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={restaurantConfig.googleMaps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-600 flex items-center justify-center transition-colors text-white"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-cream-200/70 hover:text-brand-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-cream-200/70 hover:text-brand-300 transition-colors">
                  Full Dine-In & Takeaway Menu
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-cream-200/70 hover:text-brand-300 transition-colors">
                  Order Online for Doorstep Delivery
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-cream-200/70 hover:text-brand-300 transition-colors">
                  Location & Live Status
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-200/70 hover:text-brand-300 transition-colors">
                  Table Booking & Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-cream-200/40 hover:text-brand-300 transition-colors inline-flex items-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Owner Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timing */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Service Hours</h4>
            <div className="space-y-2.5 text-sm text-cream-200/80">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-medium text-white">Tue – Sun:</span>
                <span className="text-right">
                  11:30 AM – 4:00 PM<br />7:00 PM – 11:00 PM
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-medium text-white">Monday:</span>
                <span className="text-red-400 font-semibold">Closed (Weekly Off)</span>
              </div>
              <p className="text-xs text-cream-200/60 pt-2">
                *Kitchen prepares fresh meat and stone-ground masalas daily for authentic flavor.
              </p>
            </div>
          </div>

          {/* Col 4: Visit & Reach */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Reach Us</h4>
            <div className="space-y-3 text-sm text-cream-200/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Site No. 1494, Ground Floor, BEML 5th Stage, Halagevaderahalli Double Road, RR Nagar, Bengaluru - 560098
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={restaurantConfig.contact.phoneTel}
                  className="hover:text-brand-300 font-semibold transition-colors"
                >
                  {restaurantConfig.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`mailto:${restaurantConfig.contact.email}`}
                  className="hover:text-brand-300 transition-colors"
                >
                  {restaurantConfig.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={restaurantConfig.googleMaps.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 hover:text-white"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/50 gap-4">
          <p>© {new Date().getFullYear()} {restaurantConfig.fullName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            <span>for the food lovers of Rajarajeshwari Nagar, Bengaluru</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
