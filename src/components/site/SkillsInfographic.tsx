import {
  RouteIcon,
  WorkflowIcon,
  CpuIcon,
  LockIcon,
  UserCheckIcon,
  TelescopeIcon,
  RocketIcon,
  ActivityIcon,
} from "lucide-animated";
import type { Skill, SkillIcon } from "@/content/resume";

const ICONS: Record<SkillIcon, typeof RouteIcon> = {
  roadmap: RouteIcon,
  automation: WorkflowIcon,
  engineering: CpuIcon,
  "local-llm": LockIcon,
  adoption: UserCheckIcon,
  frontier: TelescopeIcon,
  delivery: RocketIcon,
  observability: ActivityIcon,
};

export function SkillsInfographic({ skills }: { skills: Skill[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {skills.map((s, i) => {
        const Icon = s.icon ? ICONS[s.icon] : null;
        return (
          <li
            key={s.name}
            className="group relative flex gap-4 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/[0.04] motion-reduce:hover:translate-y-0"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-2 font-mono text-3xl font-semibold leading-none text-foreground/[0.06] transition-colors group-hover:text-foreground/10"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground/80 ring-1 ring-inset ring-foreground/10 transition-colors group-hover:bg-foreground/[0.1] group-hover:text-foreground">
              {Icon ? <Icon size={20} /> : null}
            </div>
            <div className="min-w-0">
              {s.title ? (
                <h3 className="text-sm font-semibold leading-tight tracking-tight text-foreground">
                  {s.title}
                </h3>
              ) : null}
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/65 text-pretty">
                {s.name}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
