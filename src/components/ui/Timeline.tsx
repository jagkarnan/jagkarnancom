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

  // Convert certifications to timeline items
  const certificationItems: TimelineItem[] = certifications.map((c) => ({
    year: parseInt(c.date),
    title: c.name,
    subtitle: c.issuer,
    type: "certification",
  }));

  // Convert milestones to timeline items
  const milestoneItems: TimelineItem[] = (milestones || []).map((m) => ({
    year: parseInt(m.year),
    title: m.title,
    subtitle: m.description,
    type: "milestone",
    milestoneType: m.type,
    description: m.description,
  }));

  // Combine and sort by year (ascending - oldest first for tree layout)
  const allItems = [...educationItems, ...certificationItems, ...milestoneItems].sort(
    (a, b) => a.year - b.year
  );

  return (
    <div className="relative py-4">
      <div className="flex gap-8">
        {/* Timeline Tree Column */}
        <div className="flex-1 relative max-w-4xl">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/30 via-foreground/60 to-foreground/30" />

          {/* Timeline items */}
          <div className="relative space-y-8">
            {allItems.map((item, index) => {
              const isEducation = item.type === "education";
              const isMilestone = item.type === "milestone";
              const isCertification = item.type === "certification" || (isMilestone && item.milestoneType === "certification");
              const isAchievement = item.type === "milestone" && item.milestoneType === "achievement";
              // Layout: Education left, Milestones left, Certifications right, Achievements left
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
                    className={`w-[45%] ${
                      isLeft ? "text-right pr-4" : "text-left pl-4"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-xl p-4 ${
                        isEducation
                          ? "bg-foreground/10 border border-foreground/20"
                          : isCertification
                          ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
                          : isAchievement
                          ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
                          : isMilestone
                          ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-1 ${
                          isLeft ? "items-end" : "items-start"
                        }`}
                      >
                        <span
                          className={`text-xs font-medium uppercase tracking-wider ${
                            isEducation 
                              ? "text-foreground/70" 
                              : isCertification
                              ? "text-blue-400/80"
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
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70">{item.subtitle}</p>
                        {item.notes && item.notes.length > 0 && (
                          <p className="text-xs text-foreground/50 italic">
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
                          : isCertification
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white ring-4 ring-background"
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
                  <div className="w-[45%]" />
                </div>
              );
            })}
            
            {/* Legend positioned before timeline ends */}
            <div className="relative mt-8 mb-8">
              <div className="absolute left-0 right-0 flex items-center justify-center gap-8 text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-foreground" />
                  <span>Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500" />
                  <span>Milestone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-foreground/40 bg-background" />
                  <span>Certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Progression Column */}
        <div className="w-48 relative">
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
