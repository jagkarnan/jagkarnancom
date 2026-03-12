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
  headline: string;
  location?: string;
  summary: string;
  links: SocialLink[];
  aiFocusAreas: string[];
  skills: Skill[];
  certifications: Certification[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  milestones?: Milestone[];
};
export const resume: Resume = {
  name: "Jag Karnan",
  headline: "AI Consultant & Entrepreneur • AI Automation Expert",
  location: "Singapore (Singapore PR • Availability: Immediate)",
  summary:
    "AI entrepreneur and consultant specializing in building custom AI solutions for enterprises. Expert in AI-assisted development, automation systems, and strategic AI implementation. Helping companies leverage AI for competitive advantage through custom solutions, process automation, and AI-powered applications.",
  links: [
    { label: "Email", href: "mailto:jag.karnan@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jagkarnan/" },
    { label: "GitHub", href: "https://github.com/jagkarnan" },
    { label: "Call +65 8188 8935", href: "tel:+6581888935" },
    { label: "WhatsApp +65 8188 8935", href: "https://wa.me/6581888935" },
  ],
  aiFocusAreas: [
    "Enterprise AI Strategy & Consulting",
    "AI-Powered Automation Systems",
    "Custom AI Solution Development",
    "AI-Assisted Software Development",
    "Process Optimization with AI",
    "AI Integration & Implementation",
  ],
  skills: [
    { name: "Solution Consulting", level: "Expert", keywords: ["Pre-Sales", "Solution Design", "Client Engagement"] },
    { name: "IT Operations", level: "Expert", keywords: ["Infrastructure", "Cloud", "Cybersecurity"] },
    { name: "Enterprise Outsourcing", level: "Advanced", keywords: ["Offshore", "Nearshore", "Delivery Teams"] },
    { name: "Cloud Platforms", level: "Advanced", keywords: ["Azure", "AWS", "Microsoft 365"] },
    { name: "Project Management", level: "Advanced", keywords: ["PMP", "Enterprise Projects", "APAC"] },
    { name: "AI & Automation", level: "Advanced", keywords: ["AI Adoption", "Process Automation", "Efficiency"] },
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
      role: "AI Consultant",
      location: "Singapore",
      start: "Sep 2008",
      end: "Present",
      highlights: [
        "Advise clients on AI adoption strategies and implement AI-driven solutions to optimize business operations.",
        "Consult with enterprise customers to design and deploy AI-powered automation systems.",
        "Develop AI roadmaps and integration strategies for cloud and on-premise environments.",
        "Lead AI training workshops and guide organizations through digital transformation with AI.",
        "Integrate AI tools (LLMs, automation, data analytics) into client IT infrastructure.",
        "Partner with business development teams to craft AI-focused proposals and solution presentations.",
      ],
      tech: ["AI Consulting", "LLMs", "Automation", "Cloud Solutions", "Enterprise AI", "Digital Transformation"],
    },
    {
      company: "Avanade Asia Pte Ltd",
      role: "Senior Systems Engineer",
      location: "Singapore",
      start: "Apr 2005",
      end: "Aug 2008",
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
      title: "Joined PMR Software Technology Pvt Ltd",
      description: "India as a Software Developer",
      year: "1999",
      type: "achievement",
    },
    {
      title: "Joined Software Technology International",
      description: "USA as a Software Engineer",
      year: "2000",
      type: "achievement",
    },
    {
      title: "Joined PMR Software Technology Pte Ltd",
      description: "Singapore as a Software Engineer",
      year: "2001",
      type: "achievement",
    },
    {
      title: "Joined Avanade Asia",
      description: "Singapore as a Senior Software Engineer",
      year: "2005",
      type: "achievement",
    },
    {
      title: "Joined Agility Logistics",
      description: "Singapore as a Senior Engineering Manager",
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
