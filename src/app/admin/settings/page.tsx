'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];

 function SettingsPage() {
  const [storeName, setStoreName] = useState('GNS Spices');
  const [supportEmail, setSupportEmail] = useState('support@gns-spices.com');
  const [currency, setCurrency] = useState('INR (₹)');
  const [loading, setLoading] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-black text-white">

      <div className="absolute top-0 left-0 w-125 h-125 bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-amber-400/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Store <span className="text-amber-400">Settings</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-8">
            Manage your store configurations and preferences with premium B2B UI.
          </p>
        </div>

        <div className="max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-2xl p-8 relative">

            <div className="absolute top-0 left-0 w-55 h-55 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-8">General Settings</h2>

              <form onSubmit={handleSaveSettings} className="space-y-6">

                {/* STORE NAME */}
                <div>
                  <label className="block uppercase tracking-widest text-xs font-bold text-zinc-400 mb-3">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold outline-none focus:border-amber-400 transition"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block uppercase tracking-widest text-xs font-bold text-zinc-400 mb-3">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold outline-none focus:border-amber-400 transition"
                    required
                  />
                </div>

                {/* CURRENCY CUSTOM DROPDOWN */}
                <div>
                  <label className="block uppercase tracking-widest text-xs font-bold text-zinc-400 mb-3">
                    Currency
                  </label>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCurrencyOpen(!currencyOpen)}
                      className="w-full rounded-2xl border border-amber-400 bg-[#110d0b] px-5 py-4 text-sm font-bold text-white flex justify-between items-center cursor-pointer hover:border-amber-300 transition"
                    >
                      {currency}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* ✅ FIXED - overflow-y-auto aur max-h-60 */}
                    {currencyOpen && (
                      <ul className="absolute z-50 w-full mt-2 rounded-2xl border border-amber-400/30 bg-[#110d0b] overflow-y-auto max-h-60 shadow-xl">
                        {currencies.map((c) => (
                          <li
                            key={c}
                            onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                            className={`px-5 py-4 text-sm font-bold cursor-pointer transition-all
                              ${currency === c
                                ? 'bg-amber-400 text-black'
                                : 'text-white hover:bg-amber-400/20 hover:text-amber-400'
                              }`}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* SAVE BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-amber-500 hover:bg-amber-400 text-black py-4 font-black transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SettingsPage;