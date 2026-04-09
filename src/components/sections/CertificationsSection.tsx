import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function CertificationsSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="certifications"
            title="Certifications"
            subtitle="Credentials and learning milestones (add your real items here)."
          />{" "}
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            {resume.certifications.map((c) => (
              <Card key={`${c.issuer}-${c.name}`} className="p-6">
                {" "}
                <div className="flex flex-col gap-2">
                  {" "}
                  <div className="flex items-start justify-between gap-4">
                    {" "}
                    <h3 className="text-base font-semibold leading-tight tracking-tight">
                      {c.name}
                    </h3>{" "}
                    <p className="font-mono text-xs text-foreground/60">
                      {" "}
                      {c.date}{" "}
                    </p>{" "}
                  </div>{" "}
                  <p className="text-sm text-foreground/70">{c.issuer}</p>{" "}
                  {c.credentialUrl ? (
                    <ExternalLink
                      href={c.credentialUrl}
                      className="mt-2 text-sm text-foreground/80 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent/50"
                    >
                      {" "}
                      View credential{" "}
                    </ExternalLink>
                  ) : null}{" "}
                </div>{" "}
              </Card>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
