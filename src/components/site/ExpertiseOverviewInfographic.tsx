"use client";

import React from "react";
import { RouteIcon, WorkflowIcon, CpuIcon, LockIcon } from "lucide-animated";

/** Custom Glowing Electronic Brain SVG Icon with Sketch styling capability */
function ElectronicBrainIcon({ className = "w-12 h-12", filter = "" }: { className?: string; filter?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className} text-accent transition-colors duration-300`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={filter ? { filter } : undefined}
      aria-hidden="true"
    >
      {/* Brain Silhouette Left Hemisphere */}
      <path
        d="M 32 10 
           C 22 10, 16 15, 16 24 
           C 16 28, 18 31, 20 34 
           C 17.5 36.5, 16.5 40.5, 18.5 44.5 
           C 20.5 48.5, 25 50, 32 50"
        className="opacity-90"
      />
      {/* Brain Silhouette Right Hemisphere */}
      <path
        d="M 32 10 
           C 42 10, 48 15, 48 24 
           C 48 28, 46 31, 44 34 
           C 46.5 36.5, 47.5 40.5, 45.5 44.5 
           C 43.5 48.5, 39 50, 32 50"
        className="opacity-90"
      />
      {/* Central Connection / Brain Stem */}
      <path d="M 32 10 V 50" strokeDasharray="3 3" className="opacity-50" />
      
      {/* Left Circuit Elements */}
      <path d="M 32 18 H 22 V 26 H 18" className="stroke-accent-2" />
      <circle cx="18" cy="26" r="2" className="fill-accent-2 stroke-accent-2" />
      
      <path d="M 32 30 H 25 V 36" className="stroke-accent" />
      <circle cx="25" cy="36" r="2" className="fill-accent stroke-accent" />

      <path d="M 32 42 H 23 V 46" className="stroke-accent-2" opacity="0.8" />
      <circle cx="23" cy="46" r="1.5" className="fill-accent-2 stroke-accent-2" opacity="0.8" />

      {/* Right Circuit Elements */}
      <path d="M 32 18 H 42 V 26 H 46" className="stroke-accent-2" />
      <circle cx="46" cy="26" r="2.5" className="fill-accent-2 stroke-accent-2" />
      
      <path d="M 32 30 H 39 V 36" className="stroke-accent" />
      <circle cx="39" cy="36" r="2.5" className="fill-accent stroke-accent" />

      <path d="M 32 42 H 41 V 46" className="stroke-accent-2" opacity="0.8" />
      <circle cx="41" cy="46" r="1.5" className="fill-accent-2 stroke-accent-2" opacity="0.8" />
    </svg>
  );
}

export function ExpertiseOverviewInfographic() {
  const sketchFilter = "url(#pencil-sketch)";

  return (
    <div className="w-full flex flex-col gap-8">
      {/* SVG Sketch Filter Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="pencil-sketch" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 1. Mobile Layout: Vertical Stack (< md) */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Mobile Center Header Card */}
        <div className="relative flex flex-col items-center justify-center p-6 text-center rounded-xl bg-foreground/[0.01] overflow-hidden min-h-[120px]">
          {/* Sketch border background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-foreground/15 dark:text-foreground/10" style={{ filter: sketchFilter }}>
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="1" width="calc(100% - 7px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </div>
          <ElectronicBrainIcon className="w-14 h-14 mb-3" filter={sketchFilter} />
          <h3 className="text-sm font-bold tracking-tight text-foreground font-heading">
            AI Expertise & Capability Overview
          </h3>
        </div>

        {/* Mobile Corner Blocks */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* AI Strategy */}
          <div className="relative bg-amber-500/[0.005] rounded-xl p-4 flex flex-col gap-2 min-h-[110px]">
            {/* Sketch border */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full text-amber-500/20" style={{ filter: sketchFilter }}>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
                <rect x="3" y="1" width="calc(100% - 6px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              </svg>
            </div>
            <div className="flex items-center gap-2 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <RouteIcon size={16} />
              </div>
              <h4 className="text-xs font-semibold tracking-wide text-foreground font-heading">
                AI Strategy & Roadmaps
              </h4>
            </div>
            <ul className="list-disc pl-4 text-[11px] leading-relaxed text-foreground/75 space-y-1 z-10">
              <li>Roadmap planning</li>
              <li>ROI modeling</li>
              <li>Applied AI</li>
            </ul>
          </div>

          {/* Agentic Automation */}
          <div className="relative bg-indigo-500/[0.005] rounded-xl p-4 flex flex-col gap-2 min-h-[110px]">
            {/* Sketch border */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full text-indigo-500/20" style={{ filter: sketchFilter }}>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
                <rect x="3" y="1" width="calc(100% - 6px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              </svg>
            </div>
            <div className="flex items-center gap-2 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <WorkflowIcon size={16} />
              </div>
              <h4 className="text-xs font-semibold tracking-wide text-foreground font-heading">
                Agentic Automation
              </h4>
            </div>
            <ul className="list-disc pl-4 text-[11px] leading-relaxed text-foreground/75 space-y-1 z-10">
              <li>Multi-agent coordination</li>
              <li>Autonomous workflows</li>
              <li>Tool & API integration</li>
            </ul>
          </div>

          {/* GenAI Engineering */}
          <div className="relative bg-sky-500/[0.005] rounded-xl p-4 flex flex-col gap-2 min-h-[110px]">
            {/* Sketch border */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full text-sky-500/20" style={{ filter: sketchFilter }}>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
                <rect x="3" y="1" width="calc(100% - 6px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              </svg>
            </div>
            <div className="flex items-center gap-2 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <CpuIcon size={16} />
              </div>
              <h4 className="text-xs font-semibold tracking-wide text-foreground font-heading">
                GenAI Engineering
              </h4>
            </div>
            <ul className="list-disc pl-4 text-[11px] leading-relaxed text-foreground/75 space-y-1 z-10">
              <li>LLM APIs (Claude, GPT, Gemini)</li>
              <li>RAG & vector databases</li>
              <li>Production deployment</li>
            </ul>
          </div>

          {/* Private LLMs */}
          <div className="relative bg-emerald-500/[0.005] rounded-xl p-4 flex flex-col gap-2 min-h-[110px]">
            {/* Sketch border */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full text-emerald-500/20" style={{ filter: sketchFilter }}>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
                <rect x="3" y="1" width="calc(100% - 6px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
              </svg>
            </div>
            <div className="flex items-center gap-2 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <LockIcon size={16} />
              </div>
              <h4 className="text-xs font-semibold tracking-wide text-foreground font-heading">
                Local & Private LLMs
              </h4>
            </div>
            <ul className="list-disc pl-4 text-[11px] leading-relaxed text-foreground/75 space-y-1 z-10">
              <li>Ollama & local models</li>
              <li>Compliance & security</li>
              <li>Cost optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Desktop Layout: Relative Grid & SVG Connectors (>= md) */}
      <div className="hidden md:block w-full max-w-4xl mx-auto relative aspect-[16/9] select-none">
        
        {/* SVG Curved Connections Layer (with sketch filter) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none text-foreground/20 dark:text-foreground/15"
          viewBox="0 0 1000 562.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ filter: sketchFilter }}
        >
          {/* Arrowhead markers definition */}
          <defs>
            <marker
              id="arrow-left"
              viewBox="0 0 10 10"
              refX="1"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 10 0 L 0 5 L 10 10 z" fill="currentColor" className="text-foreground/30 dark:text-foreground/25" />
            </marker>
            <marker
              id="arrow-right"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-foreground/30 dark:text-foreground/25" />
            </marker>
          </defs>

          {/* Curvy connector lines between center and outer boxes */}
          {/* Top Left curve */}
          <path d="M 340 281 C 240 281, 140 250, 140 190" markerEnd="url(#arrow-left)" />
          {/* Top Right curve */}
          <path d="M 660 281 C 760 281, 860 250, 860 190" markerEnd="url(#arrow-right)" />
          {/* Bottom Left curve */}
          <path d="M 340 281 C 240 281, 140 312, 140 372" markerEnd="url(#arrow-left)" />
          {/* Bottom Right curve */}
          <path d="M 660 281 C 760 281, 860 312, 860 372" markerEnd="url(#arrow-right)" />
        </svg>

        {/* Center Card: Title & Icon (Subtly rotated for hand-sketched placement feel) */}
        <div className="absolute left-[34%] top-[38%] w-[32%] h-[24%] flex flex-col items-center justify-center p-3 text-center rounded-2xl bg-card/65 backdrop-blur-sm group hover:shadow-[0_0_20px_rgba(0,114,245,0.08)] transition-all duration-300 rotate-[-0.4deg]">
          {/* Custom double-sketched border */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-foreground/25 dark:text-foreground/20" style={{ filter: sketchFilter }}>
              <rect x="3" y="3" width="calc(100% - 6px)" height="calc(100% - 6px)" rx="14" fill="none" stroke="currentColor" strokeWidth="1.75" />
              <rect x="1" y="2.5" width="calc(100% - 2px)" height="calc(100% - 5px)" rx="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.65" />
            </svg>
          </div>
          <ElectronicBrainIcon className="w-10 h-10 mb-1" filter={sketchFilter} />
          <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-foreground font-heading z-10">
            AI Expertise & Capability Overview
          </h3>
        </div>

        {/* Top-Left: AI Strategy (Subtly rotated for organic sketch layout) */}
        <div className="absolute left-0 top-[2%] w-[28%] h-[34%] bg-amber-500/[0.003] rounded-2xl p-4 flex flex-col justify-between rotate-[0.3deg]">
          {/* Sketched border background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-amber-500/25" style={{ filter: sketchFilter }}>
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="1" width="calc(100% - 7px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </div>
          <div className="flex items-center gap-2.5 z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <RouteIcon size={18} />
            </div>
            <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide text-foreground font-heading">
              AI Strategy & Roadmaps
            </h4>
          </div>
          <ul className="list-disc pl-4 text-[11px] sm:text-xs leading-relaxed text-foreground/75 space-y-1.5 mt-auto z-10">
            <li>Roadmap planning</li>
            <li>ROI modeling</li>
            <li>Applied AI</li>
          </ul>
        </div>

        {/* Top-Right: Agentic Automation (Subtly rotated) */}
        <div className="absolute right-0 top-[2%] w-[28%] h-[34%] bg-indigo-500/[0.003] rounded-2xl p-4 flex flex-col justify-between rotate-[-0.3deg]">
          {/* Sketched border background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-indigo-500/25" style={{ filter: sketchFilter }}>
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="1" width="calc(100% - 7px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </div>
          <div className="flex items-center gap-2.5 z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <WorkflowIcon size={18} />
            </div>
            <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide text-foreground font-heading">
              Agentic Automation
            </h4>
          </div>
          <ul className="list-disc pl-4 text-[11px] sm:text-xs leading-relaxed text-foreground/75 space-y-1.5 mt-auto z-10">
            <li>Multi-agent coordination</li>
            <li>Autonomous workflows</li>
            <li>Tool & API integration</li>
          </ul>
        </div>

        {/* Bottom-Left: GenAI Engineering (Subtly rotated) */}
        <div className="absolute left-0 bottom-[2%] w-[28%] h-[34%] bg-sky-500/[0.003] rounded-2xl p-4 flex flex-col justify-between rotate-[-0.2deg]">
          {/* Sketched border background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-sky-500/25" style={{ filter: sketchFilter }}>
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="1" width="calc(100% - 7px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </div>
          <div className="flex items-center gap-2.5 z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <CpuIcon size={18} />
            </div>
            <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide text-foreground font-heading">
              GenAI Engineering
            </h4>
          </div>
          <ul className="list-disc pl-4 text-[11px] sm:text-xs leading-relaxed text-foreground/75 space-y-1.5 mt-auto z-10">
            <li>LLM APIs (Claude, GPT, Gemini)</li>
            <li>RAG & vector databases</li>
            <li>Production deployment</li>
          </ul>
        </div>

        {/* Bottom-Right: Private LLMs (Subtly rotated) */}
        <div className="absolute right-0 bottom-[2%] w-[28%] h-[34%] bg-emerald-500/[0.003] rounded-2xl p-4 flex flex-col justify-between rotate-[0.4deg]">
          {/* Sketched border background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-emerald-500/25" style={{ filter: sketchFilter }}>
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="1" width="calc(100% - 7px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            </svg>
          </div>
          <div className="flex items-center gap-2.5 z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <LockIcon size={18} />
            </div>
            <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide text-foreground font-heading">
              Local & Private LLMs
            </h4>
          </div>
          <ul className="list-disc pl-4 text-[11px] sm:text-xs leading-relaxed text-foreground/75 space-y-1.5 mt-auto z-10">
            <li>Ollama & local models</li>
            <li>Compliance & security</li>
            <li>Cost optimization</li>
          </ul>
        </div>
      </div>

      {/* 3. Capability Matrix: Digestible Summary Table */}
      <div className="w-full flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/45 font-heading">
          Capability Matrix
        </h4>
        <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.01] backdrop-blur-[2px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-foreground/[0.03] text-[10px] font-bold uppercase tracking-wider text-foreground/50 border-b border-foreground/10">
                  <th className="py-2.5 px-4 font-heading">Capability Area</th>
                  <th className="py-2.5 px-4 font-heading">Core Focus</th>
                  <th className="py-2.5 px-4 font-heading">Key Value / Tooling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5 text-[11px] sm:text-xs text-foreground/80">
                <tr className="hover:bg-foreground/[0.01] transition-colors">
                  <td className="py-2.5 px-4 font-medium">
                    <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                      AI Strategy
                    </span>
                  </td>
                  <td className="py-2.5 px-4">Roadmaps & Business Alignment</td>
                  <td className="py-2.5 px-4 text-foreground/70">Applied AI feasibility studies & ROI modeling</td>
                </tr>
                <tr className="hover:bg-foreground/[0.01] transition-colors">
                  <td className="py-2.5 px-4 font-medium">
                    <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                      Agentic Automation
                    </span>
                  </td>
                  <td className="py-2.5 px-4">Autonomous Workflows</td>
                  <td className="py-2.5 px-4 text-foreground/70">Multi-agent coordination & tool execution</td>
                </tr>
                <tr className="hover:bg-foreground/[0.01] transition-colors">
                  <td className="py-2.5 px-4 font-medium">
                    <span className="inline-flex items-center rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-600 dark:text-sky-400 ring-1 ring-inset ring-sky-500/20">
                      GenAI Engineering
                    </span>
                  </td>
                  <td className="py-2.5 px-4">Production-Grade Applications</td>
                  <td className="py-2.5 px-4 text-foreground/70">RAG, vector databases, LLM APIs (Claude, GPT)</td>
                </tr>
                <tr className="hover:bg-foreground/[0.01] transition-colors">
                  <td className="py-2.5 px-4 font-medium">
                    <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      Private LLMs
                    </span>
                  </td>
                  <td className="py-2.5 px-4">Data Privacy & Sovereignty</td>
                  <td className="py-2.5 px-4 text-foreground/70">Ollama local model hosting & cost control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
