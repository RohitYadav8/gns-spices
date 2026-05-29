"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const AuthPage = () => {
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLogin, setIsLogin] =
    useState(true);

  // FORM STATES
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SUBMIT FUNCTION
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        login(data.user);
        // RESET FORM
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // REDIRECT
        router.push("/products");
      } else {
        alert(
          data.message ||
            "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF6DE] px-6 py-10 text-[#332D20]">
      
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute left-0 top-0 h-112.5 w-112.5 rounded-full bg-[#8BDFDD]/20 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-112.5 w-112.5 rounded-full bg-[#F48F68]/10 blur-[150px]" />

      {/* BIG BRAND TEXT */}
      <h1 className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 select-none text-[140px] font-black uppercase tracking-widest text-[#332D20]/2 md:text-[220px]">
        GNS
      </h1>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-4xl border-2 border-[#FFE394]/60 bg-white shadow-xl shadow-[#332D20]/5">
        
        <div className="p-6 sm:p-10 lg:p-12">
          {user ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFE394]/30 text-4xl font-black text-[#F48F68]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[#332D20]">
                Welcome, {user.name.split(" ")[0]}!
              </h2>
              <p className="mt-2 text-sm font-medium text-[#332D20]/60">
                {user.email}
              </p>
              
              <button
                onClick={() => logout()}
                className="mt-10 flex h-12 w-full max-w-50 items-center justify-center gap-2 rounded-xl bg-white border-2 border-[#FFE394]/60 text-sm font-bold text-[#332D20] transition-all duration-300 hover:border-[#F48F68] hover:bg-[#F48F68]/10"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-4xl font-black tracking-tight text-[#332D20]">
              {isLogin
                ? "Login"
                : "Create Account"}
            </h2>

            <p className="mt-2 text-sm font-medium text-[#332D20]/60">
              {isLogin
                ? "Login to continue management and shopping"
                : "Create your premium culinary spice account"}
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            
            {/* NAME */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-4 text-sm font-semibold text-[#332D20] outline-none placeholder:text-[#332D20]/40 focus:border-[#8BDFDD]"
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-4 text-sm font-semibold text-[#332D20] outline-none placeholder:text-[#332D20]/40 focus:border-[#8BDFDD]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-12 text-sm font-semibold text-[#332D20] outline-none placeholder:text-[#332D20]/40 focus:border-[#8BDFDD]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#332D20]/40 hover:text-[#332D20]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#332D20]/80">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="h-14 w-full rounded-xl border-2 border-[#FFE394]/40 bg-[#FFE394]/15 pl-12 pr-12 text-sm font-semibold text-[#332D20] outline-none placeholder:text-[#332D20]/40 focus:border-[#8BDFDD]"
                  />
                </div>
              </div>
            )}


            {/* FORGOT PASSWORD */}
            {isLogin && (
              <div className="flex justify-end pt-1">
                <Link
                  href="#"
                  className="text-xs font-bold tracking-wide text-[#F48F68] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#F48F68] text-sm font-black tracking-wider text-white shadow-lg shadow-[#F48F68]/20 transition-all duration-300 hover:opacity-95 active:scale-[0.99]"
            >
              {loading
                ? "PLEASE WAIT..."
                : isLogin
                ? "LOGIN TO ACCOUNT"
                : "CREATE ACCOUNT"}

              <ArrowRight
                size={16}
                strokeWidth={2.5}
              />
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#FFE394]" />

            <span className="text-[10px] font-black tracking-widest text-[#332D20]/40">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-[#FFE394]" />
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 rounded-xl border-2 border-[#FFE394]/60 bg-white text-sm font-bold text-[#332D20] transition-all duration-300 hover:border-[#8BDFDD] hover:bg-[#8BDFDD]/20">
              Google
            </button>

            <button className="h-12 rounded-xl border-2 border-[#FFE394]/60 bg-white text-sm font-bold text-[#332D20] transition-all duration-300 hover:border-[#8BDFDD] hover:bg-[#8BDFDD]/20">
              Facebook
            </button>
          </div>

          {/* TOGGLE */}
          <div className="mt-8 text-center text-sm font-medium text-[#332D20]/70">
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}

            <button
              onClick={() =>
                setIsLogin(!isLogin)
              }
              className="ml-2 font-black text-[#F48F68] hover:underline"
            >
              {isLogin
                ? "Sign Up"
                : "Login"}
            </button>
          </div>
          </>
          )}
        </div>
      </div>
    </main>
  );
};

export default AuthPage;