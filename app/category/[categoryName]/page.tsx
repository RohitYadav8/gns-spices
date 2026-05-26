"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Search, ShoppingCart, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface Product {
  _id: string;
  title: string;
  category: string;
  desc: string;
  badge: string;
  image: string;
  price: number;
}

// Slugs are URL friendly (lowercase with dashes)
const CATEGORIES = [
  { name: "All Products", slug: "all" },
  { name: "Pure Powders", slug: "pure-powders" },
  { name: "Whole Seeds", slug: "whole-seeds" },
  { name: "Signature Masalas", slug: "signature-masalas" },
  { name: "Indian Pickles", slug: "indian-pickels" },
];

export default function CategoryPage() {
  const params = useParams();
  // URL se category ka naam nikalega (e.g., 'whole-seeds')
  const currentCategorySlug = typeof params?.categoryName === "string" ? params.categoryName : "all";

  const { addToCart } = useCart();
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

  // Filter Logic matching the URL Parameter
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((item) => {
      if (!item) return false;

      // Convert DB category to slug format (e.g., "Whole Seeds" -> "whole-seeds")
      const itemCategorySlug = item.category 
        ? String(item.category).toLowerCase().trim().replace(/\s+/g, "-") 
        : "";

      const matchCategory =
        currentCategorySlug === "all" || itemCategorySlug === currentCategorySlug;

      const productTitle = item.title ? String(item.title).toLowerCase().trim() : "";
      const matchSearch = productTitle.includes(search.toLowerCase().trim());

      return matchCategory && matchSearch;
    });
  }, [currentCategorySlug, search, products]);

  // Current active category ka sunder naam heading me dikhane k liye
  const activeCategoryName = useMemo(() => {
    const found = CATEGORIES.find(c => c.slug === currentCategorySlug);
    return found ? found.name : currentCategorySlug.replace(/-/g, " ");
  }, [currentCategorySlug]);

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
        
        {/* Decorative Background Gradients */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] bg-[#8BDFDD]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#F48F68]/10 blur-[150px] pointer-events-none" />

        <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] font-black text-[#332D20]/[0.02] uppercase select-none pointer-events-none whitespace-nowrap">
          GNS SPICES
        </h1>

        <div className="relative max-w-7xl mx-auto">
          
          {/* BREADCRUMB & HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#F48F68]">
                <span>Shop</span>
                <ChevronRight size={12} />
                <span className="text-[#332D20]/60">Category</span>
                <ChevronRight size={12} />
                <span className="text-[#332D20]">{activeCategoryName}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-none text-[#332D20] tracking-tight capitalize">
                {activeCategoryName}
              </h1>
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
                  placeholder="Search in this category..."
                  className="w-full lg:w-[260px] bg-transparent outline-none text-sm text-[#332D20] placeholder-[#332D20]/40 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="h-full px-6 bg-[#8BDFDD] text-[#332D20] font-black hover:bg-[#8BDFDD]/80 transition-all text-sm tracking-wide"
                >
                  {search ? "Clear" : "Search"}
                </button>
              </div>
            </div>
          </div>

          {/* MAIN LAYOUT: SIDEBAR + GRID */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            
            {/* SIDEBAR CATEGORY NAVIGATION */}
            <div className="w-full md:w-64 bg-white p-6 rounded-[24px] border-2 border-[#FFE394]/40 shadow-sm sticky top-28">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#F48F68] mb-4">Categories</h2>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = currentCategorySlug === cat.slug;
                  return (
                    <Link
                      key={cat.slug}
                      href={cat.slug === "all" ? "/products" : `/category/${cat.slug}`}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-[#8BDFDD] text-[#332D20]"
                          : "bg-transparent text-[#332D20]/80 hover:bg-[#FFF6DE]"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="flex-1 w-full">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((item) => (
                    <div
                      key={item._id}
                      className="group relative overflow-hidden rounded-[32px] border-2 border-[#FFE394]/40 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#8BDFDD] hover:shadow-xl hover:shadow-[#332D20]/5"
                    >
                      <div className="absolute right-4 top-4 z-20 rounded-full bg-[#FFE394] px-3 py-1 text-xs font-extrabold text-[#332D20] border border-[#FFE394] capitalize">
                        {item.category}
                      </div>

                      <div className="relative flex h-[240px] items-center justify-center bg-[#FFE394]/20 rounded-2xl group-hover:bg-[#8BDFDD]/10 transition-colors duration-500">
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
                            <span className="text-2xl font-black text-[#332D20]">₹{item.price}</span>
                            <p className="text-[10px] text-[#F48F68] font-black uppercase tracking-widest mt-0.5">100g Pack</p>
                          </div>

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
              ) : (
                <div className="py-24 text-center bg-white rounded-[32px] border-2 border-[#FFE394]/40">
                  <h2 className="text-2xl font-black text-[#332D20]/40">No Spices Found</h2>
                  <p className="text-[#332D20]/60 mt-2 font-semibold">Is category mein abhi koi naya stock nahi hai.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}