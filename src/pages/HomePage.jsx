import React, { useEffect } from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import HighlightsSection from "../components/home/HighlightsSection";
import SignatureDishes from "../components/home/SignatureDishes";
import GallerySection from "../components/home/GallerySection";
import ReviewsSection from "../components/home/ReviewsSection";
import InstagramSection from "../components/home/InstagramSection";
import HoursContactStrip from "../components/home/HoursContactStrip";
import ReservationCTA from "../components/home/ReservationCTA";
import DemoModeBadge from "../components/DemoModeBadge";

export default function HomePage() {
  useEffect(() => {
    document.title = "CHARBI | Best Casual Dining Restaurant RR Nagar, Bengaluru";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <HoursContactStrip />
      <AboutSection />
      <HighlightsSection />
      <SignatureDishes />
      <GallerySection />
      <ReviewsSection />
      <ReservationCTA />
      <InstagramSection />

      {/* Floating demo mode indicator */}
      <div className="fixed bottom-20 right-4 z-30 hidden md:block">
        <DemoModeBadge />
      </div>
    </main>
  );
}

