# Rezolvus Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full Rezolvus homepage pixel-perfectly from Figma design (node 1:334, file HKVT4QYMJGDlpLpKLOCKJB).

**Architecture:** All sections are Next.js Server Components assembled in `app/page.tsx`. Styles are inline Tailwind v4 classes. Figma images are downloaded to `public/images/` and `public/fonts/` placeholder setup for Tomato Grotesk. No client-side JS needed for the static homepage.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS v4, next/font/google (Inter fallback)

**Spec:** `docs/superpowers/specs/2026-06-10-rezolvus-homepage-design.md`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/globals.css` | Modify | @font-face, @theme tokens, marquee keyframe, body base |
| `app/layout.tsx` | Modify | Metadata, font setup, remove Geist |
| `app/page.tsx` | Modify | Assemble all sections |
| `public/images/` | Create | All Figma asset downloads |
| `public/fonts/` | Create | Placeholder dir for Tomato Grotesk files |
| `app/components/Header.tsx` | Create | Frosted glass nav pill |
| `app/components/sections/Hero.tsx` | Create | Hero with bg image, headline, search, rating |
| `app/components/sections/FeaturesSection.tsx` | Create | 3 feature cards section |
| `app/components/sections/HealthAreasSection.tsx` | Create | 6 area cards on dark bg |
| `app/components/sections/HowItWorksSection.tsx` | Create | Image + 4-step list |
| `app/components/sections/TickerSection.tsx` | Create | Animated marquee on teal pill |
| `app/components/sections/SpecialistsSection.tsx` | Create | Specialist cards carousel |
| `app/components/sections/TestimonialsSection.tsx` | Create | Two rows of testimonial cards |
| `app/components/sections/CTASection.tsx` | Create | Photo card with glass CTA panel |
| `app/components/sections/Footer.tsx` | Create | Dark footer with large logo |

---

## Task 0: Download Figma Assets

**Files:**
- Create: `public/images/` (all image files)
- Create: `public/fonts/` (placeholder directory)

- [ ] **Step 1: Create directories**

```bash
mkdir -p "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images"
mkdir -p "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/fonts"
```

- [ ] **Step 2: Download all Figma asset images**

Run each curl command. Images expire 7 days from 2026-06-10:

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images"

# Hero
curl -o hero-bg.jpg "https://www.figma.com/api/mcp/asset/97df02e4-4a55-4094-85fa-b076f7de399c"
curl -o hero-overlay.png "https://www.figma.com/api/mcp/asset/25426b0f-c8b9-4d66-b430-257dfb6d6484"

# Logo
curl -o logo-nav.svg "https://www.figma.com/api/mcp/asset/497f5b92-9156-4e39-a66b-0121bb38b13f"
curl -o logo-footer.png "https://www.figma.com/api/mcp/asset/ddaaf6de-88aa-4a95-a80c-a6ab12f70ec6"

# Search bar decoratives
curl -o search-bunny.png "https://www.figma.com/api/mcp/asset/7b7fc054-417d-436e-9cba-07c96a81bd89"
curl -o search-creature.png "https://www.figma.com/api/mcp/asset/8dd48d8c-3da7-4c02-95fa-0a80581a6be1"

# Rating strip avatars
curl -o avatar-1.png "https://www.figma.com/api/mcp/asset/9e004ecf-a9cc-4a62-ab90-9f6f081788a2"
curl -o avatar-2.png "https://www.figma.com/api/mcp/asset/51697e96-e78a-4e30-a595-538e2448a0a7"
curl -o avatar-3.png "https://www.figma.com/api/mcp/asset/e31581f4-eecf-4f6b-aba9-a11ec3fa55f8"

# Features section icons
curl -o icon-seal-check.png "https://www.figma.com/api/mcp/asset/be4f123c-f4a0-4ac4-a890-b9f04cc1892b"
curl -o icon-users-three.png "https://www.figma.com/api/mcp/asset/da25a57c-0f71-445b-ac82-94606d59e473"
curl -o icon-shield.png "https://www.figma.com/api/mcp/asset/aae0be47-1c4c-4c9c-8b78-8732bd87b3c2"

# Health area illustrations
curl -o area-anxiety.png "https://www.figma.com/api/mcp/asset/c761f259-b6c0-4405-bafc-be1e9f37e079"
curl -o area-physical.png "https://www.figma.com/api/mcp/asset/5d1c2940-6648-49ce-82c7-6dff01269425"
curl -o area-sleep.png "https://www.figma.com/api/mcp/asset/0e0d9825-2184-4c1f-98c2-c9f4d7552658"
curl -o area-nutrition.png "https://www.figma.com/api/mcp/asset/cf511817-5956-439b-96ea-70f0cc5e8704"
curl -o area-burnout.png "https://www.figma.com/api/mcp/asset/d1580133-e061-43d0-97c7-9fd12436465a"
curl -o area-relationship.png "https://www.figma.com/api/mcp/asset/3d131c6b-6c20-4bea-8296-8c7726c75b0b"

# Arrow icons
curl -o icon-arrow-up-right.png "https://www.figma.com/api/mcp/asset/4404f130-b470-4a26-8d99-e47d59135b01"
curl -o icon-arrow-right.png "https://www.figma.com/api/mcp/asset/63701a39-6e54-4c1f-84f5-d6e677ca02c7"
curl -o icon-caret-down.png "https://www.figma.com/api/mcp/asset/5ac5a4e8-9a98-4dc8-addc-98da859c5476"

# How It Works section
curl -o how-it-works-photo.jpg "https://www.figma.com/api/mcp/asset/7cc736cb-1ddf-449c-bc17-f82d7f52d868"
curl -o how-it-works-overlay.png "https://www.figma.com/api/mcp/asset/768724c2-f942-472f-adf8-6f1a06368e4f"
curl -o how-it-works-star.png "https://www.figma.com/api/mcp/asset/d10c2636-7611-401c-aa11-6262988f6881"
curl -o how-it-works-wave1.png "https://www.figma.com/api/mcp/asset/ba5b701b-0271-4a10-ad9b-20e5b9f955a6"
curl -o how-it-works-wave2.png "https://www.figma.com/api/mcp/asset/504babae-145a-4395-a4bb-db0380680f6b"
curl -o how-it-works-creature.png "https://www.figma.com/api/mcp/asset/e3d79704-b6d1-4064-b114-65916251e2d7"

# Ticker
curl -o ticker-dot.png "https://www.figma.com/api/mcp/asset/dfbcd0c2-31c9-4499-a262-fb7659af5439"

# Specialists section
curl -o spec-heart.png "https://www.figma.com/api/mcp/asset/487c35a4-aa4b-4ae9-99fb-1f46f30363ee"
curl -o specialist-1.jpg "https://www.figma.com/api/mcp/asset/aa48783f-ffe2-462c-9ac5-0ad1e640f92f"
curl -o specialist-2.jpg "https://www.figma.com/api/mcp/asset/09cb14f5-d18c-4c4f-a6d3-d10337a9dcaa"
curl -o specialist-3.jpg "https://www.figma.com/api/mcp/asset/40f9f898-8db1-404b-b0a2-43f11989dede"
curl -o specialist-4.jpg "https://www.figma.com/api/mcp/asset/6ca1b83f-3f88-4de4-9eb1-597b89115fd2"
curl -o icon-armchair.png "https://www.figma.com/api/mcp/asset/7a9b552e-a050-4bc5-8f6b-9ad613e9d0a8"
curl -o icon-laptop.png "https://www.figma.com/api/mcp/asset/f69aca98-ff29-442e-8795-5fdefa38a102"
curl -o icon-star.png "https://www.figma.com/api/mcp/asset/db7700f5-db9a-4e24-be97-1c3b4b6ef5bd"
curl -o icon-dot.png "https://www.figma.com/api/mcp/asset/49d375bb-d010-497b-984c-bfaca668e372"

# Testimonials
curl -o testimonial-avatar.png "https://www.figma.com/api/mcp/asset/33649c94-c3e8-4a42-8569-13b2ec6ce61f"
curl -o icon-star-small.png "https://www.figma.com/api/mcp/asset/c8465022-4a75-463b-8994-ef8caf99986c"
curl -o icon-star-rating.png "https://www.figma.com/api/mcp/asset/a23adaea-d7b8-47f9-9f51-8de22ccd6163"

# CTA
curl -o cta-bg.jpg "https://www.figma.com/api/mcp/asset/19a87ce0-706f-4147-8f07-4007e231c10c"
curl -o cta-heart.png "https://www.figma.com/api/mcp/asset/39143d8b-33a4-42e8-a616-16e91f1b8d01"
curl -o cta-star.png "https://www.figma.com/api/mcp/asset/b3ababaf-3726-4806-a13e-bf771e94a43e"
```

- [ ] **Step 3: Verify downloads**

```bash
ls -la "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/public/images/" | wc -l
```
Expected: 40+ files listed.

- [ ] **Step 4: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add public/
git commit -m "feat: add Figma asset images to public/images"
```

---

## Task 1: Foundation — globals.css + layout.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css**

```css
/* app/globals.css */
@import "tailwindcss";

/* Tomato Grotesk — place woff2 files in public/fonts/ to activate */
@font-face {
  font-family: 'Tomato Grotesk';
  src: url('/fonts/TomatoGrotesk-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Tomato Grotesk';
  src: url('/fonts/TomatoGrotesk-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Tomato Grotesk';
  src: url('/fonts/TomatoGrotesk-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@theme inline {
  --color-cold-dark: #013D47;
  --color-cold-light: #67CDCD;
  --color-warm: #FB652B;
  --color-warm-light: #FBB582;
  --color-section: #F6F6F5;
  --color-card-bg: #EDECEC;
  --color-body: #494947;
  --color-dark: #1C1C1C;
  --color-near-black: #0D0D0D;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: 'Tomato Grotesk', var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  background-color: #F6F6F5;
  color: #0D0D0D;
}
```

- [ ] **Step 2: Replace layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rezolvus — Find the Right Specialist Without The Stress",
  description:
    "Discover verified psychologists, physiotherapists, wellness specialists, and more — all in one modern platform designed around trust and simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build compiles**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -5
```
Expected: `✓ Compiled successfully` (or similar). No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: setup Tailwind theme tokens, font-face, layout metadata"
```

---

## Task 2: Header Component

**Files:**
- Create: `app/components/Header.tsx`

- [ ] **Step 1: Create component directory**

```bash
mkdir -p "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus/app/components/sections"
```

- [ ] **Step 2: Create Header.tsx**

```tsx
// app/components/Header.tsx
import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="relative h-6 w-[106px] shrink-0">
          <Image src="/images/logo-nav.svg" alt="Rezolvus" fill className="object-contain" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {["Find Specialists", "How It Works", "For Specialists", "Reviews", "About"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-white text-base font-normal leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                {link}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="border border-white rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-white/10 transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            className="bg-[#FB652B] rounded-full px-6 py-2 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: add Header component with frosted glass nav"
```

---

## Task 3: Hero Section

**Files:**
- Create: `app/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
// app/components/sections/Hero.tsx
import Image from "next/image";
import Header from "../Header";

export default function Hero() {
  return (
    <section className="relative w-full h-[780px] overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <Image
        src="/images/hero-overlay.png"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Nav */}
      <Header />

      {/* Headline block — centered, top 236px */}
      <div className="absolute top-[236px] left-0 right-0 flex flex-col items-center gap-4 text-center px-4">
        <h1 className="text-white text-[64px] font-medium leading-[80px] tracking-[-1.92px] capitalize max-w-[723px]">
          Find the right specialist{" "}
          <br />
          without the stress
        </h1>
        <p className="text-white text-lg font-normal leading-[27px] max-w-[601px]">
          Discover verified psychologists, physiotherapists, wellness specialists,
          and more — all in one modern platform designed around trust and simplicity.
        </p>
      </div>

      {/* Search bar — top 564px, centered, 816px wide */}
      <div className="absolute top-[564px] left-1/2 -translate-x-1/2 w-[816px]">
        <div className="relative bg-white backdrop-blur-xl rounded-full p-3 flex items-center gap-8">
          {/* Decorative bunny (top-left) */}
          <img
            src="/images/search-bunny.png"
            alt=""
            className="absolute -top-12 left-[82px] w-16 h-18 pointer-events-none"
          />
          {/* Decorative creature (bottom-right) */}
          <img
            src="/images/search-creature.png"
            alt=""
            className="absolute -bottom-8 right-[90px] w-[72px] pointer-events-none"
          />

          {/* Dropdowns */}
          <div className="flex items-center gap-3">
            {["Specialist", "Location", "Consultation type"].map((label) => (
              <button
                key={label}
                className="bg-white/10 border border-[rgba(13,13,13,0.1)] rounded-full h-12 w-[185px] flex items-center justify-between px-5 py-2 text-[#1C1C1C] text-base font-normal leading-6"
              >
                <span className="truncate">{label}</span>
                <img src="/images/icon-caret-down.png" alt="" className="w-5 h-5 shrink-0" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <button className="bg-[#FB652B] rounded-full h-12 px-6 flex items-center justify-center text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] transition-colors">
            Find My Specialist
          </button>
        </div>
      </div>

      {/* Rating strip — top 700px, centered */}
      <div className="absolute top-[700px] left-1/2 -translate-x-1/2">
        <div className="bg-white/15 backdrop-blur-sm border border-white rounded-full h-12 flex items-center gap-3 pl-2 pr-4 py-2">
          {/* Overlapping avatars */}
          <div className="flex items-center">
            <img src="/images/avatar-1.png" alt="" className="w-8 h-8 rounded-full -mr-4 relative z-30" />
            <img src="/images/avatar-2.png" alt="" className="w-8 h-8 rounded-full -mr-4 relative z-20" />
            <img src="/images/avatar-3.png" alt="" className="w-8 h-8 rounded-full relative z-10" />
          </div>
          {/* Stars */}
          <div className="flex items-center gap-1 ml-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src="/images/icon-star-rating.png" alt="" className="w-5 h-5" />
            ))}
          </div>
          {/* Rating text */}
          <div className="flex items-center gap-2 text-base leading-6">
            <span className="text-white font-medium">4.8/5.0</span>
            <span className="text-white/70 font-normal">(1.1K+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/Hero.tsx
git commit -m "feat: add Hero section with bg image, search bar, and rating strip"
```

---

## Task 4: Features Section

**Files:**
- Create: `app/components/sections/FeaturesSection.tsx`

- [ ] **Step 1: Create FeaturesSection.tsx**

```tsx
// app/components/sections/FeaturesSection.tsx
const features = [
  {
    title: "Verified Specialists",
    body: "Every professional is carefully verified for safety and confidence.",
    icon: "/images/icon-seal-check.png",
  },
  {
    title: "Real Reviews",
    body: "Honest feedback from people like you helps you make the right choice.",
    icon: "/images/icon-users-three.png",
  },
  {
    title: "Safe & Secure",
    body: "Your data and privacy are protected at every step of your journey.",
    icon: "/images/icon-shield.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-[120px] flex items-start gap-[126px]">
      {/* Left heading */}
      <div className="shrink-0 w-[306px] flex flex-col gap-4">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BUILT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
          Your Well-Being is our top Priority
        </h2>
      </div>

      {/* Cards */}
      <div className="flex gap-4 flex-1">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[24px] flex-1 min-w-0 h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-end"
          >
            <div className="flex flex-col gap-3 w-full">
              <p className="text-black text-xl font-medium leading-6 capitalize">{f.title}</p>
              <p className="text-[#494947] text-base font-normal leading-6">{f.body}</p>
            </div>
            <div className="bg-[#013D47] w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
              <img src={f.icon} alt="" className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/FeaturesSection.tsx
git commit -m "feat: add FeaturesSection with 3 trust cards"
```

---

## Task 5: Health Areas Section

**Files:**
- Create: `app/components/sections/HealthAreasSection.tsx`

- [ ] **Step 1: Create HealthAreasSection.tsx**

```tsx
// app/components/sections/HealthAreasSection.tsx
const areas = [
  { title: "Anxiety & Stress", img: "/images/area-anxiety.png" },
  { title: "Physical Recovery", img: "/images/area-physical.png" },
  { title: "Sleep Problems", img: "/images/area-sleep.png" },
  { title: "Nutrition & Lifestyle", img: "/images/area-nutrition.png" },
  { title: "Burnout", img: "/images/area-burnout.png" },
  { title: "Relationship Problems", img: "/images/area-relationship.png" },
];

export default function HealthAreasSection() {
  return (
    <section className="bg-[#013D47] w-full px-20 py-14 flex flex-col gap-12 relative overflow-hidden">
      {/* Header row */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            SUPPORT FOR EVERY NEED
          </p>
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize w-[445px]">
            Health &amp; Wellness Popular Support Areas
          </h2>
        </div>
        <p className="text-white/80 text-lg font-normal leading-7 w-[494px]">
          Whether you&apos;re dealing with stress, physical pain, burnout, or simply
          looking to improve your well-being — Rezolvus helps you find the right
          support faster.
        </p>
      </div>

      {/* Cards row */}
      <div className="flex gap-4 w-full">
        {areas.map((area) => (
          <div
            key={area.title}
            className="bg-[#EDECEC] rounded-[24px] flex-1 min-w-0 h-[209px] pl-6 pr-4 py-4 flex items-start justify-between overflow-hidden relative"
          >
            <p className="text-black text-xl font-medium leading-6 capitalize flex-1 pr-4">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.png" alt="" className="w-6 h-6 shrink-0" />
            {/* Decorative illustration */}
            <img
              src={area.img}
              alt=""
              className="absolute bottom-0 right-0 w-[155px] pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/HealthAreasSection.tsx
git commit -m "feat: add HealthAreasSection with 6 area cards on dark teal bg"
```

---

## Task 6: How It Works Section

**Files:**
- Create: `app/components/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Create HowItWorksSection.tsx**

```tsx
// app/components/sections/HowItWorksSection.tsx
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    body: "Share how you feel and what kind of support you're looking for.",
  },
  {
    num: "02",
    title: "Explore specialists",
    body: "Browse verified professionals matched to your needs.",
  },
  {
    num: "03",
    title: "Choose the right fit",
    body: "Compare profiles, reviews, and expertise to find your perfect match.",
  },
  {
    num: "04",
    title: "Book your session",
    body: "Pick a time that works for you and book instantly online or in-person.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-20 pt-40 pb-0 flex items-center gap-4">
      {/* Left — image card */}
      <div className="relative w-[633px] h-[556px] rounded-[32px] overflow-hidden shrink-0">
        <Image
          src="/images/how-it-works-photo.jpg"
          alt="Your path to wellness"
          fill
          className="object-cover"
        />
        {/* Bottom gradient overlay */}
        <Image
          src="/images/how-it-works-overlay.png"
          alt=""
          fill
          className="object-cover"
        />
        {/* Decorative wave 1 */}
        <img
          src="/images/how-it-works-wave1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Decorative wave 2 */}
        <img
          src="/images/how-it-works-wave2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Star character bottom-left */}
        <img
          src="/images/how-it-works-star.png"
          alt=""
          className="absolute bottom-14 left-[-12px] w-[104px] pointer-events-none"
        />
        {/* Creature top-right */}
        <img
          src="/images/how-it-works-creature.png"
          alt=""
          className="absolute top-3 right-[-12px] w-[104px] pointer-events-none"
        />
        {/* Text overlay */}
        <div className="absolute top-6 left-8">
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Your Path <br />to Wellness
          </h2>
        </div>
        <p className="absolute bottom-[28px] left-8 text-white text-xs font-semibold uppercase leading-6">
          HOW IT WORKS
        </p>
      </div>

      {/* Right — steps */}
      <div className="flex-1 h-[556px] flex flex-col justify-between pl-16 py-16">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-8">
            <span className="text-[#67CDCD] text-[72px] font-semibold leading-[69px] tracking-[-2.16px] w-[90px] shrink-0">
              {step.num}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[#0D0D0D] text-xl font-medium leading-6 capitalize">
                {step.title}
              </p>
              <p className="text-[#494947] text-base font-normal leading-6">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/HowItWorksSection.tsx
git commit -m "feat: add HowItWorksSection with image card and 4 steps"
```

---

## Task 7: Ticker Section

**Files:**
- Create: `app/components/sections/TickerSection.tsx`

- [ ] **Step 1: Create TickerSection.tsx**

The ticker uses a CSS animation (`marquee` keyframe defined in globals.css). Content is duplicated to create a seamless loop.

```tsx
// app/components/sections/TickerSection.tsx
const items = ["Nutritionist", "Psychologist", "Therapist", "Wellness Coach", "Physiotherapist"];

export default function TickerSection() {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-20">
      <div className="bg-[#67CDCD] rounded-[24px] h-[127px] overflow-hidden relative flex items-center">
        {/* Edge fade masks */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #67CDCD 0%, transparent 15%, transparent 85%, #67CDCD 100%)",
          }}
        />
        {/* Scrolling track */}
        <div
          className="flex items-center gap-[68px] whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-[68px] shrink-0">
              <span className="text-white text-[52px] font-medium leading-[74px]">{item}</span>
              <img src="/images/ticker-dot.png" alt="" className="w-2.5 h-2.5 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/TickerSection.tsx
git commit -m "feat: add TickerSection with CSS marquee animation"
```

---

## Task 8: Specialists Section

**Files:**
- Create: `app/components/sections/SpecialistsSection.tsx`

- [ ] **Step 1: Create SpecialistsSection.tsx**

```tsx
// app/components/sections/SpecialistsSection.tsx
import Image from "next/image";

const specialists = [
  {
    name: "Dr. Emma Williams",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person"],
    photo: "/images/specialist-1.jpg",
  },
  {
    name: "Maureen Schimmel-Torp",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person"],
    photo: "/images/specialist-2.jpg",
  },
  {
    name: "Stephanie Morar",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["In person", "Online"],
    photo: "/images/specialist-3.jpg",
  },
  {
    name: "Lamar Mohr",
    role: "Psychologist",
    specialty: "Physiotherapist",
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique.",
    rating: "4.9",
    reviews: "1.2K reviews",
    tags: ["Online"],
    photo: "/images/specialist-4.jpg",
  },
];

const tagIcon: Record<string, string> = {
  "In person": "/images/icon-armchair.png",
  Online: "/images/icon-laptop.png",
};

export default function SpecialistsSection() {
  return (
    <section className="bg-[#013D47] w-full px-20 py-[120px] flex flex-col gap-12 relative">
      {/* Decorative heart */}
      <img
        src="/images/spec-heart.png"
        alt=""
        className="absolute top-[76px] right-[217px] w-[217px] pointer-events-none"
      />

      {/* Header */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            EXPERTS YOU CAN TRUST
          </p>
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Top Rated Specialists
          </h2>
        </div>
        <button className="border border-white rounded-full h-10 px-6 pr-4 flex items-center gap-2 text-white text-base font-medium leading-6 hover:bg-white/10 transition-colors">
          <img src="/images/icon-arrow-right.png" alt="" className="w-5 h-5" />
          View All
          <img src="/images/icon-arrow-right.png" alt="" className="w-5 h-5" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
        {specialists.map((s) => (
          <div
            key={s.name}
            className="bg-white rounded-[24px] p-2 flex flex-col gap-4 shrink-0 w-[308px]"
          >
            {/* Photo */}
            <div className="relative h-[290px] rounded-[16px] overflow-hidden">
              <Image src={s.photo} alt={s.name} fill className="object-cover" />
              {/* Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white rounded-full px-3 py-1 text-sm font-normal leading-5 text-black flex items-center gap-2"
                  >
                    <img src={tagIcon[tag]} alt="" className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 px-3 pb-2">
              <div className="flex flex-col gap-1">
                <p className="text-black text-xl font-medium leading-6 capitalize">{s.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[rgba(13,13,13,0.65)] text-xs font-normal leading-5">
                    {s.role}
                  </span>
                  <img src="/images/icon-dot.png" alt="" className="w-1 h-1" />
                  <span className="text-[rgba(13,13,13,0.65)] text-xs font-normal leading-5">
                    {s.specialty}
                  </span>
                </div>
              </div>
              <p className="text-[rgba(13,13,13,0.7)] text-sm font-normal leading-5 line-clamp-3">
                {s.bio}
              </p>
              <div className="flex items-center gap-2">
                <img src="/images/icon-star.png" alt="" className="w-5 h-5" />
                <div className="flex gap-1 text-base leading-6">
                  <span className="text-[#0D0D0D] font-medium">{s.rating}</span>
                  <span className="text-[rgba(13,13,13,0.35)] font-normal">
                    ({s.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="px-2 pb-2">
              <button className="w-full border border-[#FB652B] rounded-full h-10 text-[#FB652B] text-base font-medium leading-6 hover:bg-[#FB652B]/10 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar + navigation */}
      <div className="flex items-center gap-8 w-full">
        <div className="flex-1 h-2 bg-white/10 rounded-full relative">
          <div className="absolute left-0 top-0 h-full w-[206px] bg-white rounded-full" />
        </div>
        <div className="flex gap-3 shrink-0">
          {/* Prev */}
          <button className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <img
              src="/images/icon-arrow-right.png"
              alt="Previous"
              className="w-5 h-5 rotate-180"
            />
          </button>
          {/* Next */}
          <button className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <img src="/images/icon-arrow-right.png" alt="Next" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/SpecialistsSection.tsx
git commit -m "feat: add SpecialistsSection with 4 specialist cards"
```

---

## Task 9: Testimonials Section

**Files:**
- Create: `app/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Create TestimonialsSection.tsx**

```tsx
// app/components/sections/TestimonialsSection.tsx
const review =
  "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.";

const testimonials = Array.from({ length: 11 }, (_, i) => ({
  name: "Dr. Emma Williams",
  rating: "5.0",
  review,
  id: i,
}));

function TestimonialCard({ name, rating, review }: { name: string; rating: string; review: string }) {
  return (
    <div className="bg-white rounded-[24px] p-5 flex flex-col gap-3 shrink-0 w-[308px]">
      <div className="flex gap-3 items-center">
        <img
          src="/images/testimonial-avatar.png"
          alt={name}
          className="w-14 h-14 rounded-full shrink-0"
        />
        <div className="flex flex-col gap-1">
          <p className="text-black text-xl font-medium leading-6 capitalize">{name}</p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src="/images/icon-star-small.png" alt="" className="w-4 h-4" />
              ))}
            </div>
            <span className="text-[#0D0D0D] text-sm font-normal leading-5">{rating}</span>
          </div>
        </div>
      </div>
      <p className="text-[#494947] text-sm font-normal leading-5 line-clamp-4">{review}</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5, 11);

  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-[120px] flex flex-col gap-12 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Real People, Real Result
          </h2>
        </div>
        <p className="text-[#494947] text-lg font-normal leading-7 w-[278px]">
          See how Rezolvus helps others, and find out what it can do for you
        </p>
      </div>

      {/* Card rows */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 justify-center flex-wrap">
          {row1.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
        <div className="flex gap-6 justify-center flex-wrap">
          {row2.map((t) => (
            <TestimonialCard key={t.id} name={t.name} rating={t.rating} review={t.review} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/TestimonialsSection.tsx
git commit -m "feat: add TestimonialsSection with two rows of cards"
```

---

## Task 10: CTA Section

**Files:**
- Create: `app/components/sections/CTASection.tsx`

- [ ] **Step 1: Create CTASection.tsx**

```tsx
// app/components/sections/CTASection.tsx
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-40 flex items-center justify-center relative">
      {/* Background sunset card */}
      <div className="relative w-full h-[524px] rounded-[40px] overflow-hidden">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Decorative heart character */}
      <img
        src="/images/cta-heart.png"
        alt=""
        className="absolute left-[calc(50%-450px)] top-[196px] w-[130px] pointer-events-none z-10"
      />

      {/* Decorative teal creature */}
      <img
        src="/images/cta-star.png"
        alt=""
        className="absolute right-[calc(50%-490px)] bottom-[200px] w-[130px] pointer-events-none z-10"
      />

      {/* Centered glass card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-[32px] px-14 py-8 flex flex-col gap-12 items-center max-w-[650px] w-full mx-20">
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
              Ready to take the first step?
            </h2>
            <p className="text-[rgba(13,13,13,0.8)] text-lg font-normal leading-7 max-w-[437px]">
              Find the right support for your mental and physical health today.
              We&apos;re here to help you feel better!
            </p>
          </div>
          <button className="bg-[#FB652B] rounded-full h-14 px-8 flex items-center justify-center text-white text-base font-medium leading-6 hover:bg-[#e85520] transition-colors">
            Find My Specialist
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/CTASection.tsx
git commit -m "feat: add CTASection with photo card and glass panel"
```

---

## Task 11: Footer

**Files:**
- Create: `app/components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
// app/components/sections/Footer.tsx
const navCols = [
  {
    heading: "Platform",
    links: ["Find Specialists", "How It Works", "For Specialists", "Reviews", "Pricing"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Blog", "Press", "Partners"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#013D47] w-full flex flex-col gap-16 pb-10 pt-16 px-20">
      {/* Top row */}
      <div className="flex gap-[120px] items-start">
        {/* Brand blurb */}
        <div className="flex flex-col gap-3 shrink-0">
          <p className="text-white text-2xl font-medium leading-[39px]">Rezolvus</p>
          <p className="text-white/80 text-base font-normal leading-7 max-w-[494px]">
            Discover verified psychologists, physiotherapists, wellness specialists,
            and more — all in one modern platform designed around trust and simplicity.
          </p>
        </div>

        {/* Nav columns */}
        <div className="flex flex-1 justify-between">
          {navCols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <p className="text-white text-2xl font-medium leading-[39px]">{col.heading}</p>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 text-base font-normal leading-7 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Logo + copyright */}
      <div className="flex flex-col gap-8">
        <div className="relative w-full" style={{ aspectRatio: "115/26" }}>
          <img
            src="/images/logo-footer.png"
            alt="Rezolvus"
            className="w-full h-full object-contain object-left"
          />
        </div>
        <div className="flex items-center justify-between text-white/80 text-base font-normal leading-7">
          <span>© 2026 Rezolvus. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/sections/Footer.tsx
git commit -m "feat: add Footer with nav columns and large Rezolvus logo"
```

---

## Task 12: Assemble page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
// app/page.tsx
import Hero from "./components/sections/Hero";
import FeaturesSection from "./components/sections/FeaturesSection";
import HealthAreasSection from "./components/sections/HealthAreasSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import TickerSection from "./components/sections/TickerSection";
import SpecialistsSection from "./components/sections/SpecialistsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <HealthAreasSection />
      <HowItWorksSection />
      <TickerSection />
      <SpecialistsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage from all section components"
```

---

## Task 13: Verify & Fix

**Files:** All components (read-only verify pass)

- [ ] **Step 1: Run type check**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npx tsc --noEmit 2>&1
```
Expected: No errors.

- [ ] **Step 2: Run production build**

```bash
npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully`. Fix any errors before continuing.

- [ ] **Step 3: Start dev server**

```bash
npm run dev
```
Open http://localhost:3000. Verify the page loads without console errors.

- [ ] **Step 4: Visual comparison — Hero**

Take a screenshot of the Hero and compare to Figma node 1:335. Check:
- Background photo fills full width and height (780px)
- Nav positioned at top with correct pill shape
- H1 text is white, large, centered
- Search bar has 3 dropdowns and orange CTA button
- Rating strip with 3 overlapping avatars, stars, score

- [ ] **Step 5: Visual comparison — Sections**

Scroll through each section and verify:
- Background colors match (`#F6F6F5` vs `#013D47` alternating)
- Card border-radii are correct (24px)
- Typography sizes and weights look right
- Images are loading from public/images/
- Ticker has scrolling animation

- [ ] **Step 6: Fix any layout issues**

Common issues to check:
- `overflow-x-auto` on specialist cards not cutting off vertically
- Decorative images not clipping outside their parent containers
- Ticker content needs enough duplication for seamless loop (if gap appears, add a third copy)

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete Rezolvus homepage implementation"
```

---

## Post-Implementation Notes

1. **Font files:** Place `TomatoGrotesk-Regular.woff2`, `TomatoGrotesk-Medium.woff2`, `TomatoGrotesk-SemiBold.woff2` in `public/fonts/` to activate the brand font. Currently renders with Inter fallback.

2. **Image refresh:** Figma URLs expire 2026-06-17. If expired before download, re-export from Figma node 1:334.

3. **Not implemented (by design):**
   - Mobile responsive layout (Figma only has desktop 1440px)
   - Functional search/dropdown behavior
   - Specialist card carousel interactivity (prev/next)
   - Real footer link targets

4. **next/image domains:** All images are served from `public/` — no external domain config needed.
