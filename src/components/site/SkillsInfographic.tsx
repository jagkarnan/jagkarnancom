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

type SkillStyle = {
  card: string;
  iconContainer: string;
  numberText: string;
};

const STYLES: Record<SkillIcon, SkillStyle> = {
  roadmap: {
    card: "border-amber-500/15 bg-amber-500/[0.02] hover:border-amber-500/30 hover:bg-amber-500/[0.05]",
    iconContainer: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20 group-hover:bg-amber-500/15 group-hover:text-amber-500",
    numberText: "text-amber-500/[0.06] group-hover:text-amber-500/[0.12]",
  },
  automation: {
    card: "border-indigo-500/15 bg-indigo-500/[0.02] hover:border-indigo-500/30 hover:bg-indigo-500/[0.05]",
    iconContainer: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-500/20 group-hover:bg-indigo-500/15 group-hover:text-indigo-500",
    numberText: "text-indigo-500/[0.06] group-hover:text-indigo-500/[0.12]",
  },
  engineering: {
    card: "border-sky-500/15 bg-sky-500/[0.02] hover:border-sky-500/30 hover:bg-sky-500/[0.05]",
    iconContainer: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20 group-hover:bg-sky-500/15 group-hover:text-sky-500",
    numberText: "text-sky-500/[0.06] group-hover:text-sky-500/[0.12]",
  },
  "local-llm": {
    card: "border-emerald-500/15 bg-emerald-500/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]",
    iconContainer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20 group-hover:bg-emerald-500/15 group-hover:text-emerald-500",
    numberText: "text-emerald-500/[0.06] group-hover:text-emerald-500/[0.12]",
  },
  adoption: {
    card: "border-teal-500/15 bg-teal-500/[0.02] hover:border-teal-500/30 hover:bg-teal-500/[0.05]",
    iconContainer: "bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-teal-500/20 group-hover:bg-teal-500/15 group-hover:text-teal-500",
    numberText: "text-teal-500/[0.06] group-hover:text-teal-500/[0.12]",
  },
  frontier: {
    card: "border-rose-500/15 bg-rose-500/[0.02] hover:border-rose-500/30 hover:bg-rose-500/[0.05]",
    iconContainer: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20 group-hover:bg-rose-500/15 group-hover:text-rose-500",
    numberText: "text-rose-500/[0.06] group-hover:text-rose-500/[0.12]",
  },
  delivery: {
    card: "border-purple-500/15 bg-purple-500/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.05]",
    iconContainer: "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20 group-hover:bg-purple-500/15 group-hover:text-purple-500",
    numberText: "text-purple-500/[0.06] group-hover:text-purple-500/[0.12]",
  },
  observability: {
    card: "border-fuchsia-500/15 bg-fuchsia-500/[0.02] hover:border-fuchsia-500/30 hover:bg-fuchsia-500/[0.05]",
    iconContainer: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 ring-fuchsia-500/20 group-hover:bg-fuchsia-500/15 group-hover:text-fuchsia-500",
    numberText: "text-fuchsia-500/[0.06] group-hover:text-fuchsia-500/[0.12]",
  },
};

export function SkillsInfographic({ skills }: { skills: Skill[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {skills.map((s, i) => {
        const Icon = s.icon ? ICONS[s.icon] : null;
        const style = s.icon ? STYLES[s.icon] : {
          card: "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.04]",
          iconContainer: "bg-foreground/[0.06] text-foreground/80 ring-foreground/10 group-hover:bg-foreground/[0.1] group-hover:text-foreground",
          numberText: "text-foreground/[0.06] group-hover:text-foreground/10",
        };
        return (
          <li
            key={s.name}
            className={`group relative flex gap-4 overflow-hidden rounded-xl border p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 ${style.card}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute right-3 top-2 font-mono text-3xl font-semibold leading-none transition-colors ${style.numberText}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors ${style.iconContainer}`}>
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
