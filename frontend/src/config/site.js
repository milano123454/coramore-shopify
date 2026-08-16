// ============================================================
// SqueezeCase — CENTRAL SITE CONFIG
// Ogni testo, prezzo, immagine, badge, recensione e impostazione
// del sito vive qui. Modifica questo file per cambiare tutto il
// contenuto senza toccare i componenti (portabile su Shopify).
// ============================================================

const IMG = {
  pandaRosso: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Red_Panda_DSC_3253_copy.jpg/960px-Red_Panda_DSC_3253_copy.jpg",
  pandaRosso2: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Red_Panda_Portrait_%2831625024560%29.jpg/960px-Red_Panda_Portrait_%2831625024560%29.jpg",
  gatto: "https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?w=900&q=80&auto=format",
  carlino: "https://images.pexels.com/photos/7788858/pexels-photo-7788858.jpeg?auto=compress&w=900",
  panda: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Ailuropoda_melanoleuca_%28Panda_g%C3%A9ant%29_-_445.jpg/960px-Ailuropoda_melanoleuca_%28Panda_g%C3%A9ant%29_-_445.jpg",
  koala: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/960px-Koala_climbing_tree.jpg",
  coniglio: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bunny_in_a_small_zoo.jpg/960px-Bunny_in_a_small_zoo.jpg",
  fennec: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fennec_Fox_Peek.jpg/960px-Fennec_Fox_Peek.jpg",
  lontra: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/European_otter_01.jpg/960px-European_otter_01.jpg",
  shiba: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/A_Shiba_Inu_enjoying_a_sunny_day.jpg/960px-A_Shiba_Inu_enjoying_a_sunny_day.jpg",
  riccio: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/West_European_Hedgehog_%28Erinaceus_europaeus%291.jpg/960px-West_European_Hedgehog_%28Erinaceus_europaeus%291.jpg",
  alpaca: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/D%C3%BClmen%2C_B%C3%B6rnste%2C_Alpakas_--_2020_--_5462.jpg/960px-D%C3%BClmen%2C_B%C3%B6rnste%2C_Alpakas_--_2020_--_5462.jpg",
  nasoMacro: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pug_dog_nose_face_detail.JPG/960px-Pug_dog_nose_face_detail.JPG",
  lifestyle1: "https://images.pexels.com/photos/7859172/pexels-photo-7859172.jpeg?auto=compress&w=1200",
  lifestyle2: "https://images.pexels.com/photos/7984815/pexels-photo-7984815.jpeg?auto=compress&w=1200",
  smartphoneMano: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Black_smartphone_in_hand_%28Unsplash%29.jpg/960px-Black_smartphone_in_hand_%28Unsplash%29.jpg",
};

export const site = {
  brand: {
    name: "SqueezeCase",
    tagline: "La cover che si coccola",
  },

  // Palette del sito (modificabile): tutti i colori UI derivano da qui
  theme: {
    accent: "#C58A94",
    accentDark: "#B27380",
    cta: "#BC5A6F",
    ctaDark: "#A3465B",
    background: "#FAF6F2",
    surface: "#F2EAE4",
    text: "#40312C",
    muted: "#8B7A73",
    trustpilot: "#00B67A",
    klarna: "#FFA8C5",
    noseFrom: "#E9B4BC",
    noseTo: "#DE9CA7",
    confetti: ["#C58A94", "#00B67A", "#FFA8C5", "#40312C"],
  },

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "La Cover", href: "/prodotto/panda-rosso" },
      { label: "Recensioni", href: "/prodotto/panda-rosso#recensioni" },
      { label: "FAQ", href: "/prodotto/panda-rosso#faq" },
    ],
    cartLabel: "Carrello",
    menuLabel: "Menu",
  },

  hero: {
    eyebrow: "Cover con nasino 3D in silicone",
    titleLines: ["Schiaccia il naso.", "Sciogli lo stress."],
    subtitle:
      "Ogni cover ha il muso del tuo animale preferito stampato sul retro — e il suo naso è un morbido cuscinetto 3D in silicone che sporge davvero. Premilo. Rimbalza. Sorridi.",
    ctaPrimary: { label: "Scegli il tuo animale", href: "/prodotto/panda-rosso" },
    ctaSecondary: { label: "Scopri come funziona", href: "#come-si-sente" },
    hint: "Trascina per ruotare · Premi il naso",
    ratingNote: { average: 4.9, count: 2847, text: "recensioni verificate" },
    model3d: {
      textureUrl: IMG.pandaRosso2,
      caseColor: "#241f1b",
      nose: { color: "#4a342b", scale: 1.08, flat: 1 },
      cameraHint: "Premimi!",
    },
    marquee: [
      "Spedizione gratuita in 24h",
      "Reso gratuito 30 giorni",
      "4.9 su Trustpilot",
      "12.400+ clienti felici",
      "Silicone food-grade",
      "Nasino anti-stress garantito",
    ],
  },

  howItFeels: {
    eyebrow: "Come si sente",
    title: "Un piccolo rituale anti-stress, sempre in tasca",
    paragraphs: [
      "Il nasino è realizzato in silicone food-grade ultra-morbido: si schiaccia con un dito e torna in forma in un attimo, migliaia di volte.",
      "Lo abbiamo progettato con la stessa cura di uno squishy da collezione — ma vive attaccato alla tua cover, pronto nei momenti di attesa, riunione o caos.",
    ],
    benefits: [
      { title: "Morbidezza reale", text: "Silicone food-grade, piacevole al tatto, senza odori." },
      { title: "Sempre elastico", text: "Testato per oltre 100.000 schiacciate senza deformarsi." },
      { title: "Protezione vera", text: "Bumper in TPU antiurto e retro rigido stampato in HD." },
    ],
    image: IMG.nasoMacro,
    imageAlt: "Primo piano del naso in silicone morbido sulla cover",
  },

  bestSellers: {
    eyebrow: "I più venduti",
    title: "Scegli il tuo muso",
    subtitle: "Sei design amatissimi, un solo nasino irresistibile.",
    currency: "EUR",
  },

  socialProof: {
    average: 4.9,
    label: "Eccellente",
    customers: "12.400+",
    customersLabel: "clienti felici",
    logos: ["Trustpilot", "Klarna", "Stripe", "PayPal", "Apple Pay"],
  },

  videoReviews: {
    eyebrow: "Le nostre clienti parlano",
    heading: "Video reali, clienti reali",
    subheading: "Nessuna finzione: guarda come reagiscono al primo schiacciamento.",
    items: [
      { name: "Giulia M.", stars: 5, quote: "Il nasino è la cosa più carina che abbia mai toccato.", thumb: "https://randomuser.me/api/portraits/women/44.jpg", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { name: "Marco T.", stars: 5, quote: "Lo schiaccio in continuazione in ufficio.", thumb: "https://randomuser.me/api/portraits/men/32.jpg", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" },
      { name: "Sara B.", stars: 5, quote: "Qualità assurda, la stampa è perfetta.", thumb: "https://randomuser.me/api/portraits/women/68.jpg", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { name: "Luca R.", stars: 4, quote: "Regalo azzeccatissimo per la mia ragazza.", thumb: "https://randomuser.me/api/portraits/men/75.jpg", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" },
      { name: "Elena F.", stars: 5, quote: "Tutti me lo chiedono ovunque vada.", thumb: "https://randomuser.me/api/portraits/women/21.jpg", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    ],
  },

  brandStory: {
    eyebrow: "La nostra storia",
    title: "Nati per strappare un sorriso",
    chapters: [
      { num: "01", title: "L'idea", text: "Tutto è iniziato in un laboratorio di Torino, ossessionati da una domanda: perché le cover sono tutte uguali? Volevamo un oggetto che si toccasse, non solo si guardasse." },
      { num: "02", title: "Il prototipo", text: "Dopo 47 stampi in silicone e mesi di test di morbidezza, è nato il primo nasino: abbastanza morbido da schiacciare, abbastanza elastico da durare anni." },
      { num: "03", title: "Oggi", text: "Oltre 12.400 persone portano in tasca un piccolo animale da coccolare. Ogni cover è stampata, montata e controllata a mano, una per una." },
    ],
    image: IMG.lifestyle1,
    imageAlt: "Persona che usa lo smartphone con la cover SqueezeCase",
    cta: { label: "Scopri la cover", href: "/prodotto/panda-rosso" },
  },

  footer: {
    newsletter: {
      title: "Resta nel club",
      text: "Sconti, nuovi musi e lanci in anteprima. Niente spam, promesso.",
      placeholder: "La tua email",
      button: "Iscriviti",
      success: "Benvenuto nel club! Controlla la tua inbox.",
    },
    columns: [
      { title: "Shop", links: [{ label: "Tutte le cover", href: "/prodotto/panda-rosso" }, { label: "I più venduti", href: "/#best-sellers" }, { label: "Recensioni", href: "/prodotto/panda-rosso#recensioni" }] },
      { title: "Aiuto", links: [{ label: "FAQ", href: "/prodotto/panda-rosso#faq" }, { label: "Spedizione e resi", href: "/prodotto/panda-rosso#faq" }, { label: "Contatti", href: "mailto:ciao@squeezecase.it" }] },
    ],
    payments: ["Visa", "Mastercard", "PayPal", "Klarna", "Apple Pay"],
    info: "Spedizione in 24h · Reso gratuito entro 30 giorni · Pagamenti 100% sicuri",
    copyright: "© 2026 SqueezeCase. Tutti i diritti riservati.",
  },

  // ---------------------------------------------------------
  // PRODOTTO (pagina prodotto)
  // ---------------------------------------------------------
  product: {
    slug: "cover-nasino-3d",
    title: "Cover Nasino 3D",
    subtitle: "Stampa HD + naso in silicone morbido",
    rating: { average: 4.9, count: 2847, label: "Eccellente" },
    price: { current: 34.9, original: 49.9, currency: "EUR" },
    klarna: { installments: 3, text: "oppure {n} rate da {amount} senza interessi con" },

    galleryBadge: { average: 4.9, count: 2847 },

    coupon: {
      tag: "Coupon",
      title: "Ottieni il {percent}% di sconto",
      code: "SQUEEZE15",
      percent: 15,
      durationMinutes: 15,
      applyLabel: "Applica",
      appliedLabel: "Applicato",
      expiryLabel: "Offerta scade tra:",
      successToast: "Coupon SQUEEZE15 applicato: -15%!",
    },

    models: {
      label: "Modello",
      searchPlaceholder: "Cerca il tuo modello…",
      popularLabel: "Più richiesti",
      recentLabel: "Usati di recente",
      brandsLabel: "Marca",
      confirmLabel: "Modello selezionato",
      changeLabel: "Cambia",
      emptyResult: "Nessun modello trovato",
      brands: [
        { id: "apple", name: "Apple", families: [
          { name: "iPhone 16", models: ["iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"] },
          { name: "iPhone 15", models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"] },
          { name: "iPhone 14", models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"] },
          { name: "iPhone 13", models: ["iPhone 13", "iPhone 13 mini", "iPhone 13 Pro", "iPhone 13 Pro Max"] },
          { name: "iPhone SE", models: ["iPhone SE (2022)"] },
        ]},
        { id: "samsung", name: "Samsung", families: [
          { name: "Galaxy S25", models: ["Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra"] },
          { name: "Galaxy S24", models: ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S24 FE"] },
          { name: "Galaxy S23", models: ["Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra"] },
          { name: "Galaxy A", models: ["Galaxy A55", "Galaxy A35", "Galaxy A15"] },
          { name: "Galaxy Z", models: ["Galaxy Z Flip 6", "Galaxy Z Fold 6"] },
        ]},
        { id: "google", name: "Google", families: [
          { name: "Pixel 9", models: ["Pixel 9", "Pixel 9 Pro", "Pixel 9 Pro XL", "Pixel 9a"] },
          { name: "Pixel 8", models: ["Pixel 8", "Pixel 8 Pro", "Pixel 8a"] },
          { name: "Pixel 7", models: ["Pixel 7", "Pixel 7 Pro", "Pixel 7a"] },
        ]},
        { id: "xiaomi", name: "Xiaomi", families: [
          { name: "Xiaomi 15", models: ["Xiaomi 15", "Xiaomi 15 Pro", "Xiaomi 15 Ultra"] },
          { name: "Redmi Note", models: ["Redmi Note 14", "Redmi Note 14 Pro", "Redmi Note 13"] },
          { name: "POCO", models: ["POCO X7 Pro", "POCO F6"] },
        ]},
      ],
      popular: ["iPhone 16 Pro", "iPhone 15", "Galaxy S24", "Pixel 9", "iPhone 14", "Galaxy S25 Ultra"],
    },

    // Forma 3D della cover per ogni modello: layout fotocamera per marca + proporzioni per taglia
    phone3d: {
      cameras: { apple: "square", xiaomi: "square", samsung: "pill", google: "bar" },
      sizes: [
        { keywords: ["pro max", "plus", "ultra", "fold", "xl"], w: 1.07, h: 1.05 },
        { keywords: ["mini", "se (", "9a", "8a", "7a", "a15", "a35", "a55"], w: 0.94, h: 0.92 },
        { keywords: ["flip"], w: 0.96, h: 0.9 },
      ],
    },

    gallery3d: { hint: "Trascina per ruotare · Premi il naso", thumbLabel: "3D" },
    galleryVideo: {
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: IMG.nasoMacro,
      label: "Video",
    },

    variants: [
      { id: "panda-rosso", name: "Panda Rosso", colorName: "Ruggine", rating: 4.9, reviewsCount: 812, inStock: true, image: IMG.pandaRosso, gallery: [IMG.pandaRosso, IMG.pandaRosso2, IMG.smartphoneMano, IMG.nasoMacro], caseColor: "#241f1b", nose: { color: "#4a342b", scale: 1.05, flat: 1 } },
      { id: "gatto", name: "Gatto", colorName: "Tigrato", rating: 4.8, reviewsCount: 634, inStock: true, image: IMG.gatto, gallery: [IMG.gatto, IMG.smartphoneMano, IMG.nasoMacro], caseColor: "#2a2320", nose: { color: "#e2a3ab", scale: 0.85, flat: 0.9, pos: [0, -0.45] } },
      { id: "carlino", name: "Carlino", colorName: "Nero", rating: 4.9, reviewsCount: 557, inStock: true, image: IMG.carlino, gallery: [IMG.carlino, IMG.nasoMacro, IMG.smartphoneMano], caseColor: "#1f1b19", nose: { color: "#26201d", scale: 1.2, flat: 0.85 } },
      { id: "panda", name: "Panda", colorName: "Bianco & Nero", rating: 4.8, reviewsCount: 421, inStock: true, image: IMG.panda, gallery: [IMG.panda, IMG.smartphoneMano, IMG.nasoMacro], caseColor: "#efe9e1", nose: { color: "#241f1d", scale: 1.15, flat: 0.95 } },
      { id: "koala", name: "Koala", colorName: "Grigio", rating: 4.7, reviewsCount: 389, inStock: false, image: IMG.koala, gallery: [IMG.koala, IMG.nasoMacro, IMG.smartphoneMano], caseColor: "#8d8781", nose: { color: "#33281f", scale: 1.35, flat: 1 } },
      { id: "coniglio", name: "Coniglio", colorName: "Crema", rating: 4.9, reviewsCount: 342, inStock: true, image: IMG.coniglio, gallery: [IMG.coniglio, IMG.smartphoneMano, IMG.nasoMacro], caseColor: "#efe4d8", nose: { color: "#e8a7ae", scale: 0.75, flat: 0.85 } },
      { id: "fennec", name: "Fennec", colorName: "Sabbia", rating: 4.8, reviewsCount: 268, inStock: true, image: IMG.fennec, gallery: [IMG.fennec, IMG.nasoMacro, IMG.smartphoneMano], caseColor: "#d9c3a3", nose: { color: "#2b2018", scale: 0.8, flat: 0.9 } },
      { id: "lontra", name: "Lontra", colorName: "Marrone", rating: 4.9, reviewsCount: 197, inStock: true, image: IMG.lontra, gallery: [IMG.lontra, IMG.smartphoneMano, IMG.nasoMacro], caseColor: "#4a382b", nose: { color: "#3b2b20", scale: 1.1, flat: 0.95 } },
    ],

    bestSellerIds: ["panda-rosso", "gatto", "carlino", "panda", "coniglio", "fennec"],

    trustBadges: [
      { icon: "truck", label: "Spedizione gratuita" },
      { icon: "rotate", label: "Reso gratuito 30 giorni" },
      { icon: "lock", label: "Pagamento 100% sicuro" },
      { icon: "zap", label: "Spedito entro 24h" },
    ],

    delivery: {
      cutoffHour: 16,
      daysToDeliver: 2,
      textBefore: "Ordina entro",
      textAfter: "e ricevi",
      deliveredByLabel: "consegna stimata",
    },

    howItsMade: {
      eyebrow: "Come è fatta",
      title: "Tre strati, un solo nasino",
      layers: [
        { id: "shell", title: "Scocca stampata HD", caption: "Retro rigido in policarbonato con stampa fotografica HD anti-graffio e anti-UV: i colori restano vividi per anni, anche con uso quotidiano." },
        { id: "bumper", title: "Bumper morbido in TPU", caption: "Il perimetro flessibile assorbe gli urti e rende la cover facile da montare, con bordi rialzati di 1,2 mm che proteggono schermo e fotocamera." },
        { id: "nose", title: "Naso in silicone food-grade", caption: "Il cuore di SqueezeCase: un cuscinetto 3D ultra-morbido, atossico e senza odori, testato per oltre 100.000 schiacciate." },
      ],
    },

    benefits: [
      { icon: "feather", title: "Leggerissima", text: "Solo 38 grammi: non senti il peso, senti solo il nasino." },
      { icon: "shield", title: "Anti-urto", text: "Protezione testata con cadute da 2 metri di altezza." },
      { icon: "sparkles", title: "Anti-stress", text: "Un piccolo rituale tattile che calma davvero." },
      { icon: "magnet", title: "MagSafe ready", text: "Compatibile con ricarica wireless e MagSafe." },
    ],

    lifestyle: {
      eyebrow: "Nella vita vera",
      images: [
        { src: IMG.lifestyle1, alt: "Persona che usa lo smartphone con la cover SqueezeCase" },
        { src: IMG.lifestyle2, alt: "Cover SqueezeCase nella vita quotidiana" },
      ],
    },

    accordions: [
      { title: "Cosa include", content: "1× Cover Nasino 3D con stampa HD del tuo animale · 1× naso in silicone già montato · 1× panno in microfibra per la pulizia · 1× guida rapida. Confezione regalo riciclabile inclusa." },
      { title: "Materiali", content: "Retro rigido in policarbonato con stampa HD anti-graffio, bumper flessibile in TPU antiurto e naso 3D in silicone food-grade ultra-morbido. Tutti i materiali sono atossici e certificati." },
      { title: "Compatibilità e vestibilità", content: "La cover è disegnata su misura per ogni modello: ritagli precisi per fotocamera, tasti e porte. Bordi rialzati di 1,2 mm per proteggere schermo e lenti. Compatibile con ricarica wireless e MagSafe (modelli che lo supportano)." },
      { title: "Cura e pulizia", content: "Pulisci il nasino con acqua tiepida e sapone neutro, asciuga con il panno in microfibra incluso. La stampa si pulisce con un panno umido. Evita solventi e alcol sul silicone." },
      { title: "Spedizione e resi", content: "Spedizione gratuita con corriere espresso in 24/48h lavorative. Hai 30 giorni per cambiare idea: reso gratuito e rimborso completo, senza domande." },
    ],

    reviewsSection: {
      heading: "Cosa dicono i nostri clienti",
      subheading: "Recensioni verificate da acquirenti reali.",
      summary: {
        average: 4.9,
        count: 2847,
        label: "Eccellente",
        basedOn: "Basato su Trustpilot",
        distribution: [
          { stars: 5, pct: 90 },
          { stars: 4, pct: 6 },
          { stars: 3, pct: 2 },
          { stars: 2, pct: 1 },
          { stars: 1, pct: 1 },
        ],
      },
      textReviews: [
        { stars: 5, title: "Il nasino è ipnotico", body: "Lo schiaccio senza accorgermene durante le call. La stampa del panda rosso è nitidissima e la cover è solida. Miglior acquisto dell'anno.", name: "Giulia M.", date: "12/07/2026", verified: true },
        { stars: 5, title: "Regalo perfetto", body: "Comprata per mia figlia: non la lascia più. Il naso torna sempre in forma, anche dopo settimane di schiacciate continue.", name: "Federica R.", date: "03/07/2026", verified: true },
        { stars: 5, title: "Qualità sopra le aspettative", body: "Pensavo fosse un gadget carino e basta, invece la cover protegge davvero: mi è caduto il telefono due volte, zero danni.", name: "Alessandro P.", date: "28/06/2026", verified: true },
        { stars: 4, title: "Molto carina", body: "Il nasino è morbidissimo e la vestibilità è perfetta sul mio iPhone 15. Spedizione velocissima, arrivata in un giorno.", name: "Chiara D.", date: "21/06/2026", verified: true },
        { stars: 5, title: "Tutti me la chiedono", body: "In treno, in ufficio, al bar: ovunque qualcuno mi chiede dove l'ho presa. Il fennec è troppo dolce.", name: "Martina S.", date: "15/06/2026", verified: true },
        { stars: 5, title: "Anti-stress vero", body: "Lavoro in un call center e questa cover mi ha salvato i nervi. Silicone morbido, nessun odore, stampa perfetta.", name: "Davide L.", date: "08/06/2026", verified: true },
        { stars: 5, title: "Secondo acquisto", body: "Presa prima per me, poi per il mio compagno. Il koala è identico alla foto. Servizio clienti gentilissimo.", name: "Valentina G.", date: "30/05/2026", verified: true },
        { stars: 5, title: "Consigliatissima", body: "Arrivata in 24h con confezione curatissima. Il naso è la parte migliore: morbido, elastico, irresistibile.", name: "Tommaso B.", date: "22/05/2026", verified: true },
      ],
    },

    faq: {
      heading: "Domande frequenti",
      items: [
        { q: "Il naso in silicone sporge davvero dalla cover?", a: "Sì! Il naso è un cuscinetto 3D in silicone food-grade che sporge di circa 8 mm dal retro della cover. Si vede, si tocca e soprattutto si schiaccia." },
        { q: "Il naso resta morbido e schiacciabile nel tempo?", a: "Assolutamente sì. Il silicone food-grade che usiamo è testato per oltre 100.000 schiacciate: mantiene elasticità e morbidezza per anni senza deformarsi né indurirsi." },
        { q: "La cover protegge il telefono in caso di caduta?", a: "Sì. Il bumper in TPU assorbe gli urti, il retro rigido protegge dai graffi e i bordi rialzati di 1,2 mm tengono schermo e fotocamera sollevati dalle superfici." },
        { q: "È compatibile con il mio modello di telefono?", a: "Produciamo la cover per oltre 50 modelli tra Apple, Samsung, Google e Xiaomi. Usa il selettore modello in questa pagina: ogni cover è disegnata su misura con ritagli precisi." },
        { q: "Funziona con ricarica wireless e MagSafe?", a: "Sì, la cover è compatibile con la ricarica wireless standard e con MagSafe sui modelli che lo supportano. Il nasino non interferisce con la ricarica." },
        { q: "La stampa sbiadisce o si graffia?", a: "No. La stampa HD è protetta da un rivestimento anti-graffio e anti-UV: i colori restano vividi nel tempo anche con uso quotidiano intenso." },
        { q: "Quanto tempo ci vuole per la spedizione?", a: "Spediamo entro 24 ore lavorative con corriere espresso: la cover arriva in 24/48h. La spedizione è sempre gratuita." },
        { q: "Posso restituirla se cambio idea?", a: "Certo: hai 30 giorni di tempo per il reso, completamente gratuito. Rimborso completo, senza domande e senza stress (a quello ci pensa già il nasino)." },
      ],
    },

    buyBox: {
      reviewsAnchor: "#recensioni",
      quantityLabel: "Quantità",
      buyNowLabel: "Acquista ora",
      addToCartLabel: "Aggiungi al carrello",
      soldOutLabel: "Esaurito",
      addedToast: "Aggiunto al carrello!",
      variantLabel: "Design",
      checkoutToast: "Checkout demo — integrazione pagamenti in arrivo",
    },
  },

  cart: {
    title: "Il tuo carrello",
    emptyTitle: "Il carrello è vuoto",
    emptyText: "Scegli un muso da coccolare e torna qui.",
    emptyCta: "Scopri le cover",
    subtotal: "Subtotale",
    discount: "Sconto coupon",
    shipping: "Spedizione",
    shippingFree: "Gratuita",
    total: "Totale",
    checkout: "Vai al checkout",
    checkoutNote: "Checkout demo — nessun pagamento reale",
    remove: "Rimuovi",
  },
};

export default site;
