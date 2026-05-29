"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b0503] via-[#120904] to-[#1a0d05] text-white">
      {/* Background Glow */}
      <div className="absolute left-[-150px] top-10 h-[500px] w-[500px] rounded-full bg-amber-500/20 blur-[180px]" />
      <div className="absolute right-[-150px] bottom-0 h-[450px] w-[450px] rounded-full bg-red-700/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="animate-fade-in">
          <p className="mb-6 text-xs font-semibold tracking-[0.4em] text-yellow-400">GNSSPICES</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white drop-shadow-lg">
            Premium spices,<br />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
              honest blends.
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed">
            Hand-picked from our farms in Kerala, Tamil Nadu and Rajasthan. Slow-roasted in small batches. Shipped to chefs, retailers, and home cooks across 28 countries.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-600 px-8 py-4 font-bold text-black shadow-[0_10px_40px_rgba(255,190,0,0.35)] transition-all hover:scale-105">
              Explore Collection
            </button>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition-all hover:bg-white/10">
              For Businesses
            </button>
          </div>
          <div className="mt-12 flex items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
            <span>FSSAI</span>
            <span className="w-px h-4 bg-white/15"></span>
            <span>ISO 22000</span>
            <span className="w-px h-4 bg-white/15"></span>
            <span>Halal · Kosher</span>
          </div>
        </div>

        {/* Right Grid */}
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-[0_20px_80px_rgba(255,180,0,0.12)] backdrop-blur-2xl">
          <div className="grid h-[550px] grid-cols-3 gap-4">
            {/* Turmeric (2x2) */}
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[30px]">
              <Image src="/single-origin-turmeric.png" alt="Turmeric" fill className="object-cover transition duration-700 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              {/* <div className="absolute bottom-6 left-6 z-10">
                <p className="text-xs tracking-[0.35em] text-yellow-300">SINGLE ORIGIN</p>
                <h3 className="mt-2 text-3xl font-bold">Turmeric</h3>
                <p className="text-sm text-zinc-300">Erode, Tamil Nadu</p>
              </div> */}
            </div>

            {/* Other items (1x1) */}
            <div className="relative overflow-hidden rounded-[30px]">
               <Image src="/green-chilli-bhavnagri.png" alt="Green Chilli" fill className="object-cover" />
               <div className="absolute inset-0 bg-black/40" />
              {/* <div className="absolute bottom-4 left-4 z-10 text-xs font-bold">Green Chilli</div> */}
            </div>
            <div className="relative overflow-hidden rounded-[30px]">
               <Image src="/saffron-kashmir.png" alt="Saffron" fill className="object-cover" />
               <div className="absolute inset-0 bg-black/40" />
               {/* <div className="absolute bottom-4 left-4 z-10 text-xs font-bold">Saffron</div> */}
            </div>
            <div className="relative overflow-hidden rounded-[30px]">
               <Image src="/red-chilli-guntur.png" alt="Red Chilli" fill className="object-cover" />
               <div className="absolute inset-0 bg-black/40" />
               {/* <div className="absolute bottom-4 left-4 z-10 text-xs font-bold">Red Chilli</div> */}
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-[30px]">
               <Image src="/black-pepper-garam-masala.png" alt="Black Pepper" fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
             { /* <div className="absolute bottom-4 left-4 z-10 text-sm font-bold">Black Pepper Garam Masala</div> */ }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}