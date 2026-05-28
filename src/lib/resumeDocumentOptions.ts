import { resume, type Experience } from "@/content/resume";
import {
  buildHomepageMilestoneRows,
  type HomepageMilestoneRow,
} from "@/lib/resumeDocumentHelpers";
import {
  buildCertificationBoardItems,
  groupCertificationBoardItemsByDecade,
  type CertificationBoardItem,
} from "@/content/resumeShared";

export type ResumeDocumentVariant = "detailed" | "concise";

export const RESUME_FILE_BASENAME = "Jag_Karnan_Resume";
export const RESUME_PDF_ZIP_FILENAME = `${RESUME_FILE_BASENAME}_pdf.zip`;
export const RESUME_DOCX_ZIP_FILENAME = `${RESUME_FILE_BASENAME}_docx.zip`;

export function resumeDocumentTitle(variant: ResumeDocumentVariant): string {
  return variant === "concise"
    ? `${resume.name} — Concise Résumé`
    : `${resume.name} — Résumé`;
}

export function getSummaryParagraphs(variant: ResumeDocumentVariant): string[] {
  const paragraphs = resume.summary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return variant === "concise" ? paragraphs.slice(0, 1) : paragraphs;
}

export function getSkillsForDocument(variant: ResumeDocumentVariant) {
  return variant === "concise" ? resume.skills.slice(0, 4) : resume.skills;
}

export function getExperienceForDocument(
  variant: ResumeDocumentVariant,
): Experience[] {
  if (variant === "detailed") return resume.experience;
  return resume.experience.slice(0, 3).map((entry, index) => ({
    ...entry,
    highlights: entry.highlights.slice(0, index === 0 ? 3 : 2),
  }));
}

export function getCertificationsByDecadeForDocument(
  variant: ResumeDocumentVariant,
): ReturnType<typeof groupCertificationBoardItemsByDecade> {
  const groups = groupCertificationBoardItemsByDecade(
    buildCertificationBoardItems(),
  );
  return variant === "concise" ? groups.slice(0, 1) : groups;
}

export function getCertificationItemsForDocument(
  variant: ResumeDocumentVariant,
): CertificationBoardItem[] {
  return getCertificationsByDecadeForDocument(variant).flatMap(
    (group) => group.items,
  );
}

/** Concise résumé: one line per cert — title, institution, year. */
export function formatConciseCertificationLine(
  item: CertificationBoardItem,
): string {
  return [item.title, item.subtitle, item.year].filter(Boolean).join(" · ");
}

export function includeCertificationDecadeHeaders(
  variant: ResumeDocumentVariant,
): boolean {
  return variant === "detailed";
}

export function getMilestonesForDocument(
  variant: ResumeDocumentVariant,
): HomepageMilestoneRow[] {
  const rows = buildHomepageMilestoneRows();
  if (variant === "detailed") return rows;
  return [...rows]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3)
    .sort((a, b) => a.year - b.year);
}

export function includeMilestoneDescriptions(
  variant: ResumeDocumentVariant,
): boolean {
  return variant === "detailed";
}

export function includeContactNameBlock(
  variant: ResumeDocumentVariant,
): boolean {
  return variant === "detailed";
}
