/* ============================================================
   CUBANGABRILAND 2026 — script.js
   Countdown · Particles · Scroll Reveal · Header · Nav · Back-to-top
   ============================================================ */

(function () {
  'use strict';

  /* ─── COUNTDOWN ─────────────────────────────────────────── */
  const EVENT_DATE = new Date('2026-10-03T18:00:00');

  function pad(n, len = 2) {
    return String(n).padStart(len, '0');
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = EVENT_DATE - now;

    if (diff <= 0) {
      // Event is now / already happened
      ['cd-days','cd-hours','cd-minutes','cd-seconds',
       'cd2-days','cd2-hours','cd2-minutes','cd2-seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const values = {
      'cd-days':    pad(days, 3),
      'cd-hours':   pad(hours),
      'cd-minutes': pad(minutes),
      'cd-seconds': pad(seconds),
      'cd2-days':   pad(days, 3),
      'cd2-hours':  pad(hours),
      'cd2-minutes':pad(minutes),
      'cd2-seconds':pad(seconds),
    };

    Object.entries(values).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.textContent !== val) {
        el.textContent = val;
        el.classList.remove('flip');
        void el.offsetWidth; // reflow
        el.classList.add('flip');
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ─── PARTICLES ─────────────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x     = randomBetween(0, W);
      this.y     = randomBetween(0, H);
      this.size  = randomBetween(0.5, 2.5);
      this.speedX= randomBetween(-0.3, 0.3);
      this.speedY= randomBetween(-0.6, -0.1);
      this.life  = randomBetween(0.4, 1);
      this.decay = randomBetween(0.0015, 0.004);

      // Colour: ice blue, gold, or white
      const r = Math.random();
      if (r < 0.5)      this.color = `rgba(106,180,216,`;
      else if (r < 0.75) this.color = `rgba(201,168,76,`;
      else               this.color = `rgba(232,234,240,`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < -10) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.life + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = randomBetween(0, H); // scatter initial positions
      particles.push(p);
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  animateParticles();


  /* ─── HEADER SCROLL ─────────────────────────────────────── */
  const header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top
    const btt = document.getElementById('back-to-top');
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ─── MOBILE NAV ────────────────────────────────────────── */
  const burger  = document.getElementById('burger');
  const nav     = document.getElementById('main-nav');

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  });


  /* ─── SCROLL REVEAL ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─── BACK TO TOP ───────────────────────────────────────── */
  const bttBtn = document.getElementById('back-to-top');
  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ─── SUBTLE PARALLAX ON HERO ───────────────────────────── */
  const heroBg = document.querySelector('.hero-bg-layers');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }, { passive: true });
  }


  /* ─── CARD TILT MICRO-INTERACTION ───────────────────────── */
  function addTilt(selector, intensity = 8) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width / 2;
        const cy     = rect.top  + rect.height / 2;
        const rx     = ((e.clientY - cy) / (rect.height / 2)) * intensity;
        const ry     = ((e.clientX - cx) / (rect.width  / 2)) * -intensity;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Only on non-touch devices
  if (!('ontouchstart' in window)) {
    addTilt('.pillar', 6);
    addTilt('.dato-card', 5);
    addTilt('.especial-card', 5);
  }


  /* ─── HERO TITLE GLOW PULSE ─────────────────────────────── */
  const heroTitleMain = document.querySelector('.hero-title--main');
  if (heroTitleMain) {
    let glowDir = 1;
    let glowVal = 0.3;

    function pulseGlow() {
      glowVal += 0.008 * glowDir;
      if (glowVal > 0.5) glowDir = -1;
      if (glowVal < 0.15) glowDir = 1;
      heroTitleMain.style.textShadow =
        `0 0 ${60 + glowVal * 100}px rgba(106,180,216,${glowVal}),
         0 4px 20px rgba(0,0,0,0.8)`;
      requestAnimationFrame(pulseGlow);
    }

    pulseGlow();
  }

})();
