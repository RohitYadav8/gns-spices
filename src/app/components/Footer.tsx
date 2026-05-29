"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0503] text-white">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/10 blur-[150px] pointer-events-none" />

      {/* TOP SECTION */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">

        {/* LEFT - LOGO & DESCRIPTION */}
        <div>
          <div className="mb-8">
            <img
              src="/GNS-LOGO.png" // यहाँ अपना लोगो पाथ रखें
              alt="GNS Spices"
              className="h-16 w-auto   p-2 "
            />
          </div>
          <p className="max-w-sm text-base leading-7 text-zinc-400 font-medium">
            Three generations of farming, sourcing, and slow-roasting. From our family in Kerala to kitchens worldwide.
          </p>
          <p className="mt-6 text-sm font-black tracking-[6px] text-amber-500">
            ESTD. 1972
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="mb-5 text-sm font-black uppercase tracking-[4px] text-amber-500">Shop</h3>
          <ul className="space-y-3 text-base text-zinc-400 font-medium">
            {["All spices", "Pure powders", "Whole seeds", "Signature masalas"].map((item, i) => (
              <li key={i}>
                <a href="#" className="transition-all duration-300 hover:text-white hover:translate-x-1 inline-block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* BUSINESS */}
        <div>
          <h3 className="mb-5 text-sm font-black uppercase tracking-[4px] text-amber-500">Business</h3>
          <ul className="space-y-3 text-base text-zinc-400 font-medium">
            {["Wholesale", "Private label", "Request a quote"].map((item, i) => (
              <li key={i}>
                <a href="#" className="transition-all duration-300 hover:text-white hover:translate-x-1 inline-block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="mb-5 text-sm font-black uppercase tracking-[4px] text-amber-500">Trust</h3>
          <ul className="space-y-3 text-base text-zinc-400 font-medium">
            {["FSSAI certified", "ISO 22000 facility", "Halal & Kosher", "Lab-tested"].map((item, i) => (
              <li key={i} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <p className="text-center text-sm font-medium text-zinc-600">
            © 2026 GNS Spices. Crafted in India. Shipped worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}