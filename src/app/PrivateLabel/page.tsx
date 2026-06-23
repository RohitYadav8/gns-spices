"use client";
import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const steps = [
  {
    id: 1,
    title: "Submit brief",
    description:
      "Share your brand, target regions, estimated volumes, and any spec you have.",
  },
  {
    id: 2,
    title: "Feasibility review",
    description:
      "Our PL team confirms viability and assigns a project manager within 48 hours.",
  },
  {
    id: 3,
    title: "Product selection",
    description:
      "Pick from our SKUs or co-develop custom blends.",
  },
  {
    id: 4,
    title: "Formulation & samples",
    description:
      "We ship samples in 2–3 weeks. You sign off before mass production.",
  },
  {
    id: 5,
    title: "Packaging design",
    description:
      "Upload logos and artwork — our design team prepares print-ready proofs.",
  },
  {
    id: 6,
    title: "Production & QC",
    description:
      "Batch production with COA (Certificate of Analysis) for every lot.",
  },
  {
    id: 7,
    title: "Export & deliver",
    description:
      "Handled end-to-end: labels, HS codes, compliance docs, shipping.",
  },
];

export default function PrivateLabelPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(180,40,0,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000,#120403,#1a0504)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
            <div className="max-w-3xl">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-[#d89a23]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d89a23] whitespace-nowrap">
                  PRIVATE LABEL MANUFACTURING
                </span>
                <div className="h-px w-8 bg-[#d89a23]" />
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
                Launch your spice brand.
                <br />
                <span className="text-[#f4ae1c]">
                  We'll make the rest.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
                From formulation and packaging design to QC and export —
                one partner, one price, one shipment.
              </p>
              <Link href="/start-project" className="mt-12 inline-block rounded-xl bg-[#f4ae1c] px-8 py-4 font-semibold text-black transition hover:opacity-90">
                Start a project
              </Link>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative overflow-hidden border-t border-zinc-900 bg-gradient-to-r from-black via-[#070202] to-[#120303]">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="mb-16 flex items-center gap-4">
              <div className="h-px w-16 bg-[#d89a23]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d89a23]">
                The Process
              </span>
              <div className="h-px w-16 bg-[#d89a23]" />
            </div>

            <h2 className="mb-16 text-3xl font-bold">
              How it works
            </h2>

            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4ae1c] font-bold text-black">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-900 bg-black">
          <div className="mx-auto max-w-5xl px-6 py-28 text-center">
            <h2 className="text-5xl font-bold">
              Minimum order: 500 units per SKU
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Typical lead time 8–12 weeks. Smaller pilot runs
              considered case-by-case.
            </p>
            <Link href="/start-project" className="mt-10 inline-block rounded-xl bg-[#f4ae1c] px-8 py-4 font-semibold text-black transition hover:opacity-90">
              Start a project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}