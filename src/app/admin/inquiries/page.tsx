"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Phone, Mail, Globe, Package, Hash, MessageSquare } from "lucide-react";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  brandName: string;
  country: string;
  productType: string;
  quantity: string;
  message?: string;
  status: "pending" | "reviewed" | "contacted";
  createdAt: string;
}

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  contacted: "bg-green-500/10 text-green-400 border-green-500/30",
};

const STATUS_LABELS = {
  pending: "Pending",
  reviewed: "Reviewed",
  contacted: "Contacted",
};

export default function PrivateLabelInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed" | "contacted">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/admin/private-label-inquiry");
      const data = await res.json();
      if (data.success) setInquiries(data.inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: Inquiry["status"]) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/private-label-inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const counts = {
    all: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    reviewed: inquiries.filter((i) => i.status === "reviewed").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="border-b border-zinc-900 px-6 md:px-10 py-10">
        <h1 className="text-4xl md:text-5xl font-black">
          Private Label <span className="text-amber-400">Inquiries</span>
        </h1>
        <p className="mt-2 text-zinc-400">Manage and track all incoming project requests.</p>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "reviewed", "contacted"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                filter === s
                  ? "border-amber-500/50 bg-amber-500/10"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}
            >
              <p className="text-2xl font-black text-white">{counts[s]}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-1 capitalize">
                {s === "all" ? "Total" : s}
              </p>
            </button>
          ))}
        </div>

        {/* INQUIRIES LIST */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-zinc-600 font-semibold">
            No inquiries found.
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((inq) => (
              <div
                key={inq._id}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 transition hover:border-zinc-700"
              >
                {/* TOP ROW */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-black text-white">{inq.name}</h2>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[inq.status]}`}>
                        {STATUS_LABELS[inq.status]}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* STATUS CHANGER */}
                  <div className="flex items-center gap-2">
                    {(["pending", "reviewed", "contacted"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(inq._id, s)}
                        disabled={inq.status === s || updatingId === inq._id}
                        className={`text-xs font-bold px-4 py-2 rounded-full border transition-all disabled:opacity-40 ${
                          inq.status === s
                            ? STATUS_STYLES[s]
                            : "border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-400"
                        }`}
                      >
                        {updatingId === inq._id && inq.status !== s ? (
                          <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          STATUS_LABELS[s]
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                    <Mail size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Email</p>
                      <p className="text-sm text-white font-semibold truncate">{inq.email}</p>
                    </div>
                  </div>

                  {inq.phone && (
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                      <Phone size={14} className="text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-zinc-500">Phone</p>
                        <p className="text-sm text-white font-semibold">{inq.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                    <Globe size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Country</p>
                      <p className="text-sm text-white font-semibold">{inq.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                    <Package size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Brand</p>
                      <p className="text-sm text-white font-semibold">{inq.brandName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                    <Package size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Product Type</p>
                      <p className="text-sm text-white font-semibold">{inq.productType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                    <Hash size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Quantity</p>
                      <p className="text-sm text-white font-semibold">{inq.quantity} units</p>
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                {inq.message && (
                  <div className="flex gap-3 bg-zinc-900 rounded-xl px-4 py-4">
                    <MessageSquare size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1">Project Brief</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{inq.message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
