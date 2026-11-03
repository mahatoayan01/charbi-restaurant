import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Bike,
  Store,
  Utensils,
  CreditCard,
  Banknote,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { triggerConfetti } from "../lib/confetti";
import { restaurantConfig } from "../config/restaurant";
import { useCart } from "../context/CartContext";
import { createOrder, createPayment } from "../lib/storage";
import { processPayment, isRazorpayConfigured } from "../lib/razorpay";

export default function OrderPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    taxes,
    cartTotal,
  } = useCart();
  const navigate = useNavigate();

  // Order Flow State
  const [orderType, setOrderType] = useState("Delivery"); // 'Delivery', 'Pickup', 'Dine-in'
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD', 'UPI', 'CARD'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    document.title = "Order Online | CHARBI Restaurant RR Nagar Bengaluru";
    window.scrollTo(0, 0);
  }, []);

  // Compute active delivery fee based on order type
  const activeDeliveryFee = orderType === "Delivery" ? deliveryFee : 0;
  const activeGrandTotal = cartSubtotal + activeDeliveryFee + taxes;

  const handleInputChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your feast cart is empty! Please add items from our menu first.");
      navigate("/menu");
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      alert("Please provide your name and phone number so we can reach you.");
      return;
    }

    if (orderType === "Delivery" && !customer.address.trim()) {
      alert("Please provide your delivery address in RR Nagar or nearby area.");
      return;
    }

    setIsProcessing(true);

    try {
      const generatedOrderId = `CHB-${Math.floor(1000 + Math.random() * 9000)}`;

      // Step 1: Process Payment through Abstraction Layer
      const paymentResult = await processPayment({
        amount: activeGrandTotal,
        orderId: generatedOrderId,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        method: paymentMethod,
      });

      // Step 2: Create Order Record in Database / Local Storage
      const newOrder = await createOrder({
        id: generatedOrderId,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email || "guest@charbi.com",
        customerAddress:
          orderType === "Delivery"
            ? `${customer.address} ${customer.landmark ? `(Landmark: ${customer.landmark})` : ""}`
            : orderType === "Pickup"
            ? "Takeaway Counter Pickup"
            : "Dine-in Table Service",
        orderType: orderType,
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg,
        })),
        subtotal: cartSubtotal,
        deliveryFee: activeDeliveryFee,
        taxes: taxes,
        total: activeGrandTotal,
        status: "New",
        paymentMethod: paymentResult.method,
        paymentStatus: paymentResult.status,
        transactionId: paymentResult.transactionId,
        notes: customer.notes || "",
      });

      // Step 3: Create Linked Payment Record in Database / Local Storage
      await createPayment({
        id: paymentResult.transactionId,
        orderId: newOrder.id,
        customerName: customer.name,
        amount: activeGrandTotal,
        method: paymentResult.method,
        status: paymentResult.status,
      });

      // Step 4: Clear cart & trigger celebratory confetti
      clearCart();
      setConfirmedOrder(newOrder);

      // Trigger Confetti
      try {
        triggerConfetti();
      } catch (e) {
        // Confetti fallback
      }
    } catch (err) {
      console.error("Order processing error:", err);
      alert(err.message || "Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  /* -------------------------------------------------------------
   * ORDER CONFIRMATION SCREEN
   * -----------------------------------------------------------*/
  if (confirmedOrder) {
    return (
      <div className="pt-24 pb-24 bg-cream-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-elevated text-center space-y-6 animate-fade-in">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-dark-900 mt-3">
                Your Feast is Being Prepared!
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Order Tracking ID: <b className="text-brand-600 font-mono text-base">#{confirmedOrder.id}</b>
              </p>
            </div>

            {/* Estimated Time Strip */}
            <div className="bg-cream-100/70 p-4 rounded-2xl flex items-center justify-center gap-3 text-sm text-dark-900 font-semibold">
              <Clock className="w-5 h-5 text-brand-600" />
              <span>
                Estimated {confirmedOrder.orderType === "Delivery" ? "Delivery" : "Ready"} Time: <b>35 – 45 Minutes</b>
              </span>
            </div>

            {/* Order Summary Receipt */}
            <div className="border border-cream-200 rounded-2xl p-6 text-left space-y-4 bg-cream-50/50">
              <h3 className="font-serif font-bold text-base text-dark-900 pb-3 border-b border-cream-200">
                Order Receipt
              </h3>

              <div className="space-y-2 text-sm">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>
                      {item.name} × <b>{item.quantity}</b>
                    </span>
                    <span className="font-semibold text-dark-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-cream-200 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Order Type:</span>
                  <span className="font-bold text-dark-900">{confirmedOrder.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-bold text-dark-900">{confirmedOrder.customerName} ({confirmedOrder.customerPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-bold text-dark-900">{confirmedOrder.customerAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-bold text-dark-900">{confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})</span>
                </div>
                <div className="flex justify-between text-base font-black text-dark-900 pt-2 border-t border-cream-200">
                  <span>Total Paid / Payable:</span>
                  <span className="text-brand-600">₹{confirmedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                Return to Home
              </Link>
              <a
                href={restaurantConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                Track via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * CART CHECKOUT FORM
   * -----------------------------------------------------------*/
  return (
    <div className="pt-24 pb-24 bg-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-dark-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-widest">
            DIRECT FROM THE KITCHEN
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black mt-2">
            Online Order & Checkout
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto mt-1">
            Order authentic Naati delights with zero aggregator commission markups.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {cart.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl border border-cream-200 text-center shadow-soft">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-brand-500 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif font-black text-2xl text-dark-900 mb-2">
              Your Feast Cart is Empty
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Explore our slow-cooked mutton biryani, spicy chicken ghee roast, and crispy kebabs to begin ordering!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm shadow-md transition-all"
            >
              <Utensils className="w-4 h-4" />
              <span>Browse Restaurant Menu</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Customer Details & Order Options (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Order Type Selection */}
                <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft">
                  <h3 className="font-serif font-bold text-lg text-dark-900 mb-4">
                    1. Choose Order Type
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType("Delivery")}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        orderType === "Delivery"
                          ? "border-brand-500 bg-brand-50 text-brand-800 font-bold shadow-sm"
                          : "border-cream-200 hover:border-cream-300 text-gray-700"
                      }`}
                    >
                      <Bike className="w-6 h-6 mb-1 text-brand-600" />
                      <span className="text-sm">Doorstep Delivery</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">35–45 mins</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType("Pickup")}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        orderType === "Pickup"
                          ? "border-brand-500 bg-brand-50 text-brand-800 font-bold shadow-sm"
                          : "border-cream-200 hover:border-cream-300 text-gray-700"
                      }`}
                    >
                      <Store className="w-6 h-6 mb-1 text-emerald-600" />
                      <span className="text-sm">Counter Takeaway</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">20–25 mins</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType("Dine-in")}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        orderType === "Dine-in"
                          ? "border-brand-500 bg-brand-50 text-brand-800 font-bold shadow-sm"
                          : "border-cream-200 hover:border-cream-300 text-gray-700"
                      }`}
                    >
                      <Utensils className="w-6 h-6 mb-1 text-amber-600" />
                      <span className="text-sm">Dine-in Pre-order</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">At restaurant</span>
                    </button>
                  </div>
                </div>

                {/* 2. Customer Contact & Address Info */}
                <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
                  <h3 className="font-serif font-bold text-lg text-dark-900">
                    2. Customer Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Praveen Gowda"
                        value={customer.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500 bg-cream-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98450 12345"
                        value={customer.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500 bg-cream-50/50"
                      />
                    </div>
                  </div>

                  {orderType === "Delivery" && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Delivery Address (RR Nagar & nearby) *
                        </label>
                        <textarea
                          name="address"
                          required
                          rows="2"
                          placeholder="e.g. Flat 302, Green Glen Apts, BEML 5th Stage, RR Nagar"
                          value={customer.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500 bg-cream-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Nearby Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          placeholder="e.g. Near Gopalan Arcade / Opposite Park"
                          value={customer.landmark}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500 bg-cream-50/50"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Cooking & Delivery Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Extra spicy, extra onion salan, ring the bell once"
                      value={customer.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500 bg-cream-50/50"
                    />
                  </div>
                </div>

                {/* 3. Payment Method Selection */}
                <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft">
                  <h3 className="font-serif font-bold text-lg text-dark-900 mb-4">
                    3. Payment Method
                  </h3>

                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "COD"
                          ? "border-brand-500 bg-brand-50/60"
                          : "border-cream-200 hover:border-cream-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="accent-brand-500 w-4 h-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-emerald-600" />
                            <span className="font-bold text-sm text-dark-900">
                              Cash on Delivery / Pay at Counter
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Pay in cash or scan delivery partner's UPI QR upon arrival.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">Recommended</span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "UPI"
                          ? "border-brand-500 bg-brand-50/60"
                          : "border-cream-200 hover:border-cream-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="UPI"
                          checked={paymentMethod === "UPI"}
                          onChange={() => setPaymentMethod("UPI")}
                          className="accent-brand-500 w-4 h-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-600" />
                            <span className="font-bold text-sm text-dark-900">
                              UPI Instant Payment (GPay, PhonePe, Paytm)
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {isRazorpayConfigured
                              ? "Live Razorpay UPI integration active."
                              : "Instant verified checkout in Demo / Test mode."}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-600">Fast & Zero Contact</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Cart Summary & Checkout Button (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                    <h3 className="font-serif font-bold text-lg text-dark-900">
                      Your Feast ({cart.length} items)
                    </h3>
                    <Link
                      to="/menu"
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      + Add More
                    </Link>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm py-2 border-b border-cream-100 last:border-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              item.isVeg ? "bg-emerald-600" : "bg-red-600"
                            }`}
                          />
                          <span className="font-semibold text-dark-900 truncate">
                            {item.name}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2 bg-cream-100 rounded-lg px-2 py-0.5 border border-cream-200">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-dark-900 p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-dark-900 p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-brand-600 text-sm w-14 text-right">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculation Breakdown */}
                  <div className="pt-4 border-t border-cream-200 space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-bold text-dark-900">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Partner Fee</span>
                      <span className="font-bold text-dark-900">
                        {activeDeliveryFee === 0 ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          `₹${activeDeliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-bold text-dark-900">₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-dark-900 pt-3 border-t border-cream-200">
                      <span>Grand Total</span>
                      <span className="text-brand-600">₹{activeGrandTotal}</span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>Place Order (₹{activeGrandTotal})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Safe & hygienic sealed packaging guaranteed</span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
