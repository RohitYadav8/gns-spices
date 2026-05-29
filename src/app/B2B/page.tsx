import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const steps = [
  {
    number: "1",
    title: "Apply",
    desc: "Share your legal name, tax ID, and what you sell.",
  },
  {
    number: "2",
    title: "Verify",
    desc: "Our ops team verifies within 1–2 business days.",
  },
  {
    number: "3",
    title: "Get pricing",
    desc: "Assigned tier + custom quote if needed.",
  },
  {
    number: "4",
    title: "Order",
    desc: "Dashboard for recurring orders, reorders, and tracking.",
  },
];
const SpicesHero = () => {
  return (
    <>
    <Navbar/>
    
    <section className="bg-[#FFF6DE]  pt-24 px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-[#F48F68] font-bold tracking-widest uppercase text-sm">
            For Trade
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#332D20] leading-tight">
            Spices for <span className="text-[#F48F68]">serious</span> kitchens.
          </h1>
          <p className="text-lg text-[#332D20]/80 max-w-lg">
            Tiered pricing, credit terms, and logistics built for restaurants, 
            retailers, and distributors across the UK, India, and the Middle East.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#F48F68] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d97d5a] transition">
              Apply for a business account
            </button>
            <button className="border-2 border-[#332D20] text-[#332D20] px-8 py-3 rounded-lg font-semibold hover:bg-[#332D20] hover:text-white transition">
              Request a quote
            </button>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "4", label: "regions served" },
            { value: "120+", label: "B2B customers" },
            { value: "25kg", label: "max bulk SKU" },
            { value: "24h", label: "RFQ response" },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl border border-[#FFE394] shadow-sm"
            >
              <div className="text-4xl font-bold text-[#332D20] mb-2">{stat.value}</div>
              <div className="text-[#332D20]/70 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
     <section className="w-full  bg-[#FFF6DE] flex items-center justify-center px-6 py-6">

      {/* Cards Wrapper */}
      <div className="flex flex-col md:flex-row gap-10 max-w-7xl w-full justify-center">

        {/* Retailer Card */}
        <div className="flex-1 rounded-4xl border border-black/10 bg-white/40 backdrop-blur-xl p-10 shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(244,143,104,0.25)]">

          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Retailer
          </h2>

          <ul className="space-y-5 text-gray-700 text-[21px] leading-relaxed">
            <li>• 5–15% off retail</li>
            <li>• Net 0 prepaid</li>
            <li>• Order online 24/7</li>
          </ul>
        </div>

        {/* Highlight Wholesale Card */}
        <div className="flex-1 rounded-4xl border border-black/10 bg-white/40 backdrop-blur-xl p-10 shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,223,221,0.25)]">


          <div className="h-full rounded-4xl bg-gradient-to-br from-[#F48F68] via-[#ff7b63] to-[#8BDFDD] p-10 text-black">

            <h2 className="text-2xl font-bold mb-4 text-amber-400">
              Wholesale
            </h2>

            <ul className="space-y-5 text-[21px] leading-relaxed text-white/95">
              <li>• 15–25% off retail</li>
              <li>• Bulk SKUs (5kg, 25kg)</li>
              <li>• Net 30 on approval</li>
            </ul>
          </div>
        </div>

        {/* Distributor Card */}
        <div className="flex-1 rounded-4xl border border-black/10 bg-white/40 backdrop-blur-xl p-10 shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,223,221,0.25)]">

          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Distributor
          </h2>

          <ul className="space-y-5 text-gray-700 text-[21px] leading-relaxed">
            <li>• Custom contract pricing</li>
            <li>• Dedicated account manager</li>
            <li>• Container-load logistics</li>
          </ul>
          
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
              <div className="min-w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#FFE394] to-[#F48F68] flex items-center justify-center text-black text-3xl font-bold shadow-[0_0_25px_rgba(244,143,104,0.35)]">
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
                <div className="w-28 h-0.75 rounded-full bg-gradient-to-r from-[#F48F68] to-[#8BDFDD] mt-5"></div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
    
    
    <Footer/>
    </>
  );
};

export default SpicesHero;