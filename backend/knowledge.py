"""Portfolio knowledge base for RAG retrieval."""

DOCS = [
    "Babil Nagar is an Integrated M.Tech student in Computer Science and Engineering (Data Science) at VIT Bhopal University with GPA 7.91.",
    "Babil Nagar is based in Bhopal, Madhya Pradesh and is open to relocation and remote work.",
    "Babil Nagar email is bobilnagar23@gmail.com and phone is +91-7828589139.",
    "Babil Nagar GitHub profile is https://github.com/bobilnagar",
    "Babil Nagar LinkedIn is https://www.linkedin.com/in/bobilnagar23",
    "Babil Nagar is seeking SDE, Full Stack Developer, and Data Analyst roles as fresher, intern, or full-time in India.",
    "Paras Jain is NOT Babil Nagar. This portfolio belongs only to Babil Nagar.",
    "Babil Nagar skills include Java, Python, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, React.js, Next.js, Node.js, Django, Flask, REST APIs, SQLite, SQL, Git, GitHub, Docker, and Vercel.",
    "Babil Nagar built Medassist: a Flask-based medical recommendation web app using ML to predict diseases from symptoms and recommend medications, precautions, diets, and workouts.",
    "Babil Nagar built Sales and Inventory Management System using Django, Bootstrap, Ajax, billing, invoicing, inventory tracking, and Docker deployment.",
    "Babil Nagar built Campus 2 Cash: a Next.js hackathon project that helps students convert academic projects into monetizable ideas with AI-based analysis, revenue streams, and pricing strategies.",
    "Babil Nagar built Zomato Dataset Analysis project using Python and Jupyter for exploratory data analysis.",
    "Babil Nagar built Loan Approval Prediction project using Python, Jupyter, and Scikit-learn machine learning.",
    "Babil Nagar built Instagram Data Analysis project using Python and Jupyter for engagement insights.",
    "Babil Nagar is a GirlScript Summer of Code contributor in 2024 and 2026.",
    "Babil Nagar is a Hacktoberfest open-source contributor.",
    "Babil Nagar was Discipline Committee Member for Advitya 2023-24 and Vivan 2023 at VIT Bhopal.",
    "Babil Nagar is a team member of Data Science Club and Central India Club at VIT Bhopal.",
    "Babil Nagar was Organizing Team Member for Convocation 2023 and attended 7-day Annual NSS Camp.",
    "Babil Nagar certifications include Google IT Support Professional Certificate, NPTEL Cloud Computing, Fundamentals of AI and ML from Vityarthi, and MATLAB Onramp from MathWorks.",
    "Babil Nagar education: Integrated M.Tech CSE Data Science at VIT Bhopal 2023-Present GPA 7.91; Class XII CBSE 71.2% at Chavara Vidhya Bhavan Raisen; Class X CBSE 81.5%.",
]

SYSTEM_PROMPT = """You are Babil Nagar's AI portfolio assistant.

RULES:
- Only answer using the provided context about Babil Nagar
- Never invent facts
- If asked about Paras Jain or anyone else → say they are not Babil Nagar; this portfolio is for Babil Nagar only
- If information is missing → say "Not mentioned in portfolio"
- Keep answers short: 2–3 lines maximum
- Be professional and confident
"""

MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama-3.1-70b-versatile",
    "mixtral-8x7b-32768",
]
