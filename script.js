/* ============================================
   INTERACTIONS — Clínica Marlise Conceição
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Scroll Effect ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const answerInner = item.querySelector('.faq__answer-inner');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq__answer').style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answerInner.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // nav height offset
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Counter animation for experience badge ---
  const counterEl = document.querySelector('.about__experience-badge .number');
  if (counterEl) {
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounter(counterEl, 0, 30, 1800);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(counterEl);
  }

  function animateCounter(el, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = '+' + current;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // --- WhatsApp link ---
  const WHATSAPP_NUMBER = '5500000000000'; // Replace with actual number
  const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(whatsappURL, '_blank');
    });
  });

  // --- Subtle Background Page Parallax ---
  const heroBgAccent = document.querySelector('.hero__bg-accent');
  if (window.innerWidth > 768 && heroBgAccent) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      heroBgAccent.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // --- Golden ambient cursor light ---
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(198, 164, 106, 0.06), rgba(220, 199, 161, 0.03) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.8s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursorGlow);

  let cursorTimeout;
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';

      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(() => {
        cursorGlow.style.opacity = '0';
      }, 2000);
    }, { passive: true });
  }

  // --- Image lazy loading with fade effect ---
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
});
