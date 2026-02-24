"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const messages = [
    ">> 2,500 patients served in Tamale outreach...",
    ">> Eye care: 1,800 treatments completed in 2024...",
    ">> Dental services: 360 procedures delivered...",
    ">> 2,180 individuals received counselling...",
    ">> 5 community boreholes installed...",
    ">> Medical equipment donated to 12 clinics...",
    ">> 700+ communities reached across Ghana...",
    ">> Partnership established with Joy FM Easter Kitchen...",
];

export function TelemetryTypewriter() {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const feedRef = useRef<HTMLDivElement>(null);

    const typeNextChar = useCallback(() => {
        const fullMessage = messages[messageIndex];

        if (charIndex < fullMessage.length) {
            setCurrentLine(fullMessage.substring(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
        } else {
            // Line complete — push to history
            setLines((prev) => [...prev.slice(-4), fullMessage]);
            setCurrentLine("");
            setCharIndex(0);
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }
    }, [messageIndex, charIndex]);

    useEffect(() => {
        const timer = setTimeout(typeNextChar, charIndex === 0 ? 800 : 35);
        return () => clearTimeout(timer);
    }, [typeNextChar, charIndex]);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [lines, currentLine]);

    return (
        <div className="card card-dark p-6 md:p-8 h-full">
            <div className="flex items-center gap-2 mb-2">
                <h3
                    className="text-lg font-bold text-[var(--color-cream)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Impact Feed
                </h3>
                <div className="flex items-center gap-1.5 ml-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <span
                        className="text-xs text-emerald-400"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Live
                    </span>
                </div>
            </div>
            <p className="text-[var(--color-cream)]/40 text-sm mb-5">
                Real-time impact across our mission network
            </p>
            <div
                ref={feedRef}
                className="h-40 md:h-48 overflow-hidden rounded-xl bg-[#111]/60 p-4 border border-[var(--color-cream)]/5"
            >
                {lines.map((line, i) => (
                    <p
                        key={`${line}-${i}`}
                        className="text-[var(--color-cream)]/50 text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {line}
                    </p>
                ))}
                {currentLine && (
                    <p
                        className="text-[var(--color-cream)] text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {currentLine}
                        <span className="inline-block w-2 h-3.5 bg-[var(--color-clay)] ml-0.5 align-middle animate-cursor" />
                    </p>
                )}
            </div>
        </div>
    );
}
