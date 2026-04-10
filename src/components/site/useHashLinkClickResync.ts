"use client";

import { useEffect } from "react";

function isSameOriginHashLink(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  const anchor = target.closest("a[href*='#']");
  if (!anchor || !(anchor instanceof HTMLAnchorElement)) return false;
  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (href.startsWith("http") && !href.startsWith(window.location.origin)) return false;
  return true;
}

/**
 * Next.js `<Link href="/#…">` on `/` often updates `location.hash` without `hashchange`, and
 * the hash may commit after the click event. Sync on bubble + delayed ticks so we read the
 * final URL (fixes e.g. Tech Skills → Education staying on the old highlight).
 */
export function useHashLinkClickResync(pathname: string, sync: () => void) {
  useEffect(() => {
    if (pathname !== "/") return;

    let t0: ReturnType<typeof setTimeout> | undefined;
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    let rafOuter = 0;
    let rafInner = 0;

    const scheduleSync = () => {
      queueMicrotask(() => {
        sync();
      });

      if (t0 !== undefined) clearTimeout(t0);
      if (t1 !== undefined) clearTimeout(t1);
      if (t2 !== undefined) clearTimeout(t2);
      t0 = setTimeout(() => sync(), 0);
      t1 = setTimeout(() => sync(), 32);
      t2 = setTimeout(() => sync(), 96);

      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      rafOuter = requestAnimationFrame(() => {
        sync();
        rafInner = requestAnimationFrame(() => {
          sync();
        });
      });
    };

    const onClickBubble = (e: MouseEvent) => {
      if (!isSameOriginHashLink(e.target)) return;
      scheduleSync();
    };

    document.addEventListener("click", onClickBubble, false);
    return () => {
      document.removeEventListener("click", onClickBubble, false);
      if (t0 !== undefined) clearTimeout(t0);
      if (t1 !== undefined) clearTimeout(t1);
      if (t2 !== undefined) clearTimeout(t2);
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
    };
  }, [pathname, sync]);
}
