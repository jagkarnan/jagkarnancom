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

const FLASH_CLEAR_MS = 3100;

/**
 * When the URL hash jumps to a known home section, returns that segment until the
 * heading underline animation can finish (~3s), then `null`.
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

    if (h && HOME_SECTION_FLASH_IDS.has(h)) {
      setFlashTarget(h);
      const t = window.setTimeout(() => {
        setFlashTarget(null);
      }, FLASH_CLEAR_MS);
      return () => clearTimeout(t);
    }

    setFlashTarget(null);
    return undefined;
  }, [homeHash, pathname]);

  return flashTarget;
}
