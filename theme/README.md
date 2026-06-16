# Lumina Milano — Shopify Theme

Tema Shopify pixel-replica della landing **Lumina Milano** (Diamond Tote Bag).

## 📦 Installazione

### Opzione A — Carica lo zip (più semplice)
1. Scarica `lumina-milano-shopify-theme.zip` dalla root del repo
2. Vai su **Shopify Admin → Online Store → Themes**
3. Clicca **Add theme → Upload zip file**
4. Carica lo zip
5. **Customize** per personalizzare via Theme Editor

### Opzione B — Da CLI (per sviluppatori)
```bash
shopify theme push --store your-store.myshopify.com
```

## 🎨 Struttura

```
theme/
├── assets/             # CSS, JS, immagini, font
├── config/             # settings_schema.json, settings_data.json
├── layout/             # theme.liquid, password.liquid
├── locales/            # it.default.json, en.json
├── sections/           # 17 sezioni + 3 section group
├── snippets/           # cart-drawer, icone, helper
└── templates/          # 11 template (index, product, collection, cart, ecc.)
```

## ✏️ Modifiche dall'admin

Tutto è modificabile dal **Theme Editor**:

- **Homepage:** hero, showcase 4 colori, benefits (4), recensioni (3), FAQ (6), CTA banner — ogni testo, immagine, prezzo è editabile.
- **Product page:** titolo, eyebrow, sottotitolo, rating, countdown, badge bestseller, accordion (Cosa Include / Materiali / Spedizione) — modifica i blocchi.
- **Header / Footer:** brand, link, contatti, copyright.
- **Colori e font:** sezione "Colori" e "Tipografia" nelle impostazioni del tema.

## 🛒 Funzionalità incluse

- ✅ Cart drawer AJAX (slide-in da destra) con badge contatore
- ✅ Add-to-cart asincrono dal product form
- ✅ Variant picker con swatches colore (Nero / Marrone / Viola / Verde)
- ✅ Quantity stepper
- ✅ Countdown timer (sessione)
- ✅ FAQ + Product details accordion
- ✅ Mobile nav drawer
- ✅ Responsive (mobile / tablet / desktop)

## 📐 Design Tokens

| Token | Valore |
|-------|--------|
| `--color-bg` | `#FAF9F6` |
| `--color-primary` | `#1C352D` |
| `--color-gold` | `#D4AF37` |
| `--color-urgency` | `#B33939` |
| `--font-heading` | Cormorant Garamond |
| `--font-body` | Manrope |

Modificabili dall'admin → Tema → Personalizza → Impostazioni → Colori.

## 🔧 Note tecniche

- **Liquid version:** Online Store 2.0 (sectioned templates JSON)
- **Currency:** EUR (modificabile in Shopify Admin → Settings → General)
- **Lingua default:** Italiano (modificabile in Shopify Admin → Settings → Languages)
- **Font Manrope:** caricato via Google Fonts CDN
- **Font Cormorant Garamond:** self-hosted (woff2 in `assets/`)

## 🐛 Limitazioni note

- Le risposte FAQ sono testi default — modificabili nel Theme Editor.
- Le immagini delle 4 varianti colore sono nel tema come asset statici (`product-{nero,marrone,viola,verde}.png`); per un setup multi-variante completo, crea un prodotto Shopify con 4 varianti `Color` e carica le foto specifiche.

---

Made with care for **Coramore** · 2025
