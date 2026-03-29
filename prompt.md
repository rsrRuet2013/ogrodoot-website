# Team Ogrodoot — Website Creation Prompt

> **Stack:** Next.js 14 (App Router) · TypeScript · Three.js / React Three Fiber · Framer Motion · Tailwind CSS · shadcn/ui · GSAP (ScrollTrigger)

---

## 🎨 Design Identity

### Theme & Aesthetic
- **Core Concept:** Retro-futuristic Mars exploration — raw scientific ambition meets cutting-edge engineering. The aesthetic should feel like a NASA operations dashboard crossed with a cinematic sci-fi film.
- **Mood:** Dark, atmospheric, awe-inspiring. Every scroll should feel like descending into a mission control room.
- **NOT generic:** Avoid purple gradients, generic glassmorphism, or cookie-cutter dark mode. This is a space team from Bangladesh — the design must feel unique, mission-driven, and proud.

### Color Palette (CSS Variables)
```css
--mars-red:       #C1440E;   /* Primary accent — rover dust, heat */
--mars-orange:    #E8651A;   /* Secondary accent — Martian horizon glow */
--deep-space:     #04060D;   /* Base background */
--space-navy:     #080F1E;   /* Card/section backgrounds */
--crater-gray:    #1A2035;   /* Borders, dividers */
--star-white:     #EEF0F8;   /* Primary text */
--muted-nebula:   #6B7A99;   /* Secondary/muted text */
--glow-amber:     #FF8C42;   /* Hover glows, highlights */
--hud-teal:       #2BFFCB;   /* Data readouts, tech labels */
--ruet-blue:      #1A3A6B;   /* RUET identity accent */
```

### Typography
```
Display / Hero:    "Orbitron" (Google Fonts) — geometric, space-tech feel
Section Headers:   "Exo 2" — modern engineered look, readable at scale
Body Text:         "Space Grotesk" — clean but with personality
Data / HUD Labels: "JetBrains Mono" — monospace for telemetry-style data
Accent / Callouts: "Rajdhani" — echoes South Asian identity subtly
```

### Visual Motifs
- Thin horizontal scan lines across hero sections (CRT monitor effect at low opacity)
- Noise/grain texture overlay on all dark backgrounds (subtle, ~4% opacity)
- Dashed orbit-ring decorations around 3D models and section titles
- Mars dust particle systems (Three.js Points geometry)
- HUD-style corner brackets on cards and image frames
- Red/orange gradient glow halos behind key headings
- Grid lines (like mission coordinates) subtly visible in hero backgrounds
- Animated "telemetry" number counters for stats

---

## 📁 Project Structure

```
/app
  /                     → Landing Page (Home)
  /about                → About the Team
  /achievements         → Competition History & Awards
  /team                 → Full Team Directory
  /rover                → Rover Showcase (3D heavy)
  /missions             → URC 2026 & Past Missions
  /sponsor              → Sponsorship Packages
  /contact              → Contact Page
/components
  /3d                   → Three.js / R3F scene components
  /ui                   → shadcn/ui overrides + custom primitives
  /sections             → Page-specific section components
  /layout               → Navbar, Footer, PageWrapper
/lib
  /animations.ts        → Shared Framer Motion variants
  /data                 → Team data, achievements, costs (typed JSON)
/public
  /models               → .glb rover models, Mars sphere model
  /assets               → Logo, team photos, sub-team photos
  /textures             → Mars surface texture maps for Three.js
```

---

## 🌍 Page-by-Page Specification

---

### PAGE 1 — Landing / Home (`/`)

**Purpose:** Instant wow-factor. Hook visitors in the first 5 seconds with a cinematic Mars landing experience.

#### Section 1.1 — Hero (Full Viewport)
- **Background:** Animated Three.js canvas filling the full viewport
  - Starfield: 4000 randomized `Points` with slow parallax drift on mouse move
  - Mars sphere: Slowly rotating sphere with high-res NASA texture map, visible in lower-right quadrant, partially clipped by viewport edge (feels massive and real)
  - Ambient dust particles: 200 slow-drifting orange Points simulating Mars atmosphere
- **Foreground Content (centered, z-index above canvas):**
  - Small badge: `[RUET ROVER TEAM · EST. 2017]` in `JetBrains Mono`, hud-teal color, blinking cursor animation
  - Team name: `TEAM OGRODOOT` in Orbitron, ~96px, white, with a staggered letter-by-letter entrance using Framer Motion (`staggerChildren: 0.05`)
  - Subtitle: `"Rajshahi University of Engineering & Technology"` in Exo 2, muted color
  - Tagline: `"Designing the Future of Mars Exploration — from Bangladesh to the Universe"` in Space Grotesk, italic
  - Two CTA buttons:
    - Primary: `[  EXPLORE THE ROVER  ]` — mars-red fill, hover lifts + glows
    - Secondary: `[  BECOME A SPONSOR  ]` — outlined, hover fills with crater-gray
  - Scroll indicator: Animated downward chevron with `scroll` label in mono font
- **Entrance Animation:**
  - Page load → black screen → "SYSTEM INITIALIZING..." text in center (400ms) → fade to Mars scene
  - Hero text fades in sequentially with 200ms delay each element
  - Subtle HUD corner brackets animate inward around the hero content block

#### Section 1.2 — Mission Statement Strip
- Full-width dark band with mars-red left border
- Headline (Exo 2, large): `"Inspiring Innovation. Building the Future."`
- Two-column layout: Mission paragraph left, Vision paragraph right
- Animated divider line that draws itself on scroll (SVG stroke-dashoffset animation via GSAP ScrollTrigger)

#### Section 1.3 — Live Stats / Achievements Counter
- 4 stat cards in a grid:
  - `8+` — Years of Innovation (since 2017)
  - `5` — International Competitions
  - `#11` — Global Rank IRDC 2023
  - `#1` — In Bangladesh IRDC 2023
- Each number uses a `useCountUp()` hook that triggers when scrolled into view
- Cards have HUD bracket styling, subtle scan-line background, glow on hover
- Data labels in JetBrains Mono, hud-teal

#### Section 1.4 — Rover 3D Showcase Preview
- React Three Fiber scene: Current rover model (.glb) rendered with:
  - Orbit controls (drag to rotate) — auto-rotates when idle
  - Point lighting from above-left (warm amber) + rim light (hud-teal) for depth
  - Environment map: HDRI of dark studio/space
  - Rover casts shadow on a barely-visible Mars terrain plane
- Left side: Text block with title `"OGRODOOT MK-IV"` (or current name), key specs as HUD data rows
- CTA: `"Full Rover Showcase →"` links to `/rover`
- Section title enters with a horizontal slide + fade on scroll

#### Section 1.5 — Competitions Timeline Strip
- Horizontal scroll section (mouse wheel hijacked for horizontal movement, or drag)
- Each competition is a "card" in a timeline rail:
  - IRC 2018 → ERC 2019 → IRDC 2023 → IRDC 2025 → IRC 2025 → **URC 2026**
  - Cards show: competition name, flag/location, result badge (rank + color coded gold/silver)
  - URC 2026 card pulses with a future-glow animation — "UPCOMING" badge
- Timeline line is animated (draws from left to right on scroll entry)

#### Section 1.6 — Sub-Teams Teaser Grid
- Section title: `"THE CREW"` in Orbitron
- 6 cards in a 3×2 grid (mobile: 2×3), one per sub-team:
  1. Mechanical Design & Fabrication
  2. Electrical
  3. Software & Autonomous
  4. Communication
  5. Science
  6. Media & Logistics
- Each card: sub-team photo as background (dark overlay), sub-team name, brief 1-line role
- Hover: overlay lifts, photo brightens, a mars-red bottom border slides in
- Click: navigates to `/team#mechanical` etc.
- Entrance: cards stagger-fade in from bottom (`staggerChildren: 0.1`)

#### Section 1.7 — Sponsorship CTA (Full-Width Banner)
- Dark section with a faint Mars terrain texture background
- Large text: `"Join Us on the Mission"`
- Subtext: `"Partner with Bangladesh's leading Mars rover team and gain global visibility."`
- Three package previews: Silver · Gold · Platinum in a row (icon + name + price)
- Big CTA: `"View Sponsorship Packages →"`
- Subtle animated orbit ring decorates the background

#### Section 1.8 — Footer
*(See Footer spec below)*

---

### PAGE 2 — About (`/about`)

**Purpose:** Tell the team's story — history, advisors, mission, vision.

#### Sections:
1. **Page Hero:** Full-width, team photo as background (parallax on scroll), headline overlay: `"A ROVER TEAM OF RUET"` in Orbitron
2. **Origin Story:** Two-column — left: decorative timeline from 2017 to 2026 (vertical line with year nodes), right: narrative text about the team's founding and journey
3. **Advisor Panel:**
   - Dr. Md. Rokunuzzaman — Chief Advisor, Professor of Mechanical Engineering, RUET
   - Md. Firoz Ali — Advisor, Head & Associate Professor of Mechatronics Engineering, RUET
   - Each: professional photo in HUD-frame, name in Exo 2, title in mono, hover = subtle glow
4. **Mission & Vision Cards:** Two side-by-side cards with mars-red accent lines, icon (rocket / telescope SVG), headline, paragraph
5. **University Section:** RUET logo, location info, link to RUET website

---

### PAGE 3 — Achievements (`/achievements`)

**Purpose:** Showcase competition history with pride and visual impact.

#### Sections:
1. **Page Hero:** Animated particle effect (like celebration sparks), headline `"OUR ACHIEVEMENTS"`
2. **Achievement Cards (vertical timeline layout):**
   - Each competition = full-width card with:
     - Left: competition logo / image, year badge
     - Right: competition name, location, result headline (e.g., "6th Place"), description paragraph
     - Result badge: medal icon + rank, color-coded (gold/silver/bronze-teal)
   - Cards alternate left/right image placement
   - Competitions:
     - `01` Indian Rover Challenge 2018 — **6th Place**
     - `02` European Rover Challenge 2019 — **27th Global**
     - `03` IRDC 2023 — **11th Global · 1st in Bangladesh**
     - `04` IRDC 2025 — **Semi-Finalist**
     - `05` IRC 2025 — **Finalist**
     - `06` URC 2026 — **UPCOMING** (pulsing future badge)
3. **Stats Banner:** Repeat of counter stats from Home
4. **URC 2026 Detail:** Dedicated sub-section explaining the competition, timeline infographic (mirroring the PDF's competition timeline)

---

### PAGE 4 — Team (`/team`)

**Purpose:** Introduce every member with personality. Browsable by sub-team.

#### Sections:
1. **Page Hero:** Dark, with animated floating name particles in background
2. **Leadership Row:** Three featured cards side by side:
   - Team Lead — Ariful Islam Riad
   - Co-Lead
   - Manager — S M Al Meraz
   - Each: headshot in circular HUD frame with orbit-ring animation, name, role, contact icon links
3. **Sub-Team Filter Tabs:** Sticky tab bar with 6 tabs (+ "All"), click filters the grid below — smooth layout animation via Framer Motion `AnimatePresence` + `layout` prop
4. **Member Grid:** 4-column card grid (mobile: 2 col)
   - Each card: photo, name, role/designation, sub-team badge (colored by team)
   - Hover: card lifts, name highlight in team color, subtle glitch effect on photo
5. **Sub-Team Spotlights:** After the grid, 6 spotlight sections (one per sub-team):
   - Anchor IDs: `#mechanical`, `#electrical`, `#software`, `#communication`, `#science`, `#media`
   - Each: Sub-team group photo, sub-team lead card, team color accent, brief paragraph on their role in the rover
   - Sub-team color mapping:
     - Mechanical: mars-red
     - Electrical: amber
     - Software: hud-teal
     - Communication: ruet-blue
     - Science: lime-green (science = nature)
     - Media: muted purple

---

### PAGE 5 — Rover Showcase (`/rover`)

**Purpose:** The most technically impressive page — a dedicated 3D viewer + rover specs.

#### Sections:
1. **Full-Screen 3D Viewer:**
   - React Three Fiber canvas fills entire screen
   - Rover model(s) centered, high-quality lighting rig:
     - Directional light (warm) = sun analog
     - Point light (orange-red) = Mars atmosphere fill
     - Rim light (cool blue) = depth separation
     - Shadow plane: Mars terrain texture (low poly or texture-plane)
   - Controls: OrbitControls with damping, auto-rotate when idle, reset button
   - UI overlay (Framer Motion, bottom HUD bar):
     - Model switcher buttons if multiple rover models
     - Rotation speed control
     - Exploded view toggle (if possible with model structure)
   - Top-left: Team logo watermark
   - Bottom-right: `[DRAG TO ROTATE]` instruction badge

2. **Specs Panel (slides in from right, triggered by button):**
   - Dark side drawer with HUD aesthetic
   - Rover name, iteration
   - Spec table in JetBrains Mono: Weight, Dimensions, DOF (Arm), Drive System, Power, Cameras, etc.
   - Close button to return to full 3D view

3. **Design Philosophy Section (below fold):**
   - Design concept image (from proposal)
   - Text: engineering decisions, key innovations, sub-systems overview
   - Four feature cards: Mobility · Arm · Science Payload · Autonomy

4. **Mission Capabilities:**
   - 4-column icon grid: Autonomous Navigation · Scientific Analysis · Equipment Servicing · Retrieval & Delivery
   - Each matches URC 2026 mission categories

---

### PAGE 6 — Missions (`/missions`)

**Purpose:** Deep dive into URC 2026 and past competition context.

#### Sections:
1. **URC 2026 Hero:** Countdown timer to May 27, 2026 (live countdown component), background: Mars Desert Research Station imagery
2. **About URC:** 2-col layout — left: URC description, right: quick facts (100+ teams, 15+ countries, 36–40 qualify onsite)
3. **Competition Timeline Infographic:** Vertical animated timeline:
   - Oct 1, 2025 — Registration Opens ✅
   - Oct 29, 2025 — Registration Ends ✅
   - Dec 3, 2025 — PDR Submission ✅
   - Feb 27, 2026 — SAR Submission ✅
   - **May 27–30, 2026 — FINALS** 🚀 (pulsing)
4. **Mission Categories:** 4 detailed cards with icons (from URC rulebook categories)
5. **Past Missions:** Condensed version of achievements timeline

---

### PAGE 7 — Sponsor (`/sponsor`)

**Purpose:** Convert potential sponsors. Must be professional, clear, and persuasive.

#### Sections:
1. **Hero:** Headline `"Partner With Us"`, tagline, mars-red accent, team/rover image background
2. **Why Sponsor? — Benefits Grid (6 cards):**
   - Enhanced Brand Visibility
   - Talent Acquisition & Employer Branding
   - Exploring Innovation & Technology
   - Corporate Social Responsibility
   - Networking & Relationship Building
   - Demonstrate Technological Expertise
   - Each card: icon, bold title, description — card glows on hover
3. **Sponsorship Packages (3 tiers):**
   - Visual hierarchy: Silver (left) < Gold (center, slightly elevated) < Platinum (right, most prominent)
   - Each package card:
     - Tier name in Orbitron (Silver/Gold/Platinum colored)
     - Price in BDT (large, bold)
     - Feature checklist with animated checkmark icons
     - CTA button: `"Choose This Package"`
   - Platinum card has a special shimmer/glow animation
   - Package comparison table below the cards
4. **Cost Breakdown (Transparent):**
   - Animated table (numbers count up on scroll):
     - Rover: BDT 3,00,000
     - Rover Transportation: BDT 3,00,000
     - Travel (5 members): BDT 10,00,000
     - Accommodation: BDT 2,00,000
     - Food: BDT 60,000
     - Miscellaneous: BDT 40,000
     - **Total: BDT 19,00,000**
   - Donut chart (Chart.js or Recharts) showing cost breakdown visually
5. **"Let's Make Bangladesh Proud" CTA:**
   - Full-width section, team photo background, big CTA button: `"Contact Us to Sponsor"`

---

### PAGE 8 — Contact (`/contact`)

**Purpose:** Easy, trustworthy contact experience.

#### Sections:
1. **Page Hero:** Simple, clean — headline `"GET IN TOUCH"`, subtitle
2. **Two-Column Layout:**
   - **Left: Contact Info Panel**
     - Ariful Islam Riad (Lead): +880 1753-868780
     - S M Al Meraz (Manager): meraz13263@gmail.com / +880 1761-639007
     - Team Email: teamogrodoot.ruet.bd@gmail.com
     - Social links: Facebook, LinkedIn (icon + link)
     - Website: rsr-ruet.org/ogrodoot
     - Location: RUET, Rajshahi-6204, Bangladesh
     - Embedded mini-map (Google Maps iframe, styled to match dark theme)
   - **Right: Contact Form**
     - Fields: Name, Organization, Email, Phone, Inquiry Type (dropdown: Sponsorship / Media / Collaboration / Other), Message
     - Submit button: `"Send Transmission"` — hover fires a brief particle burst
     - Form validation with inline error states
     - Success state: HUD-style `"MESSAGE RECEIVED"` confirmation animation
3. **Social Strip:** Large icon links to all social platforms

---

## 🧩 Global Components

### Navbar
- Sticky, transparent on hero, transitions to `space-navy/90%` with blur (`backdrop-blur`) on scroll
- Left: Team logo (SVG, animates on hover)
- Center: Navigation links with animated active underline (mars-red, slides between items)
- Right: `"Sponsor Us"` button — mars-red fill, always visible CTA
- Mobile: Hamburger → full-screen overlay menu with staggered link entries
- Links: Home · About · Team · Rover · Achievements · Missions · Sponsor · Contact

### Footer
- Dark section with grain texture
- 4-column grid:
  1. Logo + tagline + social icons
  2. Quick Links
  3. Contact info
  4. Competitions summary
- Bottom bar: `"© 2025 Team Ogrodoot · RUET · All Rights Reserved"` + RUET logo
- Animated Mars horizon line across the top of the footer (SVG wave in mars-red/orange)

### Page Transition
- Framer Motion `AnimatePresence` wrapping all pages
- Each page entry: brief black overlay slides out upward (like a curtain raise)
- Each page exit: content fades to black before route change

### Loading Screen
- Full-screen black, centered team logo
- Below logo: `INITIALIZING MISSION SYSTEMS...` in JetBrains Mono
- Animated loading bar (mars-red, fills left to right)
- Percentage counter: 0% → 100%
- Dissolves into the page when assets are ready

### Custom Cursor (Desktop Only)
- Small circle cursor that follows mouse with slight lag (Framer Motion `useSpring`)
- Expands into a larger ring on hovering links/buttons
- Turns mars-red on CTAs

---

## 🎞️ Animation System

### Framer Motion Variants (defined in `/lib/animations.ts`)
```typescript
// Fade up — standard section entry
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Card hover lift
export const cardHover = {
  rest: { y: 0, boxShadow: "0 0 0px #C1440E00" },
  hover: { y: -8, boxShadow: "0 20px 60px #C1440E40" }
}

// HUD bracket reveal (clip-path animation)
export const hudReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8 } }
}

// Glitch effect on image hover
export const glitch = {
  rest: { x: 0, filter: "none" },
  hover: {
    x: [0, -2, 2, -1, 0],
    filter: ["none", "hue-rotate(90deg)", "none"],
    transition: { duration: 0.3 }
  }
}
```

### GSAP ScrollTrigger Uses
- Hero text parallax on scroll
- SVG line draw animations (timeline, dividers)
- Horizontal scroll section (competitions timeline)
- Pinned 3D rover section on `/rover`

### Three.js / R3F Notes
- Use `@react-three/fiber` + `@react-three/drei`
- Use `Suspense` + `Html` from drei for loading fallback inside canvas
- Model loading: `useGLTF` hook, preload at route level
- Performance: Use `instancedMesh` for particle systems, limit shadows to key objects
- Responsive: Adjust camera FOV and model scale based on viewport width

---

## 📐 Responsive Breakpoints

```
Mobile:    < 640px   → 1 column grids, stacked layouts, simplified 3D (reduced particles)
Tablet:    640–1024px → 2 column grids, simplified hero
Desktop:   > 1024px  → Full experience
Large:     > 1440px  → Max-width container, generous spacing
```

- On mobile/tablet: disable custom cursor, reduce Three.js particle count by 70%, use static image fallback option for very low-end devices
- Navigation collapses to hamburger below 768px

---

## 🗃️ Data Structure (`/lib/data/`)

### `team.ts`
```typescript
type SubTeam = "mechanical" | "electrical" | "software" | "communication" | "science" | "media"

interface TeamMember {
  id: string
  name: string
  role: string
  subTeam: SubTeam
  isLead: boolean
  photoUrl: string
  linkedin?: string
}

interface Leadership {
  lead: TeamMember
  coLead: TeamMember
  manager: TeamMember
}
```

### `achievements.ts`
```typescript
interface Achievement {
  id: string
  competition: string
  year: number
  location: string
  result: string
  rank?: number
  description: string
  imageUrl: string
  isUpcoming?: boolean
}
```

### `sponsorship.ts`
```typescript
interface SponsorPackage {
  tier: "silver" | "gold" | "platinum"
  priceINR: number
  priceBDT: number // 5 lac / 10 lac / 15 lac
  benefits: string[]
  highlighted?: boolean
}

interface CostItem {
  label: string
  quantity?: number
  costPerUnit?: number
  totalBDT: number
}
```

---

## 🛠️ Technical Setup

### Next.js Config (`next.config.ts`)
```typescript
const config = {
  experimental: { optimizePackageImports: ["three", "framer-motion"] },
  images: { formats: ["image/avif", "image/webp"] },
}
```

### Tailwind Config
- Extend colors with all CSS variables above
- Add custom animation: `pulse-glow`, `scan-line`, `orbit-spin`
- Custom font family entries for Orbitron, Exo 2, Space Grotesk, JetBrains Mono

### shadcn/ui Customization
- Override default `card`, `badge`, `button`, `dialog`, `tabs`, `tooltip` to match Mars theme
- Custom theme: dark base, mars-red primary, hud-teal for focus rings

### Performance Targets
- Lighthouse score: > 85 on mobile, > 95 on desktop
- Use `next/image` for all photos (auto WebP, lazy load, blur placeholder)
- Dynamic import Three.js canvas components with `ssr: false`
- Font: `next/font` with preload
- 3D models: Compress with `gltf-pipeline`, target < 5MB per model

---

## 📦 Key npm Packages

```bash
# Core
npx create-next-app@latest ogrodoot --typescript --tailwind --app

# 3D
npm i three @react-three/fiber @react-three/drei

# Animation
npm i framer-motion gsap @gsap/react

# UI
npx shadcn@latest init
npm i lucide-react

# Utilities
npm i clsx tailwind-merge
npm i @types/three

# Optional — charts for cost breakdown
npm i recharts
```

---

## 🖼️ Asset Checklist (Required from Team)

| Asset | Format | Usage |
|---|---|---|
| Team Logo | SVG + PNG (transparent) | Navbar, footer, watermark |
| Full Team Photo | JPG/WebP, ≥2000px wide | About hero, footer |
| Sub-team photos (×6) | JPG/WebP, ≥1200px | Team page spotlights |
| Lead photo (Ariful Islam Riad) | JPG/WebP, square | Leadership card |
| Co-Lead photo | JPG/WebP, square | Leadership card |
| Manager photo (S M Al Meraz) | JPG/WebP, square | Leadership card |
| Sub-team lead photos (×6) | JPG/WebP, square | Team lead cards |
| Individual member photos | JPG/WebP, square | Member grid |
| Rover 3D model(s) | .glb (binary GLTF) | Rover page, home |
| Mars texture maps | JPG/EXR | Three.js sphere |
| Competition photos | JPG/WebP | Achievements |
| RUET logo | SVG/PNG | About, footer |

---

## 🚀 Development Phases

| Phase | Deliverable | Priority |
|---|---|---|
| 1 | Setup, design system, layout components, navbar, footer | Critical |
| 2 | Home page (hero, stats, sections 1.1–1.7) | Critical |
| 3 | Rover page (3D viewer, specs) | Critical |
| 4 | Team page (directory + sub-team spotlights) | High |
| 5 | Achievements + Missions pages | High |
| 6 | Sponsor page | High |
| 7 | About + Contact pages | Medium |
| 8 | Animations polish, performance optimization, SEO | Medium |
| 9 | Mobile responsiveness pass, accessibility audit | Medium |
| 10 | Deployment (Vercel), domain, analytics | Low |

---

## 🔍 SEO & Meta

```typescript
// app/layout.tsx
export const metadata = {
  title: "Team Ogrodoot | RUET Mars Rover Team",
  description: "Bangladesh's leading Mars rover team from Rajshahi University of Engineering & Technology, competing in URC 2026.",
  keywords: ["mars rover", "RUET", "Team Ogrodoot", "URC 2026", "Bangladesh robotics"],
  openGraph: {
    title: "Team Ogrodoot — RUET Rover Team",
    description: "Designing the future of Mars exploration from Bangladesh.",
    images: ["/assets/og-image.jpg"],
  }
}
```

- Each page gets its own `generateMetadata()` export
- Structured data (JSON-LD) for organization schema
- Sitemap auto-generated via `next-sitemap`

---

*Prompt Version: 1.0 · For: Team Ogrodoot · Stack: Next.js + Three.js + Framer Motion*