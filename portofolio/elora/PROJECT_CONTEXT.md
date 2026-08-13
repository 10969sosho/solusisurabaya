# Project Context

ÉLORA is a static presentation demo for a premium skincare brand. The primary goal is an emotionally memorable, editorial experience rather than a conventional ecommerce conversion funnel.

## Product Direction

- Audience: beauty-conscious visitors who respond to considered formulas and luxury editorial storytelling.
- Tone: quiet luxury, warm, tactile, precise, feminine without being childish.
- Signature interaction: a pinned, dark-green renewal story and an immersive horizontal collection rail on the home page. Motion must remain readable and never block native scroll.

## Runtime

This is plain HTML, CSS, and browser JavaScript. GSAP 3.13 with ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin, CustomEase, ScrollToPlugin, Observer, Draggable, InertiaPlugin, and Flip is loaded from jsDelivr in each page, plus a Three.js WebGL shader module on the home page. The cart is intentionally local-only and stores its state in `localStorage` under `elora-bag`.

## Accessibility

Semantic links and buttons are used for primary actions, image alt text is included, keyboard focus remains browser-visible, and `prefers-reduced-motion` disables cinematic transforms and keeps content visible.
