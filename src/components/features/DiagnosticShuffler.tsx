"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const cards = [
    {
        label: "General Consultations",
        stat: "5,800+",
        description: "Free medical consultations providing primary healthcare",
    },
    {
        label: "Eye Care Services",
        stat: "1,800+",
        description: "Optical examinations and treatments for underserved communities",
    },
    {
        label: "Dental Treatments",
        stat: "360+",
        description: "Dental care procedures delivered across mission outreaches",
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
        }, 3000);
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
        <div ref={containerRef} className="card p-6 md:p-8 h-full">
            <h3
                className="text-lg font-bold text-[var(--color-moss)] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                Medical Outreach
            </h3>
            <p className="text-[var(--color-muted)] text-sm mb-6">
                Core services delivered across 600+ communities
            </p>
            <div className="relative h-48 md:h-56">
                {order.map((cardIndex, stackIndex) => (
                    <div
                        key={cards[cardIndex].label}
                        className="absolute inset-x-0 mx-auto w-full"
                        style={{
                            zIndex: 3 - stackIndex,
                            transform: `translateY(${stackIndex * 16}px) scale(${1 - stackIndex * 0.04})`,
                            opacity: 1 - stackIndex * 0.2,
                            transition:
                                "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease",
                        }}
                    >
                        <div className="bg-[var(--color-cream)] rounded-2xl border border-[var(--color-moss)]/10 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className="text-xs uppercase tracking-wider text-[var(--color-muted)]"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {cards[cardIndex].label}
                                </span>
                                <span
                                    className="text-xl font-bold text-[var(--color-clay)]"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {cards[cardIndex].stat}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--color-charcoal)]/70">
                                {cards[cardIndex].description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
