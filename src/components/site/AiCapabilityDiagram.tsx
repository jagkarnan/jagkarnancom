"use client";

import { useState } from "react";

type Tone =
  | "sky"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "indigo"
  | "fuchsia"
  | "teal";

type Capability = {
  title: string;
  items: string[];
  tone: Tone;
};

/** Per-layer palette. Hex literals chosen so Tailwind v4 doesn't need to safelist
 *  dynamic classnames; inline style picks the colour at render time.
 *  ink = title text accent (saturated dark for legibility on cream/paper). */
const TONE: Record<
  Tone,
  { hex: string; softHex: string; ink: string }
> = {
  sky:     { hex: "#0ea5e9", softHex: "#e0f2fe", ink: "#0369a1" },
  emerald: { hex: "#10b981", softHex: "#d1fae5", ink: "#047857" },
  violet:  { hex: "#8b5cf6", softHex: "#ede9fe", ink: "#6d28d9" },
  amber:   { hex: "#f59e0b", softHex: "#fef3c7", ink: "#b45309" },
  rose:    { hex: "#f43f5e", softHex: "#ffe4e6", ink: "#be123c" },
  indigo:  { hex: "#6366f1", softHex: "#e0e7ff", ink: "#4338ca" },
  fuchsia: { hex: "#d946ef", softHex: "#fae8ff", ink: "#a21caf" },
  teal:    { hex: "#14b8a6", softHex: "#ccfbf1", ink: "#0f766e" },
};

const CAPABILITIES: Capability[] = [
  {
    title: "AI Strategy & Roadmaps",
    tone: "sky",
    items: ["Portfolio scoring", "KPI baselines", "Governance gates"],
  },
  {
    title: "Agentic Automation",
    tone: "emerald",
    items: ["Multi-agent handoffs", "n8n / Zapier / APIs", "Retries & monitoring"],
  },
  {
    title: "GenAI Engineering",
    tone: "violet",
    items: ["RAG pipelines", "Evals & testing", "Vector stores"],
  },
  {
    title: "Local & Private LLMs",
    tone: "amber",
    items: ["Ollama & llama.cpp", "LoRA fine-tuning", "Data boundaries"],
  },
  {
    title: "AI Adoption & Enablement",
    tone: "rose",
    items: ["Prompt libraries", "Guardrails", "Human checkpoints"],
  },
  {
    title: "Frontier Model Applications",
    tone: "indigo",
    items: ["Claude / GPT / Gemini", "Content & analysis", "KPI-linked delivery"],
  },
  {
    title: "End-to-End AI Delivery",
    tone: "fuchsia",
    items: ["Discovery → prototype", "Pilot → production", "Training & iteration"],
  },
  {
    title: "AI Evaluation & Observability",
    tone: "teal",
    items: ["Evaluation baselines", "Cost & latency guards", "Explainability"],
  },
];

export function AiCapabilityDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="expertise-infographic relative w-full select-none"
      role="img"
      aria-label="AI capability stack diagram showing 8 core competencies from strategy and roadmaps through agentic automation, GenAI engineering, private LLMs, adoption enablement, frontier models, end-to-end delivery, and evaluation observability"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--editorial-muted)]">
          Capability Stack
        </p>
        <p className="text-[10px] font-medium tracking-wide text-[var(--editorial-muted)]">
          8 core layers
        </p>
      </div>

      {/* Timeline list */}
      <div className="relative">
        {/* Vertical spine line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[11px] top-3 bottom-10 w-px bg-[var(--editorial-line)]"
        />
        <ul className="m-0 list-none p-0">
          {CAPABILITIES.map((cap, i) => {
            const tone = TONE[cap.tone];
            const isHovered = hoveredIndex === i;
            const cardBg = isHovered ? tone.softHex : "var(--editorial-paper)";
            const cardBorder = isHovered ? tone.hex : "var(--editorial-line)";

            return (
              <li
                key={cap.title}
                className="relative m-0 p-0 pl-8"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Spine dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-[7px] top-[15px] block h-[9px] w-[9px] rounded-full border-[1.5px] transition-all duration-200 ease-out"
                  style={{
                    borderColor: tone.hex,
                    background: isHovered ? tone.hex : "var(--editorial-paper)",
                    transform: isHovered ? "scale(1.25)" : "scale(1)",
                  }}
                />

                {/* Card */}
                <article
                  className={`group relative overflow-hidden border px-3 py-2.5 transition-all duration-200 ease-out ${
                    i < CAPABILITIES.length - 1 ? "mb-2.5" : ""
                  }`}
                  style={{
                    borderColor: cardBorder,
                    background: cardBg,
                    transform: isHovered ? "translateX(2px)" : undefined,
                  }}
                >
                  {/* Left accent bar */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[2px] transition-opacity duration-200"
                    style={{
                      background: tone.hex,
                      opacity: isHovered ? 0.6 : 0.3,
                    }}
                  />

                  <h3
                    className="text-[12px] font-semibold leading-tight tracking-tight"
                    style={{ color: tone.ink }}
                  >
                    {cap.title}
                  </h3>
                  <ul className="mt-1 space-y-0">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-[11px] leading-relaxed text-[var(--editorial-muted)]"
                      >
                        <span
                          className="block h-[3px] w-[3px] shrink-0 rounded-full opacity-55"
                          style={{ background: tone.hex }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom outcome label */}
      <div className="relative mt-4 flex items-center gap-2 pl-8">
        <div className="h-px flex-1 bg-[var(--editorial-line)]" />
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--editorial-muted)]">
          measure → learn → tune → automate → govern
        </span>
        <div className="h-px flex-1 bg-[var(--editorial-line)]" />
      </div>
    </div>
  );
}
