/**
 * Plain contact values for server-only use (PDF, API email delivery).
 * Do not import this module from client components — it would expose PII in the bundle.
 */
export const CONTACT_SENSITIVE = {
  email: "jag.karnan@gmail.com",
  /** E.164 without spaces for tel: and wa.me */
  telE164: "+6581888935",
  phoneDisplay: "+65 8188 8935",
  whatsAppDigits: "6581888935",
} as const;

export function getSensitiveContactLinks(): { label: string; href: string }[] {
  const { email, telE164, phoneDisplay, whatsAppDigits } = CONTACT_SENSITIVE;
  return [
    { label: "Email", href: `mailto:${email}` },
    { label: `Call ${phoneDisplay}`, href: `tel:${telE164.replace(/\s/g, "")}` },
    {
      label: `WhatsApp ${phoneDisplay}`,
      href: `https://wa.me/${whatsAppDigits}`,
    },
  ];
}
