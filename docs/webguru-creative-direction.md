# Web Guru — Creative Direction & 7-Scene Cinema Blueprint

## 1. Visual & Brand Synthesis

Web Guru stays unmistakably grounded in its warm architectural atelier palette and real four-member digital growth studio positioning—avoiding all generic AI tropes (no purple/indigo gradients, no fake team bios, no fabricated client logos, no `"Google ACO"` terminology).

| Design Token | Hex | Role Across Cinematic Scenes |
| :--- | :--- | :--- |
| **Warm Paper** | `#F6F3EC` | Primary bright gallery ground (Hero Scene 01, Scene 04, subpages) |
| **Linen Stone** | `#ECE7DC` | Tactile secondary card & stage surface |
| **Sand Rule** | `#D6CFC2` | Architectural `1px` hairlines, vertical column dividers, index tracks |
| **Obsidian Ink** | `#161A18` | Primary typography, Full-Screen Menu Overlay, Scene 07 Final Cinema Ground |
| **Atelier Pine** | `#18362F` | Deep emerald showcase polarity shift (Scene 03 Dark Chapters / Scene 05 Process) |
| **Signal Terracotta** | `#D94E28` | Kinetic wipe blocks, active cursors, conversion accents, active chapter ticks |
| **Warm Amber** | `#F3B340` | Secondary telemetry highlight for simulation & ecosystem signals |

**Typography System:**
- Display Headlines: `Bricolage Grotesque` (`font-display`) — bold geometric editorial authority
- Editorial Accent: `Instrument Serif` (`font-serif` italic) — tactile human warmth inside key headline pivots
- Body Copy: `Plus Jakarta Sans` (`font-sans`) — sharp readability at every scale
- Technical Telemetry & Indices: `JetBrains Mono` (`font-mono`) — `[01]` brackets, scene rails, spec bars

---

## 2. Motion Architecture & Responsive Safety

- **Scroll Choreography Engine:** `Lenis` smooth scrolling synced with `gsap.ticker` + `ScrollTrigger` (`SmoothScrollProvider.tsx`), cleanly bypassing smooth scroll override and ScrollTrigger pinning when `prefers-reduced-motion: reduce` is enabled.
- **Real-Time WebGL Canvas:** Lightweight custom `Three.js` topographic relief & particle light refraction shader (`WebGLTopographicStage.tsx`) with explicit `.dispose()` lifecycle cleanup and immediate static warm architectural gradient fallback if WebGL is disabled or reduced motion is active.
- **Pinned Desktop / Flowing Mobile Rule:** Desktop viewports (`>= 1024px` without reduced motion) experience pinned horizontal Scene 03 and scrubbed Scene 05 timelines; tablet/mobile (`< 1024px`) switch automatically via `gsap.matchMedia()` to smooth vertical swiping stages with interactive pill controls so touch scrolling is never trapped.

---

## 3. Seven-Scene Page Architecture (`src/app/page.tsx`)

### Global Chrome (Reconstructed A + C Pattern)
- **Floating Studio Pill Top Bar + Full-Screen Split Editorial Menu (`Navbar.tsx`):**
  - Left: Minimalist `WG.` square ink mark + `WEB GURU` monogram (`[HOME]` on click).
  - Center (desktop): Ambient scene progress pill showing `[ SCENE 01 / 07 ]` dynamically updated as sections scroll.
  - Right: `LET'S TALK •` terracotta/ink CTA pill + `MENU ::` pill trigger.
  - Clicking `MENU ::` opens the **Full-Screen Split Obsidian Overlay** (reconstructed from *Lando Norris* + *Lusion*): Left panel displays a dynamic studio stage card matching hovered route + working hours (`MON–FRI`); Right panel presents oversized stacked navigation links (`01 HOME`, `02 SERVICES`, `03 SELECTED WORK`, `04 THE STUDIO`, `05 CONTACT`) with animated terracotta strikethrough bars and quick contact details.
- **Left Persistent Scene Gutter Spine (`SceneSpineRail.tsx`):**
  - Fixed `hidden xl:flex` hairline left rail tracking active scene index `01..07` with live vertical progress rule (reconstructed from *Shopify Editions Exponential*).
- **Contextual Cursor (`StudioCursor.tsx`):**
  - Fine-pointer desktop cursor dot morphing into clean micro pills (`EXPLORE`, `VIEW CONCEPT`, `INTERACT`, `SCROLL`) via declarative `data-cursor`.

---

### Scene 01 — The Opening (`HeroCinemaScene.tsx`)
*Reconstructs: Lusion Framed Viewport + Calibration Crosshairs + Noomo WebGL Layer + Delta Cafés Bottom Chapter Scrubber + Prägen Hätlen Monospace Telemetry*
- Full-viewport framed architectural canvas inside clean outer paper padding, flanked top/bottom by 5 precision `+` calibration reticles (`[ EST. 4-MEMBER STUDIO ]` — `SCROLL TO EXPLORE`).
- Background holds our custom **Three.js WebGL Topographic Shader Canvas** subtly shifting contours in warm cream/terracotta/pine light in response to cursor coordinates.
- Foreground composes giant kinetic display typography (`Your business deserves a *coherent* digital engine.`) paired with rotated Two 26-style studio tag pills (`ONE PARTNER` / `SIX DISCIPLINES`).
- Bottom rail features interactive 4-pillar chapter switcher buttons (`01 Local Visibility`, `02 Websites`, `03 Custom Apps`, `04 Growth Systems`) that shift active focal metrics & preview stage smoothly inside the frame without ever looking like a plain SaaS Bento box.

### Scene 02 — The Digital Ecosystem (`EcosystemScene.tsx`)
*Reconstructs: Lando Norris Topographic Field + Highlighter Wipe Reveals + Terminal Industries Scrubbed Manifesto + Shopify Editions Node Topology*
- Transitions into warm linen (`#ECE7DC`) over continuous SVG topographic contours.
- Opens with `<ScrubbedStatement>` ("Most businesses manage four disconnected vendors. We unify your search, web, software, social, and physical customer touchpoints under one engineering desk.") + `<HighlighterReveal>` headline sweep.
- Below sits a live **Interactive Connected Ecosystem Map**: a radial/network topology linking **Google Visibility**, **Websites**, **Custom Apps**, **Social Media**, **NFC & QR Reviews**, and **Tech Care** around the central **WEB GURU ENGINE**. Hovering or clicking any node highlights animated SVG signal edges and displays real outcome logic on the synchronized inspector rail.

### Scene 03 — Services Experience (`ServicesCinemaScene.tsx`)
*Reconstructs: Terminal Industries Pinned Horizontal Stage Track + Interactive Product Proofs across all 6 disciplines*
- Shifts intentionally into rich editorial contrast (`#18362F` Deep Atelier Pine -> Warm Cream alternating stage framing).
- Desktop (`>= 1024px`) pins Scene 03 via `ScrollTrigger` and translates a **6-Panel Full-Width Horizontal Track** smoothly with progress scrubber and direct pill jumps (`01 Local SEO` .. `06 Tech Support`). Mobile (`< 1024px`) renders clean vertical stacked full-bleed stages with the same pill switcher.
- Each of the **6 mandatory service categories** renders both clean structured scope deliverables AND its **bespoke live interactive demonstration**:
  1. **Google Business Profile & Local SEO** — Interactive Local Search & Map Optimization Simulator (explicitly badged *"Simulated preview — illustrative business example; not an official Google LLC interface"*), toggling Verified Hours / Service Categories / Local Photos to inspect mock visibility score changes.
  2. **Website Design & Development** — Interactive Responsive Viewport & Speed Blueprint Switcher (`Landing Page`, `Company Site`, `E-Commerce`), letting visitors switch desktop/mobile frame view & inspect Lighthouse/conversion structure.
  3. **Application Development & Management** — Interactive Business Workflow Board (switch live tab views: `Booking Portal` / `Operations Queue` / `Inventory Sync`).
  4. **Social Media Management** — Interactive Editorial Grid & Post Scheduler Composer (filter campaign tones & trigger animated preview layout).
  5. **NFC & QR Review Solutions** — Interactive Tactile Counter Stand (`Tap NFC` / `Scan QR` simulation button animating a customer mobile review handoff cleanly).
  6. **Technology Support & Management** — Interactive Care & Monitoring Pipeline Console (toggle checks across `Uptime`, `Automated Backups`, `Security & Patches`).

### Scene 04 — Selected Work (`PortfolioCinemaScene.tsx`)
*Reconstructs: Era Residence Arch Portal Mask Reveal + ZZDP 10/4 Asymmetric Grid + 3-Cell Spec Strip + Noomo Hover-Preview Index Rows*
- Transitions smoothly back to Warm Paper (`#F6F3EC`).
- Lead feature uses **Era Residence's scroll-expanded rounded Arch Portal Mask** revealing flagship Demo Concept #1, transitioning into **ZZDP's staggered 10/4 asymmetrical monograph grid** for Demo Concepts #2–#4, each carrying crisp 3-cell hairline spec tables (`• Category | • Stack | • Scope`) and unmistakable `[CONCEPT DEMO — INTERNAL STUDIO BUILD]` transparency badges routing cleanly to `/work/[slug]`.
- Below the featured asymmetric pair sits a **Noomo-style Hover Preview Archive Row List** summarizing technical architecture highlights & quick case navigation.

### Scene 05 — How We Work (`ProcessCinemaScene.tsx`)
*Reconstructs: Scroll-Scrubbed Pinned 4-Stage Narrative + Floema Technical CAD Wireframe Illustrations*
- Shifts polar tone to Deep Obsidian / Forest Contrast (`#161A18` / `#18362F`).
- Desktop pins the narrative stage while scrolling smoothly advances active stages `01 Discover`, `02 Strategize`, `03 Build & Implement`, `04 Manage & Grow` (with click-to-jump buttons always interactive for direct access).
- Right canvas draws stage-specific animated **`1px` Architectural Wireframe Diagrams** showing Discovery Audit nodes -> Architecture Grid -> Build Pipeline -> Ongoing Telemetry Loop.

### Scene 06 — The Studio (`StudioCinemaScene.tsx`)
*Reconstructs: Archivio Garonzi Vertical Ruled Columns (`N° 001`..`N° 004`) + Authentic 4-Member Slot Integrity*
- Warm Linen Paper (`#ECE7DC`) gallery featuring giant split manifesto typography (`Four builders. Zero bloat. Direct access.`) paired with **four full-height vertical columns** (`( N° 001 )` through `( N° 004 )`) separated by continuous `1px` rules (`border-rule`), honestly presenting Web Guru's four founding specialist desks (`Partner Slot Pending — Update src/data/team.ts`) alongside the Verified Testimonial notice (`VERIFIED_TESTIMONIALS = []`, no invented reviews!).

### Scene 07 — The Final Scene & Footer (`ContactCinemaScene.tsx` + `Footer.tsx`)
*Reconstructs: Noomo Minimalist Underline Contact Atelier + Selectable Scope Pills + Floema Oversized Typographic Anchor Footer*
- Final contrast plunge into Obsidian Ink (`#161A18`) with subtle WebGL/topographic embers.
- Opens with kinetic closing display invitation (`Ready to replace fragmented vendors with one coherent partner?`).
- Includes interactive scope pills (`Local SEO`, `Websites`, `Apps`, `Social`, `NFC & QR`, `Support`) wired into **underline-only editorial form fields** (`Your Name`, `Business / Project`, `Email or Phone`, `Project Details`) backed by the live `POST /api/contact` API + optional direct email/WhatsApp links.
- Closes seamlessly into a monumental edge-to-edge **Web Guru Typographic Footer** with crisp 2-column navigation links (`Services`, `Work`, `Studio`, `Contact`, `Privacy Policy`), live technical SVG elevation line drawing, and static `© 2026 Web Guru`.

---

## 4. Subpage Harmony

To deliver consistent craft beyond `/` without breaking static/SSR guarantees (`cacheComponents: true`), we also refresh `/services`, `/work`, `/work/[slug]`, `/about`, and `/contact` to share `Navbar` (with full-screen overlay), `Footer`, `HighlighterReveal`, and the upgraded service demos cleanly.
