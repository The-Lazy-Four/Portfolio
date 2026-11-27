# Awwwards & Creative Web Research Report (REA Browser Verification)

> **Research Method:** Direct headless Chromium automation via **REA (`capture_browser_scenario` + `inspect_analysis_view` / `export_evidence_bundle`)** at `1440x900`, capturing initial load (`hero`), scroll progressions (`after_1`, `mid_view`), bottom state (`footer_settled`), DOM/technology signatures, and real interactive UI clicks (`Menu`, service accordions).

---

## Summary of 25 Inspected Live Websites

| # | Website / Studio | Live URL | Awwwards Award / Category | Key Tech Signatures (Observed in DOM/Canvas) | Screenshot Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Lusion (v3)** | https://lusion.co/ | Site of the Year (SOTY) | Custom Three.js/WebGL engine, smooth scroll, crosshairs + full-bleed color transitions | [lusion-hero.png](./research-screenshots/lusion-hero.png) |
| 2 | **Lando Norris** | https://landonorris.com/ | Site of the Year (SOTY) | GSAP, Lenis, Three.js/WebGL, SplitText, contour SVG field, split menu overlay | [landonorris-hero.png](./research-screenshots/landonorris-hero.png) |
| 3 | **Igloo Inc (abeto)** | https://www.igloo.inc/ | Site of the Year (SOTY) | Three.js/WebGL custom shaders, wireframe cube cage overlay, spatial scrolling | [igloo-after_1.png](./research-screenshots/igloo-after_1.png) |
| 4 | **Noomo Agency** | https://noomoagency.com/ | Site of the Year (SOTY) | Nuxt, GSAP, Three.js/WebGL, 2.5D floating meshes over display typography | [noomoagency-hero.png](./research-screenshots/noomoagency-hero.png) |
| 5 | **Pangram Pangram Foundry (Locomotive)** | https://pangrampangram.com/ | Site of the Year (SOTY) | Shopify custom frontend, type specimen cards, asymmetric editorial framing | [pangrampangram-hero.png](./research-screenshots/pangrampangram-hero.png) |
| 6 | **Terminal Industries (REJOUICE)** | https://terminal-industries.com/ | Site of the Month (SOTM) | Nuxt, Lenis, WebGL point-cloud / wireframe reveal, word-by-word scroll text scrub | [terminal-industries-after_1.png](./research-screenshots/terminal-industries-after_1.png) |
| 7 | **Shopify Editions Fall '26** | https://www.shopify.com/editions/fall2026 | SOTM / Experimental | Lenis, WebGL interactive network node canvas, rotated vertical index rail, chapter nav | [shopify-hero.png](./research-screenshots/shopify-hero.png) |
| 8 | **Floema (Bürocratik)** | https://www.floema.com/en | Site of the Month (SOTM) | Floating editorial media cloud, segmented pill bar, sulfur-yellow elevation footer | [floema-hero.png](./research-screenshots/floema-hero.png) |
| 9 | **Lama Lama** | https://lamalama.com/ | Site of the Month (SOTM) | GSAP, Lenis, WebGL, modular agency showcase | [lamalama-hero.png](./research-screenshots/lamalama-hero.png) |
| 10 | **Era Residence** | https://www.era-residence.com/ | Architecture / SOTM | Next/Webflow, GSAP, Lenis, Lottie, SplitText, scroll-expanded arch mask + hotspots | [era-residence-footer_settled.png](./research-screenshots/era-residence-footer_settled.png) |
| 11 | **ZZDP Architects** | https://www.zzdp.nl/ | Architecture Studio | Next.js, Lenis, Lottie, 10/4 staggered project grid, 6-column color strip menu overlay | [zzdp-mid_view.png](./research-screenshots/zzdp-mid_view.png) |
| 12 | **Archivio Garonzi** | https://archivio.garonzi1925.com/ | Archive / Architecture | Nuxt, Lenis, vertical ruled column gallery (`N° 001`..`N° 006`) + accent rail | [archivio-hero.png](./research-screenshots/archivio-hero.png) |
| 13 | **Preymaker** | https://www.preymaker.com/ | Creative Production Studio | Minimal 3-point nav, full-bleed motion hero, low-left editorial statement | [preymaker-hero.png](./research-screenshots/preymaker-hero.png) |
| 14 | **Polpharma Biologics** | https://polpharmabiologics.com/ | Biotech / WebGL | Gooey connected pill navbar, refractive frosted WebGL spheres, pine corner brackets | [polpharma-hero.png](./research-screenshots/polpharma-hero.png) |
| 15 | **Delta Cafés** | https://www.deltacafes.com/ | Consumer Brand Experience | Bento floating hero widget cards + bottom interactive chapter scrubber (`01`..`03`) | [deltacafes-hero.png](./research-screenshots/deltacafes-hero.png) |
| 16 | **Prägen Hätlen** | https://www.pragenhatlen.com/ | Luxury Horology | Monospace bracketed header `[01]`, edge-to-edge macro stage, centered `[SCROLL]` cue | [pragenhatlen-hero.png](./research-screenshots/pragenhatlen-hero.png) |
| 17 | **Mandelo Agency** | https://www.mandelo.agency/ | Creative Agency | Centered floating `MENU ::` pill, giant condensed black display + orbiting work cards | [mandelo-hero.png](./research-screenshots/mandelo-hero.png) |
| 18 | **Two 26 Studio** | https://two26.studio/ | Branding Studio | Orange architectural typography overlaid with rotated black stamp tags + illustration | [two26-hero.png](./research-screenshots/two26-hero.png) |
| 19 | **Bonanza Studios** | https://www.bonanza-studios.com/ | Innovation Studio | Sharp minimalist grid & direct proposition hierarchy | [bonanza-hero.png](./research-screenshots/bonanza-hero.png) |
| 20 | **Small Tribe Studio** | https://smalltribe.studio/ | Digital Studio | Warm editorial surface contrast & playful kinetic accents | [smalltribe-hero.png](./research-screenshots/smalltribe-hero.png) |
| 21 | **Becomes** | https://becomes.co/ | Digital Agency | Editorial layout transitions & clean service blocks | [becomes-hero.png](./research-screenshots/becomes-hero.png) |
| 22 | **WeFlash Studio** | https://www.weflash.studio/ | Design & Web Studio | Bold typographic rhythm & dark/light alternation | [weflash-hero.png](./research-screenshots/weflash-hero.png) |
| 23 | **Sowoo** | https://www.sowoo.fr/ | Creative Studio | French editorial grid, tactile spacing, concise CTAs | [sowoo-hero.png](./research-screenshots/sowoo-hero.png) |
| 24 | **Agrumea Farm** | https://www.agrumeafarm.it/ | Artisan Brand | Natural warm paper palette & organic image framing | [agrumeafarm-hero.png](./research-screenshots/agrumeafarm-hero.png) |
| 25 | **Huxley Saga** | https://www.huxleysaga.com/ | Narrative Showcase | Atmospheric full-bleed world-building & chapter storytelling | [huxleysaga-hero.png](./research-screenshots/huxleysaga-hero.png) |

---

## Core Architectural Insights Across Award Winners

1. **Motion Stack Dominance:** Virtually every high-Craft editorial/interactive winner pairs **Lenis** smooth scroll with **GSAP + ScrollTrigger** (`landonorris.com`, `era-residence.com`, `lamalama.com`, `noomoagency.com`), reserving **Three.js / WebGL shaders** strictly as atmospheric depth or focal hero sculptures rather than wrapping generic DOM text.
2. **Spatial Framing Over Boxed Cards:** Award sites never put a gray boxed widget next to an H1 hero (`our old v2 flaw`). Instead they frame the full viewport inside deliberate architectural margins (`Lusion` rounded viewport + `+` calibration ticks), thread procedural backgrounds across scenes (`Lando Norris` contour lines), or let 3D/masked depth sit directly behind/around monumental display typography (`Noomo`, `Era Residence`, `Polpharma`).
3. **Dramatic Color Choreography:** Multi-section sites maintain emotional pacing by shifting full canvas polarity intentionally (`Polpharma` luminous frost -> deep forest teal; `Lando Norris` warm paper -> deep olive `#1D1F18`; `Lusion` lavender light -> saturated red showreel stage; `Floema` warm paper -> sulfur-yellow elevation footer).
4. **Navigation as a Signature Experience:** Top bars are whisper-light (`LET'S TALK •` + `MENU ::`), shifting architectural navigation weight into rich full-screen overlays (`Lando Norris` split photo grid + animated strike-through links, `ZZDP` color-blocked column strip, `Lusion` modular cards).
5. **Tactile Wireframe & Metadata Craft:** High-craft sites combine bold display faces with crisp `1px` technical blueprints (`Floema` architectural elevations, `Igloo` cube wireframes, `Terminal` LiDAR grids, `Prägen Hätlen` `[01]` brackets, `Archivio Garonzi` `( N° 001 )` rule lines).
