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
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  automation: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  engineering: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  "local-llm": {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  adoption: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  frontier: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  delivery: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
  },
  observability: {
    card: "border-[#e5e5dd] bg-[#f5f5f0] hover:border-[#315c3f]/30 hover:bg-[#eef5ef]",
    iconContainer: "bg-[#e4efe6] text-[#315c3f] ring-[#315c3f]/20 group-hover:bg-[#d8e8dc]",
    numberText: "text-[#315c3f]/[0.08] group-hover:text-[#315c3f]/[0.14]",
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
            className={`editorial-card group relative flex gap-4 overflow-hidden p-4 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${style.card}`}
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
