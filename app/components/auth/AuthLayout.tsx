"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthDecorativePanel from "./AuthDecorativePanel";
import AuthRoleTabs from "./AuthRoleTabs";
import type { AuthRole } from "./AuthRoleTabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthLayoutProps {
  mode: "sign-up" | "sign-in";
}

export default function AuthLayout({ mode }: AuthLayoutProps) {
  const [role, setRole] = useState<AuthRole>("seeking");

  return (
    <div className="min-h-screen w-full bg-[#edecec] flex overflow-x-hidden">
      {/* Left white card */}
      <div className="relative flex-shrink-0 m-[16px] w-full lg:w-[620px] lg:h-[748px] bg-white rounded-[32px] z-10">
        {/* Logo */}
        <div className="absolute top-[32px] left-[40px]">
          <Link
            href="/"
            className="relative block w-[124px] h-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 rounded"
          >
            <Image
              src="/images/auth/auth-logo.svg"
              alt="Rezolvus"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Form content — scrollable on mobile */}
        <div className="flex flex-col items-center gap-[24px] px-[16px] sm:px-[60px] lg:px-[140px] pt-[92px] pb-[40px] h-full overflow-y-auto">
          <AuthRoleTabs role={role} setRole={setRole} />
          {mode === "sign-up" ? (
            <SignUpForm role={role} />
          ) : (
            <SignInForm role={role} />
          )}
        </div>
      </div>

      {/* Right decorative panel — hidden below lg (1024px) */}
      <div className="hidden lg:block flex-1 relative overflow-visible my-[16px] mr-[16px] rounded-[32px]">
        <AuthDecorativePanel role={role} />
      </div>
    </div>
  );
}
