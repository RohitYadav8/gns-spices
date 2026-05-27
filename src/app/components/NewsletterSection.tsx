"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    // Add your subscription logic here
  };

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#FFF6DE] overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8BDFDD]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-[2px] bg-[#F48F68]" />
          <span className="uppercase tracking-[3px] text-[10px] font-black text-[#F48F68]">
            Stay in the kitchen
          </span>
          <div className="w-10 h-[2px] bg-[#F48F68]" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-black text-[#332D20] mb-6 tracking-tight">
          Recipes, harvest notes & <br className="hidden md:block" /> member-only batches.
        </h2>

        {/* Subtext */}
        <p className="text-[#332D20]/70 font-medium mb-10 text-lg">
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
            className="w-full h-16 px-6 rounded-2xl border-2 border-[#FFE394]/50 bg-white shadow-sm outline-none focus:border-[#8BDFDD] transition-all text-[#332D20] font-semibold"
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-[#F48F68] text-white font-black hover:bg-[#F48F68]/90 transition-all shadow-lg shadow-[#F48F68]/20 active:scale-95 whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>

        <p className="mt-6 text-xs font-bold text-[#332D20]/40 uppercase tracking-widest">
          Be the first to know about new harvests & member batches.
        </p>
      </div>
    </section>
  );
}