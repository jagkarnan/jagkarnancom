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
      tile: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20",
      accent: "bg-[#315c3f]/20",
    },
    {
      label: "How I solve it",
      text: vp.solution,
      Icon: WrenchIcon,
      tile: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20",
      accent: "bg-[#315c3f]/20",
    },
    {
      label: "What you get",
      text: vp.result,
      Icon: TrendingUpIcon,
      tile: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20",
      accent: "bg-[#315c3f]/20",
    },
  ];
}

export function ValuePropositions({ items }: { items: ValueProposition[] }) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        Focusing on moving AI from prototype to production by addressing concrete operational bottlenecks and establishing stable, cost-controlled engineering systems.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((vp) => {
          const stages = buildStages(vp);
          return (
            <article
              key={vp.problem}
              className="editorial-card group relative flex flex-col p-5 transition-[transform,box-shadow] duration-200 ease-out"
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
