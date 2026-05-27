import Sidebar from "../components/Sidebar";

import { div } from "framer-motion/m";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // 'flex' ka matlab hai ki Sidebar aur Right Column side-by-side rahenge
    <div className="flex min-h-screen">
      
      {/* Sidebar: flex-shrink-0 ka matlab hai ki ye apni width (280px) se kam nahi hoga */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[#f6f2ef]">
          {children}
        </main>
      
      
    </div>
  );
}