"use client";

import { use, useEffect, useId, useRef, useState } from "react";
import { resume } from "@/content/resume";
import type { CertificationBoardItem } from "@/content/resumeShared";
import {
  buildCertificationBoardItems,
  groupCertificationBoardItemsByDecade,
  CORPORATE_EXPERIENCE,
} from "@/content/resumeShared";
import { DomainExposurePills } from "@/components/site/DomainExposurePills";
import { TechSkillsPills } from "@/components/site/TechSkillsPills";
import { SkillsInfographic } from "@/components/site/SkillsInfographic";
import { AiCapabilityDiagram } from "@/components/site/AiCapabilityDiagram";
import { ValuePropositions } from "@/components/site/ValuePropositions";
import { useSectionHeadingFlash } from "@/components/site/useSectionHeadingFlash";
import { Container } from "@/components/ui/Container";
import { GoldMedalIcon } from "@/components/ui/GoldMedalIcon";
import { LocationPinIcon } from "@/components/ui/LocationPinIcon";
import { Timeline } from "@/components/ui/Timeline";

function Block({
  title,
  children,
  id,
  headingFlash,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
  headingFlash?: boolean;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      className="editorial-section"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="editorial-section-title"
      >
        <span
          className={`relative inline-block max-w-full pb-1${
            headingFlash ? " section-heading-nav-flash" : ""
          }`}
        >
          {title}
        </span>
      </h2>
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  );
}

function ProfilePhotoLightbox({
  open,
  onClose,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  alt: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div
        className="relative max-h-[min(90vh,36rem)] max-w-[min(90vw,36rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="focus-ring absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white shadow-lg transition-[background-color,transform] hover:bg-black/75 active:scale-95 motion-reduce:active:scale-100"
          aria-label="Close enlarged photo"
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <img
          src="/jag-portrait.webp"
          alt={alt}
          className="max-h-[min(90vh,36rem)] max-w-[min(90vw,36rem)] object-contain drop-shadow-2xl"
          decoding="async"
        />
      </div>
    </div>
  );
}

function CertificationRow({ c }: { c: CertificationBoardItem }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `cert-grad-${uid}`;
  return (
    <li className="group flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-foreground/[0.04]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/[0.04] ring-1 ring-inset ring-amber-500/15 shadow-sm dark:bg-amber-500/[0.02]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-foreground/70">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              {/* Premium gold/copper gradient stops matching GoldMedalIcon */}
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          {/* certificate body */}
          <rect x="2" y="2" width="16" height="14" rx="1.5" stroke={`url(#${gradId})`} strokeWidth="1.2" fill="none" />
          {/* text lines */}
          <line x1="5" y1="5.5" x2="15" y2="5.5" stroke={`url(#${gradId})`} strokeWidth="1" strokeLinecap="round" opacity="0.65" />
          <line x1="5" y1="8" x2="13" y2="8" stroke={`url(#${gradId})`} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <line x1="5" y1="10.5" x2="11" y2="10.5" stroke={`url(#${gradId})`} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
          {/* ribbon / seal */}
          <circle cx="14.5" cy="14.5" r="3.2" fill={`url(#${gradId})`} stroke="#b45309" strokeWidth="0.5" />
          <path d="M13.3 14.3l.8.8 1.6-1.6" stroke="#451a03" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight tracking-tight text-foreground">
          {c.title}
        </p>
        <p className="truncate text-xs text-foreground/55">
          {c.subtitle}
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[11px] font-medium text-foreground/60 whitespace-nowrap">
        {c.year}
      </span>
    </li>
  );
}

export default function Home({
  params,
}: {
  params: Promise<Record<string, string | string[] | undefined>>;
}) {
  use(params);

  const certificationBoardItems = buildCertificationBoardItems();
  const certificationsByDecade = groupCertificationBoardItemsByDecade(
    certificationBoardItems,
  );
  const [photoOpen, setPhotoOpen] = useState(false);
  const photoAlt = `Photo of ${resume.name}`;
  const flashSectionId = useSectionHeadingFlash();

  return (
    <main
      className="editorial-main min-w-0 overflow-x-hidden pb-16"
      aria-label="Profile and résumé"
    >
      <section
        id="connect"
        className="editorial-hero"
        aria-labelledby="hero-name-heading"
      >
        <Container>
          <div className="editorial-hero-grid">
            <div className="editorial-portrait-wrap">
              <button
                type="button"
                onClick={() => setPhotoOpen(true)}
                className="editorial-portrait-button focus-ring"
                aria-label={`View larger photo of ${resume.name}`}
              >
                <span className="editorial-portrait-frame">
                  <img
                    src="/jag-portrait.webp"
                    alt=""
                    className="editorial-portrait-img"
                    decoding="async"
                  />
                </span>
              </button>
            </div>

            <div className="editorial-hero-copy">
              <p className="editorial-eyebrow">
                {resume.roleLine}
                {resume.displayLocation ? ` · ${resume.displayLocation}` : ""}
              </p>
              <h1 id="hero-name-heading" className="editorial-hero-title">
                Designing <span>AI systems</span> that make complex work
                clearer, faster, and easier to scale.
              </h1>
              {resume.domainExposure ? (
                <div className="mt-7">
                  <DomainExposurePills
                    exposure={resume.domainExposure}
                    pillsJustify="start"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="editorial-logo-strip" aria-label="Selected corporate exposure">
            {CORPORATE_EXPERIENCE.slice(0, 6).map((company) => (
              <div key={company.name} className="editorial-logo-cell">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className="editorial-capability-grid">
            {resume.skills.slice(0, 3).map((skill) => (
              <article key={skill.title ?? skill.name} className="editorial-capability-card">
                <h2>{skill.title}</h2>
                <p>{skill.name}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <div className="editorial-section-stack">
          <Block
            title="Capability stack"
            id="capability-stack"
            headingFlash={flashSectionId === "capability-stack"}
          >
            <div className="editorial-image-panel">
              <AiCapabilityDiagram />
            </div>
          </Block>
          {resume.valuePropositions?.length ? (
            <Block
              title="How I Help"
              id="why-engage"
              headingFlash={flashSectionId === "why-engage"}
            >
              <ValuePropositions items={resume.valuePropositions} />
            </Block>
          ) : null}
          <Block title="AI Skills" id="ai-skills" headingFlash={flashSectionId === "ai-skills"}>
            <SkillsInfographic skills={resume.skills} />
          </Block>
          <Block title="Tech Skills" id="tech-skills" headingFlash={flashSectionId === "tech-skills"}>
            <TechSkillsPills skills={resume.techSkills ?? []} />
          </Block>
          <Block
            title="Certifications"
            id="certifications"
            headingFlash={flashSectionId === "certifications"}
          >
            <div className="flex flex-col">
              {certificationsByDecade.map((group, i) => (
                <section
                  key={group.id}
                  id={`certifications-${group.id}`}
                  aria-labelledby={`certifications-${group.id}-heading`}
                  className={
                    "min-w-0 scroll-mt-28" +
                    (i > 0
                      ? " mt-5 border-t border-foreground/10 pt-5 md:mt-6 md:pt-6"
                      : "")
                  }
                >
                  <h3
                    id={`certifications-${group.id}-heading`}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50 sm:text-xs"
                  >
                    {group.label}
                  </h3>
                  <ul className="mt-2 grid gap-x-2 sm:grid-cols-2">
                    {group.items.map((c) => (
                      <CertificationRow key={c.id} c={c} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </Block>
          <Block title="Education" id="education" headingFlash={flashSectionId === "education"}>
            <div className="space-y-6 md:space-y-8">
              {[...resume.education]
                .sort(
                  (a, b) =>
                    parseInt(b.end || b.start || "0", 10) -
                    parseInt(a.end || a.start || "0", 10),
                )
                .map((ed) => (
                  <div
                    key={`${ed.school}-${ed.degree}`}
                    className="space-y-2 border-b border-foreground/10 pb-6 last:border-b-0 last:pb-0 md:pb-8 md:last:pb-0"
                  >
                    <p className="break-words text-sm font-semibold leading-snug tracking-tight text-foreground">
                      {ed.degree}
                    </p>
                    <p className="text-sm text-foreground/75">{ed.school}</p>
                    <p className="font-mono text-xs text-foreground/60">
                      {[ed.start, ed.end].filter(Boolean).join(" — ") || "—"}
                    </p>
                    {ed.notes && ed.notes.length > 0 ? (
                      <p className="text-sm italic text-foreground/65">
                        {ed.notes.map((note, i) => (
                          <span key={`${ed.school}-${note}-${i}`}>
                            {i > 0 ? " · " : null}
                            {/gold\s*medal/i.test(note) ? (
                              <span className="inline-flex items-center gap-1.5 align-middle [font-style:normal] not-italic">
                                <GoldMedalIcon size={16} className="shrink-0" />
                                <span className="italic">{note}</span>
                              </span>
                            ) : (
                              note
                            )}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
          </Block>
          <Block
            title="Corporate Exposure"
            id="corporate-exposure"
            headingFlash={flashSectionId === "corporate-exposure"}
          >
            <div className="editorial-logo-strip editorial-logo-strip--section" aria-label="Corporate exposure logos">
              {CORPORATE_EXPERIENCE.map((company) => (
                <div
                  key={company.name}
                  className="editorial-logo-cell"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </Block>
          <Block
            title="Work Experience"
            id="work-experience"
            headingFlash={flashSectionId === "work-experience"}
          >
            <div className="space-y-6 md:space-y-8">
              {resume.experience.map((e) => (
                <div
                  key={`${e.company}-${e.role}`}
                  className="space-y-2 border-b border-foreground/10 pb-6 last:border-b-0 last:pb-0 md:pb-8 md:last:pb-0"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div className="min-w-0 flex flex-col">
                      <p className="break-words text-sm font-semibold leading-snug tracking-tight">
                        {e.role} • {e.company}
                      </p>
                      {e.location ? (
                        <p className="flex items-center gap-1 text-xs text-foreground/60">
                          <LocationPinIcon className="h-3 w-3 shrink-0 text-foreground/55" />
                          {e.location}
                        </p>
                      ) : null}
                    </div>
                    <p className="shrink-0 font-mono text-xs text-foreground/60 md:whitespace-nowrap">
                      {e.start} — {e.end ?? "Present"}
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-foreground/75">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                        <span className="min-w-0 break-words">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
          <Block
            title="Major Milestones"
            id="milestones"
            headingFlash={flashSectionId === "milestones"}
          >
            <Timeline milestones={resume.milestones} />
          </Block>
        </div>
      </Container>
      <ProfilePhotoLightbox
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        alt={photoAlt}
      />
    </main>
  );
}
