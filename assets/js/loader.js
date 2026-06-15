const sectionBase = new URL("../../sections/", document.currentScript.src).href;

const pageSections = {
  "/": [
    ["header-section", "header.html"],
    ["hero-section", "hero.html"],
    ["about-section", "about.html"],
    ["expertise-section", "expertise.html"],
    ["portfolio-section", "portfolio.html"],
    ["tech-section", "tech-stack.html"],
    ["contact-section", "contact.html"],
    ["footer-section", "footer.html"]
  ],
  "/about.html": [
    ["header-section", "header.html"],
    ["about-section", "about.html"],
    ["experience-section", "experience.html"],
    ["expertise-section", "expertise.html"],
    ["tech-stack-section", "tech-stack.html"],
    ["portfolio-section", "portfolio.html"],
    ["contact-section", "contact.html"],
    ["footer-section", "footer.html"]
  ],
  "/about/": [
    ["header-section", "header.html"],
    ["about-section", "about.html"],
    ["experience-section", "experience.html"],
    ["expertise-section", "expertise.html"],
    ["tech-stack-section", "tech-stack.html"],
    ["portfolio-section", "portfolio.html"],
    ["contact-section", "contact.html"],
    ["footer-section", "footer.html"]
  ],
  "/products.html": [
    ["header-section", "header.html"],
    ["products-hero-section", "products/hero.html"],
    ["product-catalog-section", "products/catalog.html"],
    ["products-cta-section", "products/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/products/": [
    ["header-section", "header.html"],
    ["products-hero-section", "products/hero.html"],
    ["product-catalog-section", "products/catalog.html"],
    ["products-cta-section", "products/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/ps-billing.html": [
    ["header-section", "header.html"],
    ["ps-billing-overview-section", "products/ps-billing/overview.html"],
    ["ps-billing-features-section", "products/ps-billing/features.html"],
    ["ps-billing-screenshots-section", "products/ps-billing/screenshots.html"],
    ["ps-billing-benefits-section", "products/ps-billing/benefits.html"],
    ["ps-billing-pricing-section", "products/ps-billing/pricing.html"],
    ["ps-billing-faq-section", "products/ps-billing/faq.html"],
    ["ps-billing-cta-section", "products/ps-billing/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/products/ps-billing/": [
    ["header-section", "header.html"],
    ["ps-billing-overview-section", "products/ps-billing/overview.html"],
    ["ps-billing-features-section", "products/ps-billing/features.html"],
    ["ps-billing-screenshots-section", "products/ps-billing/screenshots.html"],
    ["ps-billing-benefits-section", "products/ps-billing/benefits.html"],
    ["ps-billing-pricing-section", "products/ps-billing/pricing.html"],
    ["ps-billing-faq-section", "products/ps-billing/faq.html"],
    ["ps-billing-cta-section", "products/ps-billing/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/digital-invitation.html": [
    ["header-section", "header.html"],
    ["invitation-overview-section", "products/digital-invitation/overview.html"],
    ["invitation-features-section", "products/digital-invitation/features.html"],
    ["invitation-demo-section", "products/digital-invitation/demo.html"],
    ["invitation-themes-section", "products/digital-invitation/themes.html"],
    ["invitation-pricing-section", "products/digital-invitation/pricing.html"],
    ["invitation-faq-section", "products/digital-invitation/faq.html"],
    ["invitation-cta-section", "products/digital-invitation/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/products/digital-invitation/": [
    ["header-section", "header.html"],
    ["invitation-overview-section", "products/digital-invitation/overview.html"],
    ["invitation-features-section", "products/digital-invitation/features.html"],
    ["invitation-demo-section", "products/digital-invitation/demo.html"],
    ["invitation-themes-section", "products/digital-invitation/themes.html"],
    ["invitation-pricing-section", "products/digital-invitation/pricing.html"],
    ["invitation-faq-section", "products/digital-invitation/faq.html"],
    ["invitation-cta-section", "products/digital-invitation/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/contact.html": [
    ["header-section", "header.html"],
    ["contact-intro-section", "contact/intro.html"],
    ["contact-methods-section", "contact/methods.html"],
    ["contact-cta-section", "contact/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "/contact/": [
    ["header-section", "header.html"],
    ["contact-intro-section", "contact/intro.html"],
    ["contact-methods-section", "contact/methods.html"],
    ["contact-cta-section", "contact/cta.html"],
    ["footer-section", "footer.html"]
  ]
};

async function loadSection(id, file) {
  console.log(
    "[LOAD]",
    id,
    file
  );

  const response = await fetch(`${sectionBase}${file}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status}`);
  }

  console.log(
    "[SUCCESS]",
    file
  );

  const html = await response.text();
  const target = document.getElementById(id);

  if (!target) {
    console.error(
      "[MISSING TARGET]",
      id
    );
    throw new Error(`Missing page target #${id} for ${file}`);
  }

  target.innerHTML = html;
}

function normalizePath(path) {
  const cleanPath = path.split("?")[0].split("#")[0];

  return cleanPath || "/";
}

function normalizeHref(href) {
  return href || "/";
}

async function loadAllSections() {
  const currentPage = pageSections[normalizePath(window.location.pathname)] || pageSections["/"];

  try {
    await Promise.all(currentPage.map(([id, file]) => loadSection(id, file)));
    initActiveNavigation();
  } catch (error) {
    console.error("Failed to load page sections", error);
  }
}

function initActiveNavigation() {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const currentPath = normalizePath(window.location.pathname);

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    const href = normalizeHref(link.getAttribute("href"));
    const isActive = currentPath === href;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

loadAllSections();
