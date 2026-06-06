"use client";

import { useEffect, useState } from "react";

interface Application {
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

export default function B2BPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "quotes">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [appRes, quoteRes] = await Promise.all([
      fetch("/api/admin/b2b"),
      fetch("/api/admin/quotes"),
    ]);
    const appData = await appRes.json();
    const quoteData = await quoteRes.json();
    if (appData.success) setApplications(appData.data);
    if (quoteData.success) setQuotes(quoteData.data);
    setLoading(false);
  };

  const updateAppStatus = async (id: string, status: string) => {
    await fetch("/api/admin/b2b", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAll();
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const statusColor = (status: string) => {
    if (status === "Approved") return "text-green-400 bg-green-400/10";
    if (status === "Rejected") return "text-red-400 bg-red-400/10";
    return "text-amber-400 bg-amber-400/10";
  };

  const CardItem = ({
    item,
    onApprove,
    onReject,
  }: {
    item: Application | Quote;
    onApprove: () => void;
    onReject: () => void;
  }) => (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{item.businessName}</h2>
          <p className="text-zinc-400 text-sm mt-1">
            {item.fullName} · {item.email} · {item.phone}
          </p>
          <p className="text-zinc-400 text-sm">{item.businessType} · {item.city}</p>
          {item.message && (
            <p className="text-zinc-500 text-sm mt-2 italic">"{item.message}"</p>
          )}
          <p className="text-zinc-600 text-xs mt-2">
            {new Date(item.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(item.status)}`}>
            {item.status}
          </span>
          {item.status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={onApprove}
                className="px-4 py-2 rounded-xl bg-green-500 text-black text-sm font-bold hover:bg-green-400"
              >
                Approve
              </button>
              <button
                onClick={onReject}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-400"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-10">
      <h1 className="text-3xl font-black text-white mb-8">B2B Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all ${
            activeTab === "applications"
              ? "bg-amber-500 text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          B2B Applications
          <span className="ml-2 px-2 py-0.5 rounded-full bg-black/20 text-xs">
            {applications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all ${
            activeTab === "quotes"
              ? "bg-amber-500 text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Quote Requests
          <span className="ml-2 px-2 py-0.5 rounded-full bg-black/20 text-xs">
            {quotes.length}
          </span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : activeTab === "applications" ? (
        applications.length === 0 ? (
          <p className="text-zinc-400">Koi application nahi hai abhi.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <CardItem
                key={app._id}
                item={app}
                onApprove={() => updateAppStatus(app._id, "Approved")}
                onReject={() => updateAppStatus(app._id, "Rejected")}
              />
            ))}
          </div>
        )
      ) : quotes.length === 0 ? (
        <p className="text-zinc-400">Koi quote request nahi hai abhi.</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <CardItem
              key={quote._id}
              item={quote}
              onApprove={() => updateQuoteStatus(quote._id, "Approved")}
              onReject={() => updateQuoteStatus(quote._id, "Rejected")}
            />
          ))}
        </div>
      )}
    </div>
  );
}