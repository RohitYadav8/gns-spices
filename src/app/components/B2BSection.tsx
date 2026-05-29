"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    tag: "FOR TRADE",
    title: "Wholesale & B2B",
    desc: "Tiered pricing, credit terms, and dedicated support for restaurants and retailers.",
    link: "/B2B",
    accent: "#d97706", // Amber-600
  },
  {
    tag: "BUILD YOUR BRAND",
    title: "Private Label",
    desc: "Launch your own spice range with custom blends, packaging, and sourcing.",
    link: "/PrivateLabel",
    accent: "#b91c1c", // Red-700
  },
];

export default function B2BSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0503] py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Heading Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Business Solutions</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={card.link} className="group block h-full">
                <div className="relative flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06] shadow-xl">
                  
                  {/* Content area */}
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: card.accent }}>
                    {card.tag}
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-zinc-400 font-medium mb-8">
                    {card.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest mt-auto" style={{ color: card.accent }}>
                    Learn more
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}