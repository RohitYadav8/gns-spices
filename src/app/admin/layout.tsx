"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f6f2ef]">
      <Sidebar />
      <main className="ml-0 md:ml-[280px] min-h-screen bg-[#f6f2ef] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}