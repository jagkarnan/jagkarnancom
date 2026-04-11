"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const NOTE =
  "To keep it real and authentic, all these articles are written without using any AI. AI was used for graphic illustrations only.";

type Phase = "closed" | "opening" | "open" | "closing";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function AiFreeWritingInfo() {
  const [phase, setPhase] = useState<Phase>("closed");
  const phaseRef = useRef<Phase>("closed");
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const noteId = useId().replace(/:/g, "");
  const reducedMotion = usePrefersReducedMotion();

  phaseRef.current = phase;

  const panelVisible = phase !== "closed";

  const beginClose = useCallback(() => {
    if (reducedMotion) setPhase("closed");
    else setPhase("closing");
  }, [reducedMotion]);

  useEffect(() => {
    if (phase === "open") closeRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase !== "open") return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      beginClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [phase, beginClose]);

  function beginOpen() {
    if (reducedMotion) setPhase("open");
    else setPhase("opening");
  }

  function onPanelAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    const name = e.animationName;
    const p = phaseRef.current;
    if (p === "opening" && name.includes("ai-free-balloon-expand")) {
      setPhase("open");
    }
    if (p === "closing" && name.includes("ai-free-balloon-collapse")) {
      setPhase("closed");
    }
  }

  const iconShell =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.06] text-xs font-bold text-foreground/70";

  const panelAnimClass =
    phase === "opening"
      ? "ai-free-writing-panel--enter"
      : phase === "closing"
        ? "ai-free-writing-panel--exit"
        : "";

  return (
    <div className="mt-3 flex flex-wrap items-start gap-x-2 gap-y-2">
      <span className="pt-0.5 text-sm font-medium text-foreground/75 sm:text-base">AI Free Writing</span>
      <div ref={rootRef} className="min-w-0 flex-1 sm:max-w-md sm:flex-initial">
        {!panelVisible ? (
          <button
            type="button"
            aria-expanded={false}
            aria-controls={`ai-free-writing-note-${noteId}`}
            aria-label="About AI Free Writing"
            onClick={beginOpen}
            className={`focus-ring ${iconShell} transition-transform duration-150 ease-out hover:border-foreground/30 hover:bg-foreground/10 hover:text-foreground active:scale-90 motion-reduce:active:scale-100`}
          >
            i
          </button>
        ) : (
          <div
            id={`ai-free-writing-note-${noteId}`}
            role="region"
            aria-label="AI Free Writing note"
            onAnimationEnd={onPanelAnimationEnd}
            className={`ai-free-writing-panel flex w-full items-start gap-3 rounded-xl border border-foreground/15 bg-[var(--card)] py-2.5 pl-3 pr-2 shadow-md shadow-[var(--glass-shadow-soft)] ${panelAnimClass}`}
          >
            <span
              className={`${iconShell} pointer-events-none border-foreground/15 text-foreground/60`}
              aria-hidden
            >
              i
            </span>
            <p className="min-w-0 flex-1 pt-0.5 text-sm leading-relaxed text-foreground/90">{NOTE}</p>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={beginClose}
              className="focus-ring shrink-0 rounded-lg p-2 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground active:bg-foreground/15"
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
