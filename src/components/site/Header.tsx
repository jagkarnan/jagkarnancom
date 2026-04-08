"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { resume } from "@/content/resume";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const navItems = [
  { href: "#contact", label: "Contact" },
  { href: "#ai-skills", label: "AI Skills" },
  { href: "#tech-skills", label: "Tech Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#corporate-exposure", label: "Corporate Exposure" },
  { href: "#work-experience", label: "Work Experience" },
  { href: "#education", label: "Education" },
  { href: "#milestones", label: "Major Milestones" },
] as const;

const navLinkClass =
  "focus-ring rounded-md px-2 py-1.5 text-center text-[11px] font-medium leading-tight text-foreground/70 transition-colors duration-200 ease-out hover:bg-foreground/[0.06] hover:text-foreground active:bg-foreground/10 motion-reduce:transition-none lg:px-2 lg:text-xs xl:px-2.5 xl:text-sm";

const nameLinkClass =
  "focus-ring shrink-0 rounded-lg px-2 py-2 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 ease-out hover:bg-foreground/[0.06] active:bg-foreground/10 sm:px-3 sm:text-base motion-reduce:transition-none";

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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/60 backdrop-blur print:hidden">
      <div className="relative w-full min-w-0 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <Link
            href="/"
            className={`${nameLinkClass} shrink-0`}
            onClick={() => setMenuOpen(false)}
          >
            {resume.name}
          </Link>

          {/* lg+: wrap links instead of horizontal scroll (no clipped/hidden scrollbar). */}
          <nav
            className="mx-1 hidden min-w-0 flex-1 items-center justify-center lg:mx-2 lg:flex"
            aria-label="Page sections"
          >
            <div className="flex max-w-full flex-wrap justify-center gap-x-0.5 gap-y-1.5 sm:gap-x-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={navLinkClass}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="focus-ring rounded-lg p-2 text-foreground/80 transition-colors duration-200 ease-out hover:bg-foreground/10 active:bg-foreground/15 lg:hidden motion-reduce:transition-none"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
            <a
              href="/Jag_Karnan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring shrink-0 rounded-full border border-amber-500/80 bg-gradient-to-b from-amber-400 to-amber-600 px-2.5 py-1.5 text-xs font-semibold text-amber-950 shadow-sm shadow-amber-900/20 transition-[filter,transform] duration-200 ease-out hover:from-amber-300 hover:to-amber-500 active:scale-[0.97] motion-reduce:transition-none sm:px-3 sm:text-sm"
            >
              Resume PDF
            </a>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            className="absolute left-0 right-0 top-full z-50 border-b border-foreground/10 bg-background/95 backdrop-blur-md lg:hidden"
            aria-label="Page sections"
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-2 sm:px-6 lg:px-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-lg px-3 py-3 text-sm text-foreground/80 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10"
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
