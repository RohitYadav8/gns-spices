'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Change Password modal state
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Password changed successfully!");
        setShowChangeModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Change Password Error:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <main className="relative min-h-[100dvh] bg-black flex items-center justify-center px-4 md:px-6 overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-72 w-72 md:h-96 md:w-96 rounded-full bg-red-600/20 blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-72 w-72 md:h-96 md:w-96 rounded-full bg-amber-500/20 blur-[100px] md:blur-[140px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] rounded-[32px] border border-white/10 bg-zinc-950 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white">Admin Login</h1>
          <p className="mt-2 text-sm md:text-base text-zinc-400">Login to access admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-300">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-600 pl-12 pr-4 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-300">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-600 pl-12 pr-12 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            {loading ? "Verifying..." : "Login"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/" className="text-xs md:text-sm text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-4">
            Back to Website
          </Link>
          <span className="text-zinc-700">|</span>
          <button
            type="button"
            onClick={() => setShowChangeModal(true)}
            className="text-xs md:text-sm text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-4"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* ── Change Password Modal ── */}
      {showChangeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowChangeModal(false); }}
        >
          <div className="w-full max-w-[400px] rounded-[28px] border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <KeyRound size={24} className="text-amber-400" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-white">Change Password</h2>
              <p className="mt-1 text-sm text-zinc-400">Update your admin account password</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-zinc-300">Current Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showCurrentPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-600 pl-12 pr-12 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors">
                    {showCurrentPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-zinc-300">New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showNewPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-600 pl-12 pr-12 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors">
                    {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-zinc-300">Confirm New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full h-14 rounded-xl border border-white/10 bg-black text-white placeholder:text-zinc-600 pl-12 pr-12 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors">
                    {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <button
                type="submit"
                disabled={changingPassword}
                className="w-full h-14 mt-2 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
              >
                {changingPassword ? "Updating..." : "Update Password"}
                {!changingPassword && <ArrowRight size={18} />}
              </button>
              <button
                type="button"
                onClick={() => setShowChangeModal(false)}
                className="w-full h-12 rounded-xl border border-white/10 text-zinc-400 font-semibold hover:border-white/20 hover:text-zinc-200 transition-all"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}