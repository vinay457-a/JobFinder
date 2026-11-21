/**
 * JobFinder - Applications Script
 * Manages the interactive job application form, client-side resume validation,
 * duplicate prevention, and persistent application tracking in Local Storage.
 */

let selectedFile = null;

document.addEventListener("DOMContentLoaded", () => {
  initJobSelector();
  prefillProfileData();
  bindFileUploadEvents();
  bindFormSubmission();
  renderSubmittedApplications();
  initApplicationTabs();

  // Listen to storage changes to keep applications list updated
  window.addEventListener("jobfinder_storage_change", (e) => {
    if (e.detail?.type === "applications") {
      renderSubmittedApplications();
    }
  });
});

/* ========================================================
   INITIALIZE JOB SELECTOR & PREFILL
   ======================================================== */
function initJobSelector() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobIdParam = urlParams.get("jobId");
  const jobSelect = document.getElementById("applicationJobSelect");
  const jobPreviewCard = document.getElementById("selectedJobPreview");

  if (!jobSelect) return;

  // Populate dropdown options with all available jobs
  jobSelect.innerHTML = `<option value="">-- Choose an open position --</option>` +
    SAMPLE_JOBS.map(j => `
      <option value="${j.id}" ${j.id === jobIdParam ? "selected" : ""}>
        ${escapeHTML(j.title)} - ${escapeHTML(j.company)} (${j.location})
      </option>
    `).join("");

  // Handle change event
  jobSelect.addEventListener("change", () => {
    updateJobPreview(jobSelect.value);
    checkDuplicateApplication(jobSelect.value);
  });

  // If initial param present, update
  if (jobIdParam) {
    jobSelect.value = jobIdParam;
    updateJobPreview(jobIdParam);
    checkDuplicateApplication(jobIdParam);
  }
}

function updateJobPreview(jobId) {
  const preview = document.getElementById("selectedJobPreview");
  if (!preview) return;

  if (!jobId) {
    preview.style.display = "none";
    preview.innerHTML = "";
    return;
  }

  const job = SAMPLE_JOBS.find(j => j.id === jobId);
  if (!job) {
    preview.style.display = "none";
    return;
  }

  preview.style.display = "block";
  preview.innerHTML = `
    <div class="selected-job-box">
      <div class="selected-job-logo" style="background-color: ${job.logoColor};">${job.companyLogo}</div>
      <div class="selected-job-info">
        <h4 class="selected-job-title">${escapeHTML(job.title)}</h4>
        <div class="selected-job-meta">
          <span>${escapeHTML(job.company)}</span>
          <span class="meta-dot">&bull;</span>
          <span>${escapeHTML(job.location)}</span>
          <span class="meta-dot">&bull;</span>
          <span>${formatSalary(job.salary)}</span>
        </div>
      </div>
      <a href="job-details.html?id=${job.id}" target="_blank" class="btn btn-ghost btn-sm" title="View details in new tab">
        View Listing &nearr;
      </a>
    </div>
  `;
}

function checkDuplicateApplication(jobId) {
  const banner = document.getElementById("duplicateWarningBanner");
  const submitBtn = document.getElementById("submitAppBtn");
  if (!banner || !submitBtn) return;

  if (jobId && Storage.hasApplied(jobId)) {
    const existing = Storage.getApplicationByJob(jobId);
    banner.style.display = "flex";
    banner.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      <div>
        <strong>Application Already Submitted:</strong> You previously submitted an application for this position on <em>${existing.appliedDate}</em>. Current status: <strong>${existing.status}</strong>.
      </div>
    `;
    submitBtn.disabled = true;
    submitBtn.textContent = "Already Applied";
  } else {
    banner.style.display = "none";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  }
}

function prefillProfileData() {
  const profile = Storage.getProfile();
  const nameInput = document.getElementById("applicantName");
  const emailInput = document.getElementById("applicantEmail");
  const phoneInput = document.getElementById("applicantPhone");

  if (nameInput && !nameInput.value) nameInput.value = profile.fullName || "";
  if (emailInput && !emailInput.value) emailInput.value = profile.email || "";
  if (phoneInput && !phoneInput.value) phoneInput.value = profile.phone || "";
}

/* ========================================================
   FILE UPLOAD & CLIENT-SIDE VALIDATION
   ======================================================== */
function bindFileUploadEvents() {
  const dropzone = document.getElementById("resumeDropzone");
  const fileInput = document.getElementById("resumeFileInput");
  const previewBox = document.getElementById("filePreviewBox");
  const removeBtn = document.getElementById("removeFileBtn");

  if (!dropzone || !fileInput) return;

  // Click to browse
  dropzone.addEventListener("click", () => fileInput.click());

  // Drag & drop
  ["dragenter", "dragover"].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dropzone-active");
    });
  });

  ["dragleave", "drop"].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dropzone-active");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleSelectedFile(files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleSelectedFile(e.target.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedFile = null;
      fileInput.value = "";
      if (previewBox) previewBox.style.display = "none";
      dropzone.style.display = "flex";
    });
  }
}

function handleSelectedFile(file) {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const fileName = file.name.toLowerCase();
  const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

  if (!isValidExtension) {
    showToast("Invalid file format. Please upload a PDF, DOC, or DOCX document.", "error");
    return;
  }

  // 5MB Limit
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast("File is too large. Maximum allowed size is 5MB.", "error");
    return;
  }

  selectedFile = {
    name: file.name,
    size: (file.size / 1024).toFixed(1) + " KB",
    type: file.type
  };

  const dropzone = document.getElementById("resumeDropzone");
  const previewBox = document.getElementById("filePreviewBox");
  const fileNameEl = document.getElementById("previewFileName");
  const fileSizeEl = document.getElementById("previewFileSize");

  if (dropzone && previewBox) {
    dropzone.style.display = "none";
    previewBox.style.display = "flex";
    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = selectedFile.size;
  }
}

/* ========================================================
   FORM SUBMISSION & VALIDATION
   ======================================================== */
function bindFormSubmission() {
  const form = document.getElementById("jobApplicationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const jobId = document.getElementById("applicationJobSelect")?.value;
    const name = document.getElementById("applicantName")?.value.trim();
    const email = document.getElementById("applicantEmail")?.value.trim();
    const phone = document.getElementById("applicantPhone")?.value.trim();
    const experience = document.getElementById("applicantExp")?.value;
    const coverLetter = document.getElementById("applicantCoverLetter")?.value.trim();
    const portfolioUrl = document.getElementById("applicantPortfolio")?.value.trim();

    // 1. Validate Job selected
    if (!jobId) {
      showToast("Please select the job position you are applying for.", "warning");
      document.getElementById("applicationJobSelect")?.focus();
      return;
    }

    // 2. Prevent duplicate application
    if (Storage.hasApplied(jobId)) {
      showToast("You have already applied for this position.", "warning");
      checkDuplicateApplication(jobId);
      return;
    }

    // 3. Validate name
    if (!name || name.length < 2) {
      showToast("Please enter your full legal name.", "warning");
      document.getElementById("applicantName")?.focus();
      return;
    }

    // 4. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "warning");
      document.getElementById("applicantEmail")?.focus();
      return;
    }

    // 5. Validate phone
    if (!phone || phone.length < 7) {
      showToast("Please enter a valid phone number.", "warning");
      document.getElementById("applicantPhone")?.focus();
      return;
    }

    // 6. Validate Resume uploaded
    if (!selectedFile) {
      showToast("Please attach your resume (PDF or DOC) to continue.", "warning");
      return;
    }

    const job = SAMPLE_JOBS.find(j => j.id === jobId);

    // Save Application to Local Storage
    const result = Storage.addApplication({
      jobId: jobId,
      jobTitle: job ? job.title : "Software Opportunity",
      company: job ? job.company : "Hiring Partner",
      companyLogo: job ? job.companyLogo : "JP",
      logoColor: job ? job.logoColor : "#2557a7",
      location: job ? job.location : "United States",
      fullName: name,
      email: email,
      phone: phone,
      experience: experience || "Not specified",
      portfolioUrl: portfolioUrl || "",
      coverLetter: coverLetter || "",
      resumeName: selectedFile.name,
      resumeSize: selectedFile.size
    });

    if (result.success) {
      showToast("Application submitted successfully!", "success");
      // Reset form
      form.reset();
      selectedFile = null;
      document.getElementById("filePreviewBox").style.display = "none";
      document.getElementById("resumeDropzone").style.display = "flex";
      document.getElementById("selectedJobPreview").style.display = "none";

      // Switch to tracking tab to show user their new application!
      switchTab("tracking");
    } else {
      showToast(result.message, "error");
    }
  });
}

/* ========================================================
   RENDER SUBMITTED APPLICATIONS & TRACKING
   ======================================================== */
function renderSubmittedApplications() {
  const container = document.getElementById("submittedApplicationsList");
  const countBadge = document.getElementById("appsTrackingCount");
  if (!container) return;

  const applications = Storage.getApplications();

  if (countBadge) {
    countBadge.textContent = applications.length;
  }

  if (applications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h3 class="empty-state-title">No applications submitted yet</h3>
        <p class="empty-state-desc">Explore open jobs and submit your first application. All submitted applications will be tracked here.</p>
        <button type="button" class="btn btn-primary" onclick="switchTab('apply')">Apply for a Job</button>
      </div>
    `;
    return;
  }

  container.innerHTML = applications.map(app => {
    const statusClass = getStatusClass(app.status);

    return `
      <div class="app-tracking-card" data-app-id="${app.id}">
        <div class="app-card-top">
          <div class="app-company-info">
            <div class="company-logo-sm" style="background-color: ${app.logoColor || '#2557a7'};">
              ${app.companyLogo || 'JP'}
            </div>
            <div>
              <h4 class="app-card-job-title">${escapeHTML(app.jobTitle)}</h4>
              <p class="app-card-company-name">${escapeHTML(app.company)} &bull; ${escapeHTML(app.location || 'United States')}</p>
            </div>
          </div>
          <span class="status-badge ${statusClass}">
            ${escapeHTML(app.status)}
          </span>
        </div>

        <div class="app-card-details-grid">
          <div class="app-detail-item">
            <span class="app-detail-label">Applicant Name</span>
            <span class="app-detail-val">${escapeHTML(app.fullName)}</span>
          </div>
          <div class="app-detail-item">
            <span class="app-detail-label">Contact Email</span>
            <span class="app-detail-val">${escapeHTML(app.email)}</span>
          </div>
          <div class="app-detail-item">
            <span class="app-detail-label">Resume Attached</span>
            <span class="app-detail-val resume-file-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              ${escapeHTML(app.resumeName)} (${app.resumeSize})
            </span>
          </div>
          <div class="app-detail-item">
            <span class="app-detail-label">Submitted On</span>
            <span class="app-detail-val">${app.appliedDate} at ${app.appliedTime || ''}</span>
          </div>
        </div>

        ${app.coverLetter ? `
          <div class="app-cover-preview">
            <strong>Cover Note:</strong> "${escapeHTML(app.coverLetter)}"
          </div>
        ` : ""}

        <div class="app-card-actions">
          <a href="job-details.html?id=${app.jobId}" class="btn btn-outline btn-sm">View Job Listing</a>
          <button type="button" class="btn btn-ghost btn-sm text-danger" onclick="withdrawApplicationPrompt('${app.id}', '${escapeHTML(app.jobTitle)}')">
            Withdraw Application
          </button>
        </div>
      </div>
    `;
  }).join("");
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

window.withdrawApplicationPrompt = function(appId, jobTitle) {
  if (confirm(`Are you sure you want to withdraw your application for "${jobTitle}"? This action cannot be undone.`)) {
    const success = Storage.removeApplication(appId);
    if (success) {
      showToast("Application withdrawn successfully", "info");
      renderSubmittedApplications();
      // If we are currently on the apply form for this job, reset duplicate check
      const currentJobId = document.getElementById("applicationJobSelect")?.value;
      if (currentJobId) {
        checkDuplicateApplication(currentJobId);
      }
    }
  }
};

/* ========================================================
   TABS SWITCHER
   ======================================================== */
function initApplicationTabs() {
  const tabBtns = document.querySelectorAll(".app-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.dataset.tab;
      switchTab(tabTarget);
    });
  });

  // Check URL hash (#tracking or #apply)
  if (window.location.hash === "#tracking") {
    switchTab("tracking");
  }
}

window.switchTab = function(tabName) {
  const tabBtns = document.querySelectorAll(".app-tab-btn");
  const tabPanes = document.querySelectorAll(".app-tab-pane");

  tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  tabPanes.forEach(pane => {
    pane.classList.toggle("active", pane.id === `tab-${tabName}`);
  });

  window.location.hash = tabName;
};
