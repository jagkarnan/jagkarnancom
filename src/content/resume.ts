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
    "AI-native thinker • AI automation • Professional AI coding",
  headline:
    "Your AI Partner: AI transformation, agentic automation, and AI-driven operations that scale",
  location: "Singapore (Singapore PR • Availability: Immediate)",
  summary:
    "I'm an AI-native operator who defaults to automation, agents, and LLMs wherever they genuinely replace repetitive work or sharpen decisions, never AI for its own sake. That mindset is backed by a strong execution record across three reinforcing areas: building AI automation through orchestration, integrations, and reliable workflows; shipping production-grade AI code across Python and TypeScript stacks with disciplined review and iteration; and embedding AI into real operating rhythms with the guardrails, handoffs, and change management that make adoption stick.\n\nI partner closely with leadership and teams to understand how a business actually runs end to end. From there, I map processes, prioritise the highest-impact use cases, and deliver changes that smooth workflows, cut manual effort, and produce measurable outcomes: faster cycles, fewer errors, and operations built to scale as the business grows.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jagkarnan/" },
    { label: "YouTube", href: "https://www.youtube.com/@jagkarnanai" },
    { label: "GitHub", href: "https://github.com/jagkarnan" },
  ],
  skills: [
    {
      name: "Turn leadership goals into AI roadmaps that use agents, LLMs, and automation to remove real operational drag, not add more IT projects",
    },
    {
      name: "Build and run multi-agent workflows across n8n, Zapier, Make, and APIs, with error handling, retries, and monitoring built in",
    },
    {
      name: "Ship GenAI apps using Python, TypeScript, LLM APIs (Claude, GPT, Gemini), RAG, vector databases, and frameworks like CrewAI, LangChain, and LangGraph",
    },
    {
      name: "Embed AI into daily workflows with clear handoffs, guardrails, prompt libraries, and human checkpoints so teams actually adopt it",
    },
    {
      name: "Apply frontier models (Claude, GPT, Gemini) to content, analysis, and decision support tied to measurable KPIs",
    },
    {
      name: "Lead AI delivery end to end: discovery, prototypes, pilots, production rollout, training, and iteration",
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
    "Google Cloud",
    "Azure",
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
      name: "Claude Code",
      issuer: "Anthropic Academy",
      date: "2026",
    },
    {
      name: "Claude Code in Action",
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
