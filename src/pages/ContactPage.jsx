import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CalendarCheck,
  Send,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { restaurantConfig } from "../config/restaurant";
import { createReservation } from "../lib/storage";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "13:00",
    guests: "4",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedId, setBookedId] = useState("");

  useEffect(() => {
    document.title = "Contact & Table Booking | CHARBI Restaurant RR Nagar Bengaluru";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createReservation({
        ...formData,
        guests: parseInt(formData.guests, 10) || 2,
      });

      setBookedId(res.id);
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        time: "13:00",
        guests: "4",
        message: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to send reservation. Please call us directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-cream-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-dark-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-widest">
            CONNECT WITH CHARBI
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mt-2 mb-3">
            Contact & Table Booking
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 max-w-2xl mx-auto">
            Reserve your table for a memorable family lunch, order catering for private parties,
            or speak directly with our front desk.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Connect Cards */}
            <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-6">
              <h2 className="font-serif font-bold text-xl text-dark-900">
                Direct Restaurant Channels
              </h2>

              {/* Call */}
              <a
                href={restaurantConfig.contact.phoneTel}
                className="flex items-start gap-4 p-4 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors border border-cream-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Phone & Orders</span>
                  <p className="text-base font-bold text-dark-900 group-hover:text-brand-600 transition-colors">
                    {restaurantConfig.contact.phoneFormatted}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Instant response during service hours</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={restaurantConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 transition-colors border border-emerald-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase">WhatsApp Chat</span>
                  <p className="text-base font-bold text-dark-900 group-hover:text-emerald-700 transition-colors">
                    Chat with Kitchen Desk
                  </p>
                  <p className="text-xs text-emerald-700/80 mt-0.5">Quick table booking & takeaway enquiries</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${restaurantConfig.contact.email}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors border border-cream-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-dark-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Email</span>
                  <p className="text-base font-bold text-dark-900 truncate group-hover:text-brand-600 transition-colors">
                    {restaurantConfig.contact.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Events, catering & feedback</p>
                </div>
              </a>

              {/* Physical Address */}
              <div className="pt-4 border-t border-cream-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Physical Address</span>
                    <p className="text-sm text-dark-900 font-medium leading-relaxed mt-0.5">
                      {restaurantConfig.address.formatted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-cream-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">Follow on Social</span>
                <div className="flex items-center gap-3">
                  <a
                    href={restaurantConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-cream-100 hover:bg-brand-500 hover:text-white flex items-center justify-center transition-all text-dark-900"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={restaurantConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-cream-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all text-dark-900"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={restaurantConfig.googleMaps.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-cream-100 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-all text-dark-900"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Table Reservation & Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white border border-cream-200 shadow-soft">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-black text-2xl text-dark-900">
                    Table Request Received!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you! Your booking reference is <b>#{bookedId}</b>. Our team has received
                    your reservation and will confirm via WhatsApp/SMS shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-dark-900">
                      Reserve a Table or Send an Inquiry
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Fill out your details below. Requests appear directly on the owner dashboard!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Praveen Gowda"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98450 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      />
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Number of Guests *
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      >
                        <option value="1">1 Person (Solo diner)</option>
                        <option value="2">2 Persons (Couple)</option>
                        <option value="4">4 Persons (Family / Friends)</option>
                        <option value="6">6 Persons (Small Gathering)</option>
                        <option value="8">8 Persons (Party)</option>
                        <option value="12">12+ Persons (Large Feast)</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      />
                    </div>

                    {/* Preferred Slot */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                      >
                        <optgroup label="Lunch Service (11:30 AM - 4:00 PM)">
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM (Peak Lunch)</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="14:30">02:30 PM</option>
                        </optgroup>
                        <optgroup label="Dinner Service (7:00 PM - 11:00 PM)">
                          <option value="19:30">07:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="20:30">08:30 PM (Peak Dinner)</option>
                          <option value="21:00">09:00 PM</option>
                          <option value="21:30">09:30 PM</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests or Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Special Requests / Dietary Notes (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      placeholder="e.g. Need high chair for child, pre-order 2 mutton biryanis, outdoor table preference..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm Table Reservation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

