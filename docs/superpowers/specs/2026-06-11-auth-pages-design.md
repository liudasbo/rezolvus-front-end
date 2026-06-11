# Auth Pages Design Spec
**Date:** 2026-06-11  
**Figma node:** `44:9065` (Sign Up), `44:8891` (Log In), section `44:8890`  
**Figma file:** `HKVT4QYMJGDlpLpKLOCKJB`  
**Routes:** `/sign-up`, `/sign-in`

---

## Scope

Two auth pages: Sign Up and Log In. Forgot password links to `#` — not implemented in this scope. No real backend auth — form submit logs to console and shows brief success state.

---

## Routes

| Route | Component | Description |
|---|---|---|
| `/sign-up` | `SignUpForm` inside `AuthLayout` | Registration form |
| `/sign-in` | `SignInForm` inside `AuthLayout` | Login form |

---

## File Structure

```
app/
  sign-up/
    page.tsx
  sign-in/
    page.tsx
  components/
    auth/
      AuthLayout.tsx
      AuthRoleTabs.tsx
      AuthInput.tsx
      AuthPasswordInput.tsx
      SignUpForm.tsx
      SignInForm.tsx
      SocialLoginButtons.tsx
      AuthDecorativePanel.tsx
```

---

## Layout

### Page Shell
- Full viewport: `min-h-screen w-full`, background `#EDECEC`
- No Header, no Footer — standalone auth layout
- Overflow hidden (decorative elements bleed outside bounds)

### Left White Card
- `position: absolute`, `top: 16px`, `left: 16px`
- `width: 620px`, `height: 748px`, `border-radius: 32px`, `background: white`
- Logo (`/images/logo-nav.svg`, `124×28px`) at `top: 32px`, `left: 40px`, links to `/`
- Form content: `width: 340px`, centered horizontally in card, vertically centered with slight downward offset (`top: calc(50% + 34px)`)

### Right Decorative Panel
- Fills viewport from `left: 636px` to right edge
- Background: gradient (teal-to-cream, see assets)
- Three creature illustrations: orange (top-right), teal blob (center-left), cream heart (bottom-right)
- Noise texture overlay at 8% opacity
- Text block centered vertically:
  - Heading: `40px` SemiBold, `#013D47`, tracking `-0.8px`, leading `48px`
  - Subtitle: `16px` Regular, `#013D47`, leading `24px`
- Pagination dots (3): active `48×8px` pill `#013D47`, inactive `8×8px` circle `rgba(1,61,71,0.25)`

**Copy — Seeking role:**
- Heading: "Find the right specialist without the stress"
- Subtitle: "Discover verified professionals tailored to your personal needs."

**Copy — Specialist role:**
- Heading: "Grow a practice you're genuinely proud of"
- Subtitle: "Reach clients who value your craft — calm tools, no admin chaos."

---

## Components

### `AuthLayout`
Props: `mode: "sign-up" | "sign-in"`

- Renders page shell, left card, right decorative panel
- Manages `role: "seeking" | "specialist"` state (default: `"seeking"`)
- Passes `role` and `setRole` to `AuthRoleTabs` and `AuthDecorativePanel`
- Renders `SignUpForm` or `SignInForm` based on `mode`

### `AuthRoleTabs`
Props: `role`, `setRole`

- Label: "SIGNING AS:" — `14px` Regular, `#013D47`, centered, `mb-[8px]`
- Tab container: `bg-[rgba(13,13,13,0.05)]`, `border border-[#EDECEC]`, `rounded-[12px]`, `p-[4px]`
- Active tab: `bg-white`, `rounded-[8px]`, `px-[24px] py-[8px]`, `14px` Medium `#FB652B`
- Inactive tab: no bg, same padding, `14px` Regular `#676665`
- Tabs: "Seeking" | "Specialist"

### `AuthInput`
Props: `label`, `placeholder`, `value`, `onChange`, `type?`, `error?`

- Label: `14px` Medium `#1C1C1C`, `mb-[4px]`
- Input: `height: 48px`, `rounded-[8px]`, `bg-[rgba(13,13,13,0.05)]`, `px-[16px]`, `14px` Regular, `w-full`
- Placeholder color: `#A3A29F`
- Focus: `outline-none ring-2 ring-[#013D47]/40`
- Error: red ring + error message below in `12px` `#FB652B`

### `AuthPasswordInput`
Props: `label`, `placeholder`, `value`, `onChange`, `helperText?`, `error?`

- Same as `AuthInput` but `type` toggles between `"password"` and `"text"`
- Eye icon button absolutely positioned at right: `16px` from edge, vertically centered
- Icon: inline SVG (eye / eye-off), `20×20px`, color `#A3A29F`
- `aria-label="Show password"` / `"Hide password"`
- Helper text below input: `12px` Regular `#A3A29F` (e.g., "Must be at least 8 characters")

### `SocialLoginButtons`
- Two equal-width buttons side by side, `gap-[16px]`
- Each: `bg-[rgba(13,13,13,0.05)]`, `h-[48px]`, `rounded-[1000px]`, `flex-1`
- Icon (`24×24px`) + label (`16px` Medium `#1C1C1C`)
- Google button: Google "G" icon + "Google"
- Apple button: Apple logo + "Apple"
- `onClick`: `console.log("Google login clicked")` / `"Apple login clicked"`

### `SignUpForm`
State: `email`, `password`, `showPassword`, `errors`, `isLoading`, `isSuccess`

Fields:
- Email input (`AuthInput`)
- Password input (`AuthPasswordInput`, helper: "Must be at least 8 characters")

Buttons:
- "Sign Up" primary button (full width, `bg-[#FB652B]`, `rounded-[1000px]`, `py-[12px]`, `16px` Medium white)
- "or" divider (`16px` Regular `#858482`, centered)
- `SocialLoginButtons`

Below button stack:
- "By creating an account, you agree to our **Terms of Service** & **Policy of Service**" — `12px` Regular `#676665`, links in `#FB652B` Medium → `href="#"`

Navigation:
- "Already have an account? **Log In**" → `<Link href="/sign-in">` (above the fields)

Validation on submit:
- Email: required, must match email regex
- Password: required, min 8 chars
- Errors shown per-field

On success: `isSuccess = true`, show "Account created!" message in place of button. `isLoading` disables button and shows "Signing up…" text.

### `SignInForm`
State: `email`, `password`, `showPassword`, `errors`, `isLoading`, `isSuccess`

Fields:
- Email input (`AuthInput`)
- Password input (`AuthPasswordInput`) + "Forgot password?" link-text to right of helper text → `href="#"`

Buttons:
- "Log In" primary button
- "or" divider
- `SocialLoginButtons`

Below button stack:
- "By continuing, you agree to our **Terms of Service** & **Policy of Service**" — same style as Sign Up

Navigation:
- "Don't have an account? **Sign Up**" → `<Link href="/sign-up">` (above the fields)

Validation: same as Sign Up (password required, no min-length constraint on sign-in).

On success: show "Logged in!" message.

### `AuthDecorativePanel`
Props: `role: "seeking" | "specialist"`

- Renders gradient background image, noise texture overlay
- Three creature images positioned absolutely
- Text block + pagination dots
- Copy switches based on `role` prop

---

## Assets

**Note:** Figma API asset URLs expire after 7 days. During implementation, call `get_design_context` on node `44:9065` again to get fresh download URLs before fetching assets.

Download and save to `public/images/auth/`:

| File | Format | Source variable | Description |
|---|---|---|---|
| `auth-bg-gradient.png` | raster PNG | `imgGroup66` | Right panel gradient background |
| `auth-noise.png` | raster PNG | `imgNoiseTexture` | Noise texture overlay (8% opacity) |
| `auth-creature-teal.png` | raster PNG | `imgBlue` | Teal blob creature (top of right panel) |
| `auth-creature-bg.png` | raster PNG | `imgIllustrationBackgroundContainer` | Illustration bg shape (center) |
| `auth-creature-cream.png` | raster PNG | `imgIllustrationContainer` | Cream heart creature (bottom right) |
| `auth-icon-google.svg` | SVG | `imgGroup` | Google "G" icon for social button |
| `auth-icon-apple.svg` | SVG | `imgVector` | Apple logo icon for social button |

Reuse existing: `/images/logo-nav.svg`

---

## Responsive

| Breakpoint | Behavior |
|---|---|
| `≥ 1280px` | Full split layout: card left, decorative panel right |
| `1024px–1279px` | Decorative panel hides, card left-aligned with full height |
| `768px–1023px` | Single column, card centered, full width minus `32px` margin |
| `< 768px` | Card fills viewport with `16px` horizontal padding, form scrollable |

On mobile: logo stays top-left, role tabs stay visible, right panel hidden entirely.

---

## Accessibility

- All inputs have associated `<label>` elements (via `htmlFor`)
- Error messages linked to inputs via `aria-describedby`
- Password toggle has `aria-label` and `aria-pressed`
- Primary buttons have clear text labels
- Social buttons: text labels present (not icon-only)
- `focus-visible` ring on all interactive elements: `ring-2 ring-[#013D47]/40`
- Form submittable via keyboard (Enter key)

---

## Out of Scope

- Real authentication / API calls
- Forgot password flow (`/forgot-password`) — link goes to `#`
- OAuth integration
- Mobile-first breakpoints below 375px
- Email verification flow
