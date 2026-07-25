"use client";

import { useEffect, useRef, useState } from "react";
import { Stethoscope, Eye, Activity, HeartPulse } from "lucide-react";
import gsap from "gsap";

const cards = [
    {
        label: "General Medicine",
        stat: "5,800+",
        description: "Primary healthcare, surgical consultations, and treatments delivered for free.",
        icon: Stethoscope,
    },
    {
        label: "Eye Care Missions",
        stat: "1,800+",
        description: "Optical exams, surgeries, and vision corrective care across rural districts.",
        icon: Eye,
    },
    {
        label: "Dental Outreach",
        stat: "360+",
        description: "Dental procedures and oral health care provided directly in communities.",
        icon: HeartPulse,
    },
];

export function DiagnosticShuffler() {
    const [order, setOrder] = useState([0, 1, 2]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder((prev) => {
                const next = [...prev];
                const last = next.pop()!;
                next.unshift(last);
                return next;
            });
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="card-dark p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Activity size={18} className="text-[var(--color-clay)]" />
                    <h3
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Diagnostic Shuffler
                    </h3>
                </div>
                <span
                    className="text-[10px] uppercase tracking-widest text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    Auto-Queue
                </span>
            </div>
            <p className="text-white/60 text-sm mb-6">
                Active clinical specialties delivered across outreach sites
            </p>

            <div className="relative h-52 md:h-60 mt-2">
                {order.map((cardIndex, stackIndex) => {
                    const CardIcon = cards[cardIndex].icon;
                    return (
                        <div
                            key={cards[cardIndex].label}
                            className="absolute inset-x-0 mx-auto w-full"
                            style={{
                                zIndex: 3 - stackIndex,
                                transform: `translateY(${stackIndex * 18}px) scale(${1 - stackIndex * 0.05})`,
                                opacity: 1 - stackIndex * 0.22,
                                transition:
                                    "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.65s ease",
                            }}
                        >
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-5 shadow-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-[var(--color-clay)]/20 text-[var(--color-clay)]">
                                            <CardIcon size={18} />
                                        </div>
                                        <span
                                            className="text-xs font-semibold uppercase tracking-wider text-white"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {cards[cardIndex].label}
                                        </span>
                                    </div>
                                    <span
                                        className="text-2xl font-bold text-[var(--color-clay)]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {cards[cardIndex].stat}
                                    </span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    {cards[cardIndex].description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
