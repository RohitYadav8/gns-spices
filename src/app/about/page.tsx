"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Main container with cream background */}
      <div className="bg-[#FFF6DE] min-h-screen pt-32 pb-20 px-6 font-sans text-[#332D20]">
        <div className="max-w-6xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Our <span className="text-[#F48F68]">Legacy</span>
            </h1>

            <p className="text-[#332D20]/70 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              GNS Spices is not just a brand, it's our dream.
              We have been crafting authentic Indian spices since 1972.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">

            <div className="relative h-125 rounded-[40px] overflow-hidden shadow-2xl group border-2 border-[#FFE394]/40">
              <Image
                src="/mhbjgg.png"
                alt="Spices background"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/50 via-transparent to-transparent"></div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#F48F68] uppercase tracking-tight">
                Purity In Every Seed
              </h2>

              <p className="text-[#332D20]/80 text-lg leading-relaxed">
                Our spices are sourced from Kerala and Rajasthan.
                We use a slow-roasting process so that
                the aroma and essential oils are locked in.
              </p>

              <ul className="space-y-4">
                {[
                  "No Artificial Colors",
                  "Zero Preservatives",
                  "Stone-Ground Quality",
                  "Ethically Sourced",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[#332D20] font-black tracking-wide"
                  >
                    <span className="h-3 w-3 bg-[#F48F68] rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[40px] bg-white shadow-xl border-2 border-[#FFE394]/40 text-center mb-32">
            {[
              { val: "50+", label: "Years" },
              { val: "100%", label: "Natural" },
              { val: "25+", label: "Countries" },
              { val: "FSSAI", label: "Certified" },
            ].map((stat, i) => (
              <div key={i}>
                <h4 className="text-5xl font-black text-[#332D20]">{stat.val}</h4>
                <p className="text-[#F48F68] uppercase text-[10px] font-black tracking-[0.2em] mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-block bg-[#F48F68] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#8BDFDD] hover:text-[#332D20] hover:scale-105 transition-all shadow-lg"
            >
              Explore Our Collection
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}