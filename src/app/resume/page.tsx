"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resume } from "@/content/resume";

const CORPORATE_EXPERIENCE = [
  { name: "British Telecom", logo: "/logos/bt.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "Avanade", logo: "/logos/avanade.png" },
  { name: "Accenture", logo: "/logos/accenture.png" },
  { name: "Nike", logo: "/logos/nike.png" },
  { name: "Agility Logistics", logo: "/logos/agility.png" },
] as const;

type MilestoneRow =
  | {
      kind: "education";
      year: number;
      degree: string;
      school: string;
      notes?: string[];
    }
  | {
      kind: "milestone";
      year: number;
      milestoneType: string;
      title: string;
      description: string;
    };

function buildMajorMilestoneRows(): MilestoneRow[] {
  const educationRows: MilestoneRow[] = resume.education.map((e) => ({
    kind: "education" as const,
    year: parseInt(e.end || e.start || "0", 10),
    degree: e.degree,
    school: e.school,
    notes: e.notes,
  }));
  const milestoneRows: MilestoneRow[] = (resume.milestones ?? [])
    .filter((m) => m.type !== "certification")
    .map((m) => ({
      kind: "milestone" as const,
      year: parseInt(m.year, 10),
      milestoneType: m.type,
      title: m.title,
      description: m.description,
    }));
  return [...educationRows, ...milestoneRows].sort((a, b) => a.year - b.year);
}

/** Module-level data so the print layout renders immediately (no Suspense blank shell). */
const MAJOR_MILESTONE_ROWS = buildMajorMilestoneRows();
const CERTIFICATIONS_PRIMARY = [...resume.certifications].sort(
  (a, b) => parseInt(b.date || "0", 10) - parseInt(a.date || "0", 10),
);
const CERTIFICATIONS_FROM_MILESTONES = (resume.milestones ?? [])
  .filter((m) => m.type === "certification")
  .sort(
    (a, b) =>
      parseInt(b.year || "0", 10) - parseInt(a.year || "0", 10),
  );

const WEB_LINKS = resume.links.filter(
  (l) => !l.label.includes("Call") && !l.label.includes("WhatsApp"),
);
const PHONE_LINKS = resume.links.filter(
  (l) => l.label.includes("Call") || l.label.includes("WhatsApp"),
);

function formatContactLine(label: string, href: string): string {
  if (href.startsWith("mailto:")) {
    return `${label}: ${href.slice("mailto:".length)}`;
  }
  if (href.startsWith("tel:")) {
    const n = href.replace(/^tel:/, "").replace(/\s/g, "");
    return `${label}: ${n}`;
  }
  if (href.includes("wa.me/")) {
    const id = href.split("wa.me/")[1]?.split(/[?#]/)[0] ?? "";
    return `${label}: +${id}`;
  }
  return `${label}: ${href}`;
}

/**
 * Full résumé markup — always mounted. Do not put this behind useSearchParams + empty Suspense fallback
 * or Save as PDF can capture a blank first page.
 */
function ResumePrintBody() {
  return (
    <main className="resume-print-root min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="resume-doc-header mb-6 flex gap-5 border-b border-black pb-4">
          <img
            src="/profile-photo.jpg"
            alt=""
            className="h-24 w-24 shrink-0 rounded-full object-cover border border-black/20"
          />
          <div className="min-w-0 flex-1 text-black">
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              {resume.name}
            </h1>
            {resume.legalName ? (
              <p className="mt-0.5 text-sm text-black">{resume.legalName}</p>
            ) : null}
            <p className="mt-1 text-sm text-black">{resume.headline}</p>
            {resume.location ? (
              <p className="mt-1 text-xs text-black">{resume.location}</p>
            ) : null}
          </div>
        </div>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-black">{resume.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Contact
          </h2>
          <div
            className="resume-contact-box space-y-1 rounded-md border border-neutral-300 bg-neutral-100 p-3 text-sm text-black"
            style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
          >
            <p className="font-semibold text-black">{resume.name}</p>
            {resume.legalName ? (
              <p className="text-xs text-black">{resume.legalName}</p>
            ) : null}
            {WEB_LINKS.map((l) => (
              <p key={l.href} className="break-words text-black">
                {formatContactLine(l.label, l.href)}
              </p>
            ))}
            {PHONE_LINKS.map((l) => (
              <p key={l.href} className="break-words text-black">
                {formatContactLine(l.label, l.href)}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            AI focus
          </h2>
          <ul className="list-disc space-y-1 pl-4 text-sm text-black">
            {resume.aiFocusAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            AI Skills
          </h2>
          <div className="grid grid-cols-2 gap-y-1 text-sm text-black">
            {resume.skills.map((s) => (
              <div key={s.name} className="flex flex-wrap gap-1">
                <span className="font-medium">{s.name}</span>
                {s.level ? (
                  <span className="font-mono text-xs text-black">{s.level}</span>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Tech Skills
          </h2>
          <p className="text-sm leading-relaxed text-black">
            {(resume.techSkills ?? []).join(" · ")}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Certifications
          </h2>
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-black">
            Primary credentials
          </h3>
          <ul className="mb-5 space-y-2 text-sm text-black">
            {CERTIFICATIONS_PRIMARY.map((c) => (
              <li
                key={`cert-primary-${c.name}-${c.date}`}
                className="resume-cert-item border-b border-neutral-300 pb-2 last:border-0"
              >
                <span className="font-semibold text-black">{c.name}</span>
                {" · "}
                <span className="text-black">{c.issuer}</span>
                {" · "}
                <span className="text-xs text-black">{c.date}</span>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-black">
            Additional credentials (historic)
          </h3>
          <ul className="space-y-2 text-sm text-black">
            {CERTIFICATIONS_FROM_MILESTONES.map((m) => (
              <li
                key={`cert-milestone-${m.title}-${m.year}`}
                className="resume-cert-item border-b border-neutral-300 pb-2 last:border-0"
              >
                <span className="font-semibold text-black">{m.title}</span>
                {m.description ? (
                  <>
                    {" · "}
                    <span className="text-black">{m.description}</span>
                  </>
                ) : null}
                {" · "}
                <span className="text-xs text-black">{m.year}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Corporate Experience
          </h2>
          <div className="flex flex-wrap items-end justify-start gap-6">
            {CORPORATE_EXPERIENCE.map((company) => (
              <div
                key={company.name}
                className="flex w-[7.5rem] flex-col items-center gap-1"
              >
                <div className="flex h-14 w-full items-center justify-center rounded-lg border border-neutral-300 bg-white px-2 py-1">
                  <img
                    src={company.logo}
                    alt=""
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <span className="text-center text-[10px] font-medium leading-tight text-black">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Experience
          </h2>
          <div className="space-y-4 text-sm">
            {resume.experience.map((e) => (
              <div key={`${e.company}-${e.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-black">
                      {e.role} • {e.company}
                    </p>
                    {e.location ? (
                      <p className="text-xs text-black">{e.location}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 whitespace-nowrap font-mono text-xs text-black">
                    {e.start} — {e.end ?? "Present"}
                  </p>
                </div>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-black">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black">
            Major Milestones
          </h2>
          <div className="space-y-3 text-sm text-black">
            {MAJOR_MILESTONE_ROWS.map((row, i) =>
              row.kind === "education" ? (
                <div
                  key={`ed-${row.school}-${row.degree}-${i}`}
                  className="border-b border-neutral-300 pb-3 last:border-0"
                >
                  <p className="font-mono text-xs text-black">
                    {row.year} · education
                  </p>
                  <p className="font-semibold text-black">{row.degree}</p>
                  <p className="text-black">{row.school}</p>
                  {row.notes && row.notes.length > 0 ? (
                    <p className="mt-0.5 text-xs italic text-black">
                      {row.notes.join(" · ")}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div
                  key={`ms-${row.title}-${row.year}-${i}`}
                  className="border-b border-neutral-300 pb-3 last:border-0"
                >
                  <p className="font-mono text-xs text-black">
                    {row.year} · {row.milestoneType}
                  </p>
                  <p className="font-semibold text-black">{row.title}</p>
                  {row.description ? (
                    <p className="text-sm text-black">{row.description}</p>
                  ) : null}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/** Only this hook needs Suspense — body is already on screen. */
function AutoPrintWhenPdfQuery() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("pdf") !== "1") return;
    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      requestAnimationFrame(() => {
        if (!cancelled) window.print();
      });
    }, 750);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchParams]);

  return null;
}

export default function PrintableResume() {
  return (
    <>
      <ResumePrintBody />
      <Suspense fallback={null}>
        <AutoPrintWhenPdfQuery />
      </Suspense>
    </>
  );
}
