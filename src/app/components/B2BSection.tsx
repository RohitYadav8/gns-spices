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
    accent: "#8BDFDD",
  
  },
  {
    tag: "BUILD YOUR BRAND",
    title: "Private Label",
    desc: "Launch your own spice range with custom blends, packaging, and sourcing.",
    link: "/PrivateLabel",
    accent: "#F48F68",
  
  },
];

export default function B2BSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Heading Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#332D20]">Business Solutions</h2>
        </div>

        {/* Cards Grid - Adjusted for smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={card.link} className="group block">
                {/* Yaha height kam kar di hai (p-6 aur h-auto) */}
                <div className="relative flex flex-col rounded-[24px] border-2 border-[#FFE394]/40 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#8BDFDD] shadow-sm">
                  
                  {/* Image area chhota kiya */}
                 

                  {/* Content area */}
                  <p className="mb-2 text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: card.accent }}>
                    {card.tag}
                  </p>
                  
                  <h3 className="text-2xl font-black text-[#332D20] mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[#332D20]/70 font-medium mb-6">
                    {card.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mt-auto" style={{ color: card.accent }}>
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