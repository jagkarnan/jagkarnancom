import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function EducationSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="education"
            title="Education"
            subtitle="Academics and relevant coursework/awards."
          />{" "}
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            {resume.education.map((e) => (
              <Card key={`${e.school}-${e.degree}`} className="p-6">
                {" "}
                <div className="flex items-start justify-between gap-4">
                  {" "}
                  <div className="flex flex-col gap-1">
                    {" "}
                    <h3 className="text-base font-semibold">{e.school}</h3>{" "}
                    <p className="text-sm text-foreground/75">
                      {e.degree}
                    </p>{" "}
                  </div>{" "}
                  {e.start || e.end ? (
                    <p className="font-mono text-xs text-foreground/60">
                      {" "}
                      {[e.start, e.end].filter(Boolean).join(" — ")}{" "}
                    </p>
                  ) : null}{" "}
                </div>{" "}
                {e.notes?.length ? (
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/75">
                    {" "}
                    {e.notes.map((n) => (
                      <li key={n} className="flex gap-3">
                        {" "}
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />{" "}
                        <span>{n}</span>{" "}
                      </li>
                    ))}{" "}
                  </ul>
                ) : null}{" "}
              </Card>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
