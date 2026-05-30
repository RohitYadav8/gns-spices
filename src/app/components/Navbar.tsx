"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0503]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <img 
            src="/GNS-LOGO.png" 
            alt="GNS Spices" 
            className="h-12 w-auto" 
          />
        </Link>

        {/* Links Section */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/masalas" className="hover:text-white transition-colors">Masalas</Link>
            <Link href="/B2B" className="hover:text-white transition-colors">B2B</Link>
            <Link href="/PrivateLabel" className="hover:text-white transition-colors">Private Label</Link>
            <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
          </div>

          {/* Account Button */}
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