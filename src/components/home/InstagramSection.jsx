import React from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

/**
 * ==============================================================================
 * INSTAGRAM FEED SECTION
 * ==============================================================================
 * Currently driven by curated entries in `src/config/restaurant.js` for zero auth overhead.
 * 
 * HOW THE OWNER CAN CONNECT A LIVE INSTAGRAM FEED:
 * 1. Method A (No-Code Widget): Register on Behold.so, Curator.io, or Elfsight.
 *    Paste the generated embed widget script tag into this component.
 * 2. Method B (Official Meta Graph API): Create an app at developers.facebook.com,
 *    generate an Instagram Basic Display User Token, add `VITE_INSTAGRAM_TOKEN`
 *    to your environment variables, and fetch `https://graph.instagram.com/me/media`.
 * ==============================================================================
 */

export default function InstagramSection() {
  return (
    <section className="py-20 bg-white border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>{restaurantConfig.socialLinks.instagramHandle}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark-900">
              Follow Our Daily Sizzle
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Behind the scenes, fresh batches of mutton biryani, and weekend specials on Instagram.
            </p>
          </div>

          <a
            href={restaurantConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @charbi_restaurant</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {restaurantConfig.instagramFeed.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-100 shadow-sm block"
            >
              <img
                src={post.image}
                alt="Charbi Instagram Post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram className="w-6 h-6 mb-2 text-pink-400" />
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-sky-400" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
