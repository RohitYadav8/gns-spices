"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="bg-cream text-coffee min-h-screen pt-32 pb-20 px-6 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight mb-6">
              Our <span className="text-spice">Legacy</span>
            </h1>

            <p className="text-sage max-w-2xl mx-auto text-lg leading-relaxed">
              GNS Spices sirf ek brand nahi, teen peedhiyon ka bharosa hai.
              1972 se hum asli Indian swad ko duniya tak pahuncha rahe hain.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">

            <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl group">
              <Image
                src="/mhbjgg.png"
                alt="Spices background"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-black text-spice uppercase tracking-tight">
                Har Daane Mein Shudhta
              </h2>

              <p className="text-coffee/80 text-lg leading-relaxed">
                Humare masale Kerala ke behtareen khetton se seedha aap tak aate hain.
                Hum slow-roasting process ka use karte hain taaki masalon ki natural
                khushbu aur essential oils hamesha barkarar rahein.
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
                    className="flex items-center gap-3 text-coffee font-medium"
                  >
                    <span className="h-2 w-2 bg-spice rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[40px] bg-white shadow-xl border border-black/5 text-center mb-32">

            <div>
              <h4 className="text-5xl font-black text-coffee">50+</h4>
              <p className="text-spice uppercase text-xs font-bold tracking-widest mt-2">
                Years
              </p>
            </div>

            <div>
              <h4 className="text-5xl font-black text-coffee">100%</h4>
              <p className="text-spice uppercase text-xs font-bold tracking-widest mt-2">
                Natural
              </p>
            </div>

            <div>
              <h4 className="text-5xl font-black text-coffee">25+</h4>
              <p className="text-spice uppercase text-xs font-bold tracking-widest mt-2">
                Countries
              </p>
            </div>

            <div>
              <h4 className="text-5xl font-black text-coffee">FSSAI</h4>
              <p className="text-spice uppercase text-xs font-bold tracking-widest mt-2">
                Certified
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-spice text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-sage hover:scale-105 transition-all shadow-lg"
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