import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const steps = [
  {
    number: "1",
    title: "Submit brief",
    desc: "Share your brand, target regions, estimated volumes, and any spec you have.",
  },
  {
    number: "2",
    title: "Feasibility review",
    desc: "Our PL team confirms viability and assigns a project manager within 48 hours.",
  },
  {
    number: "3",
    title: "Product selection",
    desc: "Pick from our SKUs or co-develop custom blends.",
  },
  {
    number: "4",
    title: "Formulation & samples",
    desc: "We ship samples in 2–3 weeks. You sign off before mass production.",
  },
  {
    number: "5",
    title: "Packaging design",
    desc: "Upload logos and artwork — our design team prepares print-ready proofs.",
  },
  {
    number: "6",
    title: "Production & QC",
    desc: "Batch production with COA (Certificate of Analysis) for every lot.",
  },
  {
    number: "7",
    title: "Export & delivery",
    desc: "Global shipping, export documents, and end-to-end logistics support.",
  },
];

const PrivateLabelHero = () => {
  return (
    <>
    <Navbar/>
     <section className="relative w-full min-h-screen overflow-hidden bg-[#FFF6DE]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(244,143,104,0.28),transparent_40%)]"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(139,223,221,0.18),transparent_35%)]"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 flex items-center min-h-screen">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* LEFT SIDE: Text & CTA */}
          <div className="max-w-2xl">

          {/* Top Label */}
          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-0.5 bg-[#F48F68]"></div>

            <span className="uppercase tracking-[5px] text-[#F48F68] text-sm font-semibold">
              Private Label Manufacturing
            </span>

            <div className="w-16 h-0.5 bg-[#F48F68]"></div>

          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#332D20] mt-5 max-w-3xl leading-tight">

            Launch your spice brand.
            <br />

            <span className="text-[#F48F68]">
              We&apos;ll make the rest.
            </span>

          </h1>

          {/* Description */}
          <p className="text-[#332D20]/80 text-lg md:text-2xl leading-relaxed mt-10 max-w-2xl">

            From formulation and packaging design to QC and export —
            one partner, one price, one shipment.

          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-14">

            <Link href="/contact" className="bg-[#F48F68] hover:bg-[#ff7e53] transition-all duration-300 text-white font-bold px-10 py-5 rounded-2xl shadow-[0_0_35px_rgba(244,143,104,0.45)] text-lg inline-block text-center">

              Start a project

            </Link>
          </div>

          {/* Stats / Highlights (NEW) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#F48F68]/20">
            <div>
              <h3 className="text-3xl font-black text-[#F48F68]">100+</h3>
              <p className="text-sm font-bold text-[#332D20]/70 uppercase tracking-widest mt-1">Brands Built</p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#F48F68]">50+</h3>
              <p className="text-sm font-bold text-[#332D20]/70 uppercase tracking-widest mt-1">Custom Blends</p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#F48F68]">FDA</h3>
              <p className="text-sm font-bold text-[#332D20]/70 uppercase tracking-widest mt-1">Approved Labs</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: Image (NEW) */}
        <div className="relative hidden lg:block">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F48F68] to-[#8BDFDD] rounded-[40px] transform rotate-3 scale-105 opacity-20 blur-lg"></div>
          <div className="absolute -inset-4 border-2 border-dashed border-[#F48F68]/30 rounded-[40px] transform -rotate-2"></div>
          
          {/* The Image */}
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 aspect-[4/5]">
            <img 
              src="/private_label_hero.png" 
              alt="Private Label Spices" 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFF6DE] rounded-full flex items-center justify-center border border-[#FFE394]">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <p className="font-black text-[#332D20]">Premium Quality</p>
                  <p className="text-sm text-[#332D20]/70 font-semibold">Ready for your brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
     <section className="w-full bg-[#F5E8C7] px-6 py-16">

      <div className="max-w-5xl mx-auto">

        {/* Top Label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-0.5 bg-[#F48F68]" />

          <span className="uppercase tracking-[5px] text-[#F48F68] text-sm font-semibold">
            The Process
          </span>

          <div className="w-14 h-0.5 bg-[#F48F68]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-16">
          How it works
        </h1>

        {/* Steps */}
        <div className="space-y-12">

          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-6"
            >

              {/* Circle */}
              <div className="min-w-18 h-18 rounded-full bg-linear-to-br from-[#FFE394] to-[#F48F68] flex items-center justify-center text-black text-3xl font-bold shadow-[0_0_25px_rgba(244,143,104,0.35)]">
  {step.number}
</div>

               

              {/* Text */}
              <div>

                <h2 className="text-xl font-bold text-black ">
                  {step.title}
                </h2>

                <p className="text-gray-700 text-lg md:text-2xl leading-relaxed max-w-4xl">
                  {step.desc}
                </p>

                {/* Accent Line */}
                <div className="w-28 h-0.75 rounded-full bg-linear-to-r from-[#F48F68] to-[#8BDFDD] mt-5"></div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
    
  <section className="relative overflow-hidden bg-[#FFF6DE] py-32 px-6 md:px-12 lg:px-20">

  {/* SOFT BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6DE] via-[#FFF6DE] to-[#f8ecd0]" />

  {/* CORAL GLOW */}
  <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#F48F68]/15 blur-[140px]" />

  {/* CYAN GLOW */}
  <div className="absolute left-0 bottom-0 h-[350px] w-[350px] rounded-full bg-[#8BDFDD]/20 blur-[120px]" />

  {/* YELLOW GLOW */}
  <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE394]/20 blur-[120px]" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-5xl mx-auto">

    {/* LABEL */}
    <div className="mb-6 flex items-center justify-center gap-4">

      <div className="h-0.5 w-16 bg-[#F48F68]" />

      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F48F68]">
        PRIVATE LABEL
      </span>

      <div className="h-0.5 w-16 bg-[#F48F68]" />

    </div>

    {/* HEADING */}
    <h1 className="text-center text-3xl font-black leading-tight tracking-[-0.04em] text-[#332D20] md:text-6xl">

      Minimum order:
      <span className="bg-gradient-to-r from-[#F48F68] via-[#FFE394] to-[#8BDFDD] bg-clip-text text-transparent">
        {" "}500 units per SKU
      </span>

    </h1>

    {/* DESCRIPTION */}
    <p className="mt-10 max-w-3xl mx-auto text-center text-[18px] leading-[2] text-[#332D20]/70 md:text-[22px]">

      Typical lead time 8–12 weeks.
      Smaller pilot runs considered case-by-case.

    </p>

    {/* CTA */}
    <div className="mt-16 flex justify-center">

      <Link
        href="/contact"
        className="
          rounded-full
          bg-[#F48F68]
          px-12
          py-5
          text-lg
          font-black
          text-white
          shadow-[0_20px_60px_rgba(244,143,104,0.35)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:bg-[#eb7d52]
          inline-block text-center
        "
      >

        Start a project

      </Link>

    </div>

    {/* TRUST BADGES */}
    <div className="mt-16 flex flex-wrap items-center justify-center gap-4">

      <div className="rounded-full border border-[#FFE394]/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[#332D20]/70 shadow-md backdrop-blur-md">
        ISO 22000 Certified
      </div>

      <div className="rounded-full border border-[#FFE394]/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[#332D20]/70 shadow-md backdrop-blur-md">
        Export Quality
      </div>

      <div className="rounded-full border border-[#FFE394]/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[#332D20]/70 shadow-md backdrop-blur-md">
        Farm Direct Sourcing
      </div>

    </div>

  </div>
</section>
    <Footer/>
    </>
   
  );
};

export default PrivateLabelHero;