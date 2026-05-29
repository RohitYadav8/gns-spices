"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const recipes = [
  {
    badge: "GARAM MASALA NO. 7",
    title: "Kerala Chicken Curry",
    time: "45 MIN",
    serves: "SERVES 4",
    image: "/kerala-chicken-curry.png",
  },
  {
    badge: "GREEN CHANA MASALA",
    title: "Slow-Cooked Chana",
    time: "2 HR",
    serves: "SERVES 6",
    image: "/slow-cooked-chana.png",
  },
  {
    badge: "KASHMIRI SAFFRON",
    title: "Saffron Rice Pulao",
    time: "35 MIN",
    serves: "SERVES 4",
    image: "/saffron-rice-pulao.png",
  },
];

export default function RecipesSection() {
  return (
    <section className="bg-[#0a0503] py-24 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-500">
                FROM OUR KITCHEN
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Recipes worth the simmer
            </h2>
          </div>
          <p className="ml-4 max-w-xs text-zinc-400 font-medium leading-relaxed">
            Slow recipes our family makes on Sundays — written down for the first time, with the masalas that bring them to life.
          </p>
        </div>

        {/* RECIPES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer rounded-[2rem] overflow-hidden bg-white/[0.03] border border-white/10 transition-all hover:border-amber-500/50 hover:bg-white/[0.06]"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
              </div>

              {/* CARD CONTENT */}
              <div className="p-8">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 block">
                  {recipe.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {recipe.title}
                </h3>
                <div className="flex gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                  <span>{recipe.time}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{recipe.serves}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}