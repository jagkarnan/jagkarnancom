"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "#contact", label: "Contact" },
  { href: "#skills", label: "AI focus" },
  { href: "#ai-skills", label: "AI Skills" },
  { href: "#tech-skills", label: "Tech Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#corporate-experience", label: "Corporate Experience" },
  { href: "#experience", label: "Experience" },
  { href: "#milestones", label: "Major Milestones" },
] as const;

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur print:hidden">
      <div className="relative mx-auto flex max-w-5xl min-w-0 flex-col gap-0 px-4 py-3 sm:px-6 sm:py-4 md:gap-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex min-w-0 items-center gap-2 rounded-md sm:gap-3"
            onClick={() => setMenuOpen(false)}
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

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/Jag_Karnan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full border border-amber-500/80 bg-gradient-to-b from-amber-400 to-amber-600 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-md shadow-amber-900/30 hover:from-amber-300 hover:to-amber-500 sm:px-3 sm:text-sm"
            >
              Resume PDF
            </a>
            <button
              type="button"
              className="focus-ring rounded-md p-2 text-foreground/80 hover:bg-white/10 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav
          className="hidden flex-wrap gap-1 md:flex"
          aria-label="Page sections"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-2 py-1 text-sm text-foreground/70 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger panel */}
        {menuOpen ? (
          <nav
            id="mobile-nav"
            className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-background/95 backdrop-blur-md md:hidden"
            aria-label="Page sections"
          >
            <div className="mx-auto flex max-w-5xl flex-col px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-md px-3 py-3 text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
