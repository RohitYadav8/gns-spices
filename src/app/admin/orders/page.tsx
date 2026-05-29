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
        if (data.success) {
          setOrders(data.orders);
        }
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
        // Update local state smoothly
        setOrders(prev => prev.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Processing': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Delivered': return 'bg-green-100 text-green-600 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF6DE] text-[#332D20]">
      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#8BDFDD]/20 blur-[140px] pointer-events-none" />

      {/* ORANGE GLOW */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#F48F68]/10 blur-[160px] pointer-events-none" />

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-4xl border border-[#FFE394] bg-white/95 backdrop-blur-xl shadow-2xl p-8 relative my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-black">Order Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFE394]/50 hover:bg-[#F48F68] hover:text-white transition-all font-black text-xl"
              >
                &times;
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* LEFT COL: INFO */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-[#332D20]/50 font-bold mb-1">Order ID</p>
                  <p className="text-sm font-semibold">{selectedOrder._id}</p>
                  <p className="text-xs text-[#332D20]/60 mt-1">
                    {new Date(selectedOrder.createdAt || '').toLocaleString('en-IN')}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-[#332D20]/50 font-bold mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                      className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider border outline-none ${getStatusColor(selectedOrder.status)}`}
                      disabled={updating === selectedOrder._id}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {updating === selectedOrder._id && <span className="text-xs text-[#F48F68] animate-pulse">Saving...</span>}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-[#332D20]/50 font-bold mb-1">Payment</p>
                  <p className="text-sm font-semibold">{selectedOrder.paymentMethod} - <span className={selectedOrder.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}>{selectedOrder.paymentStatus}</span></p>
                </div>

                <div className="bg-[#FFF6DE]/50 p-4 rounded-2xl border border-[#FFE394]/50">
                  <p className="text-xs uppercase tracking-[2px] text-[#332D20]/50 font-bold mb-2">Shipping Details</p>
                  <p className="font-bold">{selectedOrder.shippingAddress?.fullName}</p>
                  <p className="text-sm mt-1">{selectedOrder.shippingAddress?.email}</p>
                  <p className="text-sm mt-1">{selectedOrder.shippingAddress?.phone}</p>
                  <p className="text-sm mt-2">{selectedOrder.shippingAddress?.addressLine}</p>
                  <p className="text-sm">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                </div>
              </div>

              {/* RIGHT COL: ITEMS */}
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#332D20]/50 font-bold mb-3">Order Items</p>
                <div className="space-y-3 max-h-75 overflow-y-auto pr-2">
                  {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-[#FFE394]/40 p-3 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />}
                        <div>
                          <p className="font-bold text-sm leading-tight">{item.name}</p>
                          <p className="text-xs text-[#332D20]/60 mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black text-[#F48F68]">£{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#FFE394]/50 flex justify-between items-center">
                  <p className="font-black uppercase tracking-[2px] text-sm">Total</p>
                  <p className="text-3xl font-black text-[#F48F68]">£{selectedOrder.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">
          <div>
            <p className="uppercase tracking-[6px] text-[#F48F68] text-sm font-black mb-4">
              Admin Dashboard
            </p>
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Customer
              <span className="text-[#F48F68]"> Orders</span>
            </h1>
            <p className="mt-5 text-[#332D20]/70 text-lg leading-8 max-w-2xl font-medium">
              Manage customer purchases, update order status seamlessly, and process deliveries.
            </p>
          </div>

          {/* STATS */}
          <div className="rounded-4xl border border-[#FFE394] bg-white/20 backdrop-blur-xl px-8 py-6 shadow-xl">
            <p className="uppercase tracking-[4px] text-xs text-[#332D20]/55 font-bold">Total Orders</p>
            <h2 className="text-5xl font-black text-[#F48F68] mt-2">{orders.length}</h2>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-[40px] border border-[#FFE394] bg-white/20 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          {/* INNER GLOW */}
          <div className="absolute top-0 right-0 w-65 h-65 bg-[#8BDFDD]/20 blur-[100px]" />

          {/* TABLE HEADER */}
          <div className="relative z-10 p-8 border-b border-[#FFE394]/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.75 bg-[#8BDFDD]" />
              <p className="uppercase tracking-[5px] text-xs font-black text-[#8BDFDD]">Orders List</p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-6">
            {loading ? (
              <div className="py-24 text-center">
                <div className="w-16 h-16 border-4 border-[#FFE394] border-t-[#F48F68] rounded-full animate-spin mx-auto" />
                <p className="mt-6 text-lg text-[#332D20]/60 font-medium">Loading Orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-24 text-center">
                <h3 className="text-3xl font-black text-[#F48F68]">No Orders Found</h3>
                <p className="mt-4 text-[#332D20]/60 text-lg">Customer orders will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="rounded-[30px] border border-[#FFE394] bg-white/70 backdrop-blur-sm p-7 shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="grid lg:grid-cols-5 gap-6 items-center">
                      {/* CUSTOMER */}
                      <div className="lg:col-span-1">
                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-2">Customer</p>
                        <h3 className="text-xl font-black text-[#332D20] truncate">{order.shippingAddress?.fullName || 'N/A'}</h3>
                        <p className="mt-1 text-sm text-[#332D20]/60">{order.shippingAddress?.phone || 'No Phone'}</p>
                      </div>

                      {/* DATE & CITY */}
                      <div className="lg:col-span-1">
                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-2">Date & City</p>
                        <p className="font-bold">{new Date(order.createdAt || '').toLocaleDateString('en-IN')}</p>
                        <p className="text-sm text-[#332D20]/70 mt-1">{order.shippingAddress?.city || 'N/A'}</p>
                      </div>

                      {/* AMOUNT */}
                      <div className="lg:col-span-1">
                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-2">Amount</p>
                        <h3 className="text-2xl font-black text-[#F48F68]">£{order.totalAmount}</h3>
                        <p className="text-xs font-bold mt-1 text-[#332D20]/50">{order.items?.length || 0} items</p>
                      </div>

                      {/* STATUS (INTERACTIVE) */}
                      <div className="lg:col-span-1">
                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-2">Status</p>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`w-full rounded-2xl px-4 py-2.5 text-xs font-black uppercase tracking-wider border outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                          disabled={updating === order._id}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt} className="bg-white text-[#332D20]">{opt}</option>
                          ))}
                        </select>
                        {updating === order._id && <p className="text-[10px] text-center mt-1 text-[#F48F68] font-bold">UPDATING...</p>}
                      </div>

                      {/* ACTION */}
                      <div className="lg:col-span-1 flex lg:justify-end">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-full border border-[#8BDFDD] bg-[#8BDFDD]/10 hover:bg-[#8BDFDD] hover:text-[#332D20] px-6 py-3 text-sm font-black transition-all duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}