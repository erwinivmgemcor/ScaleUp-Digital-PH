/* ============================================
   ScaleUp Digital — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Intersection Observer — Scroll Reveals
  // ==========================================
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ==========================================
  // 2. Lenis Smooth Scroll
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // 3. Custom Cursor
  // ==========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  const spotlight = document.getElementById('spotlight');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
    if (spotlight) {
      spotlight.style.left = mouseX + 'px';
      spotlight.style.top = mouseY + 'px';
    }
  });

  function animateFollower() {
    if (!follower) return;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .feature-chip');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
      if (follower) { follower.style.width = '48px'; follower.style.height = '48px'; follower.style.borderColor = 'rgba(255, 107, 0, 0.6)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) { cursor.style.width = '8px'; cursor.style.height = '8px'; }
      if (follower) { follower.style.width = '32px'; follower.style.height = '32px'; follower.style.borderColor = 'rgba(255, 107, 0, 0.4)'; }
    });
  });

  // ==========================================
  // 4. Scroll Progress Bar
  // ==========================================
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ==========================================
  // 5. Navbar Scroll Behavior
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================
  // 6. Mobile Menu
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      mobileMenuBtn.innerHTML = menuOpen
        ? '<i class="fa-solid fa-xmark w-5 h-5"></i>'
        : '<i class="fa-solid fa-bars w-5 h-5"></i>';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars w-5 h-5"></i>';
      });
    });
  }

  // ==========================================
  // 7. GSAP Animations
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.from('.hero-animate', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3
  });

  // Section heading reveals
  document.querySelectorAll('section h2').forEach(h2 => {
    gsap.from(h2, {
      scrollTrigger: { trigger: h2, start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // ==========================================
  // 8. Comparison Toggle
  // ==========================================
  const btnSocial = document.getElementById('btn-social');
  const btnScaleup = document.getElementById('btn-scaleup');
  const toggleIndicator = document.getElementById('toggle-indicator');
  const cardSocial = document.getElementById('card-social');
  const cardScaleup = document.getElementById('card-scaleup');

  if (btnSocial && btnScaleup && toggleIndicator && cardSocial && cardScaleup) {
    function setSocialActive() {
      toggleIndicator.style.left = '4px';
      btnSocial.classList.add('text-white');
      btnSocial.classList.remove('text-gray-400');
      btnScaleup.classList.add('text-gray-400');
      btnScaleup.classList.remove('text-white');
      cardSocial.style.opacity = '1';
      cardSocial.style.filter = 'grayscale(0%)';
      cardSocial.style.transform = 'scale(1)';
      cardScaleup.style.opacity = '0.5';
      cardScaleup.style.filter = 'grayscale(50%)';
      cardScaleup.style.transform = 'scale(0.98)';
    }

    function setScaleupActive() {
      toggleIndicator.style.left = 'calc(50%)';
      btnScaleup.classList.add('text-white');
      btnScaleup.classList.remove('text-gray-400');
      btnSocial.classList.add('text-gray-400');
      btnSocial.classList.remove('text-white');
      cardScaleup.style.opacity = '1';
      cardScaleup.style.filter = 'grayscale(0%)';
      cardScaleup.style.transform = 'scale(1)';
      cardSocial.style.opacity = '0.5';
      cardSocial.style.filter = 'grayscale(50%)';
      cardSocial.style.transform = 'scale(0.98)';
    }

    btnSocial.addEventListener('click', setSocialActive);
    btnScaleup.addEventListener('click', setScaleupActive);

    // Default: ScaleUp active
    setScaleupActive();
  }

  // ==========================================
  // 9. Niche Switcher
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
  // 10. ROI Calculator
  // ==========================================
  const leadsSlider = document.getElementById('leads-slider');
  const valueSlider = document.getElementById('value-slider');
  const leadsValue = document.getElementById('leads-value');
  const valueValue = document.getElementById('value-value');
  const currentRevenue = document.getElementById('current-revenue');
  const projectedRevenue = document.getElementById('projected-revenue');
  const annualIncrease = document.getElementById('annual-increase');

  function calculateROI() {
    if (!leadsSlider || !valueSlider) return;
    const leads = parseInt(leadsSlider.value);
    const avgValue = parseInt(valueSlider.value);
    const current = leads * avgValue;
    const projected = current * 1.4;
    const annual = (projected - current) * 12;

    if (leadsValue) leadsValue.textContent = leads;
    if (valueValue) valueValue.textContent = avgValue.toLocaleString();
    if (currentRevenue) currentRevenue.textContent = '$' + current.toLocaleString();
    if (projectedRevenue) projectedRevenue.textContent = '$' + Math.round(projected).toLocaleString();
    if (annualIncrease) annualIncrease.textContent = '$' + Math.round(annual).toLocaleString();
  }

  if (leadsSlider) leadsSlider.addEventListener('input', calculateROI);
  if (valueSlider) valueSlider.addEventListener('input', calculateROI);
  calculateROI();

  // ==========================================
  // 11. Feature Chips (Discovery Form)
  // ==========================================
  const featureChips = document.querySelectorAll('.feature-chip');
  const selectedPreview = document.getElementById('selected-preview');
  const selectedFeatures = new Set();

  featureChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const feature = chip.dataset.feature;
      if (selectedFeatures.has(feature)) {
        selectedFeatures.delete(feature);
        chip.classList.remove('active');
      } else {
        selectedFeatures.add(feature);
        chip.classList.add('active');
      }
      updatePreview();
    });
  });

  function updatePreview() {
    if (!selectedPreview) return;
    selectedPreview.innerHTML = '';
    selectedFeatures.forEach(feature => {
      const pill = document.createElement('span');
      pill.className = 'px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-medium';
      pill.textContent = feature;
      selectedPreview.appendChild(pill);
    });
  }

  // ==========================================
  // 12. Form Submit
  // ==========================================
  const scopeForm = document.getElementById('scope-form');
  const submitBtn = document.getElementById('submit-btn');

  if (scopeForm && submitBtn) {
    scopeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><i class="fa-solid fa-check w-4 h-4"></i>Project Scope Sent!</span>';
        submitBtn.classList.remove('from-orange', 'to-orange-dim');
        submitBtn.classList.add('from-green-500', 'to-green-600');

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          submitBtn.classList.add('from-orange', 'to-orange-dim');
          submitBtn.classList.remove('from-green-500', 'to-green-600');
          scopeForm.reset();
          selectedFeatures.clear();
          featureChips.forEach(c => c.classList.remove('active'));
          updatePreview();
        }, 3000);
      }, 2000);
    });
  }

  // ==========================================
  // 13. Dynamic Year
  // ==========================================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================
  // 14. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  // ==========================================
  // 15. Magnetic Button Effect
  // ==========================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
});
