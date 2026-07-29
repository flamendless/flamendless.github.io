(() => {
  const projectsSection = document.querySelector(".projects");
  if (!projectsSection) return;

  const animatedCards = projectsSection.querySelectorAll("[data-animate]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    animatedCards.forEach((card) => observer.observe(card));
  } else {
    animatedCards.forEach((card) => card.classList.add("is-visible"));
  }
})();
