"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingCart,
  User,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { cart } = useCart();
  const { user } = useAuth();

  const totalItems = cart.reduce(
    (acc: number, item: any) => acc + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? `
            bg-white/20
            backdrop-blur-xl
            border-b
            border-[#FFE394]/40
            shadow-lg
            py-4
          `
          : "bg-transparent py-6"
      }`}
    >
      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#8BDFDD]/20 blur-[120px] pointer-events-none" />

      {/* ORANGE GLOW */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F48F68]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <div className="relative w-[170px] h-[55px] cursor-pointer">
            <Image
              src="/GNS-LOGO.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-14">

          {[
            { label: "Shop", href: "/shop" },
            { label: "Products", href: "/products" },
            { label: "B2B", href: "/B2B" },
            { label: "Private Label", href: "/PrivateLabel" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                relative
                text-[#332D20]
                font-black
                uppercase
                tracking-[2px]
                text-sm
                hover:text-[#F48F68]
                transition-all
                duration-300
                group
              "
            >
              {item.label}

              <span
                className="
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  w-0
                  bg-[#F48F68]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </Link>
          ))}

        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="hidden lg:flex items-center gap-5">

          {/* CART */}
          <Link href="/cart">
            <div
              className="
                group
                relative
                w-12
                h-12
                rounded-full
                border
                border-[#FFE394]
                bg-white/70
                backdrop-blur-xl
                flex
                items-center
                justify-center
                hover:scale-110
                hover:bg-[#F48F68]
                transition-all
                duration-300
                shadow-md
              "
            >
              <ShoppingCart
                size={21}
                className="
                  text-[#332D20]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-[#F48F68]
                    text-white
                    text-[10px]
                    font-black
                    flex
                    items-center
                    justify-center
                    shadow-md
                    border
                    border-white
                  "
                >
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {/* ACCOUNT */}
          <Link href="/account">
            <div
              className="
                group
                w-12
                h-12
                rounded-full
                border
                border-[#FFE394]
                bg-white/70
                backdrop-blur-xl
                flex
                items-center
                justify-center
                hover:bg-[#8BDFDD]
                hover:scale-110
                transition-all
                duration-300
                shadow-md
              "
            >
              {user ? (
                <span className="font-bold text-[#332D20] text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User
                  size={21}
                  className="
                    text-[#332D20]
                    transition-all
                    duration-300
                  "
                />
              )}
            </div>
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="
            lg:hidden
            w-12
            h-12
            rounded-full
            border
            border-[#FFE394]
            bg-white/70
            backdrop-blur-xl
            flex
            items-center
            justify-center
            text-[#332D20]
          "
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenu
            ? "max-h-[500px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="
            mx-4
            rounded-[32px]
            border
            border-[#FFE394]
            bg-white/20
            backdrop-blur-xl
            p-8
            shadow-2xl
            flex
            flex-col
            gap-8
            text-center
          "
        >

          <Link
            href="/shop"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
            "
          >
            Shop
          </Link>

          <Link
            href="/products"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
            "
          >
            Products
          </Link>

          <Link
            href="/B2B"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
            "
          >
            B2B
          </Link>

          <Link
            href="/PrivateLabel"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
            "
          >
            Private Label
          </Link>

          <Link
            href="/cart"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
              flex
              items-center
              justify-center
              gap-2
            "
          >
            Cart

            {totalItems > 0 && (
              <span
                className="
                  bg-[#F48F68]
                  text-white
                  px-2
                  py-0.5
                  rounded-full
                  text-xs
                  font-black
                "
              >
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            onClick={() => setMobileMenu(false)}
            className="
              text-[#332D20]
              text-lg
              font-black
              uppercase
              tracking-[2px]
              hover:text-[#F48F68]
              transition-all
            "
          >
            {user ? `Hi, ${user.name.split(" ")[0]}` : "Account"}
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;