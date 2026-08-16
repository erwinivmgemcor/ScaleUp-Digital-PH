/* ============================================
   ScaleUp Digital — Production Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. INTERSECTION OBSERVER — Scroll Reveals
  // ==========================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ==========================================
  // 2. LENIS SMOOTH SCROLL
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // 3. SMOOTH SCROLL FOR ALL ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        document.getElementById('menu-toggle').innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // ==========================================
  // 4. CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, input, textarea, select, .chip, .toggle-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px';
        follower.style.width = '48px'; follower.style.height = '48px';
        follower.style.borderColor = 'rgba(255,107,0,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px'; cursor.style.height = '8px';
        follower.style.width = '32px'; follower.style.height = '32px';
        follower.style.borderColor = 'rgba(255,107,0,0.4)';
      });
    });
  }

  // ==========================================
  // 5. SCROLL PROGRESS BAR
  // ==========================================
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });
  }

  // ==========================================
  // 6. NAVBAR SCROLL BEHAVIOR
  // ==========================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ==========================================
  // 7. MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // ==========================================
  // 8. GSAP HERO ENTRANCE
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-content > .reveal', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.2
  });

  gsap.from('.hero-visual', {
    x: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.4
  });

  // ==========================================
  // 9. COMPARISON TOGGLE
  // ==========================================
  const togglePill = document.getElementById('toggle-pill');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const cardSocial = document.getElementById('card-social');
  const cardScaleup = document.getElementById('card-scaleup');

  if (togglePill && toggleBtns.length && cardSocial && cardScaleup) {
    function activateSocial() {
      togglePill.classList.remove('right');
      toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.side === 'social'));
      cardSocial.classList.remove('dimmed');
      cardSocial.classList.add('active');
      cardScaleup.classList.add('dimmed');
      cardScaleup.classList.remove('active');
    }
    function activateScaleup() {
      togglePill.classList.add('right');
      toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.side === 'scaleup'));
      cardScaleup.classList.remove('dimmed');
      cardScaleup.classList.add('active');
      cardSocial.classList.add('dimmed');
      cardSocial.classList.remove('active');
    }

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.side === 'social') activateSocial();
        else activateScaleup();
      });
    });

    // Default: ScaleUp active
    activateScaleup();
  }

  // ==========================================
  // 10. NICHE SWITCHER
  // ==========================================
  const nicheTabs = document.querySelectorAll('.niche-tab');
  const nichePanels = document.querySelectorAll('.niche-panel');

  nicheTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.niche;
      nicheTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      nichePanels.forEach(panel => {
        if (panel.dataset.panel === target) {
          panel.classList.remove('hidden');
          requestAnimationFrame(() => panel.classList.add('active'));
        } else {
          panel.classList.remove('active');
          setTimeout(() => panel.classList.add('hidden'), 500);
        }
      });
    });
  });

  // ==========================================
  // 11. ROI CALCULATOR
  // ==========================================
  const leadsSlider = document.getElementById('leads-slider');
  const valueSlider = document.getElementById('value-slider');
  const leadsDisplay = document.getElementById('leads-display');
  const valueDisplay = document.getElementById('value-display');
  const currentRev = document.getElementById('current-revenue');
  const projectedRev = document.getElementById('projected-revenue');
  const annualInc = document.getElementById('annual-increase');

  function updateROI() {
    if (!leadsSlider || !valueSlider) return;
    const leads = parseInt(leadsSlider.value);
    const val = parseInt(valueSlider.value);
    const current = leads * val;
    const projected = Math.round(current * 1.4);
    const annual = (projected - current) * 12;

    if (leadsDisplay) leadsDisplay.textContent = leads;
    if (valueDisplay) valueDisplay.textContent = val.toLocaleString();
    if (currentRev) currentRev.textContent = '$' + current.toLocaleString();
    if (projectedRev) projectedRev.textContent = '$' + projected.toLocaleString();
    if (annualInc) annualInc.textContent = '$' + annual.toLocaleString();
  }

  if (leadsSlider) leadsSlider.addEventListener('input', updateROI);
  if (valueSlider) valueSlider.addEventListener('input', updateROI);
  updateROI();

  // ==========================================
  // 12. FEATURE CHIPS (Discovery Form)
  // ==========================================
  const chips = document.querySelectorAll('.chip');
  const chipPreview = document.getElementById('chip-preview');
  const selectedFeatures = new Set();

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const feature = chip.dataset.feature;
      if (selectedFeatures.has(feature)) {
        selectedFeatures.delete(feature);
        chip.classList.remove('active');
      } else {
        selectedFeatures.add(feature);
        chip.classList.add('active');
      }
      renderPreview();
    });
  });

  function renderPreview() {
    if (!chipPreview) return;
    chipPreview.innerHTML = '';
    selectedFeatures.forEach(f => {
      const span = document.createElement('span');
      span.textContent = f;
      chipPreview.appendChild(span);
    });
  }

  // ==========================================
  // 13. FORM SUBMIT
  // ==========================================
  const scopeForm = document.getElementById('scope-form');
  const submitBtn = document.getElementById('submit-btn');

  if (scopeForm && submitBtn) {
    scopeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="flex items-center gap-2 justify-center"><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<span class="flex items-center gap-2 justify-center"><i class="fa-solid fa-check"></i> Project Scope Sent!</span>';

        setTimeout(() => {
          submitBtn.classList.remove('success');
          submitBtn.innerHTML = original;
          submitBtn.disabled = false;
          scopeForm.reset();
          selectedFeatures.clear();
          chips.forEach(c => c.classList.remove('active'));
          renderPreview();
        }, 3000);
      }, 2000);
    });
  }

  // ==========================================
  // 14. DYNAMIC YEAR
  // ==========================================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================
  // 15. MAGNETIC BUTTONS
  // ==========================================
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - rect.left - rect.width/2) * 0.15}px, ${(e.clientY - rect.top - rect.height/2) * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
});
