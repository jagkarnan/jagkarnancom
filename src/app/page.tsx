"use client";

import { use, useEffect, useId, useRef, useState } from "react";
import { resume } from "@/content/resume";
import type { CertificationBoardItem } from "@/content/resumeShared";
import {
  buildCertificationBoardItems,
  getIssuerInitials,
  groupCertificationBoardItemsByDecade,
  CORPORATE_EXPERIENCE,
} from "@/content/resumeShared";
import {
  ObfuscatedMailtoAnchor,
  ObfuscatedTelAnchor,
  ObfuscatedWhatsAppAnchor,
} from "@/components/contact/ObfuscatedContactAnchors";
import { useSectionHeadingFlash } from "@/components/site/useSectionHeadingFlash";
import { Container } from "@/components/ui/Container";
import { LocationPinIcon } from "@/components/ui/LocationPinIcon";
import { Timeline } from "@/components/ui/Timeline";
import { MailCheckIcon, LinkedinIcon, GithubIcon, YoutubeIcon, SmartphoneChargingIcon, MessageCircleIcon } from "lucide-animated";

function GoldMedalIcon({ size = 20, className }: { size?: number; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `hero-medal-gold-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <path
        d="M7.5 2.5 9.2 7.8 6 9.5 5.5 5.5Z"
        fill="#991b1b"
        opacity={0.95}
      />
      <path
        d="M16.5 2.5 14.8 7.8 18 9.5 18.5 5.5Z"
        fill="#991b1b"
        opacity={0.95}
      />
      <circle cx="12" cy="14.5" r="6.2" fill={`url(#${gradId})`} stroke="#92400e" strokeWidth="1" />
      <circle cx="12" cy="14.5" r="4" fill="none" stroke="#fef3c7" strokeOpacity={0.35} strokeWidth="0.75" />
    </svg>
  );
}

function getUniversityGoldMedalLabel(): string | null {
  for (const ed of resume.education) {
    const hit = ed.notes?.find((n) => /gold\s*medal/i.test(n));
    if (hit) return hit;
  }
  return null;
}

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

function CertificationBoardCard({
  c,
  certName,
}: {
  c: CertificationBoardItem;
  certName: string;
}) {
  return (
    <div
      className="relative flex flex-col rounded-[22px] border border-black/70 bg-[#f5f0e6] px-4 py-3 shadow-sm transition-shadow duration-200 dark:border-black dark:bg-[#f5f0e6]"
    >
      <div className="pointer-events-none absolute inset-1 rounded-[20px] border border-black/80 shadow-inner" />
      <div className="relative flex flex-1 flex-col gap-3">
        <div className="flex min-w-0 items-start gap-2.5 border-b border-black/40 pb-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-white shadow-sm">
            {getIssuerInitials(c.subtitle)}
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-600">
              Certificate of Achievement
            </span>
            <span className="break-words text-xs font-semibold text-zinc-900">
              {c.subtitle || "Accredited Issuer"}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            This is to certify that
          </p>
          <p className="text-[13px] font-semibold tracking-tight text-zinc-900">{certName}</p>
          <p className="text-[11px] text-zinc-600">has successfully attained</p>
          <p className="break-words text-[12px] font-semibold leading-snug text-zinc-900">
            {c.title}
          </p>
        </div>
        <div className="mt-1.5 flex items-center justify-between pt-1.5">
          <div className="flex flex-col text-[10px] text-zinc-700">
            <span className="uppercase tracking-[0.18em]">Awarded</span>
            <span className="mt-1 inline-flex w-fit rounded-full border border-black/60 bg-[#f5f0e6] px-2 py-0.5 font-mono text-[10px] text-zinc-900">
              {c.year}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-full border-2 border-red-700 bg-gradient-to-br from-red-500 to-red-700 text-[16px] font-bold text-white shadow-sm">
              <div className="absolute inset-[2px] rounded-full border border-red-200/80" />
              <div className="relative flex h-full w-full items-center justify-center leading-none">
                ★
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  const goldMedalLabel = getUniversityGoldMedalLabel();
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
                  {resume.roleLine ? (
                    <p className="w-full text-center text-base font-medium text-foreground/85 sm:text-lg md:text-left">
                      {resume.roleLine}
                    </p>
                  ) : null}
                  {goldMedalLabel ? (
                    <div className="flex justify-center md:justify-start">
                      <span
                        className="hero-gold-medal-pill inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-gradient-to-r from-amber-500/15 to-amber-600/10 px-2.5 py-1 text-xs font-semibold tracking-tight text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-[box-shadow,border-color] duration-200"
                        title={goldMedalLabel}
                      >
                        <GoldMedalIcon size={18} className="shrink-0 drop-shadow-sm" />
                        <span className="whitespace-nowrap">{goldMedalLabel}</span>
                      </span>
                    </div>
                  ) : null}
                  <blockquote className="mx-auto w-full max-w-prose rounded-xl bg-foreground/[0.035] px-4 py-3.5 shadow-[0_0_0_1px_rgba(148,163,184,0.2)] dark:bg-foreground/[0.06] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] md:mx-0">
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
                <div className="mx-auto flex w-full max-w-prose flex-col gap-2.5 md:mx-0">
                  <p className="text-sm leading-relaxed text-foreground/75 break-words text-pretty md:text-left">
                    {resume.summary}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Block title="Contact" id="contact" headingFlash={flashSectionId === "contact"}>
            <div className="flex flex-col gap-4 text-sm text-foreground/80">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {resume.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="focus-ring inline-flex min-h-11 min-w-[2.75rem] items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 font-medium text-foreground/85 transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/18 hover:bg-foreground/[0.07] active:scale-[0.98] active:bg-foreground/[0.09] motion-reduce:active:scale-100 sm:px-4"
                  >
                    {l.label === "LinkedIn" && (
                      <LinkedinIcon size={16} />
                    )}
                    {l.label === "GitHub" && (
                      <GithubIcon size={16} />
                    )}
                    {l.label === "YouTube" && (
                      <YoutubeIcon size={16} />
                    )}
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-foreground/10 pt-4 sm:gap-3">
                <ObfuscatedWhatsAppAnchor className="focus-ring inline-flex min-h-11 max-w-full min-w-0 items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 font-medium text-foreground/85 transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/18 hover:bg-foreground/[0.07] active:scale-[0.98] active:bg-foreground/[0.09] motion-reduce:active:scale-100 break-all sm:break-normal sm:px-4 sm:whitespace-nowrap">
                  <MessageCircleIcon size={16} />
                  <span>WhatsApp</span>
                </ObfuscatedWhatsAppAnchor>
                <ObfuscatedMailtoAnchor className="focus-ring inline-flex min-h-11 min-w-[2.75rem] items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 font-medium text-foreground/85 transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/18 hover:bg-foreground/[0.07] active:scale-[0.98] active:bg-foreground/[0.09] motion-reduce:active:scale-100 sm:px-4">
                  <MailCheckIcon size={16} />
                  <span>Email</span>
                </ObfuscatedMailtoAnchor>
                <ObfuscatedTelAnchor className="focus-ring inline-flex min-h-11 max-w-full min-w-0 items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-3 py-2 font-medium text-foreground/85 transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/18 hover:bg-foreground/[0.07] active:scale-[0.98] active:bg-foreground/[0.09] motion-reduce:active:scale-100 break-all sm:break-normal sm:px-4 sm:whitespace-nowrap">
                  <SmartphoneChargingIcon size={16} />
                  <span>Call</span>
                </ObfuscatedTelAnchor>
              </div>
            </div>
          </Block>
          <Block title="AI Skills" id="ai-skills" headingFlash={flashSectionId === "ai-skills"}>
            <ul className="space-y-4 text-sm leading-relaxed text-foreground/75">
              {resume.skills.map((s) => (
                <li key={s.name} className="flex gap-3 text-pretty">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
                    aria-hidden
                  />
                  <span className="min-w-0 break-words">{s.name}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Tech Skills" id="tech-skills" headingFlash={flashSectionId === "tech-skills"}>
            <div className="flex flex-wrap gap-2 text-sm text-foreground/75">
              {(resume.techSkills ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-foreground/12 bg-foreground/5 px-3 py-1.5 font-medium transition-colors duration-200 ease-out hover:border-foreground/22 hover:bg-foreground/[0.08]"
                >
                  {t}
                </span>
              ))}
            </div>
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
                      ? " mt-8 border-t border-foreground/10 pt-8 md:mt-10 md:pt-10"
                      : "")
                  }
                >
                  <h3
                    id={`certifications-${group.id}-heading`}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50 sm:text-xs"
                  >
                    {group.label}
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((c) => (
                      <CertificationBoardCard
                        key={c.id}
                        c={c}
                        certName={resume.legalName ?? resume.name}
                      />
                    ))}
                  </div>
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
                        {ed.notes.join(" · ")}
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
