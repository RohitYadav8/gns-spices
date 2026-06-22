'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderType {
  _id: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt?: string;
  items: OrderItem[];
  shippingAddress?: {
    fullName?: string;
    email?: string;
    phone?: string;
    addressLine?: string;
    city?: string;
    postalCode?: string;
  };
}

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':    return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'Shipped':    return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'Delivered':  return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Cancelled':  return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:           return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  }
};

// Custom Dropdown Component
function StatusDropdown({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-sm font-bold transition ${getStatusColor(value)} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-125'}`}
      >
        <span>{value}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 shadow-xl overflow-hidden">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold transition hover:bg-amber-400 hover:text-black ${
                value === opt ? 'text-amber-400' : 'text-zinc-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = () => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch((err) => console.error('Fetch Error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        if (selectedOrder?._id === orderId) {
          setSelectedOrder((prev) =>
            prev ? { ...prev, status: newStatus } : null
          );
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[160px]" />

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-8">

            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-black">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black transition font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* LEFT */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Order ID</p>
                  <p className="text-sm font-semibold break-all">{selectedOrder._id}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Status</p>
                  <StatusDropdown
                    value={selectedOrder.status}
                    onChange={(val) => handleStatusChange(selectedOrder._id, val)}
                    disabled={updating === selectedOrder._id}
                  />
                  {updating === selectedOrder._id && (
                    <p className="text-xs text-amber-400 mt-2">Updating...</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Payment</p>
                  <p className="text-sm font-semibold">
                    {selectedOrder.paymentMethod} —{' '}
                    <span className={selectedOrder.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </p>
                </div>

                {selectedOrder.shippingAddress && (
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Shipping</p>
                    <p className="text-sm font-semibold">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-sm text-zinc-400">{selectedOrder.shippingAddress.city}</p>
                    <p className="text-sm text-zinc-400">{selectedOrder.shippingAddress.phone}</p>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3">Items</p>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt={item.name} />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-amber-400 font-bold">£{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="text-2xl font-black text-amber-400">£{selectedOrder.totalAmount}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="mb-12">
          <p className="text-amber-400 text-xs uppercase tracking-[6px] font-bold">Admin Dashboard</p>
          <h1 className="text-5xl font-black mt-3">
            Customer <span className="text-amber-400">Orders</span>
          </h1>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          {loading ? (
            <p className="text-center py-20 text-zinc-400">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-center py-20 text-zinc-400">No Orders Found</p>
          ) : (
            <>
              {/* TABLE HEADER */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 px-4 mb-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Customer</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Amount</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Action</p>
              </div>

              {/* ROWS */}
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 items-center px-4 py-4 rounded-2xl border border-white/10 bg-black/40"
                  >
                    {/* Customer */}
                    <div>
                      <p className="font-bold text-white">{order.shippingAddress?.fullName || 'Unknown'}</p>
                      <p className="text-sm text-zinc-400">{order.shippingAddress?.city || '—'}</p>
                      {order.createdAt && (
                        <p className="text-xs text-zinc-600 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-amber-400 font-black text-lg">£{order.totalAmount}</p>
                      <p className="text-xs text-zinc-500">{order.items?.length || 0} item(s)</p>
                    </div>

                    {/* Status Custom Dropdown */}
                    <StatusDropdown
                      value={order.status}
                      onChange={(val) => handleStatusChange(order._id, val)}
                      disabled={updating === order._id}
                    />

                    {/* View Button */}
                    <div className="flex md:justify-end">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition"
                      >
                        View
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
