"use client";

import { useState } from "react";
import { PlusCircle, Image as ImageIcon } from "lucide-react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    desc: "",
    badge: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    else throw new Error("Image upload failed");
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
        body: JSON.stringify({ ...formData, price: Number(formData.price), image: imageUrl }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("🎉 Product Added Successfully!");
        setFormData({ title: "", category: "", desc: "", badge: "", price: "" });
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
    <div className="bg-[#f6f2ef] min-h-screen text-[#5C4F4A]">
      {/* Header */}
      <header className="h-24 bg-white border-b border-black/5 px-10 flex items-center">
        <div>
          <h2 className="text-3xl font-black">Add Product</h2>
          <p className="text-[#5C766D] mt-1">Add new spices to your inventory</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-10 max-w-4xl">
        <div className="bg-white rounded-[30px] border border-black/5 p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b pb-4 border-black/5">
            <PlusCircle className="text-[#d97f5f]" size={28} />
            <h3 className="text-3xl font-black">Add New Product</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Product Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Black Pepper" className="w-full h-14 px-5 rounded-2xl border border-black/10 bg-[#f8f5f2]" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Whole Seeds" className="w-full h-14 px-5 rounded-2xl border border-black/10 bg-[#f8f5f2]" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Badge Emoji</label>
              <input type="text" name="badge" value={formData.badge} onChange={handleChange} required placeholder="⚫" className="w-full h-14 px-5 rounded-2xl border border-black/10 bg-[#f8f5f2]" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="110" className="w-full h-14 px-5 rounded-2xl border border-black/10 bg-[#f8f5f2]" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Product Image</label>
              <div className="relative w-full h-14 rounded-2xl border border-black/10 bg-[#f8f5f2] flex items-center px-5">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <ImageIcon className="text-[#8d7568] mr-3" size={20} />
                <span className="text-sm text-gray-500 truncate">{imageFile ? imageFile.name : "Select Product Image"}</span>
              </div>
            </div>

            {imagePreview && (
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Preview</p>
                <img src={imagePreview} alt="preview" className="h-40 w-40 object-cover rounded-2xl" />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-[#8d7568] mb-2">Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} required rows={4} placeholder="Bold black peppercorns..." className="w-full p-5 rounded-2xl border border-black/10 bg-[#f8f5f2]" />
            </div>

            <button type="submit" disabled={loading} className={`w-full h-14 rounded-2xl font-bold text-white ${loading ? "bg-gray-400" : "bg-[#d97f5f] hover:bg-[#c26d4f]"}`}>
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>

          {message && <div className="mt-6 p-4 rounded-2xl text-center font-semibold">{message}</div>}
        </div>
      </div>
    </div>
  );
}