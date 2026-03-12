import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function ContactSection() {
  return (
    <section className="py-14">
      {" "}
      <Container>
        {" "}
        <div className="flex flex-col gap-8">
          {" "}
          <SectionHeading
            id="contact"
            title="Contact"
            subtitle="If you’re building AI products and care about quality, latency, and cost—let’s talk."
          />{" "}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {" "}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {" "}
              <div className="flex flex-col gap-1">
                {" "}
                <p className="text-sm text-foreground/70">
                  {" "}
                  Preferred contact channels{" "}
                </p>{" "}
                <p className="font-mono text-xs text-foreground/55">
                  {" "}
                  {resume.location ?? "Location"}{" "}
                </p>{" "}
              </div>{" "}
              <div className="flex flex-wrap gap-3">
                {" "}
                {resume.links.map((l) => (
                  <ExternalLink
                    key={l.href}
                    href={l.href}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm text-foreground/80 hover:bg-black/5 border-white/15 hover:bg-white/5"
                  >
                    {" "}
                    {l.label}{" "}
                  </ExternalLink>
                ))}{" "}
                <a
                  href="/resume"
                  className="focus-ring rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
                >
                  {" "}
                  Print / save as PDF{" "}
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
