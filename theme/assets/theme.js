/* =================================================================
   LUMINA MILANO — Theme JS
   - Cart drawer (open/close, AJAX cart from Shopify /cart.js)
   - Accordion (FAQ + product details)
   - Color swatches (variant selector)
   - Quantity stepper
   - Countdown timer
   - Mobile nav
   ================================================================= */
(function () {
  'use strict';

  /* ------------ Cart Drawer ------------ */
  const drawer = document.querySelector('[data-cart-drawer]');
  const overlay = document.querySelector('[data-cart-overlay]');
  const cartCount = document.querySelectorAll('[data-cart-count]');

  function openCart() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
    refreshCart();
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  document.querySelectorAll('[data-cart-toggle]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); openCart(); });
  });
  document.querySelectorAll('[data-cart-close]').forEach(el => {
    el.addEventListener('click', closeCart);
  });
  if (overlay) overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  function formatMoney(cents) {
    const v = (cents / 100).toFixed(2).replace('.', ',');
    return '€' + v;
  }

  function refreshCart() {
    return fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(renderCart)
      .catch(() => {});
  }

  function renderCart(cart) {
    cartCount.forEach(el => { el.textContent = cart.item_count; el.style.display = cart.item_count > 0 ? '' : 'none'; });
    const body = document.querySelector('[data-cart-body]');
    const footer = document.querySelector('[data-cart-footer]');
    const totalEl = document.querySelector('[data-cart-total]');
    if (!body) return;

    if (cart.item_count === 0) {
      body.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Il carrello è vuoto</p>
          <a href="/collections/all" class="btn btn--primary">Scopri la collezione</a>
        </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = '';
    if (totalEl) totalEl.textContent = formatMoney(cart.total_price);

    body.innerHTML = cart.items.map(item => `
      <div class="cart-line" data-line-key="${item.key}">
        <div class="cart-line__media">
          ${item.image ? `<img src="${item.image.replace('.', '_120x.')}" alt="${item.product_title}">` : ''}
        </div>
        <div>
          <div class="cart-line__title">${item.product_title}</div>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<div class="cart-line__variant">${item.variant_title}</div>` : ''}
          <div class="qty-selector" style="height:36px;">
            <button type="button" data-qty-down>−</button>
            <input type="number" min="0" value="${item.quantity}" data-line-qty>
            <button type="button" data-qty-up>+</button>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="cart-line__price">${formatMoney(item.final_line_price)}</div>
          <a href="#" class="cart-line__remove" data-line-remove>Rimuovi</a>
        </div>
      </div>
    `).join('');

    // wire up qty changes
    body.querySelectorAll('[data-line-key]').forEach(line => {
      const key = line.dataset.lineKey;
      const input = line.querySelector('[data-line-qty]');
      const up = line.querySelector('[data-qty-up]');
      const down = line.querySelector('[data-qty-down]');
      const rm = line.querySelector('[data-line-remove]');

      const update = (q) => {
        fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: key, quantity: q })
        }).then(r => r.json()).then(renderCart);
      };
      up.addEventListener('click', () => update(parseInt(input.value) + 1));
      down.addEventListener('click', () => update(Math.max(0, parseInt(input.value) - 1)));
      input.addEventListener('change', () => update(parseInt(input.value) || 0));
      rm.addEventListener('click', e => { e.preventDefault(); update(0); });
    });
  }

  // Hook AJAX add-to-cart on product forms
  document.querySelectorAll('[data-product-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const btn = form.querySelector('[type="submit"]');
      const oldText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Aggiungendo...'; }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd
      })
        .then(r => r.json())
        .then(() => refreshCart())
        .then(() => openCart())
        .catch(err => {
          console.error(err);
          alert('Errore. Riprova.');
        })
        .finally(() => { if (btn) { btn.disabled = false; btn.textContent = oldText; } });
    });
  });

  // initial cart count
  refreshCart();

  /* ------------ Accordion ------------ */
  document.querySelectorAll('[data-accordion]').forEach(group => {
    const allowMultiple = group.dataset.accordion === 'multi';
    group.querySelectorAll('[data-accordion-item]').forEach(item => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        if (!allowMultiple) {
          group.querySelectorAll('[data-accordion-item]').forEach(i => i.classList.remove('is-open'));
        }
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  });

  /* ------------ Color Swatches (homepage cards) ------------ */
  // No-op: they are just links to the product page with ?variant= param.

  /* ------------ Quantity stepper (standalone, outside cart) ------------ */
  document.querySelectorAll('[data-qty-stepper]').forEach(wrap => {
    const input = wrap.querySelector('input');
    if (!input) return;
    const up = wrap.querySelector('[data-qty-up]');
    const down = wrap.querySelector('[data-qty-down]');
    if (up) up.addEventListener('click', () => { input.value = parseInt(input.value || '1') + 1; });
    if (down) down.addEventListener('click', () => { input.value = Math.max(1, parseInt(input.value || '1') - 1); });
  });

  /* ------------ Variant Picker (product page) ------------ */
  document.querySelectorAll('[data-variant-radios]').forEach(wrap => {
    const form = wrap.closest('form');
    const idInput = form ? form.querySelector('[name="id"]') : null;
    const labelEl = wrap.parentElement && wrap.parentElement.querySelector('[data-selected-variant]');
    const priceEl = document.querySelector('[data-product-price]');
    const compareEl = document.querySelector('[data-product-compare]');
    const variantsScript = document.querySelector('[data-variants-json]');
    let variants = [];
    if (variantsScript) {
      try { variants = JSON.parse(variantsScript.textContent); } catch(_) {}
    }
    wrap.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const selectedValue = radio.value;
        if (labelEl) labelEl.textContent = selectedValue;
        const v = variants.find(x => x.options && x.options.indexOf(selectedValue) >= 0);
        if (v) {
          if (idInput) idInput.value = v.id;
          if (priceEl) priceEl.textContent = '€' + (v.price / 100).toFixed(2).replace('.', ',');
          if (compareEl && v.compare_at_price && v.compare_at_price > v.price) {
            compareEl.textContent = '€' + (v.compare_at_price / 100).toFixed(2).replace('.', ',');
            compareEl.style.display = '';
          } else if (compareEl) {
            compareEl.style.display = 'none';
          }
        }
      });
    });
  });

  /* ------------ Countdown ------------ */
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const minutes = parseInt(el.dataset.minutes || '15', 10);
    const KEY = 'lumina_countdown_until';
    let until = parseInt(sessionStorage.getItem(KEY), 10);
    const now = Date.now();
    if (!until || until - now <= 0 || until - now > minutes * 60000) {
      until = now + minutes * 60000;
      sessionStorage.setItem(KEY, String(until));
    }
    function tick() {
      let diff = Math.max(0, until - Date.now());
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const minEl = el.querySelector('[data-countdown-min]');
      const secEl = el.querySelector('[data-countdown-sec]');
      if (minEl) minEl.textContent = String(m).padStart(2, '0');
      if (secEl) secEl.textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  });

  /* ------------ Mobile nav ------------ */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.toggle('is-open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('is-open')));
  }
})();
