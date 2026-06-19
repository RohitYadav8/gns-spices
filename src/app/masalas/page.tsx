"use client";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect, Suspense } from "react";
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

const CATEGORIES = ["All", "Pure Powders", "Whole Seeds", "Signature Masalas", "Indian Pickles"];

const TIER_COLORS: Record<string, string> = {
  "Home Kitchen": "border-green-500 text-green-400",
  "Professional Choice": "border-red-500 text-red-400",
  "Chef's Reserve": "border-yellow-600 text-yellow-500",
  "House Selection": "border-amber-400 text-amber-400",
};

function PageContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Signature Masalas";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
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
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((item) => {
      const itemCategory = item.category ? String(item.category).toLowerCase().trim() : "";
      const selectedCatLower = selectedCategory.toLowerCase().trim();
      const matchCategory = selectedCategory === "All" || itemCategory === selectedCatLower;
      const productTitle = item.title ? String(item.title).toLowerCase().trim() : "";
      const matchSearch = productTitle.includes(search.toLowerCase().trim());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search, products]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0503] flex items-center justify-center text-white">
      Loading...
    </div>
  );

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#0a0503] py-20 px-4 md:px-12 text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto">

          {/* HEADER + SEARCH */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
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

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center bg-[#110d0b] rounded-2xl border border-zinc-800 h-12 px-4 flex-1 md:w-72">
                <Search className="text-zinc-500 shrink-0" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search spices..."
                  className="w-full bg-transparent outline-none text-white text-sm px-3"
                />
              </div>
              <button className="btn-primary h-12 px-5 shrink-0">Search</button>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`px-4 py-2 rounded-full border transition-all text-sm ${
                  selectedCategory === item
                    ? "bg-amber-400 text-black font-bold border-amber-400"
                    : "bg-[#110d0b] border-zinc-800 text-zinc-400 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-[#110d0b] p-5 rounded-3xl transition-all w-full">

                <div className="relative h-56 mb-5 bg-white rounded-2xl overflow-hidden w-full">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">{item.category}</p>
                <h2 className="text-xl font-black mb-2">{item.title}</h2>
                <p className="text-zinc-400 text-sm mb-3">{item.desc}</p>

                {item.origin && (
                  <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">{item.origin}</p>
                )}

                {item.tiers && item.tiers.length > 0 && (
                  <div className="border-t border-zinc-800 pt-4 mb-4 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {item.tiers.length === 1 ? "One Tier" : item.tiers.length === 2 ? "Two Tiers" : "Three Tiers"}
                    </p>
                    {item.tiers.map((tier, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`border px-2 py-0.5 rounded-full text-[10px] font-black uppercase whitespace-nowrap shrink-0 ${TIER_COLORS[tier.name] || 'border-zinc-500 text-zinc-400'}`}>
                            {tier.name}
                          </span>
                          {tier.weight && (
                            <span className="text-zinc-400 text-xs shrink-0">{tier.weight}</span>
                          )}
                        </div>
                        {tier.desc && (
                          <p className="text-zinc-500 text-xs mt-1">{tier.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center text-white">
        Loading...
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}