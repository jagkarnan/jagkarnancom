"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resume } from "@/content/resume";

function PrintableResumeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
  if (searchParams.get("pdf") === "1") {
      // Give the browser a moment to render before opening the print dialog
      const timeout = setTimeout(() => {
        window.print();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <header className="border-b border-black pb-4 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {resume.name}
          </h1>
          <p className="text-sm mt-1">{resume.headline}</p>
          {resume.location ? (
            <p className="text-xs mt-1 text-black">{resume.location}</p>
          ) : null}
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-black">
            {resume.summary}
          </p>
        </section>

        {/* AI Focus */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            AI Focus
          </h2>
          <ul className="list-disc pl-4 space-y-1 text-sm text-black">
            {resume.aiFocusAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        {/* AI Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            AI Skills
          </h2>
          <div className="grid grid-cols-2 gap-y-1 text-sm text-black">
            {resume.skills.map((s) => (
              <div key={s.name} className="flex gap-1">
                <span className="font-medium">{s.name}</span>
                {s.level ? (
                  <span className="text-xs text-black">({s.level})</span>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            Experience
          </h2>
          <div className="space-y-4 text-sm">
            {resume.experience.map((e) => (
              <div key={`${e.company}-${e.role}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-semibold">
                      {e.role} • {e.company}
                    </p>
                    {e.location ? (
                      <p className="text-xs text-black">{e.location}</p>
                    ) : null}
                  </div>
                  <p className="text-xs text-black whitespace-nowrap">
                    {e.start} — {e.end ?? "Present"}
                  </p>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-black">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            Education
          </h2>
          <div className="space-y-2 text-sm">
            {resume.education.map((ed) => (
              <div key={`${ed.school}-${ed.degree}`}>
                <p className="font-semibold">{ed.degree}</p>
                <p className="text-black">{ed.school}</p>
                <p className="text-xs text-black">
                  {ed.start} — {ed.end}
                </p>
                {ed.notes && ed.notes.length > 0 ? (
                  <p className="text-xs text-black mt-0.5">
                    {ed.notes.join(" • ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications (compact) */}
        <section>
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            Certifications
          </h2>
          <ul className="space-y-1 text-sm text-black">
            {resume.certifications.map((c) => (
              <li key={`${c.name}-${c.date}`}>
                <span className="font-semibold">{c.name}</span>
                {" • "}
                <span>{c.issuer}</span>
                {" • "}
                <span className="text-xs text-black">{c.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default function PrintableResume() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PrintableResumeContent />
    </Suspense>
  );
}

