# SqueezeCase — PRD

## Original Problem Statement
Build a Shopify-style store for SqueezeCase, a creator-led phone case brand fronted by a young woman (Maya) who overcame bullying through motivational YouTube content. Must feel personal, warm, crafted — not a corporate tech retailer. Bold distinctive palette/typography, small personal touches, playful micro-animations. Home page (hero, story, featured product, social proof strip) + full product page (gallery w/ trust badge, star rating, discount %, Klarna note, coupon countdown, searchable phone model selector grouped by brand, delivery countdown w/ daily cutoff, Buy Now/Add to Cart, trust badges, FAQ accordion, scrollable photo reviews), shared header/footer, everything editable.

## User Personas
- Teen/young-adult buyer who discovered Maya via YouTube/TikTok; buys for identity + protection.
- Gift buyer (friend/sibling) touched by the brand story.

## Architecture
- Backend: FastAPI + MongoDB (`site_content` collection, single `key: "main"` doc). `GET /api/content` (lazy-seeds from `content_seed.py`), `PUT /api/content` (full-doc replace — editability).
- Frontend: React + Tailwind + framer-motion + shadcn accordion + sonner. Routes: `/` (Home), `/product/:slug` (ProductPage). CartContext for cart count. All page content fetched from `/api/content`.
- Design: neo-brutalist "sticker book" — Warm Oat bg, Hot Coral primary, Mint secondary, Warm Yellow accents; Clash Display / Figtree / Caveat; 2px borders + hard offset shadows. Guidelines at /app/design_guidelines.json.

## Implemented (2026-07-11)
- Home: asymmetric hero w/ sticker badges + squiggle underline, marquee social proof strip, founder story w/ polaroid + handwritten quote card, featured product w/ % off, closing CTA.
- Product page: gallery + thumbnails + trust badge overlay, stars + review count, price strike + 30% pill, Klarna pill, coupon banner w/ live countdown + copy-to-clipboard, searchable model selector (Apple/Samsung/Google), delivery countdown vs 2pm cutoff (recalculates today/tomorrow), Add to Cart (updates header cart badge + toast), Buy Now (demo toast), trust badge row, FAQ accordion, horizontally scrollable photo reviews.
- Shared sticky header w/ cart count, footer w/ handwritten note.
- Verified: API curl, full product flow (search→select→add→cart count), FAQ, reviews, countdowns.

## Implemented (2026-07-11, iteration 2)
- Product page: removed top-right "DROP-TESTED 10 FT" image overlay; added compact top-left sticker-style review pill (stars + rating + comma-formatted count, e.g. "4.9 · 3,214 reviews").
- Multi-design catalog: 4 products (The Brave One / The Wild One leopard / The Bold One tiger / The Quirky One cow-Y2K), each with own price, rating, review count, gallery, tagline, Klarna note.
- Homepage "Choose your design" section (#designs): staggered rotated polaroid cards w/ % off sticker, name, rating, price → links to each /product/:slug. Header "Shop" nav now points to /#designs.

## Implemented (2026-07-11, iteration 3 — cart experience)
- CartContext: quantities, line items (slug+model merge), subtotal/count, drawer open state, coupon applied, upsell claimed; items persisted to localStorage (`squeezecase_cart`).
- Cart drawer (slide-out, opens from header cart icon + after Add to Cart): compact line items (image/name/model/qty stepper/remove), free-shipping progress, cart-mode coupon (code + Apply discount + countdown), compact delivery countdown, subtotal + discount, Proceed to Checkout (uses editable `cart.checkoutUrl`; demo toast when empty).
- Cart page (/cart, Buy Now navigates here): line-item card, upsell gift block (editable giftName/text/minutes, own countdown, claim toggle, expired state), compact 3-quote reviews strip, sticky summary card (free shipping, coupon, delivery, totals, checkout, trust row), playful empty states on both drawer + page.
- Shared components: CartLineItem, FreeShippingBar; CouponBanner + DeliveryCountdown gained cart/compact modes (product page unchanged).
- Seed: `coupon.percent` + `cart` config block (threshold, checkoutUrl, labels, upsell) — all editable via PUT /api/content.
- Verified: add→drawer opens, qty stepper, coupon −15%, free-shipping qualify, upsell claim, cart survives reload, remove→empty state, drawer-from-header empty state.

## Backlog
- P0: none blocking.
- P1: real cart drawer + checkout (Stripe), cart persistence (localStorage/DB), more products/collection grid, admin edit UI for content (currently API-only).
- P2: wishlist, order tracking page, UGC photo upload for reviews, i18n.
