"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // total items count (quantity included)
  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0503]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/GNS-LOGO.png"
            alt="GNS Spices"
            className="h-12 w-auto"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>

            <Link href="/masalas" className="hover:text-white transition-colors">
              Masalas
            </Link>

            <Link href="/B2B" className="hover:text-white transition-colors">
              B2B
            </Link>

            <Link href="/PrivateLabel" className="hover:text-white transition-colors">
              PrivateLabel
            </Link>

            {/* CART WITH BADGE */}
            <Link
              href="/cart"
              className="relative hover:text-white transition-colors"
            >
              Cart

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-[2px]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Account */}
          <Link
            href="/account"
            className="rounded-full border border-zinc-700 px-6 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition-all"
          >
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}