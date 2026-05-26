"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  category: string;
  desc: string;
  badge: string;
  image: string;
  price: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetching all products from MongoDB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/admin/get-products");
        const data = await response.json();
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. Delete Handler Logic
  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm("Kya aap sach me ye product delete karna chahte hain?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      const data = await res.json();
      
      if (data.success) {
        alert("🗑️ Product successfully delete ho gaya!");
        // UI se bina reload kiye state update
        setProducts(products.filter((item) => item._id !== productId));
      } else {
        alert("⚠️ Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#B12704] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] font-sans text-[#332D20]">
      
    
     

      {/* BIG BACKGROUND WATERMARK */}
      <div className="text-center mt-12 relative select-none pointer-events-none">
        <h1 className="text-[110px] md:text-[160px] font-black text-[#332D20]/[0.04] tracking-wider leading-none">
          GNS
        </h1>
      </div>

      {/* PRODUCTS CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 pb-24 -mt-8 md:-mt-14">
        
        {/* PREMIUM STACKED CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {products.map((item) => (
            <div 
              key={item._id}
              className="group bg-[#FDF9F0] rounded-[36px] p-6 shadow-sm border border-[#FFE394]/40 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#7A1C04]/5 relative bg-gradient-to-b from-white to-[#FDF9F0]"
            >
              {/* Product Image Container */}
              <div className="bg-white rounded-[28px] p-4 flex items-center justify-center h-[280px] border border-gray-100 shadow-inner group-hover:bg-[#FFFDF9] transition-colors duration-500">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.title || "GNS Pack"} 
                    width={240} 
                    height={240} 
                    className="object-contain h-full w-full p-2 transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-gray-300 font-bold text-sm">Image Coming Soon</div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="mt-6 px-2">
                <span className="text-[11px] font-black tracking-widest uppercase text-gray-400 block">
                  Category: {item.category || "Whole Seeds"}
                </span>
                
                <h2 className="text-2xl font-black text-[#221E17] mt-1 tracking-tight group-hover:text-[#7A1C04] transition-colors">
                  {item.title || "Untitled Spice"}
                </h2>

                <p className="text-sm font-medium text-gray-600 mt-2 leading-relaxed min-h-[40px] line-clamp-2">
                  {item.desc || "Rich in flavour and aroma — processed under premium quality standards."}
                </p>

                {/* Sub Metadata info */}
                <div className="mt-4 pt-3 border-t border-gray-200/60 flex flex-col gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                  <span className="text-[#C77A23]">Rajasthan</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="bg-[#FFE394]/40 text-[#554A33] px-3 py-1 rounded-full text-[10px]">House Selection</span>
                    <span>200g · 1kg</span>
                  </div>
                  <span className="text-gray-500/70 mt-1">Black · whole</span>
                </div>

                {/* PRICE & LAAL DELETE BUTTON */}
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl font-black text-[#211E18]">£{item.price || 90}</span>
                    <span className="text-xs font-bold text-gray-400"> / 200g</span>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center justify-center gap-2 bg-[#D12B2B] hover:bg-[#B31E1E] text-white font-extrabold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-red-600/15"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                    Delete Product
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-bold text-gray-400">Dashboard me koi masala nahi mila!</h3>
            <p className="text-sm text-gray-500 mt-1">Naye products add product form se dalein.</p>
          </div>
        )}
      </main>
    </div>
  );
}