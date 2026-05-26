'use client';

import { useState, useEffect } from 'react';

interface OrderType {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
  shippingAddress?: {
    fullName?: string;
    phone?: string;
    city?: string;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/user-orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.data);
        }
      })
      .catch((err) => console.error('Fetch Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF6DE] text-[#332D20]">

      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8BDFDD]/20 blur-[140px] pointer-events-none" />

      {/* ORANGE GLOW */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F48F68]/10 blur-[160px] pointer-events-none" />

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
              Manage customer purchases, monitor order status,
              and track premium spice deliveries.
            </p>

          </div>

          {/* STATS */}
          <div
            className="
              rounded-[32px]
              border border-[#FFE394]
              bg-white/20
              backdrop-blur-xl
              px-8
              py-6
              shadow-xl
            "
          >
            <p className="uppercase tracking-[4px] text-xs text-[#332D20]/55 font-bold">
              Total Orders
            </p>

            <h2 className="text-5xl font-black text-[#F48F68] mt-2">
              {orders.length}
            </h2>
          </div>

        </div>

        {/* MAIN CARD */}
        <div
          className="
            rounded-[40px]
            border border-[#FFE394]
            bg-white/20
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
            relative
          "
        >

          {/* INNER GLOW */}
          <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[#8BDFDD]/20 blur-[100px]" />

          {/* TABLE HEADER */}
          <div className="relative z-10 p-8 border-b border-[#FFE394]/50">

            <div className="flex items-center gap-3">

              <div className="w-12 h-[3px] bg-[#8BDFDD]" />

              <p className="uppercase tracking-[5px] text-xs font-black text-[#8BDFDD]">
                Orders List
              </p>

            </div>

          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-6">

            {loading ? (

              <div className="py-24 text-center">

                <div className="w-16 h-16 border-4 border-[#FFE394] border-t-[#F48F68] rounded-full animate-spin mx-auto" />

                <p className="mt-6 text-lg text-[#332D20]/60 font-medium">
                  Loading Orders...
                </p>

              </div>

            ) : orders.length === 0 ? (

              <div className="py-24 text-center">

                <h3 className="text-3xl font-black text-[#F48F68]">
                  No Orders Found
                </h3>

                <p className="mt-4 text-[#332D20]/60 text-lg">
                  Customer orders will appear here.
                </p>

              </div>

            ) : (

              <div className="grid gap-6">

                {orders.map((order) => (

                  <div
                    key={order._id}
                    className="
                      rounded-[30px]
                      border border-[#FFE394]
                      bg-white/70
                      backdrop-blur-sm
                      p-7
                      shadow-lg
                      hover:shadow-2xl
                      hover:-translate-y-1
                      transition-all
                      duration-500
                    "
                  >

                    <div className="grid lg:grid-cols-4 gap-6 items-center">

                      {/* CUSTOMER */}
                      <div>

                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-3">
                          Customer
                        </p>

                        <h3 className="text-2xl font-black text-[#332D20]">
                          {order.shippingAddress?.fullName || 'N/A'}
                        </h3>

                        <p className="mt-2 text-[#332D20]/60">
                          {order.shippingAddress?.phone || 'No Phone'}
                        </p>

                      </div>

                      {/* CITY */}
                      <div>

                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-3">
                          City
                        </p>

                        <h3 className="text-xl font-black text-[#332D20]">
                          {order.shippingAddress?.city || 'N/A'}
                        </h3>

                      </div>

                      {/* AMOUNT */}
                      <div>

                        <p className="uppercase tracking-[4px] text-xs text-[#332D20]/50 font-bold mb-3">
                          Total Amount
                        </p>

                        <h3 className="text-3xl font-black text-[#F48F68]">
                          £{order.totalAmount}
                        </h3>

                      </div>

                      {/* STATUS */}
                      <div className="flex lg:justify-end">

                        <div
                          className="
                            rounded-full
                            border border-[#FFE394]
                            bg-[#8BDFDD]/20
                            px-6
                            py-3
                            text-sm
                            font-black
                            uppercase
                            tracking-[3px]
                            text-[#332D20]
                          "
                        >
                          {order.status || 'Pending'}
                        </div>

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