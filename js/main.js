/* ============================================================
   ANANTHA KUMAR GADHAM — PORTFOLIO
   main.js
   ============================================================ */

/* ============================================================
   EMAILJS CONFIG — Fill these 3 values after signing up at
   https://emailjs.com (free, no backend needed)
   ============================================================ */
const EMAILJS_PUBLIC_KEY  = 'B-CqbyrXHhwbWv9AT';   // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_0jp02vb';   // Email Services tab
const EMAILJS_TEMPLATE_ID = 'template_bnxw6ty';  // Email Templates tab

/* ── Active nav link on scroll ─────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ── Animate stat counters on scroll into view ──────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const raw      = el.getAttribute('data-target');
    const target   = parseFloat(raw);
    const isFloat  = raw.includes('.');
    const duration = 1200;
    const steps    = 50;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = target * (step / steps);
      el.querySelector('.count').textContent =
        isFloat ? current.toFixed(1) : Math.floor(current);
      if (step >= steps) {
        clearInterval(timer);
        el.querySelector('.count').textContent =
          isFloat ? target.toFixed(1) : target;
      }
    }, duration / steps);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
})();

/* ── Fade-in on scroll for cards ────────────────────────────── */
(function () {
  const cards = document.querySelectorAll(
    '.project-card, .skill-group, .achieve-card, .fact-item, .stat-card'
  );

  cards.forEach((card) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((c) => observer.observe(c));
})();

/* ── Contact form — EmailJS ─────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn        = form.querySelector('.form-submit');
    const nameVal    = document.getElementById('name').value.trim();
    const emailVal   = document.getElementById('email').value.trim();
    const messageVal = document.getElementById('message').value.trim();

    // Basic validation
    if (!nameVal || !emailVal || !messageVal) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    btn.textContent = 'Sending...';
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    try {
      // Send via EmailJS SDK (loaded in index.html)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    nameVal,
          from_email:   emailVal,
          message:      messageVal,
          to_email:     'ananthgadham7601@gmail.com',
          reply_to:     emailVal,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Success
      btn.textContent   = 'Message sent ✓';
      btn.style.opacity = '1';
      btn.style.background = '#34d399';
      showStatus('Thank you for your intrest in my profile.', 'success');
      form.reset();

      setTimeout(() => {
        btn.textContent      = 'Send message →';
        btn.style.background = '';
        btn.disabled         = false;
        clearStatus();
      }, 5000);

    } catch (err) {
      console.error('EmailJS error:', err);
      btn.textContent   = 'Send message →';
      btn.style.opacity = '1';
      btn.disabled      = false;
      showStatus('Failed to send. Please email me directly at ananthgadham@gmail.com', 'error');
    }
  });

  function showStatus(msg, type) {
    let el = document.getElementById('form-status');
    if (!el) {
      el = document.createElement('p');
      el.id = 'form-status';
      el.style.cssText =
        'font-size:13px;margin-top:8px;padding:10px 14px;border-radius:8px;';
      document.getElementById('contact-form').appendChild(el);
    }
    el.textContent = msg;
    el.style.background = type === 'success'
      ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)';
    el.style.color = type === 'success' ? '#34d399' : '#f87171';
    el.style.border = type === 'success'
      ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(248,113,113,0.3)';
  }

  function clearStatus() {
    const el = document.getElementById('form-status');
    if (el) el.remove();
  }
})();

/* ── Typing effect in hero eyebrow ─────────────────────────── */
(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Available for SDE-1 roles',
    'Backend Engineer',
    'MERN Stack Developer',
    'Open to full-time roles',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;

  const tick = () => {
    const current = phrases[phraseIndex];
    el.textContent = deleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    deleting ? charIndex-- : charIndex++;

    let delay = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      delay    = 2000;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting     = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      delay        = 400;
    }

    setTimeout(tick, delay);
  };

  tick();
})();
