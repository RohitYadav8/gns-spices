'use client';

import { useState } from "react";
import { PlusCircle, Image as ImageIcon } from "lucide-react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    tier: "Professional Choice", 
    tierDesc: "", 
    mainDesc: "", 
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async (): Promise<string> => {
    if (!imageFile) return "";
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "gns_spices_preset");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const resData = await response.json();
    if (resData.secure_url) return resData.secure_url;
    throw new Error("Image upload failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadImageToCloudinary();

      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("🎉 Product Added Successfully!");
        setFormData({ title: "", category: "", price: "", tier: "Professional Choice", tierDesc: "", mainDesc: "" });
        setImageFile(null);
        setImagePreview(null);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl bg-[#111111] border border-[#262626] rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-black mb-8 border-b border-[#262626] pb-4 flex items-center gap-3">
          <PlusCircle className="text-[#fbbf24]" /> Add New Spice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Product Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none" placeholder="Ground Byadgi Chilli" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Category</label>
              <input name="category" value={formData.category} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none" placeholder="Pure Powders" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Product Tier</label>
            <select name="tier" value={formData.tier} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none text-white">
              <option>Home Kitchen</option>
              <option>Professional Choice</option>
              <option>Chef's Reserve</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Tier Description</label>
              <input 
                name="tierDesc" 
                value={formData.tierDesc} 
                onChange={handleChange} 
                className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none" 
                placeholder="e.g., medium, deep red"
              />
              <p className="mt-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                *This will appear under the tier name.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Main Description</label>
            <textarea name="mainDesc" value={formData.mainDesc} onChange={handleChange} rows={3} className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Product Image</label>
            <input type="file" onChange={handleImageChange} className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#fbbf24] file:text-black" />
            {imagePreview && <img src={imagePreview} className="mt-4 h-32 w-32 object-cover rounded-xl border border-[#262626]" />}
          </div>

          <button disabled={loading} className="w-full h-14 bg-[#fbbf24] text-black font-bold rounded-xl hover:bg-[#d9a51e] transition-all">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}