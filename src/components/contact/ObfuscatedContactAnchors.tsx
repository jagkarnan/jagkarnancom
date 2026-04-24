"use client";

import type { ReactNode } from "react";
import { useSingletonDecodedContact } from "@/hooks/useSingletonDecodedContact";

type AnchorProps = {
  className: string;
  children: ReactNode;
  /** Opens in a new tab (e.g. Contact section). */
  newTab?: boolean;
};

function blockUntilReady(e: React.MouseEvent, ready: boolean) {
  if (!ready) e.preventDefault();
}

/** mailto — static HTML uses href="#" until decoded. */
export function ObfuscatedMailtoAnchor({
  className,
  children,
  newTab,
}: AnchorProps) {
  const d = useSingletonDecodedContact();
  const ready = Boolean(d?.email);
  return (
    <a
      href={ready ? `mailto:${d!.email}` : "#"}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      onClick={(e) => blockUntilReady(e, ready)}
      aria-busy={!ready}
      aria-label={ready ? undefined : "Email, loading"}
    >
      {children}
    </a>
  );
}

export function ObfuscatedTelAnchor({
  className,
  children,
  newTab,
}: AnchorProps) {
  const d = useSingletonDecodedContact();
  const ready = Boolean(d?.telE164);
  const tel = d?.telE164.replace(/\s/g, "") ?? "";
  return (
    <a
      href={ready ? `tel:${tel}` : "#"}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      onClick={(e) => blockUntilReady(e, ready)}
      aria-busy={!ready}
      aria-label={ready ? undefined : "Phone, loading"}
    >
      {children}
    </a>
  );
}

export function ObfuscatedWhatsAppAnchor({ className, children }: AnchorProps) {
  const d = useSingletonDecodedContact();
  const ready = Boolean(d?.whatsAppId);
  return (
    <a
      href={ready ? `https://wa.me/${d!.whatsAppId}` : "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => blockUntilReady(e, ready)}
      aria-busy={!ready}
      aria-label={ready ? undefined : "WhatsApp, loading"}
    >
      {children}
    </a>
  );
}

/** Résumé / print page: same pattern as public links (`Label: href`). */
export function ObfuscatedResumeEmailRow({ className }: { className: string }) {
  const d = useSingletonDecodedContact();
  const href = d ? `mailto:${d.email}` : null;
  return (
    <a
      href={href ?? "#"}
      className={className}
      onClick={(e) => !href && e.preventDefault()}
    >
      <span className="font-medium">Email:</span> {href ?? "…"}
    </a>
  );
}

export function ObfuscatedResumeTelRow({ className }: { className: string }) {
  const d = useSingletonDecodedContact();
  const href = d ? `tel:${d.telE164.replace(/\s/g, "")}` : null;
  return (
    <a
      href={href ?? "#"}
      className={className}
      onClick={(e) => !href && e.preventDefault()}
    >
      <span className="font-medium">Call:</span> {href ?? "…"}
    </a>
  );
}

export function ObfuscatedResumeWaRow({ className }: { className: string }) {
  const d = useSingletonDecodedContact();
  const href = d ? `https://wa.me/${d.whatsAppId}` : null;
  return (
    <a
      href={href ?? "#"}
      className={className}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={(e) => !href && e.preventDefault()}
    >
      <span className="font-medium">WhatsApp:</span> {href ?? "…"}
    </a>
  );
}
