import React from "react";
import { Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DemoModeBadge({ className = "" }) {
  const { isDemoMode } = useAuth();

  if (!isDemoMode) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100/90 text-amber-900 border border-amber-300 shadow-sm ${className}`}
      title="Running with zero-setup local storage and seeded test data."
    >
      <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
      <span>Demo Mode</span>
    </div>
  );
}

