"use client";

import { useState, type FormEvent } from "react";

const FORM_ENDPOINT = "https://forms.kennethjackson.tech/submit";
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-lg border border-border-subtle bg-surface-primary font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/50 focus:outline-none focus:border-accent transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      site_id: "9h3d",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || "",
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      honeypot: (form.elements.namedItem("_hp") as HTMLInputElement)?.value || "",
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send message. Please email us directly at info@9h3d.com.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <p className="font-heading text-[22px] font-bold text-fg-primary mb-2">
          Message Sent!
        </p>
        <p className="font-body text-[15px] text-fg-secondary mb-6">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-body text-[14px] text-accent underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          placeholder="Name *"
          className={INPUT_CLASS}
        />
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="Email *"
          className={INPUT_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input
          type="tel"
          name="phone"
          maxLength={20}
          placeholder="Phone"
          className={INPUT_CLASS}
        />
        <input
          type="text"
          name="subject"
          maxLength={200}
          placeholder="Subject"
          className={INPUT_CLASS}
        />
      </div>

      <textarea
        name="message"
        required
        maxLength={5000}
        placeholder="Message *"
        rows={6}
        className={`${INPUT_CLASS} resize-none`}
      />

      {status === "error" && (
        <p className="font-body text-[14px] text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start bg-accent text-white font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:bg-accent-secondary transition-colors"
        style={{ opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
