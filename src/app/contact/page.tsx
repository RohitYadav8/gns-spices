"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#FFF8E7] py-32 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8BDFDD]/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F48F68]/20 blur-[100px] rounded-full" />

        <div className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-[#FFE394] rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-[#332D20] mb-4">
              Start Your <span className="text-[#F48F68]">Project</span>
            </h1>
            <p className="text-[#332D20]/70 text-lg max-w-2xl mx-auto">
              Ready to launch your own private label spice brand or need bulk spices? 
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#332D20] mb-2">First Name</label>
                <input type="text" placeholder="John" className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#332D20] mb-2">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#332D20] mb-2">Email Address</label>
                <input type="email" placeholder="john@company.com" className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#332D20] mb-2">Phone Number</label>
                <input type="text" placeholder="+91 98765 43210" className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#332D20] mb-2">Project Type</label>
              <select className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all">
                <option>Private Label Manufacturing</option>
                <option>B2B Bulk Orders</option>
                <option>Custom Spice Blend</option>
                <option>Other Enquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#332D20] mb-2">Project Details</label>
              <textarea rows={5} placeholder="Tell us about your brand, estimated volume, and specific requirements..." className="w-full px-5 py-4 rounded-xl border border-[#FFE394] bg-white outline-none focus:border-[#F48F68] transition-all resize-none"></textarea>
            </div>

            <button type="button" onClick={() => alert('Message Sent! We will contact you soon.')} className="w-full bg-[#332D20] hover:bg-[#F48F68] text-white font-bold text-lg py-5 rounded-xl transition-all duration-300 shadow-xl">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
