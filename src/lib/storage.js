import { restaurantConfig } from "../config/restaurant";
import { isFirebaseConfigured, db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const STORAGE_KEYS = {
  ORDERS: "charbi_orders_v1",
  PAYMENTS: "charbi_payments_v1",
  RESERVATIONS: "charbi_reservations_v1",
  MENU_ITEMS: "charbi_menu_items_v1",
};

// Seed sample orders for realistic dashboard visualization
const SEED_ORDERS = [
  {
    id: "CHB-9021",
    customerName: "Praveen Gowda",
    customerPhone: "+91 98450 12345",
    customerAddress: "Flat 204, BEML Layout 5th Stage, RR Nagar",
    orderType: "Delivery",
    items: [
      { id: "cb-01", name: "Charbi Special Mutton Dum Biryani", price: 320, quantity: 2 },
      { id: "cb-03", name: "Chicken Ghee Roast", price: 240, quantity: 1 },
      { id: "cb-15", name: "Elaneer Payasam", price: 90, quantity: 2 },
    ],
    subtotal: 1060,
    deliveryFee: 40,
    taxes: 53,
    total: 1153,
    status: "Completed",
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
    notes: "Please make biryani extra spicy, extra salan",
  },
  {
    id: "CHB-9022",
    customerName: "Meghana Rao",
    customerPhone: "+91 99801 88231",
    customerAddress: "Dine-in Table #4",
    orderType: "Dine-in",
    items: [
      { id: "cb-07", name: "Naati Koli Saaru", price: 260, quantity: 1 },
      { id: "cb-12", name: "Hot Ragi Mudde (2 Pcs)", price: 40, quantity: 2 },
      { id: "cb-04", name: "Charbi Special Chicken Kebab", price: 190, quantity: 1 },
    ],
    subtotal: 530,
    deliveryFee: 0,
    taxes: 26,
    total: 556,
    status: "Preparing",
    paymentMethod: "Pay at Restaurant",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    notes: "Table 4 - Serve hot with cut lemons",
  },
  {
    id: "CHB-9023",
    customerName: "Karthik Srinivas",
    customerPhone: "+91 97423 55109",
    customerAddress: "Takeaway Counter Pickup",
    orderType: "Pickup",
    items: [
      { id: "cb-08", name: "Mutton Kheema Gojju", price: 280, quantity: 1 },
      { id: "cb-13", name: "Kerala Flaky Paratha (2 Pcs)", price: 45, quantity: 3 },
      { id: "cb-05", name: "Mutton Pepper Fry", price: 290, quantity: 1 },
    ],
    subtotal: 705,
    deliveryFee: 0,
    taxes: 35,
    total: 740,
    status: "New",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
    notes: "Packing securely for travel to Mysore Road",
  },
  {
    id: "CHB-9018",
    customerName: "Ananya Deshmukh",
    customerPhone: "+91 94481 99201",
    customerAddress: "#42, Janakakshi Layout, RR Nagar",
    orderType: "Delivery",
    items: [
      { id: "cb-02", name: "Naati Style Chicken Biryani", price: 230, quantity: 2 },
      { id: "cb-04", name: "Charbi Special Chicken Kebab", price: 190, quantity: 1 },
      { id: "cb-16", name: "Spiced Masala Buttermilk", price: 40, quantity: 2 },
    ],
    subtotal: 730,
    deliveryFee: 40,
    taxes: 36,
    total: 806,
    status: "Completed",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 180 * 60000).toISOString(),
    notes: "Leave with security if not reachable",
  },
  {
    id: "CHB-9015",
    customerName: "Venkatesh Babu",
    customerPhone: "+91 98862 33411",
    customerAddress: "Halagevaderahalli Main Road",
    orderType: "Delivery",
    items: [
      { id: "cb-01", name: "Charbi Special Mutton Dum Biryani", price: 320, quantity: 1 },
      { id: "cb-09", name: "Mutton Chops Gravy", price: 310, quantity: 1 },
      { id: "cb-13", name: "Kerala Flaky Paratha (2 Pcs)", price: 45, quantity: 2 },
    ],
    subtotal: 720,
    deliveryFee: 40,
    taxes: 36,
    total: 796,
    status: "Completed",
    paymentMethod: "Card (POS)",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
    notes: "",
  },
];

const SEED_PAYMENTS = [
  {
    id: "TXN-8810",
    orderId: "CHB-9021",
    customerName: "Praveen Gowda",
    amount: 1153,
    method: "UPI (PhonePe)",
    status: "Paid",
    createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
  },
  {
    id: "TXN-8811",
    orderId: "CHB-9022",
    customerName: "Meghana Rao",
    amount: 556,
    method: "Pay at Restaurant",
    status: "Paid",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: "TXN-8812",
    orderId: "CHB-9023",
    customerName: "Karthik Srinivas",
    amount: 740,
    method: "Cash on Delivery",
    status: "Pending",
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
  },
  {
    id: "TXN-8805",
    orderId: "CHB-9018",
    customerName: "Ananya Deshmukh",
    amount: 806,
    method: "UPI (Google Pay)",
    status: "Paid",
    createdAt: new Date(Date.now() - 180 * 60000).toISOString(),
  },
  {
    id: "TXN-8801",
    orderId: "CHB-9015",
    customerName: "Venkatesh Babu",
    amount: 796,
    method: "Card",
    status: "Paid",
    createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
  },
];

const SEED_RESERVATIONS = [
  {
    id: "RES-401",
    name: "Dr. Sandeep Murthy",
    phone: "+91 98451 90812",
    email: "sandeep.murthy@gmail.com",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "13:30",
    guests: 6,
    message: "Family get-together for Sunday lunch. Would appreciate outdoor seating if available.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: "RES-402",
    name: "Chandrashekar K.",
    phone: "+91 99002 44123",
    email: "chandru.k@outlook.com",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    time: "20:00",
    guests: 4,
    message: "Celebrating brother's birthday. Pre-order Mutton Biryani & Ghee Roast.",
    status: "Pending",
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
];

/**
 * Initialize Demo Local Storage
 */
function initializeDemoStorage() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(SEED_RESERVATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(restaurantConfig.menuItems));
  }
}

// Ensure demo storage is seeded
initializeDemoStorage();

/* -------------------------------------------------------------
 * ORDERS API
 * -----------------------------------------------------------*/
export async function getOrders() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn("Firestore error reading orders, falling back to local:", e);
    }
  }
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : SEED_ORDERS;
}

export async function createOrder(orderData) {
  const newOrder = {
    ...orderData,
    id: orderData.id || `CHB-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: orderData.status || "New",
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "orders"), newOrder);
    } catch (e) {
      console.warn("Firestore error creating order:", e);
    }
  }

  // Always update local cache
  const orders = await getOrders();
  const updated = [newOrder, ...orders.filter((o) => o.id !== newOrder.id)];
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

  return newOrder;
}

export async function updateOrderStatus(orderId, newStatus) {
  if (isFirebaseConfigured && db) {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (e) {
      console.warn("Firestore error updating order status:", e);
    }
  }

  const orders = await getOrders();
  const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  return updated;
}

/* -------------------------------------------------------------
 * PAYMENTS API
 * -----------------------------------------------------------*/
export async function getPayments() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "payments"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn("Firestore error reading payments:", e);
    }
  }
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
  return data ? JSON.parse(data) : SEED_PAYMENTS;
}

export async function createPayment(paymentData) {
  const newPayment = {
    ...paymentData,
    id: paymentData.id || `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "payments"), newPayment);
    } catch (e) {
      console.warn("Firestore error creating payment:", e);
    }
  }

  const payments = await getPayments();
  const updated = [newPayment, ...payments.filter((p) => p.id !== newPayment.id)];
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updated));

  return newPayment;
}

/* -------------------------------------------------------------
 * RESERVATIONS & INBOX API
 * -----------------------------------------------------------*/
export async function getReservations() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn("Firestore error reading reservations:", e);
    }
  }
  const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
  return data ? JSON.parse(data) : SEED_RESERVATIONS;
}

export async function createReservation(resData) {
  const newRes = {
    ...resData,
    id: resData.id || `RES-${Math.floor(100 + Math.random() * 900)}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "reservations"), newRes);
    } catch (e) {
      console.warn("Firestore error creating reservation:", e);
    }
  }

  const list = await getReservations();
  const updated = [newRes, ...list.filter((r) => r.id !== newRes.id)];
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));

  return newRes;
}

export async function updateReservationStatus(id, newStatus) {
  const list = await getReservations();
  const updated = list.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
  return updated;
}

export async function deleteReservation(id) {
  const list = await getReservations();
  const updated = list.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
  return updated;
}

/* -------------------------------------------------------------
 * MENU MANAGER API
 * -----------------------------------------------------------*/
export async function getMenuItems() {
  const data = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  return data ? JSON.parse(data) : restaurantConfig.menuItems;
}

export async function saveMenuItem(item) {
  const items = await getMenuItems();
  let updated;
  if (item.id && items.some((i) => i.id === item.id)) {
    updated = items.map((i) => (i.id === item.id ? { ...i, ...item } : i));
  } else {
    const newItem = {
      ...item,
      id: item.id || `cb-${Date.now().toString(36)}`,
    };
    updated = [newItem, ...items];
  }
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(updated));
  return updated;
}

export async function deleteMenuItem(id) {
  const items = await getMenuItems();
  const updated = items.filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(updated));
  return updated;
}

/* -------------------------------------------------------------
 * CSV EXPORT UTILITIES
 * -----------------------------------------------------------*/
export function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportOrdersCSV(orders) {
  const headers = ["Order ID", "Customer Name", "Phone", "Order Type", "Items", "Total (INR)", "Status", "Payment Method", "Date"];
  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${o.customerName}"`,
    `"${o.customerPhone}"`,
    `"${o.orderType}"`,
    `"${(o.items || []).map((i) => `${i.name} (x${i.quantity})`).join(", ")}"`,
    o.total,
    `"${o.status}"`,
    `"${o.paymentMethod || 'N/A'}"`,
    `"${new Date(o.createdAt).toLocaleString()}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadCSV(`charbi_orders_${new Date().toISOString().split("T")[0]}.csv`, csv);
}

export function exportPaymentsCSV(payments) {
  const headers = ["Transaction ID", "Order ID", "Customer Name", "Amount (INR)", "Payment Method", "Status", "Date"];
  const rows = payments.map((p) => [
    `"${p.id}"`,
    `"${p.orderId}"`,
    `"${p.customerName || 'N/A'}"`,
    p.amount,
    `"${p.method}"`,
    `"${p.status}"`,
    `"${new Date(p.createdAt).toLocaleString()}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadCSV(`charbi_payments_${new Date().toISOString().split("T")[0]}.csv`, csv);
}
