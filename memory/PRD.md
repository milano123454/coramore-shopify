# SqueezeCase — PRD

## Original problem statement
Premium, high-converting e-commerce site for phone cases with a printed animal photo and a real 3D soft silicone NOSE that protrudes and can be squeezed like a stress toy. Must feel premium/award-worthy, fully config-driven (portable to Shopify sections), mobile-first. Homepage: interactive 3D hero with squishable nose, how-it-feels scroll section, best sellers carousel, social proof, video reviews, brand story, footer. Product page: sticky gallery + floating review badge, buy box (Trustpilot rating row, price + discount, Klarna line, coupon card with countdown, searchable model selector, image variant swatches with per-variant ratings, qty + buy buttons, sold-out states, trust badges, delivery countdown, accordions), reviews section (summary widget + distribution, text carousel, video reviews), FAQ. Demo cart with drawer, checkout MOCKED.

## User choices (16 Aug 2026)
- Language: Italian · Currency: EUR (€) · Brand: SqueezeCase
- Imagery: curated stock placeholders (Wikimedia/Pexels/Unsplash/randomuser)
- Cart: demo cart + drawer, checkout MOCKED
- Design: from-scratch premium (per /app/design_guidelines.json); keep Trustpilot green + Klarna pink recognizable; everything else original

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, framer-motion, lenis, three/@react-three/fiber/@react-three/drei, embla-carousel, canvas-confetti
- Central config: /app/frontend/src/config/site.js — ALL content (texts, prices, variants, models, reviews, FAQ, timers) editable in one place
- Cart state: /app/frontend/src/context/CartContext.jsx (localStorage persisted)
- Pages: / (HomePage), /prodotto/:variantId (ProductPage)
- Backend: FastAPI + MongoDB — GET /api/health, POST/GET /api/newsletter
- Components: Navbar, Footer, CartDrawer, Marquee, Reveal, MagneticButton, TrustpilotStars, VideoReviews, home/{Hero3D, HowItFeels, BestSellers, SocialProof, BrandStory}, product/{Gallery, BuyBox, CouponCard, ModelSelector, VariantSelector, DeliveryEstimate, ReviewsSection, FAQ}

## User personas
- Gift buyer looking for a cute, unique phone accessory
- Stress-relief/fidget toy lover who wants tactile objects
- Phone-case shopper comparing designs and models on mobile

## Core requirements (static)
- Wow-factor interactive hero with squishable 3D nose
- Conversion-optimized product page with all trust elements
- 100% config-driven content (Shopify-portable)
- Mobile-first, accessible (focus states, aria labels, alt texts), data-testid on interactive elements

## Implemented (16 Aug 2026)
- R3F hero: drag-rotate case, center-cropped animal print, spring-physics nose squish + on-load hint pulses, masked line-by-line headline reveal
- Editorial marquee, scroll-driven how-it-feels (nose squashes on scroll, benefits light up)
- Best sellers embla carousel with 3D tilt cards, discount badges, ratings
- Social proof strip (4.9, 12.400+, trust logos), video reviews carousel + fullscreen player, brand story chapters with parallax
- Product page: sticky gallery + zoom + Trustpilot floating badge, full buy box (Klarna, coupon SQUEEZE15 -15% with confetti + 15-min countdown, brand→family→model searchable selector with popular/recent pins + summary chip, 8 variant swatches with per-variant ratings + sold-out state, magnetic Buy Now, trust badge grid, live delivery countdown, 5 accordions)
- Reviews: Trustpilot widget + distribution bars, text carousel (arrows/dots/swipe), video row
- FAQ (8 phone-case questions), footer with working newsletter (MongoDB)
- Demo cart drawer: qty, remove, coupon discount, totals, MOCKED checkout

## Verified
- API: /api/health, POST /api/newsletter (valid + invalid email)
- E2E via screenshots: hero squish, coupon apply (confetti + "Applicato"), model select (iPhone 16 Pro chip), add to cart (total 29,67 € with -5,24 € coupon), FAQ open, carousels

## Backlog / next tasks
- P0: Real product photography/renders to replace stock placeholders
- P1: Real checkout (Stripe) or Shopify theme port; real customer video uploads
- P1: Per-variant price override support in config
- P2: Wishlist, product comparison, multi-language (IT/EN) switcher
- P2: AI-generated hero textures per animal for consistent 3D look

---
## Update — 16 Jun 2026 · 3D interactivity + PDP/CTA fixes

Fixed the 6 reported bugs (verified in browser + testing agent iteration_3, 13/13 scenarios pass):
1. Real interactive 3D (rewrote `Case3DScene.jsx` `CaseRig`): custom pointer drag-to-rotate (mouse+touch) with inertia + continuous spring-back to front-facing angle; gentle idle sway (Math.sin) that stops on first interaction; pressable silicone nose with elastic spring squash (repeatable). Nose press guarded from triggering drag via module `noseHeldUntil` flag.
2. Hero 3D enlarged & dominant (`Hero3D.jsx` h-[88vh], cameraZ 10.4 — fits without clipping at 1920).
3. Design variant grid reachable on desktop — removed internal sticky `overflow-y-auto`/`max-h` scroll trap in `ProductPage.jsx`.
4. Selecting a variant updates 3D texture + nose (colour/scale/shape, crossfade); phone model morphs shell + camera cutout. Per-variant `nose.pos` offset added in `site.js` (gatto tuned).
5. Saturated CTA: new `theme.cta`/`theme.ctaDark` (#BC5A6F / #A3465B) → tailwind `cta` color, `shadow-cta`; applied to hero primary CTA, Acquista ora, newsletter button.
6. Perf retained: lazy 3D after idle, IntersectionObserver frameloop pause, static fallback on reduced-motion/very-low-end. Hint pill shows only when live scene is ready.

All content remains editable via `/app/frontend/src/config/site.js` (incl. theme.cta, nose.pos). Checkout still MOCKED.
