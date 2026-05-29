"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
interface Product {
  _id: string;
  title: string;
  category: string;
  desc: string;
  badge: string;
  image: string;
  price: number;
}

const CATEGORIES = [
  "All",
  "Pure Powders",
  "Whole Seeds",
  "Signature Masalas",
  "Indian Pickels",
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

const initialCategory =
  searchParams.get("category") || "All";

const [selectedCategory, setSelectedCategory] =
  useState(initialCategory);
  const [search, setSearch] = useState("");


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await fetch("/api/admin/get-products");
        const data = await response.json();

        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products from MongoDB:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  // Bulletproof filter logic to fix case sensitivity and empty pages
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((item) => {
      if (!item) return false;

      const itemCategory = item.category ? String(item.category).toLowerCase().trim() : "";
      const selectedCatLower = selectedCategory.toLowerCase().trim();

      const matchCategory =
        selectedCategory === "All" || itemCategory === selectedCatLower;

      const productTitle = item.title ? String(item.title).toLowerCase().trim() : "";
      const matchSearch = productTitle.includes(search.toLowerCase().trim());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF6DE] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#F48F68] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-xl text-[#332D20]/80 tracking-widest uppercase animate-pulse">
          Loading Premium Spices...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-[#FFF6DE] py-32 px-6 md:px-12 text-[#332D20]">

        <div className="absolute top-0 left-0 h-[600px] w-[600px] bg-[#8BDFDD]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-125 w-125 bg-[#F48F68]/10 blur-[150px] pointer-events-none" />

        <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[240px] font-black text-[#332D20]/[0.03] uppercase select-none pointer-events-none">
          GNS
        </h1>

        <div className="relative max-w-7xl mx-auto">

          {/* PAGE HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-0.75 bg-[#F48F68]" />
                <p className="uppercase tracking-[4px] text-xs font-extrabold text-[#F48F68]">
                  Premium Spice Collection
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-none text-[#332D20] tracking-tight"><Link href="/shop">Shop</Link></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#332D20]/80 font-medium">
                Explore handcrafted spice blends, authentic Indian masalas, and premium culinary essentials.
              </p>
            </div>

            {/* SEARCH INPUT */}
            <div className="w-full lg:w-auto">
              <div className="flex items-center overflow-hidden rounded-2xl border-2 border-[#8BDFDD]/40 bg-white h-16 shadow-md shadow-[#332D20]/5 focus-within:border-[#8BDFDD]">
                <div className="px-5 text-[#332D20]/50">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search premium spices..."
                  className="w-full lg:w-[320px] bg-transparent outline-none text-sm text-[#332D20] placeholder-[#332D20]/40 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="h-full px-8 bg-[#8BDFDD] text-[#332D20] font-black hover:bg-[#8BDFDD]/80 transition-all text-sm tracking-wide"
                >
                  {search ? "Clear" : "Search"}
                </button>
              </div>
            </div>
          </div>

          {/* CATEGORIES CONTROLS */}
          <div className="mt-14 flex flex-wrap gap-4">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`rounded-full border-2 px-7 py-3 transition-all duration-300 font-bold text-sm ${selectedCategory === item
                    ? "border-[#8BDFDD] bg-[#8BDFDD] text-[#332D20] shadow-sm"
                    : "border-[#FFE394] bg-white text-[#332D20] hover:border-[#8BDFDD]"
                  }`}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="mt-14 mb-16 border-b-2 border-[#FFE394]/40" />

          {/* LIVE PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-4xl border-2 border-[#FFE394]/40 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#8BDFDD] hover:shadow-xl hover:shadow-[#332D20]/5"
              >
                <div className="absolute right-4 top-4 z-20 rounded-full bg-[#FFE394] px-3 py-1 text-xs font-extrabold text-[#332D20] border border-[#FFE394]">
                  {item.category}
                </div>

                <div className="relative flex h-[280px] items-center justify-center bg-[#FFE394]/20 rounded-2xl group-hover:bg-[#8BDFDD]/10 transition-colors duration-500">
                  <Image
                    src={item.image}
                    alt={item.title || "Premium GNS Spice Pack"}
                    width={400}
                    height={400}
                    className="h-full w-full object-contain p-4 drop-shadow-sm transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-black text-[#332D20] tracking-tight">{item.title}</h2>
                    <span className="text-2xl">{item.badge}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#332D20]/70 line-clamp-2 min-h-[40px] font-medium leading-relaxed">{item.desc}</p>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#FFE394]/40">
                    <div>
                      <span className="text-2xl font-black text-[#332D20]">£{item.price}</span>
                      <p className="text-[10px] text-[#F48F68] font-black uppercase tracking-widest mt-0.5">100g Pack</p>
                    </div>

                    {/* 🛒 ADD TO CART BUTTON ONLY */}
                    <button
                      onClick={() => addToCart({ id: item._id, ...item })}
                      className="flex items-center gap-2 rounded-full bg-[#F48F68] px-6 py-3 text-sm font-black text-white hover:opacity-90 shadow-md shadow-[#F48F68]/20 transition-all active:scale-95"
                    >
                      <ShoppingCart size={16} strokeWidth={2.5} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY QUERY EXCEPTION */}
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <h2 className="text-3xl font-black text-[#332D20]/40">No Spices Match Your Search</h2>
              <p className="text-[#332D20]/60 mt-2 font-semibold">Try updating your filters or refining search inputs.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}