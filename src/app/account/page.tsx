"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import Navbar from "../components/Navbar";

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
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF6DE] px-6 py-10 text-[#332D20]">
        <Navbar />
        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute left-0 top-0 h-112.5 w-112.5 rounded-full bg-[#8BDFDD]/20 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-112.5 w-112.5 rounded-full bg-[#F48F68]/10 blur-[150px]" />

        {/* BIG BRAND TEXT */}
        <h1 className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 select-none text-[140px] font-black uppercase tracking-widest text-[#332D20]/2 md:text-[220px]">
          GNS
        </h1>

        {/* CARD */}
        <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-4xl border-2 border-[#FFE394]/60 bg-white shadow-xl mt-20">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8">
              <h2 className="text-4xl font-black tracking-tight text-[#332D20]">
                {isLogin ? "Login" : "Create Account"}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#332D20]/60">
                {isLogin
                  ? "Login to continue management and shopping"
                  : "Create your premium culinary spice account"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40" />
                    <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-4 text-sm font-semibold text-[#332D20] outline-none focus:border-[#8BDFDD]" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40" />
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-4 text-sm font-semibold text-[#332D20] outline-none focus:border-[#8BDFDD]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40" />
                  <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-12 text-sm font-semibold text-[#332D20] outline-none focus:border-[#8BDFDD]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#332D20]/40 hover:text-[#332D20]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40" />
                    <input type={showPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-12 text-sm font-semibold text-[#332D20] outline-none focus:border-[#8BDFDD]" />
                  </div>
                </div>
              )}
              <button type="submit" disabled={loading} className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#F48F68] text-sm font-black tracking-wider text-white shadow-lg shadow-[#F48F68]/20 transition-all hover:opacity-95">
                {loading ? "PLEASE WAIT..." : isLogin ? "LOGIN TO ACCOUNT" : "CREATE ACCOUNT"}
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-[#332D20]/70">
              {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-black text-[#F48F68] hover:underline">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF6DE] pt-32 pb-20 px-4 md:px-8">
      <Navbar />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR */}
        <div className="col-span-1 space-y-4">
          {/* Profile Mini Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE394]/40 p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFE394]/30 flex items-center justify-center text-xl font-black text-[#F48F68]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-[#332D20]/60 font-semibold">Hello,</p>
              <h3 className="text-[#332D20] font-black">{user.name}</h3>
            </div>
          </div>

          {/* Nav Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE394]/40 overflow-hidden">
            <button 
              onClick={() => setActiveTab("Orders")}
              className={`w-full flex items-center justify-between p-5 border-b border-[#FFE394]/20 transition-all ${activeTab === 'Orders' ? 'bg-[#8BDFDD]/10 text-[#F48F68]' : 'text-[#332D20] hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <Package size={20} className={activeTab === 'Orders' ? "text-[#F48F68]" : "text-[#332D20]/50"}/>
                <span className="font-bold text-sm tracking-wide">MY ORDERS</span>
              </div>
              <ChevronRight size={18} className="text-[#332D20]/30"/>
            </button>

            <div className="p-5 border-b border-[#FFE394]/20 bg-gray-50/50">
              <div className="flex items-center gap-3 mb-4">
                <Settings size={20} className="text-[#332D20]/50"/>
                <span className="font-bold text-sm tracking-wide text-[#332D20]/50">ACCOUNT SETTINGS</span>
              </div>
              <div className="flex flex-col gap-1 pl-8">
                <button 
                  onClick={() => setActiveTab("Profile")}
                  className={`text-left text-sm font-semibold py-2 transition-all ${activeTab === 'Profile' ? 'text-[#F48F68]' : 'text-[#332D20] hover:text-[#F48F68]'}`}
                >
                  Profile Information
                </button>
                <button 
                  onClick={() => setActiveTab("Addresses")}
                  className={`text-left text-sm font-semibold py-2 transition-all ${activeTab === 'Addresses' ? 'text-[#F48F68]' : 'text-[#332D20] hover:text-[#F48F68]'}`}
                >
                  Manage Addresses
                </button>
              </div>
            </div>

            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-3 p-5 text-[#332D20] hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <LogOut size={20} className="text-[#332D20]/50 hover:text-red-500"/>
              <span className="font-bold text-sm tracking-wide">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE394]/40 p-6 md:p-10 min-h-[600px]">
            
            {activeTab === "Profile" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-[#332D20]">Personal Information</h2>
                  <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm font-bold text-[#F48F68] hover:underline">
                    {isEditingProfile ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-8 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={user.email} 
                      disabled
                      className="w-full h-12 bg-gray-100 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold cursor-not-allowed opacity-70" 
                    />
                    <p className="text-[10px] text-[#332D20]/50 mt-1">Email cannot be changed once registered.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Mobile Number</label>
                    <input 
                      type="text" 
                      value={editPhone} 
                      onChange={(e) => setEditPhone(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="Add your mobile number"
                      required
                      className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
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
                  <h2 className="text-2xl font-black text-[#332D20]">Manage Addresses</h2>
                  <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm font-bold text-[#F48F68] hover:underline">
                    {isEditingProfile ? "Cancel" : "Edit Address"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Address Line</label>
                    <input 
                      type="text" 
                      value={editAddress} 
                      onChange={(e) => setEditAddress(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="House No., Street, Area"
                      required
                      className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Landmark</label>
                    <input 
                      type="text" 
                      value={editLandmark} 
                      onChange={(e) => setEditLandmark(e.target.value)}
                      disabled={!isEditingProfile}
                      placeholder="Near hospital, park, etc."
                      required
                      className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">City / District</label>
                      <input 
                        type="text" 
                        value={editCity} 
                        onChange={(e) => setEditCity(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#332D20]/60 uppercase tracking-widest">Postal / ZIP Code</label>
                      <input 
                        type="text" 
                        value={editPostalCode} 
                        onChange={(e) => setEditPostalCode(e.target.value)}
                        disabled={!isEditingProfile}
                        required
                        className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-[#332D20] font-semibold focus:outline-none focus:border-[#F48F68] disabled:opacity-70" 
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
                <h2 className="text-2xl font-black text-[#332D20] mb-8">My Orders</h2>
                
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-[#FFE394] border-t-[#F48F68] rounded-full animate-spin"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package size={60} className="mx-auto text-[#FFE394] mb-4" />
                    <h3 className="text-xl font-bold text-[#332D20]">No Orders Found</h3>
                    <p className="text-[#332D20]/60 mt-2">Looks like you haven't placed any orders yet.</p>
                    <Link href="/shop">
                      <button className="mt-6 h-12 px-8 bg-[#F48F68] text-white font-bold rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 hover:bg-[#eb7d52]">
                        Start Shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order: any) => (
                      <div key={order._id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
                          <div>
                            <p className="text-xs text-[#332D20]/50 font-bold uppercase tracking-wider mb-1">Order ID</p>
                            <p className="font-mono text-sm text-[#332D20] font-semibold">{order._id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#332D20]/50 font-bold uppercase tracking-wider mb-1">Date</p>
                            <p className="text-sm font-semibold text-[#332D20]">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#332D20]/50 font-bold uppercase tracking-wider mb-1">Total</p>
                            <p className="text-sm font-bold text-[#F48F68]">₹{order.totalAmount}</p>
                          </div>
                          <div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase ${
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              'bg-[#8BDFDD]/20 text-teal-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[#332D20]/30 text-xs">No Img</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-[#332D20]">{item.name}</p>
                                <p className="text-sm text-[#332D20]/60 font-semibold">Qty: {item.quantity} × ₹{item.price}</p>
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
  );
};

export default AuthPage;