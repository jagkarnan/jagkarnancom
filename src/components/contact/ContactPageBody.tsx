"use client";

import {
  ObfuscatedMailtoAnchor,
  ObfuscatedTelAnchor,
  ObfuscatedWhatsAppAnchor,
} from "@/components/contact/ObfuscatedContactAnchors";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { resume } from "@/content/resume";
import {
  GithubIcon,
  LinkedinIcon,
  MailCheckIcon,
  MessageCircleIcon,
  SmartphoneChargingIcon,
  YoutubeIcon,
} from "lucide-animated";

export const channelButtonClass =
  "editorial-button focus-ring inline-flex min-h-11 min-w-[2.75rem] items-center gap-2 rounded-md px-3 py-2 font-semibold transition-[background-color,border-color,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:active:scale-100 sm:px-4";

export function ContactChannels({ singleLine = false }: { singleLine?: boolean }) {
  const socialLinks = (
    <>
      {resume.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={channelButtonClass}
        >
          {l.label === "LinkedIn" && <LinkedinIcon size={16} />}
          {l.label === "GitHub" && <GithubIcon size={16} />}
          {l.label === "YouTube" && <YoutubeIcon size={16} />}
          <span>{l.label}</span>
        </a>
      ))}
    </>
  );

  const directLinks = (
    <>
      <ObfuscatedWhatsAppAnchor className={`${channelButtonClass} max-w-full min-w-0 break-all sm:break-normal sm:whitespace-nowrap`}>
        <MessageCircleIcon size={16} />
        <span>WhatsApp</span>
      </ObfuscatedWhatsAppAnchor>
      <ObfuscatedMailtoAnchor newTab className={channelButtonClass}>
        <MailCheckIcon size={16} />
        <span>Email</span>
      </ObfuscatedMailtoAnchor>
      <ObfuscatedTelAnchor newTab className={`${channelButtonClass} max-w-full min-w-0 break-all sm:break-normal sm:whitespace-nowrap`}>
        <SmartphoneChargingIcon size={16} />
        <span>Call</span>
      </ObfuscatedTelAnchor>
    </>
  );

  if (singleLine) {
    return (
      <div className="flex flex-wrap gap-2 sm:gap-3 text-sm text-foreground/80">
        {socialLinks}
        {directLinks}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-sm text-foreground/80">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {socialLinks}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-foreground/10 pt-4 sm:gap-3">
        {directLinks}
      </div>
    </div>
  );
}

export function ContactPageBody() {
  return (
    <Container>
      <div className="flex flex-col gap-8 md:gap-10">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase leading-tight tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]">
            Contact
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            Get in touch
          </h1>
          <p className="max-w-prose text-sm leading-relaxed text-foreground/75">
            Send a message below, or use LinkedIn, email, WhatsApp, or phone — whichever fits how you
            work.
          </p>
        </header>

        <section
          className="glass-card rounded-xl p-4 sm:p-6"
          aria-labelledby="contact-form-heading"
        >
          <h2
            id="contact-form-heading"
            className="text-xs font-semibold uppercase leading-tight tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]"
          >
            Send a message
          </h2>
          <ContactForm />
        </section>

        <section
          className="glass-card rounded-xl p-4 sm:p-6"
          aria-labelledby="contact-channels-heading"
        >
          <h2
            id="contact-channels-heading"
            className="text-xs font-semibold uppercase leading-tight tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]"
          >
            Other channels
          </h2>
          <div className="mt-4">
            <ContactChannels />
          </div>
        </section>
      </div>
    </Container>
  );
}
