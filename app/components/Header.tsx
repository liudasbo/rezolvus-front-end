"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Find Specialists", href: "/find-specialists" },
  { label: "How It Works", href: "#" },
  { label: "For Specialists", href: "#" },
  { label: "Reviews", href: "#" },
  { label: "About", href: "#" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-6 w-[106px] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
          <Image src="/images/logo-nav.svg" alt="Rezolvus" fill className="object-contain" />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = href !== "#" && pathname === href;
            return isActive ? (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 text-[#FB652B] text-base font-normal leading-6 whitespace-nowrap opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 rounded"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#FB652B] shrink-0" />
                {label}
              </Link>
            ) : (
              <Link
                key={label}
                href={href}
                className="text-white text-base leading-6 whitespace-nowrap hover:opacity-80 active:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="border-[1.5px] border-white rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Login
          </Link>
          <Link
            href="/find-specialists"
            className="bg-[#FB652B] rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
