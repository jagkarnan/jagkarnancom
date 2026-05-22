const MUTED_PILL_STYLES = [
  "border-violet-500/25 bg-violet-500/[0.07] text-violet-800/90 hover:border-violet-500/40 hover:bg-violet-500/[0.11] dark:border-violet-400/22 dark:bg-violet-400/[0.09] dark:text-violet-200/85 dark:hover:border-violet-400/35 dark:hover:bg-violet-400/[0.13]",
  "border-sky-500/25 bg-sky-500/[0.07] text-sky-800/90 hover:border-sky-500/40 hover:bg-sky-500/[0.11] dark:border-sky-400/22 dark:bg-sky-400/[0.09] dark:text-sky-200/85 dark:hover:border-sky-400/35 dark:hover:bg-sky-400/[0.13]",
  "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-800/90 hover:border-emerald-500/40 hover:bg-emerald-500/[0.11] dark:border-emerald-400/22 dark:bg-emerald-400/[0.09] dark:text-emerald-200/85 dark:hover:border-emerald-400/35 dark:hover:bg-emerald-400/[0.13]",
  "border-amber-500/25 bg-amber-500/[0.07] text-amber-900/85 hover:border-amber-500/40 hover:bg-amber-500/[0.11] dark:border-amber-400/22 dark:bg-amber-400/[0.09] dark:text-amber-100/85 dark:hover:border-amber-400/35 dark:hover:bg-amber-400/[0.13]",
  "border-rose-500/25 bg-rose-500/[0.07] text-rose-800/90 hover:border-rose-500/40 hover:bg-rose-500/[0.11] dark:border-rose-400/22 dark:bg-rose-400/[0.09] dark:text-rose-200/85 dark:hover:border-rose-400/35 dark:hover:bg-rose-400/[0.13]",
  "border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-800/90 hover:border-indigo-500/40 hover:bg-indigo-500/[0.11] dark:border-indigo-400/22 dark:bg-indigo-400/[0.09] dark:text-indigo-200/85 dark:hover:border-indigo-400/35 dark:hover:bg-indigo-400/[0.13]",
  "border-teal-500/25 bg-teal-500/[0.07] text-teal-800/90 hover:border-teal-500/40 hover:bg-teal-500/[0.11] dark:border-teal-400/22 dark:bg-teal-400/[0.09] dark:text-teal-200/85 dark:hover:border-teal-400/35 dark:hover:bg-teal-400/[0.13]",
  "border-fuchsia-500/25 bg-fuchsia-500/[0.07] text-fuchsia-800/90 hover:border-fuchsia-500/40 hover:bg-fuchsia-500/[0.11] dark:border-fuchsia-400/22 dark:bg-fuchsia-400/[0.09] dark:text-fuchsia-200/85 dark:hover:border-fuchsia-400/35 dark:hover:bg-fuchsia-400/[0.13]",
];

export function getTechSkillPillClass(index: number): string {
  return MUTED_PILL_STYLES[index % MUTED_PILL_STYLES.length];
}
