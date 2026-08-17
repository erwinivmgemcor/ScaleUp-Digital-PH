/* ============================================
   ScaleUp Digital — Production Scripts
   Clean, error-free, fully functional.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // 1. Custom Cursor
  // ==========================================
  const cursorDot = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (cursorDot && cursorRing && !isTouch) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = null;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, .feature-chip, .toggle-btn, .niche-tab, .service-card, .process-card, .founder-card');
    interactiveEls.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.borderColor = 'rgba(255, 107, 0, 0.6)';
      });
      el.addEventListener('mouseleave', function() {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(255, 107, 0, 0.35)';
      });
    });
  }

  // ==========================================
  // 2. Scroll Progress Bar
  // ==========================================
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

  // ==========================================
  // 3. Navbar Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ==========================================
  // 4. Mobile Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleIcon = document.getElementById('toggle-icon');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
      } else {
        mobileMenu.classList.add('open');
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-xmark';
      }
    });

    document.querySelectorAll('.mobile-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  // ==========================================
  // 5. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 6. Intersection Observer — Scroll Reveals
  // ==========================================
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('animate-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ==========================================
  // 7. Comparison Toggle
  // ==========================================
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const rentedCard = document.querySelector('.card-rented');
  const ownedCard = document.querySelector('.card-owned');
  const togglePill = document.getElementById('toggle-pill');

  toggleBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      toggleBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var mode = btn.dataset.target;
      if (mode === 'rented') {
        if (rentedCard) {
          rentedCard.classList.add('highlight');
          rentedCard.classList.remove('dimmed');
        }
        if (ownedCard) {
          ownedCard.classList.remove('highlight');
          ownedCard.classList.add('dimmed');
        }
        if (togglePill) togglePill.classList.remove('right');
      } else {
        if (ownedCard) {
          ownedCard.classList.add('highlight');
          ownedCard.classList.remove('dimmed');
        }
        if (rentedCard) {
          rentedCard.classList.remove('highlight');
          rentedCard.classList.add('dimmed');
        }
        if (togglePill) togglePill.classList.add('right');
      }
    });
  });

  // Default: owned (ScaleUp) active
  if (ownedCard) {
    ownedCard.classList.add('highlight');
    ownedCard.classList.remove('dimmed');
  }
  if (rentedCard) {
    rentedCard.classList.remove('highlight');
    rentedCard.classList.add('dimmed');
  }
  if (togglePill) togglePill.classList.add('right');

  // ==========================================
  // 8. Niche Switcher
  // ==========================================
  const nicheTabs = document.querySelectorAll('.niche-tab');
  const nichePanels = document.querySelectorAll('.niche-panel');

  nicheTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const target = tab.dataset.niche;
      if (!target) return;

      nicheTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      nichePanels.forEach(function(panel) {
        if (panel.dataset.panel === target) {
          panel.classList.remove('hidden');
          // Force reflow
          void panel.offsetWidth;
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
          setTimeout(function() {
            if (!panel.classList.contains('active')) {
              panel.classList.add('hidden');
            }
          }, 500);
        }
      });
    });
  });

  // ==========================================
  // 9. ROI Calculator
  // ==========================================
  const leadsInput = document.getElementById('monthlyLeads');
  const dealInput = document.getElementById('avgDealValue');
  const currentRev = document.getElementById('currentRevenue');
  const projectedRev = document.getElementById('projectedRevenue');
  const annualIncrease = document.getElementById('annualIncrease');

  function calculateROI() {
    var leads = parseFloat(leadsInput.value) || 0;
    var deal = parseFloat(dealInput.value) || 0;

    // Formula: Current = Leads * Deal
    // ScaleUp Lift = +40% conversion lift
    var current = leads * deal;
    var projected = current * 1.4;
    var yearlyDiff = (projected - current) * 12;

    var leadsVal = document.getElementById('leadsVal');
    var dealVal = document.getElementById('dealVal');
    if (leadsVal) leadsVal.textContent = leads.toLocaleString();
    if (dealVal) dealVal.textContent = '₱' + deal.toLocaleString();
    if (currentRev) currentRev.textContent = '₱' + Math.round(current).toLocaleString();
    if (projectedRev) projectedRev.textContent = '₱' + Math.round(projected).toLocaleString();
    if (annualIncrease) annualIncrease.textContent = '₱' + Math.round(yearlyDiff).toLocaleString();
  }

  if (leadsInput) leadsInput.addEventListener('input', calculateROI);
  if (dealInput) dealInput.addEventListener('input', calculateROI);
  calculateROI();

  // ==========================================
  // 10. Feature Chips (Discovery Form)
  // ==========================================
  const featureChips = document.querySelectorAll('.feature-chip');
  const selectedPreview = document.getElementById('selected-preview');
  const selectedFeatures = new Set();

  featureChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      const feature = chip.dataset.feature;
      if (!feature) return;

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
    selectedFeatures.forEach(function(feature) {
      const pill = document.createElement('span');
      pill.className = 'selected-pill';
      pill.textContent = feature;
      selectedPreview.appendChild(pill);
    });
  }

  // ==========================================
  // 11. Form Submit Simulation
  // ==========================================
  const scopeForm = document.getElementById('scope-form');
  const submitBtn = document.getElementById('submit-btn');

  if (scopeForm && submitBtn) {
    scopeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText ? btnText.textContent : 'Send Project Scope';

      submitBtn.disabled = true;
      if (btnText) btnText.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

      setTimeout(function() {
        if (btnText) btnText.innerHTML = '<i class="fa-solid fa-check"></i> Project Scope Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        submitBtn.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';

        setTimeout(function() {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          scopeForm.reset();
          selectedFeatures.clear();
          featureChips.forEach(function(c) { c.classList.remove('active'); });
          updatePreview();
        }, 2500);
      }, 1800);
    });
  }

  // ==========================================
  // 12. Dynamic Year
  // ==========================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 13. Magnetic Button Effect
  // ==========================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0)';
    });
  });

}); // End DOMContentLoaded
