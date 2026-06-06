"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function B2BSection() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<"apply" | "quote">("apply");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "Retailer",
    city: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = formType === "apply" ? "/api/b2b/apply" : "/api/b2b/quote";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: "apply" | "quote") => {
    setFormType(type);
    setSubmitted(false);
    setForm({
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      businessType: "Retailer",
      city: "",
      message: "",
    });
    setShowModal(true);
  };

  const stats = [
    { value: "4", label: "regions served" },
    { value: "120+", label: "B2B customers" },
    { value: "25kg", label: "max bulk SKU" },
    { value: "24h", label: "RFQ response" },
  ];

  const pricing = [
    {
      title: "Retailer",
      items: ["5-15% off retail", "Net 0 prepaid", "Order online 24/7"],
      featured: false,
    },
    {
      title: "Wholesale",
      items: ["15-25% off retail", "Bulk SKUs (5kg, 25kg)", "Net 30 on approval"],
      featured: true,
    },
    {
      title: "Distributor",
      items: ["Custom contract pricing", "Dedicated account manager", "Container-load logistics"],
      featured: false,
    },
  ];

  const steps = [
    { number: "1", title: "Apply", desc: "Share your legal name, tax ID, and what you sell." },
    { number: "2", title: "Verify", desc: "Our ops team verifies within 1–2 business days." },
    { number: "3", title: "Get pricing", desc: "Assigned tier + custom quote if needed." },
    { number: "4", title: "Order", desc: "Dashboard for recurring orders, reorders, and tracking." },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-black text-white">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#7c1d12,transparent_45%)] opacity-70" />

          <div className="relative mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <span className="h-px w-16 bg-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 whitespace-nowrap">
                    For Trade
                  </span>
                  <span className="h-px w-16 bg-amber-400" />
                </div>

                <h1 className="max-w-xl text-5xl font-extrabold leading-tight md:text-6xl">
                  Spices for{" "}
                  <span className="text-amber-400">serious kitchens.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-zinc-300">
                  Tiered pricing, credit terms, and logistics built for restaurants, retailers, and distributors across the UK, India, and the Middle East.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => openModal("apply")}
                    className="rounded-xl bg-amber-500 px-7 py-4 font-semibold text-black transition hover:bg-amber-400"
                  >
                    Apply for a business account
                  </button>

                  <button
                    onClick={() => openModal("quote")}
                    className="rounded-xl border border-zinc-700 px-7 py-4 font-semibold text-white hover:bg-zinc-900"
                  >
                    Request a quote
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
                  >
                    <h3 className="text-5xl font-bold text-amber-400">{item.value}</h3>
                    <p className="mt-3 text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((card) => (
              <div
                key={card.title}
                className={`rounded-3xl border p-8 transition-all ${
                  card.featured
                    ? "border-orange-500 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.35)]"
                    : "border-white/10 bg-zinc-950"
                }`}
              >
                <h3 className="mb-5 text-3xl font-bold">{card.title}</h3>
                <ul className="space-y-3 text-sm text-zinc-200">
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-white/10" />
        </div>

        {/* Process */}
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-16 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 whitespace-nowrap">
              The Process
            </span>
            <span className="h-px w-16 bg-amber-400" />
          </div>

          <h2 className="mb-14 text-5xl font-bold">How it works</h2>

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-zinc-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-8 max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-zinc-500 hover:text-white text-xl"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {formType === "apply" ? "Application Submitted!" : "Quote Request Submitted!"}
                </h2>
                <p className="text-zinc-400">Hum 1-2 business days mein aapse contact karenge.</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {formType === "apply" ? "Apply for Business Account" : "Request a Quote"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                        placeholder="Rohit Sharma"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Business Name</label>
                      <input
                        type="text"
                        required
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                        placeholder="Sharma Traders"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                        placeholder="rohit@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Phone</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Business Type</label>
                      <select
                        value={form.businessType}
                        onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                      >
                        <option>Retailer</option>
                        <option>Wholesale</option>
                        <option>Distributor</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">City</label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Message (Optional)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full rounded-xl bg-black border border-white/10 text-white px-4 py-3 outline-none focus:border-amber-400 resize-none"
                      placeholder="Kuch aur batana chahte hain..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
                  >
                    {loading ? "Submitting..." : formType === "apply" ? "Submit Application" : "Request Quote"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}