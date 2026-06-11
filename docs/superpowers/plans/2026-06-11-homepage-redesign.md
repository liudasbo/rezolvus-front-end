# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Rezolvus Homepage (`/`) to match the new Figma design (node `44-4512`), reflecting a content shift from general wellness to rehabilitation, physiotherapy, speech therapy, and child development.

**Architecture:** Update six existing section components, create one new `AgeSection` component, and download ~23 new Figma assets. All changes are isolated to `app/components/sections/` and `public/images/`. The `/find-specialists` page and shared `Header` are untouched.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` — no config file), `next/image` for raster photos, plain `<img>` for SVG decoratives.

---

## File Map

| File | Action | Summary |
|---|---|---|
| `public/images/*.jpg/svg/png` | Create/Replace | ~23 new assets from Figma |
| `app/components/sections/Hero.tsx` | Modify | Subtitle text only |
| `app/components/sections/FeaturesSection.tsx` | Modify (major) | New layout + 4 cards + center photo |
| `app/components/sections/HealthAreasSection.tsx` | Modify | New categories + "Not sure" banner |
| `app/components/sections/HowItWorksSection.tsx` | Modify | New photo + text updates |
| `app/components/sections/AgeSection.tsx` | Create | New "Support for every Age" section |
| `app/components/sections/CTASection.tsx` | Modify | Text + decoratives update |
| `app/page.tsx` | Modify | Add `<AgeSection />` |

---

## Task 1: Download all Figma assets

**Files:**
- Create: `public/images/features-center-photo.jpg`
- Create: `public/images/features-wave.png`
- Create: `public/images/features-wave-bottom.png`
- Create: `public/images/icon-calendar-heart.svg`
- Create: `public/images/area-speech.svg`
- Create: `public/images/area-occupational.svg`
- Create: `public/images/area-physiotherapy.svg`
- Create: `public/images/area-wellness.svg`
- Create: `public/images/area-child.svg`
- Create: `public/images/area-sports.svg`
- Create: `public/images/not-sure-ellipse.png`
- Create: `public/images/not-sure-wave.png`
- Replace: `public/images/how-it-works-photo.jpg`
- Create: `public/images/how-it-works-overlay-2.png`
- Replace: `public/images/how-it-works-wave1.svg`
- Replace: `public/images/how-it-works-wave2.svg`
- Replace: `public/images/how-it-works-creature.svg`
- Create: `public/images/how-it-works-star-2.svg`
- Create: `public/images/age-adults-left.svg`
- Create: `public/images/age-adults-right.svg`
- Create: `public/images/age-kids-main.svg`
- Create: `public/images/age-kids-extra-1.svg`
- Create: `public/images/age-kids-extra-2.svg`
- Create: `public/images/age-kids-extra-3.svg`
- Create: `public/images/age-kids-extra-4.svg`
- Create: `public/images/age-kids-extra-5.svg`
- Replace: `public/images/cta-bg.jpg`
- Create: `public/images/cta-creature-left.svg`
- Create: `public/images/cta-creature-right.svg`

- [ ] **Step 1: Download all assets with curl**

> ⚠️ Figma asset URLs expire in 7 days (by 2026-06-18). Run these NOW.

```bash
cd /Users/liudas/Desktop/Rezolvus\ BENDRAS/rezolvus/public/images

# FeaturesSection
curl -s -o features-center-photo.jpg "https://www.figma.com/api/mcp/asset/ac3df393-736e-4cbf-b82d-328c1f5b5992"
curl -s -o features-wave.png "https://www.figma.com/api/mcp/asset/fa92d348-ba58-4828-ba5b-589371fcb442"
curl -s -o features-wave-bottom.png "https://www.figma.com/api/mcp/asset/6f4c0145-59f7-4f98-9c50-d7cf8915e548"

# Feature card icons (new)
curl -s -o icon-calendar-heart.svg "https://www.figma.com/api/mcp/asset/2b4f703c-42ab-48f1-b08c-c46c4ce317cf"

# Health area illustrations (new categories)
curl -s -o area-speech.svg "https://www.figma.com/api/mcp/asset/4f17940c-b4a7-4ea0-9f62-c4331e1bc216"
curl -s -o area-occupational.svg "https://www.figma.com/api/mcp/asset/4a1199f3-c473-40de-8b71-3e08635d1f99"
curl -s -o area-physiotherapy.svg "https://www.figma.com/api/mcp/asset/4d5c22ea-7013-45c4-88f7-82b8a9774a90"
curl -s -o area-wellness.svg "https://www.figma.com/api/mcp/asset/ff1eb91b-3b87-4bf8-8065-3c820b86fed4"
curl -s -o area-child.svg "https://www.figma.com/api/mcp/asset/0ddb8235-e409-4e14-beae-67a4fb34f257"
curl -s -o area-sports.svg "https://www.figma.com/api/mcp/asset/5fef1bcf-aad6-44ad-a06c-9fdb38ded01f"

# "Not sure" banner background decoratives
curl -s -o not-sure-ellipse.png "https://www.figma.com/api/mcp/asset/ecaeb130-1baa-4e04-8ffa-f5ad7171d0c6"
curl -s -o not-sure-wave.png "https://www.figma.com/api/mcp/asset/9aa92196-0261-4ad1-916a-444c0b1e7505"

# HowItWorksSection (replace existing)
curl -s -o how-it-works-photo.jpg "https://www.figma.com/api/mcp/asset/0c7828b5-c6b8-4fbe-824c-80d0aa4ddbc1"
curl -s -o how-it-works-overlay-2.png "https://www.figma.com/api/mcp/asset/28f031b5-2773-4f67-a62a-dcfc0a95cfb6"
curl -s -o how-it-works-wave1.svg "https://www.figma.com/api/mcp/asset/1375262b-20eb-44de-bad3-56d98242570b"
curl -s -o how-it-works-wave2.svg "https://www.figma.com/api/mcp/asset/526fd05d-cf96-4c85-9b58-7f8fe78a02a3"
curl -s -o how-it-works-creature.svg "https://www.figma.com/api/mcp/asset/b5b1c927-3568-4ce4-9801-e46d904f4ff2"
curl -s -o how-it-works-star-2.svg "https://www.figma.com/api/mcp/asset/f3730e14-5b51-4ce9-aef0-1bd23568648b"

# AgeSection illustrations
curl -s -o age-adults-left.svg "https://www.figma.com/api/mcp/asset/ab481deb-0cf6-414f-be6e-d45ab9c27415"
curl -s -o age-adults-right.svg "https://www.figma.com/api/mcp/asset/b35e176d-53cd-4519-99a1-6f830d9940e9"
curl -s -o age-kids-main.svg "https://www.figma.com/api/mcp/asset/5ce9d39b-774e-4ca3-bb4e-698b903dbbf2"
curl -s -o age-kids-extra-1.svg "https://www.figma.com/api/mcp/asset/bc3c74bf-4c09-466a-9465-5e6a1681a90b"
curl -s -o age-kids-extra-2.svg "https://www.figma.com/api/mcp/asset/bd8bad2f-3f5c-42b3-b46f-27975fa194b3"
curl -s -o age-kids-extra-3.svg "https://www.figma.com/api/mcp/asset/dbc7deff-8ad9-48bb-b651-10f4279e3e75"
curl -s -o age-kids-extra-4.svg "https://www.figma.com/api/mcp/asset/aef5130f-ae81-41e1-961a-68fc27615a98"
curl -s -o age-kids-extra-5.svg "https://www.figma.com/api/mcp/asset/4bbca090-1a4f-49f1-b869-c7ec888a0bc7"

# CTASection (replace existing)
curl -s -o cta-bg.jpg "https://www.figma.com/api/mcp/asset/82a6f719-eb6f-436b-8587-8fcdc2228b34"
curl -s -o cta-creature-left.svg "https://www.figma.com/api/mcp/asset/d9df8bd3-b2d3-4093-a9be-6df491a8f19c"
curl -s -o cta-creature-right.svg "https://www.figma.com/api/mcp/asset/1c98ef0c-3e9a-489a-9c30-8a4e9b016564"

echo "All assets downloaded."
```

- [ ] **Step 2: Verify all files downloaded with non-zero size**

```bash
cd /Users/liudas/Desktop/Rezolvus\ BENDRAS/rezolvus/public/images
ls -lh features-center-photo.jpg features-wave.png icon-calendar-heart.svg \
        area-speech.svg area-occupational.svg how-it-works-photo.jpg \
        age-adults-left.svg age-kids-main.svg cta-bg.jpg cta-creature-left.svg
```

Expected: all files listed with size > 0 bytes. If any show 0 bytes or "No such file", re-run the corresponding curl command.

- [ ] **Step 3: Commit assets**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add public/images/
git commit -m "$(cat <<'EOF'
feat: add new Figma assets for homepage redesign

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Update Hero subtitle

**Files:**
- Modify: `app/components/sections/Hero.tsx:93`

- [ ] **Step 1: Update the subtitle paragraph in Hero.tsx**

In `Hero.tsx`, find the `<p>` tag with the subtitle text (around line 93) and replace:

```tsx
// OLD
<p className="text-white font-normal leading-6 lg:leading-[27px] text-sm sm:text-base lg:text-lg max-w-[300px] sm:max-w-[460px] lg:max-w-[601px]">
  Discover verified psychologists, physiotherapists, wellness specialists,
  and more — all in one modern platform designed around trust and simplicity.
</p>
```

```tsx
// NEW
<p className="text-white font-normal leading-6 lg:leading-[27px] text-sm sm:text-base lg:text-lg max-w-[300px] sm:max-w-[460px] lg:max-w-[601px]">
  Connect with trusted speech therapists, physiotherapists, occupational
  specialists, rehabilitation experts, and wellness professionals for
  children and adults.
</p>
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run dev
```

Open http://localhost:3000 — confirm new subtitle text appears in hero.

- [ ] **Step 3: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/Hero.tsx
git commit -m "$(cat <<'EOF'
feat: update hero subtitle text for rehabilitation focus

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Restructure FeaturesSection

**Files:**
- Modify: `app/components/sections/FeaturesSection.tsx` (full rewrite of this file)

New layout: centered heading + 3-column row `[2 stacked cards | center photo | 2 stacked cards]`. The center photo is hidden on non-xl screens; all 4 cards always visible.

- [ ] **Step 1: Replace FeaturesSection.tsx with new implementation**

```tsx
import Image from "next/image";

type FeatureCard = {
  title: string;
  body: string;
  icon: string;
};

const leftCards: FeatureCard[] = [
  {
    title: "Verified specialists",
    body: "Only certified healthcare and wellness professionals.",
    icon: "/images/icon-seal-check.svg",
  },
  {
    title: "Rehabilitation & Recovery",
    body: "Support for movement, recovery, posture, and pain relief.",
    icon: "/images/icon-users-three.svg",
  },
];

const rightCards: FeatureCard[] = [
  {
    title: "Adult & Child Support",
    body: "Specialists for children, teenagers, and adults.",
    icon: "/images/icon-calendar-heart.svg",
  },
  {
    title: "Safe & secure",
    body: "Your data and privacy are protected at every step of your journey.",
    icon: "/images/icon-shield.svg",
  },
];

function FeatureCard({ title, body, icon }: FeatureCard) {
  return (
    <div className="bg-white rounded-[24px] h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-start">
      <div className="bg-[#013D47] w-[72px] h-[72px] rounded-[12px] flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-10 h-10" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-black text-xl font-medium leading-6 capitalize">{title}</p>
        <p className="text-[#494947] text-base font-normal leading-6">{body}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-20 xl:py-[120px] flex flex-col gap-10 xl:gap-12 items-center">
      {/* Centered heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BULIT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[32px] sm:text-[36px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
          Your Well-being is our top Priority
        </h2>
      </div>

      {/* 3-column row */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-stretch">
        {/* Left column: 2 stacked cards */}
        <div className="flex-1 flex flex-col sm:flex-row xl:flex-col gap-4 min-w-0">
          {leftCards.map((c) => (
            <div key={c.title} className="flex-1 xl:flex-none">
              <FeatureCard {...c} />
            </div>
          ))}
        </div>

        {/* Center photo — xl only */}
        <div className="hidden xl:block relative w-[416px] h-[544px] rounded-[24px] overflow-hidden shrink-0">
          <Image
            src="/images/features-center-photo.jpg"
            alt=""
            fill
            className="object-cover rounded-[24px]"
          />
          <img
            src="/images/features-wave.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <img
            src="/images/features-wave-bottom.png"
            alt=""
            className="absolute bottom-0 left-0 w-full pointer-events-none"
          />
        </div>

        {/* Right column: 2 stacked cards */}
        <div className="flex-1 flex flex-col sm:flex-row xl:flex-col gap-4 min-w-0">
          {rightCards.map((c) => (
            <div key={c.title} className="flex-1 xl:flex-none">
              <FeatureCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check in browser**

With dev server running at http://localhost:3000:
- At 1440px: confirm 3-column layout with center photo flanked by 2 card columns
- At 1024px: center photo hidden; 4 cards in 2×2 grid
- At 430px: 4 cards stacked vertically

- [ ] **Step 3: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/FeaturesSection.tsx
git commit -m "$(cat <<'EOF'
feat: restructure FeaturesSection to 3-column layout with center photo

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Update HealthAreasSection

**Files:**
- Modify: `app/components/sections/HealthAreasSection.tsx` (full rewrite)

Changes: new title/subtitle, 6 new categories with new illustrations, card title font size 24px, first card white bg, add "Not sure who's right for you?" banner.

- [ ] **Step 1: Replace HealthAreasSection.tsx**

```tsx
import React from "react";
import Link from "next/link";

type Area = {
  title: string;
  img: string;
  imgStyle: React.CSSProperties;
  bg?: string;
};

const areas: Area[] = [
  {
    title: "Speech & Language Therapy",
    img: "/images/area-speech.svg",
    imgStyle: { position: "absolute", bottom: "-7px", right: "16px", width: "150px", height: "119px" },
    bg: "bg-white",
  },
  {
    title: "Occupational & Educational Support",
    img: "/images/area-occupational.svg",
    imgStyle: { position: "absolute", left: "246px", top: "99px", width: "154px", height: "120px" },
  },
  {
    title: "Physiotherapy & Rehabilitation",
    img: "/images/area-physiotherapy.svg",
    imgStyle: { position: "absolute", bottom: 0, right: "16px", width: "186px", height: "120px" },
  },
  {
    title: "Physical Wellness & Recovery",
    img: "/images/area-wellness.svg",
    imgStyle: { position: "absolute", bottom: 0, left: "56px", width: "184px", height: "100px" },
  },
  {
    title: "Child Development Support",
    img: "/images/area-child.svg",
    imgStyle: { position: "absolute", left: "269px", top: "97px", width: "130px", height: "120px" },
  },
  {
    title: "Sports & Injury Recovery",
    img: "/images/area-sports.svg",
    imgStyle: { position: "absolute", bottom: 0, right: "16px", width: "155px", height: "122px" },
  },
];

export default function HealthAreasSection() {
  return (
    <section className="bg-[#013D47] w-full px-5 sm:px-10 xl:px-20 py-10 lg:py-14 xl:py-[56px] flex flex-col gap-8 lg:gap-12 relative overflow-hidden">
      {/* Background decorative wave */}
      <img
        src="/images/health-areas-wave.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1686px", height: "582px", top: "65px", left: "calc(50% - 843px)" }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full relative gap-4 md:gap-8">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            SUPPORT FOR EVERY NEED
          </p>
          <h2 className="text-white text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize max-w-[445px]">
            Explore Popular Specialist Categories
          </h2>
        </div>
        <p className="text-white/80 text-base lg:text-lg font-normal leading-7 max-w-full md:max-w-[400px] xl:max-w-[494px]">
          Find trusted specialists for speech development, rehabilitation,
          movement, recovery, and long-term wellbeing.
        </p>
      </div>

      {/* 6 area cards — 2 rows × 3 cols */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full relative">
        {areas.map((area) => (
          <div
            key={area.title}
            className={`${area.bg ?? "bg-[#EDECEC]"} rounded-[24px] h-[150px] sm:h-[170px] lg:h-[209px] pl-4 lg:pl-6 pr-4 py-4 flex items-start justify-between overflow-hidden relative hover:opacity-90 transition-opacity cursor-pointer`}
          >
            <p className="text-black text-base sm:text-lg lg:text-[24px] font-medium lg:leading-8 capitalize flex-1 pr-2">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
            <img
              src={area.img}
              alt=""
              className="pointer-events-none"
              style={area.imgStyle}
            />
          </div>
        ))}
      </div>

      {/* "Not sure who's right for you?" banner */}
      <div className="relative overflow-hidden bg-white rounded-[24px] lg:rounded-[32px] px-6 sm:px-10 lg:px-16 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        {/* Background decoratives */}
        <img
          src="/images/not-sure-ellipse.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
        />
        <img
          src="/images/not-sure-wave.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Text */}
        <div className="flex flex-col gap-3 lg:gap-4 relative z-10 max-w-[570px]">
          <h2 className="text-black text-[24px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
            Not sure who&apos;s right for you?
          </h2>
          <p className="text-[#494947] text-base lg:text-lg font-normal leading-6 lg:leading-7">
            Answer a few simple questions and let Rezolvus match you with the
            right specialists for your needs
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/find-specialists"
          className="bg-[#FB652B] rounded-full h-12 lg:h-14 px-6 lg:px-8 flex items-center justify-center text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 shrink-0 relative z-10"
        >
          Get Matched
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

At http://localhost:3000:
- Confirm 6 new category names (Speech, Occupational, Physiotherapy, Physical Wellness, Child Development, Sports)
- First card is white, rest are `#EDECEC`
- "Not sure" white banner visible at bottom with "Get Matched" button
- "Get Matched" navigates to `/find-specialists`

- [ ] **Step 3: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/HealthAreasSection.tsx
git commit -m "$(cat <<'EOF'
feat: update health areas categories and add get-matched banner

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Update HowItWorksSection

**Files:**
- Modify: `app/components/sections/HowItWorksSection.tsx` (full rewrite)

Changes: new photo + overlay, updated photo card heading, updated step texts, layout gap adjustments.

- [ ] **Step 1: Replace HowItWorksSection.tsx**

```tsx
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Tell us what support you need",
    body: "Speech therapy, rehabilitation, physiotherapy, educational support, or wellness services.",
  },
  {
    num: "02",
    title: "Explore verified specialists",
    body: "Compare experience, specializations, languages, and availability.",
  },
  {
    num: "03",
    title: "Choose the right fit",
    body: "Book online or in-person sessions with trusted professionals.",
  },
  {
    num: "04",
    title: "Begin your recovery or development journey",
    body: "Receive personalized support for yourself, your child, or your family.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 pt-16 md:pt-24 xl:pt-[160px] pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
      {/* Photo card */}
      <div className="relative w-full lg:w-[524px] lg:shrink-0 h-[280px] sm:h-[380px] lg:h-[556px] rounded-[32px] overflow-hidden">
        <Image
          src="/images/how-it-works-photo.jpg"
          alt="Your path to wellness"
          fill
          className="object-cover"
        />
        <Image
          src="/images/how-it-works-overlay-2.png"
          alt=""
          fill
          className="object-cover"
        />
        <img
          src="/images/how-it-works-wave1.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <img
          src="/images/how-it-works-wave2.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Bottom-left star creature */}
        <img
          src="/images/how-it-works-star-2.svg"
          alt=""
          className="absolute bottom-14 -left-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        {/* Top-right blob creature */}
        <img
          src="/images/how-it-works-creature.svg"
          alt=""
          className="absolute top-3 -right-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        {/* Photo heading */}
        <div className="absolute top-6 left-6 lg:left-8 z-10">
          <h2 className="text-white text-[22px] sm:text-[28px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize max-w-[260px] xl:max-w-none">
            Your Path <br />
            to rehabilitation, <br />
            development, &amp; wellbeing.
          </h2>
        </div>
        <p className="absolute bottom-7 left-6 lg:left-8 z-10 text-white text-xs font-semibold uppercase leading-6">
          HOW IT WORKS
        </p>
      </div>

      {/* Steps */}
      <div className="w-full lg:flex-1 flex flex-col gap-6 lg:gap-8 lg:pl-[64px] py-4 lg:py-[64px]">
        <p className="hidden lg:block text-[#FB652B] text-xs font-semibold leading-6 uppercase">
          HOW IT WORKS
        </p>
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-5 lg:gap-8">
            <span className="text-[#67CDCD] text-[48px] sm:text-[60px] lg:text-[72px] font-semibold leading-[1] tracking-[-2px] lg:tracking-[-2.16px] w-[64px] sm:w-[80px] lg:w-[90px] shrink-0">
              {step.num}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[#0D0D0D] text-base lg:text-xl font-medium leading-6 capitalize">
                {step.title}
              </p>
              <p className="text-[#494947] text-sm lg:text-base font-normal leading-6">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

At http://localhost:3000:
- New photo visible in HowItWorks card
- Photo heading says "Your Path to rehabilitation, development, & wellbeing."
- All 4 steps show updated text (step 04 = "Begin your recovery or development journey")

- [ ] **Step 3: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/HowItWorksSection.tsx
git commit -m "$(cat <<'EOF'
feat: update HowItWorks photo and step texts for rehabilitation focus

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create AgeSection component

**Files:**
- Create: `app/components/sections/AgeSection.tsx`

New section "Support for every Age" with two illustrated cards (Adults & Teens, Kids & Infants). Background `#E4DECE` cards on `#F6F6F5` section background.

- [ ] **Step 1: Create AgeSection.tsx**

```tsx
export default function AgeSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 pb-16 md:pb-20 xl:pb-[120px] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-4">
      {/* Heading */}
      <div className="flex flex-col gap-4 lg:w-[307px] lg:shrink-0">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BULIT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
          Support for every Age
        </h2>
      </div>

      {/* Two age cards */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
        {/* Adults & Teens card */}
        <div className="flex-1 bg-[#E4DECE] rounded-[24px] h-[280px] sm:h-[320px] xl:h-[358px] relative overflow-hidden px-8 py-6">
          <p className="text-[#013D47] text-[20px] xl:text-[24px] font-medium leading-8 relative z-10">
            Adults &amp; Teens
          </p>
          {/* Left illustration */}
          <img
            src="/images/age-adults-left.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "10px", left: "-30px", width: "220px", height: "auto" }}
          />
          {/* Right illustration */}
          <img
            src="/images/age-adults-right.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "10px", right: "-30px", width: "220px", height: "auto" }}
          />
        </div>

        {/* Kids & Infants card */}
        <div className="flex-1 bg-[#E4DECE] rounded-[24px] h-[280px] sm:h-[320px] xl:h-[358px] relative overflow-hidden px-8 py-6">
          <p className="text-[#013D47] text-[20px] xl:text-[24px] font-medium leading-8 relative z-10">
            Kids &amp; Infants
          </p>
          {/* Main illustration (face with glasses) */}
          <img
            src="/images/age-kids-main.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ left: "16px", top: "40px", width: "263px", height: "auto" }}
          />
          {/* Decorative extras */}
          <img
            src="/images/age-kids-extra-1.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "-10px", right: "100px", width: "106px" }}
          />
          <img
            src="/images/age-kids-extra-2.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ top: "40px", right: "0", width: "40px" }}
          />
          <img
            src="/images/age-kids-extra-3.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "30px", right: "70px", width: "40px" }}
          />
          <img
            src="/images/age-kids-extra-4.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "-10px", left: "76px", width: "98px" }}
          />
          <img
            src="/images/age-kids-extra-5.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "40px", right: "20px", width: "97px" }}
          />
        </div>
      </div>
    </section>
  );
}
```

> **Note on illustration positions:** The exact `top/left/right/bottom` values above are approximated from Figma percentages converted to pixel equivalents for a 469×358px card. After inserting into the page (Task 7), do a visual pass and adjust these values to match the Figma screenshot. The key visual result is: on "Adults & Teens" two creature shapes overflow from the card sides; on "Kids & Infants" a large white-circle face with glasses sits centre-left and smaller star creatures scatter around the right side.

- [ ] **Step 2: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/AgeSection.tsx
git commit -m "$(cat <<'EOF'
feat: create AgeSection component with Adults/Teens and Kids/Infants cards

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Insert AgeSection into Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add AgeSection import and usage in page.tsx**

```tsx
import Hero from "./components/sections/Hero";
import FeaturesSection from "./components/sections/FeaturesSection";
import HealthAreasSection from "./components/sections/HealthAreasSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import TickerSection from "./components/sections/TickerSection";
import AgeSection from "./components/sections/AgeSection";
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
      <AgeSection />
      <SpecialistsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Visual check**

At http://localhost:3000 scroll to the AgeSection (between TickerSection and SpecialistsSection):
- Section heading "Support for every Age" visible on left
- Two beige cards side-by-side: "Adults & Teens" and "Kids & Infants"
- Illustrations visible inside cards (even if positions need minor tuning — that's fine here)

- [ ] **Step 3: Fine-tune AgeSection illustration positions**

Open the Figma screenshot at `https://www.figma.com/design/HKVT4QYMJGDlpLpKLOCKJB/REZOLVUS-LIUDAS?node-id=44-4628` side by side with http://localhost:3000.

Adjust the `style` values in `AgeSection.tsx` until the illustrations match the Figma composition. Focus on:
- Adults & Teens: teal half-circle on left, orange flower blob on right — both overflow card edges
- Kids & Infants: large white circle face (with glasses) on left; 5 smaller creature/star shapes scattered on right

- [ ] **Step 4: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/page.tsx app/components/sections/AgeSection.tsx
git commit -m "$(cat <<'EOF'
feat: insert AgeSection between Ticker and Specialists on homepage

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Update CTASection

**Files:**
- Modify: `app/components/sections/CTASection.tsx` (full rewrite)

Changes: updated description text, new decorative assets (`cta-creature-left.svg`, `cta-creature-right.svg`), new `cta-bg.jpg`.

- [ ] **Step 1: Replace CTASection.tsx**

```tsx
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-24 xl:py-[160px] flex items-center justify-center relative">
      {/* Background photo */}
      <div className="relative w-full h-[340px] sm:h-[420px] xl:h-[524px] rounded-[24px] xl:rounded-[40px] overflow-hidden">
        <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
      </div>

      {/* Left decorative creature */}
      <img
        src="/images/cta-creature-left.svg"
        alt=""
        className="hidden xl:block absolute left-[320px] top-[196px] w-[130px] pointer-events-none z-10"
      />
      {/* Right decorative creature */}
      <img
        src="/images/cta-creature-right.svg"
        alt=""
        className="hidden xl:block absolute right-[263px] bottom-[200px] w-[160px] pointer-events-none z-10"
      />

      {/* Glass panel */}
      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 xl:px-20">
        <div className="bg-white/20 backdrop-blur-sm rounded-[24px] xl:rounded-[32px] px-6 sm:px-10 xl:px-14 py-8 xl:py-8 flex flex-col gap-6 xl:gap-12 items-center w-full max-w-[90%] sm:max-w-[560px] xl:max-w-[650px]">
          <div className="flex flex-col gap-3 xl:gap-4 items-center text-center">
            <h2 className="text-[#013D47] text-[24px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
              Ready to take the first step?
            </h2>
            <p className="text-[rgba(13,13,13,0.8)] text-sm sm:text-base xl:text-lg font-normal leading-6 xl:leading-7 max-w-[437px]">
              Explore certified specialists for rehabilitation, speech therapy,
              movement recovery, and long-term wellbeing.
            </p>
          </div>
          <Link
            href="/find-specialists"
            className="bg-[#FB652B] rounded-full h-12 xl:h-14 px-6 xl:px-8 flex items-center justify-center text-white text-base font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60"
          >
            Find My Specialist
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

At http://localhost:3000, scroll to CTA:
- New CTA background photo visible
- Description text: "Explore certified specialists for rehabilitation, speech therapy, movement recovery, and long-term wellbeing."
- New decorative creatures visible on desktop

- [ ] **Step 3: Commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git add app/components/sections/CTASection.tsx
git commit -m "$(cat <<'EOF'
feat: update CTA text and decoratives for rehabilitation focus

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: TypeScript + build check**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build
```

Expected: exits 0, no TypeScript errors, no ESLint errors.

If errors appear:
- `Type error: Property 'X' does not exist` → check imports and prop types in modified components
- `ESLint: img elements must have alt` → add `alt=""` to any `<img>` missing it
- `Module not found` → check import paths in `AgeSection.tsx` and `page.tsx`

- [ ] **Step 2: Responsive check at all breakpoints**

With `npm run dev` running, open http://localhost:3000 and resize to each width:

| Width | Expected |
|---|---|
| 1440px | 3-column FeaturesSection with center photo; 3-col health area cards; AgeSection with side-by-side cards |
| 1280px | same as 1440, slightly compressed |
| 1024px | FeaturesSection: 4 cards (no center photo); health areas: 3-col; AgeSection: 2 cards side-by-side |
| 768px | FeaturesSection: 2×2 grid; health areas: 3-col; AgeSection: 2 cards |
| 430px | FeaturesSection: stacked; health areas: 2-col; AgeSection: stacked; no horizontal overflow |
| 390px | same as 430 |
| 375px | same as 430; confirm no horizontal scroll |

At each width, also confirm: no horizontal overflow, no text clipping, mobile menu works.

- [ ] **Step 3: Check /find-specialists is unbroken**

Navigate to http://localhost:3000/find-specialists:
- Header renders correctly with active "Find Specialists" nav link
- All filters and specialist cards visible
- No console errors

- [ ] **Step 4: Final commit**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus"
git status
```

If any uncommitted files remain, stage and commit:

```bash
git add -p
git commit -m "$(cat <<'EOF'
fix: homepage redesign responsive and polish adjustments

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| Hero subtitle | Task 2 |
| FeaturesSection 3-col layout | Task 3 |
| FeaturesSection 4 cards + new texts | Task 3 |
| FeaturesSection center photo | Task 1 + Task 3 |
| HealthAreasSection title/subtitle | Task 4 |
| 6 new area categories | Task 4 |
| First area card white bg | Task 4 |
| Card title 24px | Task 4 |
| "Not sure" banner | Task 4 |
| HowItWorks new photo | Task 1 + Task 5 |
| HowItWorks photo heading | Task 5 |
| HowItWorks 4 step texts | Task 5 |
| AgeSection new component | Task 6 |
| AgeSection in page.tsx | Task 7 |
| CTA text update | Task 8 |
| CTA new decoratives | Task 1 + Task 8 |
| Assets downloaded | Task 1 |
| Build passes | Task 9 |
| /find-specialists unbroken | Task 9 |
| Footer unchanged | ✓ not modified |
| Header unchanged | ✓ not modified |
| TickerSection unchanged | ✓ not modified |

**No placeholders found.** All tasks have complete code.

**Type consistency:** `FeatureCard` type defined in Task 3 and only used in Task 3. No cross-task type dependencies.
