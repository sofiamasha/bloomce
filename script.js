/* ═══════════════════════════════════════════════════════
   BLOOM FINANCE — Landing Page Script
   ═══════════════════════════════════════════════════════ */

'use strict';

// ── Navigation scroll effect ─────────────────────────
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── 3D tilt on hero card ─────────────────────────────
const heroCard = document.getElementById('heroCard3D');
if (heroCard) {
  const MAX_TILT = 8;
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    heroCard.style.transform =
      `rotateY(${dx * MAX_TILT}deg) rotateX(${-dy * MAX_TILT}deg) translateZ(10px)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
    heroCard.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
    setTimeout(() => { heroCard.style.transition = ''; }, 600);
  });
}

// ── Scroll reveal (Intersection Observer) ───────────
const revealEls = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay by position within its parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.scroll-reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// Feature cards also use scroll-reveal pattern
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.feature-card')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        featureObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
featureCards.forEach(el => featureObserver.observe(el));

// ── Animated number counter ──────────────────────────
function animateCounter(el, target, prefix = '', suffix = '', duration = 1600) {
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('statUsers'), 2400, '', '+');
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ── Hero balance ticker ──────────────────────────────
const heroBalance = document.getElementById('heroBalance');
if (heroBalance) {
  setTimeout(() => {
    const values = ['R$ 4.820,40', 'R$ 4.798,50', 'R$ 4.820,40'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % values.length;
      heroBalance.style.opacity = '0';
      heroBalance.style.transform = 'translateY(-4px)';
      setTimeout(() => {
        heroBalance.textContent = values[i];
        heroBalance.style.opacity = '1';
        heroBalance.style.transform = 'translateY(0)';
        heroBalance.style.transition = 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
      }, 300);
    }, 4000);
  }, 2000);
}

// ── Landing voice orb interactive ───────────────────
const landingVoiceOrb = document.getElementById('landingVoiceOrb');
if (landingVoiceOrb) {
  let isListening = false;
  landingVoiceOrb.addEventListener('click', () => {
    isListening = !isListening;
    landingVoiceOrb.classList.toggle('listening', isListening);
    landingVoiceOrb.textContent = isListening ? '🔴' : '🎙️';
    if (isListening) {
      setTimeout(() => {
        isListening = false;
        landingVoiceOrb.classList.remove('listening');
        landingVoiceOrb.textContent = '🎙️';
      }, 3000);
    }
  });
}

// ── Page transition: Landing → Login ─────────────────
function goToLogin() {
  document.body.classList.add('show-login');
  window.scrollTo({ top: 0 });
}
function goToLanding() {
  document.body.classList.remove('show-login');
}

// Button bindings
document.getElementById('navLoginBtn')?.addEventListener('click', goToLogin);
document.getElementById('navSignupBtn')?.addEventListener('click', goToLogin);
document.getElementById('heroCtaBtn')?.addEventListener('click', goToLogin);
document.getElementById('heroDemoBtn')?.addEventListener('click', () => {
  window.location.href = 'app.html';
});
document.getElementById('goToSignup')?.addEventListener('click', goToLogin);
document.getElementById('loginDemoBtn')?.addEventListener('click', () => {
  window.location.href = 'app.html';
});

// ── Login Form ────────────────────────────────────────
const loginForm = document.getElementById('loginForm');
const loginSubmit = document.getElementById('loginSubmit');

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;

  if (!email || !password) return;

  // Loading state
  loginSubmit.innerHTML = '<span>Entrando…</span>';
  loginSubmit.disabled = true;

  // Simulate auth
  await new Promise(r => setTimeout(r, 1200));

  // Store basic session
  sessionStorage.setItem('bloom_user', JSON.stringify({ email, name: email.split('@')[0] }));

  // Redirect to app
  window.location.href = 'app.html';
});

// ── Smooth scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Parallax on ambient blobs ─────────────────────────
window.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  const a1 = document.querySelector('.ambient-one');
  const a2 = document.querySelector('.ambient-two');
  if (a1) a1.style.transform = `translate(${dx * -20}px, ${dy * -15}px)`;
  if (a2) a2.style.transform = `translate(${dx * 15}px, ${dy * 20}px)`;
}, { passive: true });
