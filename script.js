const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    portfolioItems.forEach((item) => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      item.classList.toggle('hidden-item', !shouldShow);
    });
  });
});

const beforeAfterSlider = document.querySelector('.before-after-slider');
if (beforeAfterSlider) {
  const beforeImage = beforeAfterSlider.querySelector('.after-image');
  const handle = beforeAfterSlider.querySelector('.slider-handle');

  const updateSlider = (clientX) => {
    if (!beforeImage || !handle) return;

    const rect = beforeAfterSlider.getBoundingClientRect();
    const percent = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);

    beforeImage.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  };

  beforeAfterSlider.addEventListener('pointerdown', (event) => {
    beforeAfterSlider.setPointerCapture(event.pointerId);
    updateSlider(event.clientX);
  });

  beforeAfterSlider.addEventListener('pointermove', (event) => {
    if (event.pressure > 0 || event.buttons === 1) {
      updateSlider(event.clientX);
    }
  });

  beforeAfterSlider.addEventListener('pointerup', () => {
    beforeAfterSlider.releasePointerCapture?.();
  });

  const setDefaultPosition = () => {
    beforeImage.style.width = '50%';
    handle.style.left = '50%';
  };

  setDefaultPosition();
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  if (!question) return;

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove('active');
      const btn = faqItem.querySelector('.faq-question');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-content img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCategory = document.querySelector('.lightbox-category');
const lightboxClose = document.querySelector('.lightbox-close');

portfolioItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    const overlay = item.querySelector('.item-overlay');

    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCategory || !image || !overlay) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = overlay.querySelector('strong')?.textContent || 'Realizacja';
    lightboxCategory.textContent = overlay.querySelector('span')?.textContent || 'Realizacja';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'WYSŁANO DEMO';
      button.disabled = true;
      button.style.opacity = '0.8';
    }
  });
}
