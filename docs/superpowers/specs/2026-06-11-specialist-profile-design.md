# Specialist Profile Page — Design Spec

**Date:** 2026-06-11  
**Figma node:** `44-6153`  
**File:** `HKVT4QYMJGDlpLpKLOCKJB`

---

## Overview

A dynamic specialist profile page reachable from `/find-specialists`. Each specialist gets a clean URL like `/specialists/stephanie-morar`. The page shows the specialist's full bio, session options, qualifications, FAQ, and a sticky booking card.

---

## Route

```
/specialists/[slug]
```

- `app/specialists/[slug]/page.tsx` — Server Component, reads slug, looks up specialist data, calls `notFound()` if not found
- Slug format: kebab-case from specialist name, e.g. `dr-emma-williams`

---

## File Changes

| File | Action |
|------|--------|
| `app/data/specialists.ts` | Extend with new fields (slug, location, ageGroups, specializationTags, aboutFull, aboutVideo, sessions, qualifications, faq) |
| `app/specialists/[slug]/page.tsx` | New — profile page |
| `app/specialists/[slug]/` | New directory |
| `app/components/Header.tsx` | Add `variant?: "light" \| "dark"` prop |
| `app/components/find-specialists/SpecialistCard.tsx` | Wire "View Profile" button to `<Link>` |

---

## Data Model Extension

```ts
interface SessionOption {
  id: string
  name: string
  description: string
  price: string        // "Free" | "€55 / €100"
  duration: string     // "10 min" | "45 min / 90 min"
}

interface Qualification {
  id: string
  type: "education" | "experience" | "approach"
  title: string
  institution: string
  year: string         // "2015 — 2020" | "2021"
  description: string
}

interface FaqItem {
  id: string
  question: string
  answer: string
}

// Extended Specialist interface
interface Specialist {
  // existing fields unchanged
  id: string
  name: string
  specializations: string[]
  bio: string
  yearsExperience: string
  rating: string
  reviewsCount: string
  languages: string[]
  sessionTypes: ("In person" | "Online")[]
  photo: string
  priceFrom: number
  sessionDuration: number
  nextAvailable: { weekLabel: string; dates: AvailableDate[]; times: string[][] }

  // new fields
  slug: string
  location: string
  ageGroups: string                // "Work with Infants, Kids & Adults"
  specializationTags: string[]     // ["Anxiety", "Burnout", ...]
  aboutFull: string                // full bio paragraph
  aboutVideo?: string              // optional video/photo URL
  sessions: SessionOption[]
  qualifications: Qualification[]  // type field used to filter by tab
  faq: FaqItem[]
}
```

All 5 existing specialists get full mock data. The data file remains the single source of truth; shape is ready for API substitution.

---

## Page Layout

### Background and padding
- Page bg: `bg-[#edecec]`
- Content padding: `px-5 sm:px-8 lg:px-20 pt-8 pb-40`

### Header
- Uses existing `<Header variant="dark" />` — solid `bg-[#013d47]` instead of frosted glass
- `variant="light"` (default) keeps current frosted-glass behavior for homepage and find-specialists

### Breadcrumbs
- `Home › Search › [Specialist Name]`
- Font: 18px Medium, color `#858482` for inactive, `#013d47` for current
- `Home` links to `/`, `Search` links to `/find-specialists`

### Two-column grid (desktop ≥1024px)
```
┌────────────────────────────────┬─────────────────┐
│ Left column (flex-1)           │ Right (416px)   │
│ pr-8                           │ sticky top-8    │
└────────────────────────────────┴─────────────────┘
```
On mobile/tablet: single column, booking card moves below hero info.

---

## Left Column Sections

### Hero
- Photo: `w-[416px] h-[406px]` → `rounded-[24px]`, `object-cover`
- Mobile: full-width, fixed aspect ratio (approx 4:3)
- Specialist name: 32px Medium, `#0d0d0d`, `tracking-[-0.96px]`
- Specializations: 14px Regular, `rgba(13,13,13,0.65)`, dot-separated
- Stats row (wrapping flex): experience, rating, reviews, languages, age groups — each with icon + 14px Regular text
- "Specializes in" label: 14px Medium `#1c1c1c`
- Tag chips: white bg, `rounded-full`, `px-3 py-2`, 14px Regular `rgba(13,13,13,0.65)`

### Tabs (Overview / Reviews)
- Two tabs with underline indicator
- Active: `border-b-[3px] border-[#fb652b]`, text `#1c1c1c` 16px Medium
- Inactive: `border-b border-[rgba(13,13,13,0.15)]`, text `#676665` 16px Regular
- Reviews tab has a count badge: `bg-[#013d47]` pill, white text 12px
- `useState` controls which tab content is shown
- Reviews tab content: empty state placeholder (no reviews data in mock)

### About Me
- Section title: 24px Medium, `#013d47`
- Body text: 16px Regular, `#494947`
- "Read more" text button: 16px Medium `#fb652b`, expands full `aboutFull` text via `useState`
- Video/photo card: `h-[459px]` `rounded-[24px]` `overflow-hidden`, with centered play button overlay (decorative, no video behavior)

### Session Options & Type
- Section title + toggle tabs (Options / Type) — `useState` controls active tab
- Session cards: `bg-white rounded-[24px] p-6`, flex row with name+description on left, price/duration badge on right
- Price badge: `bg-[#e4dece]` `rounded-[12px]` `px-4 py-3`, text `#013d47` 14px
- "View more sessions" text link: `#fb652b` 16px Medium

### Qualification
- Section title + toggle tabs (Education / Experience / Approach) — `useState`
- Qualification cards: `bg-white rounded-[24px] p-6`
  - Title: 20px Medium `#1c1c1c`
  - Institution row: graduation-cap icon + 14px Medium `#013d47`
  - Year badge: `bg-[#e4dece] rounded-full px-3 py-1`, 14px Medium `#013d47`
  - Description: 14px Regular `#676665`

### FAQ
- Section title: 24px Medium `#013d47`
- Accordion items: `bg-white rounded-[16px] p-6`
- Each item: `useState(open)` — open shows question + answer, closed shows only question
- Open icon: rotated `+` (−135deg = `×`), closed: `+`
- Answer text: 14px Regular `#676665`

---

## Right Column — Booking Card

- `bg-white rounded-[24px] pt-6 pb-4 px-8`
- Sticky: `sticky top-8`
- On mobile: renders below hero, not sticky

### Contents
1. **Header row**: "Book session" (24px Medium) + "GMT+3 Timezone" (14px Regular `#1c1c1c`)
2. **Option dropdown**: `bg-[rgba(13,13,13,0.05)]` `rounded-[8px]` `h-[48px]` with caret-down icon
3. **Time + Price pills**: two pills side by side, `bg-[rgba(13,13,13,0.05)]` `rounded-[8px]`
4. **Format**: Online | In person buttons — selected has `border border-[#fb652b]`, icons from existing assets
5. **Date picker**: label "Choose time" + week range, 4 date buttons + prev/next chevrons
   - Selected date: `bg-[#fb652b]` white text
   - Unselected: `bg-[rgba(13,13,13,0.05)]`
6. **Time slots**: 3 rows × 3 cols, selected slot: `border border-[#fb652b]`
7. **"View more availabilities"**: text link `#fb652b` 14px Medium
8. **"Login to Book"** button: full width, `bg-[#fb652b]` `rounded-full` `py-3`, 16px Medium white, hover/active/focus states
9. **"Free cancellation within 24h"**: shield-check icon + 14px Regular `#013d47`

The booking card reuses the date/time selection logic already present in `SpecialistCard.tsx` (extracted or duplicated).

---

## Header Variant

```tsx
// Header.tsx
interface HeaderProps {
  variant?: "light" | "dark"
}
// "light" (default): bg-white/5 backdrop-blur-md  (current behavior)
// "dark": bg-[#013d47]
```

---

## Responsive Breakpoints

| Width | Behavior |
|-------|----------|
| ≥1280px | Full two-column layout as Figma |
| 1024–1279px | Two-column, narrower left col |
| 768–1023px | Single column; booking card below hero |
| <768px | Single column; photo full-width; booking card below hero |

- Tabs become horizontally scrollable on mobile if they overflow
- Session/qualification cards stack vertically (already column layout)
- FAQ accordion fully functional on all sizes

---

## Error / Empty States

- **Slug not found**: `notFound()` → Next.js default 404
- **No photo**: fallback to `/images/avatar-1.png`
- **No reviews**: "No reviews yet" neutral message under Reviews tab
- **Missing optional field** (aboutVideo, etc.): section/element not rendered

---

## Assets Needed from Figma

The following icons are already in `public/images/`:
- `icon-star.svg`, `icon-users-three.svg` — used in SpecialistCard, reuse here

New icons needed (export from Figma or inline SVG):
- `icon-graduation-cap.svg` — qualification cards
- `icon-shield-check.svg` — booking card cancellation note
- `icon-play.svg` — video overlay button
- `icon-caret-right.svg` — breadcrumb separator (already used as inline SVG in existing code)
- `icon-person.svg` — age groups stat

Specialist photo used in Figma: `specialist-3.jpg` (already in `public/images/`).

---

## Connecting Find Specialists → Profile

In `SpecialistCard.tsx`:
- "View Profile" `<button>` → `<Link href={/specialists/${specialist.slug}}>` 
- The card itself can optionally be wrapped in a link or keep the explicit button

---

## Quality Gates

Before marking done:
- `npm run build` passes (no TS errors)
- All 5 specialist slugs resolve correctly
- Invalid slug shows 404
- Booking card sticky on desktop, stacked on mobile
- All tabs and accordion work
- "View Profile" from find-specialists navigates correctly
- Homepage and find-specialists pages unaffected
