"use client";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
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
  inStock: boolean;
}

const TIER_COLORS: Record<string, string> = {
  "Home Kitchen": "border-green-500 text-green-400",
  "Professional Choice": "border-red-500 text-red-400",
  "Chef's Reserve": "border-yellow-600 text-yellow-500",
  "House Selection": "border-amber-400 text-amber-400",
};

function TiersAccordion({ tiers }: { tiers: Tier[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-zinc-800 pt-3 mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition">
          {tiers.length === 1 ? "One Tier" : tiers.length === 2 ? "Two Tiers" : `${tiers.length} Tiers`}
        </p>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {tiers.map((tier, i) => (
            <div key={i}>
              <div className="flex items-center justify-between gap-2">
                <span className={`border px-2 py-0.5 rounded-full text-[10px] font-black uppercase whitespace-nowrap shrink-0 ${TIER_COLORS[tier.name] || "border-zinc-500 text-zinc-400"}`}>
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
    </div>
  );
}

function ShopContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    setSelectedCategory(cat);
  }, [searchParams]);

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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.success && data.categories) {
          setCategories(data.categories.map((c: { name: string }) => c.name));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
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
      {dropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
      )}
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
              <div className="flex items-center bg-[#110d0b] rounded-2xl border border-zinc-800 h-12 px-4 flex-1 md:w-80">
                <Search className="text-zinc-500 shrink-0" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search spices..."
                  className="w-full bg-transparent outline-none text-white text-sm px-3"
                />
              </div>
              <button className="btn-primary h-12 px-6 shrink-0">Search</button>
            </div>
          </div>

          {/* CATEGORIES DROPDOWN */}
          <div className="flex flex-wrap gap-3 mb-12 items-center">
            <div className="relative z-50">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all text-sm ${
                  selectedCategory === "All"
                    ? "bg-amber-400 text-black font-bold border-amber-400"
                    : "bg-amber-400 text-black font-bold border-amber-400"
                }`}
              >
                {selectedCategory === "All" ? "All" : selectedCategory}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-[#110d0b] border border-zinc-800 rounded-2xl overflow-hidden min-w-[200px] shadow-xl">
                  <button
                    onClick={() => { setSelectedCategory("All"); setDropdownOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm transition hover:bg-zinc-800 ${
                      selectedCategory === "All" ? "text-amber-400 font-bold" : "text-zinc-400"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm transition hover:bg-zinc-800 ${
                        selectedCategory === cat ? "text-amber-400 font-bold" : "text-zinc-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className={`bg-[#110d0b] p-5 rounded-3xl relative flex flex-col transition-all ${!item.inStock ? "opacity-60" : ""}`}
              >
                {!item.inStock && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Sold Out
                  </div>
                )}

                <div className="mb-5 bg-white rounded-2xl overflow-hidden shrink-0 relative">
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center rounded-2xl">
                      <span className="text-white font-black text-lg uppercase tracking-widest">
                        Sold Out
                      </span>
                    </div>
                  )}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={256}
                    quality={100}
                    className="w-full h-56 object-contain p-2"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">
                    {item.category}
                  </p>
                  <h2 className="text-xl font-black mb-2">{item.title}</h2>
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{item.desc}</p>

                  {item.origin && (
                    <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-3">
                      {item.origin}
                    </p>
                  )}

                  {item.tiers && item.tiers.length > 0 && (
                    <TiersAccordion tiers={item.tiers} />
                  )}

                  <div className="flex-1" />

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-3">
                    <div>
                      <span className={`text-xl font-black ${!item.inStock ? "text-zinc-500" : ""}`}>
                        £{item.price}
                      </span>
                      <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">
                        100G Pack
                      </p>
                    </div>
                    {item.inStock ? (
                      <button
                        onClick={() => addToCart({ id: item._id, ...item })}
                        className="flex items-center gap-2 bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-500 transition"
                      >
                        <ShoppingCart size={14} /> Add
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center gap-2 bg-zinc-800 text-zinc-500 px-5 py-2 rounded-full text-sm font-bold cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
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
      <ShopContent />
    </Suspense>
  );
}