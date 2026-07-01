"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
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
  id: string;
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

const statusColor = (status: string) => {
  if (status === "Approved") return "text-green-400 bg-green-400/10 border border-green-400/20";
  if (status === "Rejected") return "text-red-400 bg-red-400/10 border border-red-400/20";
  return "text-amber-400 bg-amber-400/10 border border-amber-400/20";
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
  <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 hover:border-amber-500/30 transition-all">
    <div className="flex flex-wrap justify-between gap-4">
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <span className="text-amber-400 font-black text-lg">
            {item.businessName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{item.businessName}</h2>
          <p className="text-amber-400/80 text-sm font-medium mt-0.5">{item.fullName}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <p className="text-zinc-500 text-xs">{item.email}</p>
            <p className="text-zinc-500 text-xs">{item.phone}</p>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 text-xs border border-white/10">{item.businessType}</span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 text-xs border border-white/10">{item.city}</span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 text-xs border border-white/10">{new Date(item.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
          {item.message && (
            <p className="text-zinc-500 text-sm mt-3 italic border-l-2 border-amber-500/30 pl-3">
              "{item.message}"
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(item.status)}`}>
          {item.status}
        </span>
        {item.status === "Pending" && (
          <div className="flex gap-2">
            <button onClick={onApprove} className="px-4 py-2 rounded-xl bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-all">
              Approve
            </button>
            <button onClick={onReject} className="px-4 py-2 rounded-xl bg-red-500/80 text-white text-sm font-bold hover:bg-red-500 transition-all border border-red-400/30">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

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

    // ✅ Email API call
    const app = applications.find((a) => a.id === id);
    if (app && (status === "Approved" || status === "Rejected")) {
      await fetch("/api/admin/send-b2b-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: app.fullName,
          businessName: app.businessName,
          email: app.email,
          status,
        }),
      });
    }

    fetchAll();
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    // ✅ Email API call
    const quote = quotes.find((q) => q.id === id);
    if (quote && (status === "Approved" || status === "Rejected")) {
      await fetch("/api/admin/send-b2b-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: quote.fullName,
          businessName: quote.businessName,
          email: quote.email,
          status,
        }),
      });
    }

    fetchAll();
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="min-h-screen bg-black p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-2">Admin Dashboard</p>
        <h1 className="text-4xl font-black text-white">B2B <span className="text-amber-400">Management</span></h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Applications</p>
          <p className="text-3xl font-black text-white">{applications.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Quote Requests</p>
          <p className="text-3xl font-black text-white">{quotes.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Pending</p>
          <p className="text-3xl font-black text-amber-400">{[...applications, ...quotes].filter(i => i.status === "Pending").length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Approved</p>
          <p className="text-3xl font-black text-green-400">{[...applications, ...quotes].filter(i => i.status === "Approved").length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-all ${activeTab === "applications" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-white"}`}
        >
          B2B Applications
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === "applications" ? "bg-black/20" : "bg-white/10"}`}>
            {applications.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-all ${activeTab === "quotes" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-white"}`}
        >
          Quote Requests
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === "quotes" ? "bg-black/20" : "bg-white/10"}`}>
            {quotes.length}
          </span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-3 text-zinc-400 mt-10">
          <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          Loading...
        </div>
      ) : activeTab === "applications" ? (
        applications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-lg">Koi B2B application nahi hai abhi.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <CardItem
                key={app.id}
                item={app}
                onApprove={() => updateAppStatus(app.id, "Approved")}
                onReject={() => updateAppStatus(app.id, "Rejected")}
              />
            ))}
          </div>
        )
      ) : quotes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-600 text-lg">Koi quote request nahi hai abhi.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <CardItem
              key={quote.id}
              item={quote}
              onApprove={() => updateQuoteStatus(quote.id, "Approved")}
              onReject={() => updateQuoteStatus(quote.id, "Rejected")}
            />
          ))}
        </div>
      )}
    </div>
  );
}