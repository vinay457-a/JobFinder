/**
 * JobFinder - Job Details Script
 * Handles job lookup by ID from URL query params,
 * tracks recently viewed jobs, toggles bookmark status,
 * and renders rich job specifications & recommendations.
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id");

  if (!jobId) {
    renderNotFound("No Job Selected", "Please select a job from the search listings to view its details.");
    return;
  }

  const job = SAMPLE_JOBS.find(j => j.id === jobId);

  if (!job) {
    renderNotFound("Job Not Found", `We couldn't find a job listing matching ID "${jobId}". It may have expired or been removed.`);
    return;
  }

  // Record into recently viewed
  Storage.addRecentlyViewed(job.id);

  // Render job details
  renderJobDetails(job);

  // Render similar job recommendations
  renderSimilarJobs(job);

  // Listen to storage events to keep save button in sync
  window.addEventListener("jobfinder_storage_change", (e) => {
    if (e.detail?.type === "saved_jobs") {
      updateSaveButton(job.id);
    }
  });
});

/* ========================================================
   RENDER JOB DETAILS
   ======================================================== */
function renderJobDetails(job) {
  // Update document title
  document.title = `${job.title} at ${job.company} - JobFinder`;

  // Breadcrumb
  const breadcrumbEl = document.getElementById("jobBreadcrumb");
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <a href="index.html">Home</a>
      <span class="crumb-separator">/</span>
      <a href="jobs.html">Find Jobs</a>
      <span class="crumb-separator">/</span>
      <a href="jobs.html?category=${encodeURIComponent(job.category)}">${escapeHTML(job.category)}</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">${escapeHTML(job.title)}</span>
    `;
  }

  // Header Details
  const container = document.getElementById("jobDetailsContainer");
  if (!container) return;

  const isSaved = Storage.isJobSaved(job.id);
  const hasApplied = Storage.hasApplied(job.id);
  const appData = Storage.getApplicationByJob(job.id);

  const heartIcon = isSaved
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2557a7" stroke="#2557a7" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

  container.innerHTML = `
    <!-- Top Job Header Card -->
    <div class="job-detail-header-card">
      <div class="job-detail-top-row">
        <div class="company-logo-lg" style="background-color: ${job.logoColor};">
          ${job.companyLogo}
        </div>
        <div class="header-main-meta">
          <div class="title-status-wrap">
            <h1 class="job-detail-title">${escapeHTML(job.title)}</h1>
            ${job.urgent ? `<span class="pill-badge pill-urgent">Urgently Hiring</span>` : ""}
          </div>
          <div class="company-detail-sub">
            <span class="company-name-bold">${escapeHTML(job.company)}</span>
            <span class="job-rating">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${job.rating} (${job.reviewsCount} reviews)
            </span>
            <span class="meta-dot">&bull;</span>
            <span class="location-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${escapeHTML(job.location)}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Badges -->
      <div class="detail-badges-row">
        <div class="quick-pill salary-pill">
          <span class="pill-label">Salary</span>
          <span class="pill-value">${formatSalary(job.salary)}</span>
        </div>
        <div class="quick-pill">
          <span class="pill-label">Job Type</span>
          <span class="pill-value">${job.jobType}</span>
        </div>
        <div class="quick-pill">
          <span class="pill-label">Workplace</span>
          <span class="pill-value">${job.workMode}</span>
        </div>
        <div class="quick-pill">
          <span class="pill-label">Experience</span>
          <span class="pill-value">${job.experienceLevel}</span>
        </div>
        <div class="quick-pill">
          <span class="pill-label">Category</span>
          <span class="pill-value">${job.category}</span>
        </div>
      </div>

      <!-- Actions Bar -->
      <div class="detail-actions-bar">
        <div class="left-actions">
          ${hasApplied ? `
            <div class="already-applied-alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>You applied for this job on <strong>${appData?.appliedDate || 'recently'}</strong> (Status: <em>${appData?.status || 'Submitted'}</em>)</span>
              <a href="applications.html" class="btn btn-outline btn-sm">View Status</a>
            </div>
          ` : `
            <a href="applications.html?jobId=${job.id}" class="btn btn-primary btn-lg" id="applyNowBtn">
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          `}

          <button type="button" class="btn btn-secondary ${isSaved ? 'is-saved' : ''}" id="detailSaveBtn" data-job-id="${job.id}">
            <span class="save-icon-wrap">${heartIcon}</span>
            <span class="save-btn-text">${isSaved ? "Saved to My Jobs" : "Save Job"}</span>
          </button>
        </div>

        <div class="right-actions">
          <button type="button" class="btn btn-ghost" id="shareJobBtn" title="Share Job Link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share
          </button>
          <span class="posted-date-sub">Posted ${formatPostedDays(job.postedDaysAgo)}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="job-detail-body-grid">
      <!-- Left Column: Full Specifications & Description -->
      <div class="job-detail-main-content">
        <!-- Overview -->
        <section class="detail-section">
          <h2 class="section-title">Job Overview</h2>
          <p class="section-text">${escapeHTML(job.description)}</p>
        </section>

        <!-- Responsibilities -->
        <section class="detail-section">
          <h2 class="section-title">Key Responsibilities</h2>
          <ul class="detail-check-list">
            ${job.responsibilities.map(r => `<li>${escapeHTML(r)}</li>`).join("")}
          </ul>
        </section>

        <!-- Requirements -->
        <section class="detail-section">
          <h2 class="section-title">Requirements & Experience</h2>
          <ul class="detail-check-list">
            ${job.requirements.map(req => `<li>${escapeHTML(req)}</li>`).join("")}
          </ul>
        </section>

        <!-- Qualifications -->
        ${job.qualifications && job.qualifications.length > 0 ? `
          <section class="detail-section">
            <h2 class="section-title">Preferred Qualifications</h2>
            <ul class="detail-check-list">
              ${job.qualifications.map(q => `<li>${escapeHTML(q)}</li>`).join("")}
            </ul>
          </section>
        ` : ""}

        <!-- Skills Tags -->
        <section class="detail-section">
          <h2 class="section-title">Required Skills & Tools</h2>
          <div class="detail-tags-cloud">
            ${job.tags.map(t => `<span class="detail-skill-tag">${escapeHTML(t)}</span>`).join("")}
          </div>
        </section>

        <!-- Benefits & Perks -->
        <section class="detail-section">
          <h2 class="section-title">Benefits & Perks</h2>
          <div class="benefits-grid">
            ${job.benefits.map(b => `
              <div class="benefit-item">
                <div class="benefit-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2557a7" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span>${escapeHTML(b)}</span>
              </div>
            `).join("")}
          </div>
        </section>
      </div>

      <!-- Right Column: Company Summary Sidebar -->
      <aside class="job-detail-sidebar">
        <div class="company-info-card">
          <div class="company-sidebar-header">
            <div class="company-logo-md" style="background-color: ${job.logoColor};">${job.companyLogo}</div>
            <div>
              <h3 class="company-sidebar-name">${escapeHTML(job.company)}</h3>
              <p class="company-sidebar-loc">${escapeHTML(job.location)}</p>
            </div>
          </div>

          <div class="company-rating-box">
            <div class="rating-large-score">${job.rating}</div>
            <div>
              <div class="stars-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <span class="rating-sub-text">Overall company score based on ${job.reviewsCount} reviews</span>
            </div>
          </div>

          <div class="company-quick-facts">
            <div class="fact-row">
              <span class="fact-label">Industry</span>
              <span class="fact-val">${escapeHTML(job.category)} & Technology</span>
            </div>
            <div class="fact-row">
              <span class="fact-label">Company Size</span>
              <span class="fact-val">250 - 1,000 Employees</span>
            </div>
            <div class="fact-row">
              <span class="fact-label">Founded</span>
              <span class="fact-val">2016</span>
            </div>
          </div>

          <a href="jobs.html?keyword=${encodeURIComponent(job.company)}" class="btn btn-outline btn-block">
            View All Jobs at ${escapeHTML(job.company)}
          </a>
        </div>

        <!-- Simulation Notice Card -->
        <div class="simulation-info-card">
          <div class="sim-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2557a7" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <strong>Job Application Simulation</strong>
          </div>
          <p>This is a frontend demonstration job portal. Applying will simulate the submission process and store your application safely in your browser's local storage.</p>
        </div>
      </aside>
    </div>
  `;

  // Attach button events
  const saveBtn = document.getElementById("detailSaveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const isNowSaved = Storage.toggleSaveJob(job.id);
      updateSaveButton(job.id);
      showToast(isNowSaved ? "Job added to your saved list!" : "Job removed from saved list", isNowSaved ? "success" : "info");
    });
  }

  const shareBtn = document.getElementById("shareJobBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        showToast("Job link copied to clipboard!", "success");
      }).catch(() => {
        showToast("Link: " + window.location.href, "info");
      });
    });
  }
}

function updateSaveButton(jobId) {
  const saveBtn = document.getElementById("detailSaveBtn");
  if (!saveBtn) return;

  const isSaved = Storage.isJobSaved(jobId);
  saveBtn.classList.toggle("is-saved", isSaved);

  const heartIcon = isSaved
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2557a7" stroke="#2557a7" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

  saveBtn.querySelector(".save-icon-wrap").innerHTML = heartIcon;
  saveBtn.querySelector(".save-btn-text").textContent = isSaved ? "Saved to My Jobs" : "Save Job";
}

/* ========================================================
   RENDER SIMILAR JOBS
   ======================================================== */
function renderSimilarJobs(currentJob) {
  const container = document.getElementById("similarJobsContainer");
  if (!container) return;

  // Find 3 jobs with same category or matching tags
  const similar = SAMPLE_JOBS
    .filter(j => j.id !== currentJob.id)
    .filter(j => j.category === currentJob.category || j.tags.some(t => currentJob.tags.includes(t)))
    .slice(0, 3);

  if (similar.length === 0) {
    container.closest(".similar-jobs-section")?.remove();
    return;
  }

  container.innerHTML = similar.map(job => `
    <div class="similar-job-card">
      <div class="similar-card-top">
        <div class="similar-logo" style="background-color: ${job.logoColor};">${job.companyLogo}</div>
        <div>
          <h4 class="similar-title">
            <a href="job-details.html?id=${job.id}">${escapeHTML(job.title)}</a>
          </h4>
          <span class="similar-company">${escapeHTML(job.company)}</span>
        </div>
      </div>
      <div class="similar-meta">
        <span class="similar-pill">${job.workMode}</span>
        <span class="similar-pill">${formatSalary(job.salary)}</span>
        <span class="similar-loc">${escapeHTML(job.location)}</span>
      </div>
      <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-sm btn-block">View Job</a>
    </div>
  `).join("");
}

function renderNotFound(title, message) {
  const container = document.getElementById("jobDetailsContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 class="empty-state-title">${escapeHTML(title)}</h2>
      <p class="empty-state-desc">${escapeHTML(message)}</p>
      <a href="jobs.html" class="btn btn-primary">Browse All Active Jobs</a>
    </div>
  `;
}
