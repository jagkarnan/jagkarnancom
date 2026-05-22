const MUTED_PILL_STYLES = [
  [
    "border-violet-500/25 bg-violet-500/[0.07]",
    "light-theme:border-violet-600/35 light-theme:bg-violet-600/[0.1] light-theme:text-violet-900",
    "light-theme:hover:border-violet-600/50 light-theme:hover:bg-violet-600/[0.14]",
    "dark-theme:border-violet-400/22 dark-theme:bg-violet-400/[0.09] dark-theme:text-violet-100",
    "dark-theme:hover:border-violet-400/35 dark-theme:hover:bg-violet-400/[0.13]",
  ].join(" "),
  [
    "border-sky-500/25 bg-sky-500/[0.07]",
    "light-theme:border-sky-600/35 light-theme:bg-sky-600/[0.1] light-theme:text-sky-900",
    "light-theme:hover:border-sky-600/50 light-theme:hover:bg-sky-600/[0.14]",
    "dark-theme:border-sky-400/22 dark-theme:bg-sky-400/[0.09] dark-theme:text-sky-100",
    "dark-theme:hover:border-sky-400/35 dark-theme:hover:bg-sky-400/[0.13]",
  ].join(" "),
  [
    "border-emerald-500/25 bg-emerald-500/[0.07]",
    "light-theme:border-emerald-600/35 light-theme:bg-emerald-600/[0.1] light-theme:text-emerald-900",
    "light-theme:hover:border-emerald-600/50 light-theme:hover:bg-emerald-600/[0.14]",
    "dark-theme:border-emerald-400/22 dark-theme:bg-emerald-400/[0.09] dark-theme:text-emerald-100",
    "dark-theme:hover:border-emerald-400/35 dark-theme:hover:bg-emerald-400/[0.13]",
  ].join(" "),
  [
    "border-amber-500/25 bg-amber-500/[0.07]",
    "light-theme:border-amber-600/35 light-theme:bg-amber-600/[0.1] light-theme:text-amber-950",
    "light-theme:hover:border-amber-600/50 light-theme:hover:bg-amber-600/[0.14]",
    "dark-theme:border-amber-400/22 dark-theme:bg-amber-400/[0.09] dark-theme:text-amber-50",
    "dark-theme:hover:border-amber-400/35 dark-theme:hover:bg-amber-400/[0.13]",
  ].join(" "),
  [
    "border-rose-500/25 bg-rose-500/[0.07]",
    "light-theme:border-rose-600/35 light-theme:bg-rose-600/[0.1] light-theme:text-rose-900",
    "light-theme:hover:border-rose-600/50 light-theme:hover:bg-rose-600/[0.14]",
    "dark-theme:border-rose-400/22 dark-theme:bg-rose-400/[0.09] dark-theme:text-rose-100",
    "dark-theme:hover:border-rose-400/35 dark-theme:hover:bg-rose-400/[0.13]",
  ].join(" "),
  [
    "border-indigo-500/25 bg-indigo-500/[0.07]",
    "light-theme:border-indigo-600/35 light-theme:bg-indigo-600/[0.1] light-theme:text-indigo-900",
    "light-theme:hover:border-indigo-600/50 light-theme:hover:bg-indigo-600/[0.14]",
    "dark-theme:border-indigo-400/22 dark-theme:bg-indigo-400/[0.09] dark-theme:text-indigo-100",
    "dark-theme:hover:border-indigo-400/35 dark-theme:hover:bg-indigo-400/[0.13]",
  ].join(" "),
  [
    "border-teal-500/25 bg-teal-500/[0.07]",
    "light-theme:border-teal-600/35 light-theme:bg-teal-600/[0.1] light-theme:text-teal-900",
    "light-theme:hover:border-teal-600/50 light-theme:hover:bg-teal-600/[0.14]",
    "dark-theme:border-teal-400/22 dark-theme:bg-teal-400/[0.09] dark-theme:text-teal-100",
    "dark-theme:hover:border-teal-400/35 dark-theme:hover:bg-teal-400/[0.13]",
  ].join(" "),
  [
    "border-fuchsia-500/25 bg-fuchsia-500/[0.07]",
    "light-theme:border-fuchsia-600/35 light-theme:bg-fuchsia-600/[0.1] light-theme:text-fuchsia-900",
    "light-theme:hover:border-fuchsia-600/50 light-theme:hover:bg-fuchsia-600/[0.14]",
    "dark-theme:border-fuchsia-400/22 dark-theme:bg-fuchsia-400/[0.09] dark-theme:text-fuchsia-100",
    "dark-theme:hover:border-fuchsia-400/35 dark-theme:hover:bg-fuchsia-400/[0.13]",
  ].join(" "),
];

export function getTechSkillPillClass(index: number): string {
  return MUTED_PILL_STYLES[index % MUTED_PILL_STYLES.length];
}
