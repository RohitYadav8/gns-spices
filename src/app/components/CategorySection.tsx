"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Pure Powders",
    desc: "Turmeric, chilli, coriander & more",
    link: "/shop?category=Pure Powders",
    bg: "bg-[#FFE394]",
    text: "text-[#332D20]",
  },

  {
    title: "Signature Masalas",
    desc: "Garam, biryani, tandoori, kitchen king",
    link: "/shop?category=Signature Masalas",
    bg: "bg-[#F48F68]",
    text: "text-white",
  },

  {
    title: "Whole Seeds",
    desc: "Mustard & cumin for tempering",
    link: "/shop?category=Whole Seeds",
    bg: "bg-[#8BDFDD]",
    text: "text-[#332D20]",
  },

  {
    title: "Whole Spices",
    desc: "Tellicherry pepper, bay leaves",
    link: "/shop?category=Whole Spices",
    bg: "bg-[#332D20]",
    text: "text-[#FFF6DE]",
  },
];

export default function CategorySection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-28">

      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] bg-[#8BDFDD]/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[350px] w-[350px] bg-[#F48F68]/10 blur-[140px]" />

      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF6DE] via-[#FFF6DE] to-[#f8ecd0]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* TOP LABEL */}
        <div className="mb-6 flex items-center justify-center gap-4">

          <div className="h-[2px] w-16 bg-[#F48F68]" />

          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F48F68]">
            OUR RANGE
          </span>

          <div className="h-[2px] w-16 bg-[#F48F68]" />

        </div>

        {/* HEADING */}
        <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-[#332D20] md:text-4xl">
          Shop by category
        </h2>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">

          {categories.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
              }}
            >

              <Link
                href={item.link}
                className="group block"
              >

                <div
                  className={`
                    ${item.bg}
                    ${item.text}
                    relative overflow-hidden
                    rounded-[36px]
                    min-h-[460px]
                    border border-white/40
                    p-10
                    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    backdrop-blur-xl
                    transition-all duration-500
                    group-hover:-translate-y-3
                    group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                  `}
                >

                  {/* SOFT GLOW */}
                  <div className="absolute left-[-60px] top-[-60px] h-[220px] w-[220px] rounded-full bg-white/20 blur-[70px]" />

                  {/* CONTENT */}
                  <div className="relative z-10 flex h-full flex-col justify-between">

                    {/* TOP */}
                    <div>

                      <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-70">
                        CATEGORY
                      </p>

                    </div>

                    {/* BOTTOM */}
                    <div>

                      <h3 className="text-[30px] font-black leading-[1] tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-6 max-w-[240px] text-[17px] leading-8 opacity-80">
                        {item.desc}
                      </p>

                      {/* BUTTON */}
                      <div className="mt-10">

                        <span className="inline-flex items-center gap-2 border-b border-current pb-1 text-lg font-bold transition-all duration-300 group-hover:gap-4">

                          Explore

                          <ArrowRight size={20} />

                        </span>

                      </div>

                    </div>

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