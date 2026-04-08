"use client";

import { Fragment } from "react";
import { Milestone } from "@/content/resume";

interface TimelineItem {
  year: number;
  title: string;
  subtitle: string;
  type: "milestone";
  notes?: string[];
  description?: string;
  milestoneType?: "achievement" | "project" | "award" | "certification";
}

interface TimelineProps {
  milestones?: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const allItems: TimelineItem[] = (milestones || [])
    .filter((m) => m.type !== "certification")
    .map((m) => ({
      year: parseInt(m.year, 10),
      title: m.title,
      subtitle: m.description,
      type: "milestone" as const,
      milestoneType: m.type,
      description: m.description,
    }))
    .sort((a, b) => a.year - b.year);

  const cardClass = (item: TimelineItem) => {
    const isAchievement =
      item.type === "milestone" && item.milestoneType === "achievement";
    const isMilestone = item.type === "milestone";
    if (isAchievement)
      return "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30";
    if (isMilestone)
      return "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30";
    return "bg-foreground/5 border border-foreground/10";
  };

  const typeLabel = (item: TimelineItem) => item.milestoneType;

  const careerStartYear = 1997;

  const renderDesktopTimelineRow = (item: TimelineItem) => {
    const isMilestone = item.type === "milestone";
    const isAchievement =
      item.type === "milestone" && item.milestoneType === "achievement";
    const isLeft = true;

    return (
      <div
        className={`relative flex items-center ${
          isLeft ? "flex-row" : "flex-row-reverse"
        }`}
        data-year={item.year}
      >
        <div
          className={`min-w-0 w-[45%] max-w-[48%] ${
            isLeft ? "text-right pr-2 sm:pr-4" : "text-left pl-2 sm:pl-4"
          }`}
        >
          <div
            className={`inline-block max-w-full rounded-xl p-3 transition-[border-color,box-shadow] duration-200 ease-out sm:p-4 ${
              isAchievement
                ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
                : isMilestone
                  ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                  : "bg-foreground/5 border border-foreground/10"
            }`}
          >
            <div
              className={`flex min-w-0 flex-col gap-1 ${
                isLeft ? "items-end" : "items-start"
              }`}
            >
              <span
                className={`text-xs font-medium uppercase tracking-wider ${
                  isAchievement
                    ? "text-purple-400/80"
                    : isMilestone
                      ? "text-amber-400/80"
                      : "text-foreground/50"
                }`}
              >
                {item.milestoneType}
              </span>
              <span className="font-mono text-xs text-foreground/60">
                {item.year}
              </span>
              <h3 className="break-words text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="break-words text-sm text-foreground/70">
                {item.subtitle}
              </p>
              {item.notes && item.notes.length > 0 && (
                <p className="break-words text-xs italic text-foreground/50">
                  {item.notes.join(" • ")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <div
            className={`timeline-hub flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ring-4 ring-background ${
              isAchievement
                ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                : isMilestone
                  ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                  : "border-2 border-foreground/40 bg-background text-foreground"
            }`}
          >
            {item.year}
          </div>
        </div>

        <div
          className={`absolute top-1/2 -translate-y-1/2 h-0.5 w-[5%] ${
            isLeft
              ? "right-[50%] bg-gradient-to-l from-foreground/60 to-transparent"
              : "left-[50%] bg-gradient-to-r from-foreground/60 to-transparent"
          }`}
        />

        <div className="min-w-0 w-[45%] max-w-[48%]" />
      </div>
    );
  };

  const milestoneLegend = (
    <div className="relative mt-8 mb-8">
      <div className="absolute left-0 right-0 flex flex-wrap items-center justify-center gap-4 gap-y-2 px-2 text-xs text-foreground/60 sm:gap-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
          <span>Achievement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500" />
          <span>Milestone</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-w-0 py-4">
      {/* Mobile / narrow tablet: stacked cards (no side-by-side squeeze) */}
      <div className="space-y-4 md:hidden">
        {allItems.map((item) => (
          <div
            key={`mobile-${item.title}-${item.year}`}
            className={`rounded-xl p-4 transition-[border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none ${cardClass(item)}`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
              {typeLabel(item)}
            </p>
            <p className="mt-1 font-mono text-xs text-foreground/60">
              {item.year}
            </p>
            <h3 className="mt-2 break-words text-sm font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 break-words text-sm text-foreground/70">
              {item.subtitle}
            </p>
            {item.notes && item.notes.length > 0 ? (
              <p className="mt-2 break-words text-xs italic text-foreground/50">
                {item.notes.join(" • ")}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {/* md–lg: timeline only */}
      <div className="hidden md:block lg:hidden">
        <div className="relative min-w-0 max-w-4xl">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/30 via-foreground/60 to-foreground/30" />
          <div className="relative space-y-8">
            {allItems.map((item) => (
              <Fragment key={`${item.title}-${item.year}`}>
                {renderDesktopTimelineRow(item)}
              </Fragment>
            ))}
            {milestoneLegend}
          </div>
        </div>
      </div>

      {/* lg+: timeline + experience journey rows aligned (arrow height matches spine) */}
      <div className="timeline-experience-journey hidden lg:block w-full max-w-[calc(56rem+2rem+12rem)]">
        <div className="mb-4 grid grid-cols-[minmax(0,56rem)_12rem] gap-x-8">
          <div aria-hidden />
          <div className="text-center">
            <h3 className="experience-journey-heading text-sm font-semibold text-foreground/80">
              Experience Journey
            </h3>
            <p className="experience-journey-subtitle mt-1 text-[10px] font-bold tracking-wide text-amber-500/95">
              30 YEARS EXPERIENCE
            </p>
          </div>
        </div>

        <div
          className="relative grid grid-cols-[minmax(0,56rem)_12rem] gap-x-8 gap-y-8"
          style={{ gridAutoRows: "minmax(min-content, auto)" }}
        >
          {/* Milestone spine — spans all timeline rows */}
          <div
            className="pointer-events-none z-0 col-start-1 row-start-1 flex justify-center"
            style={{ gridRowEnd: `span ${allItems.length}` }}
          >
            <div className="w-1 min-h-full rounded-full bg-gradient-to-b from-foreground/30 via-foreground/60 to-foreground/30" />
          </div>

          {/* Experience arrow — same vertical span as spine */}
          <div
            className="pointer-events-none z-0 col-start-2 row-start-1 relative flex justify-center"
            style={{ gridRowEnd: `span ${allItems.length}` }}
          >
            <div className="experience-journey-arrow-track absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/30 via-amber-500/40 to-amber-500/50" />
            <div className="experience-journey-arrow-tip absolute bottom-0 left-1/2 -translate-x-1/2 h-0 w-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-amber-500/60" />
          </div>

          {allItems.map((item, index) => (
            <Fragment key={`${item.title}-${item.year}`}>
              <div
                className="relative z-10 min-w-0"
                style={{ gridColumn: 1, gridRow: index + 1 }}
              >
                {renderDesktopTimelineRow(item)}
              </div>
              <div
                className="relative z-10 flex flex-col items-center justify-center gap-0.5 px-1 text-center"
                style={{ gridColumn: 2, gridRow: index + 1 }}
              >
                <span className="experience-journey-year text-xs font-mono text-amber-500/90">
                  {item.year}
                </span>
                <span className="experience-journey-year experience-journey-yr-count text-[10px] font-bold leading-tight text-amber-500/95">
                  {item.year - careerStartYear + 1} yr
                </span>
              </div>
            </Fragment>
          ))}

          <div className="col-span-2">{milestoneLegend}</div>
        </div>
      </div>
    </div>
  );
}
