import { resume } from "@/content/resume";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      {" "}
      <p className="font-mono text-[11px] tracking-wider text-foreground/55">
        {" "}
        {label}{" "}
      </p>{" "}
      <p className="text-sm leading-relaxed text-foreground/75">{value}</p>{" "}
    </div>
  );
}
export function ProjectsSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="projects"
            title="AI projects"
            subtitle="Selected work emphasizing AI architecture, evaluation, and real-world impact."
          />{" "}
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            {resume.projects.map((p) => (
              <Card key={p.name} className="flex flex-col gap-5 p-6">
                {" "}
                <div className="flex flex-col gap-2">
                  {" "}
                  <h3 className="text-base font-semibold leading-tight tracking-tight">
                    {p.name}
                  </h3>{" "}
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {" "}
                    {p.blurb}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="grid gap-4">
                  {" "}
                  <Field label="PROBLEM" value={p.problem} />{" "}
                  <Field label="APPROACH" value={p.approach} />{" "}
                  <Field label="IMPACT" value={p.impact} />{" "}
                </div>{" "}
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}{" "}
                </div>{" "}
                {p.links?.length ? (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {" "}
                    {p.links.map((l) => (
                      <ExternalLink
                        key={l.href}
                        href={l.href}
                        className="text-sm text-foreground/80 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-sky-500/50"
                      >
                        {" "}
                        {l.label}{" "}
                      </ExternalLink>
                    ))}{" "}
                  </div>
                ) : null}{" "}
              </Card>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
