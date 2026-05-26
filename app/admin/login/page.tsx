"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault();

    // Demo Admin Login
    if (
      email === "admin@gnsspices.com" &&
      password === "Admin@123"
    ) {

      // Redirect to admin dashboard
      router.push("/admin");

    } else {

      alert("Invalid email or password");

    }
  };

  return (
    <main className="min-h-screen bg-[#f6f2ef] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-black/5">

        {/* Heading */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-black text-[#5C4F4A]">
            Admin Login
          </h1>

          <p className="text-[#5C766D] mt-3">
            Login to access admin dashboard
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>

            <label className="text-sm font-medium text-[#5C4F4A] block mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C766D]"
              />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 rounded-xl bg-[#f6f2ef] border border-black/10 pl-12 pr-4 outline-none focus:border-[#C9996B]"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-[#5C4F4A] block mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C766D]"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 rounded-xl bg-[#f6f2ef] border border-black/10 pl-12 pr-12 outline-none focus:border-[#C9996B]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5C766D]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-xl bg-[#C9996B] text-white font-bold hover:bg-[#5C766D] transition-all flex items-center justify-center gap-2"
          >
            Login
            <ArrowRight size={18} />
          </button>

        </form>

        {/* Demo Credentials */}
        <div className="mt-8 bg-[#f6f2ef] rounded-2xl p-4 border border-black/5">

          <p className="text-sm font-semibold text-[#5C4F4A] mb-2">
            Demo Credentials
          </p>

          <p className="text-sm text-[#5C766D]">
            Email: admin@gnsspices.com
          </p>

          <p className="text-sm text-[#5C766D]">
            Password: Admin@123
          </p>

        </div>

        {/* Back */}
        <div className="mt-6 text-center">

          <Link
            href="/"
            className="text-sm text-[#5C766D] hover:text-[#C9996B]"
          >
            Back to Website
          </Link>

        </div>

      </div>

    </main>
  );
}