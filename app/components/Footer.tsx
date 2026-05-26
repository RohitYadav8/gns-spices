"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#FFE394]/40 bg-[#FFF6DE] text-[#332D20]">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8BDFDD]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#F48F68]/10 blur-[140px] pointer-events-none" />

      {/* TOP SECTION */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2 lg:grid-cols-4">

        {/* LEFT */}
        <div>

          {/* LOGO */}
          <div className="mb-8">
            <img
              src="/GNS-LOGO.png"
              alt="GNS Spices"
              className="h-20 w-auto rounded-[24px] bg-white p-3 shadow-xl"
            />
          </div>

          {/* TEXT */}
          <p className="max-w-sm text-lg leading-10 text-[#332D20]/75 font-medium">
            Three generations of farming, sourcing, and
            slow-roasting. From our family in Kerala to
            kitchens worldwide.
          </p>

          {/* ESTD */}
          <p className="mt-10 text-sm font-black tracking-[6px] text-[#F48F68]">
            ESTD. 1972
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="mb-8 text-sm font-black uppercase tracking-[4px] text-[#F48F68]">
            Shop
          </h3>

          <ul className="space-y-5 text-lg text-[#332D20]/75 font-medium">

            {[
              "All spices",
              "Pure powders",
              "Whole seeds",
              "Signature masalas",
              "Whole spices",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-[#F48F68] hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}

          </ul>
        </div>

        {/* BUSINESS */}
        <div>
          <h3 className="mb-8 text-sm font-black uppercase tracking-[4px] text-[#8BDFDD]">
            Business
          </h3>

          <ul className="space-y-5 text-lg text-[#332D20]/75 font-medium">

            {[
              "Wholesale",
              "Private label",
              "Request a quote",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-[#8BDFDD] hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}

          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="mb-8 text-sm font-black uppercase tracking-[4px] text-[#F48F68]">
            Trust
          </h3>

          <ul className="space-y-5 text-lg text-[#332D20]/75 font-medium">

            {[
              "FSSAI certified",
              "ISO 22000 facility",
              "Halal & Kosher options",
              "Lab-tested every batch",
            ].map((item, i) => (
              <li
                key={i}
                className="rounded-full border border-[#FFE394] bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm"
              >
                {item}
              </li>
            ))}

          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 border-t border-[#FFE394]/40 py-8">

        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">

          <p className="text-center text-sm font-medium text-[#332D20]/60">
            © 2026 GNS Spices. Crafted in India. Shipped worldwide.
          </p>

        </div>
      </div>
    </footer>
  );
}