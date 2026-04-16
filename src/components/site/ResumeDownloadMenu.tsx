"use client";

import { useEffect, useId, useRef, useState } from "react";

const PDF_HREF = "/Jag_Karnan_Resume.pdf";
const DOCX_HREF = "/Jag_Karnan_Resume.docx";

const triggerClassName =
  "focus-ring inline-flex shrink-0 items-center gap-1 rounded-md bg-[#c73e1d] px-2.5 py-1 text-xs font-medium text-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-[filter,transform,background-color] duration-200 ease-out hover:bg-[#9e2e18] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-3 sm:text-sm dark:bg-[#c73e1d] dark:text-white dark:shadow-[0_0_0_1px_rgba(255,255,255,0.18)] dark:hover:bg-[#9e2e18]";

const menuItemClassName =
  "focus-ring block w-full rounded-md px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-foreground/[0.06] active:bg-foreground/10";

type ResumeDownloadMenuProps = {
  /** Called after the user picks PDF or DOCX (e.g. close mobile menu overlay). */
  onAfterPick?: () => void;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 opacity-90 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ResumeDownloadMenu({ onAfterPick }: ResumeDownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  const close = () => setOpen(false);

  const handlePick = () => {
    close();
    onAfterPick?.();
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        Download Resume
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Resume format"
          className="absolute right-0 top-[calc(100%+6px)] z-[100] min-w-[11rem] rounded-lg border border-foreground/10 bg-[var(--card)] py-1 shadow-lg shadow-black/10 dark:shadow-black/40"
        >
          <a
            role="menuitem"
            href={PDF_HREF}
            download="Jag_Karnan_Resume.pdf"
            className={menuItemClassName}
            onClick={handlePick}
          >
            Download PDF
          </a>
          <a
            role="menuitem"
            href={DOCX_HREF}
            download="Jag_Karnan_Resume.docx"
            className={menuItemClassName}
            onClick={handlePick}
          >
            Download DOCX
          </a>
        </div>
      ) : null}
    </div>
  );
}
