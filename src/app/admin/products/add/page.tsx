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

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      const data = await res.json();
      if (data.success) {
        alert("🗑️ Product deleted successfully!");
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* WATERMARK */}
      <div className="text-center pt-20 pb-12 relative select-none pointer-events-none">
        <h1 className="text-[110px] md:text-[160px] font-black text-white/[0.03] tracking-wider leading-none">
          GNS
        </h1>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="group bg-zinc-950 border border-white/10 rounded-[32px] p-6 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]"
            >
              {/* IMAGE */}
              <div className="bg-zinc-900 rounded-[24px] p-4 flex items-center justify-center h-[280px] border border-white/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={240}
                    className="object-contain h-full w-full transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-zinc-600 font-bold text-sm">Image Coming Soon</div>
                )}
              </div>

              {/* INFO */}
              <div className="mt-6 px-2">
                <span className="text-[11px] font-black tracking-widest uppercase text-amber-500">
                  Category: {item.category}
                </span>

                <h2 className="text-2xl font-black mt-1 text-white group-hover:text-amber-400 transition">
                  {item.title}
                </h2>

                <p className="text-sm font-medium text-zinc-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* PRICE + DELETE */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl font-black text-amber-500">
                      £{item.price}
                    </span>
                    <span className="text-xs font-bold text-zinc-500"> / unit</span>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 border border-white/10 text-zinc-400 font-extrabold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-bold text-zinc-600">
              No products found in the dashboard!
            </h3>
          </div>
        )}
      </main>
    </div>
  );
}