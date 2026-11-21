/**
 * JobFinder - Main Global Script
 * Manages common navigation, mobile menu, toast notifications,
 * badge synchronization, and shared utilities.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initStorageBadges();
  initHeroSearch();
  initNewsletterForm();
});

/* ========================================================
   NAVIGATION & ACTIVE STATES
   ======================================================== */
function initNavbar() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav-active");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      mobileToggle.classList.toggle("is-active", isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove("nav-active");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("is-active");
      }
    });
  }

  // Highlight active link
  highlightActiveNavLink();
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href")?.toLowerCase();
    if (!href) return;

    // Check if matches or if at root index
    if (
      (currentPath.endsWith(href) && href !== "#") ||
      ((currentPath.endsWith("/") || currentPath.endsWith("index.html") || currentPath === "") && (href === "index.html" || href === "./index.html" || href === "./"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ========================================================
   BADGE SYNCHRONIZATION
   ======================================================== */
function initStorageBadges() {
  updateBadgeCounts();

  // Listen to storage update events
  window.addEventListener("jobfinder_storage_change", () => {
    updateBadgeCounts();
  });

  // Also listen to storage events across tabs
  window.addEventListener("storage", () => {
    updateBadgeCounts();
  });
}

function updateBadgeCounts() {
  const savedCount = Storage.getSavedJobs().length;
  const appliedCount = Storage.getApplications().length;

  const savedBadges = document.querySelectorAll(".badge-saved-count");
  savedBadges.forEach(badge => {
    badge.textContent = savedCount;
    badge.style.display = savedCount > 0 ? "inline-flex" : "none";
  });

  const appliedBadges = document.querySelectorAll(".badge-applied-count");
  appliedBadges.forEach(badge => {
    badge.textContent = appliedCount;
    badge.style.display = appliedCount > 0 ? "inline-flex" : "none";
  });
}

/* ========================================================
   GLOBAL SEARCH REDIRECT
   ======================================================== */
function initHeroSearch() {
  const searchForms = document.querySelectorAll(".job-search-form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const keywordInput = form.querySelector("input[name='keyword']");
      const locationInput = form.querySelector("input[name='location']");

      const keyword = keywordInput ? keywordInput.value.trim() : "";
      const location = locationInput ? locationInput.value.trim() : "";

      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (location) params.set("location", location);

      window.location.href = `jobs.html?${params.toString()}`;
    });
  });
}

/* ========================================================
   TOAST NOTIFICATION SYSTEM
   ======================================================== */
function showToast(message, type = "info", duration = 3500) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;

  const iconSvg = getToastIcon(type);

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <div class="toast-message">${escapeHTML(message)}</div>
    <button class="toast-close" aria-label="Close Notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add("toast-show");
  });

  const closeBtn = toast.querySelector(".toast-close");
  const removeToast = () => {
    toast.classList.remove("toast-show");
    toast.classList.add("toast-hide");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };

  closeBtn.addEventListener("click", removeToast);

  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
}

function getToastIcon(type) {
  switch (type) {
    case "success":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    case "warning":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    case "error":
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    default:
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
}

/* ========================================================
   SHARED HELPER FUNCTIONS
   ======================================================== */
function formatSalary(salary) {
  if (!salary) return "Competitive Salary";
  const minK = Math.round(salary.min / 1000);
  const maxK = Math.round(salary.max / 1000);
  return `${salary.currency}${minK}K - ${salary.currency}${maxK}K a ${salary.period}`;
}

function formatPostedDays(days) {
  if (days === 0) return "Just posted";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast("Thanks for subscribing to job alerts!", "success");
        input.value = "";
      }
    });
  }
}
