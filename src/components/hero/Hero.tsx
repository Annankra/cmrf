"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            tl.from("[data-hero-line]", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.08,
            })
                .from(
                    "[data-hero-cta]",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.1,
                    },
                    "-=0.4"
                )
                .from(
                    "[data-hero-scroll]",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-dvh w-full flex items-end overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format')`,
                }}
            />

            {/* Gradient Overlay — moss to black */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/70 to-[var(--color-moss)]/30" />

            {/* Content — pinned to bottom-left */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <div ref={headingRef} className="max-w-3xl">
                    {/* Subheading */}
                    <p
                        data-hero-line
                        className="text-[var(--color-cream)]/60 text-sm md:text-base uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        30+ Years · 600+ Communities · Free Healthcare
                    </p>

                    {/* Main Headline — Preset A pattern */}
                    <h1 className="mb-6">
                        <span
                            data-hero-line
                            className="block text-[var(--color-cream)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Compassion is the
                        </span>
                        <span
                            data-hero-line
                            className="block text-[var(--color-clay)] font-drama text-6xl md:text-8xl lg:text-[10rem] leading-none mt-1"
                        >
                            Medicine.
                        </span>
                    </h1>

                    {/* Sub-description */}
                    <p
                        data-hero-line
                        className="text-[var(--color-cream)]/70 text-base md:text-lg max-w-xl leading-relaxed mb-8"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        CMRF mobilizes Christians and resources worldwide to bring free
                        medical care, hope, and God&apos;s love to underserved communities
                        across Ghana and Africa.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                        <Link href="/get-involved" className="btn btn-primary" data-hero-cta>
                            <span className="btn-text">Support Our Mission</span>
                        </Link>
                        <Link href="/about" className="btn btn-ghost" data-hero-cta>
                            <span className="btn-text">Our Story</span>
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    data-hero-scroll
                    className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-[var(--color-cream)]/40"
                >
                    <span
                        className="text-xs uppercase tracking-widest"
                        style={{ fontFamily: "var(--font-mono)", writingMode: "vertical-rl" }}
                    >
                        Scroll
                    </span>
                    <ArrowDown size={16} className="animate-float" />
                </div>
            </div>
        </section>
    );
}
