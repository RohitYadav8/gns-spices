"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#0a0503] border-b border-white/5 px-6 py-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Pure Spices · Lab-Tested · Family-Owned
        </span>
        <span className="hidden md:block">Free Shipping on Retail Orders Over £40</span>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0503]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/GNS-LOGO.png" alt="GNS Spices" className="h-12 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 text-sm font-medium text-zinc-300">
              <Link href="/shop" className="hover:text-amber-400 transition-colors">Shop</Link>
              <Link href="/masalas" className="hover:text-amber-400 transition-colors">Masalas</Link>
              <Link href="/B2B" className="hover:text-amber-400 transition-colors">B2B</Link>
              <Link href="/PrivateLabel" className="hover:text-amber-400 transition-colors">Private Label</Link>
              <Link href="/cart" className="relative hover:text-amber-400 transition-colors">
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-[2px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* ✅ User logged in hai toh naam dikhao, warna Account button */}
            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-5 py-2 text-sm font-bold text-amber-400 hover:border-amber-400 hover:bg-amber-500/20 transition-all"
              >
                <User size={14} />
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link
                href="/account"
                className="rounded-full border border-zinc-700 px-6 py-2 text-sm font-medium text-white hover:border-amber-400 hover:text-amber-400 transition-all"
              >
                Account
              </Link>
            )}
          </div>

          {/* Mobile — Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className="relative text-zinc-300 hover:text-amber-400">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-[2px]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-zinc-300 hover:text-white">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a0503] border-t border-white/10 px-6 py-6 flex flex-col gap-5 text-sm font-medium text-zinc-300">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Shop</Link>
            <Link href="/masalas" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Masalas</Link>
            <Link href="/B2B" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">B2B</Link>
            <Link href="/PrivateLabel" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Private Label</Link>

            {/* ✅ Mobile mein bhi user naam */}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-zinc-700 px-6 py-2 text-center text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              {user ? (
                <>
                  <User size={14} />
                  {user.name.split(" ")[0]}
                </>
              ) : (
                "Account"
              )}
            </Link>
          </div>
        )}

      </nav>
    </>
  );
}
