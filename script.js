/* ============================================================
   MOTIVAPPTE — script.js
   ============================================================ */

/* ── Mobile menu ── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openMenu() {
  mobileMenu.classList.add("open");
  mobileMenuOverlay.classList.add("visible");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  mobileMenuClose.focus();
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  mobileMenuOverlay.classList.remove("visible");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  hamburger.focus();
}

if (hamburger) hamburger.addEventListener("click", openMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
    closeMenu();
  }
});

/* ── Header scroll state ── */
const siteHeader = document.getElementById("site-header");

function handleHeaderScroll() {
  if (!siteHeader) return;
  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* ── Smooth scroll (respects sticky header height) ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 76;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
});

/* ── Scroll reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}
