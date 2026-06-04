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
    <div className="flex min-h-screen">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto bg-[#f6f2ef]">
        {children}
      </main>
    </div>
  );
}