// ======================
// CONFIG
// ======================

// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", init);

async function init() {
  initActiveNavigation();
  initNavigationModal();
}

// ======================
// THEME
// ======================

// ======================
// ACTIVE NAVIGATION
// ======================

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );

        activeLink?.classList.add("active");
      });
    },
    {
      threshold: 0.4,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// ======================
// MOBILE NAVIGATION MODAL
// ======================

function initNavigationModal() {
  const navToggle = document.getElementById("navToggle");

  const modalElement = document.getElementById("navigationModal");

  if (!navToggle || !modalElement) return;

  const navigationModal = new bootstrap.Modal(modalElement);

  navToggle.addEventListener("click", () => {
    navigationModal.show();
  });

  document.querySelectorAll(".modal-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navigationModal.hide();
    });
  });
}
