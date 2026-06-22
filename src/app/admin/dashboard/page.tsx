import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  const pendingOrders = orders.filter((o: any) => o.status === "Pending");

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">
            Welcome back 👋
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Link href="/admin/orders?filter=revenue" className="block rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10 hover:border-amber-400/30 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Revenue</p>
                <h2 className="mt-2 text-3xl font-black text-amber-400 sm:text-4xl">£{totalRevenue}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 sm:h-14 sm:w-14">
                <PoundSterling className="text-amber-400" size={24} />
              </div>
            </div>
          </Link>

          <Link href="/admin/orders" className="block rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10 hover:border-blue-400/30 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Orders</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">{totalOrders}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 sm:h-14 sm:w-14">
                <ShoppingBag className="text-blue-400" size={24} />
              </div>
            </div>
          </Link>

          <Link href="/admin/users" className="block rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10 hover:border-purple-400/30 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Customers</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">{totalUsers}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 sm:h-14 sm:w-14">
                <Users className="text-purple-400" size={24} />
              </div>
            </div>
          </Link>

          <Link href="/admin/products" className="block rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10 hover:border-emerald-400/30 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Products</p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">{totalProducts}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 sm:h-14 sm:w-14">
                <Package className="text-emerald-400" size={24} />
              </div>
            </div>
          </Link>

        </div>

        {/* Recent Pending Orders */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black sm:text-3xl">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {pendingOrders.slice(0, 5).map((order: any) => (
              <Link
                href={`/admin/orders/${order._id}`}
                key={order._id.toString()}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:bg-white/5 hover:border-amber-400/20 cursor-pointer sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar initial */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-sm font-black text-amber-400">
                    {(order.shippingAddress?.fullName || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-white">
                      {order.shippingAddress?.fullName || "Unknown"}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {order.shippingAddress?.city || "No City"} &middot;{" "}
                      <span className="text-zinc-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                  <p className="font-black text-amber-400 text-lg">
                    £{order.totalAmount}
                  </p>
                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-yellow-400">
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}

            {pendingOrders.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-zinc-500">No pending orders</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
