document.addEventListener("click", (event) => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const target = event.target instanceof Element ? event.target : null;

  if (!toggle || !menu || !target) return;

  if (target.closest(".nav-dropdown-toggle")) {
    const btn = target.closest(".nav-dropdown-toggle");
    const dropdownMenu = btn.nextElementSibling;
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".nav-dropdown-menu.is-open").forEach((m) => {
      m.classList.remove("is-open");
      m.previousElementSibling.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      dropdownMenu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
    return;
  }

  if (target.closest(".mobile-dropdown-toggle")) {
    const btn = target.closest(".mobile-dropdown-toggle");
    const dropdownMenu = btn.nextElementSibling;
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    dropdownMenu.classList.toggle("hidden", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
    return;
  }

  document.querySelectorAll(".nav-dropdown-menu.is-open").forEach((m) => {
    m.classList.remove("is-open");
    m.previousElementSibling.setAttribute("aria-expanded", "false");
  });

  if (target.closest("#menu-toggle")) {
    const isOpen = !menu.classList.contains("hidden");

    menu.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Buka menu navigasi" : "Tutup menu navigasi");

    return;
  }

  if (target.closest(".nav-link") && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu navigasi");
  }
});
