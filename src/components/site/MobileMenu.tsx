"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  MailCheckIcon,
  MessageCircleIcon,
  SmartphoneChargingIcon,
  YoutubeIcon,
} from "lucide-animated";
import {
  ObfuscatedMailtoAnchor,
  ObfuscatedTelAnchor,
  ObfuscatedWhatsAppAnchor,
} from "@/components/contact/ObfuscatedContactAnchors";
import { resume } from "@/content/resume";
import { COMPETENCIES_ITEMS } from "@/components/site/CompetenciesNav";
import { EXPERIENCE_ITEMS } from "@/components/site/ExperienceNav";

const WHATSAPP_PREFILLED_MESSAGE =
  "Hi Jag, I am contacting through your jagkarnan.com websit. I would like to ...";

const EXTRA_SECTIONS = [
  { href: "/#milestones", id: "milestones", label: "Major Milestones" },
] as const;

const SECTION_ITEMS = [
  ...COMPETENCIES_ITEMS,
  ...EXPERIENCE_ITEMS,
  ...EXTRA_SECTIONS,
] as const;

function MenuIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

const triggerClass =
  "editorial-mobile-menu-trigger focus-ring inline-flex h-full min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-semibold text-[#111111] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[#e4efe6] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:min-h-12 sm:px-3.5";

const menuItemClass =
  "focus-ring flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-[#111111] transition-colors hover:bg-[#e4efe6] active:bg-[#d8e8dc]";

const iconClass = "shrink-0 text-[#315c3f]";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId().replace(/:/g, "");
  const linkedIn = resume.links.find((link) => link.label === "LinkedIn");
  const github = resume.links.find((link) => link.label === "GitHub");
  const youtube = resume.links.find((link) => link.label === "YouTube");

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

  return (
    <div
      ref={rootRef}
      className="relative inline-flex shrink-0 self-stretch items-center md:hidden"
    >
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <MenuIcon />
        <span className="hidden sm:inline">Menu</span>
      </button>
      {open ? (
        <div
          id={panelId}
          role="menu"
          aria-label="Site menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[100] flex max-h-[min(85vh,32rem)] w-[min(20rem,calc(100vw-2rem))] flex-col gap-1 overflow-y-auto rounded-lg border border-[#d7ddd5] bg-white p-2 shadow-[0_18px_42px_rgba(17,17,17,0.14)]"
        >
          <p
            className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5c5f5c]"
            role="presentation"
          >
            Get in touch
          </p>
          {linkedIn ? (
            <a
              role="menuitem"
              href={linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={menuItemClass}
              onClick={close}
            >
              <LinkedinIcon size={18} className={iconClass} />
              LinkedIn
            </a>
          ) : null}
          {github ? (
            <a
              role="menuitem"
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className={menuItemClass}
              onClick={close}
            >
              <GithubIcon size={18} className={iconClass} />
              GitHub
            </a>
          ) : null}
          {youtube ? (
            <a
              role="menuitem"
              href={youtube.href}
              target="_blank"
              rel="noopener noreferrer"
              className={menuItemClass}
              onClick={close}
            >
              <YoutubeIcon size={18} className={iconClass} />
              YouTube
            </a>
          ) : null}
          <ObfuscatedMailtoAnchor className={menuItemClass}>
            <MailCheckIcon size={18} className={iconClass} />
            Email
          </ObfuscatedMailtoAnchor>
          <ObfuscatedTelAnchor className={menuItemClass}>
            <SmartphoneChargingIcon size={18} className={iconClass} />
            Call
          </ObfuscatedTelAnchor>
          <ObfuscatedWhatsAppAnchor
            className={menuItemClass}
            text={WHATSAPP_PREFILLED_MESSAGE}
          >
            <MessageCircleIcon size={18} className={iconClass} />
            WhatsApp
          </ObfuscatedWhatsAppAnchor>

          <div
            className="my-1 border-t border-[#e5e5dd]"
            role="separator"
            aria-hidden
          />

          <p
            className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5c5f5c]"
            role="presentation"
          >
            Sections
          </p>
          {SECTION_ITEMS.map((item) => (
            <Link
              key={item.id}
              role="menuitem"
              href={item.href}
              className={menuItemClass}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
