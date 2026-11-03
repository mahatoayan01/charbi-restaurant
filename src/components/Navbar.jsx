import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { restaurantConfig, getLiveRestaurantStatus } from "../config/restaurant";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const status = getLiveRestaurantStatus();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Location & Timings", path: "/location" },
    { name: "Contact & Table", path: "/contact" },
  ];

  const isHome = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-dark-900 border-b border-cream-200"
            : "bg-gradient-to-b from-dark-950/80 via-dark-950/40 to-transparent py-4 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <span className="font-serif font-black text-2xl tracking-tighter">C</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-2xl font-black tracking-wide leading-none ${
                    isScrolled || !isHome ? "text-brand-600" : "text-white"
                  }`}
                >
                  {restaurantConfig.name}
                </span>
                <span
                  className={`text-[10px] tracking-widest font-semibold uppercase ${
                    isScrolled || !isHome ? "text-dark-900/70" : "text-cream-200"
                  }`}
                >
                  RR Nagar • Bengaluru
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? "text-brand-500 font-bold"
                        : isScrolled || !isHome
                        ? "text-dark-900/80 hover:text-brand-600"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Live status badge (Desktop) */}
              <div
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                  }`}
                />
                <span>{status.statusText}</span>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="View Order Cart"
                className={`relative p-2.5 rounded-full transition-all ${
                  isScrolled || !isHome
                    ? "bg-cream-100 hover:bg-cream-200 text-dark-900"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Online CTA */}
              <Link
                to="/order"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                Order Online
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-all ${
                  isScrolled || !isHome
                    ? "bg-cream-100 text-dark-900"
                    : "bg-white/10 text-white"
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-dark-950/60 backdrop-blur-md animate-fade-in">
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-cream-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center font-serif font-black text-xl">
                    C
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-dark-900 leading-tight">
                      {restaurantConfig.name}
                    </h3>
                    <p className="text-[11px] text-gray-500">RR Nagar, Bengaluru</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-dark-900 rounded-lg hover:bg-cream-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Live Status */}
              <div className="mt-4">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border ${status.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                    }`}
                  />
                  <span>{status.statusText}</span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      location.pathname === link.path
                        ? "bg-brand-50 text-brand-600 font-bold"
                        : "text-dark-900 hover:bg-cream-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/order"
                  className="px-4 py-3 rounded-xl text-base font-bold bg-brand-500 text-white shadow-md text-center mt-2"
                >
                  Order Online Now
                </Link>
              </div>
            </div>

            {/* Quick Contact & Footer Info */}
            <div className="pt-6 border-t border-cream-200 space-y-3">
              <a
                href={restaurantConfig.contact.phoneTel}
                className="flex items-center gap-3 text-sm text-dark-900 font-medium p-2 rounded-lg hover:bg-cream-100"
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span>{restaurantConfig.contact.phoneFormatted}</span>
              </a>
              <Link
                to="/location"
                className="flex items-center gap-3 text-sm text-dark-900 font-medium p-2 rounded-lg hover:bg-cream-100"
              >
                <MapPin className="w-4 h-4 text-brand-500" />
                <span className="truncate">Halagevaderahalli Double Road, RR Nagar</span>
              </Link>
              <div className="pt-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-brand-600"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Owner Login & Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
