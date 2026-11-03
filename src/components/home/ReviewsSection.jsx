import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, PenLine } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = restaurantConfig.reviews;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-cream-50 border-t border-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Google Score Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              COMMUNITY VOICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark-900 mt-2">
              Loved by Bengaluru Foodies
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Authentic reviews straight from customers who frequent our casual dining tables in RR Nagar.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft flex items-center gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-4xl text-dark-900">
                  {restaurantConfig.ratings.google.rating}
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Google Rating</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on <b>{restaurantConfig.ratings.google.totalReviews}+</b> verified reviews
              </p>
            </div>

            <div className="border-l border-cream-200 pl-4 space-y-1.5">
              <a
                href={restaurantConfig.googleMaps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div>
                <a
                  href={restaurantConfig.googleMaps.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-900 hover:text-brand-600"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Write a review</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, index) => {
              const isCenter = index === currentIndex;
              return (
                <div
                  key={rev.id}
                  className={`p-7 rounded-3xl bg-white border border-cream-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between ${
                    index === currentIndex ? "ring-2 ring-brand-500" : ""
                  }`}
                >
                  <div>
                    {/* Stars & Quote */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-brand-300 opacity-60" />
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                      "{rev.review}"
                    </p>
                  </div>

                  <div>
                    {rev.favoriteDish && (
                      <div className="mb-4 inline-block px-2.5 py-1 rounded-md bg-cream-100 text-[11px] font-semibold text-brand-700">
                        Dish mentioned: {rev.favoriteDish}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-3 border-t border-cream-100">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border border-cream-300"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-dark-900">{rev.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{rev.source}</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevReview}
              className="p-3 rounded-full bg-white border border-cream-200 shadow hover:bg-cream-100 text-dark-900 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-6 bg-brand-500" : "bg-cream-300 hover:bg-cream-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextReview}
              className="p-3 rounded-full bg-white border border-cream-200 shadow hover:bg-cream-100 text-dark-900 transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
