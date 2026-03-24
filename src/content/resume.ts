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
  headline: string;
  location?: string;
  summary: string;
  links: SocialLink[];
  aiFocusAreas: string[];
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
  headline: "AI Partner",
  location: "Singapore (Singapore PR • Availability: Immediate)",
  summary:
    "AI partner to enterprises, working alongside leadership and teams to deeply understand how the business operates and where it can run smarter. I analyse end-to-end processes, identify high‑impact opportunities for AI, and design practical solutions that streamline workflows, reduce manual effort, and improve decision-making. The focus is on measurable business outcomes—faster cycles, fewer errors, and scalable operations—through AI-assisted development, intelligent automation, and targeted AI integrations that fit how your organisation actually works.",
  links: [
    { label: "Email", href: "mailto:jag.karnan@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jagkarnan/" },
    { label: "GitHub", href: "https://github.com/jagkarnan" },
    { label: "YouTube", href: "https://www.youtube.com/@jagkarnan" },
    { label: "Call +65 8188 8935", href: "tel:+6581888935" },
    { label: "WhatsApp +65 8188 8935", href: "https://wa.me/6581888935" },
  ],
  aiFocusAreas: [
    "Clear AI strategy aligned with business goals and measurable returns",
    "Find opportunities where AI cuts costs, reduces errors, and speeds up cycles",
    "Workflows that free teams from repetitive tasks for higher value work",
    "AI assistants and automation that fit your existing tools",
    "Prioritised roadmap by ROI and impact, no wasted effort",
    "Smooth adoption with change management that drives uptake",
  ],
  skills: [
    {
      name: "LLMs & Prompt Engineering",
      level: "Expert",
      keywords: ["GPT", "Claude", "Prompt Design", "RAG", "Fine-tuning"],
    },
    {
      name: "AI Automation & Workflow",
      level: "Expert",
      keywords: ["Process Automation", "AI Agents", "Workflow Orchestration", "No-code/Low-code"],
    },
    {
      name: "AI Strategy & Opportunity Assessment",
      level: "Expert",
      keywords: ["Use Case Prioritisation", "ROI Modelling", "AI Roadmapping", "Change Management"],
    },
    {
      name: "Process Discovery & Mapping",
      level: "Expert",
      keywords: ["As‑Is / To‑Be", "Value Stream Mapping", "Bottleneck Analysis"],
    },
    {
      name: "AI Integration & APIs",
      level: "Advanced",
      keywords: ["OpenAI", "Anthropic", "LangChain", "Vector DBs", "Embeddings"],
    },
    {
      name: "Enterprise AI Implementation",
      level: "Advanced",
      keywords: ["Azure AI", "AWS Bedrock", "Google AI", "On-prem AI"],
    },
    {
      name: "AI-Assisted Development",
      level: "Advanced",
      keywords: ["Copilot", "Cursor", "AI Code Generation", "Documentation"],
    },
    {
      name: "Data & Analytics for AI",
      level: "Advanced",
      keywords: ["Data Pipelines", "ETL", "Analytics", "Databricks"],
    },
  ],
  techSkills: [
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
      role: "AI Partner & Consultant",
      location: "Singapore",
      start: "2020",
      end: "Present",
      highlights: [
        "Act as AI partner to enterprises, helping leadership and teams identify where AI can improve operations.",
        "Advise clients on AI adoption strategies and implement AI-driven solutions to optimise business processes.",
        "Design and deploy AI-powered assistants, automations, and decision-support tools tailored to each organisation.",
        "Lead AI training workshops and guide organisations through change management for AI-led transformation.",
      ],
      tech: ["AI Consulting", "LLMs", "Automation", "Cloud Solutions", "Enterprise AI", "Digital Transformation"],
    },
    {
      company: "Singapore IT Services Pte Ltd",
      role: "Digital Transformation & Automation Consultant",
      location: "Singapore",
      start: "2015",
      end: "2019",
      highlights: [
        "Shifted focus from pure infrastructure to process-centric consulting and workflow optimisation.",
        "Mapped end‑to‑end business processes and introduced automation, scripting, and cloud tools to remove manual steps.",
        "Collaborated with business stakeholders to define outcomes, KPIs, and success metrics for transformation projects.",
      ],
      tech: ["Process Mapping", "Automation", "Scripting", "Cloud Services", "Digital Workplace"],
    },
    {
      company: "Singapore IT Services Pte Ltd",
      role: "Senior Systems Engineer & Consultant",
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
      role: "Senior Systems Engineer",
      location: "Singapore",
      start: "2005",
      end: "2008",
      highlights: [
        "Supported enterprise IT infrastructure and operations across APAC.",
        "Delivered upgrades, migrations, and IT projects for clients such as British Telecom, MediaCorp, AIA, Changi General Hospital.",
      ],
      tech: ["Systems Engineering", "IT Infrastructure", "Enterprise Projects", "APAC Operations"],
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
      role: "Software Developer",
      location: "USA",
      start: "1999",
      end: "2001",
      highlights: [
        "Developed and deployed enterprise applications.",
        "Supported UAT and implemented client-facing solutions.",
      ],
      tech: ["Software Development", "Enterprise Applications", "UAT"],
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
      notes: ["University Gold Medalist"],
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
      description: "Senior Software Engineer",
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
