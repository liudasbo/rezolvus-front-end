---
name: rezolvus-homepage-design
description: Full homepage implementation spec for Rezolvus — a health & wellness specialist marketplace. Based on Figma design node 1:334 (file HKVT4QYMJGDlpLpKLOCKJB).
metadata:
  type: project
---

# Rezolvus Homepage Design Spec

**Figma source:** https://www.figma.com/design/HKVT4QYMJGDlpLpKLOCKJB/REZOLVUS-LIUDAS?node-id=1-334
**Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS v4
**Styling approach:** Direct Tailwind inline classes (no CSS modules, no styled-components)
**Date:** 2026-06-10

---

## Design System

### Typography

Font family: **Tomato Grotesk** (commercial font — Tomatype)
- Must be self-hosted via `@font-face` in `globals.css`
- Weights needed: 400 (Regular), 500 (Medium), 600 (SemiBold)
- Fallback: `Inter, sans-serif`

| Style name    | Size  | Weight     | Line-height | Letter-spacing |
|---------------|-------|------------|-------------|----------------|
| eyebrow       | 12px  | SemiBold   | 24px        | 0              |
| h1_medium     | 64px  | Medium     | 80px        | -1.92px        |
| h2_semibold   | 40px  | SemiBold   | 48px        | -0.8px         |
| h5_medium     | 20px  | Medium     | 24px        | 0              |
| body_L_regular| 16px  | Regular    | 24px        | 0              |
| body_L_medium | 16px  | Medium     | 24px        | 0              |
| body_M_regular| 14px  | Regular    | 20px        | 0              |
| body_S_regular| 12px  | Regular    | 20px        | 0              |
| ticker        | 52px  | Medium     | 74.5px      | 0              |
| step_number   | 72px  | SemiBold   | 68.7px      | -2.16px        |

### Color Palette

| CSS variable            | Hex       | Usage                                    |
|-------------------------|-----------|------------------------------------------|
| `--color-cold-dark`     | `#013D47` | Dark section bg, icon bg, footer bg      |
| `--color-cold-light`    | `#67CDCD` | Ticker bg, step numbers, accents         |
| `--color-warm`          | `#FB652B` | CTA buttons, eyebrow labels              |
| `--color-warm-light`    | `#FBB582` | Decorative accents                       |
| `--color-gray-050`      | `#F6F6F5` | Light section backgrounds                |
| `--color-gray-100`      | `#EDECEC` | Area card backgrounds                    |
| `--color-gray-800`      | `#494947` | Body text, secondary content             |
| `--color-gray-950`      | `#1C1C1C` | Dark text                                |
| `--color-gray-999`      | `#0D0D0D` | Near-black text                          |
| `--color-bg-beige`      | `#E4DECE` | Decorative background shapes             |

### Spacing / Layout

- Max content width: 1440px
- Horizontal padding (sections): 80px each side
- Section vertical padding: 120px (most), 56px (health areas), 64px (footer top), 160px (how-it-works top, CTA)
- Card gap: 16px (standard), 24px (testimonials)
- Card border-radius: 24px (most cards), 16px (specialist photo), 32px (how-it-works image), 40px (CTA card)

---

## File & Component Structure

```
app/
  page.tsx                          ← assembles all sections
  layout.tsx                        ← update metadata title/description
  globals.css                       ← @font-face Tomato Grotesk, CSS vars, base reset

  components/
    Header.tsx                      ← frosted glass pill nav bar

    sections/
      Hero.tsx                      ← hero section (bg image, nav, headline, search, rating)
      FeaturesSection.tsx           ← "Your Well-Being Is Our Top Priority" + 3 cards
      HealthAreasSection.tsx        ← dark teal bg, 6 area cards
      HowItWorksSection.tsx         ← image card left, 4 steps right
      TickerSection.tsx             ← animated marquee on teal pill
      SpecialistsSection.tsx        ← dark bg, horizontal specialist card row
      TestimonialsSection.tsx       ← light bg, 2 rows of testimonial cards
      CTASection.tsx                ← photo card + centered glass CTA panel
      Footer.tsx                    ← dark bg, columns + large Rezolvus logo

    ui/
      CardFeatures.tsx              ← white card: title + body + dark icon square
      CardAreas.tsx                 ← gray card: title + arrow + decorative image
      CardSpecialist.tsx            ← white card: photo + tags + info + "View Profile" btn
      CardTestimonials.tsx          ← white card: avatar + name + stars + review text
```

---

## Section Specifications

### 1. Hero (1440×780)

**Layout:** `position: relative`, full viewport width, height 780px.

**Layers (back to front):**
1. Full-bleed background photo (smiling woman, sky background) — `object-cover`
2. Gradient overlay vector (darkens edges)
3. Nav bar — frosted glass pill, `position: absolute`, top 16px, left 16px, right 16px
4. Hero headline block — centered, `position: absolute`, approx top 236px
5. Search bar — `position: absolute`, approx top 564px, centered, 816px wide
6. Rating strip — `position: absolute`, approx top 700px, centered

**Nav bar (`Header.tsx`):**
- Container: `bg-white/5 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between`
- Logo image (106×24)
- Nav links: "Find Specialists", "How It Works", "For Specialists", "Reviews", "About" — 16px Regular, white
- Right: Login button (white border pill) + "Get Started" button (`#FB652B` pill)

**Hero headline:**
- H1: "Find the right specialist without the stress" — 64px Medium, white, centered, tracking -1.92px
- Subtitle: 18px Regular, white, max-width 601px, centered

**Search bar:**
- Container: white bg + `backdrop-blur-xl`, rounded-full, 816×72, padding 12px
- 3 dropdown pills (Specialist / Location / Consultation type) — 185×48, border `rgba(13,13,13,0.1)`, 16px Regular `#1C1C1C`
- "Find My Specialist" button — `#FB652B` pill, 16px Medium, white
- Decorative: 2 small character illustrations (orange bunny top-left, teal creature bottom-right)

**Rating strip:**
- Frosted glass pill: `bg-white/15 backdrop-blur-sm border border-white`, 387×48
- 3 overlapping avatar circles (32px each, -16px margin)
- 5 gold stars (20px each)
- "4.8/5.0" (white, Medium) + "(1.1K+ reviews)" (white/70, Regular)

---

### 2. Features Section (1440×504, bg: `#F6F6F5`)

**Layout:** `flex items-start gap-[126px] px-20 py-[120px]`

**Left column (306px wide):**
- Eyebrow: "BUILT AROUND TRUST" — 12px SemiBold, `#FB652B`, uppercase
- H2: "Your Well-Being is our top Priority" — 40px SemiBold, `#013D47`, tracking -0.8px, 48px line-height

**Right column (848px, 3 cards, gap 16px):**
Each card (`CardFeatures`): white bg, 264px tall, rounded-24px, padding 24px
- Top: title (20px Medium, black) + body (16px Regular, `#494947`)
- Bottom-right: dark teal icon square (56×56, rounded-12px, `#013D47`) with 32×32 phosphor icon (white)
- Card 1: "Verified Specialists" — SealCheck icon
- Card 2: "Real Reviews" — UsersThree icon
- Card 3: "Safe & Secure" — ShieldCheck icon

---

### 3. Health Areas Section (1440×505, bg: `#013D47`)

**Layout:** `flex flex-col gap-12 px-20 py-14`

**Header row:** `flex items-end justify-between`
- Left: eyebrow "SUPPORT FOR EVERY NEED" (`#FB652B`) + H2 "Health & Wellness Popular Support Areas" (white, 445px wide)
- Right: body text 18px Regular, `rgba(255,255,255,0.8)`, 494px wide

**Cards row:** `flex gap-4` — 6 equal-width cards
Each card (`CardAreas`): `bg-[#EDECEC]` rounded-24px, 209px tall, `overflow-hidden`, padding 24px 16px
- Top-left: title 20px Medium black, capitalize
- Top-right: arrow icon 24×24 (ArrowUpRight)
- Bottom: decorative illustration (unique per card, positioned absolute)
- Cards: Anxiety & Stress / Physical Recovery / Sleep Problems / Nutrition & Lifestyle / Burnout / Relationship Problems

**Background:** subtle wavy vector decoration (semi-transparent, centered)

---

### 4. How It Works Section (1440×716, bg: `#F6F6F5`)

**Layout:** `flex gap-4 items-center pt-40 px-20`

**Left — image card (633×556):**
- Rounded-32px, overflow-hidden
- Background photo (woman, warm tones)
- Gradient overlay at bottom
- Top-left text: "Your Path to Wellness" (40px SemiBold, white)
- Bottom-left eyebrow: "HOW IT WORKS" (12px SemiBold, white, uppercase)
- Decorative elements: orange star character (bottom-left), teal creature (top-right), colored ribbon/wave (center)

**Right — steps (flex-1, 556px tall, padding 64px):**
4 rows `flex gap-8 items-center`, evenly spaced:
- Step number: 72px SemiBold, `#67CDCD`, tracking -2.16px, 90px wide
- Content: title (20px Medium, `#0D0D0D`) + description (16px Regular, `#494947`)
- Steps: 01 Tell us what you need / 02 Explore specialists / 03 Choose the right fit / 04 Book your session

---

### 5. Ticker Section (1440×287, bg: `#F6F6F5`)

**Layout:** `flex items-center justify-center p-20`

**Inner pill:** `bg-[#67CDCD]` rounded-24px, 127px tall, `overflow-hidden`
- Text items: "Nutritionist", "Psychologist", "Therapist", "Wellness Coach", etc.
- Separator: small circle dot between items
- Font: 52px Medium, white
- Gradient fade on left/right edges: `linear-gradient(90deg, #67CDCD 0%, transparent 15%, transparent 85%, #67CDCD 100%)`
- CSS marquee animation: `@keyframes ticker` scrolling left infinitely

---

### 6. Specialists Section (1440×962, bg: `#013D47`)

**Layout:** `flex flex-col gap-12 px-20 py-[120px]`

**Header row:** `flex items-end justify-between`
- Left: eyebrow "EXPERTS YOU CAN TRUST" (`#FB652B`) + H2 "Top Rated Specialists" (white)
- Right: "→ View All →" button (white border pill, 40px tall)
- Decorative: teal heart character (top-right area)

**Cards row:** horizontally scrollable `overflow-x-auto`, no scrollbar
4 visible cards, gap 16px. Each `CardSpecialist` (308px wide, white, rounded-24px, p-2):
- Photo area (290px tall, rounded-16px, `overflow-hidden`)
  - Consultation type badge(s): white pill, 14px Regular (In person / Online)
- Content area (px-3, pb-2):
  - Name: 20px Medium, black
  - Specialties row: 12px Regular, `rgba(13,13,13,0.65)`, separator dot
  - Bio: 14px Regular, `rgba(13,13,13,0.7)`, 2-line clamp
  - Rating: gold star + "4.9" (Medium) + "(1.2K reviews)" (faded)
- Button area: "View Profile" — orange border pill, 40px, full width

**Progress + navigation row:**
- Progress bar: full-width minus 92px, 8px tall, `bg-white/10`, active segment white, rounded
- Navigation: 2 circle buttons (40px, white border, arrow icons)

---

### 7. Testimonials Section (1440×776, bg: `#F6F6F5`)

**Layout:** `flex flex-col gap-12 px-20 py-[120px]`

**Header row:** `flex items-end justify-between`
- Left: eyebrow "TESTIMONIALS" (`#FB652B`) + H2 "Real People, Real Result" (`#013D47`)
- Right: 18px Regular body text `#494947`, 278px wide

**Cards area:** `flex flex-col gap-6`
- Row 1: 5 cards, `flex gap-6 justify-center`
- Row 2: 6 cards (offset), `flex gap-6 justify-center`

Each `CardTestimonials` (308px wide, white, rounded-24px, p-5):
- Header row: avatar (56×56 circle) + name (20px Medium) + 5 stars + rating score
- Review text: 14px Regular, `#494947`, 3-line clamp

**Background:** large decorative "R" watermark shape (beige/cream, centered behind content)

---

### 8. CTA Section (1440×844, bg: `#F6F6F5`)

**Layout:** `flex items-center justify-center px-20 py-40 relative`

**Background card:** 1280×524, rounded-40px — sunset sky photo, `object-cover`

**Centered glass panel:** `position: absolute`, centered
- `bg-white/20 rounded-3xl px-14 py-8 flex flex-col gap-12 items-center`
- H2: "Ready to take the first step?" — 40px SemiBold `#013D47`, centered
- Body: 18px Regular `rgba(13,13,13,0.8)`, centered, 437px wide
- CTA button: `#FB652B` pill, 56px tall, "Find My Specialist", 16px Medium white, px-8

**Decorative elements (absolute):**
- White heart character (top-left area of card)
- Teal blob character (right area of card)
- Orange star character (left side)

---

### 9. Footer (1440×737, bg: `#013D47`)

**Layout:** `flex flex-col gap-16 pb-10 pt-16 px-20`

**Top section:** `flex gap-[120px] items-start`
- Left (494px): "Heading" (24px Medium, white) + lorem body text (16px Regular, white/80)
- Right (flex, space-between): 3 link columns
  - Each column: heading (24px Medium, white) + 5 links (16px Regular, white/80)

**Logo area:** `flex flex-col gap-8`
- Large "Rezolvus" logotype image — full width, aspect ratio 115/26 (`~4.4:1`)
- Bottom row: `flex justify-between`
  - Left: "2026 Lorem ipsum..." (16px Regular, white/80)
  - Right: legal text (16px Regular, white/80)

---

## Image Assets

All images exported from Figma (URLs valid for 7 days from 2026-06-10):

| Asset | Usage | URL suffix (figma MCP) |
|---|---|---|
| Hero background photo | Hero bg | `97df02e4-...` |
| Hero overlay gradient | Hero overlay | `25426b0f-...` |
| Logo (nav) | Header | `497f5b92-...` |
| Logo (footer big) | Footer | `ddaaf6de-...` |
| Specialist photos (×4) | Specialist cards | `aa48783f`, `09cb14f5`, `40f9f898`, `6ca1b83f` |
| How-it-works woman photo | Section 4 | `7cc736cb-...` |
| CTA sunset photo | Section 8 | `19a87ce0-...` |
| Avatar circles (×3) | Rating strip | `9e004ecf`, `51697e96`, `e31581f4` |
| Testimonial avatar | Testimonial cards | `33649c94-...` |
| Area card illustrations (×6) | Health area cards | Various |
| Decorative characters | Various sections | Various |

**Action required:** Download and save these to `public/images/` before Figma URLs expire.

---

## Key Implementation Notes

1. **Tomato Grotesk font:** Define `@font-face` in `globals.css`. Font files must be placed in `public/fonts/`. If unavailable, Inter renders as fallback. Use `font-family: 'Tomato Grotesk', Inter, sans-serif` throughout.

2. **Ticker animation:** Use `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` with `animation: marquee 20s linear infinite`. Duplicate content for seamless loop.

3. **Specialist cards:** Horizontal scrollable with `overflow-x-auto scrollbar-none`. No JS required for the static display.

4. **Hero positioning:** The nav, headline, search bar, and rating strip are all `position: absolute` within the 780px hero. Exact positions from Figma: nav y=16, headline y=236, search y=564, rating y=700.

5. **Tailwind v4:** Uses `@import "tailwindcss"` and `@theme inline` syntax. Custom colors and font defined in `@theme` block in `globals.css`.

6. **Next.js Image:** Use `<Image>` component from `next/image` for all photos to get automatic optimization. Use `<img>` for decorative/SVG assets.

7. **Sections background:** The hero section `#F6F6F5` (off-white) is NOT pure white — it's a warm off-white matching Figma's Grayscale/050.

---

## Out of Scope

- Mobile/responsive design (Figma only shows desktop 1440px)
- Actual specialist/testimonial data (placeholder content from Figma used)
- Functional dropdown/search behavior
- Specialist carousel interactivity (prev/next buttons will be visual only)
- Footer link targets
