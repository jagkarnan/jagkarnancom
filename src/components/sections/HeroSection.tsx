"use client";

import {
  ObfuscatedMailtoAnchor,
  ObfuscatedTelAnchor,
  ObfuscatedWhatsAppAnchor,
} from "@/components/contact/ObfuscatedContactAnchors";
import { resume } from "@/content/resume";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useState } from "react";
import {
  MailCheckIcon,
  LinkedinIcon,
  GithubIcon,
  YoutubeIcon,
  SmartphoneChargingIcon,
  MessageCircleIcon,
} from "lucide-animated";

export function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('✅ Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(`❌ ${data.error || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      setSubmitMessage('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <section className="py-16 md:py-24">
      {" "}
      <Container>
        {" "}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
          {" "}
          <div className="space-y-4">
            {" "}
            <div className="flex items-center gap-4">
              <img
                src="/profile-photo.jpg"
                alt="Jag Karnan"
                className="h-40 w-40 rounded-full border-2 border-foreground/20 object-cover ring-2 ring-foreground/5"
              />
              <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {resume.name}
              </h1>
            </div>{" "}
            <p className="text-base leading-snug text-foreground/80 md:text-lg">
              {" "}
              {resume.headline}{" "}
            </p>{" "}
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
              {" "}
              {resume.summary}{" "}
            </p>{" "}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {" "}
              <ObfuscatedMailtoAnchor className="flex items-center gap-2 rounded-full border border-foreground/12 bg-transparent px-4 py-2 text-sm text-foreground/85 no-underline transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.06] active:scale-[0.98] motion-reduce:active:scale-100">
                <MailCheckIcon size={16} />
                Email
              </ObfuscatedMailtoAnchor>
              {resume.links.map((l) => (
                <ExternalLink
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 rounded-full border border-foreground/12 bg-transparent px-4 py-2 text-sm text-foreground/85 no-underline transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.06] active:scale-[0.98] motion-reduce:active:scale-100"
                >
                  {l.label === "LinkedIn" && (
                    <LinkedinIcon size={16} />
                  )}
                  {l.label === "GitHub" && (
                    <GithubIcon size={16} />
                  )}
                  {l.label === "YouTube" && (
                    <YoutubeIcon size={16} />
                  )}
                  {l.label}
                </ExternalLink>
              ))}{" "}
              <div className="flex gap-3 items-center">
                <ObfuscatedTelAnchor className="flex items-center gap-2 whitespace-nowrap rounded-full border border-foreground/12 bg-transparent px-4 py-2 text-sm text-foreground/85 no-underline transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.06] active:scale-[0.98] motion-reduce:active:scale-100">
                  <SmartphoneChargingIcon size={16} />
                  Call
                </ObfuscatedTelAnchor>
                <ObfuscatedWhatsAppAnchor className="flex items-center gap-2 whitespace-nowrap rounded-full border border-foreground/12 bg-transparent px-4 py-2 text-sm text-foreground/85 no-underline transition-[background-color,border-color,transform] duration-200 ease-out hover:border-foreground/20 hover:bg-foreground/[0.06] active:scale-[0.98] motion-reduce:active:scale-100">
                  <MessageCircleIcon size={16} />
                  WhatsApp
                </ObfuscatedWhatsAppAnchor>
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <aside className="glass-card rounded-3xl p-6 md:p-7">
            {" "}
            <h2 className="text-sm font-semibold leading-tight tracking-tight text-foreground/85">
              {" "}
              Get in Touch{" "}
            </h2>{" "}
            <p className="mt-2 text-xs text-foreground/60">
              {" "}
              Let's discuss how AI can transform your business.{" "}
            </p>{" "}
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              {" "}
              <div>
                {" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/45 transition-[border-color,box-shadow] duration-200 ease-out focus:border-sky-500/45 focus:outline-none focus:ring-2 focus:ring-sky-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/45 transition-[border-color,box-shadow] duration-200 ease-out focus:border-sky-500/45 focus:outline-none focus:ring-2 focus:ring-sky-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <textarea
                  name="message"
                  placeholder="Tell me about your AI needs..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/45 transition-[border-color,box-shadow] duration-200 ease-out focus:border-sky-500/45 focus:outline-none focus:ring-2 focus:ring-sky-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />{" "}
              </div>{" "}
              <button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:active:scale-100"
              >
                {" "}
                {isSubmitting ? "Sending..." : "Send Message"}{" "}
              </button>{" "}
              {submitMessage && (
                <div className={`text-xs p-2 rounded-lg text-center ${
                  submitMessage.includes('✅') 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {" "}
                  {submitMessage}{" "}
                </div>
              )}{" "}
            </form>{" "}
          </aside>{" "}
        </div>{" "}
      </Container>{" "}
    </section>
  );
}
