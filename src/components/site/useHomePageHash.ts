"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useHashLinkClickResync } from "@/components/site/useHashLinkClickResync";

/** Hash segment (no `#`) when pathname is `/`, else `null`. */
export function useHomePageHash(): string | null {
  const pathname = usePathname();
  const [hash, setHash] = useState<string | null>(null);

  const sync = useCallback(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") {
      setHash(null);
      return;
    }
    const raw = window.location.hash.replace(/^#/, "");
    setHash(raw === "" ? null : raw);
  }, [pathname]);

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

  return hash;
}
