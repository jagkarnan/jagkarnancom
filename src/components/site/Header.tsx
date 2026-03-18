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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-3 rounded-md"
        >
          <img
            src="/profile-photo.jpg"
            alt="Jag Karnan"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-tight">
            Jag Karnan
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-2 py-1 text-sm text-foreground/70 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Jag_Karnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring ml-2 rounded-full border border-white/15 px-3 py-1 text-sm text-foreground/80 hover:bg-white/5 cursor-pointer"
          >
            Resume PDF
          </a>
        </nav>
      </div>
    </header>
  );
}
