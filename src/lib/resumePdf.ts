import PDFDocument from "pdfkit";
import { resume } from "@/content/resume";
import { getSensitiveContactLinks } from "@/lib/contactSensitive";
import {
  buildCertificationBoardItems,
  groupCertificationBoardItemsByDecade,
  CORPORATE_EXPERIENCE,
} from "@/content/resumeShared";

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function formatContactLine(label: string, href: string): string {
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

function sectionTitle(doc: InstanceType<typeof PDFDocument>, title: string) {
  doc.moveDown(0.8);
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text(title.toUpperCase(), { underline: true });
  doc.moveDown(0.4);
  doc.font("Helvetica").fontSize(10);
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
  }
}

/** Milestones excluding certifications and achievements (achievements have their own section). */
function buildTimelineRows() {
  return (resume.milestones ?? [])
    .filter(
      (m) =>
        m.type !== "certification" && m.type !== "achievement",
    )
    .map((m) => ({
      kind: "milestone" as const,
      year: parseInt(m.year, 10),
      label: m.type,
      title: m.title,
      detail: m.description || "",
    }))
    .sort((a, b) => a.year - b.year);
}

/** Achievements only (explicit section per product request). */
function buildAchievementRows() {
  return (resume.milestones ?? [])
    .filter((m) => m.type === "achievement")
    .map((m) => ({
      year: parseInt(m.year, 10),
      title: m.title,
      detail: m.description || "",
    }))
    .sort((a, b) => a.year - b.year);
}

export function generateResumePdfBuffer(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    try {
    const doc = new PDFDocument({
      margin: 50,
      size: "LETTER",
      info: {
        Title: `${resume.name} — Résumé`,
        Author: resume.name,
      },
    });

    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const w = contentWidth(doc);
    const certBoard = buildCertificationBoardItems();
    const certificationsByDecade = groupCertificationBoardItemsByDecade(certBoard);
    const achievements = buildAchievementRows();
    const timeline = buildTimelineRows();

    // —— Header ——
    doc.fontSize(22).font("Helvetica-Bold").fillColor("#000000").text(resume.name);
    doc.moveDown(0.25);
    if (resume.legalName) {
      doc.fontSize(11).font("Helvetica").text(resume.legalName);
      doc.moveDown(0.25);
    }
    doc.fontSize(12).font("Helvetica-Bold").text(resume.headline);
    doc.moveDown(0.35);
    doc.font("Helvetica").fontSize(10);
    if (resume.location) {
      doc.text(resume.location, { width: w });
      doc.moveDown(0.5);
    }
    doc.font("Helvetica").fontSize(10).text(resume.summary, { width: w, align: "left" });

    // —— Contact ——
    sectionTitle(doc, "Contact");
    ensureSpace(doc, 120);
    doc.font("Helvetica-Bold").text(resume.name);
    if (resume.legalName) {
      doc.font("Helvetica").text(resume.legalName);
    }
    doc.moveDown(0.3);
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

    sectionTitle(doc, "AI skills");
    for (const s of resume.skills) {
      const line = s.level ? `${s.name} (${s.level})` : s.name;
      ensureSpace(doc, 56);
      doc.text(`• ${line}`, { width: w, indent: 8 });
      doc.moveDown(0.35);
    }

    sectionTitle(doc, "Tech skills");
    ensureSpace(doc, 24);
    doc.text((resume.techSkills ?? []).join(" · "), { width: w });

    // —— Certifications by decade (same merge + order as homepage) ——
    sectionTitle(doc, "Certifications");
    const certLeft = doc.page.margins.left;
    for (let gi = 0; gi < certificationsByDecade.length; gi++) {
      const group = certificationsByDecade[gi];
      if (gi > 0) {
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
      }
      ensureSpace(doc, 28);
      doc.font("Helvetica-Bold").fontSize(10).text(group.label, { width: w });
      doc.font("Helvetica").fontSize(10);
      doc.moveDown(0.25);
      for (const c of group.items) {
        ensureSpace(doc, 48);
        doc.font("Helvetica-Bold").text(c.title, { width: w });
        doc.font("Helvetica");
        const issuerLine = [c.subtitle, c.year].filter(Boolean).join(" · ");
        if (issuerLine) doc.text(issuerLine, { width: w });
        doc.moveDown(0.35);
      }
      doc.moveDown(0.2);
    }

    sectionTitle(doc, "Corporate Exposure");
    ensureSpace(doc, 20);
    doc.text(CORPORATE_EXPERIENCE.map((c) => c.name).join(" · "), { width: w });

    sectionTitle(doc, "Work Experience");
    for (const e of resume.experience) {
      ensureSpace(doc, 80);
      doc
        .font("Helvetica-Bold")
        .text(`${e.role} · ${e.company}`, { width: w });
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

    sectionTitle(doc, "Education");
    const educationOrdered = [...resume.education].sort(
      (a, b) =>
        parseInt(b.end || b.start || "0", 10) -
        parseInt(a.end || a.start || "0", 10),
    );
    for (const ed of educationOrdered) {
      ensureSpace(doc, 52);
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

    // —— All achievement-type milestones ——
    sectionTitle(doc, "Achievements");
    for (const a of achievements) {
      ensureSpace(doc, 36);
      doc
        .font("Helvetica-Bold")
        .text(`${a.year} — ${a.title}`, { width: w });
      doc.font("Helvetica");
      if (a.detail) {
        doc.text(a.detail, { width: w, indent: 12 });
      }
      doc.moveDown(0.25);
    }

    // —— Awards, projects, etc. (Timeline without certs, achievements, education) ——
    sectionTitle(doc, "Major milestones");
    for (const row of timeline) {
      ensureSpace(doc, 40);
      doc
        .font("Helvetica-Bold")
        .text(`${row.year} · ${row.label}`, { width: w });
      doc.font("Helvetica-Bold").fontSize(10).text(row.title, { width: w });
      doc.font("Helvetica");
      if (row.detail) doc.text(row.detail, { width: w, indent: 10 });
      doc.moveDown(0.3);
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
