"use client";
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
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0503]">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(244,143,104,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(139,223,221,0.05),transparent_40%)]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 flex items-center min-h-screen">
        
            
            {/* LEFT SIDE: Text & CTA */}
            <div className="max-w-2xl">
              {/* Top Label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-0.5 bg-amber-400"></div>
                <span className="gold-rule text-amber-400">
                  Private Label Manufacturing
                </span>
                <div className="w-16 h-0.5 bg-amber-400"></div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl text-white font-bold tracking-tight mt-5 max-w-3xl leading-tight">
                Launch your spice brand.
                <br />
                <span className="text-amber-400">We'll make the rest.</span>
              </h1>

              {/* Description */}
              <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed mt-10 max-w-2xl">
                From formulation and packaging design to QC and export —
                one partner, one price, one shipment.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5 mt-14">
                <Link href="/contact" className="bg-amber-500  hover:bg-amber-600 transition-all duration-300 text-white font-black px-10 py-5 rounded-2xl shadow-[0_0_35px_rgba(244,143,104,0.2)] text-lg inline-block text-center">
                  Start a project
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Visual */}
           </div>
        
      </section>

      {/* PROCESS SECTION */}
      <section className="w-full bg-[#110d0b] px-6 py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          {/* Top Label */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-0.5 bg-amber-400" />
            <span className="uppercase tracking-[5px] text-amber-400 text-sm font-semibold">
              The Process
            </span>
            <div className="w-14 h-0.5 bg-amber-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-16">
            How it works
          </h1>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                {/* Circle */}
                <div className="min-w-16 h-16 rounded-full bg-[#0a0503] border border-zinc-800 flex items-center justify-center text-[#8BDFDD] text-2xl font-black">
                  {step.number}
                </div>
                
                {/* Text */}
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {step.title}
                  </h2>
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-4xl mt-2">
                    {step.desc}
                  </p>
                  <div className="w-28 h-0.5 rounded-full bg-gradient-to-r from-[#F48F68] to-[#8BDFDD] mt-5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    
      {/* MOQ SECTION */}
      <section className="relative overflow-hidden bg-[#0a0503] py-32 px-6 md:px-12 lg:px-20 border-t border-zinc-900">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-0.5 w-16 bg-amber-400" />
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[#F48F68]">
              PRIVATE LABEL
            </span>
            <div className="h-0.5 w-16 bg-amber-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-10">
            Minimum order:
            <span className="text-amber-400"> 500 units per SKU</span>
          </h1>

          <p className="mt-3 max-w-3xl mx-auto text-center text-[18px] leading-[2] text-zinc-400 md:text-[22px]">
            Typical lead time 8–12 weeks.
            Smaller pilot runs considered case-by-case.
          </p>

          <div className="mt-16 flex justify-center">
            <Link href="/contact" className="rounded-full bg-amber-500 px-12 py-5 text-lg font-black text-white hover:bg-amber-600 transition-all duration-300">
              Start a project
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            {["ISO 22000 Certified", "Export Quality", "Farm Direct Sourcing"].map((item) => (
              <div key={item} className="rounded-full border border-zinc-800 bg-[#110d0b] px-6 py-3 text-sm font-semibold text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivateLabelHero;