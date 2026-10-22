const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-art img');
const heroCopy = document.querySelector('.hero-content');
const progressBar = document.querySelector('.scroll-meter span');
let scrollTicking = false;
function updateDepth() {
  const vh = window.innerHeight || 1;
  const pageRange = Math.max(1, document.documentElement.scrollHeight - vh);
  progressBar?.parentElement?.style.setProperty('--scroll-progress', String(window.scrollY / pageRange));
  if (!prefersReducedMotion && hero) {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
    heroImage?.style.setProperty('--scroll-y', `${progress * 48}px`);
    heroImage?.style.setProperty('--scroll-scale', String(1.09 - progress * 0.09));
    heroImage?.style.setProperty('--scroll-rotate', `${progress * 2.1}deg`);
    heroCopy?.style.setProperty('--copy-y', `${progress * 24}px`);
    document.querySelectorAll('.manifesto-image, .story-media, .visit-mark').forEach(element => {
      const box = element.getBoundingClientRect();
      const centerOffset = (box.top + box.height / 2 - vh / 2) / vh;
      const shift = Math.max(-24, Math.min(24, centerOffset * -18));
      element.style.setProperty('--image-shift', `${shift}px`);
      element.style.setProperty('--depth-y', `${shift * .45}px`);
      element.style.setProperty('--story-tilt', `${Math.max(-2.2, Math.min(2.2, centerOffset * -1.8))}deg`);
    });
    document.querySelectorAll('.tilt-card').forEach(card => {
      const box = card.getBoundingClientRect();
      const centerOffset = (box.top + box.height / 2 - vh / 2) / vh;
      card.style.setProperty('--card-shift', `${Math.max(-18, Math.min(18, centerOffset * -15))}px`);
      card.style.setProperty('--scroll-rx', `${Math.max(-3.2, Math.min(3.2, centerOffset * 2.4))}deg`);
      card.style.setProperty('--scroll-ry', `${Math.max(-1.8, Math.min(1.8, centerOffset * -1.1))}deg`);
    });
  }
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateDepth);
    scrollTicking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateDepth, { passive: true });
updateDepth();

if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--rx', `${-y * 3.2}deg`);
      card.style.setProperty('--ry', `${x * 3.2}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(item => revealObserver ? revealObserver.observe(item) : item.classList.add('is-visible'));

document.querySelector('#bmi-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const height = Number(data.get('height')) / 100;
  const weight = Number(data.get('weight'));
  const output = document.querySelector('#bmi-result');
  if (!height || !weight) { output.textContent = 'Enter a valid height and weight.'; return; }
  const bmi = weight / (height * height);
  const range = bmi < 18.5 ? 'below the commonly used reference range' : bmi < 25 ? 'within the commonly used reference range' : bmi < 30 ? 'above the commonly used reference range' : 'in a higher reference range';
  output.textContent = `BMI: ${bmi.toFixed(1)} — ${range}. This is a general screening reference, not a diagnosis.`;
});

document.querySelector('#enquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Fussion Fit enquiry — ${data.get('interest')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nInterested in: ${data.get('interest')}\n\n${data.get('message') || ''}`);
  document.querySelector('#form-note').textContent = 'Your email app is opening with the enquiry prepared. Review it and press Send there; the website has not sent your message.';
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
