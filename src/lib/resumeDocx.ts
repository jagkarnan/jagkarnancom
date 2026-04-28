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
  buildAchievementRows,
  buildTimelineRows,
  DOCX_PT,
  formatContactLine,
} from "@/lib/resumeDocumentHelpers";
import {
  buildCertificationBoardItems,
  groupCertificationBoardItemsByDecade,
  CORPORATE_EXPERIENCE,
} from "@/content/resumeShared";

function bodySize() {
  return DOCX_PT(10);
}

function sectionHeading(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
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

export async function generateResumeDocxBuffer(): Promise<Buffer> {
  const certBoard = buildCertificationBoardItems();
  const certificationsByDecade = groupCertificationBoardItemsByDecade(certBoard);
  const achievements = buildAchievementRows();
  const timeline = buildTimelineRows();

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: resume.name, bold: true, size: DOCX_PT(22) })],
    }),
  );
  if (resume.legalName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: resume.legalName, size: DOCX_PT(11) })],
      }),
    );
  }
  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: resume.headline, bold: true, size: DOCX_PT(12) }),
      ],
    }),
  );
  if (resume.location) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: resume.location, size: bodySize() })],
      }),
    );
  }
  for (const para of resume.summary.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: para, size: bodySize() })],
      }),
    );
  }

  children.push(sectionHeading("Contact"));
  children.push(
    new Paragraph({
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
  for (const l of [...resume.links, ...getSensitiveContactLinks()]) {
    children.push(contactLineParagraph(l));
  }

  children.push(sectionHeading("AI skills"));
  for (const s of resume.skills) {
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
    children.push(
      new Paragraph({
        children: [new TextRun({ text: group.label, bold: true, size: bodySize() })],
      }),
    );
    for (const c of group.items) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: c.title, bold: true, size: bodySize() })],
        }),
      );
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
  for (const e of resume.experience) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${e.role} · ${e.company}`,
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

  children.push(sectionHeading("Education"));
  const educationOrdered = [...resume.education].sort(
    (a, b) =>
      parseInt(b.end || b.start || "0", 10) -
      parseInt(a.end || a.start || "0", 10),
  );
  for (const ed of educationOrdered) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: ed.degree, bold: true, size: bodySize() })],
      }),
    );
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

  children.push(sectionHeading("Achievements"));
  for (const a of achievements) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${a.year} — ${a.title}`,
            bold: true,
            size: bodySize(),
          }),
        ],
      }),
    );
    if (a.detail) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: a.detail, size: bodySize() })],
          indent: { left: 360 },
        }),
      );
    }
  }

  children.push(sectionHeading("Major milestones"));
  for (const row of timeline) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${row.year} · ${row.label}`,
            bold: true,
            size: bodySize(),
          }),
        ],
      }),
    );
    children.push(
      new Paragraph({
        children: [new TextRun({ text: row.title, bold: true, size: bodySize() })],
      }),
    );
    if (row.detail) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: row.detail, size: bodySize() })],
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
    title: `${resume.name} — Résumé`,
    description: "Generated from site content",
    creator: resume.name,
  });

  return Packer.toBuffer(doc);
}
