"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
  description: string;
  bg: string;
  text: string;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-28 min-h-[600px]">
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] bg-[#8BDFDD]/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[350px] w-[350px] bg-[#F48F68]/10 blur-[140px]" />

      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF6DE] via-[#FFF6DE] to-[#f8ecd0]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* TOP LABEL */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-0.5 w-16 bg-[#F48F68]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F48F68]">
            OUR RANGE
          </span>
          <div className="h-0.5 w-16 bg-[#F48F68]" />
        </div>

        {/* HEADING */}
        <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-[#332D20] md:text-4xl">
          Shop by category
        </h2>

        {/* LOADING STATE */}
        {loading ? (
          <div className="mt-20 flex justify-center">
             <div className="w-12 h-12 border-4 border-[#FFE394] border-t-[#F48F68] rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="mt-20 flex justify-center text-[#332D20]/60 font-semibold">
            <p>Categories list is empty.</p>
          </div>
        ) : (
          /* CARDS */
          <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((item, i) => (
              <motion.div
                key={item._id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                }}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(item.name)}`}
                  className="group block"
                >
                  <div
                    className={`
                      ${item.bg || 'bg-[#FFE394]'}
                      ${item.text || 'text-[#332D20]'}
                      relative overflow-hidden
                      rounded-[36px]
                      h-[380px]
                      border border-white/40
                      p-8
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                      backdrop-blur-xl
                      transition-all duration-500
                      group-hover:-translate-y-3
                      group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                    `}
                  >
                    {/* SOFT GLOW */}
                    <div className="absolute left-[-60px] top-[-60px] h-55 w-55 rounded-full bg-white/20 blur-[70px]" />

                    {/* CONTENT */}
                    <div className="relative z-10 flex h-full flex-col">
                      
                      {/* TOP & TEXT (FLEX-GROW pushes button down) */}
                      <div className="flex-grow">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-70 mb-8">
                          CATEGORY
                        </p>

                        <h3 className="text-[28px] font-black leading-[1.1] tracking-tight">
                          {item.name}
                        </h3>

                        <p className="mt-4 max-w-[240px] text-[15px] leading-relaxed opacity-80 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* BUTTON ALIGNED TO EXACT BOTTOM */}
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 border-b border-current pb-1 text-base font-bold transition-all duration-300 group-hover:gap-4">
                          Explore
                          <ArrowRight size={18} />
                        </span>
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}