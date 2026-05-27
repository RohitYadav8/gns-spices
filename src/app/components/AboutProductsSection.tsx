"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function AboutProductsSection() {
  return (
    <section className="py-24 bg-[#FFF6DE]">
      {/* From our shelves banner */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#F48F68] text-[10px] font-black uppercase tracking-[0.35em] mb-1">
              ESSENTIALS
            </p>
            <h2 className="text-2xl font-black text-[#332D20]">From our shelves</h2>
          </div>
          <Link
            href="/shop"
            className="text-[#F48F68] text-sm font-black flex items-center gap-1 hover:gap-3 transition-all"
          >
            View all &rarr;
          </Link>
        </div>
        
        <Link href="/shop" className="block group">
          <div className="bg-white border-2 border-[#FFE394]/40 rounded-2xl p-6 flex items-center justify-center gap-3 transition-all hover:border-[#8BDFDD] hover:shadow-lg hover:shadow-[#332D20]/5">
            <Search className="text-[#332D20]/30 w-5 h-5" />
            <p className="text-[#332D20]/60 text-sm font-semibold">
              Looking for an everyday essential? <span className="text-[#F48F68] group-hover:underline">View all of our masalas here.</span>
            </p>
          </div>
        </Link>
      </div>

      {/* Main About Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#F48F68] text-[10px] font-black uppercase tracking-[0.35em] mb-3">
              THE STORY
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#332D20] mb-6 leading-tight">
              From a single sack of pepper to a family of spices.
            </h2>
            <div className="space-y-6 text-[#332D20]/70 text-lg font-medium">
              <p>
                Our grandfather started GNS with one sack of Malabar black pepper and a borrowed scale. Three generations later, we still source from the same hill villages — only now we ship to 28 countries, blend for Michelin kitchens, and quietly stand behind a dozen private-label brands you already know.
              </p>
              <p>
                Every spice we sell is traceable to a farm. Every blend is recorded by name and number, the way Grandfather did it. Some things shouldn't change.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex text-[#F48F68] font-black items-center gap-2 mt-8 hover:gap-4 transition-all"
            >
              Read the full story <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Quote Card */}
            <div className="bg-[#8BDFDD]/20 rounded-[32px] p-10 relative overflow-hidden border-2 border-[#8BDFDD]/30">
              <div className="absolute top-0 right-4 text-[120px] text-[#8BDFDD]/40 font-serif leading-none select-none">
                "
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-[#332D20] leading-tight mb-8">
                  "Pure spice doesn't need a sales pitch. It needs a fair price and an honest scale."
                </h3>
                <p className="text-[#332D20]/80 text-sm font-black uppercase tracking-widest">
                  — G. N. Subramanian, Founder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}