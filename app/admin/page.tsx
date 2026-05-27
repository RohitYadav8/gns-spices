import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/products";
import User from "@/models/Users";
import { IndianRupee, ShoppingBag, Users, Package } from "lucide-react";

export default async function AdminDashboardPage() {
  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });
  const users = await User.find();
  const products = await Product.find();

  const totalRevenue = orders.reduce((acc: number, item: any) => acc + item.totalAmount, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-[#FFF6DE] p-8 md:p-12 text-[#332D20]">
      {/* TITLE */}
      <div className="mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#F48F68]">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-black">Welcome back 👋</h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: `£${totalRevenue}`, icon: IndianRupee, color: "text-[#F48F68]", bg: "bg-[#F48F68]/10" },
          { label: "Orders", value: totalOrders, icon: ShoppingBag, color: "text-[#2D7A78]", bg: "bg-[#8BDFDD]/20" },
          { label: "Customers", value: totalUsers, icon: Users, color: "text-[#F48F68]", bg: "bg-[#F48F68]/10" },
          { label: "Products", value: totalProducts, icon: Package, color: "text-[#2D7A78]", bg: "bg-[#8BDFDD]/20" },
        ].map((stat, i) => (
          <div key={i} className="rounded-[32px] bg-white p-8 border-2 border-[#FFE394]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#332D20]/50 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</p>
                <h2 className="mt-2 text-4xl font-black">{stat.value}</h2>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-10 rounded-[32px] bg-white border-2 border-[#FFE394]/40 p-8">
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#F48F68]">Orders</p>
          <h2 className="mt-2 text-3xl font-black">Recent Orders</h2>
        </div>

        <div className="space-y-4">
          {orders.slice(0, 5).map((order: any) => (
            <div
              key={order._id}
              className="flex items-center justify-between rounded-2xl bg-[#FFF6DE]/50 p-6 border border-[#FFE394]/20"
            >
              <div>
  <h3 className="font-bold text-white">
    {order.customerName || "Unknown Customer"}
  </h3>

  <p className="text-sm text-[#c9996b]">
    {order.email || "No email"}
  </p>
</div>
              <div className="text-right">
                <p className="font-black text-[#F48F68]">£{order.totalAmount}</p>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#2D7A78] bg-[#8BDFDD]/20 px-2 py-0.5 rounded-full mt-1">
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}