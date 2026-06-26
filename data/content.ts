/* ──────────────────────────────────────────────────────────────────────────
   Single source of truth for the portfolio content.
   Everything is derived from Manh's CV, Nam's CV, the App Store developer
   catalogue and the live production sites Manh shipped.
   ────────────────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Manh Nguyen Cong",
  shortName: "Manh",
  role: "Full-Stack Developer",
  roleLong: "Full-Stack Engineer · Mobile & Web · Web3",
  location: "Da Nang, Vietnam",
  email: "manhncse02926@gmail.com",
  phone: "+84 372 489 192",
  available: "Open to senior frontend & full-stack roles — remote, hybrid, or on-site",
  cv: "/Manh-Nguyen-CV.pdf",
  tagline:
    "I build the front of the product — the part people actually touch — from App Store apps with paying users to web3 platforms that scaled to 200K people a month.",
  bio: [
    "I'm a frontend-focused full-stack developer with a decade of shipping production software across three countries — FPT Software in Vietnam, Finexus in Malaysia, and Cardpool remotely for the US.",
    "For most of that time I've been the engineer behind a serial product team led by Nam Nguyen. I lead the frontend end-to-end — React & Next.js on the web, React Native on mobile — and step into the backend whenever a product needs it: Node.js, GraphQL and AWS on the server, Solidity smart contracts for the web3 work.",
    "I take a design and turn it into a fast, pixel-accurate interface — then carry it through the gnarly bug at 1am and the App Store submission. Ten of my apps are live on the store right now.",
  ],
};

export const stats = [
  { value: 10, suffix: "+", label: "Years shipping production software" },
  { value: 10, suffix: "", label: "Live apps on the App Store" },
  { value: 200, suffix: "K", label: "Monthly users at WhaleStats peak" },
  { value: 3, suffix: "", label: "Countries — VN · MY · US (remote)" },
];

export const links = {
  appStore: "https://apps.apple.com/us/developer/nam-nguyen/id1719586694",
  email: "mailto:manhncse02926@gmail.com",
};

/* ── Skills ─────────────────────────────────────────────────────────────── */
export const skillGroups = [
  {
    title: "Frontend",
    accent: "violet",
    skills: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "HTML / CSS"],
  },
  {
    title: "Backend",
    accent: "blue",
    skills: ["Node.js", "Ruby on Rails", "Java / Spring", "GraphQL", "REST APIs", "Express", "Apollo"],
  },
  {
    title: "Cloud & Infra",
    accent: "cyan",
    skills: ["AWS Amplify", "Lambda", "DynamoDB", "S3 · CloudFront", "API Gateway", "AppSync", "SQS · SNS", "Cognito", "Docker", "Datadog", "Vercel", "Google Cloud"],
  },
  {
    title: "Web3",
    accent: "amber",
    skills: ["Solidity", "Hardhat", "Ethers.js", "Web3.js", "web3-react", "Infura", "Alchemy", "Smart Contracts"],
  },
  {
    title: "Data",
    accent: "violet",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Elasticsearch", "SQLite", "MS SQL"],
  },
  {
    title: "Mobile & Tooling",
    accent: "blue",
    skills: ["iOS · Xcode", "Android Studio", "App Store / Play publishing", "OneSignal", "Firebase", "Git · CI/CD"],
  },
];

/* ── Experience timeline ────────────────────────────────────────────────── */
export const experience = [
  {
    company: "Product Studio — with Nam Nguyen",
    role: "Frontend-Focused Full-Stack Developer",
    period: "2015 — Present",
    location: "Remote · Da Nang",
    accent: "violet",
    summary:
      "The through-line of my career: a serial product team where Nam leads product and I lead the frontend. I've built and shipped a portfolio of mobile apps, web platforms and web3 products from zero to launch — owning the client side and stepping into the backend whenever a product needed it.",
    points: [
      "Led the frontend end-to-end across React, Next.js and React Native, turning designs into fast, polished interfaces.",
      "Picked up backend work — Node.js, GraphQL, AWS Lambda/DynamoDB — whenever a product needed it.",
      "Built the WhaleStats analytics product that scaled to ~200K monthly users.",
      "Joined Cardpool (US gift-card exchange) remotely with the team in 2019–20 — maintained and extended a large multi-service system in Angular, Ruby, Node.js and AWS microservices.",
      "Handled the full release pipeline: App Store (iOS) and Google Play submissions, monitoring and iteration.",
    ],
    stack: ["React", "Next.js", "React Native", "Node.js", "AWS", "Solidity"],
  },
  {
    company: "Finexus Software",
    role: "Software Engineer",
    period: "2016 — 2018",
    location: "Kuala Lumpur, Malaysia",
    accent: "blue",
    summary:
      "Built banking-grade products for a fintech offering data-processor services and digital wallets — and moved abroad to do it.",
    points: [
      "Developed banking products integrating with data-processor services and digital money wallets for secure, efficient transactions.",
      "Worked directly with bank customers on feature and correction requests, resolving issues promptly.",
      "Mentored junior members and interns on the system.",
      "Maintained existing functions and developed new ones as the business evolved.",
    ],
    stack: ["Java", "SQL", "REST APIs", "Banking systems"],
  },
  {
    company: "FPT Software",
    role: "Software Engineer",
    period: "2015 — 2016",
    location: "Da Nang, Vietnam · onsite Japan",
    accent: "amber",
    summary:
      "First role out of university at Vietnam's largest software company — and an early taste of working directly with international clients.",
    points: [
      "Spent ~4 months in Japan providing on-site support and collaborating directly with the client team.",
      "Managed the project's Oracle database for accurate, secure storage.",
      "Built features with Spring MVC and a Java Swing front-end for an intuitive UI.",
      "Read and analysed client requirements and produced the basic designs.",
    ],
    stack: ["Java", "Spring MVC", "Oracle", "Java Swing"],
  },
];

export const education = {
  school: "FPT University",
  degree: "Bachelor of Software Engineering",
  period: "2011 — 2015",
};
