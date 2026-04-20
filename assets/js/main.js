(() => {
  document.documentElement.setAttribute("data-js", "true");

  const setCurrentYear = () => {
    const yearNodes = document.querySelectorAll("[data-year]");
    const year = String(new Date().getFullYear());
    yearNodes.forEach((node) => {
      node.textContent = year;
    });
  };

  const setupHeaderElevation = () => {
    const header = document.querySelector("[data-elevate-on-scroll]");
    if (!header) return;

    const update = () => {
      const elevated = window.scrollY > 8;
      header.classList.toggle("is-elevated", elevated);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const setupMobileNav = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#primary-nav");
    if (!toggle || !nav) return;

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) close();
      else open();
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName.toLowerCase() !== "a") return;
      close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (nav.contains(target) || toggle.contains(target)) return;
      close();
    });
  };

  const setupHeroCarousel = () => {
    const currentImage = document.querySelector("[data-hero-carousel-current]");
    const nextImage = document.querySelector("[data-hero-carousel-next]");
    if (!(currentImage instanceof HTMLImageElement)) return;
    if (!(nextImage instanceof HTMLImageElement)) return;

    const basePath = "assets/img/attr/crsl/";
    const files = [
      "Hols 2008 001.jpg",
      "IMG_4059.jpeg",
      "IMG_8316 (2).JPG",
      "IMG_8699 (2).jpeg",
      "SOPA.JPG",
      "gasflux installed .JPEG",
      "summa.JPG",
    ];

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const toUrl = (fileName) => `${basePath}${encodeURIComponent(fileName)}`;

    const shuffle = (items) => {
      const arr = items.slice();
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const altText = "Project and field work imagery";
    let queue = shuffle(files);
    let currentUrl = currentImage.currentSrc || currentImage.getAttribute("src") || "";
    let timerId = null;
    let isTransitioning = false;

    let currentEl = currentImage;
    let nextEl = nextImage;

    currentEl.classList.add("is-active");
    currentEl.alt = altText;
    nextEl.alt = "";

    const nextFile = () => {
      if (queue.length === 0) queue = shuffle(files);
      if (queue.length > 1 && toUrl(queue[0]) === currentUrl) {
        const [first, second] = [queue[0], queue[1]];
        queue[0] = second;
        queue[1] = first;
      }
      return queue.shift();
    };

    const setImage = (fileName) => {
      if (isTransitioning) return;
      isTransitioning = true;

      const url = toUrl(fileName);
      const preloader = new Image();
      preloader.decoding = "async";
      preloader.onload = () => {
        nextEl.src = url;
        nextEl.classList.add("is-active");
        currentEl.classList.remove("is-active");

        window.setTimeout(() => {
          const previous = currentEl;
          currentEl = nextEl;
          nextEl = previous;
          currentEl.alt = altText;
          nextEl.alt = "";
          currentUrl = url;
          isTransitioning = false;
        }, 650);
      };
      preloader.src = url;
    };

    const tick = () => {
      setImage(nextFile());
    };

    const start = () => {
      if (timerId !== null) return;
      timerId = window.setInterval(tick, 3000);
    };

    const stop = () => {
      if (timerId === null) return;
      window.clearInterval(timerId);
      timerId = null;
    };

    setImage(nextFile());
    if (!reduceMotion) start();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !reduceMotion) start();
      else stop();
    });
  };

  const setupContactFormStatus = () => {
    const form = document.querySelector("[data-contact-form]");
    if (!(form instanceof HTMLFormElement)) return;

    const status = form.querySelector("[data-form-status]");
    if (!(status instanceof HTMLElement)) return;

    const setStatus = (message) => {
      status.textContent = message;
    };

    form.addEventListener("submit", () => {
      setStatus("Sending...");
    });

    form.addEventListener("reset", () => {
      setStatus("");
    });
  };

  setCurrentYear();
  setupHeaderElevation();
  setupMobileNav();
  setupHeroCarousel();
  setupContactFormStatus();
})();
