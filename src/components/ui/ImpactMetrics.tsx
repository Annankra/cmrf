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
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!trigger) return;

        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                setCurrent(Math.round(obj.val));
            },
        });
    }, [trigger, value]);

    return (
        <span ref={ref}>
            {current.toLocaleString()}
            {suffix}
        </span>
    );
}

export function ImpactMetrics() {
    const sectionRef = useRef<HTMLElement>(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => setTriggered(true),
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section bg-[var(--color-moss)]"
        >
            <div className="container-main px-6 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                            <div
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-cream)] mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                <AnimatedNumber
                                    value={metric.value}
                                    suffix={metric.suffix}
                                    trigger={triggered}
                                />
                            </div>
                            <p
                                className="text-[var(--color-cream)]/50 text-xs md:text-sm uppercase tracking-widest"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
