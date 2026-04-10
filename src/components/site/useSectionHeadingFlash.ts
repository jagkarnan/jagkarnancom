"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useHomePageHash } from "@/components/site/useHomePageHash";

/** Section `id`s on the home page that can be targeted from the header (hash nav). */
const HOME_SECTION_FLASH_IDS = new Set([
  "contact",
  "ai-skills",
  "tech-skills",
  "certifications",
  "education",
  "corporate-exposure",
  "work-experience",
  "milestones",
]);

/** Time the underline animation needs before we clear the class (~grow + fade). */
const FLASH_CLEAR_MS = 3100;

/** Wait this long after scroll has fully stopped before starting the underline. */
const AFTER_SCROLL_STOP_MS = 230;

/** Treat scroll as finished if no scroll events for this long (fallback when `scrollend` is missing). */
const SCROLL_IDLE_MS = 120;

/** Never wait longer than this for a flash (broken scroll events, odd browsers). */
const MAX_WAIT_SCROLL_MS = 4500;

/**
 * When the URL hash jumps to a known home section, returns that segment long enough for the
 * heading underline CSS (~3s) only after smooth scroll has stopped, then {@link AFTER_SCROLL_STOP_MS}.
 */
export function useSectionHeadingFlash(): string | null {
  const pathname = usePathname();
  const homeHash = useHomePageHash();
  const [flashTarget, setFlashTarget] = useState<string | null>(null);
  const prevHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      prevHashRef.current = null;
      setFlashTarget(null);
      return;
    }

    const h = homeHash;
    const prev = prevHashRef.current;

    if (h === prev) {
      return;
    }

    prevHashRef.current = h;

    if (!h || !HOME_SECTION_FLASH_IDS.has(h)) {
      setFlashTarget(null);
      return undefined;
    }

    setFlashTarget(null);

    let cancelled = false;
    const timeoutIds: number[] = [];
    const cleanups: (() => void)[] = [];

    const clearFlashLater = () => {
      const t = window.setTimeout(() => {
        if (!cancelled) setFlashTarget(null);
      }, FLASH_CLEAR_MS);
      timeoutIds.push(t);
    };

    const applyFlash = () => {
      if (cancelled) return;
      setFlashTarget(h);
      clearFlashLater();
    };

    let flashScheduled = false;
    const scheduleFlashAfterSettleDelay = () => {
      if (cancelled || flashScheduled) return;
      flashScheduled = true;
      window.clearTimeout(idleTimer);
      const t = window.setTimeout(() => {
        if (!cancelled) applyFlash();
      }, AFTER_SCROLL_STOP_MS);
      timeoutIds.push(t);
    };

    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      if (cancelled || flashScheduled) return;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        scheduleFlashAfterSettleDelay();
      }, SCROLL_IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const onScrollEnd = () => {
      if (cancelled || flashScheduled) return;
      scheduleFlashAfterSettleDelay();
    };

    if (typeof window !== "undefined" && "onscrollend" in window) {
      window.addEventListener("scrollend", onScrollEnd, { passive: true });
      cleanups.push(() => window.removeEventListener("scrollend", onScrollEnd));
    }

    const maxWait = window.setTimeout(() => {
      scheduleFlashAfterSettleDelay();
    }, MAX_WAIT_SCROLL_MS);
    timeoutIds.push(maxWait);

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        if (reducedMotion) {
          scheduleFlashAfterSettleDelay();
          return;
        }
        onScroll();
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(idleTimer);
      cleanups.forEach((fn) => fn());
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [homeHash, pathname]);

  return flashTarget;
}
