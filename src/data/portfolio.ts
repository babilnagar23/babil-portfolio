export const personal = {
  name: "Babil",
  lastName: "Nagar",
  logo: "Babil Nagar",
  tagline: "AVAILABLE FOR OPPORTUNITIES · 2026",
  email: "bobilnagar23@gmail.com",
  phone: "+91-7828589139",
  linkedin: "https://www.linkedin.com/in/bobilnagar23",
  github: "https://github.com/bobilnagar",
  location: "Bhopal, Madhya Pradesh",
  gpa: "7.91",
};

export const hero = {
  greeting: "Hi there, I'm",
  role: "Data Science Student",
  bio: "I build modern, scalable web applications and explore the realms of Data Science and AI. Currently studying at VIT Bhopal University.",
};

export const coreInterests = [
  {
    title: "Artificial Intelligence",
    description: "Building intelligent systems and exploring neural networks.",
    icon: "brain",
  },
  {
    title: "Machine Learning",
    description: "Training models and extracting insights from data.",
    icon: "chart",
  },
  {
    title: "Web Development",
    description: "Creating responsive, performant full-stack applications.",
    icon: "code",
  },
  {
    title: "Data Science",
    description: "Analyzing datasets to drive meaningful decisions.",
    icon: "database",
  },
];

export const heroRoles = [
  "Data Science Student",
  "React / Next.js Developer",
  "Student Developer",
  "AI/ML Developer",
  "Open Source Contributor",
];

export const heroDescription =
  "Building **full-stack web apps**, **ML-powered health tools**, and **data-driven products** — from Flask & Django backends to React/Next.js frontends, with open-source contributions through **GirlScript Summer of Code**.";

export const aboutContent = {
  paragraphs: [
    "I'm an **Integrated M.Tech student** in Computer Science & Engineering (Data Science) at VIT Bhopal University with a GPA of **7.91**. I build at the intersection of **web development, data science, and real-world product design**.",
    "My **Medassist** app predicts diseases from symptoms and recommends medications, diets, and workouts. My **Sales & Inventory** system handles billing, invoicing, and stock with Django & Docker. **Campus 2 Cash** — a hackathon project — helps students monetize academic ideas using AI-driven analysis.",
    "Beyond code, I'm active on campus as a **Discipline Committee member**, **Data Science Club** team member, and contributor to **GirlScript Summer of Code**.",
  ],
};

export const heroStats: Array<{
  id: string;
  value: number | string;
  suffix: string;
  label: string;
  animate: boolean;
}> = [
  { id: "projects", value: 6, suffix: "+", label: "PROJECTS BUILT", animate: true },
  { id: "gssoc", value: 2, suffix: "×", label: "GSSoC CONTRIBUTOR", animate: true },
  { id: "gpa", value: "7.91", suffix: "", label: "GPA / VIT BHOPAL", animate: false },
  { id: "stack", value: "4", suffix: "+", label: "CORE STACKS", animate: false },
];

export const aboutCards = [
  {
    label: "DEGREE",
    value: "Int. M.Tech — CSE",
    sub: "Data Science · VIT Bhopal",
  },
  {
    label: "INSTITUTION",
    value: "VIT Bhopal University",
    sub: "GPA: 7.91 / 10 · 2023 – Present",
  },
  {
    label: "LOCATION",
    value: "Bhopal, Madhya Pradesh",
    sub: "Open to relocation & remote",
  },
  {
    label: "SEEKING",
    value: "SDE · Full Stack · Data Analyst",
    sub: "Fresher / Intern · Full-time · India",
  },
];

export const skillCategories = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "Java", highlight: true },
      { name: "Python", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "TypeScript", highlight: true },
    ],
  },
  {
    title: "FRONTEND",
    skills: [
      { name: "HTML5", highlight: true },
      { name: "CSS3", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "React.js", highlight: true },
      { name: "Next.js", highlight: true },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Django", highlight: true },
      { name: "Flask", highlight: true },
      { name: "REST APIs", highlight: false },
    ],
  },
  {
    title: "DATA & ML",
    skills: [
      { name: "Jupyter", highlight: false },
      { name: "Pandas", highlight: false },
      { name: "Scikit-learn", highlight: false },
      { name: "Data Analysis", highlight: true },
      { name: "MATLAB", highlight: false },
    ],
  },
  {
    title: "DATABASES",
    skills: [
      { name: "SQL", highlight: true },
    ],
  },
  {
    title: "TOOLS & DEVOPS",
    skills: [
      { name: "Git", highlight: true },
      { name: "GitHub", highlight: true },
      { name: "GitHub Actions", highlight: false },
      { name: "Docker", highlight: false },
      { name: "Vercel", highlight: false },
      { name: "VS Code", highlight: false },
    ],
  },
];

export const experience = {
  sectionTag: "OPEN SOURCE & COMMUNITY",
  sectionTitle: { plain: "Beyond ", em: "Code" },
  role: "Open Source & Campus Contributor",
  org: "GIRLSCRIPT · VIT BHOPAL",
  date: "2023 – 2026",
  bullets: [
    "Contributor to **GirlScript Summer of Code** (2026), collaborating on open-source projects and improving real-world codebases.",
    "**Discipline Committee Member** for Advitya 2023–24 and Vivan 2023 at VIT Bhopal.",
    "Team Member, **Data Science Club** and **Central India Club**.", "Organizing Team Member for **Convocation 2023**.",
    "Completed **7-day Annual NSS Camp**, building leadership and community engagement skills.",
  ],
};

export const projects = [
  {
    number: "01",
    category: "ML · HEALTHCARE",
    title: "Medassist — Medical Recommendation System",
    url: "https://github.com/bobilnagar/Medassist",
    stack: "Python · Flask · HTML · CSS · Jupyter · Machine Learning",
    bullets: [
      "Flask-based medical recommendation web app that **predicts diseases** from user-entered symptoms using ML models.",
      "Provides personalized recommendations for **medications, precautions, diets, and workouts**.",
      "User-friendly interface for seamless symptom input and **real-time health insights**.",
    ],
    tags: ["Flask", "ML", "Healthcare"],
  },
  {
    number: "02",
    category: "FULL-STACK · BUSINESS",
    title: "Sales & Inventory Management System",
    url: "https://github.com/bobilnagar/Sales_and_inventory_management",
    stack: "Django · HTML · CSS · JavaScript · Bootstrap · Ajax · Docker",
    bullets: [
      "Django-based system with **Bootstrap and Ajax** for a seamless user experience.",
      "User profiles, **vendor/customer management**, billing, invoicing, and inventory tracking.",
      "**Docker-based deployment** for production-ready delivery.",
    ],
    tags: ["Django", "Docker", "Inventory"],
  },
  {
    number: "03",
    category: "HACKATHON · NEXT.JS",
    title: "Campus 2 Cash",
    url: "https://github.com/bobilnagar/campus-2-cash",
    stack: "Next.js · React · Tailwind CSS · API Integration · TypeScript",
    bullets: [
      "Hackathon project helping students **convert academic projects into monetizable ideas** using AI-based analysis.",
      "Evaluates project value, suggests **revenue streams, target users, and pricing strategies**.",
      "Responsive UI with Next.js and Tailwind CSS; **local storage** for lightweight performance.",
    ],
    tags: ["Next.js", "Hackathon", "AI"],
  },

];

export const certifications = [
  {
    name: "Google IT Support Professional Certificate",
    issuer: "Coursera",
    year: "2025",
    url: "https://drive.google.com/file/d/1AnjLbM-IUerJdRf5uXY1v3NWKVgDdzz8/view?usp=drivesdk",
    icon: "google",
  },
  {
    name: "GirlScript Summer of Code Contributor",
    issuer: "GSSoC",
    year: "2026",
    url: "https://drive.google.com/file/d/1p7-_yNQGhjaTN3jV3ofdQ3KxD1-yg3AP/view?usp=drivesdk",
    icon: "girlscript",
  },
  {
    name: "NPTEL — Cloud Computing",
    issuer: "IIT / NPTEL",
    year: "2024",
    url: null,
    icon: "cloud",
  },
  {
    name: "Fundamentals of AI and Machine Learning",
    issuer: "Vityarthi",
    year: "2024",
    url: null,
    icon: "brain",
  },
  {
    name: "MATLAB Onramp",
    issuer: "MathWorks",
    year: "2024",
    url: null,
    icon: "matlab",
  },
  {
    name: "NSS Camp",
    issuer: "VIT Bhopal University",
    year: "2025",
    url: "https://drive.google.com/file/d/1lGVmlcibkjxkmVjWhU6N5J6JBFI0D0h0/view?usp=drivesdk",
    icon: "heart",
  },
  
];

export const education = [
  {
    degree: "Integrated M.Tech — Computer Science & Engineering",
    specialization: "Data Science",
    school: "VIT Bhopal University, Bhopal",
    period: "2023 – PRESENT",
    score: "7.91",
    scoreLabel: "GPA/10",
    main: true,
  },
  {
    degree: "Higher Secondary (Class XII) — CBSE",
    specialization: "Science",
    school: "Chavara Vidhya Bhavan HR SEC School, Raisen, MP",
    period: "2020 – 2022",
    score: "71.2%",
    scoreLabel: "",
    main: false,
  },
  {
    degree: "High School (Class X) — CBSE",
    specialization: "",
    school: "Chavara Vidhya Bhavan HR SEC School, Raisen, MP",
    period: "2018 – 2020",
    score: "81.5%",
    scoreLabel: "",
    main: false,
  },
];

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const footer = {
  tagline:
    "Building modern, scalable web applications and exploring the realms of Data Science and AI.",
};
