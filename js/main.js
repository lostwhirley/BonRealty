/* ============================================================
   BON REALTY — main.js
   ============================================================ */

/* ─── Property Videos Data ─────────────────────────────────── */
const videos = [
  {
    id: 'UWeOMjtgOYE',
    title: '100 Forest Avenue, Niles, MI',
    desc: '"This view of the St Joseph River never gets old"'
  },
  {
    id: 'U4ByKlqdVgU',
    title: '1449 Riverside Road, Niles, MI',
    desc: 'Custom-built craftsman style home with 238\' of river frontage'
  },
  {
    id: 'DhKgdk1o5Gc',
    title: '21790 Buffalo Lane, Cassopolis, MI',
    desc: 'Waterfront country escape with forever views of Puterbaugh Lake — 5 bed / 4 bath on 2 acres'
  },
  {
    id: 'hwR65sxRikE',
    title: '22492 Park Shore Drive, Cassopolis, MI',
    desc: 'Diamond Lake waterfront property with stunning lake access'
  },
  {
    id: '5fN6Y7YYtWY',
    title: '19141 Mud Lake Street, Cassopolis, MI',
    desc: 'Over 6,000 sq ft of luxury — a stunning contemporary estate'
  },
  {
    id: '95GgT8rdRhc',
    title: '54578 Love Lane, Eau Claire, MI',
    desc: 'Over 90 ft of waterfrontage on Indian Lake with raised ranch design'
  },
  {
    id: 'paa0UMFT3-U',
    title: '14593 Mead Road, Buchanan, MI',
    desc: '5 bedroom home ready for you — 5 acres of privacy'
  },
  {
    id: 'p634WUknWBE',
    title: '4248 E Tudor Road, Berrien Springs, MI',
    desc: 'Extremely well cared for & nicely updated home on ½ acre'
  },
  {
    id: 'VuNJhgasS3g',
    title: '9917 Maple Grove Road, Charlevoix, MI',
    desc: '10 acres of beautiful pines near Grand Traverse Bay'
  },
  {
    id: 'IkFTo1pdX4U',
    title: '52851 Twin Lake Shore Dr, Dowagiac, MI',
    desc: 'Affordable lakefront property with 50 ft of frontage'
  },
  {
    id: 'xQVjdcy7PVY',
    title: '116 Bridle Path Lane, Niles, MI',
    desc: 'Longmeadow home with tranquil pond setting'
  },
  {
    id: 'vsGURn7Ra1o',
    title: '15-16 Hidden Hills Drive, Niles, MI',
    desc: 'Vacant lots at the Michigan/Indiana stateline — a rare opportunity'
  },
  {
    id: 'Yha7GewTqD0',
    title: '8333 M 62, Berrien Center, MI',
    desc: 'Well cared for hobby farm with over 5 acres'
  },
  {
    id: 'mO6m0emaFaQ',
    title: '4818 Marilyn Jane Way, Stevensville, MI',
    desc: 'Pride in ownership is evident — Lakeshore Schools district'
  }
];

const VIDEOS_PER_PAGE = 6;
let videosShown = VIDEOS_PER_PAGE;


/* ─── Render Videos ─────────────────────────────────────────── */
function renderVideos() {
  const grid = document.getElementById('videos-grid');
  const btn  = document.getElementById('load-more-btn');
  if (!grid) return;

  grid.innerHTML = '';
  const slice = videos.slice(0, videosShown);

  slice.forEach(v => {
    const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;
    const card = document.createElement('div');
    card.className = 'video-card fade-up';
    card.innerHTML = `
      <div class="video-thumb">
        <img src="${thumb}" alt="${v.title}" loading="lazy">
        <div class="video-play-btn">
          <i class="fas fa-play-circle"></i>
        </div>
      </div>
      <div class="video-info">
        <h4>${v.title}</h4>
        <p>${v.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openVideoModal(v.id));
    grid.appendChild(card);
  });

  // Show/hide "Load More" button
  if (btn) {
    btn.style.display = videosShown >= videos.length ? 'none' : 'inline-flex';
  }

  // Re-observe new cards for fade-in
  observeFadeElements();
}

document.getElementById('load-more-btn')?.addEventListener('click', () => {
  videosShown = Math.min(videosShown + VIDEOS_PER_PAGE, videos.length);
  renderVideos();
});


/* ─── Video Modal ────────────────────────────────────────────── */
function openVideoModal(videoId) {
  const modal    = document.getElementById('video-modal');
  const iframe   = document.getElementById('modal-iframe');
  if (!modal || !iframe) return;

  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal  = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  if (!modal || !iframe) return;

  modal.classList.remove('open');
  iframe.src = '';
  document.body.style.overflow = '';
}

document.getElementById('modal-close')?.addEventListener('click', closeVideoModal);
document.getElementById('modal-backdrop')?.addEventListener('click', closeVideoModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoModal();
});


/* ─── Hero Slideshow ─────────────────────────────────────────── */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  startTimer();
}


/* ─── Testimonial Carousel ───────────────────────────────────── */
function initTestimonials() {
  const quotes = document.querySelectorAll('.testimonial-quote');
  if (!quotes.length) return;

  let current = 0;

  function next() {
    quotes[current].classList.remove('active');
    current = (current + 1) % quotes.length;
    quotes[current].classList.add('active');
  }

  setInterval(next, 6000);
}


/* ─── Sticky Nav ─────────────────────────────────────────────── */
function initNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}


/* ─── Mobile Nav ─────────────────────────────────────────────── */
function initMobileNav() {
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn  = document.getElementById('mobile-nav-close');
  const links     = document.querySelectorAll('.mobile-link, .mobile-phone');

  function open() {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));
}


/* ─── Scroll Fade-In ─────────────────────────────────────────── */
let fadeObserver;

function observeFadeElements() {
  const elements = document.querySelectorAll('.fade-up:not(.visible)');
  if (!fadeObserver) {
    fadeObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }, i * 80);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }
  elements.forEach(el => fadeObserver.observe(el));
}

function addFadeClasses() {
  const selectors = [
    '.why-card',
    '.about-content',
    '.about-photo-col',
    '.listings-text',
    '.team-card',
    '.contact-left',
    '.contact-form',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('fade-up'));
  });
}


/* ─── Smooth anchor scroll (offset for fixed nav) ───────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ─── Contact Form ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.fname?.value || '';
    const lname   = form.lname?.value || '';
    const email   = form.email?.value || '';
    const phone   = form.phone?.value || '';
    const interest= form.interest?.value || '';
    const message = form.message?.value || '';

    const subject = encodeURIComponent(`Website Inquiry from ${name} ${lname}`);
    const body    = encodeURIComponent(
      `Name: ${name} ${lname}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`
    );
    window.location.href = `mailto:bethvan@bonrealty.com?subject=${subject}&body=${body}`;
  });
}


/* ─── Init All ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  initTestimonials();
  initNav();
  initMobileNav();
  initSmoothScroll();
  initContactForm();
  addFadeClasses();
  renderVideos();
  observeFadeElements();
});
