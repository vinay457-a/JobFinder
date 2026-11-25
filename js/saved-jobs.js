/**
 * JobFinder - Saved Jobs Script
 * Renders user's saved job bookmarks from Local Storage,
 * supports search filtering within saved items, and allows 1-click removal.
 */

let savedJobObjects = [];

document.addEventListener("DOMContentLoaded", () => {
  loadSavedJobs();
  bindSavedSearch();

  // Listen to storage changes to keep view updated
  window.addEventListener("jobfinder_storage_change", (e) => {
    if (e.detail?.type === "saved_jobs") {
      loadSavedJobs();
    }
  });
});

function loadSavedJobs() {
  savedJobObjects = Storage.getSavedJobObjects();
  renderSavedJobs(savedJobObjects);
}

function bindSavedSearch() {
  const searchInput = document.getElementById("searchSavedJobsInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        renderSavedJobs(savedJobObjects);
        return;
      }

      const filtered = savedJobObjects.filter(job =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.tags.some(t => t.toLowerCase().includes(q))
      );
      renderSavedJobs(filtered, true);
    });
  }
}

function renderSavedJobs(jobs, isFiltered = false) {
  const container = document.getElementById("savedJobsContainer");
  const countEl = document.getElementById("savedJobsCountText");

  if (countEl) {
    countEl.textContent = `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"} saved`;
  }

  if (!container) return;

  if (jobs.length === 0) {
    if (isFiltered) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 class="empty-state-title">No matching saved jobs</h3>
          <p class="empty-state-desc">No saved jobs match your current search criteria.</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <h3 class="empty-state-title">You haven't saved any jobs yet</h3>
          <p class="empty-state-desc">Jobs you bookmark while searching will be stored here so you can easily review and apply later.</p>
          <a href="jobs.html" class="btn btn-primary">Find Jobs Now</a>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = jobs.map(job => {
    const hasApplied = Storage.hasApplied(job.id);

    return `
      <article class="job-card saved-card" id="saved-card-${job.id}">
        <div class="job-card-header">
          <div class="job-company-badge" style="background-color: ${job.logoColor};">
            ${job.companyLogo}
          </div>
          <div class="job-header-info">
            <div class="job-title-row">
              <h3 class="job-title">
                <a href="job-details.html?id=${job.id}" class="job-title-link">${escapeHTML(job.title)}</a>
              </h3>
              <button type="button" class="btn-icon remove-saved-btn" title="Remove from saved jobs" onclick="removeJobFromSaved('${job.id}', '${escapeHTML(job.title)}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="job-company-meta">
              <span class="job-company-name">${escapeHTML(job.company)}</span>
              <span class="job-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${job.rating}
              </span>
              <span class="meta-dot">&bull;</span>
              <span class="job-location">${escapeHTML(job.location)}</span>
            </div>
          </div>
        </div>

        <div class="job-badges-row">
          <span class="pill-badge pill-salary">${formatSalary(job.salary)}</span>
          <span class="pill-badge pill-mode">${job.workMode}</span>
          <span class="pill-badge pill-type">${job.jobType}</span>
          ${hasApplied ? `<span class="pill-badge pill-applied"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Applied</span>` : ""}
        </div>

        <p class="job-snippet">${escapeHTML(job.description)}</p>

        <div class="job-card-footer">
          <div class="job-tags-list">
            ${job.tags.slice(0, 3).map(t => `<span class="badge-tag">${escapeHTML(t)}</span>`).join("")}
          </div>
          <div class="job-footer-right">
            <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-sm">View Details</a>
            ${hasApplied ? `
              <a href="applications.html#tracking" class="btn btn-ghost btn-sm">Track Application</a>
            ` : `
              <a href="applications.html?jobId=${job.id}" class="btn btn-primary btn-sm">Apply Now</a>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

window.removeJobFromSaved = function(jobId, jobTitle) {
  const card = document.getElementById(`saved-card-${jobId}`);
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "scale(0.97)";
    card.style.transition = "all 0.25s ease";
  }

  setTimeout(() => {
    Storage.removeSavedJob(jobId);
    showToast(`Removed "${jobTitle}" from saved jobs`, "info");
    loadSavedJobs();
  }, 250);
};
