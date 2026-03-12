export function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/80 ">
      {" "}
      {children}{" "}
    </span>
  );
}
