/* CORAMORE v7 — theme.js */
(function() {
  'use strict';

  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;
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
      var parent = el.parentElement;
      var siblings = parent ? parent.querySelectorAll(':scope > .reveal-on-scroll') : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      if (idx > 0) el.dataset.delay = idx * 60;
      observer.observe(el);
    });
  }

  function initStickyHeader() {
    var h = document.querySelector('.site-header--sticky');
    if (!h) return;
    window.addEventListener('scroll', function() {
      h.classList.toggle('site-header--scrolled', window.pageYOffset > 40);
    }, { passive: true });
  }

  function initMobileMenu() {
    var menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    document.querySelectorAll('[data-menu-toggle]').forEach(function(b) { b.addEventListener('click', function() { menu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }); });
    document.querySelectorAll('[data-menu-close]').forEach(function(b) { b.addEventListener('click', function() { menu.classList.remove('is-open'); document.body.style.overflow = ''; }); });
  }

  function initFAQ() {
    document.querySelectorAll('[data-faq-toggle]').forEach(function(t) {
      t.addEventListener('click', function() {
        var ans = this.nextElementSibling;
        var open = this.getAttribute('aria-expanded') === 'true';
        var parent = this.closest('.faq-list, .product__details, .product__info');
        if (parent) parent.querySelectorAll('[data-faq-toggle]').forEach(function(o) {
          if (o !== t) { o.setAttribute('aria-expanded', 'false'); var a = o.nextElementSibling; if (a && a.hasAttribute('data-faq-answer')) a.style.maxHeight = null; }
        });
        this.setAttribute('aria-expanded', !open);
        if (ans && ans.hasAttribute('data-faq-answer')) {
          ans.style.maxHeight = open ? null : ans.scrollHeight + 'px';
        }
      });
    });
  }

  /* Countdown — session-based, configurable minutes */
  function initCountdown() {
    document.querySelectorAll('[data-countdown]').forEach(function(el) {
      var display = el.querySelector('[data-countdown-display]');
      if (!display) return;
      var minutes = parseInt(el.getAttribute('data-minutes')) || 15;
      var key = 'cm_cd_' + minutes;
      var endTime = sessionStorage.getItem(key);

      if (!endTime || parseInt(endTime) < Date.now()) {
        endTime = Date.now() + (minutes * 60 * 1000);
        sessionStorage.setItem(key, endTime);
      } else {
        endTime = parseInt(endTime);
      }

      function update() {
        var remaining = endTime - Date.now();
        if (remaining <= 0) {
          endTime = Date.now() + (minutes * 60 * 1000);
          sessionStorage.setItem(key, endTime);
          remaining = endTime - Date.now();
        }
        var m = Math.floor(remaining / 60000);
        var s = Math.floor((remaining % 60000) / 1000);
        display.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      }
      update();
      setInterval(update, 1000);
    });
  }

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

  function initQty() {
    document.querySelectorAll('[data-qty-minus]').forEach(function(b) {
      b.addEventListener('click', function() { var i = this.parentElement.querySelector('input'); var v = parseInt(i.value)||1; if (v > 1) i.value = v - 1; });
    });
    document.querySelectorAll('[data-qty-plus]').forEach(function(b) {
      b.addEventListener('click', function() { var i = this.parentElement.querySelector('input'); var v = parseInt(i.value)||1; if (v < 99) i.value = v + 1; });
    });
  }

  function initCarousels() {
    document.querySelectorAll('[data-video-track]').forEach(function(track) {
      var w = track.closest('.video-reviews__wrapper'); if (!w) return;
      var l = w.querySelector('[data-scroll-left]'), r = w.querySelector('[data-scroll-right]');
      if (l) l.addEventListener('click', function() { track.scrollBy({left:-260,behavior:'smooth'}); });
      if (r) r.addEventListener('click', function() { track.scrollBy({left:260,behavior:'smooth'}); });
    });
    document.querySelectorAll('[data-reviews-track]').forEach(function(track) {
      var w = track.closest('.reviews-carousel'); if (!w) return;
      var l = w.querySelector('[data-reviews-scroll-left]'), r = w.querySelector('[data-reviews-scroll-right]');
      if (l) l.addEventListener('click', function() { track.scrollBy({left:-320,behavior:'smooth'}); });
      if (r) r.addEventListener('click', function() { track.scrollBy({left:320,behavior:'smooth'}); });
    });
  }

  /* Video play/pause with custom button */
  function initVideoPlayers() {
    document.querySelectorAll('[data-play-btn]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var wrap = this.closest('[data-video-wrap]');
        if (!wrap) return;
        var video = wrap.querySelector('video');
        if (!video) return;

        if (video.paused) {
          // Pause all other videos first
          document.querySelectorAll('[data-video-wrap] video').forEach(function(v) {
            if (v !== video) { v.pause(); v.closest('[data-video-wrap]').classList.remove('is-playing'); }
          });
          video.muted = false;
          video.play().then(function() {
            wrap.classList.add('is-playing');
          }).catch(function() {
            // Autoplay blocked, try muted
            video.muted = true;
            video.play().then(function() { wrap.classList.add('is-playing'); });
          });
        } else {
          video.pause();
          wrap.classList.remove('is-playing');
        }
      });
    });

    // Also allow clicking the video itself to toggle
    document.querySelectorAll('[data-video-wrap] video').forEach(function(video) {
      video.addEventListener('click', function() {
        var wrap = this.closest('[data-video-wrap]');
        var btn = wrap.querySelector('[data-play-btn]');
        if (btn) btn.click();
      });
    });
  }

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
    initCountdown(); initGallery(); initQty(); initCarousels();
    initVideoPlayers(); initVariants();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
