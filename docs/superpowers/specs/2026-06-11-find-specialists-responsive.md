# Find Specialists — Responsive Design Spec

**Date:** 2026-06-11  
**Breakpoints:** 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 px

---

## Scope

Fix the `/find-specialists` page so it renders correctly at all breakpoints without horizontal overflow, layout collapse, or illegible text. Desktop Figma design (1440px) must be preserved exactly.

---

## Files in scope

- `app/find-specialists/page.tsx`
- `app/components/find-specialists/FindSpecialistsHero.tsx`
- `app/components/find-specialists/SpecialistFilters.tsx`
- `app/components/find-specialists/SpecialistCard.tsx`
- `app/components/find-specialists/SpecialistList.tsx`
- `app/components/Header.tsx` (shared — must not break homepage)
- `app/components/sections/Footer.tsx` (already mostly responsive — verify only)

---

## Hero section (`FindSpecialistsHero.tsx`)

**Problem:** All layout uses hard-coded `style={{ left: "404px", ... }}` absolute positioning. Right creature at `left: 1222px` causes horizontal overflow.

**Fix:**
- Remove absolute positioning from center content block; use flex column centered in the section.
- Section height: `h-auto min-h-[420px] lg:h-[542px]` to accommodate taller mobile content.
- Center content: `w-full max-w-[632px] mx-auto px-5 pt-24 pb-10 lg:py-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[140px]`
- Right decorative creature: `hidden xl:block` with `absolute right-0` (no pixel overflow).
- Left decorative creature: `hidden md:block` with `absolute left-0`.
- Search bar: `w-full max-w-[438px]` centered.
- Popular tags container: `w-full max-w-[632px]`.
- H1: `text-[28px] sm:text-[32px] lg:text-[40px]` with matching line-height.

---

## Filters (`SpecialistFilters.tsx`)

**Problem:** 5 dropdowns + button in one `flex` row — overflows on tablet/mobile.

**Fix:**
- Outer wrapper: `flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between`
- Dropdowns row: `flex flex-wrap gap-3 lg:gap-4`
- On mobile: each dropdown `min-w-0 flex-1` or `w-full` — at least 2 per row on tablet, stacked on phone.
- "More Filters" button: `w-full lg:w-auto` on mobile.
- Dropdown popover: `max-w-screen-sm` and position adjusted on small screens to avoid overflow.

---

## Specialist cards (`SpecialistCard.tsx`)

**Problem:** Rigid 3-column layout with fixed pixel widths; fixed `h-[416px]`.

**Fix:**
- Desktop (≥1024px): current layout preserved — `flex-row`, photo `w-[340px]`, info `w-[304px]`, booking column `flex-1`.
- Tablet (768–1023px): photo shrinks to `w-[220px]`; booking column hidden (`hidden lg:flex`); card height becomes `h-auto`.
- Mobile (<768px): full vertical stack — photo on top as `w-full h-[200px]`; info below; booking hidden; action buttons full-width at bottom.
- Card height: `h-auto` at all breakpoints; `min-h-[200px] lg:h-[416px]` if needed for desktop alignment.

---

## Specialist list header & sort (`SpecialistList.tsx`)

**Fix:**
- Results count + sort: `flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`
- Sort dropdown: stays right-aligned on desktop; full-width on mobile if needed.

---

## Page padding (`page.tsx`)

**Fix:**
- Filter/results section: `px-5 sm:px-8 lg:px-20`

---

## Header (`Header.tsx`)

**Status:** Mobile hamburger already implemented. Minor verification:
- Confirm header pill doesn't overflow at 375px.
- Confirm mobile menu closes on link click — already done.
- No structural changes needed unless overflow found during testing.

---

## Footer (`Footer.tsx`)

**Status:** Already has `lg:flex-row`, `sm:grid-cols-3`, `sm:px-10`, `xl:px-20`. Verify passes visual check at 375px; adjust only if issues found.

---

## Overflow audit

After all changes: verify `document.body.scrollWidth === window.innerWidth` at each breakpoint. Remove any remaining hard-coded pixel positions that could escape the viewport.

---

## Success criteria

- Zero horizontal scroll at 1440, 1280, 1024, 768, 430, 390, 375px.
- Desktop (1440px) matches Figma exactly.
- Cards readable and usable at 375px.
- Filters usable at 375px (no single-row overflow).
- `npm run build` passes with zero TypeScript/ESLint errors.
- Homepage (`/`) unaffected.
