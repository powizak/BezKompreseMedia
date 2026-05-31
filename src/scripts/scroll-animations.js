// Scroll reveal animations using Intersection Observer
// Adds .visible class to .scroll-reveal elements when they enter viewport

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = document.querySelectorAll('.scroll-reveal');

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  function makeHandler(obs) {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Number(delay));
          obs.unobserve(entry.target);
        }
      });
    };
  }

  // Group elements by threshold to minimize IntersectionObserver instances
  const groups = new Map();
  elements.forEach((el) => {
    const key = el.dataset.threshold || '0.15';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  });

  for (const [threshold, els] of groups) {
    const observer = new IntersectionObserver(makeHandler(observer), {
      threshold: Number(threshold),
      rootMargin: '0px 0px -50px 0px',
    });
    els.forEach((el) => observer.observe(el));
  }
})();
