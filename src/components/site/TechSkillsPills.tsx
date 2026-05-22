import { getTechSkillPillClass } from "@/lib/techSkillPillStyles";

type Props = {
  skills: string[];
  className?: string;
};

const PILL_BASE =
  "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium tracking-tight transition-[border-color,background-color] duration-200 ease-out";

export function TechSkillsPills({ skills, className }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {skills.map((skill, index) => (
        <span key={skill} className={`${PILL_BASE} ${getTechSkillPillClass(index)}`}>
          {skill}
        </span>
      ))}
    </div>
  );
}
