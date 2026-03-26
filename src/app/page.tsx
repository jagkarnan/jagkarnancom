"use client";

import { useId } from "react";
import { resume } from "@/content/resume";
import {
  buildCertificationBoardItems,
  getIssuerInitials,
  CORPORATE_EXPERIENCE,
} from "@/content/resumeShared";
import { Container } from "@/components/ui/Container";
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
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="glass-card rounded-2xl p-4 sm:p-6">
      <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function Home() {
  const certificationBoardItems = buildCertificationBoardItems();
  const goldMedalLabel = getUniversityGoldMedalLabel();

  return (
    <main className="min-w-0 overflow-x-hidden pt-8 pb-10">
      <Container>
        <div className="flex flex-col gap-6">
          <section className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src="/profile-photo.jpg"
                  alt="Jag Karnan"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white/20"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2 flex-1 text-center md:text-left">
                <div className="flex w-full flex-col gap-1.5 items-center md:items-start">
                  <div className="flex w-full flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5 md:justify-start">
                    <h1 className="text-xl font-semibold tracking-tight sm:text-2xl break-words">
                      {resume.name}
                    </h1>
                    <span className="select-none text-foreground/35" aria-hidden>
                      ·
                    </span>
                    <span className="text-base font-medium text-foreground/80 sm:text-lg break-words">
                      {resume.headline}
                    </span>
                  </div>
                  {goldMedalLabel ? (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-gradient-to-r from-amber-500/15 to-amber-600/10 px-2.5 py-1 text-xs font-semibold tracking-tight text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                      title={goldMedalLabel}
                    >
                      <GoldMedalIcon size={18} className="shrink-0 drop-shadow-sm" />
                      <span className="whitespace-nowrap">{goldMedalLabel}</span>
                    </span>
                  ) : null}
                </div>
                <div className="mx-auto flex w-full max-w-prose flex-col gap-2 md:mx-0 md:max-w-none">
                  <p className="text-sm text-foreground/70 break-words text-pretty md:text-left">
                    {resume.summary}
                  </p>
                  <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-foreground/70 md:justify-start">
                    {resume.location ? <span className="text-pretty">{resume.location}</span> : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Block title="Contact" id="contact">
            <div className="flex flex-col gap-3 text-sm text-foreground/75">
              <div className="flex flex-wrap gap-6">
                {resume.links.filter(l => !l.label.includes("Call") && !l.label.includes("WhatsApp")).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    {l.label === "Email" && (
                      <MailCheckIcon size={16} />
                    )}
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
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 border-t border-white/10 items-center">
                {resume.links.filter(l => l.label.includes("Call") || l.label.includes("WhatsApp")).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="flex min-w-0 items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/50 break-all sm:break-normal sm:whitespace-nowrap"
                  >
                    {l.label.includes("Call") && (
                      <SmartphoneChargingIcon size={16} />
                    )}
                    {l.label.includes("WhatsApp") && (
                      <MessageCircleIcon size={16} />
                    )}
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Block>
          <Block title="AI Skills" id="ai-skills">
            <div className="grid gap-2 text-sm text-foreground/75 md:grid-cols-2">
              {resume.skills.map((s) => (
                <div key={s.name} className="flex min-w-0 flex-wrap items-baseline gap-2">
                  <span className="font-medium break-words">{s.name}</span>
                  {s.level ? (
                    <span className="font-mono text-xs text-foreground/60">{s.level}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </Block>
          <Block title="Tech Skills" id="tech-skills">
            <div className="flex flex-wrap gap-2 text-sm text-foreground/75">
              {(resume.techSkills ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </Block>
          <Block title="Certifications" id="certifications">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certificationBoardItems.map((c) => (
                <div
                  key={c.id}
                  className="relative flex flex-col rounded-[22px] border border-black/70 bg-[#f5f0e6] px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.55)] dark:border-black dark:bg-[#f5f0e6]"
                >
                  {/* Outer frame */}
                  <div className="pointer-events-none absolute inset-1 rounded-[20px] border border-black/80 shadow-inner" />

                  <div className="relative flex flex-1 flex-col gap-3">
                    {/* Header: logo + issuer */}
                    <div className="flex min-w-0 items-start gap-2.5 border-b border-black/40 pb-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-[11px] font-bold text-white shadow-md">
                        {getIssuerInitials(c.source === "cert" ? c.subtitle : c.subtitle)}
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

                    {/* Certificate body */}
                    <div className="flex-1 space-y-1.5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                        This is to certify that
                      </p>
                      <p className="text-[13px] font-semibold tracking-tight text-zinc-900">
                        {resume.legalName ?? resume.name}
                      </p>
                      <p className="text-[11px] text-zinc-600">
                        has successfully attained
                      </p>
                      <p className="break-words text-[12px] font-semibold leading-snug text-zinc-900">
                        {c.title}
                      </p>
                    </div>

                    {/* Footer: year + seal */}
                    <div className="mt-1.5 flex items-center justify-between pt-1.5">
                      <div className="flex flex-col text-[10px] text-zinc-700">
                        <span className="uppercase tracking-[0.18em]">Awarded</span>
                        <span className="mt-1 inline-flex w-fit rounded-full border border-black/60 bg-[#f5f0e6] px-2 py-0.5 font-mono text-[10px] text-zinc-900">
                          {c.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative h-10 w-10 rounded-full border-2 border-red-700 bg-gradient-to-br from-red-500 to-red-700 text-[16px] font-bold text-white shadow-[0_5px_12px_rgba(0,0,0,0.45)]">
                          <div className="absolute inset-[2px] rounded-full border border-red-200/80" />
                          <div className="relative flex h-full w-full items-center justify-center leading-none">
                            ★
                          </div>
                        </div>                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Block>
          <Block title="Corporate Experience" id="corporate-experience">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {CORPORATE_EXPERIENCE.map((company) => (
                <div
                  key={company.name}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-3 py-2 shadow-sm sm:h-[4.5rem] sm:w-44">
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
          <Block title="Experience" id="experience">
            <div className="space-y-5">
              {resume.experience.map((e) => (
                <div key={`${e.company}-${e.role}`} className="space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div className="min-w-0 flex flex-col">
                      <p className="break-words text-sm font-semibold">
                        {e.role} • {e.company}
                      </p>
                      {e.location ? (
                        <p className="text-xs text-foreground/60">{e.location}</p>
                      ) : null}
                    </div>
                    <p className="shrink-0 font-mono text-xs text-foreground/60 md:whitespace-nowrap">
                      {e.start} — {e.end ?? "Present"}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/75">
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
          <Block title="Major Milestones" id="milestones">
            <Timeline
              education={resume.education}
              certifications={resume.certifications}
              milestones={resume.milestones}
            />
          </Block>
        </div>
      </Container>
    </main>
  );
}
