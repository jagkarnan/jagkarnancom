"use client";

import Link from "next/link";

const navItems = [
  { href: "#contact", label: "Contact" },
  { href: "#skills", label: "AI focus" },
  { href: "#ai-skills", label: "AI Skills" },
  { href: "#tech-skills", label: "Tech Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#corporate-exposure", label: "Corporate Exposure" },
  { href: "#experience", label: "Experience" },
  { href: "#milestones", label: "Major Milestones" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-5xl min-w-0 flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex min-w-0 items-center gap-2 rounded-md sm:gap-3"
          >
            <img
              src="/profile-photo.jpg"
              alt="Jag Karnan"
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-sm font-semibold tracking-tight">
              Jag Karnan
            </span>
          </Link>
          <a
            href="/Jag_Karnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-xs text-foreground/80 hover:bg-white/5 sm:px-3 sm:text-sm"
          >
            Resume PDF
          </a>
        </div>
        <nav
          className="-mx-1 flex gap-1 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0"
          aria-label="Page sections"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring shrink-0 rounded-md px-2 py-1 text-xs text-foreground/70 hover:text-foreground sm:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
