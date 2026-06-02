import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/products";
import User from "@/models/Users";
import { PoundSterling, ShoppingBag, Users, Package } from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    redirect("/admin/login");
  }

  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });
  const users = await User.find();
  const products = await Product.find();

  const totalRevenue = orders.reduce(
    (acc: number, item: any) => acc + item.totalAmount,
    0
  );

  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  const pendingOrders = orders.filter(
    (o: any) => o.status === "Pending"
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="p-8 md:p-12">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Welcome back 👋
          </h1>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Revenue */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Revenue
                </p>
                <h2 className="mt-2 text-4xl font-black text-amber-400">
                  £{totalRevenue}
                </h2>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <PoundSterling className="text-amber-400" size={24} />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Orders
                </p>
                <h2 className="mt-2 text-4xl font-black">
                  {totalOrders}
                </h2>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <ShoppingBag className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Customers
                </p>
                <h2 className="mt-2 text-4xl font-black">
                  {totalUsers}
                </h2>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <Users className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Products
                </p>
                <h2 className="mt-2 text-4xl font-black">
                  {totalProducts}
                </h2>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Package className="text-emerald-400" size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* ORDERS */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-black mb-6">
            Recent Orders
          </h2>

          <div className="space-y-4">

            {pendingOrders.slice(0, 5).map((order: any) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
              >
                <div>
                  <h3 className="font-black text-white">
                    {order.shippingAddress?.fullName || "Unknown"}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {order.shippingAddress?.city || "No City"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-black text-amber-400">
                    £{order.totalAmount}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}

            {pendingOrders.length === 0 && (
              <p className="text-center text-zinc-500">
                No pending orders
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}