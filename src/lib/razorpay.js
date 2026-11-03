/**
 * Razorpay & Local Payment Abstraction Layer
 * 
 * Secure design:
 * - Card details are never handled directly by our application.
 * - Test mode uses the Razorpay standard checkout script when a key is provided,
 *   or gracefully simulates a successful UPI/Card transaction in Demo mode.
 */

export const isRazorpayConfigured = Boolean(
  import.meta.env.VITE_RAZORPAY_KEY_ID &&
  import.meta.env.VITE_RAZORPAY_KEY_ID !== "rzp_test_your_key_id"
);

export async function processPayment({ amount, orderId, customerName, customerPhone, customerEmail, method }) {
  // 1. Cash on Delivery or Pay at Restaurant
  if (method === "COD" || method === "PAY_AT_RESTAURANT") {
    return {
      success: true,
      transactionId: `TXN-OFFLINE-${Date.now().toString(36).toUpperCase()}`,
      method: method === "COD" ? "Cash on Delivery" : "Pay at Restaurant",
      status: "Pending", // Settled upon delivery or at counter
      notes: "To be collected at delivery / counter",
    };
  }

  // 2. Razorpay Online Payment (UPI / Cards / NetBanking)
  if (isRazorpayConfigured && typeof window !== "undefined" && window.Razorpay) {
    return new Promise((resolve, reject) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(amount * 100), // In paise
        currency: "INR",
        name: "CHARBI Restaurant",
        description: `Order #${orderId} - RR Nagar, Bengaluru`,
        image: "/favicon.svg",
        prefill: {
          name: customerName,
          contact: customerPhone,
          email: customerEmail || "guest@charbirestaurant.com",
        },
        theme: {
          color: "#C84B31",
        },
        handler: function (response) {
          resolve({
            success: true,
            transactionId: response.razorpay_payment_id || `TXN-RZP-${Date.now()}`,
            method: "Razorpay (UPI/Card)",
            status: "Paid",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment was cancelled by the customer."));
          },
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay initiation error:", err);
        reject(err);
      }
    });
  }

  // 3. Demo / Simulation Mode for Online Payment (Instant UPI / QR Mock)
  // Provides realistic simulated experience for testing the order flow without live credentials
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `TXN-UPI-${Date.now().toString(36).toUpperCase()}`,
        method: method === "UPI" ? "UPI (GPay / PhonePe / Paytm)" : "Credit / Debit Card",
        status: "Paid",
        notes: "Demo Payment Simulation Verified",
      });
    }, 900);
  });
}
