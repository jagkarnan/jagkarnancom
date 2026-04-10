"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { resume } from "@/content/resume";
import { COMPETENCIES_ITEMS, CompetenciesNav } from "@/components/site/CompetenciesNav";
import { EXPERIENCE_ITEMS, ExperienceNav } from "@/components/site/ExperienceNav";
import type { HeaderInlineNavKey } from "@/components/site/headerInlineNav";
import { isNavHrefActive } from "@/components/site/isNavHrefActive";
import { NAV_SELECTED_GLASS } from "@/components/site/navGlassClasses";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useHomePageHash } from "@/components/site/useHomePageHash";

const navItems = [
  { href: "/ai-papers", label: "AI Papers" },
  { href: "/youtube-videos", label: "YouTube Videos" },
  { href: "/#contact", label: "Contact" },
  { href: "/#milestones", label: "Major Milestones" },
] as const;

const navLinkClass =
  "focus-ring rounded-md px-2 py-1 text-center text-[11px] font-medium leading-tight text-foreground/70 transition-colors duration-200 ease-out hover:bg-foreground/[0.06] hover:text-foreground active:bg-foreground/10 motion-reduce:transition-none lg:px-2 lg:text-xs xl:px-2.5 xl:text-sm";

const nameLinkClass =
  "focus-ring shrink-0 rounded-lg px-2 py-1.5 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 ease-out hover:bg-foreground/[0.06] active:bg-foreground/10 sm:px-3 sm:text-base motion-reduce:transition-none";

const mobileNavLinkClass =
  "focus-ring rounded-lg px-3 py-3 text-sm text-foreground/80 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10";

/** Same base + hover/active as top-level mobile links; indented under group labels. */
const mobileNavSubLinkClass =
  "focus-ring block w-full rounded-lg py-3 pl-10 pr-3 text-left text-sm text-foreground/80 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10";

const mobileNavGroupLabelClass = "px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50";

function BrandLockup() {
  return <span className="min-w-0 truncate">{resume.name}</span>;
}

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

function MobileNavPanel({
  onClose,
  pathname,
  homeHash,
}: {
  onClose: () => void;
  pathname: string;
  homeHash: string | null;
}) {
  return (
    <nav
      id="mobile-nav"
      className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] touch-pan-y sm:px-6"
      aria-label="Page sections"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${mobileNavLinkClass}${
              isNavHrefActive(pathname, homeHash, item.href) ? ` ${NAV_SELECTED_GLASS}` : ""
            }`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        <div className="flex flex-col border-t border-foreground/10 pt-1" role="group" aria-label="Competencies">
          <p className={mobileNavGroupLabelClass}>Competencies</p>
          <ul className="flex list-none flex-col p-0">
            {COMPETENCIES_ITEMS.map((item) => {
              const subActive = pathname === "/" && homeHash === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`${mobileNavSubLinkClass}${subActive ? ` ${NAV_SELECTED_GLASS}` : ""}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col border-t border-foreground/10 pt-1" role="group" aria-label="Experience">
          <p className={mobileNavGroupLabelClass}>Experience</p>
          <ul className="flex list-none flex-col p-0">
            {EXPERIENCE_ITEMS.map((item) => {
              const subActive = pathname === "/" && homeHash === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`${mobileNavSubLinkClass}${subActive ? ` ${NAV_SELECTED_GLASS}` : ""}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {navItems.slice(3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${mobileNavLinkClass}${
              isNavHrefActive(pathname, homeHash, item.href) ? ` ${NAV_SELECTED_GLASS}` : ""
            }`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const homeHash = useHomePageHash();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedInlineNav, setExpandedInlineNav] = useState<HeaderInlineNavKey | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) setExpandedInlineNav(null);
  }, [menuOpen]);

  /** iOS: avoid rubber-band gap under fixed layers; restore scroll position on close. */
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const { overflow: prevBodyOverflow, position: prevBodyPosition, top: prevBodyTop, width: prevBodyWidth } =
      document.body.style;
    const prevHtmlOverflow = html.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileMenuPortal =
    portalReady && menuOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[250] flex h-[100dvh] max-h-[100dvh] w-full flex-col bg-background overscroll-none lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-foreground/10 bg-background px-4 py-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:gap-3 sm:px-6 sm:py-2.5">
              <Link
                href="/"
                className={`${nameLinkClass} flex min-w-0 flex-1 basis-0 items-center`}
                onClick={closeMenu}
                aria-label={resume.name}
              >
                <BrandLockup />
              </Link>
              <div className="ml-auto flex shrink-0 items-center gap-2">
                <ThemeToggle />
                <a
                  href="/Jag_Karnan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring shrink-0 rounded-md bg-[#c73e1d] px-2.5 py-1 text-xs font-medium text-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-[filter,transform,background-color] duration-200 ease-out hover:bg-[#9e2e18] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-3 sm:text-sm dark:bg-[#c73e1d] dark:text-white dark:shadow-[0_0_0_1px_rgba(255,255,255,0.18)] dark:hover:bg-[#9e2e18]"
                >
                  Resume PDF
                </a>
                <button
                  type="button"
                  className="focus-ring rounded-lg p-1.5 text-foreground/80 transition-colors duration-200 ease-out hover:bg-foreground/10 active:bg-foreground/15 motion-reduce:transition-none"
                  aria-controls="mobile-nav"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <HamburgerIcon open />
                </button>
              </div>
            </div>
            <MobileNavPanel onClose={closeMenu} pathname={pathname} homeHash={homeHash} />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
    <header className="site-header sticky top-0 z-50 w-full bg-background/60 backdrop-blur print:hidden">
      <div className="relative w-full min-w-0 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <div className="relative z-10 flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <Link
            href="/"
            className={`${nameLinkClass} flex min-w-0 shrink-0 items-center`}
            onClick={closeMenu}
            aria-label={resume.name}
          >
            <BrandLockup />
          </Link>

          {/* lg+: single row so expanding Competencies does not wrap and jump header height; scroll horizontally if needed. */}
          <nav
            className="mx-1 hidden min-w-0 flex-1 items-center justify-center overflow-visible lg:mx-2 lg:flex"
            aria-label="Page sections"
          >
            <div className="flex min-w-0 max-w-full flex-nowrap items-center justify-center gap-x-0.5 overflow-x-auto overflow-y-visible overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-1 [&::-webkit-scrollbar]:hidden">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navLinkClass}${
                    isNavHrefActive(pathname, homeHash, item.href) ? ` ${NAV_SELECTED_GLASS}` : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <CompetenciesNav
                triggerClassName={navLinkClass}
                expandedNav={expandedInlineNav}
                onExpandedNavChange={setExpandedInlineNav}
              />
              <ExperienceNav
                triggerClassName={navLinkClass}
                expandedNav={expandedInlineNav}
                onExpandedNavChange={setExpandedInlineNav}
              />
              {navItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navLinkClass}${
                    isNavHrefActive(pathname, homeHash, item.href) ? ` ${NAV_SELECTED_GLASS}` : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="/Jag_Karnan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring shrink-0 rounded-md bg-[#c73e1d] px-2.5 py-1 text-xs font-medium text-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-[filter,transform,background-color] duration-200 ease-out hover:bg-[#9e2e18] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-3 sm:text-sm dark:bg-[#c73e1d] dark:text-white dark:shadow-[0_0_0_1px_rgba(255,255,255,0.18)] dark:hover:bg-[#9e2e18]"
            >
              Resume PDF
            </a>
            <button
              type="button"
              className="focus-ring rounded-lg p-1.5 text-foreground/80 transition-colors duration-200 ease-out hover:bg-foreground/10 active:bg-foreground/15 lg:hidden motion-reduce:transition-none"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>
    </header>
    {mobileMenuPortal}
    </>
  );
}
