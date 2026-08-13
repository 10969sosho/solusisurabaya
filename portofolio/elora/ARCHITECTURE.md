# Architecture

## Structure

```text
index.html       Home, hero, collection rail, story, journal preview
shop.html        Product catalog, filter, sort
product.html     Renewal Serum product detail and storytelling
about.html       Brand story, values, sustainability positioning
journal.html     Editorial archive
cart.html        Local demo cart page
styles.css       Shared tokens, layout, responsive rules, motion-safe states
site.js          Shared overlays, cart state, catalog data, GSAP motion
```

## Shared Patterns

- Every page renders the same header, footer, menu overlay, search overlay, and bag drawer.
- GSAP timelines handle page entrance and hero reveal; ScrollTrigger handles parallax, pinned storytelling, horizontal collection movement, and image scale.
- Motion uses transforms and opacity where possible. Long-running scroll animations use `scrub: 1` and are skipped for reduced-motion users.
- Product data lives in the `products` object in `site.js`; the catalog markup remains static for presentation control.

## Motion System

- ScrollSmoother provides momentum scrolling and `data-speed` / `data-lag` parallax effects.
- SplitText character reveals use slide + fade (no per-character clipping mask) so serif ascenders, accents, and descenders remain intact; ScrambleText scrambles section numbers and the hero eyebrow; CustomEase supplies the house easing curve.
- The home hero timeline uses a clip-path image wipe, char-by-char typography reveal, and a scramble eyebrow.
- The horizontal showcase pins only once its rail reaches the reading zone (`top 52%`); Observer listens to wheel input only to add a restrained velocity skew and never calls `preventDefault`, so native scroll cannot lock.
- Draggable + InertiaPlugin make the bag drawer a draggable sheet with velocity handoff and rubber-band edges.
- Flip animates add-to-bag flights (product image to bag counter) and catalog filter/sort re-layouts.
- A mouse follower (gsap.quickTo) and magnetic buttons run only on hover-capable, non-reduced-motion devices.

## Three.js Layer

- `elora3d.js` renders a WebGL fluid shader (fbm domain warp with gold filaments and grain) behind the home Renewal Study section.
- Scroll progress (`window.__eloraProgress`) shifts the palette; mouse position displaces the field; rendering pauses off-screen (IntersectionObserver) and caps DPR at 1.75.

## Cart Pattern

`site.js` owns the demo bag. Add, remove, and quantity operations update `localStorage`, the header count, the drawer, and `cart.html` when present. Checkout is a visual-only action.
