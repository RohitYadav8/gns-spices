"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to your backend route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh(); 
      } else {
        alert(data.message || "Login failed, please check credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-red-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/20 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-950 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white">Admin Login</h1>
          <p className="mt-3 text-zinc-400">Login to access admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-white">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-500 pl-12 pr-4 outline-none focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-white">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-500 pl-12 pr-12 outline-none focus:border-amber-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black p-4">
          <p className="mb-2 text-sm font-bold text-amber-400">Demo Credentials</p>
          <p className="text-sm text-zinc-400">Email: admin@gnsspices.com</p>
          <p className="text-sm text-zinc-400">Password: Admin@123</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
            Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}