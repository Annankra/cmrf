"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { label: "Years of Service", value: 30, suffix: "+" },
    { label: "Communities Reached", value: 600, suffix: "+" },
    { label: "Patients Served (2024)", value: 5800, suffix: "+" },
    { label: "Countries Active", value: 6, suffix: "" },
];

function AnimatedNumber({
    value,
    suffix,
    trigger,
}: {
    value: number;
    suffix: string;
    trigger: boolean;
}) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
                setCurrent(Math.round(obj.val));
            },
        });
    }, [trigger, value]);

    return (
        <span>
            {current.toLocaleString()}
            {suffix}
        </span>
    );
}

export function ImpactMetrics() {
    const sectionRef = useRef<HTMLElement>(null);
    const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => setTriggered(true),
            });

            // Staggered bounce entrance for each metric block
            metricRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    scale: 0.85,
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section bg-transparent border-y border-white/5 py-24 overflow-hidden"
        >
            <div className="container-main px-6 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {metrics.map((metric, i) => (
                        <div
                            key={metric.label}
                            ref={(el) => { metricRefs.current[i] = el; }}
                            className="text-center"
                        >
                            <div
                                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                <AnimatedNumber
                                    value={metric.value}
                                    suffix={metric.suffix}
                                    trigger={triggered}
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-clay)] animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />
                                <p
                                    className="text-[var(--color-clay)] text-xs md:text-sm uppercase tracking-widest font-semibold"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {metric.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
