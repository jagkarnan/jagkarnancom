/** Frosted glass pill for selected nav / submenu items (header + inline panels).
 *  Use real borders (not ring/box-shadow) so the edge stays visible with backdrop-blur
 *  in Safari and other engines where inset ring shadows are dropped in production. */
export const NAV_SELECTED_GLASS =
  "border border-foreground/18 bg-foreground/[0.07] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl dark:border-white/14 dark:bg-white/[0.09] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]";

/** Expanded Competencies / Experience trigger: gradient + frosted read. */
export const NAV_INLINE_TRIGGER_OPEN_GLASS =
  "border border-white/35 bg-gradient-to-b from-accent/80 to-accent-2/80 backdrop-blur-md";
