import PDFDocument from "pdfkit";
import { resume } from "@/content/resume";
import { getSensitiveContactLinks } from "@/lib/contactSensitive";
import { formatContactLine } from "@/lib/resumeDocumentHelpers";
import { CORPORATE_EXPERIENCE } from "@/content/resumeShared";
import {
  getCertificationsByDecadeForDocument,
  getCertificationItemsForDocument,
  formatConciseCertificationLine,
  includeCertificationDecadeHeaders,
  getExperienceForDocument,
  getMilestonesForDocument,
  getSkillsForDocument,
  getSummaryParagraphs,
  includeContactNameBlock,
  includeMilestoneDescriptions,
  resumeDocumentTitle,
  type ResumeDocumentVariant,
} from "@/lib/resumeDocumentOptions";

function resetXToMargin(doc: InstanceType<typeof PDFDocument>) {
  doc.x = doc.page.margins.left;
}

function sectionTitle(doc: InstanceType<typeof PDFDocument>, title: string) {
  resetXToMargin(doc);
  doc.moveDown(0.8);
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text(title.toUpperCase(), { width: contentWidth(doc), underline: true });
  doc.moveDown(0.4);
  doc.font("Helvetica").fontSize(10);
  resetXToMargin(doc);
}

/** Keep section heading and at least the start of its body on the same page. */
const SECTION_TITLE_BLOCK_HEIGHT = 36;

function beginSection(
  doc: InstanceType<typeof PDFDocument>,
  title: string,
  minBodyHeight: number,
) {
  ensureSpace(doc, SECTION_TITLE_BLOCK_HEIGHT + minBodyHeight);
  sectionTitle(doc, title);
}

/** Keep a subsection label with at least the start of its body on the same page. */
function beginSubsection(
  doc: InstanceType<typeof PDFDocument>,
  minBodyHeight: number,
) {
  ensureSpace(doc, 18 + minBodyHeight);
}

function contentWidth(doc: InstanceType<typeof PDFDocument>) {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right;
}

function pageBottom(doc: InstanceType<typeof PDFDocument>) {
  return doc.page.height - doc.page.margins.bottom - 24;
}

function ensureSpace(doc: InstanceType<typeof PDFDocument>, estimatedHeight: number) {
  if (doc.y + estimatedHeight > pageBottom(doc)) {
    doc.addPage();
    resetXToMargin(doc);
  }
}

/** Domain exposure as one horizontal line (label + domains).
 * Avoid `continued` + wrapped `text({ width })` — PDFKit can leave doc.x indented for later blocks.
 */
function writeDomainExposureLine(
  doc: InstanceType<typeof PDFDocument>,
  w: number,
  exposure: NonNullable<(typeof resume)["domainExposure"]>,
) {
  ensureSpace(doc, 22);
  const left = doc.page.margins.left;
  doc.fillColor("#000000").fontSize(10);
  const line = `${exposure.label}: ${exposure.domains.join(", ")}`;
  doc.font("Helvetica-Bold").text(line, { width: w });
  doc.font("Helvetica");
  doc.moveDown(0.25);
  doc.x = left;
}

export function generateResumePdfBuffer(
  variant: ResumeDocumentVariant = "detailed",
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    try {
    const doc = new PDFDocument({
      margin: 50,
      size: "LETTER",
      info: {
        Title: resumeDocumentTitle(variant),
        Author: resume.name,
      },
    });

    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const w = contentWidth(doc);
    const certificationsByDecade = getCertificationsByDecadeForDocument(variant);
    const homepageMilestones = getMilestonesForDocument(variant);
    const summaryParas = getSummaryParagraphs(variant);
    const skills = getSkillsForDocument(variant);
    const experience = getExperienceForDocument(variant);
    const compact = variant === "concise";

    // —— Header (homepage hero fields) ——
    doc.fontSize(22).font("Helvetica-Bold").fillColor("#000000").text(resume.name);
    doc.moveDown(0.25);
    if (variant === "concise") {
      doc
        .fontSize(9)
        .font("Helvetica-Oblique")
        .fillColor("#525252")
        .text("Concise summary — highlights only", { width: w });
      doc.fillColor("#000000");
      doc.moveDown(0.25);
    }
    if (resume.legalName) {
      doc.fontSize(11).font("Helvetica").text(resume.legalName);
      doc.moveDown(0.25);
    }
    doc.font("Helvetica").fontSize(10).fillColor("#000000");
    if (resume.roleLine) {
      doc.text(resume.roleLine, { width: w });
      doc.moveDown(compact ? 0.15 : 0.25);
    }
    const domainExp = resume.domainExposure;
    if (domainExp?.domains?.length) {
      writeDomainExposureLine(doc, w, domainExp);
    }
    if (resume.headline.trim()) {
      doc.fontSize(12).font("Helvetica-Bold").text(resume.headline);
    }
    doc.moveDown(compact ? 0.25 : 0.35);
    doc.font("Helvetica").fontSize(10);
    if (resume.location) {
      doc.text(resume.location, { width: w });
      doc.moveDown(compact ? 0.35 : 0.5);
    }
    for (let i = 0; i < summaryParas.length; i++) {
      if (i > 0) doc.moveDown(compact ? 0.3 : 0.45);
      doc.text(summaryParas[i], { width: w, align: "left" });
    }

    // —— Contact ——
    beginSection(doc, "Contact", compact ? 72 : 120);
    if (includeContactNameBlock(variant)) {
      doc.font("Helvetica-Bold").text(resume.name);
      if (resume.legalName) {
        doc.font("Helvetica").text(resume.legalName);
      }
      doc.moveDown(0.3);
    }
    doc.font("Helvetica");
    const allContactLinks = [...resume.links, ...getSensitiveContactLinks()];
    for (const l of allContactLinks) {
      ensureSpace(doc, 16);
      const line = formatContactLine(l.label, l.href);
      // PDFKit link option is unreliable for mailto:/tel: in some runtimes
      if (l.href.startsWith("http://") || l.href.startsWith("https://")) {
        doc.text(line, { width: w, link: l.href });
      } else {
        doc.text(line, { width: w });
      }
    }
    if (resume.domainExposure?.domains?.length && !compact) {
      doc.moveDown(0.1);
      writeDomainExposureLine(doc, w, resume.domainExposure);
    }

    beginSection(doc, "AI skills", compact ? 40 : 56);
    for (const s of skills) {
      const line = s.level ? `${s.name} (${s.level})` : s.name;
      ensureSpace(doc, compact ? 40 : 56);
      doc.text(`• ${line}`, { width: w, indent: 8 });
      doc.moveDown(compact ? 0.2 : 0.35);
    }

    beginSection(doc, "Tech skills", 24);
    ensureSpace(doc, 24);
    doc.text((resume.techSkills ?? []).join(" · "), { width: w });

    // —— Certifications ——
    beginSection(doc, "Certifications", compact ? 20 : 76);
    if (includeCertificationDecadeHeaders(variant)) {
      const certLeft = doc.page.margins.left;
      for (let gi = 0; gi < certificationsByDecade.length; gi++) {
        const group = certificationsByDecade[gi];
        if (gi > 0) {
          beginSubsection(doc, 48);
          doc.moveDown(0.45);
          const yLine = doc.y;
          doc
            .strokeColor("#d4d4d8")
            .lineWidth(0.5)
            .moveTo(certLeft, yLine)
            .lineTo(certLeft + w, yLine)
            .stroke();
          doc.strokeColor("#000000");
          doc.moveDown(0.55);
        } else {
          beginSubsection(doc, 48);
        }
        doc.font("Helvetica-Bold").fontSize(10).text(group.label, { width: w });
        doc.font("Helvetica").fontSize(10);
        doc.moveDown(0.25);
        for (const c of group.items) {
          beginSubsection(doc, 36);
          doc.font("Helvetica-Bold").text(c.title, { width: w });
          doc.font("Helvetica");
          const issuerLine = [c.subtitle, c.year].filter(Boolean).join(" · ");
          if (issuerLine) doc.text(issuerLine, { width: w });
          doc.moveDown(0.35);
        }
        doc.moveDown(0.2);
      }
    } else {
      const certificationItems = getCertificationItemsForDocument(variant);
      for (const c of certificationItems) {
        ensureSpace(doc, 16);
        doc.text(`• ${formatConciseCertificationLine(c)}`, { width: w, indent: 8 });
        doc.moveDown(0.2);
      }
    }

    beginSection(doc, "Education", 52);
    const educationOrdered = [...resume.education].sort(
      (a, b) =>
        parseInt(b.end || b.start || "0", 10) -
        parseInt(a.end || a.start || "0", 10),
    );
    for (const ed of educationOrdered) {
      beginSubsection(doc, 40);
      doc.font("Helvetica-Bold").text(ed.degree, { width: w });
      doc.font("Helvetica");
      doc.text(ed.school, { width: w });
      const range = [ed.start, ed.end].filter(Boolean).join(" — ");
      if (range) doc.text(range, { width: w });
      if (ed.notes?.length) {
        doc.text(ed.notes.join(" · "), { width: w });
      }
      doc.moveDown(0.4);
    }

    beginSection(doc, "Corporate Exposure", 20);
    doc.text(CORPORATE_EXPERIENCE.map((c) => c.name).join(" · "), { width: w });

    beginSection(doc, "Work Experience", compact ? 60 : 80);
    for (const e of experience) {
      beginSubsection(doc, compact ? 48 : 60);
      doc
        .font("Helvetica-Bold")
        .text(`${e.role} • ${e.company}`, { width: w });
      doc.font("Helvetica");
      const meta = [e.location, `${e.start} — ${e.end ?? "Present"}`]
        .filter(Boolean)
        .join(" · ");
      if (meta) doc.text(meta, { width: w });
      doc.moveDown(0.2);
      for (const h of e.highlights) {
        ensureSpace(doc, 18);
        doc.text(`• ${h}`, { width: w, indent: 10 });
      }
      doc.moveDown(0.4);
    }

    beginSection(doc, "Major milestones", compact ? 28 : 40);
    for (const row of homepageMilestones) {
      beginSubsection(doc, compact ? 24 : 32);
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`${row.year} · ${row.milestoneType}`, { width: w });
      doc.font("Helvetica-Bold").text(row.title, { width: w });
      doc.font("Helvetica");
      if (includeMilestoneDescriptions(variant) && row.description) {
        doc.text(row.description, { width: w, indent: 10 });
      }
      doc.moveDown(compact ? 0.2 : 0.3);
    }

    doc.moveDown(1);
    ensureSpace(doc, 28);
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#525252")
      .text("- END OF DOCUMENT -", { width: w, align: "center" });
    doc.fillColor("#000000").font("Helvetica").fontSize(10);

    doc.end();
    } catch (err) {
      reject(err instanceof Error ? err : new Error(String(err)));
    }
  });
}
