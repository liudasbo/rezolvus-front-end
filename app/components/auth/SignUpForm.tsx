"use client";

import Link from "next/link";
import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";
import SocialLoginButtons from "./SocialLoginButtons";
import type { AuthRole } from "./AuthRoleTabs";

interface SignUpFormProps {
  role: AuthRole;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignUpForm({ role }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!email) errs.email = "Email is required.";
    else if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 8) errs.password = "Password must be at least 8 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("Sign up:", { email, role });
    setIsLoading(false);
    setIsSuccess(true);
  }

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {/* Heading */}
      <div className="flex flex-col gap-[12px] w-full">
        <h1 className="text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#013d47] text-center capitalize">
          Sign Up
        </h1>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[14px] leading-[20px] text-[#676665] text-center">
            Enter your personal data to create your account.
          </p>
          <div className="flex items-center justify-center gap-[4px]">
            <span className="text-[14px] leading-[20px] text-[#676665] whitespace-nowrap">
              Already have an account?
            </span>
            <Link
              href="/sign-in"
              className="text-[14px] font-medium leading-[20px] text-[#fb652b] whitespace-nowrap hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[24px] w-full">
        <div className="flex flex-col gap-[16px] w-full">
          <AuthInput
            id="signup-email"
            label="Email"
            placeholder="eg. rezolvus@gmail.com"
            value={email}
            onChange={setEmail}
            type="email"
            error={errors.email}
          />
          <AuthPasswordInput
            id="signup-password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            helperText="Must be at least 8 characters"
            error={errors.password}
          />
        </div>

        <div className="flex flex-col items-center gap-[8px] w-full">
          {isSuccess ? (
            <p className="text-[16px] font-medium leading-[24px] text-[#013d47] text-center py-[12px]">
              Account created!
            </p>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#fb652b] rounded-[1000px] px-[32px] py-[12px] text-[16px] font-medium leading-[24px] text-white hover:bg-[#e85520] active:bg-[#d44a18] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/60"
            >
              {isLoading ? "Signing up…" : "Sign Up"}
            </button>
          )}
          <span className="text-[16px] leading-[24px] text-[#858482]">or</span>
          <SocialLoginButtons />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[12px] leading-[20px] text-[#676665] text-center">
            By creating an account, you agree to our
          </p>
          <div className="flex items-center gap-[8px]">
            <a href="#" className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded">
              Terms of Service
            </a>
            <span className="text-[12px] leading-[20px] text-[#676665]">&amp;</span>
            <a href="#" className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded">
              Policy of Service
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
