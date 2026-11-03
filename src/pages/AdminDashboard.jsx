import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  CalendarCheck,
  UtensilsCrossed,
  LogOut,
  Search,
  Download,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  PackageCheck,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DemoModeBadge from "../components/DemoModeBadge";
import {
  getOrders,
  updateOrderStatus,
  getPayments,
  getReservations,
  updateReservationStatus,
  deleteReservation,
  getMenuItems,
  saveMenuItem,
  deleteMenuItem,
  exportOrdersCSV,
  exportPaymentsCSV,
} from "../lib/storage";
import { restaurantConfig } from "../config/restaurant";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout, isDemoMode } = useAuth();
  const navigate = useNavigate();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'orders', 'payments', 'reservations', 'menu'

  // Data states
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Orders Tab filters & search
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState(null);

  // Payments Tab filters
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Menu Manager Modal state
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    category: "starters",
    price: "",
    description: "",
    isVeg: false,
    isPopular: false,
    isChefSpecial: false,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    badge: "",
    isAvailable: true,
  });

  // Verify authentication
  useEffect(() => {
    document.title = "Owner Dashboard | CHARBI Restaurant RR Nagar";
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else {
      loadAllData();
    }
  }, [isAuthenticated, navigate]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [o, p, r, m] = await Promise.all([
        getOrders(),
        getPayments(),
        getReservations(),
        getMenuItems(),
      ]);
      setOrders(o || []);
      setPayments(p || []);
      setReservations(r || []);
      setMenuItems(m || []);
    } catch (e) {
      console.error("Dashboard data load error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------
   * ORDER ACTIONS
   * -----------------------------------------------------------*/
  const handleStatusChange = async (orderId, newStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    if (selectedOrderForDrawer && selectedOrderForDrawer.id === orderId) {
      setSelectedOrderForDrawer((prev) => ({ ...prev, status: newStatus }));
    }
  };

  /* -------------------------------------------------------------
   * RESERVATION ACTIONS
   * -----------------------------------------------------------*/
  const handleReservationStatus = async (id, status) => {
    const updated = await updateReservationStatus(id, status);
    setReservations(updated);
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm("Remove this reservation from the inbox?")) {
      const updated = await deleteReservation(id);
      setReservations(updated);
    }
  };

  /* -------------------------------------------------------------
   * MENU MANAGER ACTIONS
   * -----------------------------------------------------------*/
  const handleOpenAddMenuModal = () => {
    setEditingMenuItem(null);
    setMenuFormData({
      name: "",
      category: "starters",
      price: "",
      description: "",
      isVeg: false,
      isPopular: false,
      isChefSpecial: false,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      badge: "",
      isAvailable: true,
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditMenuModal = (item) => {
    setEditingMenuItem(item);
    setMenuFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      isVeg: item.isVeg,
      isPopular: item.isPopular,
      isChefSpecial: item.isChefSpecial,
      image: item.image,
      badge: item.badge || "",
      isAvailable: item.isAvailable !== false,
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenu = async (e) => {
    e.preventDefault();
    const itemToSave = {
      ...menuFormData,
      id: editingMenuItem ? editingMenuItem.id : undefined,
      price: parseFloat(menuFormData.price) || 0,
    };
    const updated = await saveMenuItem(itemToSave);
    setMenuItems(updated);
    setIsMenuModalOpen(false);
  };

  const handleToggleItemAvailability = async (item) => {
    const updated = await saveMenuItem({
      ...item,
      isAvailable: item.isAvailable === false ? true : false,
    });
    setMenuItems(updated);
  };

  const handleDeleteMenu = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      const updated = await deleteMenuItem(id);
      setMenuItems(updated);
    }
  };

  /* -------------------------------------------------------------
   * CALCULATED METRICS FOR OVERVIEW
   * -----------------------------------------------------------*/
  const totalRevenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  });

  const todayRevenue = todayOrders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

  const pendingOrdersCount = orders.filter(
    (o) => o.status === "New" || o.status === "Preparing"
  ).length;

  // Filtered orders list
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      orderStatusFilter === "all" || order.status === orderStatusFilter;
    const matchesSearch =
      orderSearch.trim() === "" ||
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered payments list
  const filteredPayments = payments.filter((payment) => {
    if (paymentFilter === "all") return true;
    return payment.status.toLowerCase() === paymentFilter.toLowerCase();
  });

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-dark-950 text-white shrink-0 p-5 flex flex-col justify-between border-r border-dark-800">
        <div>
          {/* Top Brand Crest */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-serif font-black text-2xl shadow-md">
              C
            </div>
            <div>
              <h2 className="font-serif font-black text-lg leading-none">
                {restaurantConfig.name}
              </h2>
              <span className="text-[10px] text-cream-200/60 uppercase tracking-widest">
                Owner Dashboard
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-cream-200/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "orders"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-cream-200/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-dark-900">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "payments"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-cream-200/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment History</span>
            </button>

            <button
              onClick={() => setActiveTab("reservations")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "reservations"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-cream-200/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Reservations Inbox</span>
              </div>
              {reservations.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-200 text-brand-900">
                  {reservations.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "menu"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-cream-200/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Menu Manager</span>
            </button>
          </nav>
        </div>

        {/* Footer Area */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <DemoModeBadge className="w-full justify-center" />
          <div className="flex items-center justify-between text-xs text-cream-200/60">
            <span className="truncate">{user?.email || "owner@charbi.com"}</span>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs text-brand-300 hover:text-white pt-1"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cream-200 gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-dark-900 capitalize">
              {activeTab === "overview" && "Performance Overview"}
              {activeTab === "orders" && "Online & Dine-in Orders"}
              {activeTab === "payments" && "Payment Transactions"}
              {activeTab === "reservations" && "Table Reservations & Inbox"}
              {activeTab === "menu" && "Menu Item & Pricing Manager"}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Live data for CHARBI • Halagevaderahalli Double Road, RR Nagar
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="px-4 py-2 bg-white border border-cream-300 hover:bg-cream-100 rounded-xl text-xs font-bold text-dark-900 shadow-sm"
            >
              Refresh Data
            </button>
            {activeTab === "menu" && (
              <button
                onClick={handleOpenAddMenuModal}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Dish</span>
              </button>
            )}
          </div>
        </header>

        {/* -------------------------------------------------------------
         * TAB 1: OVERVIEW METRICS & CHARTS
         * -----------------------------------------------------------*/}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
                  <span>Today's Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif font-black text-3xl text-dark-900">
                  ₹{todayRevenue}
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>From {todayOrders.length} orders today</span>
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
                  <span>Today's Orders</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif font-black text-3xl text-dark-900">
                  {todayOrders.length}
                </p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Active in RR Nagar zone
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
                  <span>Pending Action</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif font-black text-3xl text-amber-600">
                  {pendingOrdersCount}
                </p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Needs kitchen preparation
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
                  <span>Total Gross Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-serif font-black text-3xl text-dark-900">
                  ₹{totalRevenue}
                </p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  All recorded transactions
                </p>
              </div>
            </div>

            {/* Visual Orders & Revenue Trends (7-Day Bar Chart) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <h3 className="font-serif font-bold text-lg text-dark-900 mb-1">
                  Daily Revenue (Last 7 Days)
                </h3>
                <p className="text-xs text-gray-500 mb-6">Gross settled sales in ₹</p>
                <div className="flex items-end justify-between h-44 gap-2 pt-6 px-2">
                  {[
                    { day: "Wed", amount: 3200, height: "65%" },
                    { day: "Thu", amount: 2850, height: "55%" },
                    { day: "Fri", amount: 4100, height: "80%" },
                    { day: "Sat", amount: 5600, height: "98%" },
                    { day: "Sun", amount: 6400, height: "100%" },
                    { day: "Mon", amount: 0, height: "4%" },
                    { day: "Today", amount: todayRevenue || 2450, height: "50%" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-600">₹{bar.amount}</span>
                      <div className="w-full bg-cream-100 rounded-t-xl overflow-hidden flex items-end h-32">
                        <div
                          style={{ height: bar.height }}
                          className="w-full bg-brand-500 hover:bg-brand-600 transition-all rounded-t-xl"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft">
                <h3 className="font-serif font-bold text-lg text-dark-900 mb-1">
                  Orders Volume by Type
                </h3>
                <p className="text-xs text-gray-500 mb-6">Distribution between dining channels</p>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-dark-900 mb-1">
                      <span>Doorstep Delivery (Swiggy / Direct)</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-cream-100 overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full w-[62%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-dark-900 mb-1">
                      <span>Takeaway Counter Pickup</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-cream-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[24%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-dark-900 mb-1">
                      <span>Casual Dine-in Table Feasts</span>
                      <span>14%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-cream-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[14%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark-900">Top Selling Item:</span>
                  <span className="font-bold text-brand-600">Charbi Special Mutton Dum Biryani</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
         * TAB 2: ORDERS HISTORY & STATUS UPDATER
         * -----------------------------------------------------------*/}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            {/* Control Bar: Search, Status Filter, CSV Export */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-cream-200 shadow-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, name or phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-cream-50 rounded-xl text-xs border border-cream-200 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-cream-50 rounded-xl text-xs border border-cream-200 font-semibold focus:outline-none text-dark-900"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => exportOrdersCSV(orders)}
                className="w-full sm:w-auto px-4 py-2 bg-cream-100 hover:bg-cream-200 text-dark-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-cream-200"
              >
                <Download className="w-4 h-4" />
                <span>Export Orders (CSV)</span>
              </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-100/70 border-b border-cream-200 text-gray-600 uppercase font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Items Summary</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100 text-dark-900">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-12 text-gray-500">
                          No orders found matching the filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-cream-50/60 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-brand-600">
                            #{o.id}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold block text-dark-900">{o.customerName}</span>
                            <span className="text-gray-500 text-[11px]">{o.customerPhone}</span>
                          </td>
                          <td className="py-4 px-4 font-semibold">{o.orderType}</td>
                          <td className="py-4 px-4 max-w-xs truncate text-gray-600">
                            {(o.items || []).map((i) => `${i.name} (×${i.quantity})`).join(", ")}
                          </td>
                          <td className="py-4 px-4 font-black text-dark-900">₹{o.total}</td>
                          <td className="py-4 px-4">
                            <select
                              value={o.status}
                              onChange={(e) => handleStatusChange(o.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                                o.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : o.status === "Preparing"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : o.status === "New"
                                  ? "bg-blue-50 text-blue-800 border-blue-300 animate-pulse"
                                  : o.status === "Out for delivery"
                                  ? "bg-purple-50 text-purple-800 border-purple-300"
                                  : "bg-red-50 text-red-800 border-red-300"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for delivery">Out for delivery</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-gray-500 text-[11px]">
                            {new Date(o.createdAt).toLocaleDateString()}{" "}
                            {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrderForDrawer(o)}
                              className="px-3 py-1 bg-cream-100 hover:bg-cream-200 text-dark-900 font-bold rounded-lg text-[11px]"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Detail Drawer */}
            {selectedOrderForDrawer && (
              <div className="fixed inset-0 z-50 bg-dark-950/60 backdrop-blur-sm flex justify-end">
                <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                      <div>
                        <span className="text-xs text-gray-500 font-semibold uppercase">Order Details</span>
                        <h2 className="font-serif font-black text-2xl text-dark-900">
                          #{selectedOrderForDrawer.id}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedOrderForDrawer(null)}
                        className="p-2 text-gray-400 hover:text-dark-900 rounded-lg hover:bg-cream-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="py-4 space-y-3 border-b border-cream-200 text-xs text-gray-600">
                      <div>
                        <span className="font-bold text-dark-900">Customer: </span>
                        <span>{selectedOrderForDrawer.customerName} ({selectedOrderForDrawer.customerPhone})</span>
                      </div>
                      <div>
                        <span className="font-bold text-dark-900">Destination: </span>
                        <span>{selectedOrderForDrawer.customerAddress}</span>
                      </div>
                      <div>
                        <span className="font-bold text-dark-900">Order Channel: </span>
                        <span className="px-2 py-0.5 rounded bg-cream-100 font-bold text-dark-900">
                          {selectedOrderForDrawer.orderType}
                        </span>
                      </div>
                      {selectedOrderForDrawer.notes && (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                          <span className="font-bold">Kitchen Instructions: </span>
                          <span>{selectedOrderForDrawer.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Items List */}
                    <div className="py-4 space-y-2">
                      <h4 className="font-serif font-bold text-sm text-dark-900 mb-2">Ordered Items</h4>
                      {(selectedOrderForDrawer.items || []).map((it, idx) => (
                        <div key={idx} className="flex justify-between text-xs py-1 border-b border-cream-100 last:border-none">
                          <span>
                            {it.name} × <b>{it.quantity}</b>
                          </span>
                          <span className="font-bold text-dark-900">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="pt-3 border-t border-cream-200 space-y-1.5 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{selectedOrderForDrawer.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{selectedOrderForDrawer.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST</span>
                        <span>₹{selectedOrderForDrawer.taxes}</span>
                      </div>
                      <div className="flex justify-between font-black text-base text-dark-900 pt-2 border-t border-cream-200">
                        <span>Total Paid / Due</span>
                        <span className="text-brand-600">₹{selectedOrderForDrawer.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream-200">
                    <button
                      onClick={() => setSelectedOrderForDrawer(null)}
                      className="w-full py-3 bg-dark-900 text-white rounded-xl text-xs font-bold"
                    >
                      Close Drawer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
         * TAB 3: PAYMENT HISTORY
         * -----------------------------------------------------------*/}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header / Export */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-cream-200 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600">Filter Status:</span>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-3 py-1.5 bg-cream-50 rounded-xl text-xs border border-cream-200 font-semibold focus:outline-none"
                >
                  <option value="all">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <button
                onClick={() => exportPaymentsCSV(payments)}
                className="w-full sm:w-auto px-4 py-2 bg-cream-100 hover:bg-cream-200 text-dark-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-cream-200"
              >
                <Download className="w-4 h-4" />
                <span>Export Transactions (CSV)</span>
              </button>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-100/70 border-b border-cream-200 text-gray-600 uppercase font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Transaction ID</th>
                      <th className="py-3.5 px-4">Linked Order</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Payment Method</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100 text-dark-900">
                    {filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-12 text-gray-500">
                          No transactions recorded.
                        </td>
                      </tr>
                    ) : (
                      filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-cream-50/60 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-dark-900">
                            {p.id}
                          </td>
                          <td className="py-4 px-4 font-mono text-brand-600 font-bold">
                            #{p.orderId}
                          </td>
                          <td className="py-4 px-4 font-medium">{p.customerName || "Customer"}</td>
                          <td className="py-4 px-4 font-black text-emerald-700">₹{p.amount}</td>
                          <td className="py-4 px-4 font-semibold">{p.method}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                                p.status === "Paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : p.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-gray-500 text-[11px]">
                            {new Date(p.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
         * TAB 4: RESERVATIONS INBOX
         * -----------------------------------------------------------*/}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservations.length === 0 ? (
                <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-cream-200 p-8">
                  <p className="font-serif text-lg font-bold text-dark-900">
                    No table bookings in inbox yet.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Customer reservations submitted on the contact page will automatically show up here.
                  </p>
                </div>
              ) : (
                reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-cream-100 mb-3">
                        <span className="font-mono font-bold text-xs text-brand-600">
                          #{res.id}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            res.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : res.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-dark-900">{res.name}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Phone: <b>{res.phone}</b> {res.email ? `• ${res.email}` : ""}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Reserved Date:</span>
                          <span className="font-bold text-dark-900">{res.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Service Slot:</span>
                          <span className="font-bold text-dark-900">{res.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Party Size:</span>
                          <span className="font-bold text-brand-600">{res.guests} Guests</span>
                        </div>
                      </div>

                      {res.message && (
                        <p className="text-xs text-gray-700 italic mt-3 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                          "{res.message}"
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-cream-100 flex items-center justify-between">
                      <div className="flex gap-2">
                        {res.status !== "Confirmed" && (
                          <button
                            onClick={() => handleReservationStatus(res.id, "Confirmed")}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
                          >
                            Confirm Booking
                          </button>
                        )}
                        {res.status === "Confirmed" && (
                          <button
                            onClick={() => handleReservationStatus(res.id, "Attended")}
                            className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white rounded-lg text-xs font-bold"
                          >
                            Mark Attended
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteReservation(res.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold p-1"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
         * TAB 5: MENU MANAGER
         * -----------------------------------------------------------*/}
        {activeTab === "menu" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl bg-white border shadow-soft flex flex-col justify-between transition-all ${
                    item.isAvailable === false
                      ? "opacity-60 border-gray-300"
                      : "border-cream-200 hover:border-brand-300"
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-md">
                        <span
                          className={`block w-2.5 h-2.5 rounded-full ${
                            item.isVeg ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        />
                      </div>
                      {item.isAvailable === false && (
                        <div className="absolute inset-0 bg-dark-950/70 flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider">
                          Hidden from Menu
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-serif font-bold text-base text-dark-900 leading-tight">
                        {item.name}
                      </h4>
                      <span className="font-serif font-black text-brand-600 text-base shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => handleToggleItemAvailability(item)}
                      className={`flex items-center gap-1 font-bold ${
                        item.isAvailable === false
                          ? "text-amber-600 hover:text-amber-700"
                          : "text-emerald-700 hover:text-emerald-800"
                      }`}
                    >
                      {item.isAvailable === false ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Available</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditMenuModal(item)}
                        className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-dark-900"
                        title="Edit dish"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Edit/Add Modal */}
            {isMenuModalOpen && (
              <div className="fixed inset-0 z-50 bg-dark-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-white rounded-3xl p-6 shadow-2xl border border-cream-200 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-cream-200 mb-4">
                    <h3 className="font-serif font-black text-xl text-dark-900">
                      {editingMenuItem ? "Edit Menu Dish" : "Add New Dish"}
                    </h3>
                    <button
                      onClick={() => setIsMenuModalOpen(false)}
                      className="p-1.5 text-gray-400 hover:text-dark-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveMenu} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">
                        Dish Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={menuFormData.name}
                        onChange={(e) =>
                          setMenuFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">
                          Category *
                        </label>
                        <select
                          value={menuFormData.category}
                          onChange={(e) =>
                            setMenuFormData((prev) => ({ ...prev, category: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl border border-cream-300 text-sm font-medium"
                        >
                          <option value="starters">Starters & Kebabs</option>
                          <option value="biryani">Signature Biryanis</option>
                          <option value="curries">Saaru & Gravies</option>
                          <option value="breads">Staples & Breads</option>
                          <option value="desserts-drinks">Desserts & Coolers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 uppercase mb-1">
                          Price (INR) *
                        </label>
                        <input
                          type="number"
                          required
                          value={menuFormData.price}
                          onChange={(e) =>
                            setMenuFormData((prev) => ({ ...prev, price: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows="2"
                        value={menuFormData.description}
                        onChange={(e) =>
                          setMenuFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">
                        Image URL (High-res photo)
                      </label>
                      <input
                        type="url"
                        value={menuFormData.image}
                        onChange={(e) =>
                          setMenuFormData((prev) => ({ ...prev, image: e.target.value }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-sm"
                      />
                    </div>

                    {/* Flags */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={menuFormData.isVeg}
                          onChange={(e) =>
                            setMenuFormData((prev) => ({ ...prev, isVeg: e.target.checked }))
                          }
                          className="accent-brand-500 w-4 h-4"
                        />
                        <span>Vegetarian Dish</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={menuFormData.isChefSpecial}
                          onChange={(e) =>
                            setMenuFormData((prev) => ({
                              ...prev,
                              isChefSpecial: e.target.checked,
                            }))
                          }
                          className="accent-brand-500 w-4 h-4"
                        />
                        <span>Chef's Special Tag</span>
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-cream-200">
                      <button
                        type="button"
                        onClick={() => setIsMenuModalOpen(false)}
                        className="px-4 py-2 bg-cream-100 hover:bg-cream-200 rounded-xl font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-md"
                      >
                        Save Dish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
