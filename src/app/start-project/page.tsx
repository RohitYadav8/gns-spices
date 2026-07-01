"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

interface ICategory {
  id: string;
  name: string;
}

export default function StartProjectPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    country: "",
    productType: "",
    quantity: "",
    message: "",
  });

  // ✅ DB se categories fetch karenge
  const [productTypes, setProductTypes] = useState<ICategory[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ✅ Admin se add ki hui categories fetch karo
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.success) {
          setProductTypes(data.categories);
        }
      } catch (error) {
        console.error("Categories fetch error:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/private-label-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(180,40,0,0.25),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <Link
              href="/PrivateLabel"
              className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Private Label
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                New Inquiry
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Start your <span className="text-amber-400">project.</span>
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl text-lg">
              Fill in the details below — our team will get back within 48 hours.
            </p>
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <CheckCircle2 size={40} className="text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold">Inquiry received!</h2>
              <p className="text-zinc-400 max-w-md">
                Thanks <span className="text-white font-semibold">{form.name}</span>! Our private label team will review your brief and reach out within 48 hours.
              </p>
              <Link
                href="/"
                className="mt-4 rounded-xl bg-amber-500 px-8 py-4 font-bold text-black hover:bg-amber-400 transition"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* PERSONAL INFO */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Your Details
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@yourbrand.com"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9+]/g, "");
                        setForm({ ...form, phone: onlyNums });
                      }}
                      inputMode="numeric"
                      maxLength={15}
                      placeholder="+91 9876543210"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Country *</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      placeholder="United Kingdom"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>
                </div>
              </div>

              {/* BRAND INFO */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Brand & Product
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Brand Name *</label>
                    <input
                      name="brandName"
                      value={form.brandName}
                      onChange={handleChange}
                      required
                      placeholder="Your Brand Co."
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>

                  {/* ✅ DYNAMIC PRODUCT TYPE DROPDOWN — DB se */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Product Type *</label>
                    <select
                      name="productType"
                      value={form.productType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition"
                    >
                      <option value="" disabled>
                        {productTypes.length === 0 ? "Loading..." : "Select product type"}
                      </option>
                      {productTypes.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-zinc-300 mb-2">Estimated Quantity (units) *</label>
                    <input
                      name="quantity"
                      value={form.quantity}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        setForm({ ...form, quantity: onlyNums });
                      }}
                      required
                      inputMode="numeric"
                      placeholder="e.g. 1000"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600"
                    />
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Project Brief
                </p>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share your brand vision, target market, packaging ideas, special requirements..."
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white px-4 py-3 outline-none focus:border-amber-400 transition placeholder-zinc-600 resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 text-base transition-all disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Inquiry
                  </>
                )}
              </button>

              <p className="text-center text-xs text-zinc-600">
                Minimum order 500 units per SKU · Typical lead time 8–12 weeks
              </p>

            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
