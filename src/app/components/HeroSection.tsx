"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFBF0] py-24 text-[#332D20]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] h-125 w-125 rounded-full bg-[#FFE394]/30 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-125 w-125 rounded-full bg-[#F48F68]/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <motion.div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F48F68]">GNSSPICES</p>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-[70px]">
            Premium spices, <span className="text-[#F48F68]">honest blends.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#332D20]/70">
            Hand-picked from farms in Kerala, Tamil Nadu and Rajasthan. 
            Slow-roasted in small batches and shipped worldwide.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/shop" className="flex items-center gap-2 rounded-full bg-[#332D20] px-8 py-4 font-bold text-white transition hover:bg-black">
              Shop the range <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* RIGHT SIDE GRID - Pura Structure Wapas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 gap-4 h-125"
        >
          {/* Main Product */}
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-[30px] border border-white shadow-2xl">
            <img src="/single-origin-turmeric.png" alt="Turmeric" className="h-full w-full object-cover" />
            <div className="absolute bottom-6 left-6 text-white">
              
            </div>
          </div>

          {/* Green Chilli */}
          <div className="relative overflow-hidden rounded-[30px] shadow-lg">
            <img src="/green-chilli-bhavnagri.png" alt="Green Chilli" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              
            </div>
          </div>

          {/* Bottom Small Cards */}
          <div className="grid grid-cols-2 gap-4">
             <div className="relative overflow-hidden rounded-[20px] shadow-lg">
               <img src="/red-chilli-guntur.png" alt="Red" className="h-full w-full object-cover" />
             </div>
             <div className="relative overflow-hidden rounded-[20px] shadow-lg">
               <img src="/saffron-kashmir.png" alt="Saffron" className="h-full w-full object-cover" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}