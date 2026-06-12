"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Find Specialists", href: "/find-specialists" },
  { label: "How It Works", href: "#" },
  { label: "For Specialists", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "About", href: "#" },
];

interface HeaderProps {
  variant?: "light" | "dark";
}

export default function Header({ variant = "light" }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const pillBg = variant === "dark" ? "bg-[#013d47]" : "bg-white/5 backdrop-blur-md";

  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className={`${pillBg} rounded-full px-5 py-3 flex items-center justify-between`}>
        {/* Logo */}
        <Link
          href="/"
          className="relative h-6 w-[106px] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
        >
          <Image src="/images/logo-nav.svg" alt="Rezolvus" fill className="object-contain" />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive =
            href !== "#" &&
            (pathname === href ||
              (href === "/find-specialists" && pathname.startsWith("/specialists")));
            return isActive ? (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 text-[#FB652B] text-sm xl:text-base font-normal leading-6 whitespace-nowrap opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 rounded"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#FB652B] shrink-0" />
                {label}
              </Link>
            ) : (
              <Link
                key={label}
                href={href}
                className="text-white text-sm xl:text-base leading-6 whitespace-nowrap hover:opacity-80 active:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Actions — desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/sign-up"
            className="border-[1.5px] border-white rounded-full px-4 xl:px-6 py-2 text-white text-sm xl:text-base font-medium leading-6 whitespace-nowrap hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Login
          </Link>
          <Link
            href="/find-specialists"
            className="bg-[#FB652B] rounded-full px-4 xl:px-6 py-2 text-white text-sm xl:text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger — mobile/tablet */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`lg:hidden mt-2 ${variant === "dark" ? "bg-[#013d47]" : "bg-white/10 backdrop-blur-md"} rounded-[24px] px-6 py-6 flex flex-col gap-5`}>
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ label, href }) => {
              const isActive =
            href !== "#" &&
            (pathname === href ||
              (href === "/find-specialists" && pathname.startsWith("/specialists")));
              return isActive ? (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-[#FB652B] text-base font-normal leading-6"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-[#FB652B] shrink-0" />
                  {label}
                </Link>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-base leading-6 hover:opacity-80 transition-opacity"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-white/20">
            <Link
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="border-[1.5px] border-white rounded-full px-6 py-2.5 text-white text-base font-medium leading-6 text-center hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/find-specialists"
              onClick={() => setMenuOpen(false)}
              className="bg-[#FB652B] rounded-full px-6 py-2.5 text-white text-base font-medium leading-6 text-center hover:bg-[#e85520] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
