import type { DomainExposure } from "@/content/resume";

const PILL_BASE =
  "tech-skill-pill inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none tracking-tight transition-[border-color,background-color,color] duration-200 ease-out sm:text-xs";

type Props = {
  exposure: DomainExposure;
  /** Home hero: centered on narrow viewports; component section: left-aligned */
  pillsJustify?: "responsive" | "start";
};

export function DomainExposurePills({
  exposure,
  pillsJustify = "responsive",
}: Props) {
  const rowLayout =
    pillsJustify === "start"
      ? "justify-start text-left"
      : "justify-center text-center md:justify-start md:text-left";

  return (
    <div
      className={`flex flex-row flex-wrap items-center gap-x-2 gap-y-2 ${rowLayout}`}
    >
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-foreground/55">
        {exposure.label}
      </span>
      <ul className="m-0 flex list-none flex-row flex-wrap items-center gap-2 p-0">
        {exposure.domains.map((domain, i) => (
          <li key={domain} className="shrink-0">
            <span className={`${PILL_BASE} tech-skill-pill--${i % 8}`}>
              {domain}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
