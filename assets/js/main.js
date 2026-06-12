// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", init);

async function init() {
  initActiveNavigation();
  initNavigationModal();
  initTheme();
  initThemeToggle();
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
  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${theme}-mode`);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  icon.className =
    theme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const theme = savedTheme || getAutomaticTheme();
  applyTheme(theme);
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
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
