const menuToggle = document.querySelector("[data-menu-toggle]");
const siteMenu = document.querySelector("[data-site-menu]");

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll(".reveal");

if (!prefersReducedMotion.matches && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");

if (testimonialCarousel) {
  const viewport = testimonialCarousel.querySelector("[data-testimonial-viewport]");
  const track = testimonialCarousel.querySelector("[data-testimonial-track]");
  const originalSlides = Array.from(track.querySelectorAll("[data-testimonial-slide]"));
  const prevButton = testimonialCarousel.querySelector("[data-testimonial-prev]");
  const nextButton = testimonialCarousel.querySelector("[data-testimonial-next]");
  const interval = Number(testimonialCarousel.getAttribute("data-interval")) || 7000;
  const reducedMotion = prefersReducedMotion.matches;
  let currentIndex = 1;
  let autoplayId = null;
  let isJumping = false;

  if (viewport && track && originalSlides.length > 1) {
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    firstClone.setAttribute("data-clone", "true");
    lastClone.setAttribute("data-clone", "true");
    track.insertBefore(lastClone, originalSlides[0]);
    track.append(firstClone);

    const slides = Array.from(track.children);

    const setActiveSlide = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === currentIndex);
      });
    };

    const offsetForSlide = (index) => {
      const slide = slides[index];
      if (!slide) {
        return 0;
      }

      return slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    };

    const moveToIndex = (index, animate = true) => {
      track.style.transition = animate && !reducedMotion ? "transform 520ms ease" : "none";
      track.style.transform = `translate3d(${-offsetForSlide(index)}px, 0, 0)`;
      currentIndex = index;
      setActiveSlide();
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      if (reducedMotion) {
        return;
      }

      stopAutoplay();
      autoplayId = window.setInterval(() => {
        moveToIndex(currentIndex + 1);
      }, interval);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    moveToIndex(currentIndex, false);

    nextButton?.addEventListener("click", () => {
      if (isJumping) {
        return;
      }

      moveToIndex(currentIndex + 1);
      resetAutoplay();
    });

    prevButton?.addEventListener("click", () => {
      if (isJumping) {
        return;
      }

      moveToIndex(currentIndex - 1);
      resetAutoplay();
    });

    testimonialCarousel.addEventListener("mouseenter", stopAutoplay);
    testimonialCarousel.addEventListener("mouseleave", startAutoplay);
    testimonialCarousel.addEventListener("focusin", stopAutoplay);
    testimonialCarousel.addEventListener("focusout", startAutoplay);

    track.addEventListener("transitionend", () => {
      if (currentIndex === slides.length - 1) {
        isJumping = true;
        moveToIndex(1, false);
        isJumping = false;
      } else if (currentIndex === 0) {
        isJumping = true;
        moveToIndex(slides.length - 2, false);
        isJumping = false;
      }
    });

    window.addEventListener("resize", () => {
      moveToIndex(currentIndex, false);
    });

    startAutoplay();
  }
}

const faqAccordion = document.querySelector("[data-faq-accordion]");

if (faqAccordion) {
  const faqItems = Array.from(faqAccordion.querySelectorAll(".faq-item"));

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");
    const panel = item.querySelector(".faq-item__panel");

    if (!trigger || !panel) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      faqItems.forEach((entry) => {
        const entryTrigger = entry.querySelector(".faq-item__trigger");
        const entryPanel = entry.querySelector(".faq-item__panel");

        if (!entryTrigger || !entryPanel) {
          return;
        }

        entry.classList.remove("is-open");
        entryTrigger.setAttribute("aria-expanded", "false");
        entryPanel.hidden = true;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });
}

const serviceAccordion = document.querySelector("[data-service-accordion]");

if (serviceAccordion) {
  const serviceItems = Array.from(serviceAccordion.querySelectorAll(".service-option"));

  const closeItem = (item) => {
    const trigger = item.querySelector("[data-service-trigger]");
    const panel = item.querySelector("[data-service-panel]");

    if (!trigger || !panel || !item.classList.contains("is-open")) {
      return;
    }

    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");

    const handleTransitionEnd = (event) => {
      if (event.target !== panel) {
        return;
      }

      panel.hidden = true;
      panel.removeEventListener("transitionend", handleTransitionEnd);
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
  };

  const openItem = (item) => {
    const trigger = item.querySelector("[data-service-trigger]");
    const panel = item.querySelector("[data-service-panel]");

    if (!trigger || !panel) {
      return;
    }

    panel.hidden = false;

    window.requestAnimationFrame(() => {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    });
  };

  serviceItems.forEach((item) => {
    const trigger = item.querySelector("[data-service-trigger]");

    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      serviceItems.forEach((entry) => {
        if (entry !== item) {
          closeItem(entry);
        }
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
}
