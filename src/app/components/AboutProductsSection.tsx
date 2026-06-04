"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutProductsSection() {
  return (
    <section className="py-24 bg-[#0a0503] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: STORY TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="h-0.5 w-16 bg-amber-600" />

              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-500">
                OUR STORY
              </p>

              <div className="h-0.5 w-16 bg-amber-600" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              From a single sack of pepper to a family of spices.
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg font-medium">
              <p>
                Our grandfather started GNS with one sack of Malabar black
                pepper and a borrowed scale. Three generations later, we still
                source from the same hill villages — only now we ship to 28
                countries.
              </p>

              <p>
                Every spice we sell is traceable to a farm. Every blend is
                recorded by name and number, the way Grandfather did it. Some
                things shouldn't change.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 font-bold text-amber-500 transition-all hover:gap-4"
            >
              Read the full story
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* RIGHT: IMAGE + QUOTE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/Our-Story.png"
                alt="Legacy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

              {/* Quote */}
              <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-10">
                <div className="relative">
                  <div className="absolute -top-6 md:-top-8 right-0 text-[60px] md:text-[90px] font-serif leading-none text-amber-500/20 select-none">
                    "
                  </div>

                  <h3 className="max-w-2xl text-xl md:text-4xl font-bold leading-tight text-white">
                    "Pure spice doesn't need a sales pitch. It needs a fair
                    price and an honest scale."
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