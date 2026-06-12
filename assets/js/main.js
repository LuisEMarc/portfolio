// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", init);

async function init() {
  initActiveNavigation();
  initNavigationModal();
  initTheme();
}

// ======================
// THEME
// ======================

const THEME_KEY = "portfolio-theme";

function getAutomaticTheme() {
  const hour = new Date().getHours();

  return hour >= 9 && hour < 19 ? "light" : "dark";
}

function applyTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");

  document.body.classList.toggle("dark-mode", theme === "dark");
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    applyTheme(savedTheme);

    return;
  }

  applyTheme(getAutomaticTheme());
}

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

  const icon = navToggle.querySelector("i");
  const navigationModal = new bootstrap.Modal(modalElement);

  navToggle.addEventListener("click", () => {
    const isOpen = modalElement.classList.contains("show");

    if (isOpen) {
      navigationModal.hide();
    } else {
      navigationModal.show();
    }
  });

  modalElement.addEventListener("shown.bs.modal", () => {
    icon.className = "bi bi-x-lg";
    navToggle.classList.add("active");
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    icon.className = "bi bi-list";
    navToggle.classList.remove("active");
  });

  document.querySelectorAll(".modal-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navigationModal.hide();
    });
  });
}
