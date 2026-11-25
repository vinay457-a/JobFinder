/**
 * JobFinder - Dashboard Script
 * Manages job seeker metrics, profile editing with Local Storage,
 * interactive skills chip management, recent applications, and viewed jobs.
 */

let currentSkills = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadDashboardStats();
  renderRecentApplicationsTable();
  renderSavedJobsOverview();
  renderRecentlyViewedOverview();
  bindProfileFormEvents();
  bindSkillManagerEvents();

  // Listen to storage changes to keep dashboard stats synchronized
  window.addEventListener("jobfinder_storage_change", () => {
    loadProfile();
    loadDashboardStats();
    renderRecentApplicationsTable();
    renderSavedJobsOverview();
    renderRecentlyViewedOverview();
  });
});

/* ========================================================
   LOAD DASHBOARD METRICS
   ======================================================== */
function loadDashboardStats() {
  const savedJobs = Storage.getSavedJobs();
  const applications = Storage.getApplications();
  const recentJobs = Storage.getRecentlyViewed();

  const statSaved = document.getElementById("statSavedJobs");
  const statApplied = document.getElementById("statAppliedJobs");
  const statViewed = document.getElementById("statViewedJobs");
  const statMatches = document.getElementById("statMatches");

  if (statSaved) statSaved.textContent = savedJobs.length;
  if (statApplied) statApplied.textContent = applications.length;
  if (statViewed) statViewed.textContent = recentJobs.length;
  if (statMatches) statMatches.textContent = SAMPLE_JOBS.length;

  // Calculate profile completion
  const profile = Storage.getProfile();
  let score = 20; // baseline
  if (profile.fullName) score += 15;
  if (profile.headline) score += 15;
  if (profile.email) score += 15;
  if (profile.phone) score += 10;
  if (profile.location) score += 10;
  if (profile.bio) score += 5;
  if (profile.skills && profile.skills.length >= 3) score += 10;

  const scoreEl = document.getElementById("profileCompletionScore");
  const barEl = document.getElementById("profileCompletionBar");
  if (scoreEl) scoreEl.textContent = `${score}%`;
  if (barEl) barEl.style.width = `${score}%`;
}

/* ========================================================
   LOAD & RENDER PROFILE
   ======================================================== */
function loadProfile() {
  const profile = Storage.getProfile();
  currentSkills = [...(profile.skills || [])];

  // Welcome banner & avatar
  const welcomeName = document.getElementById("welcomeUserName");
  const avatarEl = document.getElementById("profileAvatar");
  const nameEl = document.getElementById("profileDisplayName");
  const headlineEl = document.getElementById("profileDisplayHeadline");
  const emailEl = document.getElementById("profileDisplayEmail");
  const phoneEl = document.getElementById("profileDisplayPhone");
  const locationEl = document.getElementById("profileDisplayLocation");
  const bioEl = document.getElementById("profileDisplayBio");

  if (welcomeName) welcomeName.textContent = profile.fullName ? profile.fullName.split(" ")[0] : "Job Seeker";

  if (avatarEl) {
    const initials = profile.fullName
      ? profile.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
      : "JS";
    avatarEl.textContent = initials;
    avatarEl.style.backgroundColor = profile.avatarColor || "#2557a7";
  }

  if (nameEl) nameEl.textContent = profile.fullName || "Your Name";
  if (headlineEl) headlineEl.textContent = profile.headline || "Add your professional headline";
  if (emailEl) emailEl.textContent = profile.email || "No email added";
  if (phoneEl) phoneEl.textContent = profile.phone || "No phone added";
  if (locationEl) locationEl.textContent = profile.location || "Location not set";
  if (bioEl) bioEl.textContent = profile.bio || "No summary provided. Edit your profile to introduce yourself to prospective employers.";

  // Pre-fill edit modal form inputs
  const editName = document.getElementById("editFullName");
  const editHeadline = document.getElementById("editHeadline");
  const editEmail = document.getElementById("editEmail");
  const editPhone = document.getElementById("editPhone");
  const editLocation = document.getElementById("editLocation");
  const editBio = document.getElementById("editBio");
  const editSalary = document.getElementById("editExpectedSalary");

  if (editName) editName.value = profile.fullName || "";
  if (editHeadline) editHeadline.value = profile.headline || "";
  if (editEmail) editEmail.value = profile.email || "";
  if (editPhone) editPhone.value = profile.phone || "";
  if (editLocation) editLocation.value = profile.location || "";
  if (editBio) editBio.value = profile.bio || "";
  if (editSalary) editSalary.value = profile.expectedSalary || "";

  renderSkillsList();
}

/* ========================================================
   SKILLS MANAGEMENT
   ======================================================== */
function bindSkillManagerEvents() {
  const addBtn = document.getElementById("addSkillBtn");
  const input = document.getElementById("newSkillInput");

  if (addBtn && input) {
    const addSkill = () => {
      const val = input.value.trim();
      if (val && !currentSkills.includes(val)) {
        currentSkills.push(val);
        input.value = "";
        renderSkillsList();
        saveSkillsToProfile();
      }
    };

    addBtn.addEventListener("click", addSkill);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
      }
    });
  }
}

function renderSkillsList() {
  const container = document.getElementById("skillsChipsContainer");
  if (!container) return;

  if (currentSkills.length === 0) {
    container.innerHTML = `<span class="empty-note">No skills added yet. Type a skill above to add.</span>`;
    return;
  }

  container.innerHTML = currentSkills.map((skill, index) => `
    <span class="skill-chip">
      ${escapeHTML(skill)}
      <button type="button" class="skill-remove-btn" onclick="removeSkill(${index})" aria-label="Remove ${escapeHTML(skill)}">&times;</button>
    </span>
  `).join("");
}

window.removeSkill = function(index) {
  currentSkills.splice(index, 1);
  renderSkillsList();
  saveSkillsToProfile();
};

function saveSkillsToProfile() {
  Storage.saveProfile({ skills: currentSkills });
  showToast("Skills updated", "info", 1500);
}

/* ========================================================
   PROFILE FORM EDITING & MODAL
   ======================================================== */
function bindProfileFormEvents() {
  const form = document.getElementById("editProfileForm");
  const editModal = document.getElementById("editProfileModal");
  const openBtn = document.getElementById("openEditProfileBtn");
  const closeBtn = document.getElementById("closeEditProfileBtn");
  const cancelBtn = document.getElementById("cancelEditProfileBtn");

  if (openBtn && editModal) {
    openBtn.addEventListener("click", () => {
      editModal.classList.add("modal-open");
      document.body.classList.add("modal-open");
    });
  }

  const closeModal = () => {
    if (editModal) {
      editModal.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    }
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Close when clicking modal backdrop
  if (editModal) {
    editModal.addEventListener("click", (e) => {
      if (e.target === editModal) closeModal();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const updated = {
        fullName: document.getElementById("editFullName")?.value.trim(),
        headline: document.getElementById("editHeadline")?.value.trim(),
        email: document.getElementById("editEmail")?.value.trim(),
        phone: document.getElementById("editPhone")?.value.trim(),
        location: document.getElementById("editLocation")?.value.trim(),
        bio: document.getElementById("editBio")?.value.trim(),
        expectedSalary: document.getElementById("editExpectedSalary")?.value.trim(),
        skills: currentSkills
      };

      Storage.saveProfile(updated);
      closeModal();
      showToast("Profile updated successfully!", "success");
    });
  }

  // Reset Demo Data button
  const resetBtn = document.getElementById("resetDemoDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all Local Storage demo data (Saved jobs, applications, and profile)?")) {
        Storage.resetAllData();
        showToast("Demo data restored to initial state", "info");
      }
    });
  }
}

/* ========================================================
   RENDER RECENT APPLICATIONS TABLE
   ======================================================== */
function renderRecentApplicationsTable() {
  const container = document.getElementById("dashboardApplicationsTable");
  if (!container) return;

  const applications = Storage.getApplications();

  if (applications.length === 0) {
    container.innerHTML = `
      <div class="empty-state p-4">
        <p class="empty-state-desc">You have not submitted any job applications yet.</p>
        <a href="jobs.html" class="btn btn-outline btn-sm">Find Jobs to Apply</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>Job Title & Company</th>
            <th>Date Applied</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${applications.slice(0, 5).map(app => `
            <tr>
              <td>
                <div class="table-job-item">
                  <span class="table-logo" style="background-color: ${app.logoColor || '#2557a7'};">${app.companyLogo || 'JP'}</span>
                  <div>
                    <a href="job-details.html?id=${app.jobId}" class="table-job-title">${escapeHTML(app.jobTitle)}</a>
                    <div class="table-sub">${escapeHTML(app.company)} &bull; ${escapeHTML(app.location || 'US')}</div>
                  </div>
                </div>
              </td>
              <td>${app.appliedDate}</td>
              <td><span class="table-file-badge">${escapeHTML(app.resumeName || 'Resume.pdf')}</span></td>
              <td><span class="status-badge ${getStatusClass(app.status)}">${escapeHTML(app.status)}</span></td>
              <td>
                <a href="job-details.html?id=${app.jobId}" class="btn btn-ghost btn-xs">View</a>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case "under review":
      return "status-review";
    case "interview":
    case "interview scheduled":
      return "status-interview";
    case "accepted":
      return "status-accepted";
    default:
      return "status-submitted";
  }
}

/* ========================================================
   RENDER SAVED JOBS OVERVIEW
   ======================================================== */
function renderSavedJobsOverview() {
  const container = document.getElementById("dashboardSavedJobsList");
  if (!container) return;

  const savedJobs = Storage.getSavedJobObjects();

  if (savedJobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state p-4">
        <p class="empty-state-desc">No saved jobs yet.</p>
        <a href="jobs.html" class="btn btn-outline btn-sm">Browse Jobs</a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedJobs.slice(0, 3).map(job => `
    <div class="dashboard-mini-job-card">
      <div class="mini-card-header">
        <div class="mini-logo" style="background-color: ${job.logoColor};">${job.companyLogo}</div>
        <div class="mini-info">
          <h5 class="mini-title">
            <a href="job-details.html?id=${job.id}">${escapeHTML(job.title)}</a>
          </h5>
          <span class="mini-sub">${escapeHTML(job.company)} &bull; ${escapeHTML(job.location)}</span>
        </div>
      </div>
      <div class="mini-meta">
        <span class="mini-pill">${job.workMode}</span>
        <span class="mini-pill">${formatSalary(job.salary)}</span>
      </div>
      <div class="mini-actions">
        <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-xs">Details</a>
        <a href="applications.html?jobId=${job.id}" class="btn btn-primary btn-xs">Apply</a>
      </div>
    </div>
  `).join("");
}

/* ========================================================
   RENDER RECENTLY VIEWED OVERVIEW
   ======================================================== */
function renderRecentlyViewedOverview() {
  const container = document.getElementById("dashboardRecentJobsList");
  if (!container) return;

  const recentJobs = Storage.getRecentlyViewedObjects();

  if (recentJobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state p-4">
        <p class="empty-state-desc">You haven't viewed any jobs yet.</p>
        <a href="jobs.html" class="btn btn-outline btn-sm">Explore Positions</a>
      </div>
    `;
    return;
  }

  container.innerHTML = recentJobs.slice(0, 4).map(job => `
    <div class="recent-viewed-chip-card">
      <div class="recent-viewed-top">
        <div class="recent-logo" style="background-color: ${job.logoColor};">${job.companyLogo}</div>
        <div>
          <h5 class="recent-title"><a href="job-details.html?id=${job.id}">${escapeHTML(job.title)}</a></h5>
          <div class="recent-company">${escapeHTML(job.company)}</div>
        </div>
      </div>
      <div class="recent-footer">
        <span class="recent-salary">${formatSalary(job.salary)}</span>
        <span class="recent-loc">${job.workMode}</span>
      </div>
    </div>
  `).join("");
}
