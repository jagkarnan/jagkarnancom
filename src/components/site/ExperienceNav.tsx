"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { HeaderInlineNavKey } from "@/components/site/headerInlineNav";
import { NAV_INLINE_TRIGGER_OPEN_GLASS, NAV_SELECTED_GLASS } from "@/components/site/navGlassClasses";
import { useHashLinkClickResync } from "@/components/site/useHashLinkClickResync";

export const EXPERIENCE_ITEMS = [
  { href: "/#corporate-exposure", id: "corporate-exposure", label: "Corporate Exposure" },
  { href: "/#work-experience", id: "work-experience", label: "Work Experience" },
] as const;

function CloseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function useExperienceHashSection(): {
  selectedId: string | null;
  primeSelectedId: (segment: string) => void;
} {
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);

  const sync = useCallback(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const h = window.location.hash.replace(/^#/, "");
    if (path !== "/") {
      setId(null);
      return;
    }
    const hit = EXPERIENCE_ITEMS.find((i) => i.id === h);
    setId(hit ? h : null);
  }, []);

  const primeSelectedId = useCallback((segment: string) => {
    if (EXPERIENCE_ITEMS.some((i) => i.id === segment)) {
      setId(segment);
    }
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

  useHashLinkClickResync(pathname, sync);

  return { selectedId: id, primeSelectedId };
}

const EXPERIENCE_KEY: HeaderInlineNavKey = "experience";

type ExperienceNavProps = {
  triggerClassName: string;
  expandedNav: HeaderInlineNavKey | null;
  onExpandedNavChange: (key: HeaderInlineNavKey | null) => void;
};

export function ExperienceNav({
  triggerClassName,
  expandedNav,
  onExpandedNavChange,
}: ExperienceNavProps) {
  const open = expandedNav === EXPERIENCE_KEY;
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId().replace(/:/g, "");
  const { selectedId, primeSelectedId } = useExperienceHashSection();

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
    onExpandedNavChange(open ? null : EXPERIENCE_KEY);
  };

  return (
    <div ref={rootRef} className="inline-flex max-w-full items-stretch">
      <div
        className={
          open
            ? "header-inline-nav-bar--enter inline-flex max-w-full items-center overflow-hidden rounded-2xl border border-foreground/15 bg-[var(--card)] shadow-md shadow-[var(--glass-shadow-soft)]"
            : "inline-flex"
        }
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`experience-panel-${panelId}`}
          onClick={toggle}
          className={
            open
              ? `flex w-[6.5rem] shrink-0 items-center justify-center px-3 py-2 ${NAV_INLINE_TRIGGER_OPEN_GLASS}`
              : selectedId
                ? `${triggerClassName} ${NAV_SELECTED_GLASS}`
                : triggerClassName
          }
        >
          <span
            className={
              open
                ? "text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-white sm:text-[11px]"
                : undefined
            }
          >
            Experience
          </span>
        </button>

        <div
          id={`experience-panel-${panelId}`}
          role="region"
          aria-label="Experience sections"
          className={`flex min-h-0 min-w-0 items-center overflow-hidden transition-[max-width,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open
              ? "max-w-[min(78vw,30rem)] opacity-100 xl:max-w-[34rem]"
              : "max-w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-0.5 inline-flex max-w-full flex-nowrap items-center justify-center gap-0.5 overflow-x-auto overflow-y-visible rounded-full bg-foreground/[0.04] px-1 py-0 shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)] [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-foreground/[0.06] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.35)] [&::-webkit-scrollbar]:hidden">
            {EXPERIENCE_ITEMS.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => primeSelectedId(item.id)}
                  className={`${triggerClassName} shrink-0 whitespace-nowrap${
                    isSelected ? ` ${NAV_SELECTED_GLASS}` : ""
                  }`}
                >
                  {item.label}
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
              aria-label="Collapse Experience menu"
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
