"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
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
  "Whole Spices",
  "Indian Pickles",
];

export default function ProductsPage() {
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

  if (loading) return <div className="min-h-screen bg-[#0a0503] flex items-center justify-center text-white">Loading...</div>;

  return (
    <>
      <Navbar />
      {/* Dark Theme Background - Matching Navbar */}
      <section className="min-h-screen bg-[#0a0503] py-20 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-10 tracking-tight text-white">Shop</h1>

          <div className="relative mb-10">
            <Search className="absolute left-4 top-4 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Search spices, blends, origins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#110d0b] border border-zinc-800 rounded-2xl px-12 py-4 outline-none focus:border-[#8BDFDD] text-white"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-16">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`px-6 py-3 rounded-full border transition-all ${
                  selectedCategory === item
                    ? "bg-[#8BDFDD] text-black font-bold border-[#8BDFDD]"
                    : "bg-[#110d0b] border-zinc-800 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Product Cards - Dark Theme Styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-[#110d0b] p-6 rounded-[30px] border border-zinc-800 hover:border-[#8BDFDD] transition-all flex flex-col h-full">
                <div className="relative h-[250px] w-full bg-zinc-900 rounded-[20px] mb-6 overflow-hidden flex items-center justify-center">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-4" />
                 
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-black text-white">{item.title}</h2>
                  {item.badge && <span className="text-xl">{item.badge}</span>}
                </div>

                <p className="text-zinc-400 text-sm mb-6 flex-grow">{item.desc}</p>

                <div className="flex items-end justify-between border-t border-zinc-800 pt-4 mt-auto">
                  <div>
                    <p className="text-3xl font-black text-white">£{item.price}</p>
                    <p className="text-[10px] font-black text-[#F48F68] uppercase tracking-widest">100G PACK</p>
                  </div>
                  
                  <button 
                    onClick={() => addToCart({ id: item._id, ...item })} 
                    className="bg-[#F48F68] text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                  >
                    <ShoppingCart size={18} />
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