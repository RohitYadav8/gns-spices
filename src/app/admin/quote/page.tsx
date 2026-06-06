"use client";

import { useEffect, useState } from "react";

interface Quote {
  _id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    const res = await fetch("/api/admin/quotes");
    const data = await res.json();
    if (data.success) setQuotes(data.data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchQuotes();
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const statusColor = (status: string) => {
    if (status === "Approved") return "text-green-400 bg-green-400/10";
    if (status === "Rejected") return "text-red-400 bg-red-400/10";
    return "text-amber-400 bg-amber-400/10";
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-black text-white mb-8">Quote Requests</h1>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : quotes.length === 0 ? (
        <p className="text-zinc-400">Koi quote request nahi hai abhi.</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote._id} className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{quote.businessName}</h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {quote.fullName} · {quote.email} · {quote.phone}
                  </p>
                  <p className="text-zinc-400 text-sm">{quote.businessType} · {quote.city}</p>
                  {quote.message && (
                    <p className="text-zinc-500 text-sm mt-2 italic">"{quote.message}"</p>
                  )}
                  <p className="text-zinc-600 text-xs mt-2">
                    {new Date(quote.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                  {quote.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(quote._id, "Approved")}
                        className="px-4 py-2 rounded-xl bg-green-500 text-black text-sm font-bold hover:bg-green-400"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(quote._id, "Rejected")}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-400"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}