import { resume } from "./resume";

/** Corporate logos — same list as the home page Corporate Exposure section. */
export const CORPORATE_EXPERIENCE = [
  { name: "British Telecom", logo: "/logos/bt.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "Avanade", logo: "/logos/avanade.png" },
  { name: "Accenture", logo: "/logos/accenture.png" },
  { name: "Nike", logo: "/logos/nike.png" },
  { name: "Agility Logistics", logo: "/logos/agility.png" },
  { name: "Lazard", logo: "/logos/lazard.png" },
  { name: "AIA", logo: "/logos/aia.png" },
] as const;

export type CertificationBoardItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  source: "cert" | "milestone";
};

/** Merged certifications board — same data and sort as the home page Certifications grid. */
export function buildCertificationBoardItems(): CertificationBoardItem[] {
  const fromCerts = resume.certifications.map((c) => ({
    id: `cert-${c.name}-${c.date}`,
    title: c.name,
    subtitle: c.issuer,
    year: c.date,
    source: "cert" as const,
  }));
  const fromMilestones = (resume.milestones ?? [])
    .filter((m) => m.type === "certification")
    .map((m) => ({
      id: `milestone-cert-${m.title}-${m.year}`,
      title: m.title,
      subtitle: m.description,
      year: m.year,
      source: "milestone" as const,
    }));
  return [...fromCerts, ...fromMilestones].sort(
    (a, b) => parseInt(b.year || "0", 10) - parseInt(a.year || "0", 10),
  );
}

export function getIssuerInitials(issuer?: string): string {
  if (!issuer) return "AI";
  return issuer
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
