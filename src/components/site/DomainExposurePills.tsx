import type { DomainExposure } from "@/content/resume";

const PILL_STYLES = [
  "border-accent/45 bg-accent/10 text-accent hover:border-accent/60 hover:bg-accent/[0.16] active:scale-[0.98]",
  "border-accent-2/45 bg-accent-2/[0.1] text-accent-2 hover:border-accent-2/65 hover:bg-accent-2/[0.16] active:scale-[0.98]",
  "border-violet-500/40 bg-violet-500/[0.08] text-violet-700 hover:border-violet-500/55 hover:bg-violet-500/[0.13] active:scale-[0.98] dark:border-violet-400/40 dark:bg-violet-400/[0.1] dark:text-violet-200 dark:hover:border-violet-400/55 dark:hover:bg-violet-400/[0.16]",
];

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
            <span
              className={`motion-reduce:active:scale-100 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none tracking-tight shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-[border-color,background-color,transform] duration-200 ease-out motion-reduce:transition-none dark:shadow-none sm:text-xs ${PILL_STYLES[i % PILL_STYLES.length]}`}
            >
              {domain}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
