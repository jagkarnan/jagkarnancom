"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { HeaderInlineNavKey } from "@/components/site/headerInlineNav";

export const COMPETENCIES_ITEMS = [
  { href: "/#ai-skills", id: "ai-skills", label: "AI Skills" },
  { href: "/#tech-skills", id: "tech-skills", label: "Tech Skills" },
  { href: "/#certifications", id: "certifications", label: "Certifications" },
  { href: "/#education", id: "education", label: "Education" },
] as const;

function CloseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function useHashSection(): string | null {
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);

  const sync = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") {
      setId(null);
      return;
    }
    const h = window.location.hash.replace(/^#/, "");
    const hit = COMPETENCIES_ITEMS.find((i) => i.id === h);
    setId(hit ? h : null);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [sync]);

  useEffect(() => {
    sync();
  }, [pathname, sync]);

  return id;
}

const COMPETENCIES_KEY: HeaderInlineNavKey = "competencies";

type CompetenciesNavProps = {
  triggerClassName: string;
  expandedNav: HeaderInlineNavKey | null;
  onExpandedNavChange: (key: HeaderInlineNavKey | null) => void;
};

export function CompetenciesNav({
  triggerClassName,
  expandedNav,
  onExpandedNavChange,
}: CompetenciesNavProps) {
  const open = expandedNav === COMPETENCIES_KEY;
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId().replace(/:/g, "");
  const selectedId = useHashSection();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExpandedNavChange(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onExpandedNavChange]);

  const collapse = () => onExpandedNavChange(null);

  const toggle = () => {
    onExpandedNavChange(open ? null : COMPETENCIES_KEY);
  };

  return (
    <div ref={rootRef} className="inline-flex max-w-full items-stretch">
      <div
        className={
          open
            ? "header-inline-nav-bar--enter inline-flex max-w-full items-center overflow-hidden rounded-2xl bg-[var(--card)] shadow-md shadow-[var(--glass-shadow-soft)] ring-1 ring-foreground/15"
            : "inline-flex"
        }
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`competencies-panel-${panelId}`}
          onClick={toggle}
          className={
            open
              ? "flex w-[7.5rem] shrink-0 items-center justify-center bg-gradient-to-b from-accent to-accent-2 px-3 py-2"
              : triggerClassName
          }
        >
          <span
            className={
              open
                ? "text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-white sm:text-[10px]"
                : undefined
            }
          >
            Competencies
          </span>
        </button>

        <div
          id={`competencies-panel-${panelId}`}
          role="region"
          aria-label="Competencies sections"
          className={`flex min-h-0 min-w-0 items-center overflow-hidden transition-[max-width,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open
              ? "max-w-[min(78vw,30rem)] opacity-100 xl:max-w-[34rem]"
              : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-0.5 inline-flex max-w-full flex-nowrap items-center justify-center gap-0.5 overflow-x-auto overflow-y-visible rounded-full bg-foreground/[0.04] px-1 py-0 shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)] [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-foreground/[0.06] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.35)] [&::-webkit-scrollbar]:hidden">
            {COMPETENCIES_ITEMS.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`focus-ring relative z-0 shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-center text-[11px] font-medium leading-tight transition-colors sm:px-2.5 sm:text-xs lg:text-[13px] ${
                    isSelected
                      ? "text-foreground"
                      : "text-foreground/75 hover:bg-foreground/[0.07] hover:text-foreground"
                  }`}
                >
                  {isSelected ? (
                    <span
                      className="pointer-events-none absolute inset-0 z-0 rounded-full bg-white/15 backdrop-blur-md dark:bg-white/10"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {open ? (
          <div className="flex shrink-0 items-center border-l border-foreground/10 pl-0.5 pr-0.5">
            <button
              ref={closeRef}
              type="button"
              aria-label="Collapse Competencies menu"
              onClick={collapse}
              className="focus-ring flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-full border border-foreground/15 bg-foreground/[0.04] text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
