/**
 * Coramore Premium Theme - JavaScript
 */

(function() {
  'use strict';

  /* === COUNTDOWN TIMER === */
  function initCountdown() {
    const countdowns = document.querySelectorAll('[data-countdown]');
    countdowns.forEach(function(el) {
      const endDate = el.getAttribute('data-end');
      if (!endDate) return;

      const end = new Date(endDate.replace(' ', 'T')).getTime();

      function update() {
        const now = Date.now();
        const diff = end - now;

        if (diff <= 0) {
          el.style.display = 'none';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = el.querySelector('[data-countdown-days]');
        const hoursEl = el.querySelector('[data-countdown-hours]');
        const minutesEl = el.querySelector('[data-countdown-minutes]');
        const secondsEl = el.querySelector('[data-countdown-seconds]');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
      }

      update();
      setInterval(update, 1000);
    });
  }


  /* === MOBILE NAVIGATION === */
  function initMobileNav() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const close = document.querySelector('[data-menu-close]');
    const overlay = document.querySelector('[data-menu-overlay]');
    const nav = document.getElementById('mobile-nav');

    if (!toggle || !nav) return;

    function openMenu() {
      nav.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      nav.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
      nav.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      nav.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
  }

  /* === IMAGE GALLERY === */
  function initImageGallery() {
    const thumbs = document.querySelectorAll('[data-thumb-btn]');
    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        const url = this.getAttribute('data-image-url');
        const mainImg = this.closest('.featured-product__gallery, .product-page__gallery')
                            .querySelector('.featured-product__img, .product-page__img');

        if (mainImg && url) {
          mainImg.src = url;
          // Update active state
          const siblings = this.parentElement.querySelectorAll('[data-thumb-btn]');
          siblings.forEach(function(s) { s.classList.remove('is-active'); });
          this.classList.add('is-active');
        }
      });
    });
  }

  /* === VARIANT SELECTOR === */
  function initVariantSelector() {
    const variantInputs = document.querySelectorAll('.variant-option input[type="radio"]');
    variantInputs.forEach(function(input) {
      input.addEventListener('change', function() {
        // Update active class on labels
        const parent = this.closest('.featured-product__variants, .product-page__variants, .product-page__variant-options');
        if (parent) {
          parent.querySelectorAll('.variant-option').forEach(function(opt) {
            opt.classList.remove('is-active');
          });
          this.closest('.variant-option').classList.add('is-active');
        }
      });
    });
  }

  /* === QUANTITY SELECTOR === */
  function initQuantitySelector() {
    document.querySelectorAll('[data-qty-minus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('.quantity-input');
        var val = parseInt(input.value) || 1;
        if (val > 1) {
          input.value = val - 1;
        }
      });
    });

    document.querySelectorAll('[data-qty-plus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('.quantity-input');
        var val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    });
  }

  /* === STICKY HEADER === */
  function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* === INIT === */
  document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initMobileNav();
    initImageGallery();
    initVariantSelector();
    initQuantitySelector();
    initStickyHeader();
  });

})();
