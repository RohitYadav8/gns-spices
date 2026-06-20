"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Invalid reset link.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/account"), 3000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-black px-6 pt-32 pb-20 flex justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#7c1d12,transparent_45%)] opacity-70" />
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]" />

        <div className="relative z-10 w-full max-w-xl mt-10">
          <div className="rounded-[32px] border border-white/10 bg-zinc-950 shadow-[0_0_60px_rgba(245,158,11,0.15)] p-8 sm:p-12">

            {success ? (
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white">Password Reset!</h2>
                <p className="text-zinc-400">Your password has been updated successfully. Redirecting to login...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                    Reset Password
                  </h2>
                  <p className="text-zinc-400">Enter your new password below.</p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm font-semibold">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-white/80">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Min. 6 characters"
                        className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-12 text-sm font-semibold text-white outline-none focus:border-amber-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-white/80">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Re-enter password"
                        className="h-14 w-full rounded-xl border border-white/10 bg-black pl-12 pr-4 text-sm font-semibold text-white outline-none focus:border-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full h-14 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-black tracking-wider transition-all disabled:opacity-60"
                  >
                    {loading ? "Updating..." : "SET NEW PASSWORD"}
                  </button>

                  <div className="text-center">
                    <Link href="/account" className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                      Back to Login
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
