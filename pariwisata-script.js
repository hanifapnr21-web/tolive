// ========== FILTER DESTINASI ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.dest-card');

    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ========== MODAL ==========
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openModal(card) {
  const img = card.querySelector('.dest-card-img img');
  const badge = card.querySelector('.dest-card-badge');
  const title = card.querySelector('h3');
  const location = card.querySelector('.dest-location');
  const desc = card.querySelector('.dest-card-body p');

  document.getElementById('modalImg').src = img.src;
  document.getElementById('modalImg').alt = img.alt;
  document.getElementById('modalBadge').textContent = badge.textContent;
  document.getElementById('modalTitle').textContent = title.textContent;
  document.getElementById('modalLocation').textContent = location.textContent.replace(/.*\s/, '').trim() || location.textContent;
  document.getElementById('modalDesc').textContent = desc.textContent;

  document.getElementById('modalFeatures').innerHTML = '';

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.getElementById('modalCta').addEventListener('click', closeModal);

// ========== CAROUSEL ==========
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('carouselNext').addEventListener('click', () => {
  goToSlide((currentSlide + 1) % slides.length);
});

document.getElementById('carouselPrev').addEventListener('click', () => {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
});

setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ========== GALLERY LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightboxClose').addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ========== CONTACT FORM ==========
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
  e.target.reset();
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ========== AKOMODASI & TRANSPORTASI - Animasi Masuk ==========
document.addEventListener('DOMContentLoaded', function() {
  const accoCards = document.querySelectorAll('.acco-card, .transport-card');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  accoCards.forEach(card => {
    card.classList.add('fade-up');
    observer.observe(card);
  });
});

// ========== PRELOADER ==========
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  
  setTimeout(() => {
    preloader.classList.add('hidden');
    
    setTimeout(() => {
      preloader.remove();
    }, 700);
  }, 1800); // biar huruf sempat muncul dulu
});