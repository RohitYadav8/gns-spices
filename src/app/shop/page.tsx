"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  category: string;
  desc: string;
  badge: string;
  image: string;
  price: number;
}

const CATEGORIES = ["All", "Pure Powders", "Whole Seeds", "Signature Masalas", "Indian Pickels"];

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
          {/* HEADER */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Shop</h1>
          <p className="text-zinc-400 mb-12 text-lg">Explore our handcrafted spice collection.</p>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col md:flex-row gap-6 mb-16">
            <div className="flex-1 flex items-center bg-[#110d0b] rounded-2xl border border-zinc-800 h-16 px-4">
              <Search className="text-zinc-500 ml-2" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search premium spices..."
                className="w-full bg-transparent outline-none px-4 text-white"
              />
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
                    ? "bg-white text-black font-bold border-white"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-[#110d0b] p-6 rounded-3xl border border-zinc-800 hover:border-zinc-600 transition-all">
            
<div className="relative h-48 mb-6 bg-white rounded-2xl overflow-hidden">
  <Image 
    src={item.image} 
    alt={item.title} 
    fill 
    className="object-contain p-2" // यहाँ object-cover से बदलकर object-contain किया है
  />
</div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{item.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                  <span className="text-xl font-black">£{item.price}</span>
                  <button
                    onClick={() => addToCart({ id: item._id, ...item })}
                    className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200"
                  >
                    Add
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