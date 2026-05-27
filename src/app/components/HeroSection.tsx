"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] pt-32 pb-20">
      
      {/* Glow Backgrounds */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#F48F68]/20 blur-[120px]" />

      <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-[#8BDFDD]/10 blur-[120px]" />

      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#FFE394]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#F48F68]">
            GNSSPICES
          </p>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-[#F48F68] md:text-6xl lg:text-7xl">
            Premium spices,
            <br className="hidden md:block" />

            <span className="bg-gradient-to-r from-[#F48F68] via-[#FFE394] to-[#8BDFDD] bg-clip-text text-transparent">
              honest blends.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
            Hand-picked from farms in Kerala, Tamil Nadu and Rajasthan.
            Slow-roasted in small batches and shipped worldwide.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="group flex items-center justify-center gap-2 rounded-full bg-[#FFE394] px-8 py-4 font-bold text-black transition-all duration-300 hover:scale-105"
            >
              Shop the range

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/b2b"
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-[#F48F68] backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
            >
              For businesses
            </Link>
          </div>

          {/* CERTIFICATIONS */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-zinc-500">
            <span>FSSAI Certified</span>
            <span>ISO 22000</span>
            <span>Export Quality</span>
            <span>Farm Direct</span>
          </div>
        </motion.div>

        {/* RIGHT IMAGE GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid h-[420px] grid-cols-2 gap-4 md:h-[540px]"
        >
          
          {/* TURMERIC */}
          <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-[32px]">
            <img
              src="/turmeric.jpg"
              alt="Turmeric"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#FFE394]">
                Single Origin
              </p>

              <h3 className="text-3xl font-black text-white">
                Turmeric
              </h3>

              <p className="mt-1 text-sm text-white/70">
                Erode, Tamil Nadu
              </p>
            </div>
          </div>

          {/* GREEN CHILLI */}
          <div className="group relative overflow-hidden rounded-[32px]">
            <img
              src="/green-chilli.jpg"
              alt="Green Chilli"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-2xl font-black text-white">
                Green Chilli
              </h3>

              <p className="mt-1 text-sm text-white/70">
                Bhavnagri
              </p>
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* RED CHILLI */}
            <div className="group relative overflow-hidden rounded-[28px]">
              <img
                src="/red-chilli.jpg"
                alt="Red Chilli"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-lg font-black leading-tight text-white">
                  Red Chilli
                </h3>

                <p className="mt-1 text-xs text-white/70">
                  Guntur
                </p>
              </div>
            </div>

            {/* SAFFRON */}
            <div className="group relative overflow-hidden rounded-[28px]">
              <img
                src="/saffron.jpg"
                alt="Kashmir Saffron"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFE394]">
                  Premium
                </p>

                <h3 className="text-sm font-black leading-tight text-white">
                  Kashmir Saffron
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}