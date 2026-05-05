import { resume } from "@/content/resume";

/** Same filter and sort as homepage `Timeline` (all milestones except certifications). */
export type HomepageMilestoneRow = {
  year: number;
  milestoneType: string;
  title: string;
  description: string;
};

export function buildHomepageMilestoneRows(): HomepageMilestoneRow[] {
  return (resume.milestones ?? [])
    .filter((m) => m.type !== "certification")
    .map((m) => ({
      year: parseInt(m.year, 10),
      milestoneType: m.type,
      title: m.title,
      description: m.description,
    }))
    .sort((a, b) => a.year - b.year);
}

export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export function formatContactLine(label: string, href: string): string {
  if (href.startsWith("mailto:")) {
    return `${label}: ${href.slice("mailto:".length)}`;
  }
  if (href.startsWith("tel:")) {
    const telBody = href.slice("tel:".length).replace(/\s/g, "");
    if (digitsOnly(label) === digitsOnly(telBody)) {
      return label;
    }
    return `${label}: ${telBody}`;
  }
  if (href.includes("wa.me/")) {
    const id = href.split("wa.me/")[1]?.split(/[?#]/)[0] ?? "";
    if (digitsOnly(label) === digitsOnly(id)) {
      return label;
    }
    return `${label}: https://wa.me/${id}`;
  }
  return `${label}: ${href}`;
}

/** Half-points: docx TextRun `size` uses half-points (20 = 10pt). */
export const DOCX_PT = (pt: number) => pt * 2;

