# Homepage Redesign — Spec (Figma node 44-4512)

**Date:** 2026-06-11
**Figma source:** `HKVT4QYMJGDlpLpKLOCKJB`, node `44:4512`
**Scope:** Update existing Homepage to match new Figma design. Do not touch `/find-specialists`.

---

## 1. Context

The Homepage (`/`) needs to be updated to match the redesigned Figma layout. The project focus has shifted from general mental wellness to rehabilitation, physiotherapy, speech therapy, and child development. All content and visual identity changes reflect this shift.

The existing project uses Next.js App Router, React 19, TypeScript, Tailwind CSS v4. Components live in `app/components/sections/`. The homepage is assembled in `app/page.tsx`.

---

## 2. New Section Order

```
Hero
FeaturesSection        ← restructured
HealthAreasSection     ← updated content + new banner
HowItWorksSection      ← updated photo + text
TickerSection          ← unchanged
AgeSection             ← NEW
SpecialistsSection     ← unchanged
TestimonialsSection    ← unchanged
CTASection             ← updated text + decoratives
Footer                 ← unchanged (Figma still shows placeholders)
```

---

## 3. Section-by-Section Spec

### 3.1 Hero (`Hero.tsx`)

Only the subtitle paragraph changes.

**Old:** "Discover verified psychologists, physiotherapists, wellness specialists, and more — all in one modern platform designed around trust and simplicity."

**New:** "Connect with trusted speech therapists, physiotherapists, occupational specialists, rehabilitation experts, and wellness professionals for children and adults."

Everything else (H1, search bar, rating strip, layout) stays identical.

---

### 3.2 FeaturesSection (`FeaturesSection.tsx`)

**Layout change — major restructure.**

Old: heading left-aligned + 3 horizontal feature cards.
New: heading centered + 3-column row: [left column: 2 cards] | [center: photo panel] | [right column: 2 cards]

**Heading:**
- Eyebrow: "BULIT AROUND TRUST" (unchanged, note: Figma has typo "BULIT")
- H2: "Your Well-being is our top Priority" (unchanged)
- Alignment: `text-center items-center` (was `items-start`)

**Section padding:** `px-20 py-[120px]` with `flex flex-col gap-12 items-center`

**Three columns (all `flex-1`, gap-4):**

Left column (2 stacked cards, gap-4):
1. **Verified specialists** — icon: SealCheck 72×72 `bg-[#013D47] rounded-[12px]`; body: "Only certified healthcare and wellness professionals."
2. **Rehabilitation & Recovery** — icon: UsersThree 72×72 (same dark teal bg); body: "Support for movement, recovery, posture, and pain relief."

Center panel (416px wide at desktop, full width at mobile → hidden on small screens or collapsed to a single row):
- `rounded-[24px] overflow-hidden h-[544px]` relative container
- Background photo: `features-center-photo.jpg` (object-cover, fill)
- Teal wave overlay: `features-wave.png` (absolute, full size)
- Bottom decorative wave: `features-wave-bottom.png` (absolute)

Right column (2 stacked cards, gap-4):
1. **Adult & Child Support** — icon: CalendarHeart 72×72; body: "Specialists for children, teenagers, and adults."
2. **Safe & secure** — icon: ShieldCheck 72×72; body: "Your data and privacy are protected at every step of your journey."

**Card spec:**
- `bg-white rounded-[24px] h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-start`
- Icon container: `bg-[#013D47] w-[72px] h-[72px] rounded-[12px] flex items-center justify-center`
- Icon SVG: 40×40
- Title: `text-[20px] font-medium leading-6 capitalize text-black`
- Body: `text-[#494947] text-base leading-6`

**Responsive:**
- Desktop (lg+): 3-column flex row
- Tablet (md): center photo hidden; 4 cards in 2×2 grid
- Mobile: 4 cards stacked 1 column; center photo hidden

---

### 3.3 HealthAreasSection (`HealthAreasSection.tsx`)

**Updated header:**
- Eyebrow: "SUPPORT FOR EVERY NEED" (unchanged)
- H2: "Explore Popular Specialist Categories" (was "Health & Wellness Popular Support Areas")
- Description: "Find trusted specialists for speech development, rehabilitation, movement, recovery, and long-term wellbeing." (was about stress/burnout)

**Updated area cards (6 total, 2 rows × 3 cols, each 209px tall):**

Row 1:
1. **Speech & Language Therapy** — white bg (`bg-white`); illustration: `area-speech.svg`
2. **Occupational & Educational Support** — `bg-[#EDECEC]`; illustration: `area-occupational.svg`
3. **Physiotherapy & Rehabilitation** — `bg-[#EDECEC]`; illustration: `area-physiotherapy.svg`

Row 2:
4. **Physical Wellness & Recovery** — `bg-[#EDECEC]`; illustration: `area-wellness.svg`
5. **Child Development Support** — `bg-[#EDECEC]`; illustration: `area-child.svg`
6. **Sports & Injury Recovery** — `bg-[#EDECEC]`; illustration: `area-sports.svg`

**Card title font size:** `text-[24px] font-medium leading-8` (was `text-xl`)

**Card padding:** `pl-6 pr-4 py-4` (unchanged)

**Arrow icon:** keep `icon-arrow-up-right.svg` (same)

**NEW — "Not sure who's right for you?" banner:**

Below the cards grid, full-width white rounded panel:
```
bg-white rounded-[32px] px-16 py-8 flex items-center justify-between relative overflow-hidden
```
- Left text block (max-w ~570px):
  - H2: "Not sure who's right for you?" — `text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize text-black`
  - Body: "Answer a few simple questions and let Rezolvus match you with the right specialists for your needs" — `text-[#494947] text-lg leading-7`
- Right: "Get Matched" button — `bg-[#FB652B] rounded-full h-14 px-8 text-white font-medium`
- Background decoratives (absolute, pointer-events-none): teal ellipse blur + wave vector (download from Figma)

**Responsive for banner:**
- Mobile: stack vertically; button full width

---

### 3.4 HowItWorksSection (`HowItWorksSection.tsx`)

**Photo panel (left):**
- New photo asset: `how-it-works-photo.jpg` (replace existing)
- New overlay: `how-it-works-overlay.png` (replace if different)
- Waves: `how-it-works-wave1.svg`, `how-it-works-wave2.svg` (may update)
- Bottom-left decorative creature: updated asset `how-it-works-star.svg` (orange star-like creature)
- Top-right decorative creature: `how-it-works-creature.svg` (teal blob character)
- Photo card heading: "Your Path to rehabilitation, development, & wellbeing." (was "Your Path to Wellness")
- "HOW IT WORKS" label: stays at bottom-left

**Steps (right panel):**
- pl-16 → `pl-[64px]`, top padding `py-[64px]`
- Gap between steps: `gap-8` (32px) — was evenly distributed across height

Updated step texts:
| # | Title | Body |
|---|---|---|
| 01 | Tell us what support you need | Speech therapy, rehabilitation, physiotherapy, educational support, or wellness services. |
| 02 | Explore verified specialists | Compare experience, specializations, languages, and availability. |
| 03 | Choose the right fit | Book online or in-person sessions with trusted professionals. |
| 04 | Begin your recovery or development journey | Receive personalized support for yourself, your child, or your family. |

---

### 3.5 AgeSection — NEW (`AgeSection.tsx`)

New component. Insert between `<TickerSection />` and `<SpecialistsSection />` in `page.tsx`.

**Section:**
```
bg-[#F6F6F5] w-full px-20 pt-0 pb-[120px] flex flex-col lg:flex-row items-center gap-4
```

**Left: heading block** (shrink-0, ~307px wide):
- Eyebrow: "BULIT AROUND TRUST" — `text-[#FB652B] text-xs font-semibold uppercase`
- H2: "Support for every Age" — `text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize`

**Right: two cards side-by-side** (flex-1, gap-4):

Card base: `bg-[#E4DECE] rounded-[24px] h-[358px] relative overflow-hidden px-8 py-6 flex-1`

1. **Adults & Teens** card:
   - Title: `text-[#013D47] text-[24px] font-medium leading-8` at top-left
   - Two illustrations (absolute positioned, overflow): teal half-circle blob left + orange flower blob right
   - Assets: `age-adults-left.svg`, `age-adults-right.svg`

2. **Kids & Infants** card:
   - Title: same style at top-left
   - Large white circle face with glasses + scattered colorful star characters
   - Assets: `age-kids-main.svg` + multiple small decorative assets

**Responsive:**
- Mobile/tablet: cards stack vertically (flex-col); heading above; each card full width
- Illustrations may overflow the card bounds (overflow-hidden clips them)

---

### 3.6 CTASection (`CTASection.tsx`)

**Text change only — layout unchanged:**

Old description: "Find the right support for your mental and physical health today. We're here to help you feel better!"
New description: "Explore certified specialists for rehabilitation, speech therapy, movement recovery, and long-term wellbeing."

**Decoratives updated:**
- Left: white bunny/heart creature (`cta-creature-left.svg`) at `left-[320px] top-[196px] w-[130px]`
- Right: teal blob creature (`cta-creature-right.svg`) at right side
- Remove old `cta-heart.svg` and `cta-star.svg` references (files can remain in public/)

**CTA bg photo:** replace `cta-bg.jpg` with new sunset photo from Figma (if different)

---

## 4. Assets to Download from Figma

All saved to `public/images/` before implementation begins.

| Filename | Figma asset URL | Type |
|---|---|---|
| `features-center-photo.jpg` | `ac3df393-...` | photo |
| `features-wave.png` | `fa92d348-...` | overlay |
| `features-wave-bottom.png` | `6f4c0145-...` | decoration |
| `icon-calendar-heart.svg` | `2b4f703c-...` | icon |
| `area-speech.svg` | `4f17940c-...` | illustration |
| `area-occupational.svg` | `4a1199f3-...` | illustration |
| `area-physiotherapy.svg` | `4d5c22ea-...` | illustration |
| `area-wellness.svg` | `ff1eb91b-...` | illustration |
| `area-child.svg` | `0ddb8235-...` | illustration |
| `area-sports.svg` | `5fef1bcf-...` | illustration |
| `how-it-works-photo.jpg` | `0c7828b5-...` | photo (replaces existing) |
| `how-it-works-overlay-2.png` | `28f031b5-...` | overlay |
| `how-it-works-creature-2.svg` | `b5b1c927-...` | decoration |
| `how-it-works-star-2.svg` | `f3730e14-...` | decoration |
| `age-adults-left.svg` | `ab481deb-...` | illustration |
| `age-adults-right.svg` | `b35e176d-...` | illustration |
| `age-kids-main.svg` | `5ce9d39b-...` | illustration |
| `age-kids-extra-1.svg` | `bc3c74bf-...` | illustration |
| `age-kids-extra-2.svg` | `dbc7deff-...` | illustration |
| `age-kids-extra-3.svg` | `aef5130f-...` | illustration |
| `age-kids-extra-4.svg` | `4bbca090-...` | illustration |
| `cta-creature-left.svg` | `d9df8bd3-...` | decoration |
| `cta-creature-right.svg` | `1c98ef0c-...` | decoration |

---

## 5. Files Changed

| File | Change type |
|---|---|
| `app/page.tsx` | Add `<AgeSection />` import + usage |
| `app/components/sections/Hero.tsx` | Subtitle text |
| `app/components/sections/FeaturesSection.tsx` | Layout restructure + new cards + assets |
| `app/components/sections/HealthAreasSection.tsx` | Content + categories + banner |
| `app/components/sections/HowItWorksSection.tsx` | Photo + text updates |
| `app/components/sections/AgeSection.tsx` | New file |
| `app/components/sections/CTASection.tsx` | Text + decoratives |
| `public/images/*` | ~23 new/replaced assets |

---

## 6. Constraints

- Do not modify `Header.tsx`, `Footer.tsx`, `TickerSection.tsx`, `SpecialistsSection.tsx`, `TestimonialsSection.tsx`
- Do not modify `/find-specialists` page components
- Verify `/find-specialists` still works after shared component (Header) touches are zero
- Run `npm run build` before marking done
- TypeScript strict — no `any`, no implicit errors
