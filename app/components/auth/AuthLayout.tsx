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
    <div className="h-screen w-full bg-[#edecec] flex overflow-hidden">
      {/* Left white card — height fills 100vh minus 16px top+bottom margins via flex stretch */}
      <div className="relative flex-shrink-0 m-[16px] w-full lg:w-[620px] bg-white rounded-[32px] z-10 overflow-hidden">
        {/* Logo */}
        <div className="absolute top-[32px] left-[40px] z-10">
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

        {/* Form content
            Mobile: top-aligned with padding, scrollable if needed
            Desktop (lg+): absolutely centered at 50%+34px matching Figma node 44-9065 */}
        <div className="flex flex-col items-center gap-[24px] h-full overflow-y-auto px-[16px] sm:px-[60px] pt-[92px] pb-[40px] lg:absolute lg:left-1/2 lg:top-[calc(50%+34px)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[340px] lg:px-0 lg:pt-0 lg:pb-0 lg:h-auto lg:overflow-visible">
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
