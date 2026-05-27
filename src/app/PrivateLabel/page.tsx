import React from "react";
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
      <div className="absolute inset-0 bg-linear-to-r from-[#1A120B] via-[#2B1B15]/95 to-[#3A1F16]/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 flex items-center min-h-screen">

        <div className="max-w-3xl">

          {/* Top Label */}
          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-0.5 bg-[#FFE394]"></div>

            <span className="uppercase tracking-[5px] text-[#FFE394] text-sm font-semibold">
              Private Label Manufacturing
            </span>

            <div className="w-16 h-0.5 bg-[#FFE394]"></div>

          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-5 max-w-3xl leading-tight">

            Launch your spice brand.
            <br />

            <span className="text-[#F48F68]">
              We&apos;ll make the rest.
            </span>

          </h1>

          {/* Description */}
          <p className="text-white/75 text-lg md:text-2xl leading-relaxed mt-10 max-w-2xl">

            From formulation and packaging design to QC and export —
            one partner, one price, one shipment.

          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-14">

            <button className="bg-[#F48F68] hover:bg-[#ff7e53] transition-all duration-300 text-white font-bold px-10 py-5 rounded-2xl shadow-[0_0_35px_rgba(244,143,104,0.45)] text-lg">

              Start a project

            </button>

        

          </div>

        </div>

      </div>

    </section>
     <section className="w-full bg-[#FFF6DE] px-6 py-16">

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

      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-[#120905] to-[#2A120C]"></div>

      {/* Coral Glow */}
      <div className="absolute right-0 top-0 h-112.5 w-112.5 bg-[#F48F68]/20 blur-[140px] rounded-full"></div>

      {/* Cyan Glow */}
      <div className="absolute left-0 bottom-0 h-87.5 w-87.5 bg-[#8BDFDD]/10 blur-[120px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight">

          Minimum order:
          <span className="text-[#FFE394]">
            {" "}500 units per SKU
          </span>

        </h1>

        {/* Description */}
        <p className="text-black text-lg md:text-2xl leading-relaxed mt-8 max-w-3xl mx-auto">

          Typical lead time 8–12 weeks.
          Smaller pilot runs considered case-by-case.

        </p>

        {/* Button */}
        <div className="mt-14">

          <button className="bg-[#F48F68] hover:bg-[#ff7b5c] transition-all duration-300 text-white font-bold px-12 py-5 rounded-2xl shadow-[0_0_35px_rgba(244,143,104,0.45)] text-lg md:text-xl">

            Start a project

          </button>

        </div>

      </div>

    </section>
    <Footer/>
    </>
   
  );
};

export default PrivateLabelHero;