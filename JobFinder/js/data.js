/**
 * JobFinder - Sample Job Data & Static Collections
 * Contains realistic job listings across major tech disciplines,
 * categories, and default configurations.
 */

const SAMPLE_JOBS = [
  {
    id: "job-101",
    title: "Senior Python Developer",
    company: "DataStream Analytics",
    companyLogo: "DS",
    logoColor: "#1e3a8a",
    location: "Austin, TX",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    salary: { min: 130000, max: 165000, currency: "$", period: "year" },
    postedDaysAgo: 2,
    urgent: true,
    featured: true,
    rating: 4.6,
    reviewsCount: 142,
    tags: ["Python", "Django", "FastAPI", "PostgreSQL", "AWS"],
    description: "DataStream Analytics is seeking an experienced Senior Python Developer to design, scale, and maintain high-throughput streaming pipelines and microservices for our enterprise analytics platform.",
    responsibilities: [
      "Architect and build robust RESTful and gRPC APIs using Python, FastAPI, and Django.",
      "Design and optimize relational and NoSQL database schemas using PostgreSQL and Redis.",
      "Collaborate with data engineers to ingest, transform, and serve petabyte-scale telemetry data.",
      "Mentor mid-level engineers, conduct comprehensive code reviews, and drive engineering excellence.",
      "Ensure system reliability through automated testing, CI/CD pipelines, and proactive monitoring."
    ],
    requirements: [
      "5+ years of production experience with Python and asynchronous programming.",
      "Strong proficiency with frameworks such as FastAPI, Flask, or Django.",
      "In-depth knowledge of database design, query optimization, and transaction isolation.",
      "Familiarity with cloud platforms (AWS or GCP), Docker, and Kubernetes.",
      "Bachelor's degree in Computer Science, Software Engineering, or equivalent experience."
    ],
    qualifications: [
      "Experience with Kafka, RabbitMQ, or Celery task queues.",
      "Background in building high-availability distributed systems.",
      "Contributions to open-source software are a plus."
    ],
    benefits: [
      "Comprehensive medical, dental, and vision insurance",
      "401(k) retirement plan with 5% company match",
      "Flexible PTO and paid parental leave",
      "$2,000 annual learning & development stipend",
      "Home office setup reimbursement"
    ]
  },
  {
    id: "job-102",
    title: "Frontend Developer",
    company: "PixelCraft Interactive",
    companyLogo: "PC",
    logoColor: "#2563eb",
    location: "San Francisco, CA",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 105000, max: 135000, currency: "$", period: "year" },
    postedDaysAgo: 1,
    urgent: false,
    featured: true,
    rating: 4.8,
    reviewsCount: 89,
    tags: ["JavaScript", "HTML5", "CSS3", "Web Performance", "Accessibility"],
    description: "Join PixelCraft to build pixel-perfect, accessible, and blazing-fast user interfaces for next-generation SaaS productivity tools.",
    responsibilities: [
      "Implement responsive, user-friendly client interfaces from UX design prototypes.",
      "Optimize web pages for maximum speed, scalability, and cross-browser compatibility.",
      "Maintain design systems and component libraries ensuring WCAG AA accessibility standards.",
      "Collaborate closely with UI/UX designers and backend developers to deliver seamless features.",
      "Write clean, modular, and maintainable vanilla JavaScript, CSS, and modern web code."
    ],
    requirements: [
      "3+ years of professional front-end web development experience.",
      "Expert understanding of semantic HTML5, modern CSS3 (Flexbox, Grid), and Vanilla JavaScript (ES6+).",
      "Strong grasp of browser rendering mechanisms, event loops, and DOM manipulation.",
      "Experience creating responsive, mobile-first web designs.",
      "Familiarity with Git version control and modern build tools."
    ],
    qualifications: [
      "Experience with Web Audio API, Canvas, or SVG animations.",
      "Demonstrated portfolio of responsive web applications.",
      "Deep care for UI micro-interactions and smooth transitions."
    ],
    benefits: [
      "100% remote work flexibility within US timezones",
      "Full health, dental, and vision coverage",
      "Annual company retreats in international locations",
      "Wellness allowance for gym or fitness classes"
    ]
  },
  {
    id: "job-103",
    title: "Backend Developer (Java)",
    company: "Apex Financial Core",
    companyLogo: "AF",
    logoColor: "#059669",
    location: "New York, NY",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    salary: { min: 140000, max: 175000, currency: "$", period: "year" },
    postedDaysAgo: 3,
    urgent: true,
    featured: true,
    rating: 4.4,
    reviewsCount: 310,
    tags: ["Java", "Spring Boot", "Microservices", "Kafka", "SQL"],
    description: "Apex Financial Core is building the backbone of modern fintech payments. We need a seasoned Java Backend Developer to engineer ultra-reliable transaction engines.",
    responsibilities: [
      "Develop mission-critical banking services utilizing Java 17+, Spring Boot, and Hibernate.",
      "Design resilient microservices communicating through Apache Kafka event streams.",
      "Maintain zero-downtime database migrations on large-scale distributed SQL clusters.",
      "Lead security hardening initiatives and compliance audits (SOC2, PCI-DSS).",
      "Troubleshoot low-latency concurrency issues and optimize JVM garbage collection."
    ],
    requirements: [
      "6+ years of backend engineering experience with enterprise Java.",
      "Deep expertise with Spring Framework (Spring Boot, Spring Security, Spring Cloud).",
      "Experience designing relational databases and high-concurrency transaction handling.",
      "Proficiency with event-driven architectures and message brokers like Kafka or RabbitMQ.",
      "Strong understanding of secure coding practices."
    ],
    qualifications: [
      "Prior financial services, payments, or banking software experience.",
      "Hands-on experience with Docker, Kubernetes, and Helm charts."
    ],
    benefits: [
      "Competitive base salary plus performance annual bonus",
      "Comprehensive healthcare with employer HSA contribution",
      "Subsidized commuter benefits and gym membership",
      "Generous 401(k) matching up to 6%"
    ]
  },
  {
    id: "job-104",
    title: "Full Stack Developer",
    company: "CloudScale Technologies",
    companyLogo: "CS",
    logoColor: "#7c3aed",
    location: "Chicago, IL",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 110000, max: 140000, currency: "$", period: "year" },
    postedDaysAgo: 5,
    urgent: false,
    featured: false,
    rating: 4.5,
    reviewsCount: 76,
    tags: ["JavaScript", "Node.js", "Python", "REST APIs", "PostgreSQL"],
    description: "CloudScale is looking for an agile Full Stack Developer to help deliver end-to-end cloud infrastructure monitoring dashboards.",
    responsibilities: [
      "Develop both customer-facing UI workflows and back-end integration endpoints.",
      "Build modular client components and maintain backend services in Node.js and Python.",
      "Integrate third-party cloud monitoring APIs (AWS CloudWatch, Datadog, Prometheus).",
      "Implement comprehensive end-to-end and unit testing suites.",
      "Participate in sprint planning, retrospectives, and architecture workshops."
    ],
    requirements: [
      "3+ years of full-stack web application development experience.",
      "Proficient in JavaScript/TypeScript across both front and back-end environments.",
      "Hands-on experience with SQL queries, relational modeling, and caching mechanisms.",
      "Familiarity with containerized workflows using Docker.",
      "Excellent communication and collaboration skills."
    ],
    qualifications: [
      "Experience building real-time dashboards with WebSockets.",
      "Familiarity with cloud security fundamentals."
    ],
    benefits: [
      "Catered lunches daily in our Downtown Chicago office",
      "Top-tier health coverage with $0 deductible options",
      "Commuter transit passes provided",
      "Annual tech gadget upgrade stipend"
    ]
  },
  {
    id: "job-105",
    title: "UI/UX Designer",
    company: "Luminary Digital Studio",
    companyLogo: "LD",
    logoColor: "#db2777",
    location: "Seattle, WA",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Design",
    salary: { min: 95000, max: 125000, currency: "$", period: "year" },
    postedDaysAgo: 1,
    urgent: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 58,
    tags: ["Figma", "UI/UX", "User Research", "Wireframing", "Design Systems"],
    description: "Design elegant, human-centric software interfaces that delight millions of daily users across mobile and desktop platforms.",
    responsibilities: [
      "Conduct user research, usability testing sessions, and translate insights into wireframes.",
      "Create high-fidelity interactive prototypes, user journeys, and component specifications.",
      "Expand and govern our multi-brand design system in Figma.",
      "Partner closely with frontend engineers to review implemented designs for fidelity.",
      "Advocate for user empathy, visual clarity, and accessibility throughout the product lifecycle."
    ],
    requirements: [
      "3+ years of experience designing complex web and mobile user interfaces.",
      "Mastery of Figma, including auto-layout, design tokens, and interactive prototyping.",
      "Strong understanding of user-centered design principles and usability testing.",
      "Portfolio showcasing end-to-end design processes, problem solving, and visual polish.",
      "Working familiarity with HTML and CSS constraints to collaborate effectively with engineers."
    ],
    qualifications: [
      "Experience designing for enterprise B2B SaaS products.",
      "Motion design skills (Lottie, After Effects, or Principle)."
    ],
    benefits: [
      "Flexible schedule with asynchronous communication focus",
      "Full home studio hardware kit (MacBook Pro + 4K Display)",
      "Generous health, dental, and eye care",
      "Annual wellness and book stipend"
    ]
  },
  {
    id: "job-106",
    title: "Data Analyst",
    company: "OmniMetrics Insights",
    companyLogo: "OM",
    logoColor: "#0284c7",
    location: "Boston, MA",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Entry Level",
    category: "Data",
    salary: { min: 75000, max: 95000, currency: "$", period: "year" },
    postedDaysAgo: 4,
    urgent: false,
    featured: false,
    rating: 4.3,
    reviewsCount: 115,
    tags: ["SQL", "Python", "Tableau", "Excel", "Data Visualization"],
    description: "Kickstart your analytics career at OmniMetrics! Help marketing, sales, and product leaders make data-backed business decisions.",
    responsibilities: [
      "Extract, clean, and validate business data from relational databases using complex SQL queries.",
      "Design intuitive automated dashboards in Tableau and PowerBI for executive leadership.",
      "Conduct cohort analysis, customer retention modeling, and conversion funnel audits.",
      "Automate recurring reporting workflows using Python and scheduling tools.",
      "Present actionable business findings clearly to non-technical stakeholders."
    ],
    requirements: [
      "1-2 years of analytical experience or strong academic coursework with real projects.",
      "Advanced SQL skills (joins, window functions, aggregations, subqueries).",
      "Working knowledge of Python (Pandas, NumPy) for data wrangling.",
      "Experience with visualization tools like Tableau, Power BI, or Looker.",
      "Bachelor's degree in Economics, Statistics, Mathematics, or related field."
    ],
    qualifications: [
      "Familiarity with A/B testing methodologies and statistical significance.",
      "Certifications in SQL or Tableau are a plus."
    ],
    benefits: [
      "Dedicated mentorship from Principal Data Scientists",
      "Comprehensive medical insurance plan",
      "Tuition assistance for advanced technical degrees",
      "401(k) matching up to 4%"
    ]
  },
  {
    id: "job-107",
    title: "Machine Learning Engineer",
    company: "NeuralMatrix AI",
    companyLogo: "NM",
    logoColor: "#9333ea",
    location: "San Jose, CA",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    salary: { min: 155000, max: 210000, currency: "$", period: "year" },
    postedDaysAgo: 2,
    urgent: true,
    featured: true,
    rating: 4.7,
    reviewsCount: 94,
    tags: ["Python", "PyTorch", "MLOps", "NLP", "Computer Vision"],
    description: "NeuralMatrix AI is pushing the frontiers of applied machine learning. We need an ML Engineer to take novel deep learning models from research prototype to production scale.",
    responsibilities: [
      "Train, fine-tune, and evaluate deep learning architectures (Transformers, CNNs) using PyTorch.",
      "Build scalable MLOps pipelines for model tracking, automated evaluation, and low-latency inference.",
      "Optimize models for inference throughput via quantization, ONNX, and TensorRT.",
      "Collaborate with backend infrastructure teams to deploy models via Triton Inference Server.",
      "Monitor deployed models for data drift, feature decay, and latency anomalies."
    ],
    requirements: [
      "4+ years of hands-on experience developing and deploying machine learning models.",
      "Proficient in Python, PyTorch or TensorFlow, and scientific computing stacks.",
      "Strong understanding of MLOps best practices (MLflow, Kubeflow, or Weights & Biases).",
      "Solid foundation in linear algebra, probability, and optimization algorithms.",
      "Master's or Ph.D. in Computer Science, Machine Learning, or equivalent."
    ],
    qualifications: [
      "Published research in peer-reviewed conferences (NeurIPS, CVPR, ICML) is a huge plus.",
      "Experience scaling inference across distributed GPU clusters."
    ],
    benefits: [
      "Substantial equity package in high-growth startup",
      "Premium health, dental, and vision insurance (100% paid)",
      "Daily gourmet meals and artisanal coffee bar",
      "Flexible work schedule with collaborative sprint cycles"
    ]
  },
  {
    id: "job-108",
    title: "Web Developer (Internship)",
    company: "BrightSpark Media",
    companyLogo: "BM",
    logoColor: "#ea580c",
    location: "Atlanta, GA",
    workMode: "Remote",
    jobType: "Internship",
    experienceLevel: "Entry Level",
    category: "Engineering",
    salary: { min: 45000, max: 55000, currency: "$", period: "year" },
    postedDaysAgo: 3,
    urgent: false,
    featured: false,
    rating: 4.6,
    reviewsCount: 37,
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
    description: "A paid 6-month web development internship designed to provide real-world client project experience, mentorship, and career growth.",
    responsibilities: [
      "Assist in building responsive landing pages, campaign microsites, and newsletters.",
      "Implement animations, interactive forms, and navigation menus using HTML, CSS, and JS.",
      "Perform quality assurance testing across modern mobile and desktop browsers.",
      "Update content management systems and documentation under senior developer guidance.",
      "Participate in daily standup meetings and peer code review sessions."
    ],
    requirements: [
      "Working knowledge of HTML5, CSS3, and basic JavaScript.",
      "Strong desire to learn modern web standards and professional workflows.",
      "Familiarity with Git commands (clone, branch, commit, push, pull request).",
      "Enrolled in or recent graduate of a Computer Science, Bootcamp, or self-taught program.",
      "Enthusiasm, curiosity, and proactive communication."
    ],
    qualifications: [
      "A personal portfolio or GitHub account demonstrating sample projects.",
      "Basic understanding of SEO principles and mobile responsiveness."
    ],
    benefits: [
      "Paid hourly internship with structured 40-hour work week",
      "One-on-one weekly coaching with a Senior Staff Engineer",
      "Direct pathway to a full-time Junior Developer position upon completion",
      "Remote office hardware provided"
    ]
  },
  {
    id: "job-109",
    title: "Software Engineer (DevOps & Infrastructure)",
    company: "Vanguard Systems",
    companyLogo: "VS",
    logoColor: "#0d9488",
    location: "Denver, CO",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 115000, max: 145000, currency: "$", period: "year" },
    postedDaysAgo: 6,
    urgent: false,
    featured: false,
    rating: 4.5,
    reviewsCount: 162,
    tags: ["Kubernetes", "Terraform", "Docker", "AWS", "CI/CD"],
    description: "Help scale and automate enterprise cloud infrastructure powering 99.99% uptime guarantees for global clients.",
    responsibilities: [
      "Manage and orchestrate multi-region Kubernetes clusters in AWS and GCP.",
      "Codify cloud infrastructure using Terraform and Ansible.",
      "Construct efficient CI/CD delivery pipelines in GitHub Actions and GitLab.",
      "Implement observability tooling using Prometheus, Grafana, and OpenTelemetry.",
      "Participate in an on-call rotation and conduct blameless post-mortem retrospectives."
    ],
    requirements: [
      "3+ years in DevOps, Site Reliability, or Systems Engineering roles.",
      "Strong experience administering Linux systems and Docker containers.",
      "Proficient in Terraform for Infrastructure as Code (IaC).",
      "Solid scripting ability in Bash or Python.",
      "Understanding of networking (TCP/IP, DNS, TLS, load balancing)."
    ],
    qualifications: [
      "AWS Certified Solutions Architect or CKA certification.",
      "Experience with zero-trust networking architectures."
    ],
    benefits: [
      "Hybrid work schedule (2 days in our downtown Denver hub)",
      "Ski pass reimbursement and outdoor gear stipend",
      "Full health/dental/vision with low copays",
      "401(k) with 4.5% immediate vesting match"
    ]
  },
  {
    id: "job-110",
    title: "Product Manager (Technical)",
    company: "Horizon Health Tech",
    companyLogo: "HH",
    logoColor: "#e11d48",
    location: "Dallas, TX",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Product",
    salary: { min: 135000, max: 170000, currency: "$", period: "year" },
    postedDaysAgo: 4,
    urgent: false,
    featured: true,
    rating: 4.3,
    reviewsCount: 88,
    tags: ["Product Strategy", "Agile", "Roadmapping", "Healthcare APIs", "Analytics"],
    description: "Guide the vision, strategy, and execution for our patient-centric telemedicine platform connecting millions with healthcare providers.",
    responsibilities: [
      "Define and prioritize the product backlog for clinical integration features.",
      "Work closely with engineering leads and UX designers to produce detailed user stories.",
      "Analyze platform telemetry, clinical retention metrics, and provider satisfaction data.",
      "Coordinate product launches across sales, legal compliance, and customer support teams.",
      "Conduct customer discovery interviews with medical directors and hospital administrators."
    ],
    requirements: [
      "4+ years of product management experience within B2B SaaS or HealthTech.",
      "Proven track record of managing products through all phases of the product life cycle.",
      "Strong technical literacy enabling effective communication with software engineers.",
      "Familiarity with Agile Scrum frameworks, sprint planning, and backlog grooming.",
      "Bachelor's degree or equivalent practical experience."
    ],
    qualifications: [
      "Experience navigating HIPAA, FDA, or HITRUST regulatory compliance.",
      "Strong presentation skills to executive-level audiences."
    ],
    benefits: [
      "Full employer-sponsored healthcare benefits",
      "Onsite fitness center and daycare services",
      "Annual education and executive coaching budget",
      "Generous paid time off and sabbatical after 4 years"
    ]
  },
  {
    id: "job-111",
    title: "Python Automation Engineer (Contract)",
    company: "Automata Labs",
    companyLogo: "AL",
    logoColor: "#ca8a04",
    location: "Phoenix, AZ",
    workMode: "Remote",
    jobType: "Contract",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 90000, max: 120000, currency: "$", period: "year" },
    postedDaysAgo: 7,
    urgent: true,
    featured: false,
    rating: 4.2,
    reviewsCount: 45,
    tags: ["Python", "Selenium", "Pytest", "REST APIs", "Automation"],
    description: "6-month renewable contract for a Python QA & Automation Engineer to build automated regression suites and integration harnesses.",
    responsibilities: [
      "Develop comprehensive automated test scripts using Python, Pytest, and Playwright.",
      "Build mock API services to enable isolated continuous integration tests.",
      "Integrate regression suites into automated pull-request validation pipelines.",
      "Log, track, and verify software defects in Jira with reproducible steps.",
      "Work with developers to establish quality gates and code coverage benchmarks."
    ],
    requirements: [
      "3+ years of software test automation experience using Python.",
      "Experience testing complex web applications and REST APIs.",
      "Working knowledge of Git, CI/CD runners, and headless browser automation.",
      "Detail-oriented mindset with a passion for software quality and stability."
    ],
    qualifications: [
      "Experience with performance testing tools such as Locust or k6.",
      "Knowledge of contract testing tools like Pact."
    ],
    benefits: [
      "Competitive hourly contract rate ($50 - $65/hr equivalent)",
      "100% remote flexibility",
      "Potential for conversion to full-time permanent role"
    ]
  },
  {
    id: "job-112",
    title: "Java Developer (Microservices)",
    company: "Nexus Retail Solutions",
    companyLogo: "NR",
    logoColor: "#4f46e5",
    location: "Minneapolis, MN",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 105000, max: 130000, currency: "$", period: "year" },
    postedDaysAgo: 3,
    urgent: false,
    featured: false,
    rating: 4.4,
    reviewsCount: 120,
    tags: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Docker"],
    description: "Nexus Retail powers omnichannel checkout and fulfillment for 40+ leading global retail brands.",
    responsibilities: [
      "Develop microservices handling inventory synchronization and order processing.",
      "Implement REST and GraphQL endpoints backed by Spring Boot and JPA.",
      "Write unit and integration tests using JUnit 5, Mockito, and Testcontainers.",
      "Refactor legacy monolithic services into lean containerized microservices.",
      "Participate in bi-weekly sprint demos and collaborative architectural reviews."
    ],
    requirements: [
      "3+ years of Java development experience (Java 11 or higher).",
      "Solid knowledge of Spring Boot, Spring Data, and relational SQL.",
      "Experience working with RESTful web services and JSON payloads.",
      "Familiarity with Git branching strategies and pull request workflows."
    ],
    qualifications: [
      "Understanding of event streaming with Kafka or RabbitMQ.",
      "Experience with Redis caching for high-load eCommerce stores."
    ],
    benefits: [
      "Generous retail merchandise discounts across 40+ brands",
      "Flexible hybrid working schedule (2 days in office)",
      "401(k) with 5% employer contribution",
      "Tuition reimbursement for certifications"
    ]
  },
  {
    id: "job-113",
    title: "Senior Full Stack Engineer",
    company: "Evergreen Cloud",
    companyLogo: "EC",
    logoColor: "#15803d",
    location: "Seattle, WA",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    salary: { min: 145000, max: 185000, currency: "$", period: "year" },
    postedDaysAgo: 1,
    urgent: true,
    featured: true,
    rating: 4.8,
    reviewsCount: 198,
    tags: ["JavaScript", "Python", "Cloud Architecture", "PostgreSQL", "React/Vanilla"],
    description: "Looking for an engineering leader who loves owning customer-facing systems from CSS nuances to database indexing.",
    responsibilities: [
      "Architect and ship full-stack web capabilities from end to end.",
      "Lead technical design discussions and document system blueprints.",
      "Ensure web performance, security, and scalability across the stack.",
      "Drive standard development patterns and mentor junior and mid-level colleagues.",
      "Partner with product managers to scope and break down ambitious roadmaps."
    ],
    requirements: [
      "6+ years of full-stack engineering experience building complex web apps.",
      "Expert knowledge of modern JavaScript, HTML/CSS, and backend languages (Python or Node).",
      "Deep understanding of relational database modeling, indexing, and tuning.",
      "Experience deploying and operating applications on AWS or similar clouds."
    ],
    qualifications: [
      "History of leading small technical teams or acting as a tech lead.",
      "Experience with zero-downtime database migrations."
    ],
    benefits: [
      "Full remote freedom with home office setup budget",
      "Unlimited paid time off with mandatory 3-week minimum",
      "Comprehensive medical, dental, and vision for employee and dependents",
      "Competitive stock option grants"
    ]
  },
  {
    id: "job-114",
    title: "Lead UI/UX Designer & Researcher",
    company: "DesignSphere Agency",
    companyLogo: "DS",
    logoColor: "#c026d3",
    location: "New York, NY",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Lead",
    category: "Design",
    salary: { min: 150000, max: 185000, currency: "$", period: "year" },
    postedDaysAgo: 4,
    urgent: false,
    featured: true,
    rating: 4.9,
    reviewsCount: 74,
    tags: ["Design Leadership", "Figma", "User Research", "Design Systems", "Prototyping"],
    description: "Lead design direction for premier digital products, mentor junior designers, and shape our agency's creative methodology.",
    responsibilities: [
      "Lead UX strategy, discovery sprints, and user research for enterprise clients.",
      "Direct the creation of comprehensive design systems, component libraries, and visual guidelines.",
      "Mentor and coach a team of 4 product and visual designers.",
      "Pitch creative concepts and strategic design roadmaps to executive stakeholders.",
      "Partner with engineering teams to ensure impeccable design execution."
    ],
    requirements: [
      "7+ years of digital product design experience with at least 2 years in a leadership role.",
      "Mastery of design tools (Figma, FigJam) and user testing platforms.",
      "Extensive portfolio demonstrating deep UX rigor, visual excellence, and measurable impact.",
      "Superb presentation, storytelling, and client management skills."
    ],
    qualifications: [
      "Experience running generative research and usability testing labs.",
      "Understanding of HTML/CSS capabilities and design tokens."
    ],
    benefits: [
      "Prime Manhattan office with rooftop terrace and catered lunches",
      "Annual creative inspiration travel fund ($3,500)",
      "Top-tier medical coverage with zero employee premiums",
      "Generous profit-sharing bonus"
    ]
  },
  {
    id: "job-115",
    title: "Data Analyst (Marketing & Growth)",
    company: "Velocity Growth Partners",
    companyLogo: "VG",
    logoColor: "#0891b2",
    location: "Los Angeles, CA",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Data",
    salary: { min: 88000, max: 115000, currency: "$", period: "year" },
    postedDaysAgo: 5,
    urgent: false,
    featured: false,
    rating: 4.5,
    reviewsCount: 63,
    tags: ["SQL", "Google Analytics", "Python", "Tableau", "Attribution Modeling"],
    description: "Uncover insights that drive customer acquisition, paid advertising ROI, and lifecycle email conversion.",
    responsibilities: [
      "Analyze multi-channel marketing spend across Google Ads, Meta, TikTok, and affiliates.",
      "Build customer lifetime value (LTV) and multi-touch attribution models.",
      "Design automated self-serve marketing KPI dashboards in Looker or Tableau.",
      "Analyze marketing email engagement and user retention cohorts.",
      "Synthesize complex quantitative findings into clear growth recommendations."
    ],
    requirements: [
      "3+ years of experience in marketing analytics, growth analytics, or business intelligence.",
      "Strong proficiency in SQL querying against large data warehouses (Snowflake, BigQuery).",
      "Hands-on experience with web analytics platforms (GA4, Segment, Mixpanel).",
      "Solid understanding of statistical analysis and experiment design."
    ],
    qualifications: [
      "Experience with Python or R for predictive modeling.",
      "Understanding of marketing pixel tracking and privacy frameworks."
    ],
    benefits: [
      "Fully remote position with flexible schedule",
      "Generous health, dental, vision, and mental wellness coverage",
      "401(k) retirement savings plan with matching",
      "Paid parental leave and family support benefits"
    ]
  },
  {
    id: "job-116",
    title: "Software Engineer (Frontend)",
    company: "AeroTech Avionics",
    companyLogo: "AA",
    logoColor: "#1d4ed8",
    location: "Orlando, FL",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Entry Level",
    category: "Engineering",
    salary: { min: 80000, max: 98000, currency: "$", period: "year" },
    postedDaysAgo: 8,
    urgent: false,
    featured: false,
    rating: 4.1,
    reviewsCount: 84,
    tags: ["JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
    description: "Build flight operations dashboard UIs that deliver mission-critical situational awareness to airline dispatchers.",
    responsibilities: [
      "Develop responsive user interfaces using semantic HTML5, modern CSS, and JavaScript.",
      "Consume RESTful APIs and handle real-time geospatial coordinate updates.",
      "Participate in user testing sessions with pilots and dispatch operators.",
      "Adhere to strict software safety, quality, and documentation standards.",
      "Write unit tests to maintain high code coverage."
    ],
    requirements: [
      "1-2 years of frontend development experience or equivalent project portfolio.",
      "Solid knowledge of JavaScript (ES6+), DOM APIs, and CSS layout models.",
      "Familiarity with version control (Git) and command line tools.",
      "Bachelor's degree in Computer Science or related STEM field."
    ],
    qualifications: [
      "Interest in aviation, flight tracking, or telemetry visualization.",
      "Experience with mapping libraries (Leaflet, Mapbox, or OpenLayers)."
    ],
    benefits: [
      "Discounted air travel and airline partner benefits",
      "9/80 flexible work schedule (every other Friday off)",
      "Comprehensive medical and retirement package",
      "On-site flight simulator training opportunities"
    ]
  },
  {
    id: "job-117",
    title: "Machine Learning Researcher",
    company: "Quantum Intelligence Labs",
    companyLogo: "QI",
    logoColor: "#6d28d9",
    location: "Cambridge, MA",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Lead",
    category: "Engineering",
    salary: { min: 180000, max: 240000, currency: "$", period: "year" },
    postedDaysAgo: 3,
    urgent: false,
    featured: true,
    rating: 4.8,
    reviewsCount: 42,
    tags: ["Deep Learning", "PyTorch", "NLP", "Reinforcement Learning", "Algorithms"],
    description: "Conduct fundamental research in generative reasoning models, attention mechanisms, and safety alignment.",
    responsibilities: [
      "Invent and prototype novel model architectures for complex multi-step reasoning.",
      "Publish seminal research papers at top machine learning conferences.",
      "Collaborate with computing cluster engineers to execute high-scale training runs.",
      "Guide research direction for postdoctoral fellows and research assistants.",
      "Translate theoretical breakthroughs into intellectual property and patents."
    ],
    requirements: [
      "Ph.D. in Computer Science, Machine Learning, Cognitive Science, or Mathematics.",
      "Track record of first-author publications at NeurIPS, ICML, ICLR, or ACL.",
      "Deep mastery of PyTorch and distributed training on GPU supercomputers.",
      "Strong mathematical intuition for optimization, geometry, and information theory."
    ],
    qualifications: [
      "Experience with RLHF, DPO, or constitutional AI techniques.",
      "Previous tenure at an elite industrial AI lab or university faculty."
    ],
    benefits: [
      "Uncapped compute resources and multi-million dollar GPU access",
      "Executive compensation structure with equity participation",
      "Full relocation assistance and housing stipend",
      "Comprehensive family health insurance"
    ]
  },
  {
    id: "job-118",
    title: "Full Stack Web Developer (Part-time)",
    company: "Community Tech Initiative",
    companyLogo: "CT",
    logoColor: "#047857",
    location: "Portland, OR",
    workMode: "Remote",
    jobType: "Part-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 55000, max: 70000, currency: "$", period: "year" },
    postedDaysAgo: 9,
    urgent: false,
    featured: false,
    rating: 4.7,
    reviewsCount: 31,
    tags: ["JavaScript", "HTML/CSS", "Node.js", "Accessibility", "Web Design"],
    description: "Support non-profit community services by maintaining public resource directories, donation portals, and volunteer match boards.",
    responsibilities: [
      "Maintain and enhance existing web applications (20 hours/week).",
      "Implement accessible user workflows meeting WCAG AAA guidelines.",
      "Integrate secure payment gateways for donor contributions (Stripe API).",
      "Provide technical troubleshooting and respond to community bug reports.",
      "Write concise documentation for non-technical community volunteers."
    ],
    requirements: [
      "2+ years of web development experience across front and backend.",
      "Proficiency in vanilla HTML, CSS, JavaScript, and Node.js.",
      "Strong dedication to digital accessibility and civic technology.",
      "Self-directed work ethic with excellent written communication."
    ],
    qualifications: [
      "Previous volunteer or professional non-profit experience.",
      "Familiarity with static site generators and markdown CMS."
    ],
    benefits: [
      "Flexible working hours to fit around existing commitments",
      "Direct positive social and community impact",
      "Hourly compensation with pro-rated paid time off",
      "Remote work from anywhere in North America"
    ]
  },
  {
    id: "job-119",
    title: "Senior Java Software Engineer",
    company: "IronClad Security",
    companyLogo: "IS",
    logoColor: "#be123c",
    location: "Reston, VA",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    salary: { min: 140000, max: 175000, currency: "$", period: "year" },
    postedDaysAgo: 5,
    urgent: false,
    featured: false,
    rating: 4.3,
    reviewsCount: 156,
    tags: ["Java", "Cryptography", "Spring Boot", "Security", "Linux"],
    description: "Engineer enterprise identity federation and zero-trust authentication servers serving federal and defense clients.",
    responsibilities: [
      "Develop secure identity verification microservices in Java 21 and Spring Security.",
      "Implement cryptographic primitives, TLS handshakes, and SAML/OIDC tokens.",
      "Perform static and dynamic security analysis (SAST/DAST) on codebases.",
      "Harden Linux runtime environments and enforce strict security baselines.",
      "Participate in threat modeling sessions and architectural security reviews."
    ],
    requirements: [
      "5+ years of software development experience with Java.",
      "Strong understanding of cryptography, PKI certificates, OAuth2, and OIDC.",
      "Familiarity with secure coding standards (OWASP Top 10, CWE).",
      "US Citizenship required for government security clearance eligibility."
    ],
    qualifications: [
      "Active or prior US Secret/Top Secret clearance is a major advantage.",
      "CISSP or CSSLP certification."
    ],
    benefits: [
      "Security clearance sponsorship and maintenance bonus",
      "Comprehensive medical, prescription, and vision care",
      "Generous 401(k) with 6% dollar-for-dollar match",
      "Flexible schedule and tuition support"
    ]
  },
  {
    id: "job-120",
    title: "Backend Developer (Python & APIs)",
    company: "SwiftLogistics Global",
    companyLogo: "SL",
    logoColor: "#0369a1",
    location: "Houston, TX",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    category: "Engineering",
    salary: { min: 100000, max: 130000, currency: "$", period: "year" },
    postedDaysAgo: 2,
    urgent: true,
    featured: false,
    rating: 4.2,
    reviewsCount: 71,
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "RabbitMQ"],
    description: "Power the freight tracking engine coordinating international cargo shipping containers and rail logistics worldwide.",
    responsibilities: [
      "Design and maintain scalable REST APIs using Python and FastAPI.",
      "Handle high-frequency GPS ping ingestion and geospatial boundary queries.",
      "Model relational tables and optimize complex queries in PostgreSQL.",
      "Integrate EDI cargo manifests and custom carrier partner protocols.",
      "Write automated tests and monitor API latency in production."
    ],
    requirements: [
      "3+ years of backend programming in Python.",
      "Solid experience with asynchronous frameworks (FastAPI, Asyncio).",
      "Comfortable writing SQL queries, indexing, and using ORMs (SQLAlchemy).",
      "Familiarity with message queues (RabbitMQ or Kafka)."
    ],
    qualifications: [
      "Experience with PostGIS for geospatial querying.",
      "Prior logistics or supply-chain software development."
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Full health coverage and company-paid life insurance",
      "Free covered parking in downtown Houston",
      "Relocation reimbursement package"
    ]
  },
  {
    id: "job-121",
    title: "Junior Frontend Developer",
    company: "Elevate Media Works",
    companyLogo: "EM",
    logoColor: "#16a34a",
    location: "Charlotte, NC",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Entry Level",
    category: "Engineering",
    salary: { min: 72000, max: 88000, currency: "$", period: "year" },
    postedDaysAgo: 4,
    urgent: false,
    featured: false,
    rating: 4.5,
    reviewsCount: 49,
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI Design"],
    description: "An exciting opportunity for a hungry Junior Frontend Developer to build polished web apps, interactive landing pages, and email templates.",
    responsibilities: [
      "Transform Figma prototypes into responsive, standards-compliant HTML, CSS, and JS.",
      "Implement animations, modal dialogues, interactive filters, and form validations.",
      "Collaborate with marketing teams to optimize page conversion rates.",
      "Conduct cross-browser testing on mobile, tablet, and desktop screens.",
      "Document reusable UI components for team-wide use."
    ],
    requirements: [
      "1+ years of frontend experience or demonstrably strong coding portfolio.",
      "Deep understanding of semantic HTML5, CSS Flexbox & CSS Grid.",
      "Strong foundation in core JavaScript (DOM manipulation, fetch API, events).",
      "Good aesthetic eye for typography, whitespace, and micro-interactions."
    ],
    qualifications: [
      "Experience building responsive web layouts without CSS frameworks.",
      "Familiarity with SEO best practices and web accessibility."
    ],
    benefits: [
      "Hybrid setup (3 days office, 2 days remote)",
      "Comprehensive medical, dental, and vision insurance",
      "Annual conference and learning budget",
      "Generous paid time off plus 12 company holidays"
    ]
  },
  {
    id: "job-122",
    title: "Lead Systems Architect & Software Engineer",
    company: "Apex HyperScale",
    companyLogo: "AH",
    logoColor: "#4338ca",
    location: "Austin, TX",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Lead",
    category: "Engineering",
    salary: { min: 175000, max: 225000, currency: "$", period: "year" },
    postedDaysAgo: 6,
    urgent: false,
    featured: true,
    rating: 4.9,
    reviewsCount: 112,
    tags: ["Distributed Systems", "Cloud Architecture", "Java", "Python", "Kubernetes"],
    description: "Define the next decade of distributed compute architecture for enterprise hybrid clouds.",
    responsibilities: [
      "Architect multi-tenant distributed systems with high availability across AWS and Azure.",
      "Establish enterprise architectural standards, technology radars, and governance.",
      "Lead cross-functional engineering pods through major platform overhauls.",
      "Evaluate emerging technology solutions and conduct proof-of-concept experiments.",
      "Represent the organization at major industry technology summits."
    ],
    requirements: [
      "8+ years of software engineering experience with 3+ years in architectural leadership.",
      "Proven track record designing systems that scale to millions of concurrent users.",
      "Deep expertise across backend languages (Java, Go, or Python) and distributed databases.",
      "Exceptional communication skills with ability to influence executive stakeholders."
    ],
    qualifications: [
      "Experience architecting disaster recovery and multi-region failover systems.",
      "Master's or Ph.D. in Computer Science or related field."
    ],
    benefits: [
      "Top-tier compensation with generous equity options",
      "Flexible hybrid model in our flagship Austin headquarters",
      "Executive health and wellness screening package",
      "Comprehensive 401(k) with immediate 100% vesting up to 6%"
    ]
  }
];

const JOB_CATEGORIES = [
  { name: "Engineering", icon: "code", count: 14, description: "Software, Frontend, Backend, Full Stack & DevOps" },
  { name: "Design", icon: "palette", count: 2, description: "UI/UX, Product Design, Interaction & Research" },
  { name: "Data", icon: "database", count: 3, description: "Data Analysis, Business Intelligence & MLOps" },
  { name: "Product", icon: "briefcase", count: 1, description: "Product Management, Strategy & Roadmapping" }
];

const POPULAR_SEARCH_TERMS = [
  "Frontend Developer",
  "Python Developer",
  "Full Stack",
  "Remote",
  "Java",
  "UI/UX Designer",
  "Data Analyst",
  "Entry Level"
];

const DEFAULT_PROFILE = {
  fullName: "Alex Morgan",
  headline: "Frontend Web Developer & UI/UX Enthusiast",
  email: "alex.morgan@example.com",
  phone: "(555) 234-5678",
  location: "Austin, TX",
  bio: "Passionate web developer with a strong foundation in modern HTML5, CSS3, and Vanilla JavaScript. Focused on building accessible, high-performance, and visually intuitive digital products.",
  skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "REST APIs", "UI/UX"],
  preferredJobTypes: ["Full-time", "Contract"],
  expectedSalary: "$95,000 - $125,000 / year",
  avatarText: "AM",
  avatarColor: "#2557a7"
};
