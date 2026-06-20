import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import connectDB from "@/lib/db";
import User from "@/models/Users";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    redirect("/admin/login");
  }

  await connectDB();

  const users = await User.find().sort({ createdAt: -1 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">
            Customers
          </h1>
        </div>

        {/* Users Table */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="space-y-4">
            {users.map((user: any) => (
              <div
                key={user._id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div>
                  <h3 className="font-black text-white">
                    {user.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {user.email || "No Email"}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-zinc-400">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <p className="py-6 text-center text-zinc-500">
                No customers found
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}