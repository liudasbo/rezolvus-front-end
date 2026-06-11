# Auth Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build pixel-accurate `/sign-up` and `/sign-in` pages matching Figma node `44:9065` — white card left, decorative right panel, role tabs, form fields, social login, validation.

**Architecture:** Option A — two separate Next.js App Router pages (`app/sign-up/page.tsx`, `app/sign-in/page.tsx`) both rendering a shared `AuthLayout` component with a `mode` prop. All auth components live under `app/components/auth/`. No backend integration — form submit logs to console.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4. Figma MCP for fresh asset URLs.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `public/images/auth/` | Create dir + 7 files | Auth-specific image assets |
| `app/components/auth/AuthInput.tsx` | Create | Labelled text/email input with error state |
| `app/components/auth/AuthPasswordInput.tsx` | Create | Password input with show/hide toggle |
| `app/components/auth/AuthRoleTabs.tsx` | Create | Seeking / Specialist tab switcher |
| `app/components/auth/SocialLoginButtons.tsx` | Create | Google + Apple side-by-side buttons |
| `app/components/auth/AuthDecorativePanel.tsx` | Create | Right panel: gradient bg, creatures, text, dots |
| `app/components/auth/SignUpForm.tsx` | Create | Sign Up form with validation |
| `app/components/auth/SignInForm.tsx` | Create | Log In form with validation |
| `app/components/auth/AuthLayout.tsx` | Create | Page shell: white card left + right panel |
| `app/sign-up/page.tsx` | Create | `/sign-up` route |
| `app/sign-in/page.tsx` | Create | `/sign-in` route |

---

## Task 1: Download Figma Assets

**Files:**
- Create: `public/images/auth/` (directory + 7 files)

Figma API asset URLs expire. Before downloading, call `get_design_context` on node `44:9065` in file `HKVT4QYMJGDlpLpKLOCKJB` to get fresh URLs. The response will contain these variables:

| Variable | Save as | Type |
|---|---|---|
| `imgGroup66` | `auth-bg-gradient.png` | raster PNG |
| `imgNoiseTexture` | `auth-noise.png` | raster PNG |
| `imgBlue` | `auth-creature-orange.png` | raster PNG (orange heart, top-right) |
| `imgIllustrationBackgroundContainer` | `auth-creature-teal.png` | raster PNG (teal blob, center) |
| `imgIllustrationContainer` | `auth-creature-cream.png` | raster PNG (cream heart, bottom-right) |
| `imgGroup` | `auth-icon-google.svg` | SVG |
| `imgVector` | `auth-icon-apple.svg` | SVG |

- [ ] **Step 1: Call get_design_context to get fresh asset URLs**

Use Figma MCP tool `get_design_context` with `nodeId: "44:9065"`, `fileKey: "HKVT4QYMJGDlpLpKLOCKJB"`. Extract the 7 asset URLs from the returned constants at the top of the code output.

- [ ] **Step 2: Create the auth images directory**

```bash
mkdir -p "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images/auth"
```

- [ ] **Step 3: Download each asset**

For each URL from Step 1, run (replace `<URL>` and `<filename>` per the table above):

```bash
curl -o "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images/auth/<filename>" "<URL>"
```

Example for bg gradient:
```bash
curl -o "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images/auth/auth-bg-gradient.png" "<imgGroup66_URL>"
```

Repeat for all 7 files.

- [ ] **Step 4: Verify files exist and are non-empty**

```bash
ls -lh "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images/auth/"
```

Expected: 7 files, all > 0 bytes.

- [ ] **Step 5: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add public/images/auth/
git commit -m "feat: add auth page image assets from Figma"
```

---

## Task 2: AuthInput Component

**Files:**
- Create: `app/components/auth/AuthInput.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/AuthInput.tsx
interface AuthInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
}

export default function AuthInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label
        htmlFor={id}
        className="text-[14px] font-medium leading-[20px] text-[#1c1c1c] whitespace-nowrap"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className="h-[48px] rounded-[8px] bg-[rgba(13,13,13,0.05)] px-[16px] text-[14px] leading-[20px] text-[#1c1c1c] placeholder:text-[#a3a29f] outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 w-full border-0"
      />
      {error && (
        <p id={`${id}-error`} className="text-[12px] leading-[20px] text-[#fb652b]">
          {error}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Run build to check for TypeScript errors**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

Expected: build succeeds or only pre-existing errors (no new errors from this file).

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/AuthInput.tsx
git commit -m "feat: add AuthInput component"
```

---

## Task 3: AuthPasswordInput Component

**Files:**
- Create: `app/components/auth/AuthPasswordInput.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/AuthPasswordInput.tsx
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
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/AuthPasswordInput.tsx
git commit -m "feat: add AuthPasswordInput component with show/hide toggle"
```

---

## Task 4: AuthRoleTabs Component

**Files:**
- Create: `app/components/auth/AuthRoleTabs.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/AuthRoleTabs.tsx
"use client";

export type AuthRole = "seeking" | "specialist";

interface AuthRoleTabsProps {
  role: AuthRole;
  setRole: (role: AuthRole) => void;
}

export default function AuthRoleTabs({ role, setRole }: AuthRoleTabsProps) {
  return (
    <div className="flex flex-col items-center gap-[8px] w-full">
      <p className="text-[14px] leading-[20px] text-[#013d47] text-center w-full">
        SIGNING AS:
      </p>
      <div className="flex gap-[4px] bg-[rgba(13,13,13,0.05)] border border-[#edecec] rounded-[12px] p-[4px]">
        <button
          type="button"
          onClick={() => setRole("seeking")}
          className={`px-[24px] py-[8px] rounded-[8px] text-[14px] leading-[20px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 ${
            role === "seeking"
              ? "bg-white font-medium text-[#fb652b]"
              : "font-normal text-[#676665] hover:text-[#1c1c1c]"
          }`}
        >
          Seeking
        </button>
        <button
          type="button"
          onClick={() => setRole("specialist")}
          className={`px-[24px] py-[8px] rounded-[8px] text-[14px] leading-[20px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 ${
            role === "specialist"
              ? "bg-white font-medium text-[#fb652b]"
              : "font-normal text-[#676665] hover:text-[#1c1c1c]"
          }`}
        >
          Specialist
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/AuthRoleTabs.tsx
git commit -m "feat: add AuthRoleTabs component"
```

---

## Task 5: SocialLoginButtons Component

**Files:**
- Create: `app/components/auth/SocialLoginButtons.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/SocialLoginButtons.tsx
import Image from "next/image";

export default function SocialLoginButtons() {
  return (
    <div className="flex gap-[16px] w-full">
      <button
        type="button"
        onClick={() => console.log("Google login clicked")}
        className="flex flex-1 items-center justify-center gap-[8px] h-[48px] bg-[rgba(13,13,13,0.05)] rounded-[1000px] px-[24px] py-[8px] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40"
      >
        <Image src="/images/auth/auth-icon-google.svg" alt="" width={24} height={24} />
        <span className="text-[16px] font-medium leading-[24px] text-[#1c1c1c] whitespace-nowrap">
          Google
        </span>
      </button>
      <button
        type="button"
        onClick={() => console.log("Apple login clicked")}
        className="flex flex-1 items-center justify-center gap-[8px] h-[48px] bg-[rgba(13,13,13,0.05)] rounded-[1000px] px-[24px] py-[8px] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40"
      >
        <Image src="/images/auth/auth-icon-apple.svg" alt="" width={24} height={24} />
        <span className="text-[16px] font-medium leading-[24px] text-[#1c1c1c] whitespace-nowrap">
          Apple
        </span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/SocialLoginButtons.tsx
git commit -m "feat: add SocialLoginButtons component"
```

---

## Task 6: AuthDecorativePanel Component

**Files:**
- Create: `app/components/auth/AuthDecorativePanel.tsx`

The three creature images are positioned absolutely using pixel coordinates derived from the Figma layout (1440×780 full page). The right panel starts at x=636px in the Figma layout. Positions below are relative to the right panel's top-left corner:

| Creature | Figma absolute pos | Panel-relative pos | Size |
|---|---|---|---|
| Orange (top-right) | x=1120, y=-68 | x=484px from left / right edge overflow | 350×312px |
| Teal blob (center) | x=522, y=145 | x=-114px (overlaps card border) | 340×342px |
| Cream heart (bottom-right) | x=1117, y=569 | x=481px from left | 238×273px |

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/AuthDecorativePanel.tsx
import Image from "next/image";
import type { AuthRole } from "./AuthRoleTabs";

const COPY: Record<AuthRole, { heading: string; subtitle: string }> = {
  seeking: {
    heading: "Find the right specialist\nwithout the stress",
    subtitle: "Discover verified professionals tailored to your personal needs.",
  },
  specialist: {
    heading: "Grow a practice you're\ngenuinely proud of",
    subtitle: "Reach clients who value your craft — calm tools, no admin chaos.",
  },
};

export default function AuthDecorativePanel({ role }: { role: AuthRole }) {
  const { heading, subtitle } = COPY[role];

  return (
    <div className="relative w-full h-full">
      {/* Background — clipped to panel bounds */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <Image
          src="/images/auth/auth-bg-gradient.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/images/auth/auth-noise.png')",
            backgroundSize: "716px 716px",
          }}
        />
      </div>

      {/* Creatures — allowed to overflow panel bounds */}

      {/* Orange creature — top right, bleeds above panel */}
      <div className="absolute top-[-68px] right-[-31px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-orange.png"
          alt=""
          width={350}
          height={312}
        />
      </div>

      {/* Teal blob — center left, partially overlaps white card */}
      <div className="absolute top-[145px] left-[-114px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-teal.png"
          alt=""
          width={340}
          height={342}
        />
      </div>

      {/* Cream heart — bottom right, bleeds below panel */}
      <div className="absolute bottom-[-62px] right-[86px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-cream.png"
          alt=""
          width={238}
          height={273}
        />
      </div>

      {/* Text block — centered bottom area */}
      <div className="absolute bottom-[22%] left-0 right-0 flex flex-col items-center gap-[8px] px-[120px]">
        <p className="text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#013d47] text-center whitespace-pre-wrap capitalize">
          {heading}
        </p>
        <p className="text-[16px] leading-[24px] text-[#013d47] text-center">
          {subtitle}
        </p>
        {/* Pagination dots */}
        <div className="flex items-center gap-[8px] mt-[8px]">
          <div className="w-[48px] h-[8px] rounded-[100px] bg-[#013d47]" />
          <div className="w-[8px] h-[8px] rounded-[100px] bg-[rgba(1,61,71,0.25)]" />
          <div className="w-[8px] h-[8px] rounded-[100px] bg-[rgba(1,61,71,0.25)]" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/AuthDecorativePanel.tsx
git commit -m "feat: add AuthDecorativePanel with creatures and copy"
```

---

## Task 7: SignUpForm Component

**Files:**
- Create: `app/components/auth/SignUpForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/SignUpForm.tsx
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
      <div className="flex flex-col gap-[8px] w-full">
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
        {/* Fields */}
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

        {/* Buttons */}
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

        {/* Terms */}
        <div className="flex flex-col items-center">
          <p className="text-[12px] leading-[20px] text-[#676665] text-center">
            By creating an account, you agree to our
          </p>
          <div className="flex items-center gap-[8px]">
            <a
              href="#"
              className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Terms of Service
            </a>
            <span className="text-[12px] leading-[20px] text-[#676665]">&amp;</span>
            <a
              href="#"
              className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Policy of Service
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/SignUpForm.tsx
git commit -m "feat: add SignUpForm with email/password validation"
```

---

## Task 8: SignInForm Component

**Files:**
- Create: `app/components/auth/SignInForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/SignInForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthPasswordInput from "./AuthPasswordInput";
import SocialLoginButtons from "./SocialLoginButtons";
import type { AuthRole } from "./AuthRoleTabs";

interface SignInFormProps {
  role: AuthRole;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignInForm({ role }: SignInFormProps) {
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
    console.log("Sign in:", { email, role });
    setIsLoading(false);
    setIsSuccess(true);
  }

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {/* Heading */}
      <div className="flex flex-col gap-[8px] w-full">
        <h1 className="text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#013d47] text-center capitalize">
          Log In
        </h1>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[14px] leading-[20px] text-[#676665] text-center">
            Enter your details to access your account.
          </p>
          <div className="flex items-center justify-center gap-[4px]">
            <span className="text-[14px] leading-[20px] text-[#676665] whitespace-nowrap">
              Don&apos;t have an account?
            </span>
            <Link
              href="/sign-up"
              className="text-[14px] font-medium leading-[20px] text-[#fb652b] whitespace-nowrap hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[24px] w-full">
        {/* Fields */}
        <div className="flex flex-col gap-[16px] w-full">
          <AuthInput
            id="signin-email"
            label="Email"
            placeholder="eg. rezolvus@gmail.com"
            value={email}
            onChange={setEmail}
            type="email"
            error={errors.email}
          />
          <div className="flex flex-col gap-[4px] w-full">
            <AuthPasswordInput
              id="signin-password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
            <div className="flex justify-end">
              <a
                href="#"
                className="text-[14px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-[8px] w-full">
          {isSuccess ? (
            <p className="text-[16px] font-medium leading-[24px] text-[#013d47] text-center py-[12px]">
              Logged in!
            </p>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#fb652b] rounded-[1000px] px-[32px] py-[12px] text-[16px] font-medium leading-[24px] text-white hover:bg-[#e85520] active:bg-[#d44a18] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/60"
            >
              {isLoading ? "Logging in…" : "Log In"}
            </button>
          )}
          <span className="text-[16px] leading-[24px] text-[#858482]">or</span>
          <SocialLoginButtons />
        </div>

        {/* Terms */}
        <div className="flex flex-col items-center">
          <p className="text-[12px] leading-[20px] text-[#676665] text-center">
            By continuing, you agree to our
          </p>
          <div className="flex items-center gap-[8px]">
            <a
              href="#"
              className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Terms of Service
            </a>
            <span className="text-[12px] leading-[20px] text-[#676665]">&amp;</span>
            <a
              href="#"
              className="text-[12px] font-medium leading-[20px] text-[#fb652b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/40 rounded"
            >
              Policy of Service
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/SignInForm.tsx
git commit -m "feat: add SignInForm with validation and forgot password link"
```

---

## Task 9: AuthLayout Component

**Files:**
- Create: `app/components/auth/AuthLayout.tsx`

The layout uses a flex row. On `≥1024px`: white card is `w-[620px]` fixed, right panel fills remaining space. On `<1024px`: card is full-width, right panel hidden.

Logo is positioned in the top-left of the white card at `top-[32px] left-[40px]` (matching Figma's logo vector at x=56, y=48 from full frame = x=40, y=32 from card at x=16, y=16).

Form content is padded `pt-[92px]` from top (matching Figma's form container at y=92 inside the card).

- [ ] **Step 1: Create the component**

```tsx
// app/components/auth/AuthLayout.tsx
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
      <div className="relative flex-shrink-0 m-[16px] w-full lg:w-[620px] bg-white rounded-[32px] z-10">
        {/* Logo */}
        <div className="absolute top-[32px] left-[40px]">
          <Link
            href="/"
            className="relative block w-[124px] h-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 rounded"
          >
            <Image
              src="/images/logo-nav.svg"
              alt="Rezolvus"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Form content */}
        <div className="flex flex-col items-center gap-[24px] px-[16px] sm:px-[60px] lg:px-[140px] pt-[92px] pb-[40px] min-h-full">
          <AuthRoleTabs role={role} setRole={setRole} />
          {mode === "sign-up" ? (
            <SignUpForm role={role} />
          ) : (
            <SignInForm role={role} />
          )}
        </div>
      </div>

      {/* Right decorative panel — hidden below 1024px */}
      <div className="hidden lg:block flex-1 relative overflow-visible my-[16px] mr-[16px] rounded-[32px]">
        <AuthDecorativePanel role={role} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/auth/AuthLayout.tsx
git commit -m "feat: add AuthLayout with split card/panel design"
```

---

## Task 10: Route Pages

**Files:**
- Create: `app/sign-up/page.tsx`
- Create: `app/sign-in/page.tsx`

- [ ] **Step 1: Create sign-up page**

```tsx
// app/sign-up/page.tsx
import type { Metadata } from "next";
import AuthLayout from "@/app/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Sign Up — Rezolvus",
  description: "Create your Rezolvus account.",
};

export default function SignUpPage() {
  return <AuthLayout mode="sign-up" />;
}
```

- [ ] **Step 2: Create sign-in page**

```tsx
// app/sign-in/page.tsx
import type { Metadata } from "next";
import AuthLayout from "@/app/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Log In — Rezolvus",
  description: "Sign in to your Rezolvus account.",
};

export default function SignInPage() {
  return <AuthLayout mode="sign-in" />;
}
```

- [ ] **Step 3: Run build**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -30
```

Expected: build succeeds. Note: Next.js will warn that `AuthLayout` uses `"use client"` hooks and is imported from a Server Component page — this is fine; Next.js handles the boundary automatically.

- [ ] **Step 4: Commit**

```bash
git add app/sign-up/page.tsx app/sign-in/page.tsx
git commit -m "feat: add /sign-up and /sign-in route pages"
```

---

## Task 11: Visual Verification and Fixes

**Files:** Any auth component that needs pixel-level adjustments.

- [ ] **Step 1: Start dev server**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run dev
```

- [ ] **Step 2: Verify /sign-up at 1440px**

Open `http://localhost:3000/sign-up` in a browser at 1440px width. Compare against Figma screenshot of node `44:9065`. Check:

- White card fills left, decorative panel fills right
- Logo top-left of card
- "SIGNING AS:" tabs centered
- "Sign Up" heading, subtitle, "Already have an account? Log In" link
- Email + Password fields with correct height (48px), background, placeholder color
- Password helper text "Must be at least 8 characters"
- Orange Sign Up button full width
- "or" divider centered
- Google + Apple buttons equal width, side by side
- Terms text with orange links
- Right panel: gradient background, three creature illustrations visible, hero text, pagination dots

- [ ] **Step 3: Verify /sign-in at 1440px**

Open `http://localhost:3000/sign-in`. Check:

- "Log In" heading
- "Don't have an account? Sign Up" link → navigates to /sign-up
- Password field has no helper text
- "Forgot password?" link to the right below password field → goes to `#`
- Button reads "Log In"
- Terms reads "By continuing, you agree to our…"

- [ ] **Step 4: Test form interactions**

On `/sign-up`:
- Submit empty form → errors appear on both fields
- Enter invalid email → email error appears
- Enter email + 7-char password → password error appears
- Enter valid email + 8-char password → 800ms loading, "Account created!" success state
- Click show/hide on password → input type toggles

On `/sign-in`:
- Submit empty → both errors
- Valid email + any non-empty password → "Logged in!" success state

- [ ] **Step 5: Test role tabs**

Click "Specialist" tab → right panel copy changes to "Grow a practice you're genuinely proud of". Click "Seeking" → copy reverts.

- [ ] **Step 6: Test navigation links**

- Logo on `/sign-up` → navigates to `/`
- "Log In" link on `/sign-up` → navigates to `/sign-in`
- "Sign Up" link on `/sign-in` → navigates to `/sign-up`
- "Forgot password?" → stays on page (links to `#`)
- Google / Apple buttons → check console for "Google login clicked" / "Apple login clicked"

- [ ] **Step 7: Test responsive**

Resize browser to these widths and check for issues (no horizontal scroll, readable text, no overflow):
- 1280px: split layout still visible
- 1024px: split layout, card slightly narrower
- 1023px: right panel disappears, card fills full width
- 768px: card full width, padding reduces
- 430px: form readable, inputs full width
- 375px: no horizontal overflow

- [ ] **Step 8: Verify other pages are unaffected**

Navigate to `/`, `/find-specialists`. Confirm both load normally with no visual regressions.

- [ ] **Step 9: Apply any pixel-level fixes**

Compare carefully with Figma. Common things to check:
- Creature positioning (adjust `top`/`right`/`left`/`bottom` values in `AuthDecorativePanel`)
- Form vertical centering (adjust `pt-[92px]` in `AuthLayout` if needed — in Figma the form starts 92px from the card top)
- Card height on desktop (in Figma it's exactly 748px; check if `min-h-[748px]` is needed)

To make the card exactly 748px tall on desktop, add to the card div:

```tsx
// In AuthLayout.tsx, the white card div:
className="relative flex-shrink-0 m-[16px] w-full lg:w-[620px] lg:h-[748px] bg-white rounded-[32px] z-10 overflow-y-auto"
```

- [ ] **Step 10: Final build check**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -30
```

Expected: clean build with no TypeScript or ESLint errors.

- [ ] **Step 11: Commit any fixes**

```bash
git add -p  # stage only auth-related changes
git commit -m "fix: auth page visual alignment adjustments"
```

---

## Completion Checklist

- [ ] All 7 assets downloaded to `public/images/auth/`
- [ ] `AuthInput`, `AuthPasswordInput`, `AuthRoleTabs`, `SocialLoginButtons`, `AuthDecorativePanel` created
- [ ] `SignUpForm`, `SignInForm`, `AuthLayout` created
- [ ] `/sign-up` and `/sign-in` route pages created
- [ ] Form validation works (email format, password length)
- [ ] Password show/hide toggle works
- [ ] Role tabs switch right panel copy
- [ ] Navigation links work between pages
- [ ] Logo links to `/`
- [ ] `npm run build` passes
- [ ] No horizontal scroll at any breakpoint 375px–1440px
- [ ] Right panel hidden below 1024px
- [ ] `/` and `/find-specialists` pages unaffected
