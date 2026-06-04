"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function BestsellersSection() {
  return (
    <section className="bg-[#0a0503] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="h-[1px] w-10 bg-amber-600 sm:w-14" />

              <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.35em] text-amber-500">
                BESTSELLERS
              </p>

              <div className="h-[1px] w-10 bg-amber-600 sm:w-14" />
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              From our shelves
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-black text-amber-500 transition-all duration-300 hover:gap-4"
          >
            View all
            <span>→</span>
          </Link>
        </div>

        {/* Catalog Card */}
        <Link href="/shop" className="group block">
          <div className="rounded-[24px] border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.02] p-6 transition-all duration-300 hover:border-amber-500/40 hover:bg-white/[0.05] sm:p-8 md:p-10">
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
              <Search className="h-5 w-5 text-white/30" />

              <p className="text-sm font-medium text-white/60 sm:text-base">
                Catalog is being set up. Visit{" "}
                <span className="font-semibold text-amber-500 underline underline-offset-4">
                  /shop
                </span>{" "}
                to browse the full range.
              </p>
            </div>
          </div>
        </Link>

        {/* Divider for next section */}
        <div className="mt-20 sm:mt-24">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}