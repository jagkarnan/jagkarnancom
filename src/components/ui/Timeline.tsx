"use client";

import { Certification, Education, Milestone } from "@/content/resume";

interface TimelineItem {
  year: number;
  title: string;
  subtitle: string;
  type: "education" | "certification" | "milestone";
  notes?: string[];
  description?: string;
  milestoneType?: "achievement" | "project" | "award" | "certification";
}

interface TimelineProps {
  education: Education[];
  certifications: Certification[];
  milestones?: Milestone[];
}

export function Timeline({ education, certifications, milestones }: TimelineProps) {
  // Convert education to timeline items
  const educationItems: TimelineItem[] = education.map((e) => ({
    year: parseInt(e.end || e.start || "0"),
    title: e.degree,
    subtitle: e.school,
    type: "education",
    notes: e.notes,
  }));

  // Convert milestones to timeline items
  const milestoneItems: TimelineItem[] = (milestones || [])
    // Exclude certification-type milestones; these are shown separately
    .filter((m) => m.type !== "certification")
    .map((m) => ({
      year: parseInt(m.year),
      title: m.title,
      subtitle: m.description,
      type: "milestone",
      milestoneType: m.type,
      description: m.description,
    }));

  // Combine and sort by year (ascending - oldest first for tree layout)
  const allItems = [...educationItems, ...milestoneItems].sort(
    (a, b) => a.year - b.year
  );

  const cardClass = (item: TimelineItem) => {
    const isEducation = item.type === "education";
    const isAchievement =
      item.type === "milestone" && item.milestoneType === "achievement";
    const isMilestone = item.type === "milestone";
    if (isEducation)
      return "bg-foreground/10 border border-foreground/20";
    if (isAchievement)
      return "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30";
    if (isMilestone)
      return "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30";
    return "bg-white/5 border border-white/10";
  };

  const typeLabel = (item: TimelineItem) =>
    item.type === "milestone" ? item.milestoneType : item.type;

  return (
    <div className="relative min-w-0 py-4">
      {/* Mobile / narrow tablet: stacked cards (no side-by-side squeeze) */}
      <div className="space-y-4 md:hidden">
        {allItems.map((item) => (
          <div
            key={`mobile-${item.title}-${item.year}`}
            className={`rounded-xl p-4 ${cardClass(item)}`}
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

      <div className="hidden gap-8 md:flex">
        {/* Timeline Tree Column */}
        <div className="relative min-w-0 max-w-4xl flex-1">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/30 via-foreground/60 to-foreground/30" />

          {/* Timeline items */}
          <div className="relative space-y-8">
            {allItems.map((item, index) => {
              const isEducation = item.type === "education";
              const isMilestone = item.type === "milestone";
              const isAchievement = item.type === "milestone" && item.milestoneType === "achievement";
              // Layout: Education left, Milestones left, Achievements left
              const isLeft = isEducation || isMilestone || isAchievement;

              return (
                <div
                  key={`${item.title}-${item.year}`}
                  className={`relative flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                  data-year={item.year}
                >
                  {/* Content card */}
                  <div
                    className={`min-w-0 w-[45%] max-w-[48%] ${
                      isLeft ? "text-right pr-2 sm:pr-4" : "text-left pl-2 sm:pl-4"
                    }`}
                  >
                    <div
                      className={`inline-block max-w-full rounded-xl p-3 sm:p-4 ${
                        isEducation
                          ? "bg-foreground/10 border border-foreground/20"
                          : isAchievement
                          ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
                          : isMilestone
                          ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div
                        className={`flex min-w-0 flex-col gap-1 ${
                          isLeft ? "items-end" : "items-start"
                        }`}
                      >
                        <span
                          className={`text-xs font-medium uppercase tracking-wider ${
                            isEducation 
                              ? "text-foreground/70" 
                              : isAchievement
                              ? "text-purple-400/80"
                              : isMilestone
                              ? "text-amber-400/80"
                              : "text-foreground/50"
                          }`}
                        >
                          {isMilestone ? item.milestoneType : item.type}
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

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold shadow-lg ${
                        isEducation
                          ? "bg-foreground text-background ring-4 ring-background"
                          : isAchievement
                          ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white ring-4 ring-background"
                          : isMilestone
                          ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white ring-4 ring-background"
                          : "bg-background text-foreground border-2 border-foreground/40 ring-4 ring-background"
                      }`}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Branch line */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-0.5 w-[5%] ${
                      isLeft
                        ? "right-[50%] bg-gradient-to-l from-foreground/60 to-transparent"
                        : "left-[50%] bg-gradient-to-r from-foreground/60 to-transparent"
                    }`}
                  />

                  {/* Empty space for opposite side */}
                  <div className="min-w-0 w-[45%] max-w-[48%]" />
                </div>
              );
            })}
            
            {/* Legend positioned before timeline ends */}
            <div className="relative mt-8 mb-8">
              <div className="absolute left-0 right-0 flex flex-wrap items-center justify-center gap-4 gap-y-2 px-2 text-xs text-foreground/60 sm:gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-foreground" />
                  <span>Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500" />
                  <span>Milestone</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Progression Column — hidden on smaller screens to avoid overlap */}
        <div className="relative hidden w-48 shrink-0 lg:block">
          <div className="sticky top-8">
            <h3 className="text-sm font-semibold text-foreground/80 mb-4 text-center">
              Experience Journey
            </h3>
            
            {/* Experience Arrow - Aligned with Timeline */}
            <div className="relative">
              {/* Arrow shaft */}
              <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 bg-gradient-to-b from-amber-500/30 via-amber-500/40 to-amber-500/50 rounded-full" />
              {/* Arrow head */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-amber-500/60" />
              
              {/* Experience years aligned with timeline items */}
              <div className="relative pt-8">
                {[1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year, index) => {
                  const yearsOfExperience = year - 1997 + 1;
                  const opacity = 0.4 + (index / 28) * 0.5;
                  
                  // Find corresponding timeline item for this year
                  const timelineItem = allItems.find(item => item.year === year);
                  const hasTimelineItem = !!timelineItem;
                  
                  // Show year only every 5 years or if there's a timeline item
                  const showYear = year % 5 === 0 || hasTimelineItem;
                  
                  return (
                    <div
                      key={year}
                      className={`flex items-center h-16 ${hasTimelineItem ? 'opacity-100' : 'opacity-60'}`}
                      style={{ opacity: hasTimelineItem ? 1 : opacity }}
                    >
                      <div className="flex-1 flex justify-center text-xs font-mono">
                        {showYear && (
                          <span className="text-amber-500/70">{year}</span>
                        )}
                        {showYear && (
                          <span className="mx-1 text-amber-500/50">•</span>
                        )}
                        <span className="text-amber-500/90 font-bold">{yearsOfExperience}yr</span>
                      </div>
                      {hasTimelineItem && (
                        <div className="absolute left-0 right-0 h-px bg-amber-500/20" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Experience summary label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-20 bg-background/95 backdrop-blur px-3 py-2 rounded-lg text-xs text-amber-500/95 font-bold border border-amber-500/40 shadow-lg">
                28+ YEARS EXPERIENCE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
