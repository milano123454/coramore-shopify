/* ============================================
   CORAMORE THEME — theme.js
   ============================================ */

(function() {
  'use strict';

  /* --- Scroll Reveal (IntersectionObserver) --- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }

  /* --- Sticky Header --- */
  function initStickyHeader() {
    var header = document.querySelector('.site-header--sticky');
    if (!header) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* --- Mobile Menu --- */
  function initMobileMenu() {
    var toggles = document.querySelectorAll('[data-menu-toggle]');
    var menu = document.querySelector('[data-mobile-menu]');
    var closeButtons = document.querySelectorAll('[data-menu-close]');

    if (!menu) return;

    function openMenu() { menu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('is-open'); document.body.style.overflow = ''; }

    toggles.forEach(function(btn) { btn.addEventListener('click', openMenu); });
    closeButtons.forEach(function(btn) { btn.addEventListener('click', closeMenu); });
  }

  /* --- FAQ Accordion --- */
  function initFAQ() {
    var toggles = document.querySelectorAll('[data-faq-toggle]');

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var answer = this.nextElementSibling;
        var isOpen = this.getAttribute('aria-expanded') === 'true';

        // Close all others in same parent
        var parent = this.closest('.faq-list, .product__details');
        if (parent) {
          parent.querySelectorAll('[data-faq-toggle]').forEach(function(other) {
            if (other !== toggle) {
              other.setAttribute('aria-expanded', 'false');
              var otherAnswer = other.nextElementSibling;
              if (otherAnswer) otherAnswer.style.maxHeight = null;
            }
          });
        }

        this.setAttribute('aria-expanded', !isOpen);
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = null;
        }
      });
    });
  }

  /* --- Countdown Timer --- */
  function initCountdown() {
    var countdownEls = document.querySelectorAll('[data-countdown]');
    countdownEls.forEach(function(el) {
      var hours = parseInt(el.getAttribute('data-hours')) || 3;
      var display = el.querySelector('[data-countdown-display]');
      if (!display) return;

      // Use session storage to persist timer across page loads
      var storageKey = 'coramore_countdown_end';
      var endTime = sessionStorage.getItem(storageKey);

      if (!endTime || parseInt(endTime) < Date.now()) {
        endTime = Date.now() + (hours * 60 * 60 * 1000);
        sessionStorage.setItem(storageKey, endTime);
      } else {
        endTime = parseInt(endTime);
      }

      function updateTimer() {
        var remaining = endTime - Date.now();
        if (remaining <= 0) {
          // Reset timer
          endTime = Date.now() + (hours * 60 * 60 * 1000);
          sessionStorage.setItem(storageKey, endTime);
          remaining = endTime - Date.now();
        }

        var h = Math.floor(remaining / 3600000);
        var m = Math.floor((remaining % 3600000) / 60000);
        var s = Math.floor((remaining % 60000) / 1000);

        display.textContent =
          String(h).padStart(2, '0') + ':' +
          String(m).padStart(2, '0') + ':' +
          String(s).padStart(2, '0');
      }

      updateTimer();
      setInterval(updateTimer, 1000);
    });
  }

  /* --- Product Gallery --- */
  function initProductGallery() {
    var thumbnails = document.querySelectorAll('[data-thumbnail]');
    var mainImage = document.getElementById('product-main-image');
    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Update main image
        mainImage.src = this.getAttribute('data-image-url');
        mainImage.alt = this.getAttribute('data-image-alt') || '';

        // Update active state
        thumbnails.forEach(function(t) { t.classList.remove('product__thumbnail--active'); });
        this.classList.add('product__thumbnail--active');
      });
    });

    // Zoom on desktop
    var galleryMain = document.querySelector('.product__gallery-main');
    if (galleryMain && window.innerWidth > 768) {
      galleryMain.addEventListener('click', function() {
        if (mainImage.style.transform === 'scale(1.5)') {
          mainImage.style.transform = '';
          mainImage.style.transformOrigin = '';
          galleryMain.style.cursor = 'zoom-in';
        } else {
          mainImage.style.transform = 'scale(1.5)';
          mainImage.style.transformOrigin = 'center center';
          galleryMain.style.cursor = 'zoom-out';
        }
      });

      galleryMain.addEventListener('mousemove', function(e) {
        if (mainImage.style.transform === 'scale(1.5)') {
          var rect = galleryMain.getBoundingClientRect();
          var x = ((e.clientX - rect.left) / rect.width) * 100;
          var y = ((e.clientY - rect.top) / rect.height) * 100;
          mainImage.style.transformOrigin = x + '% ' + y + '%';
        }
      });
    }
  }

  /* --- Quantity Selector --- */
  function initQuantitySelectors() {
    // Product page quantity
    var minusBtns = document.querySelectorAll('[data-qty-minus]');
    var plusBtns = document.querySelectorAll('[data-qty-plus]');
    var qtyInput = document.querySelector('[data-qty-input]');

    minusBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('input');
        var val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
        updateFormQty(input.value);
      });
    });

    plusBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('input');
        var val = parseInt(input.value) || 1;
        if (val < 99) input.value = val + 1;
        updateFormQty(input.value);
      });
    });

    function updateFormQty(val) {
      var formQty = document.querySelector('[data-form-qty]');
      if (formQty) formQty.value = val;
    }
  }

  /* --- Video Reviews Scroll --- */
  function initVideoScroll() {
    var tracks = document.querySelectorAll('[data-video-track]');
    tracks.forEach(function(track) {
      var parent = track.closest('.video-reviews__wrapper');
      if (!parent) return;

      var leftBtn = parent.querySelector('[data-scroll-left]');
      var rightBtn = parent.querySelector('[data-scroll-right]');
      var scrollAmount = 300;

      if (leftBtn) {
        leftBtn.addEventListener('click', function() {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }
      if (rightBtn) {
        rightBtn.addEventListener('click', function() {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }
    });

    /* Text reviews scroll */
    var reviewTracks = document.querySelectorAll('[data-reviews-track]');
    reviewTracks.forEach(function(track) {
      var parent = track.closest('.reviews-carousel');
      if (!parent) return;

      var leftBtn = parent.querySelector('[data-reviews-scroll-left]');
      var rightBtn = parent.querySelector('[data-reviews-scroll-right]');
      var scrollAmount = 370;

      if (leftBtn) {
        leftBtn.addEventListener('click', function() {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }
      if (rightBtn) {
        rightBtn.addEventListener('click', function() {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }
    });
  }

  /* --- Variant Picker --- */
  function initVariantPicker() {
    var swatches = document.querySelectorAll('.product__swatch');
    swatches.forEach(function(swatch) {
      swatch.addEventListener('click', function() {
        var siblings = this.closest('.product__option-values').querySelectorAll('.product__swatch');
        siblings.forEach(function(s) { s.classList.remove('product__swatch--active'); });
        this.classList.add('product__swatch--active');
      });
    });
  }

  /* --- Init All --- */
  function init() {
    initScrollReveal();
    initStickyHeader();
    initMobileMenu();
    initFAQ();
    initCountdown();
    initProductGallery();
    initQuantitySelectors();
    initVideoScroll();
    initVariantPicker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
