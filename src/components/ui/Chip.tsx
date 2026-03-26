export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-foreground/12 bg-foreground/5 px-3 py-1 text-xs leading-snug text-foreground/80 transition-colors duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.08]">
      {children}
    </span>
  );
}
