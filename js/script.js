const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }
});
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}
const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});
const copyEmailButton = document.querySelector("#copy-email");

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const emailAddress = "sudarshanmk175@gmail.com";

        try {
            await navigator.clipboard.writeText(emailAddress);

            copyEmailButton.textContent = "Copied!";

            setTimeout(() => {
                copyEmailButton.textContent = "Copy";
            }, 2000);
        } catch (error) {
            copyEmailButton.textContent = "Copy failed";
            console.error("Could not copy email:", error);
        }
    });
}
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }
});
document.addEventListener("click", (event) => {
    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }
});