'use client';

import { useState, useEffect } from "react";
import { PlusCircle, ChevronDown, Plus, Trash2 } from "lucide-react";

// ❌ HARDCODED CATEGORIES HATAYE — ab DB se aayengi
const TIER_NAMES = ["Home Kitchen", "Professional Choice", "Chef's Reserve", "House Selection"];

const TIER_COLORS: Record<string, string> = {
  "Home Kitchen": "bg-green-500",
  "Professional Choice": "bg-red-500",
  "Chef's Reserve": "bg-yellow-600",
  "House Selection": "bg-amber-400",
};

interface Tier {
  name: string;
  weight: string;
  desc: string;
}

interface ICategory {
  _id: string;
  name: string;
}

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "", category: "", price: "", mainDesc: "", origin: "",
  });

  const [tiers, setTiers] = useState<Tier[]>([
    { name: "Home Kitchen", weight: "", desc: "" }
  ]);

  // ✅ DB se categories fetch karenge
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [openCategory, setOpenCategory] = useState(false);
  const [openTierIndex, setOpenTierIndex] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Component load hote hi categories fetch karo
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/admin/categories');
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Categories fetch error:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTierChange = (index: number, field: keyof Tier, value: string) => {
    const updated = [...tiers];
    updated[index][field] = value;
    setTiers(updated);
  };

  const addTier = () => {
    if (tiers.length < 3) {
      setTiers([...tiers, { name: "Professional Choice", weight: "", desc: "" }]);
    }
  };

  const removeTier = (index: number) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter((_, i) => i !== index));
    }
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
    if (!formData.category) return setMessage("❌ Please select a category!");
    setLoading(true);
    setMessage("");
    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadImageToCloudinary();

      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          price: Number(formData.price),
          desc: formData.mainDesc,
          badge: tiers[0]?.name || "",
          origin: formData.origin,
          tiers: tiers,
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("🎉 Product Added Successfully!");
        setFormData({ title: "", category: "", price: "", mainDesc: "", origin: "" });
        setTiers([{ name: "Home Kitchen", weight: "", desc: "" }]);
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

          {/* TITLE + CATEGORY */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Product Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none"
                placeholder="Red Chilli Powder"
              />
            </div>

            {/* ✅ CATEGORY DROPDOWN — ab DB se */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
                Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenCategory(!openCategory)}
                  className="w-full h-12 px-4 rounded-xl bg-black border border-[#262626] hover:border-[#fbbf24] text-white font-semibold flex items-center justify-between transition"
                >
                  <span className={formData.category ? "text-white" : "text-zinc-500"}>
                    {formData.category || (categoriesLoading ? "Loading categories..." : "Select Category")}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openCategory ? "rotate-180" : ""}`}
                  />
                </button>

                {openCategory && (
                  <ul className="absolute z-50 w-full mt-2 rounded-xl border border-[#262626] bg-[#111] overflow-hidden shadow-xl">
                    {categories.length === 0 ? (
                      <li className="px-4 py-3 text-zinc-500 text-sm">
                        Koi category nahi mili — pehle category banao
                      </li>
                    ) : (
                      categories.map((cat) => (
                        <li
                          key={cat._id}
                          onClick={() => {
                            setFormData({ ...formData, category: cat.name });
                            setOpenCategory(false);
                          }}
                          className={`px-4 py-3 font-semibold cursor-pointer transition-all
                            ${formData.category === cat.name
                              ? "bg-amber-400 text-black"
                              : "text-white hover:bg-amber-400 hover:text-black"
                            }`}
                        >
                          {cat.name}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* ORIGIN + PRICE */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Origin</label>
              <input
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none"
                placeholder="e.g. KASHMIR, KARNATAKA"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none"
              />
            </div>
          </div>

          {/* MAIN DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Main Description</label>
            <textarea
              name="mainDesc"
              value={formData.mainDesc}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-[#262626] focus:border-[#fbbf24] outline-none"
              placeholder="Three grades from gentle blush to fiery sting."
            />
          </div>

          {/* TIERS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase text-zinc-500">
                Tiers ({tiers.length}/3)
              </label>
              {tiers.length < 3 && (
                <button
                  type="button"
                  onClick={addTier}
                  className="flex items-center gap-2 text-xs font-bold text-[#fbbf24] hover:text-amber-300 transition"
                >
                  <Plus size={14} /> Add Tier
                </button>
              )}
            </div>

            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div key={index} className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 relative">
                  {tiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTier(index)}
                      className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">
                    Tier {index + 1}
                  </p>

                  <div className="relative mb-4">
                    <button
                      type="button"
                      onClick={() => setOpenTierIndex(openTierIndex === index ? null : index)}
                      className="w-full h-11 px-4 rounded-xl bg-black border border-[#262626] hover:border-[#fbbf24] text-white text-sm font-bold flex justify-between items-center cursor-pointer transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${TIER_COLORS[tier.name] || 'bg-zinc-500'}`} />
                        {tier.name}
                      </span>
                      <ChevronDown size={14} className={`transition-transform ${openTierIndex === index ? 'rotate-180' : ''}`} />
                    </button>

                    {openTierIndex === index && (
                      <ul className="absolute z-50 w-full mt-2 rounded-xl border border-[#262626] bg-[#111] overflow-hidden shadow-xl">
                        {TIER_NAMES.map((t) => (
                          <li
                            key={t}
                            onClick={() => { handleTierChange(index, 'name', t); setOpenTierIndex(null); }}
                            className={`px-4 py-3 text-sm font-bold cursor-pointer flex items-center gap-2 transition-all
                              ${tier.name === t ? 'bg-[#fbbf24] text-black' : 'text-white hover:bg-[#fbbf24]/20 hover:text-[#fbbf24]'}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${TIER_COLORS[t] || 'bg-zinc-500'}`} />
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-2">Weight</label>
                      <input
                        value={tier.weight}
                        onChange={(e) => handleTierChange(index, 'weight', e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-black border border-[#262626] focus:border-[#fbbf24] outline-none text-sm"
                        placeholder="100g · 500g"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-600 mb-2">Description</label>
                      <input
                        value={tier.desc}
                        onChange={(e) => handleTierChange(index, 'desc', e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-black border border-[#262626] focus:border-[#fbbf24] outline-none text-sm"
                        placeholder="Kashmiri · mild & vivid red"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#fbbf24] file:text-black"
            />
            {imagePreview && (
              <img src={imagePreview} className="mt-4 h-32 w-32 object-cover rounded-xl border border-[#262626]" />
            )}
          </div>

          {message && <p className="text-center font-bold">{message}</p>}

          <button
            disabled={loading}
            className="w-full h-14 bg-[#fbbf24] text-black font-bold rounded-xl hover:bg-[#d9a51e] transition-all"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}
