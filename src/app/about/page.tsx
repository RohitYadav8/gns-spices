"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  const stats = [
    { value: "50+", label: "Years Legacy" },
    { value: "100%", label: "Natural" },
    { value: "25+", label: "Countries Served" },
    { value: "FSSAI", label: "Certified" },
  ];

  const features = [
    "No Artificial Colours",
    "Zero Preservatives",
    "Stone Ground Quality",
    "Ethically Sourced",
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#0A0503] text-white min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Hero */}
          <section className="text-center mb-28">
            <p className="text-amber-400 text-[11px] font-black uppercase tracking-[0.35em] mb-4">
              Since 1972
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-none">
              Our <span className="text-amber-400">Legacy</span>
            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg leading-relaxed">
              Three generations of spice merchants dedicated to purity,
              provenance and authentic Indian flavours.
            </p>
          </section>

          {/* Story */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">

            {/* Image */}
            <div className="relative h-[600px] overflow-hidden rounded-[36px] border border-white/10 shadow-[0_0_60px_rgba(245,158,11,0.08)]">

              <Image
                src="/Our-Story.png"
                alt="Our Story"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 rounded-2xl border border-amber-500/20 bg-black/60 backdrop-blur-xl px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-black">
                  Established
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  1972
                </h3>
              </div>

            </div>

            {/* Content */}
            <div>

              <p className="text-amber-400 text-[11px] font-black uppercase tracking-[0.35em] mb-4">
                The Craft
              </p>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                Purity in
                <span className="block text-amber-400">
                  every seed.
                </span>
              </h2>

              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                <p>
                  Our spices are sourced directly from trusted farming
                  communities across Kerala and Rajasthan.
                </p>

                <p>
                  Through careful harvesting, slow roasting and traditional
                  grinding methods, we preserve the aroma, flavour and
                  authenticity nature intended.
                </p>

                <p>
                  Every batch is tested for consistency, ensuring the same
                  quality reaches homes, restaurants and retailers worldwide.
                </p>
              </div>

              <div className="mt-10 space-y-5">
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="h-3 w-3 rounded-full bg-amber-400" />

                    <span className="font-semibold text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Stats */}
          <section className="mb-32">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 text-center hover:border-amber-500/30 transition"
                >
                  <h3 className="text-5xl font-bold text-amber-400">
                    {stat.value}
                  </h3>

                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}

            </div>
          </section>

          {/* Founder Quote */}
          <section className="mb-32">

            <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#120A07] to-black p-10 md:p-16 relative overflow-hidden">

              <div className="absolute right-8 top-0 text-[160px] leading-none text-amber-500/10 font-serif">
                "
              </div>

              <p className="text-amber-400 text-[11px] font-black uppercase tracking-[0.35em] mb-6">
                Founder Note
              </p>

              <h2 className="max-w-4xl text-3xl md:text-5xl font-bold leading-tight">
                Pure spice doesn't need a sales pitch.
                <span className="block text-amber-400 mt-3">
                  It needs a fair price and an honest scale.
                </span>
              </h2>

              <p className="mt-8 text-zinc-400">
                — G. N. Subramanian, Founder
              </p>

            </div>

          </section>

          {/* CTA */}
          <section>

            <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#120A07] to-black p-12 md:p-20 text-center">

              <p className="text-amber-400 text-[11px] font-black uppercase tracking-[0.35em] mb-4">
                Discover
              </p>

              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Experience the
                <span className="block text-amber-400">
                  GNS Difference
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-zinc-400 mb-10">
                Authentic Indian spices crafted with generations of expertise.
              </p>

              <Link
                href="/shop"
                className="inline-flex items-center rounded-2xl bg-amber-500 px-10 py-5 font-bold text-black transition hover:bg-amber-400"
              >
                Explore Our Collection
              </Link>

            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}