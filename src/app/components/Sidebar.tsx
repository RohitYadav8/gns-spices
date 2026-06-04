"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, Package, Tags, ShoppingBag, 
  Ticket, Users, Settings, LogOut, Menu 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button 
        className="md:hidden p-4 text-white bg-[#2c1208] fixed top-0 left-0 z-50"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-screen w-[280px] bg-[#2c1208] text-white flex flex-col justify-between border-r border-white/10 transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        <div>
          <div className="px-8 py-7 border-b border-white/10">
            <h1 className="text-3xl font-black text-[#EDE9E6]">GNS Spices</h1>
            <p className="text-sm text-[#c9996b] mt-1">Admin Panel</p>
          </div>
          
          <nav className="px-4 py-8 space-y-2">
            <p className="text-xs tracking-[3px] text-[#c9996b]/70 mb-5 uppercase px-2">Main Menu</p>
            
            <SidebarItem icon={<LayoutDashboard size={18} />} title="Dashboard" href="/admin/dashboard" active={pathname === "/admin/dashboard"} />
            <SidebarItem icon={<Package size={18} />} title="Products" href="/admin/products" active={pathname.includes("/admin/products")} />
            <SidebarItem icon={<Tags size={18} />} title="Categories" href="/admin/categories" active={pathname === "/admin/categories"} />
            <SidebarItem icon={<ShoppingBag size={18} />} title="Orders" href="/admin/orders" active={pathname === "/admin/orders"} />
            <SidebarItem icon={<Ticket size={18} />} title="Coupons" href="/admin/coupons" active={pathname === "/admin/coupons"} />
            <SidebarItem icon={<Users size={18} />} title="Customers" href="/admin/customers" active={pathname === "/admin/customers"} />
            <SidebarItem icon={<Settings size={18} />} title="Settings" href="/admin/settings" active={pathname === "/admin/settings"} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-[#EDE9E6] px-5 py-4 hover:text-[#c9996b] w-full"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, title, href, active }: any) {
  return (
    <Link href={href} className={`flex items-center gap-4 px-5 h-14 rounded-2xl transition-all ${active ? "bg-[#d97f5f] text-white" : "text-[#EDE9E6] hover:bg-white/5"}`}>
      {icon} {title}
    </Link>
  );
}