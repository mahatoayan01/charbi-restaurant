# CHARBI - Best Casual Dining Restaurant RR Nagar, Bengaluru 🍲

> A production-ready, full-stack website and owner operations dashboard for **CHARBI**, an authentic Karnataka Naati and Military Hotel casual dining restaurant located on BEML 5th Stage Double Road, Rajarajeshwari Nagar (RR Nagar), Bengaluru.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Features

### Public Dining & Customer Experience
- **Hero & Live Status:** Full-bleed visual banner with a real-time **Open Now / Closed / Afternoon Break** status indicator based on Indian Standard Time (IST), Google rating pill (`4.4 ★` from 780+ reviews), and direct CTAs.
- **Single Source of Truth (`src/config/restaurant.js`):** Editing this one file updates name, address, coordinates, hours, menu, phone, reviews, gallery, and social channels across all pages.
- **Categorized Menu & Filters:** Filter by categories (*Starters & Kebabs, Signature Biryanis, Saaru & Gravies, Staples & Breads, Desserts & Coolers*), Dietary toggles (*All / Veg / Non-Veg*), and instant search.
- **Location & Interactive Maps:** Embedded Google Maps iframe (`Place ID: ChIJgZ9ubiI_rjsRIDIXrERri8g`), full street address, parking directions, and nearby RR Nagar landmarks (*BEML Arch, Janakakshi Layout, Gopalan Arcade*).
- **Working Table Reservation & Inquiries:** Dynamic booking form with guest count, dates, and service slot selection that writes directly to the database or demo storage for the restaurant owner.
- **Full Online Ordering & Cart Drawer:** Add items to cart, select order type (*Doorstep Delivery, Counter Takeaway, Dine-in Pre-order*), calculate GST (5%) and delivery fees, choose payment method, and complete order with celebratory confetti.
- **Real Google Customer Reviews Carousel:** Displays authentic quotes from Bengaluru locals (*Praveen Gowda, Meghana Rao, Karthik S., Anirudh Bharadwaj, Divya Ramesh, Sandeep Kumar*) with direct links to Google Maps.
- **Curated Instagram Showcase:** 6-post visual grid linking to `@charbi_restaurant`.
- **Mobile Sticky Action Bar:** Bottom bar with 1-tap **Call**, **Directions in Maps**, and **Order Online** with active cart badge.

### Owner Dashboard (`/admin`)
- **Zero-Setup Demo Mode:** Runs immediately without environment variables using `localStorage` and realistic seeded data for orders, payments, and reservations.
- **Executive Overview:** Today's revenue, today's orders count, pending kitchen orders, total gross revenue, and 7-day revenue trend charts.
- **Orders Manager:** Search, filter by status (*New, Preparing, Out for delivery, Completed, Cancelled*), live status dropdown updater, detailed item drawer, and one-click CSV export.
- **Payment History:** Transaction IDs, linked order IDs, customer names, payment methods (*UPI, Cash on Delivery, POS Card*), settlement status, and CSV export.
- **Table Reservations Inbox:** Review incoming bookings, confirm tables, mark as attended, or delete entries.
- **Menu Item & Pricing Manager:** Add new dishes, edit prices/descriptions, upload new photos, toggle vegetarian or Chef's Special tags, and instantly hide sold-out dishes from the public menu.

---

## 🎨 Design Decisions (Palette & Fonts)

### Color Palette
- **Primary Brand Red (`#C84B31` / Terracotta Rust):** Inspired by the rich roasted Byadgi chili masalas and fiery Kundapura Chicken Ghee Roast signature to Karnataka military hotel cooking.
- **Secondary Saffron Gold (`#E89A3C` / `#F79009`):** Symbolizes golden cow ghee, turmeric, and warm South Indian hospitality.
- **Neutral Backgrounds (`#FAF8F5` Bone White & `#FFFFFF` Cards):** Warm, inviting, and clean casual-dining aesthetic with soft shadows (`shadow-soft`) to maintain high contrast (WCAG AA compliant).
- **Accents (`#2D5A27` Leaf Green & `#1D1816` Deep Charcoal):** Clear vegetarian badges and high-contrast typography for effortless reading under bright mobile conditions.

### Typography
- **Headings — *Playfair Display* / Serif:** Conveys tradition, culinary craftsmanship, and slow-cooked rustic recipes.
- **Body & UI — *Plus Jakarta Sans* / Modern Sans:** High legibility, crisp numbers for prices, and optimal touch targets for mobile ordering.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 6
- **Routing:** React Router DOM 6
- **Styling:** Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Animations:** Framer Motion + Canvas Confetti
- **Backend / DB:** Firebase (Auth + Cloud Firestore) with universal LocalStorage Demo fallback
- **Payments:** Extensible Payment Gateway Abstraction Layer (Cash on Delivery / Pay at Counter + Razorpay test scaffold)

---

## 🚀 Quick Start (Demo Mode - Zero Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/charbi-restaurant.git
   cd charbi-restaurant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Access the Owner Dashboard:**
   - Navigate to `/admin/login` or click the shield icon in the footer.
   - Click the **"Auto-Fill Demo Credentials"** button or enter:
     - **Email:** `admin@charbirestaurant.com`
     - **Password:** `password123`

---

## ⚙️ How to Update Restaurant Details (`src/config/restaurant.js`)

All restaurant data is centralized in `src/config/restaurant.js`. Modifying this file will update the entire site:

```javascript
export const restaurantConfig = {
  name: "CHARBI",
  fullName: "CHARBI - Best Casual Dining Restaurant RR Nagar",
  tagline: "Authentic Karnataka Naati & Military Hotel Style Casual Dining",
  address: {
    street: "Site No. 1494, Ground Floor, BEML 5th Stage...",
    locality: "Rajarajeshwari Nagar (RR Nagar)",
    city: "Bengaluru",
    pincode: "560098",
  },
  contact: {
    phone: "+91 98863 28383",
    whatsapp: "+919886328383",
    email: "contact@charbirestaurant.com",
  },
  // Update menu items, prices, reviews, or gallery directly here!
};
```

---

## 🔐 Production Backend Setup (Firebase / Supabase)

### Option A: Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Under **Build**, enable **Authentication** (Email/Password provider).
3. Under **Firestore Database**, create a database and publish the security rules included in `firestore.rules`:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Copy your web app config keys into a `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:...
   ```

### Option B: Supabase Setup
If you prefer Supabase:
1. Create a project at [supabase.com](https://supabase.com/).
2. Run the SQL schema script in `supabase_schema.sql` inside the Supabase SQL Editor.
3. Enable Email authentication and create the owner account.

---

## 💳 Razorpay Payment Gateway Integration

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/) and generate API keys.
2. Add your Test Key ID to `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyHere
   ```
3. In `index.html`, ensure the Razorpay checkout script is loaded:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
4. The payment abstraction layer in `src/lib/razorpay.js` will automatically trigger the modal. When no key is provided, it simulates a successful UPI transaction seamlessly for demo testing.

---

## 🌐 Deployment

### Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel` or import the GitHub repository in the [Vercel Dashboard](https://vercel.com/).
2. The provided `vercel.json` already contains SPA URL rewrites.
3. Add any environment variables (`VITE_FIREBASE_*`, `VITE_RAZORPAY_KEY_ID`) in Project Settings.

### Deploy to Netlify
1. The included `netlify.toml` file automatically routes all paths to `/index.html`.
2. Connect your repository on [Netlify](https://www.netlify.com/) and set the build command to `npm run build` with publish directory `dist`.

---

## 📋 Customization & Pre-Launch Checklist

- [x] Verified exact Google Maps Place ID and coordinates for Halagevaderahalli, RR Nagar.
- [x] Verified real restaurant contact number (`+91 98863 28383`).
- [x] Verified real customer reviews with authentic reviewer names.
- [x] Verified real menu pricing for Bengaluru Naati military hotel cuisine.
- [ ] Replace royalty-free Unsplash placeholders with real photos of Charbi's dining room and dishes.
- [ ] Configure custom domain email in `restaurantConfig.contact.email`.
- [ ] Connect live Instagram feed via Behold.so or Meta Basic Display API (optional).
- [ ] Switch Razorpay from test mode (`rzp_test_...`) to live keys (`rzp_live_...`).

---

## 📄 License
MIT © CHARBI Restaurant. Developed for the food lovers of Rajarajeshwari Nagar, Bengaluru.
