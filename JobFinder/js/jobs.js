/**
 * JobFinder - Jobs Search & Filter Page Script
 * Manages search queries, multi-criteria filtering, sorting,
 * dynamic card rendering, and save interactions.
 */

let currentJobs = [...SAMPLE_JOBS];
let activeFilters = {
  keyword: "",
  location: "",
  categories: [],
  experience: [],
  minSalary: 0,
  jobTypes: [],
  workModes: [],
  sortBy: "newest"
};

document.addEventListener("DOMContentLoaded", () => {
  parseUrlParams();
  bindFilterEvents();
  bindSearchEvents();
  bindSortEvents();
  bindMobileFilterDrawer();
  applyFiltersAndRender();

  // Listen to storage changes to update card save states in real time
  window.addEventListener("jobfinder_storage_change", (e) => {
    if (e.detail?.type === "saved_jobs") {
      updateSaveButtonsState();
    }
  });
});

/* ========================================================
   PARSE URL PARAMETERS
   ======================================================== */
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");
  const location = urlParams.get("location");
  const category = urlParams.get("category");
  const type = urlParams.get("type");

  if (keyword) {
    activeFilters.keyword = keyword.trim();
    const kwInput = document.getElementById("searchKeyword");
    if (kwInput) kwInput.value = keyword;
  }

  if (location) {
    activeFilters.location = location.trim();
    const locInput = document.getElementById("searchLocation");
    if (locInput) locInput.value = location;
  }

  if (category) {
    activeFilters.categories.push(category);
    const cb = document.querySelector(`input[name="category"][value="${category}"]`);
    if (cb) cb.checked = true;
  }

  if (type) {
    activeFilters.jobTypes.push(type);
    const cb = document.querySelector(`input[name="jobType"][value="${type}"]`);
    if (cb) cb.checked = true;
  }
}

/* ========================================================
   FILTER EVENT BINDINGS
   ======================================================== */
function bindFilterEvents() {
  // Category checkboxes
  document.querySelectorAll('input[name="category"]').forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.categories = getCheckedValues('input[name="category"]');
      applyFiltersAndRender();
    });
  });

  // Experience checkboxes
  document.querySelectorAll('input[name="experience"]').forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.experience = getCheckedValues('input[name="experience"]');
      applyFiltersAndRender();
    });
  });

  // Job Type checkboxes
  document.querySelectorAll('input[name="jobType"]').forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.jobTypes = getCheckedValues('input[name="jobType"]');
      applyFiltersAndRender();
    });
  });

  // Work Mode checkboxes
  document.querySelectorAll('input[name="workMode"]').forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.workModes = getCheckedValues('input[name="workMode"]');
      applyFiltersAndRender();
    });
  });

  // Salary radios
  document.querySelectorAll('input[name="salaryRange"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      activeFilters.minSalary = parseInt(e.target.value, 10) || 0;
      applyFiltersAndRender();
    });
  });

  // Reset Filters Button
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFilters);
  }
}

function getCheckedValues(selector) {
  return Array.from(document.querySelectorAll(`${selector}:checked`)).map(cb => cb.value);
}

function resetAllFilters() {
  activeFilters = {
    keyword: "",
    location: "",
    categories: [],
    experience: [],
    minSalary: 0,
    jobTypes: [],
    workModes: [],
    sortBy: activeFilters.sortBy
  };

  // Uncheck all filter inputs
  document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
  const allSalaryRadio = document.querySelector('input[name="salaryRange"][value="0"]');
  if (allSalaryRadio) allSalaryRadio.checked = true;

  // Clear search inputs
  const kwInput = document.getElementById("searchKeyword");
  const locInput = document.getElementById("searchLocation");
  if (kwInput) kwInput.value = "";
  if (locInput) locInput.value = "";

  // Update URL
  window.history.replaceState({}, "", window.location.pathname);

  applyFiltersAndRender();
  showToast("Filters have been reset", "info");
}

/* ========================================================
   SEARCH EVENT BINDINGS
   ======================================================== */
function bindSearchEvents() {
  const searchForm = document.getElementById("jobsSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const kw = document.getElementById("searchKeyword")?.value.trim() || "";
      const loc = document.getElementById("searchLocation")?.value.trim() || "";

      activeFilters.keyword = kw;
      activeFilters.location = loc;

      updateUrlParams();
      applyFiltersAndRender();
    });
  }

  // Real-time keyword filter option on typing
  const kwInput = document.getElementById("searchKeyword");
  if (kwInput) {
    let debounceTimer;
    kwInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        activeFilters.keyword = e.target.value.trim();
        applyFiltersAndRender();
      }, 350);
    });
  }
}

function updateUrlParams() {
  const params = new URLSearchParams();
  if (activeFilters.keyword) params.set("keyword", activeFilters.keyword);
  if (activeFilters.location) params.set("location", activeFilters.location);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

/* ========================================================
   SORT EVENT BINDINGS
   ======================================================== */
function bindSortEvents() {
  const sortSelect = document.getElementById("sortJobsSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

/* ========================================================
   MOBILE FILTER DRAWER
   ======================================================== */
function bindMobileFilterDrawer() {
  const filterOpenBtn = document.getElementById("mobileFilterOpen");
  const filterSidebar = document.getElementById("filterSidebar");
  const filterCloseBtn = document.getElementById("mobileFilterClose");

  if (filterOpenBtn && filterSidebar) {
    filterOpenBtn.addEventListener("click", () => {
      filterSidebar.classList.add("filter-drawer-open");
      document.body.classList.add("modal-open");
    });
  }

  if (filterCloseBtn && filterSidebar) {
    filterCloseBtn.addEventListener("click", () => {
      filterSidebar.classList.remove("filter-drawer-open");
      document.body.classList.remove("modal-open");
    });
  }
}

/* ========================================================
   CORE FILTER & SORT LOGIC
   ======================================================== */
function applyFiltersAndRender() {
  let results = SAMPLE_JOBS.filter(job => {
    // 1. Keyword search (Title, Company, Description, Tags)
    if (activeFilters.keyword) {
      const q = activeFilters.keyword.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(q);
      const companyMatch = job.company.toLowerCase().includes(q);
      const descMatch = job.description.toLowerCase().includes(q);
      const tagMatch = job.tags.some(t => t.toLowerCase().includes(q));
      if (!titleMatch && !companyMatch && !descMatch && !tagMatch) return false;
    }

    // 2. Location search (Location string or "remote")
    if (activeFilters.location) {
      const locQ = activeFilters.location.toLowerCase();
      const locMatch = job.location.toLowerCase().includes(locQ);
      const isRemote = job.workMode.toLowerCase() === "remote" && locQ.includes("remote");
      if (!locMatch && !isRemote) return false;
    }

    // 3. Category filter
    if (activeFilters.categories.length > 0) {
      if (!activeFilters.categories.includes(job.category)) return false;
    }

    // 4. Experience level filter
    if (activeFilters.experience.length > 0) {
      if (!activeFilters.experience.includes(job.experienceLevel)) return false;
    }

    // 5. Job Type filter (Full-time, Contract, etc.)
    if (activeFilters.jobTypes.length > 0) {
      if (!activeFilters.jobTypes.includes(job.jobType)) return false;
    }

    // 6. Work Mode filter (Remote, Hybrid, On-site)
    if (activeFilters.workModes.length > 0) {
      if (!activeFilters.workModes.includes(job.workMode)) return false;
    }

    // 7. Salary filter (Min Salary)
    if (activeFilters.minSalary > 0) {
      if (job.salary.max < activeFilters.minSalary) return false;
    }

    return true;
  });

  // Sorting
  results.sort((a, b) => {
    switch (activeFilters.sortBy) {
      case "salary-high":
        return b.salary.max - a.salary.max;
      case "salary-low":
        return a.salary.min - b.salary.min;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return a.postedDaysAgo - b.postedDaysAgo;
    }
  });

  currentJobs = results;
  renderJobResults(results);
  renderActiveFilterTags();
}

/* ========================================================
   RENDER JOB RESULTS & CARDS
   ======================================================== */
function renderJobResults(jobs) {
  const container = document.getElementById("jobResultsContainer");
  const countEl = document.getElementById("totalResultsCount");

  if (countEl) {
    countEl.textContent = jobs.length;
  }

  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-state-title">No matching jobs found</h3>
        <p class="empty-state-desc">Try clearing some of your filters or broadening your search terms to see more opportunities.</p>
        <button type="button" class="btn btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = jobs.map(job => createJobCardHTML(job)).join("");

  // Attach card event listeners
  bindCardActionEvents(container);
}

function createJobCardHTML(job) {
  const isSaved = Storage.isJobSaved(job.id);
  const hasApplied = Storage.hasApplied(job.id);

  const heartIcon = isSaved
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2557a7" stroke="#2557a7" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

  const tagsHTML = job.tags.slice(0, 4).map(t => `<span class="badge-tag">${escapeHTML(t)}</span>`).join("");

  return `
    <article class="job-card" data-job-id="${job.id}">
      <div class="job-card-header">
        <div class="job-company-badge" style="background-color: ${job.logoColor};">
          ${job.companyLogo}
        </div>
        <div class="job-header-info">
          <div class="job-title-row">
            <h3 class="job-title">
              <a href="job-details.html?id=${job.id}" class="job-title-link">${escapeHTML(job.title)}</a>
            </h3>
            <button type="button" class="btn-icon btn-save-job ${isSaved ? 'is-saved' : ''}" data-job-id="${job.id}" aria-label="${isSaved ? 'Remove from saved' : 'Save job'}" title="${isSaved ? 'Saved' : 'Save Job'}">
              ${heartIcon}
            </button>
          </div>
          <div class="job-company-meta">
            <span class="job-company-name">${escapeHTML(job.company)}</span>
            <span class="job-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${job.rating} (${job.reviewsCount})
            </span>
            <span class="meta-dot">&bull;</span>
            <span class="job-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${escapeHTML(job.location)}
            </span>
          </div>
        </div>
      </div>

      <div class="job-badges-row">
        <span class="pill-badge pill-salary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          ${formatSalary(job.salary)}
        </span>
        <span class="pill-badge pill-mode">${job.workMode}</span>
        <span class="pill-badge pill-type">${job.jobType}</span>
        <span class="pill-badge pill-exp">${job.experienceLevel}</span>
        ${job.urgent ? `<span class="pill-badge pill-urgent">Urgently Hiring</span>` : ""}
        ${hasApplied ? `<span class="pill-badge pill-applied"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Applied</span>` : ""}
      </div>

      <p class="job-snippet">${escapeHTML(job.description)}</p>

      <div class="job-card-footer">
        <div class="job-tags-list">
          ${tagsHTML}
        </div>
        <div class="job-footer-right">
          <span class="job-posted-time">${formatPostedDays(job.postedDaysAgo)}</span>
          <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </div>
    </article>
  `;
}

function bindCardActionEvents(container) {
  // Save buttons
  container.querySelectorAll(".btn-save-job").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const jobId = btn.dataset.jobId;
      const isNowSaved = Storage.toggleSaveJob(jobId);

      btn.classList.toggle("is-saved", isNowSaved);
      btn.innerHTML = isNowSaved
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2557a7" stroke="#2557a7" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

      showToast(isNowSaved ? "Job added to your saved list!" : "Job removed from saved list", isNowSaved ? "success" : "info");
    });
  });
}

function updateSaveButtonsState() {
  document.querySelectorAll(".btn-save-job").forEach(btn => {
    const jobId = btn.dataset.jobId;
    const isSaved = Storage.isJobSaved(jobId);
    btn.classList.toggle("is-saved", isSaved);
    btn.innerHTML = isSaved
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2557a7" stroke="#2557a7" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
  });
}

/* ========================================================
   ACTIVE FILTER CHIPS
   ======================================================== */
function renderActiveFilterTags() {
  const container = document.getElementById("activeFilterChips");
  if (!container) return;

  const chips = [];

  if (activeFilters.keyword) {
    chips.push({ type: "keyword", label: `Keyword: "${activeFilters.keyword}"` });
  }
  if (activeFilters.location) {
    chips.push({ type: "location", label: `Location: "${activeFilters.location}"` });
  }
  activeFilters.categories.forEach(cat => {
    chips.push({ type: "category", val: cat, label: cat });
  });
  activeFilters.experience.forEach(exp => {
    chips.push({ type: "experience", val: exp, label: exp });
  });
  activeFilters.jobTypes.forEach(jt => {
    chips.push({ type: "jobType", val: jt, label: jt });
  });
  activeFilters.workModes.forEach(wm => {
    chips.push({ type: "workMode", val: wm, label: wm });
  });
  if (activeFilters.minSalary > 0) {
    chips.push({ type: "salary", label: `$${Math.round(activeFilters.minSalary / 1000)}k+ salary` });
  }

  if (chips.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = `
    <span class="active-filter-label">Active filters:</span>
    ${chips.map(c => `
      <span class="filter-chip">
        ${escapeHTML(c.label)}
        <button type="button" class="chip-remove-btn" onclick="removeActiveChip('${c.type}', '${escapeHTML(c.val || '')}')">&times;</button>
      </span>
    `).join("")}
    <button type="button" class="clear-all-link" onclick="resetAllFilters()">Clear all</button>
  `;
}

window.removeActiveChip = function(type, val) {
  if (type === "keyword") {
    activeFilters.keyword = "";
    const kwInput = document.getElementById("searchKeyword");
    if (kwInput) kwInput.value = "";
  } else if (type === "location") {
    activeFilters.location = "";
    const locInput = document.getElementById("searchLocation");
    if (locInput) locInput.value = "";
  } else if (type === "category") {
    activeFilters.categories = activeFilters.categories.filter(c => c !== val);
    const cb = document.querySelector(`input[name="category"][value="${val}"]`);
    if (cb) cb.checked = false;
  } else if (type === "experience") {
    activeFilters.experience = activeFilters.experience.filter(e => e !== val);
    const cb = document.querySelector(`input[name="experience"][value="${val}"]`);
    if (cb) cb.checked = false;
  } else if (type === "jobType") {
    activeFilters.jobTypes = activeFilters.jobTypes.filter(j => j !== val);
    const cb = document.querySelector(`input[name="jobType"][value="${val}"]`);
    if (cb) cb.checked = false;
  } else if (type === "workMode") {
    activeFilters.workModes = activeFilters.workModes.filter(w => w !== val);
    const cb = document.querySelector(`input[name="workMode"][value="${val}"]`);
    if (cb) cb.checked = false;
  } else if (type === "salary") {
    activeFilters.minSalary = 0;
    const allRadio = document.querySelector('input[name="salaryRange"][value="0"]');
    if (allRadio) allRadio.checked = true;
  }

  updateUrlParams();
  applyFiltersAndRender();
};
