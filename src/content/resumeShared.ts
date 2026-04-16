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
    (a, b) => parseCertificationYear(b.year) - parseCertificationYear(a.year),
  );
}

/** Certification era buckets — newest first in UI. */
export const CERTIFICATION_DECADES = [
  { id: "2020-2030", label: "2020 – 2030" },
  { id: "2000-2020", label: "2000 – 2020" },
  { id: "1990-2000", label: "1990 – 2000" },
] as const;

export function parseCertificationYear(yearStr: string): number {
  const m = yearStr.trim().match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : NaN;
}

function certificationDecadeId(y: number): (typeof CERTIFICATION_DECADES)[number]["id"] {
  if (y >= 2020) return "2020-2030";
  if (y >= 2000) return "2000-2020";
  if (y >= 1990) return "1990-2000";
  return "1990-2000";
}

/** Groups merged certification board items by decade; only decades with items are returned. */
export function groupCertificationBoardItemsByDecade(
  items: CertificationBoardItem[],
): { id: string; label: string; items: CertificationBoardItem[] }[] {
  const byId = new Map<string, CertificationBoardItem[]>();
  for (const d of CERTIFICATION_DECADES) {
    byId.set(d.id, []);
  }

  for (const item of items) {
    const y = parseCertificationYear(item.year);
    const id = Number.isFinite(y) ? certificationDecadeId(y) : "1990-2000";
    byId.get(id)!.push(item);
  }

  for (const list of byId.values()) {
    list.sort(
      (a, b) => parseCertificationYear(b.year) - parseCertificationYear(a.year),
    );
  }

  const out: { id: string; label: string; items: CertificationBoardItem[] }[] = [];
  for (const d of CERTIFICATION_DECADES) {
    const list = byId.get(d.id)!;
    if (list.length > 0) {
      out.push({ id: d.id, label: d.label, items: list });
    }
  }
  return out;
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
