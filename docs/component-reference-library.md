# Component Reference Library — Reverse-Engineered From Live Awwwards Sites

> This library documents **27 concrete visual, layout, navigation, and motion components** observed across 25 live websites in REA, structured with exact behavioral specs and adaptation plans for **Web Guru**.
> Components marked **`[SELECTED]`** (11 total) form the reconstructed architecture of Web Guru's new 7-scene experience.

---

## A. Hero Sections

### A1. Framed Rounded Viewport + Calibration Reticle Stage `[SELECTED]`
- **Website:** Lusion (v3)
- **URL:** https://lusion.co/
- **Screenshot:** `./research-screenshots/lusion-hero.png` & `./research-screenshots/lusion-mid_view.png`
- **Location:** Full above-the-fold hero & showreel transition stage
- **Behavior:** A rounded full-width canvas container (`border-radius: ~20px`) sits inset from clean light outer margins while five alignment crosshairs (`+   +   SCROLL TO EXPLORE   +   +`) lock along the top and bottom perimeter rails. Scrolling smoothly expands or shifts the viewport's tonal ground.
- **Trigger:** Initial mount entrance + continuous scroll position
- **Timing & Sequence:** Header wordmark and pill bar appear first; stage fades up cleanly (`0.7s easeOut`), with continuous WebGL shader / camera motion responding softly to pointer movement.
- **Visual Composition:** Generous outer frame margin, dark obsidian inner canvas contrasting warm paper header, crisp `+` reticles creating a precision optical instrument frame.
- **Why Impressive:** Eliminates generic "left headline + right bento box" layouts immediately—the entire viewport reads as a curated cinema frame.
- **Web Guru Adaptation:** Frame Scene 01 inside an architectural rounded stage with `WG / 01` + calibration `+` reticles and a Three.js warm topographic contour shader canvas inside, layering monumental typography cleanly in the foreground/margins.

### A2. Floating 2.5D Sculptures Overlapping Monumental Display Type `[SELECTED]`
- **Website:** Noomo Agency
- **URL:** https://noomoagency.com/
- **Screenshot:** `./research-screenshots/noomoagency-hero.png` & `./research-screenshots/noomoagency-mid_view.png`
- **Location:** Hero headline & second manifesto band
- **Behavior:** Giant uppercase display headlines span 90% of viewport width while subtle 3D geometries orbit softly at different parallax speeds in front of and behind letterforms. Bottom-right holds a tight 3-line summary paragraph.
- **Trigger:** Pointer parallax (`mousemove`) + scroll velocity
- **Timing & Sequence:** Continuous 60fps smooth damping (`lerp`); text lines stagger in vertically (`0.08s` per line).
- **Visual Composition:** Massive scale ratio between 96–130px headline and 14px studio summary; soft ambient glow behind geometry.
- **Why Impressive:** Creates genuine depth between typography and WebGL layer without heavy dark-neon clutter.
- **Web Guru Adaptation:** Render subtle warm terracotta/cream metallic-matte polyhedra or WebGL refractive wave contours in Three.js over Scene 01 & Scene 06 display type with clean reduced-motion static placement.

### A3. Hero Interactive Chapter Scrubber + Floating Corner Bento Modules
- **Website:** Delta Cafés
- **URL:** https://www.deltacafes.com/
- **Screenshot:** `./research-screenshots/deltacafes-hero.png`
- **Location:** Bottom rail and right edge of Hero (`01 / 02 / 03`)
- **Behavior:** Bottom left displays numbered horizontal chapter thumbnails (`01`, `02`, `03`) with active progress underlines; clicking any chapter switches the active hero narrative and background visual.
- **Trigger:** Auto-progression timer + manual click on chapter strip
- **Timing & Sequence:** Smooth crossfade (`500ms`) with thin linear fill bar along active chapter border.
- **Visual Composition:** Asymmetric balance—display serif statement on bottom-left, crisp media switcher along footer rail.
- **Why Impressive:** Turns a static hero into an interactive multi-chapter preview without crowding the screen.
- **Web Guru Adaptation:** Integrated cleanly as the bottom chapter selector bar in Scene 01 so visitors can preview Web Guru's 4 growth pillars (`01 Local Visibility`..`04 Ongoing Care`) directly inside the cinema frame.

### A4. Scattered Floating Media Cloud Around Segmented Navigation
- **Website:** Floema
- **URL:** https://www.floema.com/en
- **Screenshot:** `./research-screenshots/floema-hero.png`
- **Location:** Full hero canvas
- **Behavior:** Small crisp rectangular product photographs drift subtly in 2.5D depth space over a warm bone canvas (`#F3EFE6`), reacting softly to mouse delta.
- **Trigger:** Continuous ambient drift + pointer offset
- **Timing & Sequence:** Gentle low-amplitude oscillation (`±8px`).
- **Visual Composition:** High negative space (>75% empty paper ground), sharp square crops, dark micro-labels.
- **Why Impressive:** Unmistakably editorial and anti-template—zero container borders or heavy shadows.
- **Web Guru Adaptation:** Inspires sparse floating capability artifact previews around Scene 02's orbital diagram.

### A5. Macro Editorial Hero with Bracketed Monospace Bar
- **Website:** Prägen Hätlen
- **URL:** https://www.pragenhatlen.com/
- **Screenshot:** `./research-screenshots/pragenhatlen-hero.png`
- **Location:** Full viewport top
- **Behavior:** Edge-to-edge tactile visual canvas with four hairline bracketed monospace nav anchors (`[01] COLLECTION` ... `[04] FAQ`) and bottom-centered `[SCROLL]` trigger pill.
- **Trigger:** Page load + vertical scroll threshold
- **Timing & Sequence:** Immediate stable chrome; scroll fades bottom cue within `120px`.
- **Visual Composition:** Ultra-disciplined Swiss typography spacing at 11px monospace tracking (`0.14em`).
- **Why Impressive:** Proves micro-details (`[01]` brackets) elevate craft effortlessly.
- **Web Guru Adaptation:** Adopt `[01]`–`[07]` bracketed scene indices and monospace telemetry stamps across Web Guru scene headers.

---

## B. Scroll-Driven Animations

### B1. Pinned Horizontal Chapter Track with Progress Rail `[SELECTED]`
- **Website:** Terminal Industries & Archivio Garonzi (hybrid pattern)
- **URLs:** https://terminal-industries.com/ , https://archivio.garonzi1925.com/
- **Screenshot:** `./research-screenshots/terminal-industries-after_1.png` & `./research-screenshots/archivio-hero.png`
- **Location:** Mid-page product / collection exploration
- **Behavior:** Vertical page scroll pins the section viewport on desktop (`pin: true` in GSAP ScrollTrigger) and translates a wide multi-chapter track horizontally (`xPercent`), advancing an active scene counter and hairline scrub indicator. On smaller viewports (`<1024px`), collapses gracefully to clean vertical sticky cards.
- **Trigger:** GSAP ScrollTrigger `scrub: 1` pinned across scrollable desktop range
- **Timing & Sequence:** 1:1 scrubbed scroll ratio + quick-jump pill navigation (`01`..`06`) using Lenis `scrollTo`.
- **Visual Composition:** Full-bleed chapter frames, vertical divider rules, top index stamps `( 01 )`..`( 06 )`.
- **Why Impressive:** Transforms "6 service cards" into a theatrical, paced horizontal museum tour where each service owns the full stage.
- **Web Guru Adaptation:** Core mechanism for **Scene 03 (Services Experience)** showcasing all 6 service categories with their dedicated live interactive demos!

### B2. Continuous Background Contour Field + Global Tonal Polarity Transitions `[SELECTED]`
- **Website:** Lando Norris & Polpharma Biologics
- **URLs:** https://landonorris.com/ , https://polpharmabiologics.com/
- **Screenshot:** `./research-screenshots/landonorris-after_1.png` & `./research-screenshots/polpharma-mid.png`
- **Location:** Full page background flow
- **Behavior:** Subtle topographic contour vector lines persist continuously behind sections while section backgrounds shift deliberately (Cream `#F6F3EC` -> Deep Atelier Pine `#18362F` -> Warm Linen `#ECE7DC` -> Obsidian Ink `#161A18`) on scroll thresholds.
- **Trigger:** ScrollTrigger `onEnter` / `onEnterBack` surface transition + parallax offset on contour strokes
- **Timing & Sequence:** Smooth CSS/GSAP background transitions (`450ms cubic-bezier(0.22, 1, 0.36, 1)`).
- **Visual Composition:** High contrast legibility at every stage while keeping visual continuity via contour line pattern.
- **Why Impressive:** Gives the page unmistakable visual storytelling—sections feel like chapters of one continuous film.
- **Web Guru Adaptation:** Threads through **Scenes 01–07** using Web Guru's authentic palette (`#F6F3EC`, `#18362F`, `#ECE7DC`, `#161A18`).

### B3. Interactive Node-Graph Topology + Sticky Left Chapter Index Rail `[SELECTED]`
- **Website:** Shopify Editions Fall '26 (`Exponential`)
- **URL:** https://www.shopify.com/editions/fall2026
- **Screenshot:** `./research-screenshots/shopify-hero.png` & `./research-screenshots/shopify-mid_view.png`
- **Location:** Opening ecosystem graph & sticky left chapter gutter
- **Behavior:** A vertical typographic gutter anchors the left viewport edge (`01`–`07`) while an interactive node-link canvas connects capability hubs and highlights active paths + miniature telemetry cards.
- **Trigger:** Pointer hover/click on nodes + scroll section progress
- **Timing & Sequence:** Active node expands halo + lights connecting SVG Bezier paths in `300ms`.
- **Visual Composition:** Precision dark blueprint field paired with structured editorial cards and thin rule leaders.
- **Why Impressive:** Communicates interconnected digital systems immediately without corporate stock clip-art.
- **Web Guru Adaptation:** Powers **Scene 02 (The Digital Ecosystem)**—showing visually how Local SEO, Websites, Custom Apps, Social Media, NFC/QR Reviews, and Tech Support interconnect around one partner.

### B4. Pinned Process Narrative with Scrubbed Technical Wireframe Progression `[SELECTED]`
- **Website:** Floema + Terminal Industries (wireframe overlay)
- **URLs:** https://www.floema.com/en , https://terminal-industries.com/
- **Screenshot:** `./research-screenshots/terminal-industries-after_1.png` & `./research-screenshots/floema-footer_settled.png`
- **Location:** Mid-page narrative (`How We Work`) & architectural schematic stage
- **Behavior:** As the user scrolls through a pinned tall container, stage numbers (`01 Discover` -> `04 Manage & Grow`) advance automatically while an architectural `1px` line-art blueprint traces (`stroke-dashoffset` scrub) new structural layers per stage.
- **Trigger:** GSAP ScrollTrigger `pin: true` + `scrub` timeline across 4 steps
- **Timing & Sequence:** Stage transitions snap or crossfade cleanly every `25%` of section progress.
- **Visual Composition:** Deep Pine (`#18362F`) contrast ground with cream hairline CAD-style line art and warm terracotta active accents.
- **Why Impressive:** Makes Web Guru's 4-step agency workflow feel engineered and tangible.
- **Web Guru Adaptation:** Powers **Scene 05 (How We Work)** across `01 Discover`, `02 Strategize`, `03 Build & Implement`, `04 Manage & Grow`.

### B5. Three.js Spatial Wireframe Orbit Mesh
- **Website:** Igloo Inc
- **URL:** https://www.igloo.inc/
- **Screenshot:** `./research-screenshots/igloo-after_1.png`
- **Location:** Full-screen 3D centerpiece
- **Behavior:** Delicate wireframe cube scaffolding rotates around a central sculptural focal mass inside WebGL, reacting subtly to camera scroll depth.
- **Trigger:** Continuous render loop (`requestAnimationFrame`) + scroll depth
- **Timing & Sequence:** Slow meditative angular velocity (`0.0015 rad/frame`).
- **Visual Composition:** Crisp light hairline wireframe strokes layered over textured surface shader.
- **Why Impressive:** Feels spatial and architectural rather than arcade-game 3D.
- **Web Guru Adaptation:** Subtle wireframe architectural overlay synced inside our Three.js Scene 01 shader component.

---

## C. Navigation & Menu Systems

### C1. Full-Screen Split Editorial Menu Overlay (Image Preview + Strikethrough Links) `[SELECTED]`
- **Website:** Lando Norris + Lusion (hybrid pill header)
- **URLs:** https://landonorris.com/ , https://lusion.co/
- **Screenshot:** `./research-screenshots/landonorris-interactive-menu.png` & `./research-screenshots/lusion-interactive-menu.png`
- **Location:** Sticky global header + clicked `MENU ::` overlay
- **Behavior:** Header stays compact (`WG.` wordmark, scene indicator dot, `LET'S TALK •` pill, and `MENU ::` pill button). Opening `MENU` expands a full-screen obsidian editorial curtain: Left side renders a crisp 2×2 visual quadrant / hovered route preview; Right side renders monumental links (`HOME`, `SERVICES`, `SELECTED WORK`, `THE STUDIO`, `CONTACT`) with an active terracotta waveform/strikethrough accent bar (`Lando Norris`) and newsletter/direct-contact CTA module (`Lusion`).
- **Trigger:** Click `MENU` button (accessible keyboard Focus Trap + `Esc` close)
- **Timing & Sequence:** Curtain clips open from top (`clip-path`, `0.45s cubic-bezier(0.76,0,0.24,1)`), links stagger upward `40ms` apart.
- **Visual Composition:** Dark `#161A18` ground, cream `#F6F3EC` condensed display links, `#D94E28` waveform indicator on active/hovered route.
- **Why Impressive:** Unlocks generous top viewport cleanliness while giving navigation genuine studio theater.
- **Web Guru Adaptation:** Replaces the generic static navbar across the entire Next.js App Router (`Navbar.tsx`) while keeping clear top links + quick access on desktop & mobile.

### C2. Color-Blocked Column Dock Navigation Overlay
- **Website:** ZZDP Architects
- **URL:** https://www.zzdp.nl/
- **Screenshot:** `./research-screenshots/zzdp-interactive-menu.png`
- **Location:** Bottom dock `Open` trigger -> full-screen overlay
- **Behavior:** Giant architectural watermark wordmark occupies the upper half while bottom 50% splits into 6 vertical color-blocked route columns, each framing a project window thumbnail.
- **Trigger:** Bottom pill toggle click
- **Timing & Sequence:** Vertical slide-up dock transition.
- **Visual Composition:** Bold architectural color-blocking separated by sharp edge seams.
- **Why Impressive:** Turns site navigation into a brand palette poster.
- **Web Guru Adaptation:** Used structurally to inspire our 4-part column split in Scene 06 (*The Studio*) and route hover previews inside our Menu Overlay.

### C3. Gooey Connected Top Pill Navigation Cluster
- **Website:** Polpharma Biologics
- **URL:** https://polpharmabiologics.com/
- **Screenshot:** `./research-screenshots/polpharma-hero.png`
- **Location:** Top right header cluster
- **Behavior:** Translucent glass nav pills fuse along horizontal edges via organic SVG/CSS metaball bridges, juxtaposed with a vibrant signal terracotta `Contact` pill.
- **Trigger:** Hover scales subtle bridge tension; click routes cleanly.
- **Timing & Sequence:** Smooth `250ms` hover spring.
- **Visual Composition:** Deep emerald tint glass + signal coral contrast pill.
- **Why Impressive:** Transforms ordinary pill navigation into cohesive sculptural jewelry.
- **Web Guru Adaptation:** Shapes our floating desktop pill cluster styling (`bg-ink/5 backdrop-blur-md` + Signal Terracotta CTA pill).

---

## D. Typography & Kinetic Headlines

### D1. Solid Block Highlighter Wipe Reveals (`RevealMask`) `[SELECTED]`
- **Website:** Lando Norris
- **URL:** https://landonorris.com/
- **Screenshot:** `./research-screenshots/landonorris-after_1.png`
- **Location:** Section statements & pull quotes
- **Behavior:** As each line enters the viewport, a solid high-contrast rectangle (`#D94E28` or `#F3B340` / `#161A18`) sweeps horizontally across the text box (`scaleX: 0 -> 1 -> 0` using left->right transform-origin flip), revealing crisp display copy underneath.
- **Trigger:** ScrollTrigger / viewport entry (`once: true`)
- **Timing & Sequence:** Block expands (`0.38s` cubic-bezier) then retracts opposite edge (`0.38s`), staggering lines by `90ms`.
- **Visual Composition:** Bold contrast between editorial italic serif and heavy sans wrapped in precision block sweeps.
- **Why Impressive:** Unmistakably human-directed studio motion—far superior to generic `opacity: 0; translateY(20px)` fades.
- **Web Guru Adaptation:** Built as `<HighlighterReveal>` wrapping Scene 02 manifestos and transition quotes!

### D2. Word-by-Word Scroll-Scrubbed Statement Typography `[SELECTED]`
- **Website:** Terminal Industries
- **URL:** https://terminal-industries.com/
- **Screenshot:** `./research-screenshots/terminal-industries-after_1.png`
- **Location:** Full-screen transitional manifesto band
- **Behavior:** A large multi-line statement starts muted (`opacity: 0.18`); as the user scrolls down (`scrub: true`), each word/glyph sequentially snaps to crisp full ink/accent intensity, keeping the reader's eye locked to scroll progress.
- **Trigger:** GSAP ScrollTrigger `scrub: 0.6` across viewport center window
- **Timing & Sequence:** Staggered `0.04` opacity/color keyframes distributed linearly across word array.
- **Visual Composition:** Minimal 12-word statement in tight tracking surrounded by ample breathing margin.
- **Why Impressive:** Zero clutter yet holds the user completely engaged through scroll feedback.
- **Web Guru Adaptation:** Built as `<ScrubbedStatement>` introducing Scene 02 (*One Team. Six Disciplines. Zero Fragmentation.*) and Scene 07 closing statement.

### D3. Typographic Tag-Over-Headline Composition
- **Website:** Two 26 Studio
- **URL:** https://two26.studio/
- **Screenshot:** `./research-screenshots/two26-hero.png`
- **Location:** Center Hero display lockup
- **Behavior:** Overscaled orange sans typography carries small rotated charcoal pill tags (`-4deg` / `+3deg`) stamped organically across letterforms.
- **Trigger:** Staggered pop-in on load (`spring` rotation settle) + subtle mouse repulsion
- **Timing & Sequence:** Type enters first (`0.5s`), tags stamp slightly offset (`0.65s`, `0.75s`).
- **Visual Composition:** Warm blush/cream ground, signal orange headline, jet black pill metadata tags.
- **Why Impressive:** Injects unmistakable boutique craft personality into clean display type.
- **Web Guru Adaptation:** Applied selectively to rotated atelier capability badges (`4 MEMBERS`, `END-TO-END`, `DEMO CONCEPTS`) over Scene headlines.

### D4. Persistent Rotated Left Edge Chapter Rail
- **Website:** Shopify Editions Fall '26 (`Exponential`)
- **URL:** https://www.shopify.com/editions/fall2026
- **Screenshot:** `./research-screenshots/shopify-hero.png`
- **Location:** Left fixed vertical gutter (`w-10`)
- **Behavior:** Fixed skinny vertical spine displays rotated `-90deg` scene telemetry (`WG — SCENE 01 / 07 — THE OPENING`) and live vertical progress fill synchronized to active scroll position.
- **Trigger:** Continuous scroll listener / ScrollTrigger callbacks
- **Timing & Sequence:** Instant active chapter swap when section crosses `50%` viewport threshold.
- **Visual Composition:** `1px` right divider rule (`border-rule`), uppercase `10px` monospace text.
- **Why Impressive:** Anchors the 7-scene cinema narrative so visitors always feel oriented without bulky breadcrumbs.
- **Web Guru Adaptation:** Clean `hidden xl:flex` left architectural spine tracking Scenes `01`..`07`.

---

## E. Image, Video & Masking Techniques

### E1. Scroll-Expanded Arch / Portal Mask + Interactive Scene Hotspots `[SELECTED]`
- **Website:** Era Residence
- **URL:** https://www.era-residence.com/
- **Screenshot:** `./research-screenshots/era-residence-mid_view.png` & `./research-screenshots/era-residence-footer_settled.png`
- **Location:** Mid-scroll architectural portal section
- **Behavior:** A centered arch `clip-path` / rounded top portal frames a visual stage surrounded by chamfers (`border`), smoothly scaling upward and widening from `40%` width toward a commanding full portal as the user scrolls down (`scrub`), with subtle pulsing circular interactive hotspots (`O`) nested inside.
- **Trigger:** GSAP ScrollTrigger `scrub: 1` on outer showcase section
- **Timing & Sequence:** Continuous scale + border-radius morph across vertical travel.
- **Visual Composition:** Rich dark background frame contrasting crisp illuminated architectural stage inside.
- **Why Impressive:** Creates a cinematic "stepping through the doorway" spatial reveal rarely seen on agency websites.
- **Web Guru Adaptation:** Applied to our flagship featured showcase stage in **Scene 04 (Selected Work)**—as visitors scroll into Selected Work, the primary concept showcase portal expands smoothly via GSAP ScrollTrigger!

### E2. Crisp 1px Technical Wireframe Elevation Graphics
- **Website:** Floema & Igloo Inc
- **URLs:** https://www.floema.com/en , https://www.igloo.inc/
- **Screenshot:** `./research-screenshots/floema-footer_settled.png`
- **Location:** Footer & blueprint technical cards
- **Behavior:** Minimalist `1px` architectural SVG blueprint line drawings sit flush against margins and section dividers, reinforcing engineered craftsmanship without heavy photographic weight.
- **Trigger:** SVG `stroke-dashoffset` draw animation on scroll entry
- **Timing & Sequence:** `1.2s power2.out` path trace triggered once on entry.
- **Visual Composition:** Razor-thin ink lines over solid warm paper, sulfur amber, or deep pine grounds.
- **Why Impressive:** Balances bold oversized typography with technical discipline.
- **Web Guru Adaptation:** Used inside Scene 05 (*How We Work*) architectural stage diagrams and Scene 07 Footer signature graphic.

---

## F. Portfolio / Case Study Displays

### F1. Asymmetrical 10/4 Staggered Grid with 3-Cell Spec Bar `[SELECTED]`
- **Website:** ZZDP Architects
- **URL:** https://www.zzdp.nl/
- **Screenshot:** `./research-screenshots/zzdp-mid_view.png`
- **Location:** Selected Work showcase
- **Behavior:** Alternating rows break card symmetry: Left project uses a wide dominant landscape canvas (`aspect-[16/10]`, spanning 7 cols) paired with an offset upper-right portrait project (`aspect-[4/5]`, spanning 4 cols with vertical offset). Underneath each sits a hairline 3-column metadata table (`• Category | • Type | • Outcome`).
- **Trigger:** Hover gently zooms inner stage (`scale(1.04)`) + triggers contextual cursor label (`VIEW CONCEPT`)
- **Timing & Sequence:** `0.6s cubic-bezier(0.22,1,0.36,1)` image scale; cursor pill springs into view smoothly.
- **Visual Composition:** High-contrast architectural framing with `[CONCEPT DEMO]` badge integrity preserved cleanly.
- **Why Impressive:** Elevates work showcase from "SaaS card grid" to architectural monograph.
- **Web Guru Adaptation:** Core portfolio layout for **Scene 04 (Selected Work)** + `/work` index, paired with custom **Contextual Cursor Follower**!

### F2. Expandable Index Rows with Floating Cursor-Preview Thumbnail `[SELECTED]`
- **Website:** Noomo Agency + Mandelo
- **URLs:** https://noomoagency.com/ , https://www.mandelo.agency/
- **Screenshot:** `./research-screenshots/noomo-interactive-service.png`
- **Location:** Services / Selected Archive accordion rows
- **Behavior:** Horizontal hairline-delimited rows display index title left + directional arrow (`↗` / `↘`) right. Hovering/clicking smoothly opens a brief summary panel AND displays a crisp floating thumbnail preview that tracks smoothly without layout reflow.
- **Trigger:** Click / keyboard Enter to toggle expanded row + hover to summon floating preview card
- **Timing & Sequence:** Height expansion `320ms cubic-bezier`, floating image opacity + spring scale `200ms`.
- **Visual Composition:** Generous vertical padding (`py-6`), subtle border rules, zero card boxes.
- **Why Impressive:** Handles multi-item indexes cleanly with zero visual clutter while rewarding interaction.
- **Web Guru Adaptation:** Used inside **Scene 04** secondary project index / reserved case-study slots below the asymmetric flagship showcase, plus **Scene 06 / `/services`** compact directory!

### F3. Vertical Ruled Index Columns (`N° 001` .. `N° 004`)
- **Website:** Archivio Garonzi
- **URL:** https://archivio.garonzi1925.com/
- **Screenshot:** `./research-screenshots/archivio-hero.png`
- **Location:** Horizontal archive gallery
- **Behavior:** Full-height vertical columns bounded continuously by `1px` vertical hairline dividers display top parenthesized index `( N° 001 )`, middle media frame, and bottom aligned uppercase metadata block, flanked by a vertical accent stripe on the left.
- **Trigger:** Subtle hover highlight shifts background tint slightly (`50ms`) and illuminates column header.
- **Timing & Sequence:** Clean staggered reveal (`0.08s` per column).
- **Visual Composition:** Pure gallery cadence—strong vertical rhythm across 4 equal architectural bays.
- **Why Impressive:** Gives structured multi-slot data museum-grade gravitas.
- **Web Guru Adaptation:** Reconstructed directly in **Scene 06 (The Studio)** to showcase Web Guru's **four core team member roles & open profile slots** authentically (`Slot 01`..`Slot 04`)!

---

## G. Cinematic Transitions, Contact & Footers

### G1. Minimalist Underline Contact Atelier + Selectable Pill Scope + Oversized Brand Footer `[SELECTED]`
- **Website:** Noomo Agency (Contact form) + Floema (Oversized footer)
- **URLs:** https://noomoagency.com/ , https://www.floema.com/en
- **Screenshot:** `./research-screenshots/noomoagency-footer_settled.png` & `./research-screenshots/floema-footer_settled.png`
- **Location:** Final section & bottom viewport footer
- **Behavior:** Replaces heavy white-box SaaS forms with full-width **bottom-border-only underline inputs** (`YOUR NAME`, `EMAIL OR PHONE`, `HOW CAN WE HELP`) and tactile clickable scope/focus selector pills (`Local SEO`, `Website`, `Web / Mobile App`, `Social Media`, `NFC & QR`, `Full Partner`). Submitting triggers honest `/api/contact` state feedback. Below sits a monumental edge-to-edge footer pairing crisp 2-column studio navigation links with an oversized sculptural `WEB GURU` mark and technical CAD line detail.
- **Trigger:** Input focus animates bottom border width/color (`#D94E28`); pill click toggles active scope; submit posts to `/api/contact`.
- **Timing & Sequence:** Focus underline sweep `250ms easeOut`; footer wordmark fades/reveals via scroll.
- **Visual Composition:** Obsidian Dark canvas (`#161A18`) / Warm Highlight accents with high-contrast legible cream type.
- **Why Impressive:** Turns the contact form—often the most generic section on agency pages—into a refined boutique invitation.
- **Web Guru Adaptation:** Powers **Scene 07 (The Final Scene & Footer)**!

### G2. Contextual Custom Desktop Cursor Follower (`VIEW`, `DRAG`, `EXPLORE`, `TAP`)
- **Website:** Observed interaction grammar across Lusion, ZZDP, Noomo, Preymaker
- **URLs:** https://lusion.co/ , https://www.zzdp.nl/
- **Location:** Global desktop pointer layer (`pointer: fine` only)
- **Behavior:** A small precision cursor dot tracks pointer coordinates with smooth spring damping and morphs into a compact pill label (`EXPLORE`, `VIEW`, `TAP DEMO`, `STEP`) when hovering marked interactive canvases or portfolio frames. Disabled completely on touch devices (`pointer: coarse`) and `prefers-reduced-motion`.
- **Trigger:** Global `mousemove` + `data-cursor="VIEW"` declarative attributes
- **Timing & Sequence:** `lerp` 0.18 tick loop; label pill crossfade `150ms`.
- **Visual Composition:** Obsidian/Terracotta high-contrast pill with micro uppercase `JetBrains Mono` text.
- **Why Impressive:** Connects the entire multi-scene canvas with continuous tactile polish.
- **Web Guru Adaptation:** Built cleanly as `StudioCursor.tsx` using safe RAF cleanup and `pointer: fine` media check!
