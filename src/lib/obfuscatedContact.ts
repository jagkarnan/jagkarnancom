/**
 * Base64-encoded contact strings for client-side decode only.
 * Keeps mailto:/tel:/wa.me out of static HTML until after hydration.
 *
 * Must stay in sync with `contactSensitive.ts` (same email, tel E.164, WA id).
 */
const B64_EMAIL = "amFnLmthcm5hbkBnbWFpbC5jb20=";
const B64_TEL = "KzY1ODE4ODg5MzU=";
const B64_WA = "NjU4MTg4ODkzNQ==";

export type DecodedContact = {
  email: string;
  telE164: string;
  whatsAppId: string;
};

export function decodeObfuscatedContact(): DecodedContact | null {
  if (typeof atob !== "function") return null;
  try {
    return {
      email: atob(B64_EMAIL),
      telE164: atob(B64_TEL),
      whatsAppId: atob(B64_WA),
    };
  } catch {
    return null;
  }
}
