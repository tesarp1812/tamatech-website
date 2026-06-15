const sectionBase = new URL("../../sections/", document.currentScript.src).href;

const pageSections = {
  index: [
    ["header-section", "header.html"],
    ["hero-section", "hero.html"],
    ["about-section", "about.html"],
    ["expertise-section", "expertise.html"],
    ["portfolio-section", "portfolio.html"],
    ["tech-section", "tech-stack.html"],
    ["contact-section", "contact.html"],
    ["footer-section", "footer.html"]
  ],
  about: [
    ["header-section", "header.html"],
    ["about-section", "about.html"],
    ["experience-section", "experience.html"],
    ["expertise-section", "expertise.html"],
    ["tech-stack-section", "tech-stack.html"],
    ["portfolio-section", "portfolio.html"],
    ["contact-section", "contact.html"],
    ["footer-section", "footer.html"]
  ],
  products: [
    ["header-section", "header.html"],
    ["products-hero-section", "products/hero.html"],
    ["product-catalog-section", "products/catalog.html"],
    ["products-cta-section", "products/cta.html"],
    ["footer-section", "footer.html"]
  ],
  "ps-billing": [
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
  "digital-invitation": [
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
  contact: [
    ["header-section", "header.html"],
    ["contact-intro-section", "contact/intro.html"],
    ["contact-methods-section", "contact/methods.html"],
    ["contact-cta-section", "contact/cta.html"],
    ["footer-section", "footer.html"]
  ]
};

const pathPageMap = {
  "/": "index",
  "/index.html": "index",
  "/index": "index",
  "/about.html": "about",
  "/about/": "about",
  "/about": "about",
  "/about/index.html": "about",
  "/about/index": "about",
  "/products.html": "products",
  "/products/": "products",
  "/products": "products",
  "/products/index.html": "products",
  "/products/index": "products",
  "/ps-billing.html": "ps-billing",
  "/ps-billing/": "ps-billing",
  "/ps-billing": "ps-billing",
  "/products/ps-billing.html": "ps-billing",
  "/products/ps-billing/": "ps-billing",
  "/products/ps-billing": "ps-billing",
  "/products/ps-billing/index.html": "ps-billing",
  "/products/ps-billing/index": "ps-billing",
  "/digital-invitation.html": "digital-invitation",
  "/digital-invitation/": "digital-invitation",
  "/digital-invitation": "digital-invitation",
  "/products/digital-invitation.html": "digital-invitation",
  "/products/digital-invitation/": "digital-invitation",
  "/products/digital-invitation": "digital-invitation",
  "/products/digital-invitation/index.html": "digital-invitation",
  "/products/digital-invitation/index": "digital-invitation",
  "/contact.html": "contact",
  "/contact/": "contact",
  "/contact": "contact",
  "/contact/index.html": "contact",
  "/contact/index": "contact"
};

function normalizePath(path) {
  const cleanPath = path.split("?")[0].split("#")[0];

  return cleanPath || "/";
}

function normalizeHref(href) {
  return href || "/";
}

function getPathPageType(path) {
  const normalizedPath = normalizePath(path);

  return pathPageMap[normalizedPath] || "index";
}

function getPageType() {
  const bodyPage = document.body && document.body.dataset.page;

  if (bodyPage && pageSections[bodyPage]) {
    return bodyPage;
  }

  return getPathPageType(window.location.pathname);
}

async function loadSection(id, file) {
  const target = document.getElementById(id);

  if (!target) {
    console.warn(
      "[SKIP]",
      id,
      file,
      "target not found"
    );
    return;
  }

  console.log(
    "[LOAD]",
    id,
    file
  );

  const response = await fetch(`${sectionBase}${file}`);

  if (!response.ok) {
    console.error(
      "[ERROR]",
      file,
      response.status
    );
    return;
  }

  const html = await response.text();

  target.innerHTML = html;

  console.log(
    "[SUCCESS]",
    file
  );
}

async function loadAllSections() {
  const pageType = getPageType();
  const currentPage = pageSections[pageType] || pageSections.index;

  try {
    await Promise.all(currentPage.map(([id, file]) => loadSection(id, file)));
    initActiveNavigation();
  } catch (error) {
    console.error("Failed to load page sections", error);
  }
}

function initActiveNavigation() {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const currentPageType = getPageType();

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    const href = normalizeHref(link.getAttribute("href"));
    const isActive = getPathPageType(href) === currentPageType;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

loadAllSections();
