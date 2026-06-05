


"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, Suspense } from "react";
import { useCart } from "@/app/context/CartContext";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  // Clear cart and verify payment when successful
  useEffect(() => {
    clearCart();

    if (session_id) {
      fetch("/api/admin/verify-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id }),
      }).catch(console.error);
    }
  }, [clearCart, session_id]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl shadow-xl p-10 text-center relative overflow-hidden border border-white/10 bg-zinc-950">
        
        {/* Gradient Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-amber-400" />
          </div>

          <h1 className="text-3xl font-black text-amber-400 mb-3">
            Order Successful!
          </h1>

          <p className="text-zinc-400 font-medium mb-8">
            Thank you for shopping with <span className="text-amber-400">GNS Spices</span>. 
            Your order has been placed and is being processed. 
            An email confirmation has been sent to the admin.
          </p>

          <Link
            href="/"
            className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl shadow-lg hover:bg-amber-400 transition-all duration-300 block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-400">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
