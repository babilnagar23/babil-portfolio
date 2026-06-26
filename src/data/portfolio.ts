export const personal = {
  name: "Babil",
  lastName: "Nagar",
  logo: "Babil Nagar",
  tagline: "AVAILABLE FOR OPPORTUNITIES · 2026",
  email: "bobilnagar23@gmail.com",
  phone: "+91-7828589139",
  linkedin: "https://www.linkedin.com/in/babil-nagar-dev",
  github: "https://github.com/babilnagar23",
  location: "Bhopal, Madhya Pradesh",
  gpa: "8.21",
  cv: "/Babil_nagar_resume_in.pdf",
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
    "I'm an **Integrated M.Tech student** in Computer Science & Engineering (Data Science) at VIT Bhopal University with a GPA of **8.21**. I build at the intersection of **web development, data science, and real-world product design**.",
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
  { id: "gpa", value: "8.21", suffix: "", label: "GPA / VIT BHOPAL", animate: false },
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
    sub: "GPA: 8.21 / 10 · 2023 – Present",
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
      { name: "Java", icon: "FaJava", color: "#007396" },
      { name: "Python", icon: "SiPython", color: "#3776AB" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
    ],
  },
  {
    title: "FRONTEND",
    skills: [
      { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS3", icon: "FaCss3Alt", color: "#1572B6" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "React.js", icon: "SiReact", color: "#61DAFB" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
      { name: "Django", icon: "SiDjango", color: "#092E20" },
      { name: "REST APIs", icon: "TbApi", color: "#007ACC" },
    ],
  },
  {
    title: "DATA & ML",
    skills: [
      { name: "Jupyter", icon: "SiJupyter", color: "#F37626" },
      { name: "Pandas", icon: "SiPandas", color: "#150458" },
      { name: "Scikit-learn", icon: "SiScikitlearn", color: "#F7931E" },
      { name: "Data Analysis", icon: "FaChartBar", color: "#FFB020" },
      { name: "MATLAB", icon: "TbMath", color: "#0076A8" },
    ],
  },
  {
    title: "DATABASES",
    skills: [
      { name: "SQL", icon: "FaDatabase", color: "#4479A1" },
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
      { name: "SQLite", icon: "SiSqlite", color: "#003B57" },
    ],
  },
  {
    title: "TOOLS & DEVOPS",
    skills: [
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
      { name: "GitHub Actions", icon: "SiGithubactions", color: "#2088FF" },
      { name: "Docker", icon: "SiDocker", color: "#2496ED" },
      { name: "Vercel", icon: "SiVercel", color: "#FFFFFF" },
      { name: "Render", icon: "SiRender", color: "#46E3B7" },
      { name: "VS Code", icon: "VscVscode", color: "#007ACC" },
    ],
  },
];

export const experience = {
  sectionTag: "OPEN SOURCE & COMMUNITY",
  sectionTitle: { plain: "Beyond ", em: "Code" },
  role: "Open Source & Campus Contributor",
  org: ["GIRLSCRIPT · VIT BHOPAL , ", " JPMorgan Chase & Co."],
  badge: "Current",
  date: "2023 – 2026",
  bullets: [
    "Contributor to **GirlScript Summer of Code** (2026), collaborating on open-source projects and improving real-world codebases.",
    "Completed the **Software Engineering** Job Simulation by **JPMorgan Chase & Co.** via Forage, working with Spring Boot, REST APIs, Apache Kafka, SQL, and backend microservice development.",
    "**Discipline Committee Member** for Advitya 2023–24 and Vivan 2023 at VIT Bhopal.",
    "Team Member, **Data Science Club** and **Central India Club**.", "Organizing Team Member of **Convocation 2023, VIT Bhopal**.",
    "Completed **7-day Annual NSS Camp**, building leadership and community engagement skills.",
  ],
};

export const projects = [
  {
    number: "01",
    category: "ML · HEALTHCARE",
    title: "Medassist — Medical Recommendation System",
    url: "https://github.com/babilnagar23/Medassist",
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
    url: "https://github.com/babilnagar23/Sales_and_inventory_management",
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
    url: "https://github.com/babilnagar23/campus-2-cash",
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
    id: "1",
    title: "Google IT Support Professional",
    issuer: "Coursera",
    date: "2026",
    imageUrl: "/certificates/GoogleIT.png",
    verificationUrl:
      "https://drive.google.com/file/d/1AnjLbM-IUerJdRf5uXY1v3NWKVgDdzz8/view?usp=drivesdk",
    description:
      "Completed Google IT Support Professional Certificate covering networking, operating systems, system administration, security, and troubleshooting.",
    order: 1,
  },
  {
    id: "2",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    date: "2026",
    imageUrl: "/certificates/IBM.png",
    verificationUrl:
      "https://www.credly.com/badges/fd22fa04-685b-4020-85f0-a77720a4d9f5",
    description:
      "Completed AI fundamentals with Python, data science, and machine learning, learning to work with data and use AI tools effectively.",
    order: 2,
  },

  {
    id: "3",
    title: "GirlScript Summer of Code Contributor",
    issuer: "GSSoC",
    date: "2026",
    imageUrl: "/certificates/contributor.png",
    verificationUrl:
      "https://drive.google.com/file/d/1p7-_yNQGhjaTN3jV3ofdQ3KxD1-yg3AP/view?usp=drivesdk",
    description:
      "Contributed to open-source projects during GirlScript Summer of Code, collaborating on real-world development tasks and improving codebases.",
    order: 3,
  },

  {
    id: "4",
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co.",
    date: "2026",
    imageUrl: "/certificates/JPMorgan.png",
    verificationUrl:
      "https://drive.google.com/file/d/18BNku6IYfFQJYXqelJFyAnq_vm1XELij/view?usp=sharing",
    description:
      "Worked with Spring Boot, Apache Kafka, REST APIs, SQL, and backend microservice development through JPMorgan Chase virtual experience program.",
    order: 4,
  },

  {
    id: "5",
    title: "NPTEL — Cloud Computing",
    issuer: "IIT / NPTEL",
    date: "2024",
    imageUrl: "/certificates/NPTEL.png",
    verificationUrl:
      "https://drive.google.com/file/d/1lnYH4fU0BCu4kyNFWS8kF7AyGUu-l2uf/view?usp=sharing",
    description:
      "Studied cloud computing concepts including virtualization, distributed systems, cloud infrastructure, and deployment models.",
    order: 5  ,
  },

  {
    id: "6",
    title: "Python Essentials ",
    issuer: "Vityarthi",
    date: "2024",
    imageUrl: "/certificates/VITyarthi.png",
    verificationUrl: "https://drive.google.com/file/d/1oZS5aJwDvxkLObBhQX6WGTOFki4x5wyS/view?usp=sharing",
    description:
      "Learned machine learning fundamentals, AI concepts, supervised learning, and practical applications of intelligent systems.",
    order: 6,
  },

  {
    id: "7",
    title: "NSS Camp",
    issuer: "VIT Bhopal University",
    date: "2025",
    imageUrl: "/certificates/NSS.png",
    verificationUrl:
      "https://drive.google.com/file/d/1lGVmlcibkjxkmVjWhU6N5J6JBFI0D0h0/view?usp=drivesdk",
    description:
      "Participated in a 7-day NSS camp focused on leadership, teamwork, discipline, and community engagement activities.",
    order: 7,
  },
];



export const education = [
  {
    degree: "Integrated M.Tech — Computer Science & Engineering",
    specialization: "Data Science",
    school: "VIT Bhopal University, Bhopal",
    period: "2023 – PRESENT",
    score: "8.21",
    scoreLabel: "GPA/10",
    main: true,
  },
  {
    degree: "Higher Secondary (Class XII) — CBSE",
    specialization: "Science",
    school: "Chavara Vidhya Bhavan HR SEC School, Raisen, MP",
    period: "2020 – 2022",
    main: false,
  },
  {
    degree: "High School (Class X) — CBSE",
    specialization: "",
    school: "Chavara Vidhya Bhavan HR SEC School, Raisen, MP",
    period: "2018 – 2020",
    main: false,
  },
];

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export const footer = {
  tagline:
    "Building modern, scalable web applications and exploring the realms of Data Science and AI.",
};
