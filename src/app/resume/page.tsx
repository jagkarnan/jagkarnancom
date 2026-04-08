"use client";

import { Suspense, use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resume } from "@/content/resume";
import {
  ObfuscatedResumeEmailRow,
  ObfuscatedResumeTelRow,
  ObfuscatedResumeWaRow,
} from "@/components/contact/ObfuscatedContactAnchors";
import {
  buildCertificationBoardItems,
  groupCertificationBoardItemsByDecade,
  CORPORATE_EXPERIENCE,
  getIssuerInitials,
} from "@/content/resumeShared";

type MilestoneRow = {
  year: number;
  milestoneType: string;
  title: string;
  description: string;
};

function buildMajorMilestoneRows(): MilestoneRow[] {
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

const EDUCATION_PRINT_ORDERED = [...resume.education].sort(
  (a, b) =>
    parseInt(b.end || b.start || "0", 10) -
    parseInt(a.end || a.start || "0", 10),
);

const MAJOR_MILESTONE_ROWS = buildMajorMilestoneRows();
const CERTIFICATION_BOARD_ITEMS = buildCertificationBoardItems();
const CERTIFICATIONS_BY_DECADE = groupCertificationBoardItemsByDecade(
  CERTIFICATION_BOARD_ITEMS,
);

const PUBLIC_WEB_LINKS = resume.links;

const printExact = {
  WebkitPrintColorAdjust: "exact" as const,
  printColorAdjust: "exact" as const,
};

/**
 * Section order and content mirror the public site (`/`):
 * Hero → Contact → AI Skills → Tech Skills → Certifications →
 * Corporate Exposure → Work Experience → Education → Major Milestones
 */
function ResumePrintBody() {
  const certName = resume.legalName ?? resume.name;

  return (
    <main className="resume-print-root min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* —— Hero (same content as home hero; no separate “Summary” heading) —— */}
        <section className="resume-doc-header mb-8 flex gap-5 border-b-2 border-black pb-6">
          <img
            src="/profile-photo.jpg"
            alt=""
            className="h-24 w-24 shrink-0 rounded-full object-cover border-2 border-neutral-400"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              {resume.name}
            </h1>
            {resume.legalName ? (
              <p className="mt-0.5 text-sm font-medium text-black">
                {resume.legalName}
              </p>
            ) : null}
            <p className="mt-2 text-sm leading-snug text-black">
              {resume.headline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black">
              {resume.summary}
            </p>
            {resume.location ? (
              <p className="mt-3 text-sm text-black">{resume.location}</p>
            ) : null}
          </div>
        </section>

        {/* —— Contact —— */}
        <section className="mb-8 break-inside-avoid">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Contact
          </h2>
          <div
            className="space-y-2 rounded-lg border-2 border-neutral-500 bg-neutral-100 p-4 text-sm text-black"
            style={printExact}
          >
            <p className="font-semibold text-black">{resume.name}</p>
            {resume.legalName ? (
              <p className="text-xs text-black">{resume.legalName}</p>
            ) : null}
            <div className="flex flex-col gap-2 border-t border-neutral-400 pt-2">
              <ObfuscatedResumeEmailRow className="break-all text-black underline decoration-black underline-offset-2" />
              {PUBLIC_WEB_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="break-all text-black underline decoration-black underline-offset-2"
                >
                  <span className="font-medium">{l.label}:</span> {l.href}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-t border-neutral-400 pt-2">
              <ObfuscatedResumeTelRow className="break-all text-black underline decoration-black underline-offset-2" />
              <ObfuscatedResumeWaRow className="break-all text-black underline decoration-black underline-offset-2" />
            </div>
          </div>
        </section>

        {/* —— AI Skills —— */}
        <section className="mb-8">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            AI Skills
          </h2>
          <ul className="space-y-3 text-sm text-black">
            {resume.skills.map((s) => (
              <li key={s.name} className="flex gap-3 text-pretty">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                  aria-hidden
                />
                <span className="min-w-0 leading-relaxed">{s.name}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* —— Tech Skills —— */}
        <section className="mb-8">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Tech Skills
          </h2>
          <div className="flex flex-wrap gap-2 text-sm text-black">
            {(resume.techSkills ?? []).map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-600 bg-neutral-50 px-3 py-1 font-medium text-black"
                style={printExact}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* —— Certifications by decade (same merged list as home) —— */}
        <section className="mb-8">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Certifications
          </h2>
          <div className="flex flex-col">
            {CERTIFICATIONS_BY_DECADE.map((group, i) => (
              <div
                key={group.id}
                className={
                  "min-w-0" +
                  (i > 0 ? " mt-6 border-t border-neutral-300 pt-6" : "")
                }
              >
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-800">
                  {group.label}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {group.items.map((c) => (
                    <div
                      key={c.id}
                      className="resume-print-cert relative flex flex-col rounded-[16px] border-2 border-black bg-[#f5f0e6] px-3 py-3 text-black shadow-sm"
                      style={printExact}
                    >
                      <div
                        className="pointer-events-none absolute inset-1 rounded-[14px] border border-black/70"
                        aria-hidden
                      />
                      <div className="relative flex flex-1 flex-col gap-2">
                        <div className="flex min-w-0 items-start gap-2 border-b border-black/50 pb-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-700 text-[10px] font-bold text-white">
                            {getIssuerInitials(c.subtitle)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-700">
                              Certificate of Achievement
                            </p>
                            <p className="text-xs font-semibold text-black">
                              {c.subtitle || "Accredited Issuer"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                            This is to certify that
                          </p>
                          <p className="text-sm font-semibold text-black">{certName}</p>
                          <p className="text-[10px] text-neutral-700">
                            has successfully attained
                          </p>
                          <p className="text-xs font-semibold leading-snug text-black">
                            {c.title}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-black/40 pt-2">
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-700">
                              Awarded
                            </p>
                            <p className="mt-0.5 inline-block rounded-full border border-black px-2 py-0.5 font-mono text-[10px] text-black">
                              {c.year}
                            </p>
                          </div>
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-red-800 bg-red-600 text-sm font-bold text-white"
                            style={printExact}
                            aria-hidden
                          >
                            ★
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* —— Corporate Exposure —— */}
        <section className="mb-8 break-inside-avoid">
          <h2 className="mb-4 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Corporate Exposure
          </h2>
          <div className="flex flex-wrap items-end justify-center gap-8">
            {CORPORATE_EXPERIENCE.map((company) => (
              <div
                key={company.name}
                className="flex w-40 flex-col items-center gap-2"
              >
                <div className="corporate-logo-tile flex h-[4.5rem] w-full items-center justify-center rounded-xl border-2 border-neutral-400 px-2 py-2">
                  <img
                    src={company.logo}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-center text-xs font-medium text-black">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* —— Work Experience —— */}
        <section className="mb-8">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Work Experience
          </h2>
          <div className="space-y-5 text-sm text-black">
            {resume.experience.map((e) => (
              <div key={`${e.company}-${e.role}`} className="space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-black">
                      {e.role} • {e.company}
                    </p>
                    {e.location ? (
                      <p className="text-xs text-black">{e.location}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-mono text-xs text-black sm:whitespace-nowrap">
                    {e.start} — {e.end ?? "Present"}
                  </p>
                </div>
                <ul className="space-y-2">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                        aria-hidden
                      />
                      <span className="min-w-0 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* —— Education —— */}
        <section className="mb-8">
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Education
          </h2>
          <div className="space-y-4 text-sm text-black">
            {EDUCATION_PRINT_ORDERED.map((ed) => (
              <div
                key={`${ed.school}-${ed.degree}`}
                className="resume-milestone-item border-b border-neutral-400 pb-4 last:border-0"
              >
                <p className="font-semibold text-black">{ed.degree}</p>
                <p className="mt-1 text-black">{ed.school}</p>
                <p className="mt-1 font-mono text-xs text-black">
                  {[ed.start, ed.end].filter(Boolean).join(" — ") || "—"}
                </p>
                {ed.notes && ed.notes.length > 0 ? (
                  <p className="mt-1 text-xs italic text-black">
                    {ed.notes.join(" · ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* —— Major Milestones (non-cert milestones; same basis as site Timeline) —— */}
        <section>
          <h2 className="mb-3 border-b border-black pb-1 text-sm font-semibold uppercase tracking-wide text-black">
            Major Milestones
          </h2>
          <div className="space-y-4 text-sm text-black">
            {MAJOR_MILESTONE_ROWS.map((row, i) => (
              <div
                key={`ms-${row.title}-${row.year}-${i}`}
                className="resume-milestone-item border-b border-neutral-400 pb-4 last:border-0"
              >
                <p className="font-mono text-xs font-semibold text-black">
                  {row.year} · {row.milestoneType}
                </p>
                <p className="mt-1 font-semibold text-black">{row.title}</p>
                {row.description ? (
                  <p className="mt-1 leading-relaxed text-black">
                    {row.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

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

export default function PrintableResume({
  params,
}: {
  params: Promise<Record<string, string | string[] | undefined>>;
}) {
  use(params);

  return (
    <>
      <ResumePrintBody />
      <Suspense fallback={null}>
        <AutoPrintWhenPdfQuery />
      </Suspense>
    </>
  );
}
