export type SocialLink = { label: string; href: string };
export type SkillLevel = "Expert" | "Advanced" | "Intermediate";
export type Skill = { name: string; level?: SkillLevel; keywords?: string[] };
export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};
export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end?: string;
  highlights: string[];
  tech?: string[];
};
export type Project = {
  name: string;
  blurb: string;
  problem?: string;
  approach?: string;
  impact?: string;
  tech: string[];
  links?: SocialLink[];
};
export type Education = {
  school: string;
  degree: string;
  start?: string;
  end?: string;
  notes?: string[];
};
export type Milestone = {
  title: string;
  description: string;
  year: string;
  type: "achievement" | "project" | "award" | "certification";
};
export type Resume = {
  name: string;
  /** Legal / certificate name (e.g. for formal résumé and PDF) */
  legalName?: string;
  /** Short city/region label shown next to the name in the header and hero */
  displayLocation?: string;
  /** Shown on the line directly under the name in the hero */
  roleLine?: string;
  headline: string;
  location?: string;
  summary: string;
  links: SocialLink[];
  skills: Skill[];
  techSkills?: string[];
  certifications: Certification[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  milestones?: Milestone[];
};
export const resume: Resume = {
  name: "Jag Karnan",
  legalName: "Jegadeesan Karunakaran",
  displayLocation: "Singapore",
  roleLine:
    "AI-native thinker • AI automation • Professional AI coding • AI process implementation",
  headline:
    "Your AI Partner — AI-native strategy, automation that scales, and processes built for adoption",
  location: "Singapore (Singapore PR • Availability: Immediate)",
  summary:
    "I position myself as an AI-native thinker: I default to automation, agents, and LLMs where they genuinely replace repetitive work or sharpen decisions — not AI for its own sake. I combine that mindset with a strong execution track record across AI automation (orchestration, integrations, reliable workflows), professional AI coding (production-minded builds with APIs, Python and TypeScript stacks, reviews and iteration), and AI process implementation (embedding AI steps into real operating rhythms, guardrails, handoffs, and adoption).\n\nI partner with enterprises alongside leadership and teams, learning how the business runs end to end. I map processes, prioritise high-impact use cases, and ship changes that smooth workflows, reduce manual effort, and produce outcomes you can measure: faster cycles, fewer errors, and operations that scale as you grow.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jagkarnan/" },
    { label: "YouTube", href: "https://www.youtube.com/@jagkarnanai" },
    { label: "GitHub", href: "https://github.com/jagkarnan" },
  ],
  skills: [
    {
      name: "AI-native lens on the business: translate leadership goals into automation-first opportunities — where agents, workflows, or LLMs replace drag instead of layering generic IT projects",
    },
    {
      name: "AI automation: design and operate orchestrations across tools (e.g., n8n, Zapier), APIs, and agent-style patterns so handoffs, retries, and monitoring hold up after launch",
    },
    {
      name: "Professional AI coding: ship AI-assisted apps and integrations using Python, TypeScript/JavaScript, LLM APIs, RAG patterns, and frameworks such as CrewAI and LangChain — with clarity, reviews, and maintainability in mind",
    },
    {
      name: "AI process implementation: embed AI steps into live workflows — RACI-friendly handoffs, guardrails, documentation, and checkpoints so teams adopt rather than revert to spreadsheets",
    },
    {
      name: "Use frontier assistants (Claude, Gemini, and peers) deliberately for drafting, automation glue, analysis accelerators, and decision support tied to measurable KPIs",
    },
    {
      name: "Lead end-to-end AI delivery from discovery through deployment: prototypes, pilots, production cutovers, training, and iteration loops tied to business outcomes",
    },
  ],
  techSkills: [
    "AI-native workflows",
    "AI automation patterns",
    "Agentic AI",
    "RAG",
    "LLM API",
    "LangChain",
    "CrewAI",
    "MCP",
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "AWS",
    "Node.js",
    "Next.js",
    "Docker",
    "Git",
    "REST APIs",
    "PostgreSQL",
    "MongoDB",
    "Vercel",
    "Flutter",
    "React Native + Expo",
    ".NET / C#",
    "Java",
    "MySQL",
    "Linux",
    "C++",
    "Data Recovery & Forensics",
  ],
  certifications: [
    {
      name: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic Academy",
      date: "2026",
    },
    {
      name: "Claude Cowork",
      issuer: "Anthropic Academy",
      date: "2026",
    },
    {
      name: "Claude 101",
      issuer: "Anthropic Academy",
      date: "2026",
    },
    {
      name: "Claude Code 101",
      issuer: "Anthropic Academy",
      date: "2026",
    },
    {
      name: "Software Engineering",
      issuer: "IBM",
      date: "2026",
    },
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute, USA",
      date: "2014",
    },
    {
      name: "Certified Data Recovery & Forensics Specialist",
      issuer: "SANS Institute",
      date: "2009",
    },
    {
      name: "Microsoft Certified Application Developer (.NET)",
      issuer: "Microsoft",
      date: "2006",
    },
    {
      name: "WSQ Generative AI",
      issuer: "SkillsFuture Singapore",
      date: "2024",
    },
    {
      name: "Generative AI Fundamentals",
      issuer: "Databricks",
      date: "2024",
    },
    {
      name: "AI Productivity",
      issuer: "Republic Polytechnic",
      date: "2024",
    },
  ],
  experience: [
    {
      company: "Singapore IT Services Pte Ltd",
      role: "Head of AI",
      location: "Singapore",
      start: "2023",
      end: "Present",
      highlights: [
        "Act as an AI-native partner to enterprises — automation-first discovery, hands-on prototyping, and rollout tied to KPIs rather than slide decks.",
        "Deliver professional AI coding and integration work: assistants, internal tools, and orchestrations built for iteration, observability, and safe failure modes.",
        "Implement AI inside operational processes: documented workflows, stakeholder alignment, guardrails, and adoption checkpoints so teams sustain changes.",
        "Lead AI fluency workshops and change cadences so leadership and practitioners keep pace as models and tooling evolve.",
      ],
      tech: ["AI Consulting", "LLMs", "Automation", "Cloud Solutions", "Enterprise AI", "Digital Transformation"],
    },
    {
      company: "Singapore IT Services Pte Ltd",
      role: "Digital Transformation Leader",
      location: "Singapore",
      start: "2015",
      end: "2022",
      highlights: [
        "Shifted consulting toward automation-first and AI-ready processes — mapping workflows before prescribing tools.",
        "Mapped end‑to‑end business processes and introduced automation, scripting, and cloud tools to remove manual steps.",
        "Collaborated with business stakeholders to define outcomes, KPIs, and success metrics for transformation projects.",
      ],
      tech: ["Process Mapping", "Automation", "Scripting", "Cloud Services", "Digital Workplace"],
    },
    {
      company: "Singapore IT Services Pte Ltd",
      role: "Senior Systems Engineer",
      location: "Singapore",
      start: "2008",
      end: "2014",
      highlights: [
        "Led infrastructure and systems engineering projects for small and mid-sized enterprises in Singapore.",
        "Designed and implemented secure, reliable on-premise and early cloud environments for clients across industries.",
        "Worked hands-on with servers, networks, and endpoints while advising customers on IT best practices.",
      ],
      tech: ["Systems Engineering", "On‑Prem Infrastructure", "Networking", "Windows Server", "SME Consulting"],
    },
    {
      company: "Avanade Asia Pte Ltd",
      role: "Senior Lead Developer",
      location: "Singapore",
      start: "2005",
      end: "2008",
      highlights: [
        "Led development workstreams and hands-on delivery for large-scale .NET and enterprise solutions across APAC, owning design decisions, build quality, and release readiness.",
        "Mentored developers, ran code and design reviews, and partnered with leads and client stakeholders to turn requirements into stable, maintainable software.",
        "Shipped upgrades, migrations, and product releases for clients including British Telecom, MediaCorp, AIA, and Changi General Hospital.",
      ],
      tech: [
        "Technical leadership",
        ".NET / C#",
        "Enterprise software delivery",
        "Solution design & architecture",
        "Code quality & reviews",
        "Mentoring",
        "APAC client delivery",
      ],
    },
    {
      company: "PMR Software Technology Pte Ltd",
      role: "Software Developer",
      location: "Singapore",
      start: "2001",
      end: "2005",
      highlights: [
        "Developed and deployed enterprise applications.",
        "Supported UAT and implemented client-facing solutions.",
      ],
      tech: ["Software Development", "Enterprise Applications", "UAT", "Client Solutions"],
    },
    {
      company: "Software Technology International",
      role: "Software Programmer",
      location: "USA",
      start: "1999",
      end: "2001",
      highlights: [
        "Migrated core functionalities from JSP to .NET, enhancing application efficiency and reducing server load times.",
        "Developed scalable applications using modern frameworks and languages (JavaScript, Java).",
      ],
      tech: ["JSP", ".NET", "JavaScript", "Java"],
    },
  ],
  projects: [
    {
      name: "Microsoft 365 Migration",
      blurb: "Migrated 200+ users from on-prem Exchange to Microsoft 365 with hybrid Entra ID integration.",
      impact: "Seamless cloud transition with improved collaboration and security.",
      tech: ["Microsoft 365", "Exchange", "Entra ID", "Cloud Migration"],
    },
    {
      name: "Enterprise Firewall & VPN Deployment",
      blurb: "Deployed enterprise-wide firewall and VPN for secure remote workforce connectivity.",
      impact: "Enabled secure remote work for entire organization.",
      tech: ["Firewall", "VPN", "Network Security", "Remote Access"],
    },
    {
      name: "Endpoint Management with Intune",
      blurb: "Implemented centralized endpoint management with Intune across 300+ devices.",
      impact: "Streamlined device management and improved security compliance.",
      tech: ["Microsoft Intune", "Endpoint Management", "Device Security", "MDM"],
    },
    {
      name: "DR & Business Continuity Plan",
      blurb: "Designed and executed Disaster Recovery & Business Continuity plan with zero data loss.",
      impact: "Ensured business resilience and data protection.",
      tech: ["Disaster Recovery", "Business Continuity", "Data Protection", "Risk Management"],
    },
  ],
  education: [
    {
      school: "Annamalai University, Singapore",
      degree: "MBA • Information Technology",
      start: "2005",
      end: "2007",
    },
    {
      school: "National Engineering College, India",
      degree: "Bachelor of Engineering • Electronics & Communication",
      start: "1995",
      end: "1999",
      notes: ["University Gold Medal"],
    },
  ],
  milestones: [
    {
      title: "Computer Society of India Competition",
      description: "Won First Prize in a national-level software contest",
      year: "1998",
      type: "award",
    },
    {
      title: "Wireless LAN Project",
      description: "Conceptualized and built a Wireless LAN project using Infra Red Communication as Final Year Project",
      year: "1999",
      type: "project",
    },
    {
      title: "Top Employee Award",
      description: "Won Top Employee Award while working for British Telecom project at Avanade Asia",
      year: "2005",
      type: "award",
    },
    {
      title: "Joined Software Technology International, USA",
      description: "Software Engineer",
      year: "1999",
      type: "achievement",
    },
    {
      title: "Joined PMR Software Technology Pte Ltd, Singapore",
      description: "Software Engineer",
      year: "2001",
      type: "achievement",
    },
    {
      title: "Joined Avanade Asia, Singapore",
      description: "Senior Lead Developer",
      year: "2005",
      type: "achievement",
    },
    {
      title: "Joined Agility Logistics, Singapore",
      description: "Senior Engineering Manager",
      year: "2007",
      type: "achievement",
    },
    {
      title: "Founded Singapore IT Services Pte Ltd",
      description: "",
      year: "2008",
      type: "achievement",
    },
    {
      title: "Founded Singapore Data Recovery Centre Pte Ltd",
      description: "",
      year: "2010",
      type: "achievement",
    },
    {
      title:
        "Secured key private and gov accounts AIA, CITI Bank, Changi Airport, Ministry of Education (MOE), Singapore Police, Public Service Division",
      description: "",
      year: "2013",
      type: "achievement",
    },
    {
      title:
        "Improved data recovery volume from 12 cases per month to average 74 cases per month",
      description: "",
      year: "2015",
      type: "achievement",
    },
    {
      title: "Started data analysis & reporting services for Singapore Real Estate Market",
      description: "",
      year: "2016",
      type: "achievement",
    },
    {
      title:
        "Built autonomous systems to handle end-to-end real estate workflow from marketing to final completion",
      description: "",
      year: "2018",
      type: "achievement",
    },
    {
      title: "Machine learning & expert systems for Singapore real estate forecasting",
      description: "",
      year: "2021",
      type: "achievement",
    },
    {
      title: "LLM-powered business chatbots for client-facing automation",
      description: "",
      year: "2023",
      type: "achievement",
    },
    {
      title:
        "Micro SaaS product builds. Automation Agency. AI-powered, subscription model",
      description: "",
      year: "2025",
      type: "achievement",
    },
    {
      title: "Certified C++ Programmer",
      description: "India",
      year: "1997",
      type: "certification",
    },
    {
      title: "Certified Java Programmer",
      description: "USA",
      year: "2000",
      type: "certification",
    },
    {
      title: "Certified JavaScript Programmer",
      description: "USA",
      year: "2000",
      type: "certification",
    },
    {
      title: "Microsoft Certified Professional",
      description: "USA",
      year: "2006",
      type: "certification",
    },
    {
      title: "Registered Management Consultant (RMC)",
      description: "Singapore",
      year: "2020",
      type: "certification",
    },
  ],
};
