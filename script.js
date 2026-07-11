/* =========================================================
   Mohsin Hussain — Portfolio interactions
   Vanilla JS. No dependencies. Respects reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const pct = document.getElementById('preloader-pct');
  document.body.classList.add('loading');

  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) { progress = 100; clearInterval(tick); finishLoad(); }
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.floor(progress) + '%';
  }, 130);

  function finishLoad() {
    setTimeout(() => {
      preloader && preloader.classList.add('done');
      document.body.classList.remove('loading');
      playHero();
    }, 350);
  }
  // Safety fallback
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!preloader.classList.contains('done')) {
        progress = 100; clearInterval(tick); finishLoad();
      }
    }, 2500);
  });

  /* ---------- HERO WORD REVEAL ---------- */
  function playHero() {
    const words = document.querySelectorAll('.hero__title .word');
    words.forEach((w, i) => {
      setTimeout(() => {
        w.style.transition = 'transform .9s cubic-bezier(0.16,1,0.3,1)';
        w.style.transform = 'translateY(0)';
      }, reduceMotion ? 0 : 120 * i);
    });
    // Trigger the near-hero reveal-up elements
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), reduceMotion ? 0 : 300 + i * 90);
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  if (!isTouch) {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dot) { dot.style.left = tx + 'px'; dot.style.top = ty + 'px'; }
    });
    function render() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; }
      requestAnimationFrame(render);
    }
    render();

    document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovering'));
    });
  }

  /* ---------- SCROLL PROGRESS + NAV ---------- */
  const progressBar = document.getElementById('scroll-progress');
  const nav = document.getElementById('nav');
  function onScroll() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    if (progressBar) progressBar.style.width = (scrolled * 100) + '%';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('nav-burger');
  const links = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach((el) => {
      if (!el.closest('.hero')) io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- COUNTERS ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (reduceMotion) {
            const el = entry.target;
            el.textContent = (el.dataset.prefix || '') + el.dataset.target + (el.dataset.suffix || '');
          } else {
            animateCounter(entry.target);
          }
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.counter').forEach((el) => cio.observe(el));
  }

  /* ---------- SKILL BARS ---------- */
  if ('IntersectionObserver' in window) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.bar__track span');
          if (fill) fill.style.width = entry.target.dataset.level + '%';
          bio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.bar').forEach((el) => bio.observe(el));
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- CARD TILT + GLOW TRACKING ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 8;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
    // glow tracking for all cards (even without tilt)
    document.querySelectorAll('.card').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ---------- HERO PARALLAX ON BLOBS ---------- */
  if (!isTouch && !reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      const b1 = document.querySelector('.blob--1');
      const b2 = document.querySelector('.blob--2');
      if (b1) b1.style.marginLeft = x * 30 + 'px';
      if (b2) b2.style.marginTop = y * 30 + 'px';
    }, { passive: true });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            a.style.color = a.getAttribute('href') === '#' + id ? 'var(--fg)' : '';
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => sio.observe(s));
  }

  /* ---------- CONTACT FORM (front-end only) ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !message || !validEmail) {
        note.textContent = 'Please fill in a valid name, email and message.';
        note.className = 'contact__note err';
        return;
      }
      // No backend wired up yet — hand off to the user's mail client.
      const subject = encodeURIComponent(`New project inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@mohsinhussain.com?subject=${subject}&body=${body}`;
      note.textContent = 'Opening your email client… thanks for reaching out!';
      note.className = 'contact__note ok';
      form.reset();
    });
  }

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
