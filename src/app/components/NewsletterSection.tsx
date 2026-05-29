"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
  };

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#0a0503] text-white overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-0.5 bg-amber-600" />
          <span className="uppercase tracking-[3px] text-[10px] font-black text-amber-500">
            Stay in the kitchen
          </span>
          <div className="w-10 h-0.5 bg-amber-600" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
          Recipes, harvest notes & <br className="hidden md:block" /> member-only batches.
        </h2>

        {/* Subtext */}
        <p className="text-zinc-400 font-medium mb-10 text-lg">
          One letter a month. Never spam. Unsubscribe whenever the soup's on.
        </p>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full h-16 px-6 rounded-2xl border border-white/10 bg-white/[0.03] shadow-sm outline-none focus:border-amber-500 transition-all text-white font-medium"
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/20 active:scale-95 whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>

        <p className="mt-6 text-xs font-bold text-zinc-600 uppercase tracking-widest">
          Be the first to know about new harvests & member batches.
        </p>
      </div>
    </section>
  );
}