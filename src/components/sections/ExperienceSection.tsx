import { resume } from "@/content/resume";
import { LocationPinIcon } from "@/components/ui/LocationPinIcon";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function ExperienceSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="work-experience"
            title="Work Experience"
            subtitle="Impact-focused highlights, tuned for AI engineering roles."
          />{" "}
          <div className="grid gap-6">
            {" "}
            {resume.experience.map((e) => (
              <div
                key={`${e.company}-${e.role}`}
                className="glass-card rounded-xl p-6"
              >
                {" "}
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  {" "}
                  <div className="flex flex-col gap-1">
                    {" "}
                    <h3 className="text-base font-semibold leading-tight tracking-tight">
                      {e.role} • {e.company}
                    </h3>{" "}
                    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-foreground/70">
                      {" "}
                      {e.location ? (
                        <>
                          <span className="inline-flex items-center gap-1">
                            <LocationPinIcon className="h-3.5 w-3.5 shrink-0 text-foreground/55" />
                            <span>{e.location}</span>
                          </span>
                          <span className="text-foreground/45" aria-hidden>
                            •
                          </span>
                        </>
                      ) : null}
                      <span>{`${e.start} — ${e.end ?? "Present"}`}</span>{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/75">
                  {" "}
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      {" "}
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />{" "}
                      <span>{h}</span>{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
                {e.tech?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {" "}
                    {e.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}{" "}
                  </div>
                ) : null}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
