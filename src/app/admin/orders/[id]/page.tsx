import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { ArrowLeft, MapPin, Package, CreditCard, Clock } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-400",
  Processing: "bg-blue-500/10 text-blue-400",
  Shipped: "bg-purple-500/10 text-purple-400",
  Delivered: "bg-emerald-500/10 text-emerald-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    redirect("/admin/login");
  }

  await connectDB();

  const order = (await Order.findById(id).lean()) as any;

  if (!order) {
    notFound();
  }

  const statusStyle =
    STATUS_STYLES[order.status] || "bg-zinc-500/10 text-zinc-400";

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">

        {/* Back + Header */}
        <div className="mb-8">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-amber-400 transition mb-4"
          >
            <ArrowLeft size={14} />
            Back to Orders
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
                Order Detail
              </p>
              <h1 className="mt-1 text-xl font-black sm:text-2xl break-all">
                #{order._id.toString()}
              </h1>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest ${statusStyle}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left: Items + Payment */}
          <div className="space-y-6 lg:col-span-2">

            {/* Order Items */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Package size={16} className="text-amber-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-300">
                  Items Ordered
                </h2>
              </div>

              <div className="space-y-3">
                {order.items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 p-4"
                  >
                    <div>
                      <p className="font-black text-white">
                        {item.name || item.productId}
                      </p>
                      <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-black text-amber-400">£{item.price}</p>
                  </div>
                ))}

                {(!order.items || order.items.length === 0) && (
                  <p className="text-sm text-zinc-500">No items found</p>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <CreditCard size={16} className="text-blue-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-300">
                  Payment
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Method</span>
                  <span className="font-black capitalize">
                    {order.paymentMethod || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Payment Status</span>
                  <span className="font-black capitalize">
                    {order.paymentStatus || "N/A"}
                  </span>
                </div>
                <div className="my-2 border-t border-white/5" />
                <div className="flex justify-between">
                  <span className="font-black uppercase tracking-wider text-zinc-400 text-sm">
                    Total
                  </span>
                  <span className="text-xl font-black text-amber-400">
                    £{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Shipping + Timeline */}
          <div className="space-y-6">

            {/* Shipping Address */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <MapPin size={16} className="text-purple-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-300">
                  Shipping To
                </h2>
              </div>

              {order.shippingAddress ? (
                <div className="space-y-1 text-sm">
                  <p className="font-black text-white">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="text-zinc-400">
                    {order.shippingAddress.addressLine1}
                  </p>
                  {order.shippingAddress.addressLine2 && (
                    <p className="text-zinc-400">
                      {order.shippingAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-zinc-400">{order.shippingAddress.city}</p>
                  <p className="text-zinc-400">{order.shippingAddress.postcode}</p>
                  <p className="text-zinc-400">{order.shippingAddress.country}</p>
                  {order.shippingAddress.phone && (
                    <p className="mt-2 text-zinc-500">
                      {order.shippingAddress.phone}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">No shipping address</p>
              )}
            </div>

            {/* Timeline */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Clock size={16} className="text-emerald-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-300">
                  Timeline
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Placed</span>
                  <span className="font-black">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {order.updatedAt && order.updatedAt !== order.createdAt && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Last Updated</span>
                    <span className="font-black">
                      {new Date(order.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
