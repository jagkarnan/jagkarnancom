import type { ReactNode } from "react";

export function SectionHeading({
  id,
  title,
  subtitle,
  right,
}: {
  id: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-foreground/10 pb-8 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <h2
          id={id}
          className="scroll-mt-28 text-lg font-semibold leading-tight tracking-tight text-foreground md:text-xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
            {subtitle}
          </p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
