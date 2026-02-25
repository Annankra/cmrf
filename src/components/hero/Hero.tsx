"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    const [particles, setParticles] = useState<Array<{ width: string, height: string, top: string, left: string, background: string }>>([]);

    // Generate random particles only on the client
    useEffect(() => {
        const generatedParticles = Array.from({ length: 8 }).map((_, i) => ({
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
            top: `${15 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            background: i % 2 === 0
                ? "rgba(204, 88, 51, 0.15)"
                : "rgba(242, 240, 233, 0.08)",
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ─── Ken Burns zoom ───
            if (bgRef.current) {
                gsap.fromTo(
                    bgRef.current,
                    { scale: 1.0 },
                    {
                        scale: 1.15,
                        duration: 20,
                        ease: "none",
                        repeat: -1,
                        yoyo: true,
                    }
                );
            }

            // ─── Parallax on scroll ───
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 25,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // ─── Staggered text reveal ───
            const tl = gsap.timeline({ delay: 0.4 });

            tl.from("[data-hero-line]", {
                y: 50,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.1,
            })
                .from(
                    "[data-hero-cta]",
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.8,
                        ease: "back.out(1.4)",
                        stagger: 0.12,
                    },
                    "-=0.5"
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

            // ─── Floating particles ───
            if (particlesRef.current && particlesRef.current.children.length > 0) {
                const dots = particlesRef.current.children;
                gsap.fromTo(
                    dots,
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.out",
                        stagger: 0.15,
                        delay: 0.8,
                    }
                );
                Array.from(dots).forEach((dot, i) => {
                    gsap.to(dot, {
                        y: `random(-40, 40)`,
                        x: `random(-20, 20)`,
                        duration: `random(4, 8)`,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: i * 0.3,
                    });
                });
            }

            // ─── Gradient overlay subtle pulse ───
            gsap.to("[data-hero-gradient]", {
                opacity: 0.85,
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [particles]);

    return (
        <section
            ref={sectionRef}
            className="relative h-dvh w-full flex items-end overflow-hidden"
        >
            {/* Background Image */}
            <div
                ref={bgRef}
                className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format')`,
                }}
            />

            {/* Gradient Overlay */}
            <div
                data-hero-gradient
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/70 to-[var(--color-moss)]/30"
            />

            {/* Floating Particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            ...style,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <div className="max-w-3xl">
                    <p
                        data-hero-line
                        className="text-[var(--color-cream)]/60 text-sm md:text-base uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        30+ Years · 600+ Communities · Free Healthcare
                    </p>

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

                    <p
                        data-hero-line
                        className="text-[var(--color-cream)]/70 text-base md:text-lg max-w-xl leading-relaxed mb-8"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        CMRF mobilizes Christians and resources worldwide to bring free
                        medical care, hope, and God's love to underserved communities
                        across Ghana and Africa.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
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
