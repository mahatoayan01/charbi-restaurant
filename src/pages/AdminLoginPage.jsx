import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { useAuth, DEMO_CREDENTIALS } from "../context/AuthContext";
import { restaurantConfig } from "../config/restaurant";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isDemoMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Owner Login | CHARBI Restaurant RR Nagar";
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4 pt-24 pb-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-cream-200">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center mx-auto mb-4 font-serif font-black text-3xl shadow-lg">
            C
          </div>
          <h1 className="font-serif text-2xl font-black text-dark-900">
            {restaurantConfig.name} Owner Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Restricted administrative access for orders, payments & menu management.
          </p>
        </div>

        {/* Demo Mode Helper Banner */}
        {isDemoMode && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Demo Mode Active</span>
            </div>
            <p className="text-[11px] text-amber-800/80">
              Zero setup required. Click below to auto-fill demo owner credentials:
            </p>
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="w-full py-1.5 px-3 bg-amber-200/70 hover:bg-amber-300 text-amber-900 font-bold rounded-lg text-xs transition-colors"
            >
              Auto-Fill Demo Credentials
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              Owner Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@charbirestaurant.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-brand-500 text-sm bg-cream-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Owner Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-cream-200 text-center">
          <a
            href="/"
            className="text-xs text-gray-500 hover:text-dark-900 font-semibold"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}

