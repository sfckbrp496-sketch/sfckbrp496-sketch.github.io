const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const themeToggle = document.querySelector('.theme-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }
  });
}

function syncThemeButton() {
  const light = document.documentElement.dataset.theme === 'light';
  const label = light ? 'Switch to dark mode' : 'Switch to light mode';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
  themeToggle.setAttribute('aria-pressed', String(light));
  document.querySelector('meta[name="theme-color"]').content = light ? '#ffffff' : '#1c1c1d';
}

if (themeToggle) {
  syncThemeButton();
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('lnk-theme', next); } catch (_) {}
    syncThemeButton();
  });
}
