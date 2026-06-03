import {
  BadgeAlertIcon,
  WrenchIcon,
  TrendingUpIcon,
} from "lucide-animated";
import type { ValueProposition } from "@/content/resume";

type Stage = {
  label: string;
  text: string;
  Icon: typeof WrenchIcon;
  /** Tailwind classes for the icon tile (tint) */
  tile: string;
  /** Tailwind class for the connector / accent */
  accent: string;
};

function buildStages(vp: ValueProposition): Stage[] {
  return [
    {
      label: "The problem",
      text: vp.problem,
      Icon: BadgeAlertIcon,
      tile: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
      accent: "bg-amber-500/30",
    },
    {
      label: "How I solve it",
      text: vp.solution,
      Icon: WrenchIcon,
      tile: "bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:text-sky-400",
      accent: "bg-sky-500/30",
    },
    {
      label: "What you get",
      text: vp.result,
      Icon: TrendingUpIcon,
      tile: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
      accent: "bg-emerald-500/30",
    },
  ];
}

export function ValuePropositions({ items }: { items: ValueProposition[] }) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        Most teams don&rsquo;t need more AI hype — they need the right problems
        solved, in production, with measurable outcomes. Here is exactly where I
        create value.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((vp) => {
          const stages = buildStages(vp);
          return (
            <article
              key={vp.problem}
              className="group relative flex flex-col rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-[border-color,background-color] duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.04]"
            >
              {stages.map((stage, i) => (
                <div key={stage.label} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${stage.tile}`}
                    >
                      <stage.Icon size={17} />
                    </div>
                    {i < stages.length - 1 ? (
                      <span
                        aria-hidden
                        className={`my-1 w-px flex-1 ${stage.accent}`}
                      />
                    ) : null}
                  </div>
                  <div className={`min-w-0 ${i < stages.length - 1 ? "pb-4" : ""}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                      {stage.label}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground/75 text-pretty">
                      {stage.text}
                    </p>
                  </div>
                </div>
              ))}
            </article>
          );
        })}
      </div>
    </div>
  );
}
