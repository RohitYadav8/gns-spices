"use client";

import { motion } from "framer-motion";

const features = [
  { title: "100% Pure", desc: "NO FILLERS, NO COLOUR" },
  { title: "Lab-Tested", desc: "EVERY SINGLE BATCH" },
  { title: "Direct Trade", desc: "FROM 230+ FARMERS" },
  { title: "Family Owned", desc: "THREE GENERATIONS" },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-24">

      {/* BACKGROUND GLOWS */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[#8BDFDD]/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#F48F68]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* TOP LABEL */}
        <div className="mb-6 flex items-center justify-center gap-4">

          <div className="h-0.5 w-16 bg-[#F48F68]" />

          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F48F68]">
            WHY GNSSPICES
          </span>

          <div className="h-0.5 w-16 bg-[#F48F68]" />

        </div>

        {/* HEADING */}
        <h2 className="mx-auto max-w-4xl text-center text-2xl font-black leading-tight tracking-[-0.04em] text-[#332D20] md:text-4xl">
          Crafted with purity,
          <br />
          rooted in trust
        </h2>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
            >

              <div
                className="group relative overflow-hidden rounded-[34px] border border-[#FFE394]/60 bg-white/80 p-9 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]"
              >

                {/* HOVER GLOW */}
                <div
                  className="absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top, ${f.glow}, transparent 70%)`,
                  }}
                />

                {/* TOP BORDER */}
                <div
                  className="absolute left-0 top-0 h-0.75 w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: f.accent,
                  }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center text-center">

                  {/* ICON */}
                  <div
                    className="mb-6 flex h-18 w-18 items-center justify-center rounded-[24px] border border-white/40 shadow-lg transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${f.accent}15`,
                    }}
                  >
                    {f.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-[28px] font-black tracking-tight text-[#332D20]">
                    {f.title}
                  </h3>

                  {/* DESC */}
                  <p className="mt-4 text-[15px] leading-8 text-[#332D20]/65">
                    {f.desc}
                  </p>

                  {/* BUTTON */}
                  <button
                    className="mt-7 text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 group-hover:tracking-[0.24em]"
                    style={{
                      color: f.accent,
                    }}
                  >
                    Learn More →
                  </button>

                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}