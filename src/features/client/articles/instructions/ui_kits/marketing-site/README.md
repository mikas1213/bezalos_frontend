# UI kit — Marketing site

A hi-fi React + Babel recreation of the public-facing **Be žalos** marketing
pages. Stitches together the homepage and the Virtuvė video library as a
click-thru prototype with two main views.

## Files

| File                  | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| `index.html`          | Mount point. Loads React, Babel, components, app      |
| `App.jsx`             | Router state + view switching + banner modal          |
| `Navbar.jsx`          | Fixed top nav with theme swap (at-top vs scrolled)    |
| `HomePage.jsx`        | Hero, experience stats, about, education, offers, plan|
| `VirtuvePage.jsx`     | Video library grid with category filter chips         |
| `Footer.jsx`          | Newsletter pill + small footer + social               |
| `Banner.jsx`          | Promo modal (lime CTA, photo + copy)                  |
| `data.js`             | Plain-object content (meals, videos, reviews)         |

## Running

Just open `index.html`. No build step.

## What's faithful, what isn't

- ✅ Type, color, radii, gradients, layouts pulled from the codebase tokens
- ✅ Lithuanian copy is taken verbatim from `frontend/src` where possible
- ✅ Hero on-load animation (opacity 0.1 + X translate → 1 + 0)
- ✅ Navbar theme swap on scroll, with smooth transition
- ✅ Hero-image rotation (localStorage index, cycles through 5 meals)
- ⚠️ The video player and auth modal aren't built — clicking a video card
  triggers a "Pasimatom netrukus" placeholder. Mention this if asked to
  build a video screen.
- ⚠️ Mobile nav (bottom drawer) is omitted — desktop only.
