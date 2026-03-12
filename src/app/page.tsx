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
  return (
    <main className="pb-10">
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
          <Block title="Skills">
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
          <Block title="Experience" id="experience">
            <div className="space-y-5">
              {resume.experience.map((e) => (
                <div key={`${e.company}-${e.role}`} className="space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <p className="text-sm font-semibold">{e.role} • {e.company}</p>
                    <p className="font-mono text-xs text-foreground/60">{e.start} — {e.end ?? "Present"}</p>
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
