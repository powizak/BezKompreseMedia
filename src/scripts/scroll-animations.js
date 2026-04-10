// Scroll reveal animations using Intersection Observer
// Adds .visible class to .scroll-reveal elements when they enter viewport

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = document.querySelectorAll('.scroll-reveal');

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => {
    const customThreshold = el.dataset.threshold;
    if (customThreshold) {
      // Create a separate observer for custom thresholds if needed
      const customObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.delay || 0;
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, Number(delay));
              customObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: Number(customThreshold), rootMargin: '0px 0px -50px 0px' }
      );
      customObserver.observe(el);
    } else {
      observer.observe(el);
    }
  });
})();
