"use client";

import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { Timeline } from "@/components/ui/Timeline";
import { MailCheckIcon, LinkedinIcon, GithubIcon, SmartphoneChargingIcon, MessageCircleIcon } from "lucide-animated";

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
    <section id={id} className="glass-card rounded-2xl p-6">
      <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function Home() {
  const certificationBoardItems = [
    // Primary certifications list
    ...resume.certifications.map((c) => ({
      id: `cert-${c.name}-${c.date}`,
      title: c.name,
      subtitle: c.issuer,
      year: c.date,
      source: "cert",
    })),
    // Historic certification milestones (previously in Major Milestones)
    ...((resume.milestones ?? [])
      .filter((m) => m.type === "certification")
      .map((m) => ({
        id: `milestone-cert-${m.title}-${m.year}`,
        title: m.title,
        subtitle: m.description,
        year: m.year,
        source: "milestone",
      })) as {
      id: string;
      title: string;
      subtitle: string;
      year: string;
      source: "cert" | "milestone";
    }[]),
  ].sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));

  const getIssuerInitials = (issuer?: string) => {
    if (!issuer) return "AI";
    return issuer
      .split(" ")
      .filter(Boolean)
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  return (
    <main className="pt-8 pb-10">
      <Container>
        <div className="flex flex-col gap-6">
          <section className="glass-card rounded-2xl p-6">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <div className="flex-shrink-0">
                <img
                  src="/profile-photo.jpg"
                  alt="Jag Karnan"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white/20"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h1 className="text-2xl font-semibold tracking-tight">{resume.name}</h1>
                <p className="text-sm text-foreground/75">{resume.headline}</p>
                <p className="text-sm text-foreground/70">{resume.summary}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/70">
                  {resume.location ? <span>{resume.location}</span> : null}
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
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-6 pt-2 border-t border-white/10 items-center">
                {resume.links.filter(l => l.label.includes("Call") || l.label.includes("WhatsApp")).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/50 whitespace-nowrap"
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
          <Block title="AI focus" id="skills">
            <ul className="space-y-2 text-sm text-foreground/75">
              {resume.aiFocusAreas.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="AI Skills" id="ai-skills">
            <div className="grid gap-2 text-sm text-foreground/75 md:grid-cols-2">
              {resume.skills.map((s) => (
                <div key={s.name} className="flex items-baseline gap-2">
                  <span className="font-medium">{s.name}</span>
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
                    <div className="flex items-center gap-2.5 border-b border-black/40 pb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-[11px] font-bold text-white shadow-md">
                        {getIssuerInitials(c.source === "cert" ? c.subtitle : c.subtitle)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-600">
                          Certificate of Achievement
                        </span>
                        <span className="text-xs font-semibold text-zinc-900">
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
                        Jegadeesan Karunakaran
                      </p>
                      <p className="text-[11px] text-zinc-600">
                        has successfully attained
                      </p>
                      <p className="text-[12px] font-semibold leading-snug text-zinc-900">
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
          <Block title="Experience" id="experience">
            <div className="space-y-5">
              {resume.experience.map((e) => (
                <div key={`${e.company}-${e.role}`} className="space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{e.role} • {e.company}</p>
                      {e.location ? (
                        <p className="text-xs text-foreground/60">{e.location}</p>
                      ) : null}
                    </div>
                    <p className="font-mono text-xs text-foreground/60 whitespace-nowrap">{e.start} — {e.end ?? "Present"}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/75">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
          <Block title="Projects" id="projects">
            <div className="space-y-5">
              {resume.projects.map((p) => (
                <div key={p.name} className="space-y-2">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-sm text-foreground/75">{p.blurb}</p>
                  {p.impact ? (
                    <p className="text-sm text-foreground/75">
                      <span className="font-mono text-xs text-foreground/60">IMPACT </span>
                      {p.impact}
                    </p>
                  ) : null}
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
