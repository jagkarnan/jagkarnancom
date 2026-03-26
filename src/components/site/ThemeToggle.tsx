"use client";

import { useEffect, useState } from "react";

function isLightTheme(): boolean {
  return document.documentElement.getAttribute("data-theme") === "light";
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLight(isLightTheme());
  }, []);

  const toggle = () => {
    const nextLight = !light;
    setLight(nextLight);
    if (nextLight) {
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        /* ignore */
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? light : false}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggle}
      className="focus-ring relative inline-flex h-8 w-[3.25rem] shrink-0 items-center rounded-full border border-foreground/20 bg-foreground/10 p-0.5 transition-colors duration-200 ease-out hover:bg-foreground/[0.14] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
        <MoonIcon className="text-foreground/40" />
        <SunIcon className="text-foreground/40" />
      </span>
      <span
        className={`absolute left-0.5 top-0.5 z-[1] size-7 rounded-full bg-background shadow-sm ring-1 ring-foreground/15 transition-transform duration-200 ease-out motion-reduce:transition-none ${
          light ? "translate-x-[1.25rem]" : "translate-x-0"
        }`}
        aria-hidden
      />
    </button>
  );
}
