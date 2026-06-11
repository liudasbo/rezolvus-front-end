"use client";

import { useState } from "react";

interface AuthPasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function AuthPasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  error,
}: AuthPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const describedBy = [
    helperText && !error ? `${id}-helper` : "",
    error ? `${id}-error` : "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label
        htmlFor={id}
        className="text-[14px] font-medium leading-[20px] text-[#1c1c1c] whitespace-nowrap"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className="h-[48px] w-full rounded-[8px] bg-[rgba(13,13,13,0.05)] px-[16px] pr-[44px] text-[14px] leading-[20px] text-[#1c1c1c] placeholder:text-[#a3a29f] outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 border-0"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#a3a29f] hover:text-[#676665] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 rounded"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-[12px] leading-[20px] text-[#a3a29f]">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-[12px] leading-[20px] text-[#fb652b]">
          {error}
        </p>
      )}
    </div>
  );
}
