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
import { ValuePropositions } from "@/components/site/ValuePropositions";
import { ContactChannels } from "@/components/contact/ContactPageBody";
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
      className="glass-card rounded-xl p-4 sm:p-6"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="text-xs font-semibold uppercase leading-tight tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]"
      >
        <span
          className={`relative inline-block max-w-full pb-1${
            headingFlash ? " section-heading-nav-flash" : ""
          }`}
        >
          {title}
        </span>
      </h2>
      <div className="mt-4 md:mt-6">{children}</div>
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
  onCloseRef.current = onClose;

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
          src="/profile-photo.jpg"
          alt={alt}
          className="max-h-[min(90vh,36rem)] max-w-[min(90vw,36rem)] rounded-full border-2 border-white/20 object-cover shadow-2xl"
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
    <li className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-foreground/[0.04]">
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
      <span className="shrink-0 rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[11px] font-medium text-foreground/60">
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
      className="min-w-0 overflow-x-hidden pt-8 pb-12 md:pb-14"
      aria-label="Profile and résumé"
    >
      <Container>
        <div className="flex flex-col gap-8 md:gap-10">
          <section
            className="glass-card rounded-xl p-4 sm:p-6"
            aria-labelledby="hero-name-heading"
          >
            <div className="flex flex-col gap-5 md:flex-row md:gap-8">
              <div className="mx-auto shrink-0 md:mx-0">
                <button
                  type="button"
                  onClick={() => setPhotoOpen(true)}
                  className="focus-ring group relative rounded-full"
                  aria-label={`View larger photo of ${resume.name}`}
                >
                  <img
                    src="/profile-photo.jpg"
                    alt=""
                    className="h-24 w-24 rounded-full object-cover border-2 border-foreground/20 ring-2 ring-foreground/5 transition-[transform,box-shadow] duration-200 ease-out group-hover:ring-foreground/15 group-active:scale-[0.98] motion-reduce:group-active:scale-100"
                    decoding="async"
                  />
                </button>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3 text-center md:text-left">
                <div className="flex w-full flex-col gap-3 items-center md:items-start">
                  <h1
                    id="hero-name-heading"
                    className="geist-display w-full text-center text-2xl font-semibold text-foreground sm:text-3xl break-words md:text-left"
                  >
                    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:justify-start">
                      <span>{resume.name}</span>
                      {resume.displayLocation ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-normal text-foreground/70 sm:text-base sm:tracking-wide">
                          <LocationPinIcon className="h-3 w-3 shrink-0 text-foreground/55 sm:h-3.5 sm:w-3.5" />
                          {resume.displayLocation}
                        </span>
                      ) : null}
                    </span>
                  </h1>
                  {resume.roleLine || resume.domainExposure ? (
                    <div className="flex w-full flex-col gap-3 text-center md:text-left">
                      {resume.roleLine ? (
                        <p className="text-base font-medium text-foreground/85 sm:text-lg">
                          {resume.roleLine}
                        </p>
                      ) : null}
                      {resume.domainExposure ? (
                        <DomainExposurePills
                          exposure={resume.domainExposure}
                          pillsJustify="responsive"
                        />
                      ) : null}
                    </div>
                  ) : null}

                  <blockquote className="mx-auto w-full max-w-3xl rounded-xl bg-foreground/[0.035] px-4 py-3.5 shadow-[0_0_0_1px_rgba(148,163,184,0.2)] dark:bg-foreground/[0.06] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] md:mx-0">
                    <p className="text-center text-pretty text-sm font-medium italic leading-snug text-foreground/80 sm:text-base md:text-left">
                      <span className="text-foreground/45 not-italic" aria-hidden>
                        &ldquo;
                      </span>
                      {resume.headline}
                      <span className="text-foreground/45 not-italic" aria-hidden>
                        &rdquo;
                      </span>
                    </p>
                  </blockquote>
                </div>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 md:mx-0">
                  {resume.summary
                    .split(/\n\n+/)
                    .map((para) => para.trim())
                    .filter(Boolean)
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-foreground/75 break-words text-pretty md:text-left"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </section>
          <Block
            title="Connect"
            id="connect"
            headingFlash={flashSectionId === "connect"}
          >
            <ContactChannels singleLine />
          </Block>
          <Block
            title="Overview"
            id="overview"
            headingFlash={flashSectionId === "overview"}
          >
            <div className="mx-auto w-full md:w-[75%] flex justify-center">
              <img
                src="/ai-expertise-overview.png"
                alt="AI Expertise & Capability Overview Infographic showing AI Strategy & Roadmap, Agentic Automation, GenAI Engineering, and Private & Local LLMs"
                className="w-full h-auto object-contain invert-[0.8] dark:invert-0"
                decoding="async"
              />
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
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {CORPORATE_EXPERIENCE.map((company) => (
                <div
                  key={company.name}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="corporate-logo-tile flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-neutral-300 px-3 py-2 shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md sm:h-[4.5rem] sm:w-44">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground/70">
                    {company.name}
                  </span>
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
