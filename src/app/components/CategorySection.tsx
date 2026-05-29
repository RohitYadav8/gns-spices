"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // डमी डेटा (इसे आप अपने API कॉल से बदल सकते हैं)
    const mockCategories = [
      { _id: "1", name: "Whole Spices", description: "Freshly sourced, sun-dried whole seeds directly from the farm.", image: "/whole-spices.png" },
      { _id: "2", name: "Pure Powders", description: "Stone-ground for maximum aroma, texture, and natural flavor.", image: "/pure-powders-1.png" },
      { _id: "3", name: "Signature Masala", description: "Hand-crafted secret blends passed down through generations.", image: "/signature-masalas.png" },
      { _id: "4", name: "Whole Seeds", description: "Everyday kitchen staples, essential for authentic Indian tadka.", image: "/whole-seeds.png" },
    ];
    setCategories(mockCategories);
    setLoading(false);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0503] py-28 min-h-[600px] text-white">
      {/* BACKGROUND GLOWS - PREMIUM FEEL */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] bg-amber-900/10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-red-900/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-0.5 w-16 bg-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">OUR RANGE</span>
            <div className="h-0.5 w-16 bg-amber-600" />
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-white">Shop by category</h2>
        </div>

        {loading ? (
          <div className="flex justify-center"><div className="w-10 h-10 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/shop?category=${encodeURIComponent(item.name)}`} className="group block h-full">
                  {/* CARD CONTAINER */}
                  <div className="relative overflow-hidden rounded-[2rem] h-[450px] border border-white/10 bg-zinc-900/50 transition-all duration-500 hover:border-amber-500/50 hover:bg-zinc-900/80">

                    {/* IMAGE SECTION */}
                    {/* IMAGE SECTION */}
                    <div className="relative h-[250px] w-full overflow-hidden bg-black/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        // 'object-cover' की जगह 'object-contain' का इस्तेमाल करें अगर पूरी इमेज दिखानी है, 
                        // या 'object-cover' रहने दें और 'object-center' सुनिश्चित करें।
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* CONTENT SECTION */}
                    <div className="p-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-2">CATEGORY</p>
                      <h3 className="text-2xl font-bold mb-3 text-white">{item.name}</h3>
                      <p className="text-sm text-zinc-400 mb-8 leading-relaxed line-clamp-2">{item.description}</p>

                      {/* EXPLORE LINK */}
                      <div className="absolute bottom-8 left-8 flex items-center gap-2 text-sm font-bold text-amber-500 group-hover:gap-4 transition-all">
                        Explore <ArrowRight size={16} />
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