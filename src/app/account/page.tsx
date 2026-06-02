"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  Package,
  Settings,
  MapPin,
  LogOut
} from "lucide-react";


const AuthPage = () => {
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // FORM STATES (AUTH)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // DASHBOARD STATES
  const [activeTab, setActiveTab] = useState("Profile");

  // Profile Edit States
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editLandmark, setEditLandmark] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editPostalCode, setEditPostalCode] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
      setEditAddress(user.addressLine || "");
      setEditLandmark(user.landmark || "");
      setEditCity(user.city || "");
      setEditPostalCode(user.postalCode || "");
    }
  }, [user]);

  useEffect(() => {
    if (user && activeTab === "Orders") {
      fetchOrders();
    }
  }, [user, activeTab]);

  const fetchOrders = async () => {
    if (!user?.email) return;
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/user/orders?email=${user.email}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        login(data.user);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // If user just signed up, switch to Addresses tab and open edit mode automatically
        if (!isLogin) {
          setActiveTab("Addresses");
          setIsEditingProfile(true);
        }
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      setProfileLoading(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          name: editName,
          phone: editPhone,
          addressLine: editAddress,
          landmark: editLandmark,
          city: editCity,
          postalCode: editPostalCode,
        }),
      });
      const data = await res.json();
      if (data.success) {
        login(data.user);
        setIsEditingProfile(false);
        alert("Saved successfully!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (error) {
      alert("Server Error");
    } finally {
      setProfileLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="relative min-h-screen overflow-hidden bg-black px-6 pt-32 pb-20 flex justify-center">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#7c1d12,transparent_45%)] opacity-70" />

          <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]" />

          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[150px]" />

          {/* BIG BRAND TEXT */}
          <h1 className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 select-none text-[140px] font-black uppercase tracking-widest text-white/2 md:text-[220px]">
            GNS
          </h1>

          {/* CARD */}
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 backdrop-blur-xl shadow-[0_0_60px_rgba(245,158,11,0.15)] mt-20">
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mb-8">
                <h2 className="text-5xl font-extrabold tracking-tight text-white">
                  {isLogin ? "Login" : "Create Account"}
                </h2>
                <p className="mt-3 text-zinc-400">
                  {isLogin
                    ? "Login to continue management and shopping"
                    : "Create your premium culinary spice account"}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-white/80">Full Name</label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                      />

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-4 text-sm font-semibold text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-white/80">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-4 text-sm font-semibold text-white outline-none focus:border-[#8BDFDD]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-white/80">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-12 text-sm font-semibold text-white outline-none focus:border-[#8BDFDD]" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-white/80">Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                      <input type={showPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-12 text-sm font-semibold text-white outline-none focus:border-[#8BDFDD]" />
                    </div>
                  </div>
                )}
                <button type="submit" disabled={loading} className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-sm font-black tracking-wider text-white shadow-lg shadow-[#F48F68]/20 transition-all hover:opacity-95">
                  {loading ? "PLEASE WAIT..." : isLogin ? "LOGIN TO ACCOUNT" : "CREATE ACCOUNT"}
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </form>

              <div className="mt-8 text-center text-sm font-medium text-white/70">
                {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-black text-amber-400 hover:underline">
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="col-span-1 space-y-4">
          {/* Profile Mini Card */}
          

          {/* Nav Links */}
          <div className="bg-zinc-950/80 rounded-2xl shadow-sm border border-white/10 overflow-hidden">
            <button
              onClick={() => setActiveTab("Orders")}
              className={`w-full flex items-center justify-between p-5 border-b border-white/10 transition-all ${activeTab === 'Orders' ? 'bg-[#8BDFDD]/10 text-amber-400' : 'text-zinc-300 hover:bg-zinc-900'}`}
            ><div className="bg-zinc-950/80 rounded-2xl border border-white/10 p-4 flex items-center gap-4 backdrop-blur-sm">
  <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center text-xl font-black text-amber-400 border border-amber-400/20">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <div>
    <p className="text-xs text-zinc-500 font-semibold">Hello,</p>
    <h3 className="text-white font-black">{user.name}</h3>
  </div>
</div>
              <div className="flex items-center gap-3">
                <Package size={20} className={activeTab === 'Orders' ? "text-amber-400" : "text-zinc-500"} />
                <span className="font-bold text-sm tracking-wide">MY ORDERS</span>
              </div>
              <ChevronRight size={18} className="text-white" />
            </button>

            <div className="p-5 border-b border-white/10 bg-zinc-900/80">
              <div className="flex items-center gap-3 mb-4">
                <Settings size={20} className="text-zinc-500" />
                <span className="font-bold text-sm tracking-wide text-zinc-500">ACCOUNT SETTINGS</span>
              </div>
              <div className="flex flex-col gap-1 pl-8">
                <button
                  onClick={() => setActiveTab("Profile")}
                  className={`text-left text-sm font-semibold py-2 transition-all ${activeTab === 'Profile' ? 'text-amber-400' : 'text-white hover:text-amber-500'}`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("Addresses")}
                  className={`text-left text-sm font-semibold py-2 transition-all ${activeTab === 'Addresses' ? 'text-amber-400' : 'text-white hover:text-amber-500'}`}
                >
                  Manage Addresses
                </button>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 p-5 text-white hover:bg-amber-400 hover:text-white transition-all"
            >
              <LogOut size={20} className="text-zinc-500 hover:text-amber-400" />
              <span className="font-bold text-sm tracking-wide">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-zinc-950/80 rounded-2xl shadow-sm border border-white/10 p-6 md:p-10 min-h-[600px]">

            {activeTab === "Profile" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white">Personal Information</h2>
                  <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm font-bold text-amber-400 hover:underline">
                    {isEditingProfile ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-8 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold cursor-not-allowed opacity-70"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">Email cannot be changed once registered.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mobile Number</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="Add your mobile number"
                      required
                      className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                    />
                  </div>

                  {isEditingProfile && (
                    <button type="submit" disabled={profileLoading} className="h-12 px-10 bg-[#F48F68] text-white font-bold rounded-lg shadow-lg hover:bg-[#eb7d52] transition-all">
                      {profileLoading ? "Saving..." : "SAVE"}
                    </button>
                  )}
                </form>
              </div>
            )}

            {activeTab === "Addresses" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white">Manage Addresses</h2>
                  <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm font-bold text-[#F48F68] hover:underline">
                    {isEditingProfile ? "Cancel" : "Edit Address"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Address Line</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="House No., Street, Area"
                      required
                      className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Landmark</label>
                    <input
                      type="text"
                      value={editLandmark}
                      onChange={(e) => setEditLandmark(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="Near hospital, park, etc."
                      required
                      className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest">City / District</label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Postal / ZIP Code</label>
                      <input
                        type="text"
                        value={editPostalCode}
                        onChange={(e) => setEditPostalCode(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-zinc-950/80 border border-white/10 rounded-lg px-4 text-white font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70"
                      />
                    </div>
                  </div>

                  {isEditingProfile && (
                    <button type="submit" disabled={profileLoading} className="h-12 px-10 bg-[#F48F68] text-white font-bold rounded-lg shadow-lg hover:bg-[#eb7d52] transition-all">
                      {profileLoading ? "Saving..." : "SAVE ADDRESS"}
                    </button>
                  )}
                </form>
              </div>
            )}

            {activeTab === "Orders" && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-black text-white mb-8">My Orders</h2>

                {ordersLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-[#FFE394] border-t-[#F48F68] rounded-full animate-spin"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package size={60} className="mx-auto text-[#FFE394] mb-4" />
                    <h3 className="text-xl font-bold text-white">No Orders Found</h3>
                    <p className="text-white/60 mt-2">Looks like you haven't placed any orders yet.</p>
                    <Link href="/shop">
                      <button className="mt-6 h-12 px-8 bg-amber-500 text-white font-bold rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 hover:bg-[#eb7d52]">
                        Start Shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order: any) => (
                      <div key={order._id} className="border border-white/10 bg-zinc-900/50 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
                          <div>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Order ID</p>
                            <p className="font-mono text-sm text-white font-semibold">{order._id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Date</p>
                            <p className="text-sm font-semibold text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Total</p>
                            <p className="text-sm font-bold text-amber-400">£{order.totalAmount}</p>
                          </div>
                          <div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase ${order.status === 'Pending' ? 'bg-amber-500 text-white' :
                                order.status === 'Delivered' ? 'bg-amber-400 text-amber-500' :
                                  'bg-[#8BDFDD]/20 text-teal-800'
                              }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-zinc-950/80 rounded-xl overflow-hidden relative border border-white/10">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white text-xs">No Img</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-white">{item.name}</p>
                                <p className="text-sm text-white font-semibold">Qty: {item.quantity} ×£{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
    <Footer/>
</>
  );
};

export default AuthPage;