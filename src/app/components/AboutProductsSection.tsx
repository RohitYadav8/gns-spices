"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";


export default function AboutProductsSection() {
  return (
    <section className="py-24 bg-[#0a0503] text-white">
      {/* Banner */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.35em] mb-1">ESSENTIALS</p>
            <h2 className="text-2xl font-bold text-white">From our shelves</h2>
          </div>
          <Link href="/shop" className="text-amber-500 text-sm font-black flex items-center gap-1 hover:gap-3 transition-all">
            View all &rarr;
          </Link>
        </div>
        <Link href="/shop" className="block group">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-3 transition-all hover:border-amber-500/50 hover:bg-white/[0.06]">
            <Search className="text-white/30 w-5 h-5" />
            <p className="text-white/60 text-sm font-semibold">
              Looking for an everyday essential? <span className="text-amber-500 group-hover:underline">View all of our masalas here.</span>
            </p>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: STORY TEXT */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.35em] mb-3">THE STORY</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              From a single sack of pepper to a family of spices.
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg font-medium">
              <p>Our grandfather started GNS with one sack of Malabar black pepper and a borrowed scale. Three generations later, we still source from the same hill villages — only now we ship to 28 countries.</p>
              <p>Every spice we sell is traceable to a farm. Every blend is recorded by name and number, the way Grandfather did it. Some things shouldn't change.</p>
            </div>
            <Link href="/about" className="inline-flex text-amber-500 font-bold items-center gap-2 mt-8 hover:gap-4 transition-all">
              Read the full story <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* RIGHT: IMAGE + QUOTE */}
       {/* RIGHT: IMAGE + QUOTE */}
{/* RIGHT: IMAGE + QUOTE */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
>
  <div className="relative h-[550px] w-full overflow-hidden rounded-[2rem] border border-white/10">
    <Image
      src="/Our-Story.png"
      alt="Legacy"
      fill
      className="object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

    {/* Quote Top */}
    <div className="absolute top-8 left-8 right-8 z-10">
      <div className="relative">
        <div className="absolute -top-8 right-0 text-[90px] font-serif leading-none text-amber-500/20 select-none">
          "
        </div>

        <h3 className="max-w-2xl text-2xl md:text-4xl font-bold leading-tight text-white">
          "Pure spice doesn't need a sales pitch. It needs a fair price and an
          honest scale."
        </h3>

        <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-amber-500">
          — G. N. Subramanian, Founder
        </p>
      </div>
    </div>
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
}