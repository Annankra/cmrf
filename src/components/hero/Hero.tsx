"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, HeartHandshake, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format", // Kids smiling
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1920&q=80&auto=format", // Medical outreach
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80&auto=format", // Healthcare professional
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80&auto=format", // Medical care
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1920&q=80&auto=format", // Doctor and child
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80&auto=format"  // Hands holding
];

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    const [bgImage, setBgImage] = useState<string>(HERO_IMAGES[0]);
    const [particles, setParticles] = useState<Array<{ width: string, height: string, top: string, left: string, background: string }>>([]);

    useEffect(() => {
        const randomImageIndex = Math.floor(Math.random() * HERO_IMAGES.length);
        setBgImage(HERO_IMAGES[randomImageIndex]);

        const generatedParticles = Array.from({ length: 10 }).map((_, i) => ({
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
            top: `${15 + Math.random() * 65}%`,
            left: `${10 + Math.random() * 80}%`,
            background: i % 2 === 0
                ? "rgba(204, 88, 51, 0.2)"
                : "rgba(242, 240, 233, 0.12)",
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ken Burns zoom effect
            if (bgRef.current) {
                gsap.fromTo(
                    bgRef.current,
                    { scale: 1.0 },
                    {
                        scale: 1.15,
                        duration: 22,
                        ease: "none",
                        repeat: -1,
                        yoyo: true,
                    }
                );

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

            // Staggered text reveal
            const tl = gsap.timeline({ delay: 0.3 });

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

            // Floating particles
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
        }, sectionRef);

        return () => ctx.revert();
    }, [particles, bgImage]);

    return (
        <section
            ref={sectionRef}
            className="relative h-dvh w-full flex flex-col justify-end overflow-hidden"
        >
            {/* Background Image */}
            <div
                ref={bgRef}
                className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
                style={{
                    backgroundImage: `url('${bgImage}')`,
                }}
            />

            {/* Gradient Overlay */}
            <div
                data-hero-gradient
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/70 via-transparent to-transparent pointer-events-none" />

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
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-16 md:pb-24">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div
                        data-hero-line
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6"
                    >
                        <Sparkles size={14} className="text-[var(--color-clay)]" />
                        <span
                            className="text-xs uppercase tracking-[0.2em] text-[var(--color-cream)] font-medium"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Est. 1991 · 600+ Communities Served · Free Healthcare
                        </span>
                    </div>

                    <h1 className="mb-6">
                        <span
                            data-hero-line
                            className="block text-[var(--color-cream)] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
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
                        className="text-[var(--color-cream)]/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        CMRF mobilizes Christians and resources worldwide to bring free
                        medical care, hope, and God's love to underserved communities
                        across Ghana and Africa.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/get-involved" className="btn btn-primary" data-hero-cta>
                            <HeartHandshake size={18} />
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
                    className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-[var(--color-cream)]/50"
                >
                    <span
                        className="text-xs uppercase tracking-widest font-mono"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        Scroll
                    </span>
                    <ArrowDown size={16} className="animate-float" />
                </div>
            </div>
        </section>
    );
}
