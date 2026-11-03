import React, { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";
import { restaurantConfig } from "../../config/restaurant";

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cream-200 text-dark-900 mb-2">
            <Camera className="w-3.5 h-3.5 text-brand-600" />
            <span>VISUAL TASTE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark-900">
            A Glimpse of the Feast
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Piping hot biryani pots, fiery roast dishes, and cozy casual dining along Double Road.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantConfig.gallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-elevated transition-all ${
                index === 0 || index === 5 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover min-h-[220px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-300">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-base leading-tight mt-1">{item.title}</h4>
                <p className="text-xs text-cream-200/80 mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/90">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-dark-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-dark-950/70 text-white hover:bg-brand-500 transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-dark-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-bold text-saffron-300">
                  {activeImage.category}
                </span>
                <h3 className="font-serif font-bold text-xl">{activeImage.title}</h3>
                <p className="text-xs text-cream-200/70 mt-1">{activeImage.description}</p>
              </div>
              <span className="text-xs text-cream-200/50 italic shrink-0">
                CHARBI • RR Nagar, Bengaluru
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

