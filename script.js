/* ============================================================
   ScaleUp Digital — Interactions & Animations
   ============================================================ */
(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (prefersReduced) document.documentElement.classList.add('reduced-motion');
  if (hasGsap && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ==================== PRELOADER ==================== */
  const preloader = document.getElementById('preloader');
  const preFill = document.getElementById('preloader-fill');
  const prePct = document.getElementById('preloader-pct');
  let progress = 0;
  const preTick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 14, 96);
    preFill.style.width = progress + '%';
    prePct.textContent = Math.round(progress) + '%';
  }, 90);

  const finishPreloader = () => {
    clearInterval(preTick);
    preFill.style.width = '100%';
    prePct.textContent = '100%';
    setTimeout(() => {
      preloader.classList.add('done');
      heroIntro();
    }, 320);
  };
  window.addEventListener('load', finishPreloader);
  setTimeout(finishPreloader, 3500); // safety net

  /* ==================== CUSTOM CURSOR ==================== */
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!isTouch && !prefersReduced) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    (function animateCursor() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .chip, summary, input[type="range"]').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  } else {
    dot.style.display = ring.style.display = 'none';
  }

  /* ==================== NAVBAR ==================== */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');
  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Smooth scroll for anchors + close mobile menu
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      e.preventDefault();
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      const target = id === '#top' ? document.body : document.querySelector(id);
      if (!target) return;
      const top = id === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  // Active nav link highlighting
  const sections = ['about', 'services', 'work', 'process', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((id) => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });

  /* ==================== HERO ENTRANCE ==================== */
  function heroIntro() {
    if (!hasGsap || prefersReduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-title .line > span', { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
      .from('.hero-tag', { y: 24, opacity: 0, duration: 0.8 }, 0.2)
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9 }, 0.55)
      .from('.hero-actions', { y: 30, opacity: 0, duration: 0.9 }, 0.7)
      .from('.hero-stats .hstat', { y: 26, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.85)
      .from('.hero-visual', { y: 50, opacity: 0, scale: 0.94, duration: 1.2 }, 0.5)
      .from('.float-chip', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(2)' }, 1.1)
      .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, 1.4);
  }

  /* ==================== PARTICLE CANVAS ==================== */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 70;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        r: Math.random() * 1.8 + 0.6,
        o: Math.random() * 0.5 + 0.15,
      });
    }

    let mouseX = 0.5, mouseY = 0.5;
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    });

    (function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx + (mouseX - 0.5) * 0.0004;
        p.y += p.vy + (mouseY - 0.5) * 0.0004;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 66, ${p.o})`;
        ctx.fill();
      });
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * W;
          const dy = (particles[i].y - particles[j].y) * H;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x * W, particles[i].y * H);
            ctx.lineTo(particles[j].x * W, particles[j].y * H);
            ctx.strokeStyle = `rgba(255, 106, 0, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    })();
  }

  /* ==================== MARQUEE & TICKER (seamless loops) ==================== */
  ['marquee-track', 'ticker-track'].forEach((id) => {
    const track = document.getElementById(id);
    if (track) track.innerHTML += track.innerHTML;
  });

  /* ==================== SCROLL REVEALS ==================== */
  const revealEls = document.querySelectorAll('.reveal');
  const staggerGroups = document.querySelectorAll('.stagger-group');

  if (hasGsap && typeof ScrollTrigger !== 'undefined' && !prefersReduced) {
    revealEls.forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    });
    staggerGroups.forEach((group) => {
      gsap.to(group.children, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });
    // Process line fill
    gsap.to('#process-line-fill', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: '.process-track', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
    });
    // Parallax on section visuals
    document.querySelectorAll('.mobile-visual, .infra-visual').forEach((el) => {
      gsap.fromTo(el, { y: 40 }, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    });
  } else {
    // Fallback: IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
    staggerGroups.forEach((g) => [...g.children].forEach((el) => io.observe(el)));
    const fill = document.getElementById('process-line-fill');
    if (fill) fill.style.width = '100%';
  }

  /* ==================== ANIMATED COUNTERS ==================== */
  const counters = document.querySelectorAll('[data-counter]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterIO.unobserve(el);
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterIO.observe(el));

  /* ==================== MAGNETIC BUTTONS ==================== */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        btn.style.transform = '';
        setTimeout(() => (btn.style.transition = ''), 500);
      });
    });
  }

  /* ==================== GLOW CARDS (mouse-follow spotlight) ==================== */
  document.querySelectorAll('.glow-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  /* ==================== TILT ==================== */
  if (!isTouch && !prefersReduced) {
    const addTilt = (el, max) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 600);
      });
    };
    document.querySelectorAll('[data-tilt]').forEach((el) => addTilt(el, 8));
    document.querySelectorAll('[data-tilt-soft]').forEach((el) => addTilt(el, 3.5));
  }

  /* ==================== NICHE TABS ==================== */
  document.querySelectorAll('.niche-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.niche-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.niche-panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('niche-' + tab.dataset.niche);
      if (panel) panel.classList.add('active');
    });
  });

  /* ==================== ROI CALCULATOR ==================== */
  const leadsInput = document.getElementById('leads');
  const dealInput = document.getElementById('deal');
  const peso = (n) => '₱' + Math.round(n).toLocaleString('en-PH');

  function calculateROI() {
    if (!leadsInput || !dealInput) return;
    const leads = +leadsInput.value;
    const deal = +dealInput.value;
    document.getElementById('leadsValue').textContent = leads.toLocaleString();
    document.getElementById('dealValue').textContent = peso(deal);

    const current = leads * deal;                    // social-only baseline
    const projected = current * 1.4;                 // owned platform uplift (+40%)
    const annual = (projected - current) * 12;

    animateNumber('currentRevenue', current, peso);
    animateNumber('projectedRevenue', projected, peso);
    animateNumber('annualIncrease', annual, peso);
  }

  const numState = {};
  function animateNumber(id, target, fmt) {
    const el = document.getElementById(id);
    if (!el) return;
    const from = numState[id] ?? target;
    numState[id] = target;
    if (prefersReduced) { el.textContent = fmt(target); return; }
    const start = performance.now();
    const dur = 450;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  if (leadsInput && dealInput) {
    leadsInput.addEventListener('input', calculateROI);
    dealInput.addEventListener('input', calculateROI);
    calculateROI();
  }

  /* ==================== FAQ (smooth accordion) ==================== */
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq-item[open]').forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ==================== CONTACT FORM ==================== */
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
  });

  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      [name, email].forEach((f) => f.parentElement.classList.remove('error'));

      if (!name.value.trim()) { name.parentElement.classList.add('error'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.parentElement.classList.add('error'); valid = false; }
      if (!valid) {
        if (hasGsap && !prefersReduced) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' });
        return;
      }

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.querySelector('span').innerHTML = 'Sending <i class="fa-solid fa-circle-notch fa-spin"></i>';

      setTimeout(() => {
        if (hasGsap && !prefersReduced) {
          gsap.to(form, {
            opacity: 0, y: -24, duration: 0.45, ease: 'power2.in',
            onComplete: () => {
              form.style.display = 'none';
              successBox.hidden = false;
              gsap.from(successBox, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
            },
          });
        } else {
          form.style.display = 'none';
          successBox.hidden = false;
        }
      }, 1100);
    });
  }

  /* ==================== BACK TO TOP ==================== */
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
})();
