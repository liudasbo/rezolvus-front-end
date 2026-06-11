# Find Specialists — Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/find-specialists` pixel-perfect at 1440px (Figma) and clean/usable at 1280, 1024, 768, 430, 390, 375px — zero horizontal overflow, no layout collapse.

**Architecture:** All fixes are Tailwind responsive-class additions to existing components. No new files. Cards restructure from rigid 3-column to flex-col/flex-row breakpoint switching. Hero replaces absolute pixel positioning with centered flex layout that falls back to absolute on large screens.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4

---

## Files modified

| File | What changes |
|------|-------------|
| `app/find-specialists/page.tsx` | Responsive section padding |
| `app/components/find-specialists/FindSpecialistsHero.tsx` | Replace absolute pixel layout with responsive centered layout |
| `app/components/find-specialists/SpecialistFilters.tsx` | Filters wrap on tablet, stack on mobile |
| `app/components/find-specialists/SpecialistCard.tsx` | 3-col → 2-col → 1-col responsive card |
| `app/components/find-specialists/SpecialistList.tsx` | Responsive results header |
| `app/components/Header.tsx` | Verify/fix header pill overflow at 375px (likely minor) |

---

### Task 1: Check Figma for mobile/tablet variants

**Files:** Read-only Figma check — no code changes.

- [ ] **Step 1: Load figma-use skill**

  Invoke `figma:figma-use` skill before any Figma MCP call.

- [ ] **Step 2: Get design context for node 11-1548**

  Call `mcp__plugin_figma_figma__get_design_context` with `node_id: "11-1548"` and `file_key: "HKVT4QYMJGDlpLpKLOCKJB"`. Note any mobile/tablet frames found.

- [ ] **Step 3: Get screenshot**

  Call `mcp__plugin_figma_figma__get_screenshot` with the same node. Compare to current browser view at 1440px.

- [ ] **Step 4: Document findings**

  Note in working memory: does Figma have mobile frames? If yes, use those dimensions for mobile card/filter layout. If no, use the reasonable defaults in this plan.

---

### Task 2: Fix page.tsx section padding

**Files:**
- Modify: `app/find-specialists/page.tsx`

- [ ] **Step 1: Update padding class**

  In `app/find-specialists/page.tsx`, change the filters+results `<section>`:

  ```tsx
  // Before:
  <section className="bg-[#F6F6F5] px-20 pt-12 pb-40">

  // After:
  <section className="bg-[#F6F6F5] px-5 sm:px-8 lg:px-20 pt-12 pb-20 lg:pb-40">
  ```

- [ ] **Step 2: Verify dev server shows correct padding**

  Run `npm run dev`. At 375px width: padding should be 20px each side. At 768px: 32px. At 1440px: 80px.

- [ ] **Step 3: Commit**

  ```bash
  git add app/find-specialists/page.tsx
  git commit -m "fix: responsive section padding on find-specialists page"
  ```

---

### Task 3: Fix FindSpecialistsHero.tsx — responsive layout

**Files:**
- Modify: `app/components/find-specialists/FindSpecialistsHero.tsx`

This is the biggest structural change. The center content block currently uses `position: absolute` with hard pixel coordinates. Replace it with a flex-centered layout that works at all widths, while keeping the visual result identical at 1440px.

- [ ] **Step 1: Rewrite FindSpecialistsHero.tsx**

  Replace the entire file content with:

  ```tsx
  "use client";

  import Header from "../Header";

  const popularTags = [
    "Couple therapy",
    "Burnout",
    "Sleep support",
    "Nutrition",
    "Stress",
    "Recovery",
    "Couple therapy",
  ];

  interface FindSpecialistsHeroProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
  }

  export default function FindSpecialistsHero({ searchQuery, onSearchChange }: FindSpecialistsHeroProps) {
    return (
      <section className="relative w-full min-h-[420px] lg:min-h-[542px] bg-[#013D47] overflow-hidden flex flex-col items-center">
        {/* Header nav */}
        <Header />

        {/* Left decorative creature — hidden below xl to avoid overflow */}
        <img
          src="/images/find-hero-creature-left.svg"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none hidden xl:block"
          style={{ left: "-16px", bottom: "0", width: "196px", height: "213px" }}
        />

        {/* Right decorative creature — hidden below xl to avoid overflow */}
        <img
          src="/images/find-hero-creature-right.svg"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none hidden xl:block"
          style={{ right: "-16px", top: "171px", width: "261px", height: "249px" }}
        />

        {/* Center content */}
        <div className="relative z-10 w-full max-w-[632px] mx-auto px-5 sm:px-8 lg:px-0 flex flex-col gap-6 lg:gap-8 items-center pt-24 sm:pt-28 lg:pt-[140px] pb-10 lg:pb-[60px]">
          {/* Title + subtitle */}
          <div className="flex flex-col gap-3 lg:gap-4 items-center w-full">
            <h1 className="text-white text-[28px] sm:text-[32px] lg:text-[40px] font-semibold leading-tight lg:leading-[48px] tracking-[-0.56px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] capitalize text-center w-full">
              Find Specialists
            </h1>
            <p className="text-white/80 text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-6 lg:leading-7 text-center max-w-[480px] lg:max-w-none">
              Connect with experienced professionals tailored to your personal health
              and wellness needs.
            </p>
          </div>

          {/* Search bar */}
          <div className="bg-white h-12 rounded-full flex items-center gap-2 pl-3 pr-[2px] w-full max-w-[438px] relative">
            <img src="/images/icon-search.svg" alt="" className="w-6 h-6 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by specialist, concern, or condition..."
              className="flex-1 min-w-0 text-[#0D0D0D] text-sm lg:text-base leading-5 outline-none bg-transparent placeholder:text-[#858482]"
            />
            <button
              onClick={() => {}}
              className="bg-[#FB652B] rounded-full h-[40px] px-4 lg:px-5 text-white text-sm font-medium leading-5 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 shrink-0"
            >
              Search
            </button>
          </div>

          {/* Popular tags */}
          <div className="flex flex-wrap gap-2 lg:gap-4 items-center justify-center w-full">
            {popularTags.map((tag, i) => (
              <button
                key={`${tag}-${i}`}
                onClick={() => onSearchChange(tag)}
                className="bg-white/5 h-9 lg:h-10 flex items-center gap-2 pl-2 pr-3 lg:pr-4 rounded-full text-white text-xs lg:text-sm font-normal leading-5 whitespace-nowrap hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
              >
                <img src="/images/icon-search.svg" alt="" className="w-4 lg:w-5 h-4 lg:h-5 opacity-80" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Verify at all breakpoints**

  With `npm run dev` open, check:
  - 1440px: content centered, creatures visible, heading 40px, search bar full width up to 438px.
  - 1024px: content centered, no creatures, no horizontal scroll.
  - 768px: content centered, search bar full-width at max 438px.
  - 375px: heading ~28px, search bar full width, tags wrap cleanly, no overflow.

- [ ] **Step 3: Commit**

  ```bash
  git add app/components/find-specialists/FindSpecialistsHero.tsx
  git commit -m "fix: responsive hero layout — replace hard-coded pixel positions"
  ```

---

### Task 4: Fix SpecialistFilters.tsx — responsive filter row

**Files:**
- Modify: `app/components/find-specialists/SpecialistFilters.tsx`

- [ ] **Step 1: Update the outer wrapper and dropdowns container**

  In `SpecialistFilters.tsx`, replace the `return` block:

  ```tsx
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-2 lg:gap-4">
        {filterDefs.map(({ label, icon, options }) => (
          <FilterDropdown
            key={label}
            label={label}
            icon={icon}
            options={options}
            selected={activeFilters[label]}
            onSelect={(v) => handleSelect(label, v)}
          />
        ))}
      </div>

      {/* More Filters button */}
      <button
        onClick={() => setMoreFiltersOpen((o) => !o)}
        className={`w-full sm:w-auto bg-[#FB652B] rounded-full h-12 flex items-center justify-center gap-2 pl-3 pr-5 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer shrink-0 ${moreFiltersOpen ? "ring-2 ring-[#FB652B]/60" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13 2.5V7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 7.5V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 12.5V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        More Filters
      </button>
    </div>
  );
  ```

- [ ] **Step 2: Make each FilterDropdown button responsive**

  In the `FilterDropdown` component's `<button>`, add `min-w-0` and ensure it doesn't force overflow. The button already has `whitespace-nowrap` which is fine. Add responsive text size and gap:

  ```tsx
  // Inside FilterDropdown, update the trigger button className:
  className={`backdrop-blur-[10px] border-[1.5px] rounded-full h-11 lg:h-12 flex items-center gap-3 lg:gap-4 px-3 lg:px-[14px] whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 ${
    selected
      ? "bg-[#013D47]/10 border-[#013D47]/30 hover:bg-[#013D47]/15"
      : "bg-white/10 border-[rgba(13,13,13,0.1)] hover:bg-white/20 active:bg-white/30"
  }`}
  ```

  And the label `<span>` inside:
  ```tsx
  <span className={`text-sm lg:text-base font-normal leading-6 ${selected ? "text-[#013D47] font-medium" : "text-[#1C1C1C]"}`}>
    {selected ?? label}
  </span>
  ```

- [ ] **Step 3: Fix dropdown popover position on small screens**

  The popover `div` uses `absolute top-[calc(100%+8px)] left-0`. On small screens this can overflow the right edge. Add `max-w-[calc(100vw-40px)]`:

  ```tsx
  // Inside FilterDropdown, update the open dropdown div:
  <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-2xl shadow-lg py-2 min-w-full max-w-[calc(100vw-40px)] overflow-hidden">
  ```

- [ ] **Step 4: Verify at breakpoints**

  - 1440px: single row with 5 dropdowns + button, unchanged.
  - 1024px: filters should wrap naturally if they don't fit; "More Filters" at end.
  - 768px: filters wrap to 2-3 per row; "More Filters" full width if alone on row.
  - 375px: filters wrap per available space; "More Filters" button full width.

- [ ] **Step 5: Commit**

  ```bash
  git add app/components/find-specialists/SpecialistFilters.tsx
  git commit -m "fix: responsive filter row — wrap on tablet/mobile"
  ```

---

### Task 5: Fix SpecialistCard.tsx — responsive card layout

**Files:**
- Modify: `app/components/find-specialists/SpecialistCard.tsx`

The card is currently a rigid 3-column horizontal layout. We'll make it:
- `≥1024px`: current 3-column layout (photo + info + booking)
- `640–1023px`: 2-column (photo + info, booking hidden, action buttons shown below info)
- `<640px`: stacked (photo full-width on top, info below, action buttons at bottom)

Action buttons must always be visible, so they need to be pulled out of the booking column into a separate shared row.

- [ ] **Step 1: Rewrite SpecialistCard.tsx**

  Replace the entire file content with:

  > **Breakpoint logic:** Booking column shows only at `xl` (1280px+). Reason: at 1024px, the booking column is only ~155px wide — too narrow for the 6-day date picker. Below xl: 2-column card (photo + info). At xl+: full 3-column card.

  ```tsx
  "use client";

  import { useState } from "react";
  import Image from "next/image";
  import type { Specialist } from "@/app/data/specialists";

  function CertificateIcon() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5L12.245 7.045L17.3 7.8L13.65 11.355L14.49 16.39L10 14.025L5.51 16.39L6.35 11.355L2.7 7.8L7.755 7.045L10 2.5Z" stroke="#2B2B2A" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    );
  }

  function GlobeIcon() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#2B2B2A" strokeWidth="1.5"/>
        <path d="M10 2.5c0 0-3.125 2.5-3.125 7.5s3.125 7.5 3.125 7.5M10 2.5c0 0 3.125 2.5 3.125 7.5S10 17.5 10 17.5M2.5 10h15" stroke="#2B2B2A" strokeWidth="1.5"/>
      </svg>
    );
  }

  function ChevronLeftIcon({ disabled }: { disabled?: boolean }) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={disabled ? "opacity-35" : ""}>
        <path d="M12.5 15L7.5 10L12.5 5" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  function ChevronRightIcon() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7.5 5L12.5 10L7.5 15" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  interface SpecialistCardProps {
    specialist: Specialist;
    defaultSelectedDay?: number;
    defaultSelectedTime?: string;
  }

  export default function SpecialistCard({
    specialist,
    defaultSelectedDay,
    defaultSelectedTime = "14:00",
  }: SpecialistCardProps) {
    const firstAvailableDay =
      defaultSelectedDay ??
      specialist.nextAvailable.dates.find((d) => d.available)?.day ??
      specialist.nextAvailable.dates[0].day;

    const [selectedDay, setSelectedDay] = useState(firstAvailableDay);
    const [selectedTime, setSelectedTime] = useState<string>(defaultSelectedTime);

    const { nextAvailable } = specialist;

    return (
      <div className="bg-white rounded-[24px] p-2 flex flex-col sm:flex-row items-stretch gap-4">
        {/* ── Photo column ── */}
        <div className="w-full h-[200px] sm:w-[180px] sm:h-auto md:w-[240px] xl:w-[340px] shrink-0 relative rounded-[16px] overflow-hidden">
          <Image
            src={specialist.photo}
            alt={specialist.name}
            fill
            className="object-cover"
          />
          {/* Session type badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {specialist.sessionTypes.map((type) => (
              <span
                key={type}
                className="bg-white rounded-full px-2 xl:px-3 py-1 flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-normal leading-5 text-black whitespace-nowrap"
              >
                <img
                  src={type === "In person" ? "/images/icon-armchair.svg" : "/images/icon-laptop.svg"}
                  alt=""
                  className="w-3 xl:w-4 h-3 xl:h-4"
                />
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* ── Info + actions column (always visible) ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between px-3 py-4 gap-3 xl:w-[304px] xl:flex-none">
          {/* Name + specializations */}
          <div className="flex flex-col gap-1">
            <p className="text-black text-[18px] sm:text-[20px] xl:text-[24px] font-medium leading-7 xl:leading-8">
              {specialist.name}
            </p>
            <div className="flex flex-wrap items-center gap-x-2">
              {specialist.specializations.map((spec, i) => (
                <span key={`${spec}-${i}`} className="flex items-center gap-2">
                  <span className="text-[rgba(13,13,13,0.65)] text-xs leading-5 whitespace-nowrap">
                    {spec}
                  </span>
                  {i < specialist.specializations.length - 1 && (
                    <span className="w-[3px] h-[3px] rounded-full bg-[rgba(13,13,13,0.65)] shrink-0" />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p className="text-[rgba(13,13,13,0.7)] text-sm leading-5 line-clamp-3 xl:line-clamp-none">
            {specialist.bio}
          </p>

          {/* Stats */}
          <div className="flex flex-col gap-1 xl:gap-2">
            <div className="flex items-center gap-2">
              <CertificateIcon />
              <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
                {specialist.yearsExperience}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icon-star.svg" alt="" className="w-5 h-5 shrink-0" />
              <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
                {specialist.rating} rating
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icon-users-three.svg" alt="" className="w-5 h-5 shrink-0" />
              <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
                {specialist.reviewsCount} reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
                {specialist.languages.join(", ")}
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-[#013D47] text-[20px] xl:text-[24px] font-medium leading-8">
            from €{specialist.priceFrom}{" "}
            <span className="text-[rgba(1,61,71,0.75)] text-sm font-normal leading-5">
              /session
            </span>
          </p>

          {/* Action buttons — mobile/tablet only (xl+ version lives in booking column) */}
          <div className="flex gap-2 xl:hidden">
            <button className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-sm font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
              View Profile
            </button>
            <button className="flex-1 h-10 bg-[#FB652B] rounded-full text-white text-sm font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
              Book a Meeting
            </button>
          </div>
        </div>

        {/* ── Vertical divider — xl+ only ── */}
        <div className="hidden xl:block self-stretch w-px bg-[rgba(13,13,13,0.08)] shrink-0" />

        {/* ── Right booking column — xl+ only ── */}
        <div className="hidden xl:flex flex-1 min-w-0 flex-col gap-4 pr-4 py-4">
          {/* Session option + time + price pills */}
          <div className="flex items-end gap-2">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <p className="text-black text-sm font-medium leading-5">Option</p>
              <button className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center px-4 gap-4 hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 cursor-pointer w-full text-left">
                <p className="flex-1 min-w-0 text-[#1C1C1C] text-sm leading-5 truncate">
                  Select session option
                </p>
                <img src="/images/icon-caret-down.svg" alt="" className="w-5 h-5 shrink-0" />
              </button>
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center justify-center gap-1 px-6 whitespace-nowrap">
                <span className="text-[#676665] text-xs leading-5">Time:</span>
                <span className="text-[#013D47] text-sm font-medium leading-5">
                  {specialist.sessionDuration} min
                </span>
              </div>
              <div className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center justify-center gap-1 px-6 whitespace-nowrap">
                <span className="text-[#676665] text-xs leading-5">Price:</span>
                <span className="text-[#013D47] text-sm font-medium leading-5">
                  €{specialist.priceFrom}
                </span>
              </div>
            </div>
          </div>

          {/* Date picker */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm leading-5">
              <span className="font-medium text-black">Next available</span>
              <span className="text-[#676665] font-normal">{nextAvailable.weekLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-not-allowed shrink-0 focus-visible:outline-none"
              >
                <ChevronLeftIcon disabled />
              </button>

              {nextAvailable.dates.map((d) => {
                const isSelected = d.day === selectedDay;
                const isUnavailable = !d.available;
                return (
                  <button
                    key={d.day}
                    onClick={() => d.available && setSelectedDay(d.day)}
                    disabled={isUnavailable}
                    className={[
                      "flex-1 h-[52px] flex flex-col items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2",
                      isSelected
                        ? "bg-[#FB652B] focus-visible:ring-[#FB652B]/60"
                        : isUnavailable
                        ? "bg-[#F6F6F5] opacity-50 cursor-not-allowed"
                        : "bg-[rgba(13,13,13,0.05)] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] cursor-pointer focus-visible:ring-[#013D47]/30",
                    ].join(" ")}
                  >
                    <span className={["text-base font-medium leading-6", isSelected ? "text-white" : "text-[#0D0D0D]"].join(" ")}>
                      {d.day}
                    </span>
                    <span className={["text-sm leading-5", isSelected ? "text-white/80" : "text-[rgba(13,13,13,0.5)]"].join(" ")}>
                      {d.dayName}
                    </span>
                  </button>
                );
              })}

              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(13,13,13,0.05)] active:bg-[rgba(13,13,13,0.1)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 cursor-pointer">
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          {/* Time slots */}
          <div className="flex flex-col gap-2">
            {nextAvailable.times.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map((time, tIdx) => {
                  if (!time) return <div key={tIdx} className="flex-1" />;
                  const isSelected = time !== "View All" && time === selectedTime;
                  const isViewAll = time === "View All";
                  return (
                    <button
                      key={time}
                      onClick={() => !isViewAll && setSelectedTime(time)}
                      className={[
                        "w-[133px] shrink-0 py-2 flex items-center justify-center rounded-lg text-sm leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer",
                        isSelected
                          ? "bg-[rgba(13,13,13,0.05)] border-[1.5px] border-[#FB652B] text-[#1C1C1C] focus-visible:ring-[#FB652B]/60"
                          : isViewAll
                          ? "bg-transparent text-[#FB652B] font-medium hover:underline focus-visible:ring-[#FB652B]/40"
                          : "bg-[rgba(13,13,13,0.05)] text-[#1C1C1C] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] focus-visible:ring-[#013D47]/30",
                      ].join(" ")}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Action buttons — desktop */}
          <div className="flex gap-2 mt-auto">
            <button className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-base font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
              View Profile
            </button>
            <button className="flex-1 h-10 bg-[#FB652B] rounded-full text-white text-base font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
              Book a Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify card at all breakpoints**

  - 1440px: 3-column layout, photo 340px, booking visible, content-driven height (~416px).
  - 1280px: 3-column layout, photo 340px, booking visible (booking column ~411px wide — enough for date picker).
  - 1024px: 2-column (no booking), photo 240px, info fills remaining, action buttons visible below price.
  - 768px: 2-column, photo 240px, info fills remaining, action buttons visible below price.
  - 375px: stacked (flex-col), photo full-width 200px tall, info below, action buttons visible.

- [ ] **Step 3: Commit**

  ```bash
  git add app/components/find-specialists/SpecialistCard.tsx
  git commit -m "fix: responsive specialist card — 3-col desktop, 2-col tablet, stacked mobile"
  ```

---

### Task 6: Fix SpecialistList.tsx — responsive results header

**Files:**
- Modify: `app/components/find-specialists/SpecialistList.tsx`

- [ ] **Step 1: Update results header row**

  In `SpecialistList.tsx`, replace the results header div:

  ```tsx
  {/* Results header */}
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between min-h-10">
    <p className="text-[#013D47] text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-8 whitespace-nowrap">
      {sorted.length} specialist{sorted.length !== 1 ? "s" : ""} found
      {searchQuery.trim() ? ` for "${searchQuery.trim()}"` : " — browse all"}
    </p>
    <div className="relative self-start sm:self-auto">
      {/* sort button — unchanged */}
    </div>
  </div>
  ```

  Full updated results header (keep the sort button unchanged inside):

  ```tsx
  {/* Results header */}
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <p className="text-[#013D47] text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-8">
      {sorted.length} specialist{sorted.length !== 1 ? "s" : ""} found
      {searchQuery.trim() ? ` for "${searchQuery.trim()}"` : " — browse all"}
    </p>
    <div className="relative">
      <button
        onClick={() => setSortOpen((o) => !o)}
        className="backdrop-blur-[10px] bg-white/10 border-[1.5px] border-[rgba(13,13,13,0.1)] rounded-full h-10 flex items-center gap-2 pl-5 pr-[14px] text-[#1C1C1C] text-sm lg:text-base font-normal leading-6 whitespace-nowrap hover:bg-white/20 active:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 cursor-pointer"
        aria-expanded={sortOpen}
      >
        {sortOrder}
        <img src="/images/icon-caret-down.svg" alt="" className={`w-5 h-5 shrink-0 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
      </button>
      {sortOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-white rounded-2xl shadow-lg py-2 min-w-[120px] overflow-hidden">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSortOrder(opt); setSortOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm leading-5 hover:bg-[#F6F6F5] transition-colors ${sortOrder === opt ? "text-[#FB652B] font-medium" : "text-[#1C1C1C]"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
  ```

- [ ] **Step 2: Verify**

  At 375px: count text wraps to its own line, sort button below on its own line. At 640px+: both on one row.

- [ ] **Step 3: Commit**

  ```bash
  git add app/components/find-specialists/SpecialistList.tsx
  git commit -m "fix: responsive results header in SpecialistList"
  ```

---

### Task 7: Verify Header.tsx at 375px

**Files:**
- Modify: `app/components/Header.tsx` (only if overflow detected)

- [ ] **Step 1: Check at 375px**

  Open `npm run dev`. Resize to 375px. The header pill (`bg-white/5 backdrop-blur-md rounded-full`) must not overflow. Logo + hamburger button must both fit on one row.

- [ ] **Step 2: Fix if overflowing**

  If the pill overflows at 375px, add `min-w-0` to the nav pill wrapper and ensure logo has a defined max-width. Most likely fix — the header div:

  ```tsx
  // Current:
  <div className="bg-white/5 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between">

  // If overflowing, add overflow-hidden:
  <div className="bg-white/5 backdrop-blur-md rounded-full px-4 sm:px-5 py-3 flex items-center justify-between overflow-hidden">
  ```

  Logo width is `w-[106px]` — this should be fine at 375px (375 - 32px header margin - 32px padding - 32px hamburger = 279px remaining, logo needs 106px).

- [ ] **Step 3: Commit (only if changed)**

  ```bash
  git add app/components/Header.tsx
  git commit -m "fix: header pill overflow at small viewports"
  ```

---

### Task 8: Verify Footer.tsx at 375px

**Files:**
- Modify: `app/components/sections/Footer.tsx` (only if issues detected)

- [ ] **Step 1: Check footer at 375px**

  Footer already has `px-5 sm:px-10 xl:px-20`, `grid-cols-2 sm:grid-cols-3`, `lg:flex-row`. Check:
  - "Rezolvus" large footer logo does not overflow (`w-full` with `aspectRatio`).
  - Copyright + policy links stack vertically on mobile (already `flex-col sm:flex-row`).
  - No horizontal scroll.

- [ ] **Step 2: Fix if needed**

  If the 2-column grid at 375px is too tight, the 3rd nav column may be cut off. Current code uses `grid-cols-2` at mobile — the 3rd column (`Company`) will move to a second row in a 2-column grid. Verify this looks acceptable.

  If the large footer logo image causes overflow, add `max-w-full overflow-hidden` to its container:

  ```tsx
  <div className="relative w-full max-w-full overflow-hidden" style={{ aspectRatio: "115/26" }}>
  ```

- [ ] **Step 3: Commit (only if changed)**

  ```bash
  git add app/components/sections/Footer.tsx
  git commit -m "fix: footer overflow guard at small viewports"
  ```

---

### Task 9: Final overflow audit and build

**Files:** No code changes — verification only.

- [ ] **Step 1: Check for horizontal scroll at all breakpoints**

  With `npm run dev` open, at each of these widths check that the browser shows NO horizontal scrollbar and `document.body.scrollWidth` equals `window.innerWidth`:

  | Width | Page |
  |-------|------|
  | 1440px | `/find-specialists` |
  | 1280px | `/find-specialists` |
  | 1024px | `/find-specialists` |
  | 768px  | `/find-specialists` |
  | 430px  | `/find-specialists` |
  | 390px  | `/find-specialists` |
  | 375px  | `/find-specialists` |
  | 1440px | `/` (homepage — must not be broken) |
  | 375px  | `/` (homepage — must not be broken) |

- [ ] **Step 2: Verify search and filters still work**

  At 375px:
  - Type in search input → cards filter.
  - Tap a popular tag → search updates.
  - Open a filter dropdown → popover appears and doesn't overflow right edge.
  - Select a filter → button shows selected state.
  - Clear filter (×) → clears correctly.

- [ ] **Step 3: Run production build**

  ```bash
  cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build
  ```

  Expected: no TypeScript errors, no ESLint errors, build completes successfully.

- [ ] **Step 4: Fix any build errors**

  If TypeScript errors appear, fix them. Common issues: missing `key` props, incorrect types. Fix inline, re-run build.

- [ ] **Step 5: Final commit**

  ```bash
  git add -A
  git commit -m "fix: final responsive polish and build verification for find-specialists"
  ```

---

### Task 10: Homepage smoke test

**Files:** No changes — verification only.

- [ ] **Step 1: Verify homepage unaffected**

  Navigate to `/`. Check at 1440px and 375px that:
  - Hero section looks correct.
  - All sections render.
  - Header hamburger works on mobile.
  - No new layout breaks introduced by shared component changes.

- [ ] **Step 2: Verify navigation**

  - From `/`, click "Find Specialists" nav link → lands on `/find-specialists`.
  - From `/find-specialists`, click logo → lands on `/`.
  - Mobile menu: open → click link → menu closes → correct page loads.
