"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

interface NewsletterFormProps {
    /** "newsletter" for homepage, "prayer" for prayer network */
    source?: "newsletter" | "prayer";
    /** Visual variant — "dark" uses cream/translucent styling */
    variant?: "light" | "dark";
}

export default function NewsletterForm({
    source = "newsletter",
    variant = "dark",
}: NewsletterFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorMsg(
                    data.error ?? "Something went wrong. Please try again."
                );
                return;
            }

            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 6000);
        } catch {
            setStatus("error");
            setErrorMsg(
                "Network error. Please check your connection and try again."
            );
        }
    }

    const isDark = variant === "dark";

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                    placeholder="Your email address"
                    className={`w-full px-5 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${isDark
                            ? "bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/10 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/30 focus:ring-[var(--color-clay)]/50"
                            : "bg-[var(--color-cream)] border border-[var(--color-moss)]/10 text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:ring-[var(--color-clay)]/30"
                        }`}
                    style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {status === "submitting" ? (
                        <span className="btn-text flex items-center gap-2">
                            <Loader2 size={14} className="animate-spin" />
                        </span>
                    ) : (
                        <span className="btn-text">
                            {source === "prayer" ? "Join" : "Subscribe"}
                        </span>
                    )}
                </button>
            </form>

            {/* Status messages */}
            {status === "success" && (
                <div
                    className={`flex items-center justify-center gap-2 text-sm mt-3 px-4 py-2.5 rounded-xl mx-auto max-w-md ${isDark
                            ? "text-emerald-300 bg-emerald-900/30 border border-emerald-700/30"
                            : "text-emerald-700 bg-emerald-50 border border-emerald-200"
                        }`}
                >
                    <CheckCircle2 size={14} className="flex-shrink-0" />
                    <span>
                        {source === "prayer"
                            ? "Welcome to the prayer network!"
                            : "You're subscribed! Watch your inbox."}
                    </span>
                </div>
            )}

            {status === "error" && (
                <div
                    className={`flex items-center justify-center gap-2 text-sm mt-3 px-4 py-2.5 rounded-xl mx-auto max-w-md ${isDark
                            ? "text-red-300 bg-red-900/30 border border-red-700/30"
                            : "text-red-700 bg-red-50 border border-red-200"
                        }`}
                >
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}
        </div>
    );
}
