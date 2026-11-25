# JobFinder - Modern Job Search Website (Indeed Inspired)

A complete, modern, responsive frontend job search web portal inspired by Indeed. Built strictly using **HTML5**, **CSS3**, and **Vanilla JavaScript** (ES6+), with **Local Storage** for state persistence and zero external framework or backend dependencies.

---

## 📁 Project Architecture & File Organization

```
JobFinder/
│
├── index.html            # Homepage (Hero, search, categories, featured & recent jobs, advice)
├── jobs.html             # Job Search & Filter Page (Multi-filter sidebar, sorting, search, chips)
├── job-details.html      # Job Details Page (Role specs, company info, apply/save actions, similar jobs)
├── saved-jobs.html       # Saved Jobs Page (List bookmarked jobs, search saved, remove actions)
├── applications.html     # Application Page (Form with resume validation, tracking, withdraw simulation)
├── dashboard.html        # Candidate Dashboard (Stats, profile completion, edit modal, skills manager)
│
├── css/
│   ├── style.css         # Theme variables, typography, reset, buttons, cards, toasts, footer
│   ├── jobs.css          # Search filters, layout grid, job cards, job details, badges
│   ├── dashboard.css     # Stats counters, application tables, dropzone, profile modal, skills chips
│   └── responsive.css    # Responsive layouts for tablet, mobile, drawer navigation, touch targets
│
├── js/
│   ├── data.js           # 22+ realistic sample jobs across tech roles, categories, default profile
│   ├── storage.js        # LocalStorage persistence (Saved jobs, applications, recent jobs, profile)
│   ├── main.js           # Navbar active states, mobile toggle, toast notification system, badge counters
│   ├── jobs.js           # Multi-criteria filtering, sorting, real-time search, active chips, URL params
│   ├── job-details.js    # Job lookup by URL ID, specifications rendering, bookmarking, similar jobs
│   ├── saved-jobs.js     # Saved jobs management, instant filter, removal animation
│   ├── applications.js   # Form submission, resume drag & drop, duplicate check, application tracking
│   └── dashboard.js      # Dashboard metrics, interactive skills chips, profile edit modal & persistence
│
└── assets/
    └── images/
```

---

## 🌟 Key Features

### 1. Homepage (`index.html`)
- **Indeed-Inspired Dual Search Bar**: Connected "What" (Job title, keywords, company) and "Where" (Location, Remote) search inputs with direct routing to `jobs.html`.
- **Popular Categories**: Engineering, UI/UX Design, Data & Analytics, and Product Management with direct category filters.
- **Key Portal Metrics**: 15,400+ Active Openings, 4,850+ Verified Tech Employers, 96% Response Rate.
- **Featured & Recently Added Listings**: Rendered dynamically with live save buttons, salary pills, and work mode tags.
- **Career Advice Guides**: Interactive article snippets for interview preparation, ATS resume tips, and compensation negotiations.

### 2. Job Search & Filtering (`jobs.html`)
- **Multi-Filter System**:
  - **Category**: Engineering, Design, Data, Product.
  - **Workplace Type**: Remote, Hybrid, On-site.
  - **Experience Level**: Entry Level (0-2 yrs), Mid Level (3-5 yrs), Senior (5+ yrs), Lead/Architect.
  - **Employment Type**: Full-time, Part-time, Contract, Internship.
  - **Minimum Salary**: Any, $70k+, $100k+, $130k+, $160k+ per year.
- **Dynamic Active Filter Chips**: Displays active filters as dismissible chips with a "Clear all" action.
- **Sorting**: Newest First, Highest Salary, Lowest Salary, and Top Rated Company.
- **Live Search & URL Sync**: Filters automatically parse and respond to URL parameters (`?keyword=...&location=...&category=...`).
- **Mobile Filter Drawer**: Responsive slide-out filter drawer for smaller screens.

### 3. Job Details Page (`job-details.html`)
- Reads selected job ID from URL query parameters (`?id=job-101`).
- **Comprehensive Job Breakdown**: Role overview, key responsibilities, requirements, preferred qualifications, skill tags, and full benefits & perks grid.
- **Employer Profile**: Company rating, reviews count, industry, company size, and founded year.
- **Instant Actions**: "Apply Now" (redirects to pre-filled application form), "Save Job" (toggles saved bookmark with toast feedback), and "Share" (copies link to clipboard).
- **Applied Status Indicator**: Informs candidate if they have already applied for this role.
- **Recently Viewed Tracking**: Automatically registers viewed jobs in Local Storage.
- **Similar Job Recommendations**: Dynamically suggests 3 related jobs based on category and matching skill sets.

### 4. Saved Jobs Page (`saved-jobs.html`)
- Displays all jobs bookmarked by the user.
- Real-time search filter within saved items.
- 1-click removal with smooth fade/scale transition and undo notification.
- Intuitive empty state with quick link to explore active jobs.

### 5. Application Page (`applications.html`)
- **Two Tab Views**: "Submit Application" and "Track Applications".
- **Position Selector**: Dropdown of all available listings; auto-selects if routed from a specific job.
- **Duplicate Prevention**: Detects if an application was already submitted for the selected job and blocks duplicate submission.
- **Resume Drag & Drop**: Frontend file upload with validation for PDF, DOC, and DOCX files up to 5MB.
- **Simulation Disclaimer**: Clearly communicates that applications are simulated and persisted in Local Storage.
- **Application Tracker**: View application status (*Submitted*, *Under Review*, *Interview Scheduled*, *Accepted*), candidate details, attached resume tag, applied date/time, and option to withdraw.

### 6. Candidate Dashboard (`dashboard.html`)
- **Welcome Banner**: Displays user monogram avatar, candidate name, headline, contact information, and an interactive profile completeness meter.
- **Live Metric Widgets**: Saved jobs count, applied positions count, recently viewed count, and matching roles count.
- **Profile Editor Modal**: Edit candidate name, headline, email, phone, location, target salary, and summary bio with immediate Local Storage persistence.
- **Interactive Skills Manager**: Add new skill chips and remove existing ones with instant feedback.
- **Quick Overviews**: Saved positions preview and recently viewed cards.
- **Reset Demo Data**: Easily reset Local Storage to pristine sample state for demonstration testing.

---

## 🚀 How to Run the Project

Since this project uses only standard HTML5, CSS3, and Vanilla JavaScript, no build steps or dependencies are needed!

### Option A: Open Directly in Any Web Browser
Double-click `index.html` (or right-click &rarr; Open with Chrome, Edge, Safari, or Firefox).

### Option B: Using a Lightweight Local Web Server
If you prefer running via a local development server:

```bash
# Python 3
cd JobFinder
python -m http.server 8000

# Open in browser: http://localhost:8000
```
