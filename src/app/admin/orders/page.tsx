'use client';

import { useState, useEffect } from 'react';

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
        body: JSON.stringify({ orderId, status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        if (selectedOrder?._id === orderId) {
          setSelectedOrder(prev =>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Processing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Shipped':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black transition"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* LEFT */}
              <div className="space-y-6">

                <div>
                  <p className="text-xs text-zinc-400 uppercase">Order ID</p>
                  <p className="text-sm font-semibold">{selectedOrder._id}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase">Status</p>

                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className={`mt-2 px-4 py-2 rounded-xl border outline-none ${getStatusColor(selectedOrder.status)}`}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-black">
                        {opt}
                      </option>
                    ))}
                  </select>

                  {updating === selectedOrder._id && (
                    <p className="text-xs text-amber-400 mt-2">Updating...</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase">Payment</p>
                  <p className="text-sm font-semibold">
                    {selectedOrder.paymentMethod} -{" "}
                    <span className={selectedOrder.paymentStatus === 'Paid'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                    }>
                      {selectedOrder.paymentStatus}
                    </span>
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div>
                <p className="text-xs text-zinc-400 uppercase mb-3">Items</p>

                <div className="space-y-3 max-h-72 overflow-y-auto">

                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                        </div>
                      </div>

                      <p className="text-amber-400 font-bold">
                        £{item.price * item.quantity}
                      </p>
                    </div>
                  ))}

                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="text-2xl font-black text-amber-400">
                    £{selectedOrder.totalAmount}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="mb-12">
          <p className="text-amber-400 text-xs uppercase tracking-[6px] font-bold">
            Admin Dashboard
          </p>
          <h1 className="text-5xl font-black mt-3">
            Customer <span className="text-amber-400">Orders</span>
          </h1>
        </div>

        {/* MAIN */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          {loading ? (
            <p className="text-center py-20 text-zinc-400">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-center py-20 text-zinc-400">No Orders Found</p>
          ) : (

            <div className="grid gap-5">

              {orders.map(order => (
                <div
                  key={order._id}
                  className="p-6 rounded-2xl border border-white/10 bg-black/40 flex justify-between items-center"
                >

                  <div>
                    <p className="font-bold">{order.shippingAddress?.fullName}</p>
                    <p className="text-sm text-zinc-400">{order.shippingAddress?.city}</p>
                  </div>

                  <div className="text-amber-400 font-bold">
                    £{order.totalAmount}
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-3 py-2 rounded-xl border ${getStatusColor(order.status)}`}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-black">
                        {opt}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400"
                  >
                    View
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}