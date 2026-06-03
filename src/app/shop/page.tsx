"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Tier {
  name: string;
  weight: string;
  desc: string;
}

interface Product {
  _id: string;
  title: string;
  category: string;
  desc: string;
  badge: string;
  image: string;
  price: number;
  origin?: string;
  tiers?: Tier[];
}

const CATEGORIES = ["All", "Pure Powders", "Whole Seeds", "Signature Masalas", "Indian Pickels"];

const TIER_COLORS: Record<string, string> = {
  "Home Kitchen": "border-green-500 text-green-400",
  "Professional Choice": "border-red-500 text-red-400",
  "Chef's Reserve": "border-yellow-600 text-yellow-500",
  "House Selection": "border-amber-400 text-amber-400",
};

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await fetch("/api/admin/get-products");
        const data = await response.json();
        if (data.success && data.products) setProducts(data.products);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center text-white">
        Loading Premium Spices...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#0a0503] py-20 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">

          {/* HEADER + SEARCH */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-16 bg-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 whitespace-nowrap">
                  The Full Range
                </span>
                <span className="h-px w-16 bg-amber-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Shop</h1>
              <p className="text-zinc-400 mt-2 text-sm">{products.length} products · Shipping to GB.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#110d0b] rounded-2xl border border-zinc-800 h-14 px-4 w-80">
                <Search className="text-zinc-500 shrink-0" size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search spices, blends, origins..."
                  className="w-full bg-transparent outline-none text-white text-sm px-3"
                />
              </div>
              <button className="btn-primary h-14 px-8 shrink-0">Search</button>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-3 mb-16">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  selectedCategory === item
                    ? "bg-amber-400 text-black font-bold border-white"
                    : "border-zinc-800 text-zinc-400 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-[#110d0b] p-6 rounded-3xl border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col">

                {/* IMAGE */}
                <div className="relative h-64 mb-6 bg-white rounded-2xl overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                </div>

                {/* CATEGORY */}
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">{item.category}</p>

                {/* TITLE */}
                <h2 className="text-xl font-black mb-2">{item.title}</h2>

                {/* DESC */}
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{item.desc}</p>

                {/* ORIGIN */}
                {item.origin && (
                  <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">{item.origin}</p>
                )}

                {/* TIERS */}
                {item.tiers && item.tiers.length > 0 && (
                  <div className="border-t border-zinc-800 pt-4 mb-4 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {item.tiers.length === 1 ? "One Tier" : item.tiers.length === 2 ? "Two Tiers" : "Three Tiers"}
                    </p>
                    {item.tiers.map((tier, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <span className={`border px-3 py-1 rounded-full text-xs font-black uppercase ${TIER_COLORS[tier.name] || 'border-zinc-500 text-zinc-400'}`}>
                            {tier.name}
                          </span>
                          {tier.weight && (
                            <span className="text-zinc-400 text-xs">{tier.weight}</span>
                          )}
                        </div>
                        {tier.desc && (
                          <p className="text-zinc-500 text-xs mt-1">{tier.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* PRICE + ADD */}
                <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-4">
                  <div>
                    <span className="text-xl font-black">£{item.price}</span>
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">100G Pack</p>
                  </div>
                  <button
                    onClick={() => addToCart({ id: item._id, ...item })}
                    className="flex items-center gap-2 bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-500"
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}