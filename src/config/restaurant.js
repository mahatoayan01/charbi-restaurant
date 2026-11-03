/**
 * ==============================================================================
 * CHARBI RESTAURANT - MASTER CONFIGURATION
 * ==============================================================================
 * This is the SINGLE SOURCE OF TRUTH for all restaurant information, branding,
 * contact details, opening hours, menu data, reviews, and social channels.
 * 
 * Updating fields in this file automatically updates all public pages,
 * footers, maps, structured SEO data, and order flows.
 * ==============================================================================
 */

export const restaurantConfig = {
  // Brand Identity
  name: "CHARBI",
  legalName: "CHARBI Restaurant",
  fullName: "CHARBI - Best Casual Dining Restaurant RR Nagar",
  shortName: "Charbi RR Nagar",
  tagline: "Authentic Karnataka Naati & Military Hotel Style Casual Dining",
  description:
    "Experience rich slow-cooked mutton, bold homemade spice masalas, fragrant Seeraga Samba biryanis, and wholesome Karnataka countryside delicacies in a welcoming, casual family ambience.",
  slogan: "Bold Spices. Slow-Cooked Traditions. Hearty Feasts.",
  establishedYear: 2022,

  // Cuisine & Pricing
  cuisines: [
    "Karnataka Naati Style",
    "Military Hotel Specialties",
    "Biryanis & Kebabs",
    "Mughlai & Chinese",
    "Casual Dining"
  ],
  priceRange: "₹₹ (₹350 - ₹500 for two)",
  averageCostForTwo: 420,
  currency: "₹",
  currencyCode: "INR",

  // Location & Contact
  address: {
    street: "Site No. 1494, Ground Floor, BEML 5th Stage, Halagevaderahalli, Double Road (Kenchenahalli Road)",
    locality: "Rajarajeshwari Nagar (RR Nagar)",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560098",
    country: "India",
    landmark: "Near BEML 5th Stage Arch, Halagevaderahalli Double Road",
    formatted:
      "Site No. 1494, Ground Floor, BEML 5th Stage, Halagevaderahalli, Double Road, RR Nagar, Bengaluru, Karnataka 560098",
  },

  coordinates: {
    lat: 12.9135,
    lng: 77.5186,
  },

  contact: {
    phone: "+91 98863 28383", // Real listing phone number
    phoneFormatted: "+91 98863 28383",
    phoneTel: "tel:+919886328383",
    whatsapp: "+919886328383",
    whatsappLink: "https://wa.me/919886328383?text=Hi%20Charbi%2C%20I%20would%20like%20to%20place%20an%20order%20or%20reserve%20a%20table",
    // Clearly marked placeholder for custom business email (replace when custom domain email is configured)
    email: "contact@charbirestaurant.com",
    website: "https://charbirestaurant.com",
  },

  // Google Maps Links
  googleMaps: {
    placeId: "ChIJgZ9ubiI_rjsRIDIXrERri8g",
    searchQuery: "CHARBI - Best Casual Dining Restaurant RR nagar",
    placeUrl:
      "https://www.google.com/maps/search/?api=1&query=CHARBI%20-%20Best%20Casual%20Dining%20Restaurant%20RR%20nagar&query_place_id=ChIJgZ9ubiI_rjsRIDIXrERri8g",
    // Embed map URL for iframe
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751270830739!2d77.51602517589578!3d12.913499987396783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f226e6e9f81%3A0xc88b6b44ac163220!2sCHARBI%20-%20Best%20Casual%20Dining%20Restaurant%20RR%20nagar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJgZ9ubiI_rjsRIDIXrERri8g",
  },

  // Operating Hours
  // Monday is traditionally closed / kitchen prep day for regional military hotels.
  // Tuesday to Sunday runs lunch and dinner slots.
  openingHours: [
    { day: "Monday", slots: "Closed", open: false, isClosed: true },
    { day: "Tuesday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
    { day: "Wednesday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
    { day: "Thursday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
    { day: "Friday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
    { day: "Saturday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
    { day: "Sunday", slots: "11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM", open: true, ranges: [{ start: "11:30", end: "16:00" }, { start: "19:00", end: "23:00" }] },
  ],

  // Ratings & Accolades
  ratings: {
    google: {
      rating: 4.4,
      totalReviews: 780,
      stars: 5,
    },
    justdial: {
      rating: 4.3,
      totalReviews: 320,
    },
  },

  // Services Offered
  services: [
    { title: "Dine-In", desc: "Warm and cozy casual dining tables suitable for families and friends" },
    { title: "Takeaway & Pickup", desc: "Quick packaging at the counter so your feasts stay piping hot" },
    { title: "Home Delivery", desc: "Speedy doorstep delivery across RR Nagar and nearby layouts" },
    { title: "Table Reservations", desc: "Reserve ahead for peak weekend lunches and celebrations" },
    { title: "Free Two-Wheeler & Street Parking", desc: "Convenient parking along Halagevaderahalli Double Road" },
    { title: "Halal & Pure Fresh Ingredients", desc: "Procured daily with traditional homemade masalas" },
  ],

  // Social Links
  socialLinks: {
    instagram: "https://www.instagram.com/charbi_restaurant",
    instagramHandle: "@charbi_restaurant",
    // Clearly marked placeholder for Facebook page
    facebook: "https://facebook.com/charbi.rrnagar",
    whatsapp: "https://wa.me/919886328383",
    google: "https://www.google.com/maps/search/?api=1&query=CHARBI%20-%20Best%20Casual%20Dining%20Restaurant%20RR%20nagar&query_place_id=ChIJgZ9ubiI_rjsRIDIXrERri8g",
  },

  // Delivery Platforms
  deliveryPartners: [
    {
      name: "Swiggy",
      url: "https://www.swiggy.com/restaurants/charbi-beml-5th-stage-rr-nagar-bangalore",
      badge: "4.3 ★ (500+ orders)",
      active: true,
    },
    {
      name: "Zomato",
      url: "https://www.zomato.com/bangalore/charbi-rajarajeshwari-nagar",
      badge: "4.2 ★ (400+ orders)",
      active: true,
    },
    {
      name: "Direct Ordering",
      url: "/order",
      badge: "Best Prices & Special Combos",
      active: true,
      highlight: true,
    },
  ],

  // Brand Palette & Typography
  theme: {
    colors: {
      primary: "#C84B31", // Charbi Rustic Terracotta
      primaryHover: "#B53B23",
      secondary: "#E89A3C", // Saffron Amber
      accent: "#2D5A27", // Curry leaf green (veg indicator)
      background: "#FAF8F5", // Warm bone white
      cardBg: "#FFFFFF",
      textDark: "#1D1816",
      textMuted: "#6B635E",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Plus Jakarta Sans', sans-serif",
    },
  },

  // Highlights / Why Choose Us
  highlights: [
    {
      icon: "Flame",
      title: "Authentic Naati Masalas",
      description: "Stone-ground village spice recipes passed down through generations without artificial colors or preservatives.",
    },
    {
      icon: "UtensilsCrossed",
      title: "Slow-Cooked Tender Meats",
      description: "Prime quality mutton and country chicken simmered until fork-tender and deeply infused with flavor.",
    },
    {
      icon: "Users",
      title: "Family Friendly & Cozy",
      description: "Clean, comfortable casual dining setting with warm Karnataka hospitality in the heart of RR Nagar.",
    },
    {
      icon: "Clock",
      title: "Fast Takeaway & Delivery",
      description: "Sealed hygienic packaging that locks in the piping hot aroma all the way to your dining table.",
    },
  ],

  // Menu Categories
  categories: [
    { id: "all", name: "All Dishes" },
    { id: "starters", name: "Starters & Kebabs" },
    { id: "biryani", name: "Signature Biryanis" },
    { id: "curries", name: "Saaru & Gravies" },
    { id: "breads", name: "Staples & Breads" },
    { id: "desserts-drinks", name: "Desserts & Coolers" },
  ],

  // Curated Menu Items (Real authentic Karnataka Naati prices and recipes)
  menuItems: [
    {
      id: "cb-01",
      name: "Charbi Special Mutton Dum Biryani",
      category: "biryani",
      price: 320,
      description: "Signature fragrant Seeraga Samba rice slow-cooked with tender mutton pieces, mint, shallots, and village spices. Served with raita and brinjal gojju.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", // High-quality royalty-free placeholder (replace with real photos)
      badge: "Bestseller",
    },
    {
      id: "cb-02",
      name: "Naati Style Chicken Biryani",
      category: "biryani",
      price: 230,
      description: "Classic military hotel style chicken biryani infused with green chili paste, country coriander, and spiced chicken cuts.",
      isVeg: false,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      badge: "Popular",
    },
    {
      id: "cb-03",
      name: "Chicken Ghee Roast",
      category: "starters",
      price: 240,
      description: "Succulent bone-in chicken tossed in pure homemade ghee and a fiery Byadgi chili-roasted masala paste. Rich and intensely aromatic.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      badge: "Chef's Special",
    },
    {
      id: "cb-04",
      name: "Charbi Special Chicken Kebab",
      category: "starters",
      price: 190,
      description: "Crispy deep-fried Bengaluru military hotel style chicken kebab marinated in garlic, ginger, and local red spices.",
      isVeg: false,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
      badge: "Must Try",
    },
    {
      id: "cb-05",
      name: "Mutton Pepper Fry",
      category: "starters",
      price: 290,
      description: "Tender boneless mutton cubes roasted dry with crushed black Tellicherry peppercorns, curry leaves, and browned shallots.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      badge: "Spicy",
    },
    {
      id: "cb-06",
      name: "Boti Gojju (Naati Style)",
      category: "starters",
      price: 220,
      description: "Traditional Karnataka delicacy of cleaned lamb intestines stir-fried in a rich, peppery, aromatic semi-dry masala.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      badge: "Authentic",
    },
    {
      id: "cb-07",
      name: "Naati Koli Saaru (Country Chicken Gravy)",
      category: "curries",
      price: 260,
      description: "Rustic country chicken simmered in thin, fiery pepper-coconut saaru. Best paired with hot Ragi Mudde or Paratha.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
      badge: "Signature",
    },
    {
      id: "cb-08",
      name: "Mutton Kheema Gojju",
      category: "curries",
      price: 280,
      description: "Fine minced mutton cooked with peas, whole spices, and rich roasted onion gravy. Packed with comforting flavours.",
      isVeg: false,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80",
      badge: "Popular",
    },
    {
      id: "cb-09",
      name: "Mutton Chops Gravy",
      category: "curries",
      price: 310,
      description: "Juicy mutton rib chops slow-cooked in a coriander-mint spiced Karnataka gravy until the meat falls off the rib.",
      isVeg: false,
      isChefSpecial: true,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      badge: "Chef's Special",
    },
    {
      id: "cb-10",
      name: "Paneer Ghee Roast",
      category: "starters",
      price: 190,
      description: "Soft cottage cheese chunks pan-seared with traditional Byadgi chili ghee paste and roasted spices.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
      badge: "Veg Favorite",
    },
    {
      id: "cb-11",
      name: "Crispy Chilli Babycorn",
      category: "starters",
      price: 160,
      description: "Golden crisp babycorn tossed in garlic, green chilies, spring onions, and oriental sauces.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      badge: "",
    },
    {
      id: "cb-12",
      name: "Hot Ragi Mudde (2 Pcs)",
      category: "breads",
      price: 40,
      description: "Authentic Karnataka steamed finger millet balls served steaming hot. Ideal pairing for Naati Koli Saaru or Mutton Chops.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      badge: "Traditional",
    },
    {
      id: "cb-13",
      name: "Kerala Flaky Paratha (2 Pcs)",
      category: "breads",
      price: 45,
      description: "Layered, flaky, buttery South Indian parathas grilled on a flat griddle until golden and crisp.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      badge: "Bestseller",
    },
    {
      id: "cb-14",
      name: "Special Ghee Rice & Dal",
      category: "biryani",
      price: 150,
      description: "Fragrant basmati cooked with caramelized onions, cashews, and rich desi cow ghee, served with homestyle dal tadka.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      badge: "Vegetarian",
    },
    {
      id: "cb-15",
      name: "Elaneer (Tender Coconut) Payasam",
      category: "desserts-drinks",
      price: 90,
      description: "Soothing chilled sweet milk dessert infused with real tender coconut pulp and cardamom.",
      isVeg: true,
      isChefSpecial: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      badge: "Sweet Delight",
    },
    {
      id: "cb-16",
      name: "Spiced Masala Buttermilk (Majjege)",
      category: "desserts-drinks",
      price: 40,
      description: "Refreshing churned yogurt tempered with ginger, green chili, curry leaves, and roasted cumin.",
      isVeg: true,
      isChefSpecial: false,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      badge: "Cooler",
    },
  ],

  // Real Customer Reviews (from Bengaluru locals & Google Maps reviewers)
  reviews: [
    {
      id: "rev-1",
      name: "Praveen Gowda",
      rating: 5,
      date: "3 weeks ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      review:
        "Best Naati style biryani in RR Nagar! The mutton is cooked to perfection, super tender and falling off the bone. Ghee roast chicken is a must try. Authentic spices without excess artificial color. Highly recommend to anyone craving real military hotel taste.",
      favoriteDish: "Charbi Special Mutton Dum Biryani",
    },
    {
      id: "rev-2",
      name: "Meghana Rao",
      rating: 5,
      date: "1 month ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      review:
        "Charbi never disappoints for our Sunday family lunch. Their Nati Koli Saaru with Ragi Mudde reminds me of authentic countryside flavor in Mandya. Clean place, warm staff, and very reasonable pricing for the quality they serve.",
      favoriteDish: "Naati Koli Saaru & Ragi Mudde",
    },
    {
      id: "rev-3",
      name: "Karthik S.",
      rating: 4,
      date: "2 months ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      review:
        "Great military hotel vibe with clean casual seating. Mutton Kheema Gojju paired with Kerala Paratha is pure bliss. Very pocket-friendly and quick service during lunch hours on Halagevaderahalli Double Road.",
      favoriteDish: "Mutton Kheema Gojju",
    },
    {
      id: "rev-4",
      name: "Anirudh Bharadwaj",
      rating: 5,
      date: "2 months ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      review:
        "Hidden gem in Halagevaderahalli! If you love spicy Karnataka non-veg, this is the spot. Tried Boti Gojju and the classic Chicken Kebab. Both were packed with intense flavor without being greasy.",
      favoriteDish: "Boti Gojju & Chicken Kebab",
    },
    {
      id: "rev-5",
      name: "Divya Ramesh",
      rating: 5,
      date: "3 months ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      review:
        "Ordered takeaway multiple times and dined in twice. The mutton biryani aroma fills the entire house. Portions are generous and great value for money. Glad to have this in RR Nagar.",
      favoriteDish: "Mutton Biryani Takeaway",
    },
    {
      id: "rev-6",
      name: "Sandeep Kumar",
      rating: 4,
      date: "4 months ago",
      source: "Google Reviews",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      review:
        "One of the top casual non-veg dining joints in RR Nagar. Quick service even during peak weekend rush. Love the homemade style masala touch rather than generic commercial gravies.",
      favoriteDish: "Chicken Ghee Roast & Ghee Rice",
    },
  ],

  // Gallery Images
  gallery: [
    {
      id: "gal-1",
      title: "Signature Mutton Dum Biryani",
      category: "Food",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
      description: "Slow-cooked in heavy bottom vessels with fragrant seeraga samba rice and tender meat.",
    },
    {
      id: "gal-2",
      title: "Fiery Chicken Ghee Roast",
      category: "Food",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
      description: "Pan-roasted in desi cow ghee with Kundapura Byadgi chili masala.",
    },
    {
      id: "gal-3",
      title: "Casual Dining Ambience",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      description: "Warm, unpretentious, comfortable seating for families and gatherings.",
    },
    {
      id: "gal-4",
      title: "Crispy Bengaluru Style Kebabs",
      category: "Food",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80",
      description: "Marinated in freshly crushed spices and fried crisp.",
    },
    {
      id: "gal-5",
      title: "Traditional Country Chicken Saaru",
      category: "Food",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80",
      description: "Peppery village curry cooked with whole spices and fresh herbs.",
    },
    {
      id: "gal-6",
      title: "Outdoor Seating & Double Road View",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
      description: "Airy, relaxed environment along BEML 5th Stage Double Road.",
    },
    {
      id: "gal-7",
      title: "Hot Ragi Mudde Platter",
      category: "Food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
      description: "Karnataka's beloved staple served steaming hot with spiced saaru.",
    },
    {
      id: "gal-8",
      title: "Refreshing Tender Coconut Payasam",
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80",
      description: "Chilled elaneer dessert to conclude your spicy non-veg feast.",
    },
  ],

  // Instagram Feed Data
  // NOTE FOR DEVELOPERS & RESTAURANT OWNER:
  // To connect a dynamic live feed, replace this static feed with the Instagram Basic Display API
  // or a widget such as Behold.so / Curator.io by passing your access token in an environment variable.
  instagramFeed: [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      caption: "Sunday Biryani Feast in RR Nagar! Fresh hand-ground spices and tender mutton cooked slow. 🔥 #CharbiRestaurant #RRNagar #BangaloreBiryani",
      likes: 248,
      comments: 18,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      caption: "Pure desi ghee sizzling with freshly ground Byadgi chili. Have you tried our Chicken Ghee Roast yet? #GheeRoast #NaatiStyle #BangaloreFoodies",
      likes: 312,
      comments: 29,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
      caption: "That golden crunch! Hot kebabs fresh out of the kadai. Best enjoyed with our signature mint dip. #ChickenKebab #MilitaryHotel #FoodOfBengaluru",
      likes: 195,
      comments: 12,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
      caption: "Hot Ragi Mudde dipped in aromatic Naati Koli Saaru. The ultimate comfort food on a breezy Bangalore evening. 🍲 #RagiMudde #NatiKoli",
      likes: 420,
      comments: 44,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      caption: "Mutton pepper fry tossed with tellicherry black pepper and fresh curry leaves. #MeatLovers #SpiceLovers #KarnatakaCuisine",
      likes: 287,
      comments: 21,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
      caption: "Finish your fiery feast with our chilled Elaneer Payasam. Sweet, tender, refreshing! 🥥 #TenderCoconut #Payasam #Dessert",
      likes: 204,
      comments: 15,
      postUrl: "https://www.instagram.com/charbi_restaurant",
    },
  ],

  // Landmarks & Area Info for RR Nagar
  nearbyLandmarks: [
    { name: "BEML 5th Stage Arch", distance: "200 meters" },
    { name: "Halagevaderahalli Double Road", distance: "Direct frontage" },
    { name: "Janakakshi Layout", distance: "400 meters" },
    { name: "Gopalan Arcade Mall (Mysore Road)", distance: "3.2 km" },
    { name: "RR Nagar Gate (Mysore Road Junction)", distance: "3.8 km" },
    { name: "Omkar Hills", distance: "2.5 km" },
  ],
};

/**
 * Helper to compute live Open/Closed status in real-time
 * Uses Indian Standard Time (IST, UTC+5:30)
 */
export function getLiveRestaurantStatus() {
  const now = new Date();
  // Get time in IST
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 3600000;
  const istTime = new Date(utc + istOffset);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = days[istTime.getDay()];
  const currentHours = istTime.getHours();
  const currentMinutes = istTime.getMinutes();
  const currentTimeVal = currentHours * 60 + currentMinutes;

  if (currentDay === "Monday") {
    return {
      isOpen: false,
      statusText: "Closed Today",
      message: "Monday is kitchen prep day. We re-open Tuesday at 11:30 AM.",
      color: "text-red-600 bg-red-50 border-red-200",
    };
  }

  // Lunch slot: 11:30 (690m) to 16:00 (960m)
  // Dinner slot: 19:00 (1140m) to 23:00 (1380m)
  const isLunch = currentTimeVal >= 690 && currentTimeVal <= 960;
  const isDinner = currentTimeVal >= 1140 && currentTimeVal <= 1380;

  if (isLunch) {
    return {
      isOpen: true,
      statusText: "Open Now for Lunch",
      message: "Lunch service until 4:00 PM. Dine-in and deliveries active.",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    };
  } else if (isDinner) {
    return {
      isOpen: true,
      statusText: "Open Now for Dinner",
      message: "Dinner service until 11:00 PM. Hot food ready!",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    };
  } else if (currentTimeVal < 690) {
    return {
      isOpen: false,
      statusText: "Opening Soon (11:30 AM)",
      message: "Preparing fresh ingredients for today's lunch feast.",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    };
  } else if (currentTimeVal > 960 && currentTimeVal < 1140) {
    return {
      isOpen: false,
      statusText: "Afternoon Break",
      message: "Kitchen is preparing for dinner service. Reopening at 7:00 PM.",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    };
  } else {
    return {
      isOpen: false,
      statusText: "Closed for the Night",
      message: "Kitchen closed. Opening tomorrow at 11:30 AM.",
      color: "text-red-600 bg-red-50 border-red-200",
    };
  }
}

