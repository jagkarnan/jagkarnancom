"use client";

import { useEffect, useId, useRef, useState } from "react";

import {
  RESUME_DOCX_ZIP_FILENAME,
  RESUME_PDF_ZIP_FILENAME,
} from "@/lib/resumeDocumentOptions";

const PDF_HREF = "/api/resume-zip";
const DOCX_HREF = "/api/resume-docx-zip";

const triggerClassName =
  "editorial-resume-trigger focus-ring inline-flex h-full min-h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-[color,transform,background-color] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:min-h-12 sm:px-3.5";

const menuItemClassName =
  "focus-ring block w-full rounded-md px-3 py-2.5 text-left text-sm font-semibold text-[#111111] transition-colors hover:bg-[#e4efe6] active:bg-[#d8e8dc]";

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
    <div ref={rootRef} className="relative inline-flex shrink-0 self-stretch items-center">
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        Resume
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Resume format"
          className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[13rem] rounded-md border border-[#d7ddd5] bg-white p-1 shadow-[0_18px_42px_rgba(17,17,17,0.14)]"
        >
          <a
            role="menuitem"
            href={PDF_HREF}
            download={RESUME_PDF_ZIP_FILENAME}
            className={menuItemClassName}
            onClick={handlePick}
          >
            Download PDF (ZIP)
          </a>
          <a
            role="menuitem"
            href={DOCX_HREF}
            download={RESUME_DOCX_ZIP_FILENAME}
            className={menuItemClassName}
            onClick={handlePick}
          >
            Download DOCX (ZIP)
          </a>
        </div>
      ) : null}
    </div>
  );
}
