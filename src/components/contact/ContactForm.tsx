"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

            // Reset success message after 6 seconds
            setTimeout(() => setStatus("idle"), 6000);
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label
                        className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all disabled:opacity-50"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all disabled:opacity-50"
                        placeholder="your@email.com"
                    />
                </div>
            </div>

            <div>
                <label
                    className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Subject
                </label>
                <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all disabled:opacity-50"
                    placeholder="What is this about?"
                />
            </div>

            <div>
                <label
                    className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Message
                </label>
                <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "submitting"}
                    maxLength={5000}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all resize-none disabled:opacity-50"
                    placeholder="Your message..."
                />
            </div>

            {/* Status messages */}
            {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl">
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    <span>Thank you! Your message has been sent. We&apos;ll be in touch.</span>
                </div>
            )}

            {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "submitting" ? (
                    <span className="btn-text flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                    </span>
                ) : (
                    <span className="btn-text">Send Message</span>
                )}
            </button>
        </form>
    );
}
