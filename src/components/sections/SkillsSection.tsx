import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function SkillsSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="skills"
            title="AI skills"
            subtitle="A focused snapshot of my AI/ML engineering strengths."
          />{" "}
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            {resume.skills.map((s) => (
              <Card key={s.name} className="p-6">
                {" "}
                <div className="flex items-start justify-between gap-4">
                  {" "}
                  <div className="flex flex-col gap-1">
                    {" "}
                    <h3 className="text-base font-semibold">{s.name}</h3>{" "}
                    {s.level ? (
                      <p className="font-mono text-xs text-foreground/60">
                        {" "}
                        {s.level}{" "}
                      </p>
                    ) : null}{" "}
                  </div>{" "}
                </div>{" "}
                {s.keywords?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {" "}
                    {s.keywords.map((k) => (
                      <Chip key={k}>{k}</Chip>
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
