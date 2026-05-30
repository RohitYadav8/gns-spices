"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, CreditCard, ShieldCheck, Ticket } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // --- COUPON STATES ---
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [couponSuccess, setCouponSuccess] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // --- CALCULATION LOGIC ---
  const subtotal = cart.reduce(
    (acc: number, item: any) => acc + item.price * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 500 ? 0 : 50;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + shipping - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError("");
    setCouponSuccess("");
    setIsValidating(true);
    try {
      const res = await fetch("/api/admin/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.toUpperCase().trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDiscountPercent(data.discount);
        setCouponSuccess(`Badhai ho! ${data.discount}% discount apply ho gaya.`);
      } else {
        setDiscountPercent(0);
        setCouponError(data.message || "Invalid Coupon Code");
      }
    } catch (error) {
      setCouponError("Coupon apply karne mein koi dikkat aayi.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* --- UPDATED DARK PREMIUM BACKGROUND --- */}
      <div className="min-h-screen relative bg-[#0a0503] text-white overflow-hidden font-sans selection:bg-[#F48F68]/30">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] bg-[#F48F68]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#8BDFDD]/10 blur-[150px] pointer-events-none" />

        <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[240px] font-black text-white/[0.03] uppercase select-none pointer-events-none">
          GNS
        </h1>

        <div className="relative z-10 max-w-7xl mx-auto pt-36 pb-20 px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <Link href="/products" className="group inline-flex items-center gap-2 text-zinc-400 hover:text-[#F48F68] transition-all">
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                <span className="text-xs uppercase tracking-[0.3em] font-extrabold">Back to Premium Spices</span>
              </Link>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">
                Your Cart<span className="text-[#F48F68]">.</span>
              </h1>
            </div>
            <div className="text-left md:text-right">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-bold">Est. Delivery</p>
              <p className="text-xl font-black text-[#8BDFDD]">2-3 Business Days</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="py-24 text-center border border-zinc-800 rounded-3xl bg-[#110d0b]">
              <ShoppingBag size={60} className="mx-auto mb-6 text-zinc-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-zinc-300">Your spice collection is empty.</h2>
              <Link href="/products" className="bg-[#F48F68] text-white px-10 py-4 rounded-full font-black uppercase hover:opacity-90 transition-all">
                Browse Selection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7 space-y-6">
                {cart.map((item: any) => (
                  <div key={item.id} className="group flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl border border-zinc-800 bg-[#110d0b] hover:border-zinc-600 transition-all">
                    <div className="relative w-32 h-32 bg-zinc-900 rounded-2xl overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-4" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[10px] text-[#F48F68] font-black uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-6 mt-4">
                        <div className="flex items-center bg-black rounded-full px-4 py-2 border border-zinc-700">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                          <span className="w-8 text-center font-bold">{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                        <p className="text-xl font-black">£{item.price * (item.quantity || 1)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-3 bg-zinc-900 rounded-full hover:bg-red-900 text-zinc-400 hover:text-white">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5">
                <div className="sticky top-32 p-8 rounded-3xl border border-zinc-800 bg-[#110d0b]">
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-zinc-400">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-bold">£{subtotal}</span></div>
                    <div className="flex justify-between text-sm"><span>Shipping</span><span className="text-[#8BDFDD] font-bold">{shipping === 0 ? "FREE" : `£${shipping}`}</span></div>
                    
                    <div className="pt-4 border-t border-zinc-800">
                      <div className="flex gap-2">
                        <input type="text" placeholder="COUPON CODE" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 bg-black border border-zinc-700 px-4 py-3 rounded-xl text-xs font-bold uppercase" />
                        <button onClick={handleApplyCoupon} className="bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase">Apply</button>
                      </div>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-green-400 text-sm font-bold bg-green-950/30 p-3 rounded-xl">
                        <span>Discount ({discountPercent}%)</span><span>-£{discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4 border-t border-zinc-800">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Total</span>
                      <span className="text-4xl font-black">£{total}</span>
                    </div>

                    <Link href={{ pathname: "/checkout", query: { discount: discountPercent, total: total } }}>
                      <button className="w-full mt-6 h-14 bg-[#F48F68] hover:bg-[#d97d5a] text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                        Complete Purchase
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}