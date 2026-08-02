"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, HeartHandshake, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
    "/hero/medical-outreach.webp", // CMRF Medical Mission Outreach, Ghana
    "/hero/surgery-hd.webp",        // Specialized Surgery Mission
    "/hero/surgery-care.webp",      // Surgical Care & Clinical Procedure
    "/hero/clean-water.webp",       // Clean Water Initiative & Community Health
    "/childerndoctor.jpg",          // Pediatric Medical Consultation
];

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef1 = useRef<HTMLDivElement>(null);
    const bgRef2 = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeLayer, setActiveLayer] = useState<1 | 2>(1);
    const [layer1Img, setLayer1Img] = useState<string>(HERO_IMAGES[0]);
    const [layer2Img, setLayer2Img] = useState<string>(HERO_IMAGES[1] || HERO_IMAGES[0]);
    const [particles, setParticles] = useState<Array<{ width: string, height: string, top: string, left: string, background: string }>>([]);

    const kenBurnsTlRef = useRef<gsap.core.Timeline | null>(null);
    const isTransitioningRef = useRef(false);

    // Initial particles setup
    useEffect(() => {
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

    // -------------------------------------------------------------------
    // Ken Burns Animation Logic (matching Gallery Fullscreen Viewer)
    // -------------------------------------------------------------------
    const startKenBurns = (targetEl: HTMLDivElement | null) => {
        if (!targetEl) return;
        if (kenBurnsTlRef.current) kenBurnsTlRef.current.kill();

        const zoomIn = Math.random() > 0.5;
        const startScale = zoomIn ? 1.05 : 1.25;
        const endScale = zoomIn ? 1.25 : 1.05;
        const xDir = (Math.random() - 0.5) * 30;
        const yDir = (Math.random() - 0.5) * 30;

        kenBurnsTlRef.current = gsap.timeline({ repeat: -1, yoyo: true });
        kenBurnsTlRef.current.fromTo(
            targetEl,
            { scale: startScale, x: -xDir, y: -yDir },
            {
                scale: endScale,
                x: xDir,
                y: yDir,
                duration: 9,
                ease: "sine.inOut",
            }
        );
    };

    // Transition to target slide index
    const goToSlide = (nextIndex: number) => {
        if (isTransitioningRef.current || nextIndex === currentIndex) return;
        isTransitioningRef.current = true;

        const nextImgUrl = HERO_IMAGES[nextIndex];
        const currentBg = activeLayer === 1 ? bgRef1.current : bgRef2.current;
        const nextBg = activeLayer === 1 ? bgRef2.current : bgRef1.current;

        if (activeLayer === 1) {
            setLayer2Img(nextImgUrl);
        } else {
            setLayer1Img(nextImgUrl);
        }

        // Wait brief frame for state update
        requestAnimationFrame(() => {
            if (!nextBg || !currentBg) return;

            // Prepare incoming layer
            gsap.set(nextBg, { opacity: 0, scale: 0.98, filter: "blur(12px)" });

            // Cross-fade timeline
            gsap.timeline({
                onComplete: () => {
                    setActiveLayer(activeLayer === 1 ? 2 : 1);
                    setCurrentIndex(nextIndex);
                    isTransitioningRef.current = false;
                    startKenBurns(nextBg);
                }
            })
            .to(currentBg, {
                opacity: 0,
                scale: 1.15,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power2.inOut",
            }, 0)
            .to(nextBg, {
                opacity: 1,
                scale: 1.05,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power2.out",
            }, 0.2);
        });
    };

    // Autoplay slideshow timer (6s per slide)
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIdx = (currentIndex + 1) % HERO_IMAGES.length;
            goToSlide(nextIdx);
        }, 6500);

        return () => clearInterval(interval);
    }, [currentIndex, activeLayer]);

    // Initial entrance animations
    useEffect(() => {
        const activeBg = activeLayer === 1 ? bgRef1.current : bgRef2.current;
        startKenBurns(activeBg);

        const ctx = gsap.context(() => {
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
                    "-=0.4"
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
    }, [particles]);

    return (
        <section
            ref={sectionRef}
            className="relative h-dvh w-full flex flex-col justify-end overflow-hidden"
        >
            {/* Dual Layer Cross-Fade Background Images */}
            <div
                ref={bgRef1}
                className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform transition-opacity duration-1000"
                style={{
                    backgroundImage: `url('${layer1Img}')`,
                    opacity: activeLayer === 1 ? 1 : 0,
                }}
            />
            <div
                ref={bgRef2}
                className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform transition-opacity duration-1000"
                style={{
                    backgroundImage: `url('${layer2Img}')`,
                    opacity: activeLayer === 2 ? 1 : 0,
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

                {/* Slide Indicator Dots & Scroll Indicator */}
                <div className="absolute bottom-8 right-8 md:right-12 flex items-end gap-6 z-20">
                    {/* Slideshow Progress Dots */}
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
                        {HERO_IMAGES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                                    currentIndex === idx
                                        ? "w-6 bg-[var(--color-clay)] shadow-[0_0_10px_rgba(204,88,51,0.5)]"
                                        : "w-2 bg-white/30 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>

                    <div
                        data-hero-scroll
                        className="hidden sm:flex flex-col items-center gap-2 text-[var(--color-cream)]/50"
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
            </div>
        </section>
    );
}
