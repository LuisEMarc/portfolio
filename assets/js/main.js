// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", init);

async function init() {
  initActiveNavigation();
  initNavigationModal();
  initTheme();
  initThemeToggle();
  initCvModal();
  getBrowserLanguage();
  initLanguage();
  initLanguageToggle();
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

// ======================
// CV DOWNLOAD MODAL
// ======================

function initCvModal() {
  const button = document.getElementById("cvModalButton");
  const modalElement = document.getElementById("cvModal");
  if (!button || !modalElement) return;
  const cvModal = new bootstrap.Modal(modalElement);
  button.addEventListener("click", (e) => {
    e.preventDefault();
    cvModal.show();
  });
}

// ======================
// TRADUCCIONES
// ======================

const translations = {
  es: {
    hero_role: "Java Backend Developer",
    hero_highlight:
      "+5 años desarrollando soluciones empresariales y APIs REST",
    hero_description:
      "Desarrollador especializado en Java, APIs REST y soluciones empresariales, enfocado en construir software mantenible y escalable.",
    about_me: "Sobre mí",
    developing: "Desarrollo",
    developing_paragraph:
      "Soy desarrollador de software con experiencia en soluciones empresariales y desarrollo de APIs.",
    learning: "Aprendizage",
    learning_paragraph:
      "He participando en iniciativas que impactan a millones de clientes. Disfruto construir proyectos personales que me permiten aprender nuevas tecnologías y mejorar constantemente mis habilidades.",
    interesting: "Intereses",
    interesting_paragraph:
      "Fuera del desarrollo me interesan los videojuegos, la tecnología, los cubos de Rubik y el entrenamiento físico.",
    education: "Educación",
    educational_place: "Instituto Tecnológico de Tlalnepantla",
    educational_level:
      "Ingeniería en Tecnologías de la Información y Comunicación",
    education_description:
      " Formación enfocada en desarrollo de software, bases de datos, redes y tecnologías de la información.",
    education_tag_1: "Bases de Datos",
    education_tag_2: "Redes",
    education_tag_3: "TIC",
    education_languages: "Idiomas",
    language_badge: "Inglés Intermedio (B1/B2)",
    courses_and_certifications: "Cursos y Certificaciones",
    course_title: "Diplomado en Gestión de la Ciberseguridad",
    course_place: "National University of Engineering",
    skills: "Habilidades",
    languages_and_technologies: "Lenguajes y Tecnologías",
    database: "Bases de Datos",
    tools: "Herramientas",
    methodologies: "Metodologías",
    ci_cd_quality: "CI/CD y Calidad",
    projects: "Mis proyectos",
    project_description_1:
      "Guía interactiva para Fallout 4 con información de bobbleheads, compañeros y comandos útiles.",
    project_description_2:
      "Explorador de razas felinas consumiendo The Cat API con paginación, modals y modo oscuro.",
    professional_experience: "Experiencia Profesional",
    experience_list_1_1:
      "Lideré el desarrollo de una plataforma para gestión hotelera.",
    experience_list_1_2: "Desarrollo Backend utilizando patrón MVC.",
    experience_list_1_3: "Integración y consumo de APIs.",
    experience_list_1_4: "Desarrollo Frontend con HTML y CSS.",
    experience_list_1_5: "Diseño de bases de datos MySQL y Stored Procedures.",
    experience_list_2_1:
      "Participación en el desarrollo de dos ofertas para banca PyME.",
    experience_list_2_2: "Desarrollo backend en Java Legacy.",
    experience_list_2_3:
      "Despliegue exitoso de ambas iniciativas a producción.",
    experience_list_2_4: "Soluciones que impactaron a más",
    experience_list_2_5:
      "Implementación de incrementos de línea de crédito y planes de pago fijos.",
    experience_list_2_badge: "de 1 millon de clientes PyME",
    thanks_for: "Gracias por visitar mi portfolio.",
    are_you_interested:
      "¿Te interesa colaborar o conocer más sobre mi experiencia?",
    built_with: "Hecho con",
    see_the_code: "Ver código fuente",
    contact: "Contacto",
    download_resume: "Descargar CV",
    english: "Inglés",
    spanish: "Español",
  },

  en: {
    hero_role: "Java Backend Developer",
    hero_highlight: "+5 years developing enterprise solutions and API RESTs",
    hero_description:
      "Java specialiced developer, API RESTs and enterprise solutions, focused on building mantainble and scalable software.",
    about_me: "About Me",
    developing: "Development",
    developing_paragraph:
      "I'm a software developer with experience in enterprise solutions and API development.",
    learning: "Learning",
    learning_paragraph:
      "I've participated in iniciatives that impacted milions of clients. I enjoy building personal projects that allows me to learn new programming languages and improve constantly my skills.",
    interesting: "Interests",
    interesting_paragraph:
      "Out of the job i like videogames, technology, Rubiks cubes and workout.",
    education: "Education",
    educational_place: "Tlalnepantla Technologic Institute",
    educational_level:
      "Information and Communication Technologies Engineering.",
    education_description:
      "Formation focused in software development, database, networking and information technologies.",
    education_tag_1: "Database",
    education_tag_2: "Networking",
    education_tag_3: "Information Technologies",
    education_languages: "Languages",
    language_badge: "Intermediate English (B1/B2)",
    courses_and_certifications: "Courses and Certifications",
    course_title: "Diploma in cybersecurity management",
    course_place: "Universidad Nacional de Ingeniería",
    skills: "Skills",
    languages_and_technologies: "Languages and Technologies",
    database: "Databases",
    tools: "Tools",
    methodologies: "Methodologies",
    ci_cd_quality: "CI/CD and Quality",
    projects: "My projects",
    project_description_1:
      "Interactive guide for Fallout 4 with boobleheads information, companions and useful commands.",
    project_description_2:
      "Cat breeds explorer consuming The Cat API with pagination, modals usages and obscure mode.",
    professional_experience: "Professional Experience",
    experience_list_1_1:
      "I lead up the development of a hotel management platform.",
    experience_list_1_2: "Backend development using MVC pattern.",
    experience_list_1_3: "Consumption and integration of API.",
    experience_list_1_4: "Frontend development with HTML and CSS.",
    experience_list_1_5: "Databases and Stored Procedures designing.",
    experience_list_2_1:
      "I participated in the development of two offers for the SME banking platform.",
    experience_list_2_2: "Backend development in Java",
    experience_list_2_3: "Successful deploy of both products in production.",
    experience_list_2_4: "Solutions that impacted more than",
    experience_list_2_5:
      "Implementation of credit line increases and fixed payment plans.",
    experience_list_2_badge: "a million SMEs clients.",
    thanks_for: "Thanks for visiting my portfolio.",
    are_you_interested:
      "Are you interested in colaborate with me or knowing more about me or my experience?",
    built_with: "Built with",
    see_the_code: "Check source code",
    contact: "Contact",
    download_resume: "Download Resume",
    english: "English",
    spanish: "Spanish",
  },
};

function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  updateNavigationTooltips(lang);
}

const LANGUAGE_KEY = "portfolio-language";

function initLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  const language = savedLanguage || "es";
  changeLanguage(language);
}

function initLanguageToggle() {
  const toggle = document.getElementById("languageToggle");
  if (!toggle) return;
  const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "es";
  updateLanguageButton(currentLanguage);
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "es";
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    changeLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
    updateLanguageButton(newLanguage);
  });
}

function updateLanguageButton(language) {
  const toggle = document.getElementById("languageToggle");
  if (!toggle) return;
  toggle.dataset.tooltip = language === "es" ? "Inglés" : "Spanish";
  toggle.innerHTML =
    language === "es"
      ? '<span class="fi fi-us"></span>'
      : '<span class="fi fi-mx"></span>';
}

function getBrowserLanguage() {
  return navigator.language.startsWith("es") ? "es" : "en";
}

function updateNavigationTooltips(lang) {
  const tooltips = {
    es: {
      hero: "Inicio",
      about: "Sobre mí",
      education: "Educación",
      skills: "Habilidades",
      projects: "Mis proyectos",
      experience: "Experiancia profesional",
      contact: "Contacto",
      theme: "Tema",
    },

    en: {
      hero: "Home",
      about: "About me",
      education: "Education",
      skills: "Skills",
      projects: "My projects",
      experience: "Professional experience",
      contact: "Contact",
      theme: "Theme",
    },
  };

  document
    .querySelector('a[href="#hero"]')
    ?.setAttribute("data-tooltip", tooltips[lang].hero);

  document
    .querySelector('a[href="#about"]')
    ?.setAttribute("data-tooltip", tooltips[lang].about);

  document
    .querySelector('a[href="#education"]')
    ?.setAttribute("data-tooltip", tooltips[lang].education);

  document
    .querySelector('a[href="#skills"]')
    ?.setAttribute("data-tooltip", tooltips[lang].skills);

  document
    .querySelector('a[href="#projects"]')
    ?.setAttribute("data-tooltip", tooltips[lang].projects);

  document
    .querySelector('a[href="#experience"]')
    ?.setAttribute("data-tooltip", tooltips[lang].experience);

  document
    .querySelector('a[href="#contact"]')
    ?.setAttribute("data-tooltip", tooltips[lang].contact);

  document
    .querySelector('a[id="themeToggle"]')
    ?.setAttribute("data-tooltip", tooltips[lang].theme);
}
