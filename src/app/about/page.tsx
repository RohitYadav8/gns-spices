'use client';

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  const stats = [
    { value: "50+", label: "Years Legacy" },
    { value: "100%", label: "Natural" },
    { value: "25+", label: "Countries" },
    { value: "FSSAI", label: "Certified" },
  ];

  const features = [
    "No Artificial Colours",
    "Zero Preservatives",
    "Stone Ground Quality",
    "Ethically Sourced",
  ];

  return (
    <div className="bg-[#0A0503] min-h-screen selection:bg-amber-500/30">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <section className="text-center mb-20 md:mb-28">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Since 1972
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Our <span className="text-amber-500">Legacy</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed">
              Three generations of spice merchants dedicated to purity, provenance, and authentic Indian flavours.
            </p>
          </section>

          {/* Story Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
            <div className="relative h-[400px] md:h-[600px] rounded-[32px] overflow-hidden border border-white/5">
              <Image
                src="/Our-Story.png"
                alt="Our Story"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-black">Established</p>
                <h3 className="text-4xl font-bold mt-1">1972</h3>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl text-white font-bold leading-tight mb-8">
                Purity in <span className="text-amber-500">every seed.</span>
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg">
                <p>Our spices are sourced directly from trusted farming communities across Kerala and Rajasthan.</p>
                <p>Through careful harvesting and traditional grinding methods, we preserve the aroma and authenticity nature intended.</p>
              </div>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-24 md:mb-32 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center">
                <h3 className="text-4xl md:text-5xl font-black text-amber-500 group-hover:scale-110 transition-transform">
                  {stat.value}
                </h3>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Founder Quote */}
          <section className="mb-24 md:mb-32 relative">
            <div className="relative p-10 md:p-20 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center overflow-hidden">
              <span className="text-8xl text-amber-500/10 font-serif absolute top-0 left-8">"</span>
              <h2 className="text-2xl md:text-4xl font-medium italic leading-relaxed text-zinc-100">
                "Pure spice doesn't need a sales pitch. It needs a fair price and an honest scale."
              </h2>
              <p className="mt-8 text-amber-500 font-bold uppercase tracking-widest text-sm">— G. N. Subramanian</p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center p-12 md:p-24 rounded-[40px] border border-white/5 bg-white/[0.02]">
            <h2 className="text-4xl  text-white md:text-6xl font-bold mb-6">Experience the GNS Difference</h2>
            <p className="text-zinc-400 mb-10 max-w-md mx-auto">Authentic Indian spices crafted with generations of expertise.</p>
            <Link href="/shop" className="inline-block px-10 py-5 bg-amber-500 text-black font-black rounded-2xl hover:bg-white transition-all transform hover:scale-105">
              Explore Collection
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}