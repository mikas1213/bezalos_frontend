# Be žalos — Design System

> _Be žalos_ literally translates from Lithuanian as **"without harm"**.
> Fittingly, the brand sells a nutrition methodology that is the antidote to
> the diet industry: structured but never restrictive, gentle but never vague.

This pack is the design source-of-truth for the Be žalos web platform
([bezalos.lt](https://www.bezalos.lt)) and any throwaway prototype, deck, or
mock that needs to look like part of the same family.

---

## What is Be žalos?

A Lithuanian women's nutrition & healthy-lifestyle platform created by
**Sandra Jatulytė** — a Vilnius University-trained psychologist with a
biomedicine bachelor's and CBT / Schema Therapy specialisation. Sandra herself
is the brand: her photograph anchors the homepage, her signature appears in
the about section, and her tone runs through every line of copy. The product
sells:

| Feature                  | Lithuanian          | What it is                                                              |
| ------------------------ | ------------------- | ----------------------------------------------------------------------- |
| Recipe library           | **Receptai**        | Searchable, illustrated recipes                                          |
| Video kitchen            | **Virtuvė**         | Long-form video lessons & cook-alongs (CloudFront, Stripe-gated)         |
| Services                 | **Paslaugos**       | One-off services & mentorship packages                                  |
| Membership               | **Narystė**         | Subscription tier                                                        |
| Eating-behaviour test    | **Atlik testą**     | Funnel quiz that drops users into the personalised plan                  |
| Personal profile         | **Profilis**        | Logged-in: nutrition plan, calorie diary, product swaps, stats, recipes  |

The two main "products" inside the same codebase:

1. **Marketing + content site** (`/`, `/receptai`, `/virtuve`, `/naryste`, …)
   — public, warm, photographic, dark-teal hero with mint-lime accents.
2. **Profilis app** (`/profilis/*`) — protected, more utilitarian, sub-nav
   driven. Charts (Recharts), forms (React Hook Form), calorie diaries.

> The two surfaces share **all** tokens — the dark teal hero scoop only
> appears in marketing, but the lime CTA, Poppins type and macro-nutrient
> palette are common.

---

## Sources

- **Figma file** — mounted virtual filesystem at `/HomePage` and
  `/Profilis-Page`. Pseudocode + raw assets. 13 frames in scope: the desktop
  HomePage and its 3 copies, the Profilis page, and feature/video subframes.
- **Codebase** — `frontend/` (local mount). React 19 + TS + Vite. Tokens live
  in `frontend/src/styles/_variables-*.scss`. Real product code, real CSS.
- **Live site** — [bezalos.lt](https://www.bezalos.lt) — last visited as
  reference for photography vibe only.

The codebase is _the_ ground truth — Figma is mid-refactor and some Figma
copies (Desktop---HomePage-Copy-1/2) are stale.

---

## Index

| Path                             | What it is                                                            |
| -------------------------------- | --------------------------------------------------------------------- |
| `README.md`                      | This file                                                             |
| `SKILL.md`                       | Agent-skill manifest (load this in Claude Code)                       |
| `colors_and_type.css`            | Single CSS file — drop into any artifact to inherit the brand         |
| `assets/logo/`                   | All logo variants — SVG + PNG favicon                                 |
| `assets/icons/benefits/`         | The four homepage "what you get" icons                                |
| `assets/icons/navbar/`           | Mobile bottom-nav icons                                               |
| `assets/icons/social/`           | Envelope / Facebook / Instagram                                       |
| `assets/images/`                 | Hero meal photos, Sandra portraits, phone mockups, signature          |
| `preview/`                       | Design-system tab cards (one HTML per concept)                        |
| `ui_kits/marketing-site/`        | Hi-fi recreation of the public marketing pages                        |
| `ui_kits/profilis-app/`          | Hi-fi recreation of the logged-in Profilis app                        |

---

## CONTENT FUNDAMENTALS

### Language

The entire product is in **Lithuanian**. Diacritics are real (ą, č, ę, ė, į,
š, ų, ū, ž). Never strip them. When mocking copy you don't have a translation
for, leave a tagged placeholder rather than guessing — a wrong diacritic
breaks trust with the audience.

### Tone

- **Warm, second-person, feminine.** Almost every line addresses a single
  reader directly using the informal _tu_ form: `Tavo`, `tu`, `pavargai`,
  `išmoksi`. Verbs are conjugated to the feminine 2nd person singular
  (`pavargai` not `pavargote`).
- **Empathy first, then promise.** Headlines name the reader's exhaustion
  ("Pavargai nuolat mąstyti apie maistą?" — _Tired of constantly thinking
  about food?_), then offer a gentle way forward.
- **Anti-diet stance** is explicit. Copy repeatedly contrasts with "diets",
  "restrictions", "harming yourself" — and positions the brand as the
  alternative: "be ribojimo", "be žalos", "ramybę ras".
- **First-person author voice** appears in the About section: "Labas, esu
  Sandra" — _Hi, I'm Sandra_. She owns the methodology personally; the brand
  is not depersonalised.

### Casing & punctuation

- **Sentence case** everywhere. No Title Case. Even CTAs: "Virtuvė", "Žiūrėti
  dabar" (only because the banner CTA is intentionally upper-cased in CSS).
- Em-dashes are common in hero copy (line breaks between phrase fragments).
- Question marks are used in headers as a hook (`Pavargai nuolat mąstyti apie
  maistą?` — three of the four section headers are questions).
- Long, single-paragraph body copy with one or two heart emoji (💚) is on
  brand for Sandra's voice. Do not stack emoji.

### Emoji

- **One emoji per section, max.** The green heart 💚 is the brand emoji and
  appears at the end of a personal paragraph in the About section.
- Don't introduce new emoji for UI labels or buttons — the icon system covers
  that.

### Vocabulary anchors

| Use                           | Don't use                                |
| ----------------------------- | ---------------------------------------- |
| _be žalos_, _be ribojimo_     | _dieta_, _griežtas planas_ (as a value)  |
| _bendruomenė_, _mergina_      | _vartotojas_, _klientas_ (in marketing)  |
| _ramybė_, _pokytis_, _kelionė_| _greitas rezultatas_, _-50kg per …_      |
| _santykis su maistu_          | _kalorijų skaičiavimas_ (as the headline)|

### Example specimens

> **Hero**
> Tavo _ilgalaikių_ mitybos pokyčių garantas
> _Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi bendruomenės nare. Juk drauge įpročius formuoti lengviau!_

> **About**
> Labas, esu Sandra
> Pavargai nuolat mąstyti apie maistą?
> Čia ramybę ras tos, kurios pavargo nuo nuolatinio savęs alinimo vis nauja dieta…

> **Footer**
> Keliaujam į ilgalaikius pokyčius kartu?

---

## VISUAL FOUNDATIONS

### Colors

The palette is **deep teal/forest greens for ground, mint-lime as accent,
cream/eggshell as light surface**. Reds, yellows and macro colours are only
used in app charts and validation.

- `--color-bgr-top` `#084747` (deep teal) → `--color-bgr-bottom` `#082b1d`
  (near-black forest) is the **brand gradient**, used vertically on the hero
  and any dark surface.
- `--light-green-600` `#7ed957` (`hsl(100, 60%, 50%)`) is the **CTA fill** and
  the only colour that ever appears as a bright button. Pressed/secondary is
  `#60c040`.
- `--light-green-grey-*` is a tinted cream family — `#eff1ef` is the canonical
  light foreground for text-on-dark, and `#d9ddd7` is the footer card colour.
- App charts use a tiny macro palette: blue `#245d6b` (protein), green
  `#30c040` (carbs), amber `#ec9f11` (fat), grey `#878b86` (kcal).
- Validation: red `hsl(0, 85%, 52%)`, success uses lime-pressed `#60c040`.

### Type

- **Poppins** is the brand face. Used at weights 400/500/600/700 across the
  whole marketing site. SemiBold Italic shows up rarely (24px) as an accent.
- **Inter** is reserved for the feature/plan cards (the four cards in the
  "Interactive plan" section, Inter Bold 32px title, Inter Regular 16px
  body). Don't use Inter elsewhere.
- Type scale is **1.25 ratio**, rooted at 16px / 1rem, defined as both static
  `--font-N` tokens and fluid `--font-d-*-desk/mobi` clamps. Production
  almost always uses the fluid versions.
- Headlines are big (48–60px on desk, clamped down on mobile) and use
  letter-spacing slightly tightened on display sizes.
- Body copy is **20px / line-height 34px / 0.02em tracking** — unusually
  generous; this matters and shouldn't be tightened.

### Backgrounds & motifs

- **The hero is a vertically-gradient deep-teal slab with bottom-only
  rounded corners** (`border-bottom-left/right-radius: 14.5vw`) — this
  "scoop" is the single most distinctive visual gesture in the brand. Copy
  it when introducing a new dark hero. Mobile uses 11.5vw.
- **Full-bleed food photography** is the second motif — warm-lit, natural
  light, slightly desaturated, real ingredients. Salads, pancakes,
  burgeriukas, vegetable bowls. Five hero photos rotate by localStorage
  index — every visit shows a different one.
- **No gradient buttons** on the marketing site — CTAs are flat lime or
  outline pill. The legacy `Buttons.module.css` has gradient red/green save
  buttons, but those are admin-only.
- **No drawn illustrations.** Where icons appear (the four "what you get"
  in the education row), they are simple line icons in `currentColor`.
- **No noise, no grain.** Photography carries texture.

### Layout & rhythm

- Content max-width **1248px**, padded with `clamp()`-based fluid spacing.
- Sections separate with **70px** vertical padding (`.padding--b`,
  `.padding--bt` set this).
- Two-column grids (`Grid` primitive) with `clamp(2rem, 4vw, 6rem)` gap.
- The nav is fixed at top, 80px tall, swaps colour theme on scroll: at-top on
  homepage it's teal-on-cream; once scrolled it's white-on-dark-green.
- A `data-screen-label` is **not** an existing convention here — when adding,
  use one.

### Borders, radii, cards

- Inputs, pills and CTAs use **`border-radius: 999px`** (pill) on the
  marketing site. On the app, more conservative `8px` is used.
- Cards in the "Interactive plan" feature row are **`border-radius: 24px`**
  with a **2px solid black** outline (or the lime fill for the active card).
- Video cards in `/virtuve` are aspect-ratio 5:7, `border-radius: 12px`,
  `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)`, image inside with bottom
  gradient overlay and copy on top.
- Banner / modal: `border-radius: 28px`.
- Hairlines are `0.5px solid var(--light-green-grey-200)`.

### Shadows

- `--shadow-card`: `0 4px 15px rgba(0, 0, 0, 0.1)` — video & content cards.
- `--shadow-xs`: `rgba(99, 99, 99, 0.2) 0 2px 8px 0` — inputs, pills.
- `--shadow-cta`: `0 5px 20px 5px rgba(0, 0, 0, 0.3)` — hero "Virtuvė" CTA.
- `--shadow-modal`: `0 30px 80px -20px rgba(0,0,0,0.55)` + `0 0 0 1px
  rgba(255,255,255,0.04)` — the offer banner modal.

### Motion

- Easings are mostly `0.2s cubic-bezier(0.4, 0, 0.2, 1)` for hovers, and
  `cubic-bezier(0.22, 1, 0.36, 1)` for the banner slide-up.
- **On-load hero animation**: the three title lines start with `opacity: 0.1`
  and a small negative X-translate (`-5%`, `-10%`, `-15%`) and animate to
  full opacity / 0 translate over ~600ms. The hero image starts at
  `opacity: 0.5 scale(0.98)` and lands at full. Section content elsewhere
  uses `IntersectionObserver` to fade-in (`.section--hidden`).
- **Hover states**: nav links draw a 1.2px underline indicator from 0 → 100%
  width over 200ms; cards lift image scale to 1.05; CTAs darken via
  `filter: brightness(1.06)` and translate -1px.
- **Press states**: lime CTAs darken from `#7ed957` → `#60c040`, no shrink.
- Framer Motion is in the codebase but used sparingly. No bounces.

### Transparency & blur

- The banner backdrop uses `backdrop-filter: blur(6px)` on a 55%-opacity
  forest background — this is the only place blur is used in production.
- Photo overlays use simple linear-gradient masks (0→90% opacity black at
  the bottom of video cards) rather than blur.

### Imagery vibe

- Warm, natural daylight. Real food, real plates.
- Sandra photos: muted greens, soft natural light, plant context, no studio
  feel. The portrait crop is generous on negative space.
- A signature ("Sandra" in handwriting) appears as a PNG/WEBP at the bottom
  of the About section — treat it as art, never as a font.

---

## ICONOGRAPHY

Icon usage is **deliberately small and scattered** — Be žalos is photo-led,
not icon-led. Three sources show up in code:

1. **Custom Lithuanian-named SVGs** for the mobile nav and the four
   "education benefits" line icons. Stored in
   `frontend/src/assets/icons/svg/{navbar,benefits,social}` — copied here
   to `assets/icons/`. Stroke-based, `currentColor`, ~32–48px target size.
2. **Phosphor Icons** (`react-icons/pi`) — used in the footer for
   social links (`PiFacebookLogo`, `PiInstagramLogo`, `PiAt`). Phosphor's
   default regular weight is the closest match to the brand's stroke icons,
   so prefer **Phosphor regular** when picking a new icon. Loadable from
   [phosphoricons.com](https://phosphoricons.com) or via the
   `@phosphor-icons/web` CDN.
3. **Lucide React** (`lucide-react`) — used inside the offer banner (`Lock`,
   `X`). Used at `strokeWidth={1.8}` and 16–20px. Reach for Lucide for
   neutral UI bits (close buttons, locks, chevrons) where Phosphor doesn't
   have an obvious match.
4. **FontAwesome** is in `package.json` but I found only legacy admin usage.
   **Don't reach for it** in new design work.

> **Substitution note:** The four "benefits" SVGs in the source were SVG
> Repo-derived files with ISO-8859-1 XML declarations that the asset
> pipeline rejects. I redrew them as Phosphor-style stroke icons preserving
> the original semantics (diary, interactive plan, community,
> change-stats). Mark this for design review — the originals are richer.

### Emoji & Unicode

- The brand emoji is **💚** (green heart). One per section, not as bullets.
- No other emoji are used in UI labels.
- The `©` glyph is the only other Unicode used (footer copyright).

### Logo

The wordmark "be žalos" is set in a custom bespoke face (not a system font),
delivered as SVG with a baseline rule. Use:

- `assets/logo/be-zalos-logo.svg` — the canonical `currentColor` SVG.
  Recolours with CSS `color`. **This is the one to use 95% of the time.**
- `assets/logo/be-zalos-logo-v1-black.svg`, `…-original-black.svg` — alt
  cuts.
- `assets/logo/icon_180x180.png`, `icon_32x32.png` — favicon / app icon.

There is no horizontal/stacked variation — the wordmark is wide
(~6.5rem in the nav) and only the wordmark is used.

---

## Font substitution flag

Poppins and Inter are both **Google Fonts** — no font files to ship; the
`colors_and_type.css` file pulls them straight from the Google Fonts CDN.
**No substitution was needed.**

---

## Caveats / open questions

- Sandra's handwritten signature is a raster asset (PNG/WEBP). For
  production prototypes that need it crisp at any size, ask the user for
  the SVG export.
- The four "education" line icons are redrawn placeholders — see the
  Iconography section.
- The Figma file has 3 copies of the desktop HomePage (`Desktop---HomePage`,
  `…-Copy-1`, `…-Copy-2`); the codebase is canonical when they disagree.
- Padding/margin tokens differ slightly between the two SCSS files
  (`_variables-spaces.scss` vs the legacy values in `index.scss`). I
  normalised to the `_variables-spaces.scss` set.

---
