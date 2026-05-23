/* CORAMORE v4 — theme.js */
(function() {
  'use strict';

  /* Scroll Reveal with stagger */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;
    var delay = 0;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var d = parseInt(e.target.dataset.delay) || 0;
          setTimeout(function() { e.target.classList.add('is-visible'); }, d);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function(el, i) {
      // Add stagger delay to siblings
      var parent = el.parentElement;
      var siblings = parent ? parent.querySelectorAll('.reveal-on-scroll') : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      if (idx > 0) el.dataset.delay = idx * 80;
      observer.observe(el);
    });
  }

  /* Sticky Header */
  function initStickyHeader() {
    var h = document.querySelector('.site-header--sticky');
    if (!h) return;
    window.addEventListener('scroll', function() {
      h.classList.toggle('site-header--scrolled', window.pageYOffset > 40);
    }, { passive: true });
  }

  /* Mobile Menu */
  function initMobileMenu() {
    var menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    document.querySelectorAll('[data-menu-toggle]').forEach(function(b) { b.addEventListener('click', function() { menu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }); });
    document.querySelectorAll('[data-menu-close]').forEach(function(b) { b.addEventListener('click', function() { menu.classList.remove('is-open'); document.body.style.overflow = ''; }); });
  }

  /* FAQ Accordion */
  function initFAQ() {
    document.querySelectorAll('[data-faq-toggle]').forEach(function(t) {
      t.addEventListener('click', function() {
        var ans = this.nextElementSibling;
        var open = this.getAttribute('aria-expanded') === 'true';
        var parent = this.closest('.faq-list, .product__details');
        if (parent) parent.querySelectorAll('[data-faq-toggle]').forEach(function(o) {
          if (o !== t) { o.setAttribute('aria-expanded', 'false'); var a = o.nextElementSibling; if (a) a.style.maxHeight = null; }
        });
        this.setAttribute('aria-expanded', !open);
        ans.style.maxHeight = open ? null : ans.scrollHeight + 'px';
      });
    });
  }

  /* Countdown — resets at midnight */
  function initCountdown() {
    document.querySelectorAll('[data-countdown]').forEach(function(el) {
      var display = el.querySelector('[data-countdown-display]');
      if (!display) return;
      function getEndOfDay() {
        var now = new Date();
        var end = new Date(now);
        end.setHours(23, 59, 59, 999);
        return end.getTime();
      }
      function update() {
        var remaining = getEndOfDay() - Date.now();
        if (remaining <= 0) remaining = 86400000; // full day
        var h = Math.floor(remaining / 3600000);
        var m = Math.floor((remaining % 3600000) / 60000);
        var s = Math.floor((remaining % 60000) / 1000);
        display.textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
      }
      update();
      setInterval(update, 1000);
    });
  }

  /* Product Gallery */
  function initGallery() {
    var thumbs = document.querySelectorAll('[data-thumbnail]');
    var main = document.getElementById('product-main-image');
    if (!thumbs.length || !main) return;
    thumbs.forEach(function(t) {
      t.addEventListener('click', function() {
        main.src = this.dataset.imageUrl;
        main.alt = this.dataset.imageAlt || '';
        thumbs.forEach(function(x) { x.classList.remove('product__thumbnail--active'); });
        this.classList.add('product__thumbnail--active');
      });
    });
  }

  /* Quantity */
  function initQty() {
    document.querySelectorAll('[data-qty-minus]').forEach(function(b) {
      b.addEventListener('click', function() {
        var i = this.parentElement.querySelector('input'); var v = parseInt(i.value)||1;
        if (v > 1) i.value = v - 1;
      });
    });
    document.querySelectorAll('[data-qty-plus]').forEach(function(b) {
      b.addEventListener('click', function() {
        var i = this.parentElement.querySelector('input'); var v = parseInt(i.value)||1;
        if (v < 99) i.value = v + 1;
      });
    });
  }

  /* Carousel Scroll */
  function initCarousels() {
    // Video reviews
    document.querySelectorAll('[data-video-track]').forEach(function(track) {
      var w = track.closest('.video-reviews__wrapper'); if (!w) return;
      var l = w.querySelector('[data-scroll-left]'), r = w.querySelector('[data-scroll-right]');
      if (l) l.addEventListener('click', function() { track.scrollBy({left:-280,behavior:'smooth'}); });
      if (r) r.addEventListener('click', function() { track.scrollBy({left:280,behavior:'smooth'}); });
    });
    // Text reviews
    document.querySelectorAll('[data-reviews-track]').forEach(function(track) {
      var w = track.closest('.reviews-carousel'); if (!w) return;
      var l = w.querySelector('[data-reviews-scroll-left]'), r = w.querySelector('[data-reviews-scroll-right]');
      if (l) l.addEventListener('click', function() { track.scrollBy({left:-320,behavior:'smooth'}); });
      if (r) r.addEventListener('click', function() { track.scrollBy({left:320,behavior:'smooth'}); });
    });
  }

  /* Variant Picker */
  function initVariants() {
    document.querySelectorAll('.product__swatch').forEach(function(s) {
      s.addEventListener('click', function() {
        this.closest('.product__option-values').querySelectorAll('.product__swatch').forEach(function(x) { x.classList.remove('product__swatch--active'); });
        this.classList.add('product__swatch--active');
      });
    });
  }

  function init() {
    initScrollReveal(); initStickyHeader(); initMobileMenu(); initFAQ();
    initCountdown(); initGallery(); initQty(); initCarousels(); initVariants();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
