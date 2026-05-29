"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  { title: "Kashmiri Chilli", desc: "Deep red colour with mild heat for curries & marinades.", image: "/red-chilli-powder.png", price: "£8" },
  { title: "Turmeric Powder", desc: "Premium Lakadong turmeric with rich aroma and colour.", image: "/turmeric-powder.png", price: "£6" },
  { title: "Garam Masala", desc: "Bold signature blend crafted for authentic Indian cooking.", image: "/garam-masala.png", price: "£10" },
  { title: "Whole Cumin", desc: "Freshly sourced cumin seeds packed with natural oils.", image: "/cumin.png", price: "£7" },
];

export default function BestsellerSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF6DE] py-28">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#8BDFDD]/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#F48F68]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-0.5 w-14 bg-[#F48F68]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#F48F68]">BESTSELLERS</span>
              <div className="h-0.5 w-14 bg-[#F48F68]" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-[#332D20] md:text-6xl">From our shelves</h2>
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-2 text-lg font-black text-[#F48F68] hover:gap-4 transition-all">
            View all <ArrowRight size={18} />
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-4xl border-2 border-[#FFE394]/40 bg-white p-5 transition-all duration-300 hover:border-[#8BDFDD] hover:shadow-xl hover:shadow-[#332D20]/5">
                
                {/* IMAGE */}
                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl mb-6">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-3 inline-block self-start rounded-full bg-[#8BDFDD]/10 px-4 py-1 text-[10px] font-black uppercase text-[#2D7A78]">
                    {item.price}
                  </div>
                  <h3 className="text-2xl font-black text-[#332D20] mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#332D20]/70 font-medium mb-8 flex-grow">{item.desc}</p>

                  {/* FIXED BUTTON */}
                  {/* FIXED BUTTON */}
<Link 
  href="/shop" 
  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#F48F68] hover:gap-4 transition-all"
>
  <div className="relative">
    <span>Explore</span>
    {/* Line ab text ke neeche rahegi aur cut nahi hogi */}
    <div className="h-0.5 w-full bg-[#FFE394] mt-0.5" />
  </div>
  <ArrowRight size={14} />
</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}