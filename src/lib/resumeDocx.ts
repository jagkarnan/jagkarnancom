import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
} from "docx";
import { resume } from "@/content/resume";
import { getSensitiveContactLinks } from "@/lib/contactSensitive";
import {
  DOCX_PT,
  formatContactLine,
} from "@/lib/resumeDocumentHelpers";
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

function bodySize() {
  return DOCX_PT(10);
}

function sectionHeading(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    keepNext: true,
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        underline: { type: UnderlineType.SINGLE },
        size: DOCX_PT(11),
      }),
    ],
  });
}

function subsectionHeading(text: string): Paragraph {
  return new Paragraph({
    keepNext: true,
    children: [new TextRun({ text, bold: true, size: bodySize() })],
  });
}

function itemHeading(text: string): Paragraph {
  return new Paragraph({
    keepNext: true,
    children: [new TextRun({ text, bold: true, size: bodySize() })],
  });
}

function contactLineParagraph(l: { label: string; href: string }): Paragraph {
  const line = formatContactLine(l.label, l.href);
  if (l.href.startsWith("http://") || l.href.startsWith("https://")) {
    return new Paragraph({
      children: [
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: line,
              style: "Hyperlink",
              size: bodySize(),
            }),
          ],
          link: l.href,
        }),
      ],
    });
  }
  return new Paragraph({
    children: [new TextRun({ text: line, size: bodySize() })],
  });
}

export async function generateResumeDocxBuffer(
  variant: ResumeDocumentVariant = "detailed",
): Promise<Buffer> {
  const certificationsByDecade = getCertificationsByDecadeForDocument(variant);
  const homepageMilestones = getMilestonesForDocument(variant);
  const summaryParas = getSummaryParagraphs(variant);
  const skills = getSkillsForDocument(variant);
  const experience = getExperienceForDocument(variant);

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: resume.name, bold: true, size: DOCX_PT(22) })],
    }),
  );
  if (variant === "concise") {
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: "Concise summary — highlights only",
            italics: true,
            size: DOCX_PT(9),
            color: "525252",
          }),
        ],
      }),
    );
  }
  if (resume.legalName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: resume.legalName, size: DOCX_PT(11) })],
      }),
    );
  }
  if (resume.roleLine) {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: resume.roleLine, size: bodySize() })],
      }),
    );
  }
  const domainExposure = resume.domainExposure;
  if (domainExposure?.domains?.length) {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `${domainExposure.label}: `,
            bold: true,
            size: bodySize(),
          }),
          new TextRun({
            text: domainExposure.domains.join(", "),
            size: bodySize(),
          }),
        ],
      }),
    );
  }
  if (resume.headline.trim()) {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: resume.headline, bold: true, size: DOCX_PT(12) }),
        ],
      }),
    );
  }
  if (resume.location) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: resume.location, size: bodySize() })],
      }),
    );
  }
  for (const para of summaryParas) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: para, size: bodySize() })],
      }),
    );
  }

  children.push(sectionHeading("Contact"));
  if (includeContactNameBlock(variant)) {
    children.push(
      new Paragraph({
        keepNext: true,
        children: [new TextRun({ text: resume.name, bold: true, size: bodySize() })],
      }),
    );
    if (resume.legalName) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: resume.legalName, size: bodySize() })],
        }),
      );
    }
  }
  for (const l of [...resume.links, ...getSensitiveContactLinks()]) {
    children.push(contactLineParagraph(l));
  }
  if (resume.domainExposure?.domains?.length && variant === "detailed") {
    const de = resume.domainExposure;
    children.push(
      new Paragraph({
        spacing: { before: 140, after: 80 },
        children: [
          new TextRun({
            text: `${de.label}: `,
            bold: true,
            size: bodySize(),
          }),
          new TextRun({
            text: de.domains.join(", "),
            size: bodySize(),
          }),
        ],
      }),
    );
  }

  children.push(sectionHeading("AI skills"));
  for (const s of skills) {
    const line = s.level ? `${s.name} (${s.level})` : s.name;
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `• ${line}`, size: bodySize() })],
        indent: { left: 360 },
      }),
    );
  }

  children.push(sectionHeading("Tech skills"));
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: (resume.techSkills ?? []).join(" · "),
          size: bodySize(),
        }),
      ],
    }),
  );

  children.push(sectionHeading("Certifications"));
  if (includeCertificationDecadeHeaders(variant)) {
    for (let gi = 0; gi < certificationsByDecade.length; gi++) {
      const group = certificationsByDecade[gi];
      if (gi > 0) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60 },
            border: {
              bottom: { color: "D4D4D8", size: 4, style: "single", space: 1 },
            },
          }),
        );
      }
      children.push(subsectionHeading(group.label));
      for (const c of group.items) {
        children.push(itemHeading(c.title));
        const issuerLine = [c.subtitle, c.year].filter(Boolean).join(" · ");
        if (issuerLine) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: issuerLine, size: bodySize() })],
            }),
          );
        }
      }
    }
  } else {
    for (const c of getCertificationItemsForDocument(variant)) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${formatConciseCertificationLine(c)}`,
              size: bodySize(),
            }),
          ],
          indent: { left: 360 },
        }),
      );
    }
  }

  children.push(sectionHeading("Education"));
  const educationOrdered = [...resume.education].sort(
    (a, b) =>
      parseInt(b.end || b.start || "0", 10) -
      parseInt(a.end || a.start || "0", 10),
  );
  for (const ed of educationOrdered) {
    children.push(itemHeading(ed.degree));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: ed.school, size: bodySize() })],
      }),
    );
    const range = [ed.start, ed.end].filter(Boolean).join(" — ");
    if (range) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: range, size: bodySize() })],
        }),
      );
    }
    if (ed.notes?.length) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: ed.notes.join(" · "), size: bodySize() })],
        }),
      );
    }
  }

  children.push(sectionHeading("Corporate Exposure"));
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: CORPORATE_EXPERIENCE.map((c) => c.name).join(" · "),
          size: bodySize(),
        }),
      ],
    }),
  );

  children.push(sectionHeading("Work Experience"));
  for (const e of experience) {
    children.push(
      new Paragraph({
        keepNext: true,
        children: [
          new TextRun({
            text: `${e.role} • ${e.company}`,
            bold: true,
            size: bodySize(),
          }),
        ],
      }),
    );
    const meta = [e.location, `${e.start} — ${e.end ?? "Present"}`]
      .filter(Boolean)
      .join(" · ");
    if (meta) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: meta, size: bodySize() })],
        }),
      );
    }
    for (const h of e.highlights) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${h}`, size: bodySize() })],
          indent: { left: 360 },
        }),
      );
    }
  }

  children.push(sectionHeading("Major milestones"));
  for (const row of homepageMilestones) {
    children.push(
      new Paragraph({
        keepNext: true,
        children: [
          new TextRun({
            text: `${row.year} · ${row.milestoneType}`,
            bold: true,
            size: bodySize(),
          }),
        ],
      }),
    );
    children.push(itemHeading(row.title));
    if (includeMilestoneDescriptions(variant) && row.description) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: row.description, size: bodySize() })],
          indent: { left: 360 },
        }),
      );
    }
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300 },
      children: [
        new TextRun({
          text: "- END OF DOCUMENT -",
          size: DOCX_PT(9),
          color: "525252",
        }),
      ],
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
    title: resumeDocumentTitle(variant),
    description: "Generated from site content",
    creator: resume.name,
  });

  return Packer.toBuffer(doc);
}
