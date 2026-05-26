"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-[#FFF6DE] text-[#332D20] flex items-center justify-center px-6 py-10 overflow-hidden relative">

      {/* BACKGROUND GRAPHIC GLOWS */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#8BDFDD]/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F48F68]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* DECORATIVE BRAND MARK */}
      <h1 className="absolute top-5 left-1/2 -translate-x-1/2 text-[140px] md:text-[220px] font-black text-[#332D20]/[0.02] uppercase select-none pointer-events-none tracking-widest">
        GNS
      </h1>

      {/* AUTHENTICATION FORM CARD */}
      <div className="relative z-10 w-full max-w-xl rounded-[32px] overflow-hidden border-2 border-[#FFE394]/60 bg-white shadow-xl shadow-[#332D20]/5">

        {/* Form Container Wrapper */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* Form Header Info */}
          <div className="mb-8">
            <h2 className="text-4xl font-black tracking-tight text-[#332D20]">
              {isLogin ? "Login" : "Create Account"}
            </h2>

            <p className="text-[#332D20]/60 font-medium mt-2 text-sm">
              {isLogin
                ? "Login to continue management and shopping"
                : "Create your premium culinary spice account"}
            </p>
          </div>

          {/* Main Context Inputs form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

            {/* FULL NAME INTERFACE: Conditional view logic if register state */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs text-[#332D20]/80 font-black uppercase tracking-wider block">
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
                    className="w-full h-14 rounded-xl bg-[#FFE394]/15 border-2 border-[#FFE394]/40 pl-12 pr-4 outline-none text-sm text-[#332D20] font-semibold placeholder-[#332D20]/40 focus:border-[#8BDFDD] transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* EMAIL ADRESS ELEMENT */}
            <div className="space-y-2">
              <label className="text-xs text-[#332D20]/80 font-black uppercase tracking-wider block">
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
                  className="w-full h-14 rounded-xl bg-[#FFE394]/15 border-2 border-[#FFE394]/40 pl-12 pr-4 outline-none text-sm text-[#332D20] font-semibold placeholder-[#332D20]/40 focus:border-[#8BDFDD] transition-all duration-300"
                />
              </div>
            </div>

            {/* PASSWORD CONTROL INTERFACE FIELD */}
            <div className="space-y-2">
              <label className="text-xs text-[#332D20]/80 font-black uppercase tracking-wider block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#332D20]/40"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your security token"
                  className="w-full h-14 rounded-xl bg-[#FFE394]/15 border-2 border-[#FFE394]/40 pl-12 pr-12 outline-none text-sm text-[#332D20] font-semibold placeholder-[#332D20]/40 focus:border-[#8BDFDD] transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#332D20]/40 hover:text-[#332D20] transition-all"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link Container */}
            {isLogin && (
              <div className="flex justify-end pt-1">
                <Link
                  href="#"
                  className="text-xs font-bold text-[#F48F68] hover:underline tracking-wide transition-all"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* PRIMARY CONVERSION SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full h-14 rounded-xl bg-[#F48F68] text-white font-black hover:opacity-95 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F48F68]/20 tracking-wider text-sm mt-2"
            >
              {isLogin ? "LOGIN TO ACCOUNT" : "CREATE DISPATCH PROFILE"}
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

          </form>

          {/* SYSTEM MIDDLE CONTAINER VISUAL DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-[#FFE394]" />
            <span className="text-[#332D20]/40 font-black text-[10px] tracking-widest">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-[1px] bg-[#FFE394]" />
          </div>

          {/* SYSTEM THIRD-PARTY INTEGRATION INTERFACE */}
          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 rounded-xl bg-white border-2 border-[#FFE394]/60 text-[#332D20] text-sm font-bold hover:bg-[#8BDFDD]/20 hover:border-[#8BDFDD] transition-all duration-300">
              Google
            </button>

            <button className="h-12 rounded-xl bg-white border-2 border-[#FFE394]/60 text-[#332D20] text-sm font-bold hover:bg-[#8BDFDD]/20 hover:border-[#8BDFDD] transition-all duration-300">
              Facebook
            </button>
          </div>

          {/* TOGGLE STATE CONTROLL SWITCH FOOTER */}
          <div className="mt-8 text-center text-sm font-medium text-[#332D20]/70">
            {isLogin
              ? "Don't have an authentication profile yet?"
              : "Already managing an profile account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#F48F68] hover:underline font-black transition-all"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AuthPage;