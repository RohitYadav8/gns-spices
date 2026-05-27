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

  // Discount amount calculation based on subtotal
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + shipping - discountAmount;

  // --- COUPON VALIDATION HANDLER ---
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

      {/* --- PREMIUM CREAM VANILLA BACKGROUND CONTEXT --- */}
      <div className="min-h-screen relative bg-[#FFF6DE] text-[#332D20] overflow-hidden font-sans selection:bg-[#8BDFDD]/30">

        {/* INTERACTIVE GLOW MAPS (Shop page wale soft pastel blobs) */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] bg-[#8BDFDD]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#F48F68]/10 blur-[150px] pointer-events-none" />

        {/* LARGE DECORATIVE BACKGROUND TEXT */}
        <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[240px] font-black text-[#332D20]/[0.02] uppercase select-none pointer-events-none">
          GNS
        </h1>

        <div className="relative z-10 max-w-7xl mx-auto pt-36 pb-20 px-6 md:px-12">

          {/* HEADER & BACK BUTTON */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <Link href="/products" className="group inline-flex items-center gap-2 text-[#332D20]/60 hover:text-[#F48F68] transition-all">
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                <span className="text-xs uppercase tracking-[0.3em] font-extrabold">Back to Premium Spices</span>
              </Link>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">
                Your Cart<span className="text-[#F48F68]">.</span>
              </h1>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[#332D20]/50 text-xs uppercase tracking-widest mb-1 font-bold">Est. Delivery</p>
              <p className="text-xl font-black text-[#F48F68]">2-3 Business Days</p>
            </div>
          </div>

          {cart.length === 0 ? (
            /* --- EMPTY CART VIEW (MATCHED WITH THEME) --- */
            <div className="py-24 text-center border-2 border-[#FFE394]/40 rounded-[32px] bg-white shadow-sm backdrop-blur-3xl">
              <ShoppingBag size={60} className="mx-auto mb-6 text-[#332D20]/30" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-[#332D20]/70">Your spice collection is currently empty.</h2>
              <Link href="/products" className="bg-[#F48F68] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#F48F68]/20">
                Browse Selection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* --- ITEMS COLUMN --- */}
              <div className="lg:col-span-7 space-y-8">
                {cart.map((item: any) => (
                  <div key={item.id} className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[24px] border-2 border-[#FFE394]/30 bg-white shadow-sm transition-all duration-300 hover:border-[#8BDFDD] hover:shadow-md">

                    {/* Soft Yellow Image Container like Product Card */}
                    <div className="relative w-36 h-36 bg-[#FFE394]/20 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-4 drop-shadow-sm group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-4 w-full text-center sm:text-left">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#F48F68] font-black">{item.category}</span>
                        <h3 className="text-xl font-black tracking-tight text-[#332D20] mt-0.5">{item.title}</h3>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start gap-8">
                        {/* +/- Live Quantity Controls */}
                        <div className="flex items-center bg-[#FFF6DE] rounded-full px-3 py-1.5 border border-[#FFE394]">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-[#332D20]/60 hover:text-[#F48F68] p-1 transition-colors">
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="w-10 text-center font-black text-sm text-[#332D20]">{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-[#332D20]/60 hover:text-[#F48F68] p-1 transition-colors">
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                        <p className="text-xl font-black text-[#332D20]">£{item.price * (item.quantity || 1)}</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-3 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* --- SUMMARY COLUMN --- */}
              <div className="lg:col-span-5">
                <div className="sticky top-32 p-8 rounded-[32px] border-2 border-[#FFE394]/40 bg-white shadow-md">
                  <div className="flex items-center gap-2 mb-8 text-[#332D20]/60">
                    <CreditCard size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Order Summary</span>
                  </div>

                  <div className="space-y-5">
                    <div className="flex justify-between text-[#332D20]/70 text-sm font-semibold">
                      <span>Merchandise Subtotal</span>
                      <span className="text-[#332D20] font-bold">£{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#332D20]/70 text-sm font-semibold">
                      <span>Shipping & Handling</span>
                      <span className="text-[#332D20] font-bold">
                        {shipping === 0 ? <span className="text-green-600 font-black">FREE</span> : `£${shipping}`}
                      </span>
                    </div>

                    {/* --- NEW: COUPON INPUT & APPLY SECTION --- */}
                    <div className="pt-4 pb-2 border-t border-[#FFE394]/30 mt-4">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-black text-[#332D20]/50 mb-2.5">
                        <Ticket size={12} className="text-[#F48F68]" />
                        <span>Have a Coupon?</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="ENTER CODE"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={discountPercent > 0}
                          className="flex-1 px-4 py-2.5 bg-[#FFF6DE]/40 border-2 border-[#FFE394]/40 rounded-xl text-xs font-mono font-bold tracking-wider focus:outline-none focus:border-[#F48F68] uppercase transition-colors text-[#332D20] placeholder-[#332D20]/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={discountPercent > 0 || isValidating}
                          className="bg-[#332D20] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#332D20]/90 transition-all disabled:bg-green-600 disabled:text-white"
                        >
                          {isValidating ? "..." : discountPercent > 0 ? "APPLIED" : "APPLY"}
                        </button>
                      </div>

                      {/* Coupon Alerts */}
                      {couponError && <p className="text-xs text-red-500 font-bold mt-2 tracking-wide">⚠️ {couponError}</p>}
                      {couponSuccess && <p className="text-xs text-green-600 font-bold mt-2 tracking-wide">🎉 {couponSuccess}</p>}
                    </div>

                    <div className="h-px bg-[#FFE394]/40 my-4" />

                    {/* --- NEW: DISCOUNT BREAKDOWN ROW --- */}
                    {discountPercent > 0 && (
                      <div className="flex justify-between items-center text-sm font-bold text-green-600 bg-green-50/50 border border-green-100 px-4 py-2.5 rounded-xl">
                        <span className="text-xs uppercase tracking-wider font-black">Coupon Discount ({discountPercent}%)</span>
                        <span>-£{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-end pt-2">
                      <span className="text-xs uppercase tracking-widest text-[#332D20]/50 font-black">Total Amount</span>
                      <span className="text-4xl font-black tracking-tight text-[#332D20]">£{total}</span>
                    </div>
                  </div>


                  {/* Checkout Button styled exactly like 'Add' button theme */}

                  <Link
                    href={{
                      pathname: "/checkout",
                      query: {
                        discount: discountPercent,
                        total: total,
                      },
                    }}
                  >


                    <button className="w-full mt-8 h-14 bg-[#F48F68] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#F48F68]/20 active:scale-95">
                      Complete Purchase
                    </button>
                  </Link>
                  <div className="mt-6 pt-6 border-t border-[#FFE394]/40 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-[#332D20]/70">
                      <ShieldCheck size={14} className="text-[#8BDFDD]" /> Secured by SSL
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-[#FFF6DE] border border-[#FFE394] rounded-sm text-[8px] flex items-center justify-center font-bold text-gray-400">VISA</div>
                      <div className="w-8 h-5 bg-[#FFF6DE] border border-[#FFE394] rounded-sm text-[8px] flex items-center justify-center font-bold text-gray-400">UPI</div>
                    </div>
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