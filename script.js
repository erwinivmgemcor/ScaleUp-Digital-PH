/* ============================================
   ScaleUp Digital — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // ==========================================
  // Lenis Smooth Scroll
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

  // Integrate with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // Custom Cursor
  // ==========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  const spotlight = document.getElementById('spotlight');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    spotlight.style.left = mouseX + 'px';
    spotlight.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .feature-chip');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      follower.style.width = '48px';
      follower.style.height = '48px';
      follower.style.borderColor = 'rgba(255, 107, 0, 0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(255, 107, 0, 0.4)';
    });
  });

  // ==========================================
  // Scroll Progress Bar
  // ==========================================
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ==========================================
  // Navbar Scroll Behavior
  // ==========================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ==========================================
  // Mobile Menu
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open');
      mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-5 h-5"></i>';
    } else {
      mobileMenu.classList.remove('open');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
    }
    lucide.createIcons();
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
      lucide.createIcons();
    });
  });

  // ==========================================
  // GSAP Animations
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  gsap.from('.hero-animate', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3
  });

  // Section reveals
  const revealElements = document.querySelectorAll('.offering-card, .process-card, .founder-card, .feature-mini');
  revealElements.forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.05,
      ease: 'power3.out'
    });
  });

  // Infrastructure stats
  gsap.from('.infra-stats', {
    scrollTrigger: {
      trigger: '.infra-stats',
      start: 'top 80%'
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // ==========================================
  // Comparison Toggle
  // ==========================================
  const btnSocial = document.getElementById('btn-social');
  const btnScaleup = document.getElementById('btn-scaleup');
  const toggleIndicator = document.getElementById('toggle-indicator');
  const cardSocial = document.getElementById('card-social');
  const cardScaleup = document.getElementById('card-scaleup');

  btnSocial.addEventListener('click', () => {
    toggleIndicator.style.left = '4px';
    btnSocial.classList.add('text-white');
    btnSocial.classList.remove('text-gray-400');
    btnScaleup.classList.add('text-gray-400');
    btnScaleup.classList.remove('text-white');
    cardSocial.style.opacity = '1';
    cardSocial.style.filter = 'grayscale(0%)';
    cardScaleup.style.opacity = '0.5';
    cardScaleup.style.filter = 'grayscale(50%)';
  });

  btnScaleup.addEventListener('click', () => {
    toggleIndicator.style.left = 'calc(50%)';
    btnScaleup.classList.add('text-white');
    btnScaleup.classList.remove('text-gray-400');
    btnSocial.classList.add('text-gray-400');
    btnSocial.classList.remove('text-white');
    cardScaleup.style.opacity = '1';
    cardScaleup.style.filter = 'grayscale(0%)';
    cardSocial.style.opacity = '0.5';
    cardSocial.style.filter = 'grayscale(50%)';
  });

  // ==========================================
  // Niche Switcher
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
          setTimeout(() => {
            panel.classList.add('active');
          }, 50);
        } else {
          panel.classList.remove('active');
          setTimeout(() => {
            panel.classList.add('hidden');
          }, 500);
        }
      });
    });
  });

  // ==========================================
  // ROI Calculator
  // ==========================================
  const leadsSlider = document.getElementById('leads-slider');
  const valueSlider = document.getElementById('value-slider');
  const leadsValue = document.getElementById('leads-value');
  const valueValue = document.getElementById('value-value');
  const currentRevenue = document.getElementById('current-revenue');
  const projectedRevenue = document.getElementById('projected-revenue');
  const annualIncrease = document.getElementById('annual-increase');

  function calculateROI() {
    const leads = parseInt(leadsSlider.value);
    const avgValue = parseInt(valueSlider.value);
    const current = leads * avgValue;
    const projected = current * 1.4; // 40% improvement
    const annual = (projected - current) * 12;

    leadsValue.textContent = leads;
    valueValue.textContent = avgValue.toLocaleString();
    currentRevenue.textContent = '$' + current.toLocaleString();
    projectedRevenue.textContent = '$' + Math.round(projected).toLocaleString();
    annualIncrease.textContent = '$' + Math.round(annual).toLocaleString();
  }

  leadsSlider.addEventListener('input', calculateROI);
  valueSlider.addEventListener('input', calculateROI);
  calculateROI();

  // ==========================================
  // Feature Chips (Discovery Form)
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
    selectedPreview.innerHTML = '';
    selectedFeatures.forEach(feature => {
      const pill = document.createElement('span');
      pill.className = 'px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-medium';
      pill.textContent = feature;
      selectedPreview.appendChild(pill);
    });
  }

  // ==========================================
  // Form Submit
  // ==========================================
  const scopeForm = document.getElementById('scope-form');
  const submitBtn = document.getElementById('submit-btn');

  scopeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<span class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i>Project Scope Sent!</span>';
      submitBtn.classList.remove('from-orange', 'to-orange-dim');
      submitBtn.classList.add('from-green-500', 'to-green-600');
      lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        submitBtn.classList.add('from-orange', 'to-orange-dim');
        submitBtn.classList.remove('from-green-500', 'to-green-600');
        scopeForm.reset();
        selectedFeatures.clear();
        featureChips.forEach(c => c.classList.remove('active'));
        updatePreview();
        lucide.createIcons();
      }, 3000);
    }, 2000);
  });

  // ==========================================
  // Dynamic Year
  // ==========================================
  document.getElementById('year').textContent = new Date().getFullYear();

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  // ==========================================
  // Magnetic Button Effect
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
