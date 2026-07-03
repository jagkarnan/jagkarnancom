"use client";

import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  MailCheckIcon,
  YoutubeIcon,
} from "lucide-animated";
import { ObfuscatedMailtoAnchor } from "@/components/contact/ObfuscatedContactAnchors";
import { resume } from "@/content/resume";
import { MobileMenu } from "@/components/site/MobileMenu";
import { ResumeDownloadMenu } from "@/components/site/ResumeDownloadMenu";

const iconLinkClass =
  "editorial-icon-link focus-ring inline-flex min-w-[3.25rem] flex-col items-center gap-1 text-[11px] font-semibold leading-tight text-foreground no-underline transition-[color,transform] duration-200 ease-out hover:text-accent active:scale-[0.97] motion-reduce:active:scale-100";

function BrandMark() {
  return (
    <span className="editorial-brand-mark" aria-label={resume.name}>
      <span>jag</span>
      <span>karnan</span>
    </span>
  );
}

export function Header() {
  const linkedIn = resume.links.find((link) => link.label === "LinkedIn");
  const github = resume.links.find((link) => link.label === "GitHub");
  const youtube = resume.links.find((link) => link.label === "YouTube");

  return (
    <header className="site-header editorial-header sticky top-0 z-50 w-full print:hidden">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="focus-ring inline-flex shrink-0 rounded-md no-underline"
          aria-label={`${resume.name} home`}
        >
          <BrandMark />
        </Link>

        <nav
          className="flex min-w-0 items-center justify-end gap-3 overflow-visible sm:gap-5"
          aria-label="Primary actions"
        >
          <div className="hidden items-center gap-3 sm:gap-5 md:flex">
            <ObfuscatedMailtoAnchor className={iconLinkClass}>
              <MailCheckIcon size={24} />
              <span>Email</span>
            </ObfuscatedMailtoAnchor>
            {linkedIn ? (
              <a
                href={linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <LinkedinIcon size={24} />
                <span>LinkedIn</span>
              </a>
            ) : null}
            {github ? (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <GithubIcon size={24} />
                <span>GitHub</span>
              </a>
            ) : null}
            {youtube ? (
              <a
                href={youtube.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
              >
                <YoutubeIcon size={24} />
                <span>YouTube</span>
              </a>
            ) : null}
          </div>
          <ResumeDownloadMenu />
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
