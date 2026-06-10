@AGENTS.md

# Rezolvus — Project Guide for Claude Agents

## Stack

- **Next.js 16.2.9** — App Router, Server Components by default. Read `node_modules/next/dist/docs/` before touching routing, fonts, or images.
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (NOT v3 config). Custom tokens defined in `@theme inline` block in `app/globals.css`.

## Commands

```bash
npm run dev    # dev server → http://localhost:3000
npm run build  # production build (run before committing)
npm run lint   # ESLint
```

Always run `npm run build` before marking work done. TypeScript errors fail the build.

## Project Structure

```
app/
  page.tsx                    ← homepage — assembles all sections
  layout.tsx                  ← root layout, Inter font, metadata
  globals.css                 ← Tailwind v4, @font-face, CSS tokens, animations
  components/
    Header.tsx                ← frosted glass nav pill (used inside Hero)
    sections/
      Hero.tsx                ← hero section (780px, bg photo + overlay)
      FeaturesSection.tsx     ← "Your Well-Being" + 3 feature cards
      HealthAreasSection.tsx  ← dark teal bg, 6 area cards
      HowItWorksSection.tsx   ← photo card + 4 numbered steps
      TickerSection.tsx       ← animated marquee on teal pill
      SpecialistsSection.tsx  ← dark bg, horizontal card row
      TestimonialsSection.tsx ← two rows of testimonial cards
      CTASection.tsx          ← sunset photo + glass CTA panel
      Footer.tsx              ← dark bg, nav columns, large logo

public/
  images/                     ← all Figma assets (photos as .jpg, vectors as .svg)
  fonts/                      ← place TomatoGrotesk-*.woff2 here to activate brand font
```

## Design System

### Colors (Tailwind tokens from `@theme inline`)

| Token class         | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `bg-cold-dark`      | `#013D47` | Dark section bg, icon bg           |
| `bg-cold-light`     | `#67CDCD` | Ticker bg, step numbers, accents   |
| `bg-warm`           | `#FB652B` | CTA buttons, eyebrow labels        |
| `bg-section`        | `#F6F6F5` | Light section backgrounds          |
| `bg-card-bg`        | `#EDECEC` | Area card backgrounds              |
| `text-body`         | `#494947` | Body text                          |
| `text-near-black`   | `#0D0D0D` | Headings                           |

You can also use arbitrary values: `bg-[#013D47]`, `text-[#FB652B]` etc.

### Typography

Font: **Tomato Grotesk** (commercial — woff2 files go in `public/fonts/`). Falls back to **Inter** (loaded via `next/font/google`).

| Style         | Size  | Weight     | Line-height | Tracking   |
|---------------|-------|------------|-------------|------------|
| Eyebrow       | 12px  | SemiBold   | 24px        | normal     |
| H1            | 64px  | Medium     | 80px        | -1.92px    |
| H2            | 40px  | SemiBold   | 48px        | -0.8px     |
| H5 / card title | 20px | Medium   | 24px        | normal     |
| Body L        | 16px  | Regular    | 24px        | normal     |
| Body M        | 14px  | Regular    | 20px        | normal     |
| Body S        | 12px  | Regular    | 20px        | normal     |

### Spacing

- Section horizontal padding: `px-20` (80px)
- Section vertical padding: `py-[120px]` (most sections)
- Card gap: `gap-4` (16px) standard, `gap-6` (24px) testimonials
- Card border-radius: `rounded-[24px]` standard

### Animations

`@keyframes marquee` defined in `globals.css` — used by `TickerSection` as:
```css
animation: marquee 25s linear infinite
```

### Custom Utilities

`.no-scrollbar` — defined in `globals.css`, used on SpecialistsSection horizontal scroll.

## Images — Critical Rule

All Figma vector exports are **SVG content**. They are served from `public/images/` with `.svg` extension. Do **not** use `.png` for icons, illustrations, or logos — Next.js serves static files with content-type by extension, so `.png` SVGs are rejected by browsers.

| Type | Extension | Examples |
|---|---|---|
| Photos (actual raster) | `.jpg` | hero-bg, specialist-1..4, cta-bg, how-it-works-photo |
| Avatars (actual raster) | `.png` | avatar-1..3 |
| Everything else (SVG) | `.svg` | all icons, area illustrations, logos, decoratives |

## Figma Source

- **File:** `HKVT4QYMJGDlpLpKLOCKJB`
- **Homepage node:** `1:334`
- **URL:** `https://www.figma.com/design/HKVT4QYMJGDlpLpKLOCKJB/REZOLVUS-LIUDAS?node-id=1-334`
- **Spec:** `docs/superpowers/specs/2026-06-10-rezolvus-homepage-design.md`
- **Plan:** `docs/superpowers/plans/2026-06-10-rezolvus-homepage.md`

## Known Limitations

- **No mobile responsive** — design is desktop-only (1440px). Do not add breakpoints unless explicitly asked.
- **Static placeholder content** — specialist names, testimonial text, footer links are placeholders from Figma.
- **No interactivity** — search dropdowns, specialist carousel, nav links are visual only.
- **Font files not included** — Tomato Grotesk is a commercial font (Tomatype). Add woff2 files to `public/fonts/` to activate. Inter renders as fallback.
- **Figma image URLs expire** — assets were exported 2026-06-10, expire 2026-06-17. Files already saved to `public/images/`.
