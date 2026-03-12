"use client";

import Link from "next/link";

const navItems = [
  { href: "#skills", label: "AI Skills" },
  { href: "#milestones", label: "Major Milestones" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const generatePDF = () => {
    // Show print dialog which allows saving as PDF
    window.print();
  };

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
          <button
            onClick={generatePDF}
            className="focus-ring ml-2 rounded-full border border-black/10 px-3 py-1 text-sm text-foreground/80 hover:bg-black/5 border-white/15 hover:bg-white/5"
          >
            Resume PDF
          </button>
        </nav>
      </div>
    </header>
  );
}
