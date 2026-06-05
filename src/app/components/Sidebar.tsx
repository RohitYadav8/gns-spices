"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  List,
  ShoppingCart,
  TicketPercent,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

function SidebarItem({ icon, title, href, active, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-5 h-14 rounded-2xl transition-all ${
        active ? "bg-[#d97f5f] text-white" : "text-[#EDE9E6] hover:bg-white/5"
      }`}
    >
      {icon} {title}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 text-white"
        onClick={() => setOpen(!open)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] 
                    bg-[#2c1208] text-white flex flex-col justify-between 
                    border-r border-white/10 transition-transform duration-300 z-40
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="pl-12 py-7 border-b border-white/10">
          <h1 className="text-3xl font-black text-[#EDE9E6]">GNS Spices</h1>
          <p className="text-sm text-[#c9996b] mt-1">Admin Panel</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            title="Dashboard"
            href="/admin"
            active={pathname === "/admin"}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<Package size={18} />}
            title="Products"
            href="/admin/products"
            active={pathname.includes("/admin/products")}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<List size={18} />}
            title="Categories"
            href="/admin/categories"
            active={pathname.includes("/admin/categories")}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<ShoppingCart size={18} />}
            title="Orders"
            href="/admin/orders"
            active={pathname.includes("/admin/orders")}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<TicketPercent size={18} />}
            title="Coupons"
            href="/admin/coupons"
            active={pathname.includes("/admin/coupons")}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<Users size={18} />}
            title="Customers"
            href="/admin/customers"
            active={pathname.includes("/admin/customers")}
            onClick={() => setOpen(false)}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
            href="/admin/settings"
            active={pathname.includes("/admin/settings")}
            onClick={() => setOpen(false)}
          />
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-white/10">
          <SidebarItem
            icon={<LogOut size={18} />}
            title="Sign Out"
            href="/admin/logout"
            active={false}
            onClick={() => setOpen(false)}
          />
        </div>
      </aside>
    </>
  );
}