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
  setupContactFormStatus();
})();
