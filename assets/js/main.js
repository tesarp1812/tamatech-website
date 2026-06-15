document.addEventListener("click", (event) => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const target = event.target instanceof Element ? event.target : null;

  if (!toggle || !menu || !target) return;

  if (target.closest("#menu-toggle")) {
    const isOpen = !menu.classList.contains("hidden");

    menu.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");

    return;
  }

  if (target.closest(".nav-link") && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }
});
