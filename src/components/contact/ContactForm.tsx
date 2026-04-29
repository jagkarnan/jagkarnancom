"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/45 transition-[border-color,box-shadow] duration-200 ease-out focus:border-[hsl(212_100%_48%_/_0.55)] focus:outline-none focus:ring-2 focus:ring-[hsl(212_100%_48%_/_0.28)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(
          "Message sent successfully — I'll get back to you soon.",
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(data.error ?? "Failed to send message. Please try again.");
      }
    } catch {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const success = submitMessage.startsWith("Message sent");

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground/85">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Your name"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground/85">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="you@company.com"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground/85">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Tell me about your goals or project…"
          required
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring w-full rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:active:scale-100"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      {submitMessage ? (
        <div
          role="status"
          className={`rounded-lg border px-3 py-2 text-center text-xs ${
            success
              ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/25 bg-red-500/10 text-red-300"
          }`}
        >
          {submitMessage}
        </div>
      ) : null}
    </form>
  );
}
