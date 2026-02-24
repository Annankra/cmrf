"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    stagger?: number;
    threshold?: string;
    className?: string;
}

const animationConfigs: Record<AnimationType, gsap.TweenVars> = {
    "fade-up": { y: 60, opacity: 0 },
    "fade-left": { x: -60, opacity: 0 },
    "fade-right": { x: 60, opacity: 0 },
    "scale-in": { scale: 0.88, opacity: 0 },
    "blur-in": { opacity: 0, filter: "blur(12px)" },
};

export function ScrollReveal({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 0.9,
    stagger = 0,
    threshold = "top 88%",
    className = "",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = stagger > 0 ? el.children : el;
        const fromVars = animationConfigs[animation];

        const ctx = gsap.context(() => {
            gsap.from(targets, {
                ...fromVars,
                duration,
                delay,
                ease: "power3.out",
                stagger: stagger > 0 ? stagger : undefined,
                scrollTrigger: {
                    trigger: el,
                    start: threshold,
                    once: true,
                },
                clearProps: animation === "blur-in" ? "filter" : undefined,
            });
        }, el);

        return () => ctx.revert();
    }, [animation, delay, duration, stagger, threshold]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
