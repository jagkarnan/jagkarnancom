import type { Metadata } from "next";
import { ContactPageBody } from "@/components/contact/ContactPageBody";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jag Karnan — send a message, or reach via LinkedIn, email, WhatsApp, or phone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-w-0 overflow-x-hidden pb-12 md:pb-14" aria-label="Contact">
      <ContactPageBody />
    </main>
  );
}
