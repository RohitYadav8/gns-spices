"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Clear cart when payment is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-400/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>

          <h1 className="text-3xl font-black text-[#332D20] mb-3">
            Order Successful!
          </h1>
          
          <p className="text-[#332D20]/60 font-medium mb-8">
            Thank you for shopping with GNS Spices. Your order has been placed and is being processed. 
            An email confirmation has been sent to the admin.
          </p>

          <Link
            href="/"
            className="w-full bg-[#332D20] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#F48F68] transition-all duration-300 block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
