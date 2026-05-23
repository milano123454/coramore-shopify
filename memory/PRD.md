# Coramore — Shopify Theme PRD

## Problem Statement
Create a premium Shopify Online Store 2.0 theme for a 2-in-1 bag with thermal compartment. Brand: Coramore. Price: €49. Italian language. High-conversion design targeting 30-55 year old women from social media.

## What's Been Implemented (2025-05-23)
- Complete Shopify OS 2.0 theme (29 files)
- 14 sections with customizable schemas
- 5 JSON templates (index, product, collection, cart, page)
- Italian locale
- CSS with animations, responsive design, Trustpilot-style widgets
- Vanilla JS (scroll reveal, countdown timer, FAQ, gallery zoom)
- Download page (React) + API endpoint (FastAPI) serving .zip
- Fix: zip paths corrected to root level for Shopify compatibility

## Architecture
- Theme: /app/theme/ (Liquid + CSS + JS)
- Backend: FastAPI serving /api/download-theme and /api/theme-info
- Frontend: React download page

## Backlog
- P1: Add 404 template
- P2: Add blog templates
- P2: Add search template
- P3: Add dark mode support
