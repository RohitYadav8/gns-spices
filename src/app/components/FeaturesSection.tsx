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
    <section className="bg-[#0a0503] py-20 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <h3 className="text-xl md:text-2xl font-bold text-amber-500">
                {f.title}
              </h3>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}