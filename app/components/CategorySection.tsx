"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Pure Powders",
    desc: "Turmeric, chilli, coriander & more",
    link: "/shop?category=Pure Powders",
    bg: "bg-[#E8B400]",
    text: "text-[#1A120B]",
  },

  {
    title: "Signature Masalas",
    desc: "Garam, biryani, tandoori, kitchen king",
    link: "/shop?category=Signature Masalas",
    bg: "bg-[#E3162B]",
    text: "text-[#F48F68] ",
  },

  {
    title: "Whole Seeds",
    desc: "Mustard & cumin for tempering",
    link: "/shop?category=Whole Seeds",
    bg: "bg-[#2FA84F]",
    text: " text-[#8BDFDD] ",
  },

  {
    title: "Whole Spices",
    desc: "Tellicherry pepper, bay leaves",
    link: "/shop?category=Whole Spices",
    bg: "bg-[#120905]",
    text: "text-[#F48F68] ",
  },
];
export default function CategorySection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-28">

      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF6DE] via-[#FFF6DE] to-[#f8ecd0]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* TOP LABEL */}
        <div className="mb-5 flex items-center justify-center gap-4">

          <div className="h-[2px] w-16 bg-[#F48F68]" />

          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#F48F68]">
            OUR RANGE
          </span>

          <div className="h-[2px] w-16 bg-[#F48F68]" />

        </div>

        {/* HEADING */}
        <h2 className="text-center text-3xl font-black tracking-tight text-[#1A120B] md:text-7xl">
          Shop by category
        </h2>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

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
                    rounded-[34px]
                    min-h-[460px]
                    p-10
                    transition-all duration-500
                    group-hover:-translate-y-2
                    group-hover:shadow-2xl
                  `}
                >

                  {/* SOFT GLOW */}
                  <div className="absolute left-[-60px] top-[-60px] h-[220px] w-[220px] rounded-full bg-white/20 blur-[70px]" />

                  {/* CONTENT */}
                  <div className="relative z-10 flex h-full flex-col justify-between">

                    {/* TOP */}
                    <div>

                      <p className="text-[11px] font-bold uppercase tracking-[0.35em] opacity-70">
                        CATEGORY
                      </p>

                    </div>

                    {/* BOTTOM */}
                    <div>

                      <h3 className="text-4xl font-black leading-tight">
                        {item.title}
                      </h3>

                      <p className="mt-6 max-w-[240px] text-lg leading-8 opacity-90">
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