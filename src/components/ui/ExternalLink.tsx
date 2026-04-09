import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-ring inline-flex items-center gap-2 rounded-md text-foreground transition-colors duration-200 ease-out hover:text-accent active:opacity-80 motion-reduce:transition-none ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
