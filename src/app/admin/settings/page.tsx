'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('GNS Spices');
  const [supportEmail, setSupportEmail] = useState('support@gns-spices.com');
  const [currency, setCurrency] = useState('INR (₹)');
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#FFF6DE] text-[#332D20]">
      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#8BDFDD]/20 blur-[140px] pointer-events-none" />

      {/* ORANGE GLOW */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#F48F68]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* HEADING */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Store
            <span className="text-[#F48F68]"> Settings</span>
          </h1>
          <p className="mt-6 text-lg text-[#332D20]/70 max-w-2xl leading-8">
            Manage your store configurations and preferences with premium glassmorphism UI.
          </p>
        </div>

        <div className="max-w-3xl">
          {/* SETTINGS FORM */}
          <div className="rounded-4xl border border-[#FFE394] bg-white/70 backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden">
            {/* INNER GLOW */}
            <div className="absolute top-0 left-0 w-55 h-55 bg-[#8BDFDD]/20 blur-[100px]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-8">General Settings</h2>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* STORE NAME */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                    required
                  />
                </div>

                {/* SUPPORT EMAIL */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                    required
                  />
                </div>

                {/* CURRENCY */}
                <div>
                  <label className="block uppercase tracking-[4px] text-xs font-black text-[#332D20]/60 mb-3">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-2xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-5 py-4 text-sm font-bold outline-none focus:border-[#F48F68] transition-all"
                  >
                    <option value="INR (₹)">INR (₹)</option>
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#F48F68] hover:bg-[#332D20] text-white py-4 font-black transition-all duration-500 shadow-xl hover:scale-[1.02] disabled:opacity-50 mt-4"
                >
                  {loading ? 'Saving Changes...' : 'Save Settings'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
