const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('open', !isOpen);
  navToggle.querySelector('.sr-only').textContent = isOpen ? 'Open menu' : 'Close menu';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}
