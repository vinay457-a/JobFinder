/**
 * JobFinder - Storage Management
 * Handles persistent client-side data using LocalStorage for:
 * - Saved Jobs
 * - Job Applications (Simulated)
 * - Recently Viewed Jobs
 * - User Profile & Preferences
 */

const STORAGE_KEYS = {
  SAVED_JOBS: "jobfinder_saved_jobs",
  APPLICATIONS: "jobfinder_applications",
  RECENTLY_VIEWED: "jobfinder_recent_jobs",
  USER_PROFILE: "jobfinder_user_profile"
};

const Storage = {
  // Dispatch custom event to notify components on the page
  notifyChange(type, detail = {}) {
    window.dispatchEvent(new CustomEvent("jobfinder_storage_change", {
      detail: { type, ...detail }
    }));
  },

  // --- SAVED JOBS ---
  getSavedJobs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading saved jobs from localStorage", e);
      return [];
    }
  },

  isJobSaved(jobId) {
    const list = this.getSavedJobs();
    return list.includes(jobId);
  },

  saveJob(jobId) {
    const list = this.getSavedJobs();
    if (!list.includes(jobId)) {
      list.push(jobId);
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(list));
      this.notifyChange("saved_jobs", { action: "save", jobId });
      return true;
    }
    return false;
  },

  removeSavedJob(jobId) {
    let list = this.getSavedJobs();
    if (list.includes(jobId)) {
      list = list.filter(id => id !== jobId);
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(list));
      this.notifyChange("saved_jobs", { action: "remove", jobId });
      return true;
    }
    return false;
  },

  toggleSaveJob(jobId) {
    if (this.isJobSaved(jobId)) {
      this.removeSavedJob(jobId);
      return false; // now unsaved
    } else {
      this.saveJob(jobId);
      return true; // now saved
    }
  },

  getSavedJobObjects() {
    const ids = this.getSavedJobs();
    return ids
      .map(id => SAMPLE_JOBS.find(j => j.id === id))
      .filter(Boolean);
  },

  // --- JOB APPLICATIONS ---
  getApplications() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading applications from localStorage", e);
      return [];
    }
  },

  hasApplied(jobId) {
    const apps = this.getApplications();
    return apps.some(app => app.jobId === jobId);
  },

  getApplicationByJob(jobId) {
    const apps = this.getApplications();
    return apps.find(app => app.jobId === jobId) || null;
  },

  addApplication(applicationData) {
    const apps = this.getApplications();
    // Prevent duplicate application for the same job
    if (this.hasApplied(applicationData.jobId)) {
      return {
        success: false,
        message: "You have already submitted an application for this position."
      };
    }

    const newApp = {
      id: "app-" + Date.now(),
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      appliedTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Submitted", // Submitted, Under Review, Interview, Accepted
      ...applicationData
    };

    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    this.notifyChange("applications", { action: "add", application: newApp });

    return {
      success: true,
      application: newApp,
      message: "Application submitted successfully!"
    };
  },

  removeApplication(applicationId) {
    let apps = this.getApplications();
    const target = apps.find(a => a.id === applicationId);
    if (target) {
      apps = apps.filter(a => a.id !== applicationId);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      this.notifyChange("applications", { action: "remove", applicationId });
      return true;
    }
    return false;
  },

  // --- RECENTLY VIEWED JOBS ---
  getRecentlyViewed() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading recently viewed from localStorage", e);
      return [];
    }
  },

  addRecentlyViewed(jobId) {
    if (!jobId) return;
    let list = this.getRecentlyViewed();
    // remove if exists, then prepend
    list = list.filter(id => id !== jobId);
    list.unshift(jobId);
    if (list.length > 8) {
      list = list.slice(0, 8);
    }
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(list));
    this.notifyChange("recently_viewed", { jobId });
  },

  getRecentlyViewedObjects() {
    const ids = this.getRecentlyViewed();
    return ids
      .map(id => SAMPLE_JOBS.find(j => j.id === id))
      .filter(Boolean);
  },

  // --- USER PROFILE ---
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : { ...DEFAULT_PROFILE };
    } catch (e) {
      console.error("Error reading user profile from localStorage", e);
      return { ...DEFAULT_PROFILE };
    }
  },

  saveProfile(profileData) {
    try {
      const current = this.getProfile();
      const updated = { ...current, ...profileData };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      this.notifyChange("user_profile", { profile: updated });
      return true;
    } catch (e) {
      console.error("Error saving user profile to localStorage", e);
      return false;
    }
  },

  // Initialize seed demo data if first visit for smooth demonstration
  initDemoDataIfEmpty() {
    if (!localStorage.getItem("jobfinder_seeded")) {
      // Pre-save 2 jobs so the user immediately sees working state
      this.saveJob("job-101");
      this.saveJob("job-102");
      // Pre-view 3 jobs
      this.addRecentlyViewed("job-101");
      this.addRecentlyViewed("job-103");
      this.addRecentlyViewed("job-105");
      // Add 1 sample application
      this.addApplication({
        jobId: "job-102",
        jobTitle: "Frontend Developer",
        company: "PixelCraft Interactive",
        fullName: DEFAULT_PROFILE.fullName,
        email: DEFAULT_PROFILE.email,
        phone: DEFAULT_PROFILE.phone,
        experience: "3-5 years",
        resumeName: "Alex_Morgan_Resume_2026.pdf",
        resumeSize: "245 KB",
        coverLetter: "I have over 3 years of experience writing clean, semantic HTML5, CSS3, and vanilla JavaScript. I love building intuitive user interfaces that focus on web accessibility and speed."
      });
      localStorage.setItem("jobfinder_seeded", "true");
    }
  },

  // Reset demo data
  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.SAVED_JOBS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem("jobfinder_seeded");
    this.initDemoDataIfEmpty();
    this.notifyChange("reset");
  }
};

// Auto-seed initial demo data on script load
Storage.initDemoDataIfEmpty();
