(() => {
  const aboutPage = document.querySelector(".about-page");
  if (!aboutPage) return;

  const animatedElements = aboutPage.querySelectorAll("[data-animate]");
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
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  }
})();
