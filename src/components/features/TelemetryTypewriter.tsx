"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "lucide-react";

const messages = [
    ">> 2,500+ patients served in Tamale outreach...",
    ">> Eye care: 1,800 treatments completed in 2024...",
    ">> Dental services: 360 procedures delivered...",
    ">> 2,180 individuals received counselling...",
    ">> 5 community boreholes installed and certified...",
    ">> Medical equipment donated to 12 rural clinics...",
    ">> 600+ communities reached across Ghana...",
    ">> Partnership active: Free clinic operating since 1991...",
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
        const timer = setTimeout(typeNextChar, charIndex === 0 ? 900 : 30);
        return () => clearTimeout(timer);
    }, [typeNextChar, charIndex]);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [lines, currentLine]);

    return (
        <div className="card-dark p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Terminal size={18} className="text-[var(--color-clay)]" />
                        <h3
                            className="text-lg font-bold text-white"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Telemetry Typewriter
                        </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                        <span
                            className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Live Feed
                        </span>
                    </div>
                </div>
                <p className="text-white/60 text-sm mb-5">
                    Real-time operational updates across mission network
                </p>
            </div>

            <div
                ref={feedRef}
                className="h-44 md:h-52 overflow-hidden rounded-2xl bg-black/60 p-4 border border-white/10 flex flex-col justify-end"
            >
                {lines.map((line, i) => (
                    <p
                        key={`${line}-${i}`}
                        className="text-white/40 text-xs leading-relaxed font-mono"
                    >
                        {line}
                    </p>
                ))}
                {currentLine && (
                    <p
                        className="text-[var(--color-cream)] text-xs leading-relaxed font-mono font-medium"
                    >
                        {currentLine}
                        <span className="inline-block w-2 h-3.5 bg-[var(--color-clay)] ml-0.5 align-middle animate-cursor" />
                    </p>
                )}
            </div>
        </div>
    );
}
