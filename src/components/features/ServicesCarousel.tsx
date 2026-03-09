"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface ServiceSlide {
    id: string;
    title: string;
    description: string;
    image: string;
}

const services: ServiceSlide[] = [
    {
        id: "medical",
        title: "Free Medical Care",
        description:
            "Consultation and treatment across medical, surgical, dental, and optical specialties to unreached communities.",
        image:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80&auto=format",
    },
    {
        id: "water",
        title: "Potable Water",
        description:
            "Installing community boreholes and advanced filtration systems to eradicate waterborne diseases.",
        image:
            "/potablewater.png",
    },
    {
        id: "health-infra",
        title: "Health Infrastructure",
        description:
            "Resourcing struggling health institutions with essential medical equipment, logistics, and consumables.",
        image:
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1920&q=80&auto=format",
    },
    {
        id: "education",
        title: "Educational Support",
        description:
            "Providing critical educational materials, learning tools, and resources to underserved and needy schools.",
        image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80&auto=format",
    },
    {
        id: "scholarships",
        title: "Scholarships",
        description:
            "Removing financial barriers by providing full scholarships for deserving and brilliant students.",
        image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80&auto=format",
    },
    {
        id: "economic",
        title: "Economic Empowerment",
        description:
            "Sustainable poverty alleviation through drip irrigation, livestock model projects, and micro-loan initiatives.",
        image:
            "https://images.unsplash.com/photo-1559884743-74a57598c6c7?w=1920&q=80&auto=format",
    },
    {
        id: "leadership",
        title: "Leadership Development",
        description:
            "Identifying, mentoring, and developing the next generation of ethical and transformative leaders.",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&auto=format",
    },
];

const AUTOPLAY_DELAY = 6000;

export function ServicesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplaying, setIsAutoplaying] = useState(true);
    const [slideReady, setSlideReady] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const progressTween = useRef<gsap.core.Tween | null>(null);

    // Setup initial image layout
    useEffect(() => {
        gsap.set(slideRefs.current, { zIndex: 1, clipPath: "inset(0 0 0 100%)" });
        gsap.set(slideRefs.current[0], { zIndex: 2, clipPath: "inset(0 0 0 0%)" });
        const imgEl = slideRefs.current[0]?.querySelector('.slide-img');
        if (imgEl) {
            gsap.set(imgEl, { scale: 1 });
        }
    }, []);

    // Text Animate IN
    useEffect(() => {
        if (textRef.current && slideReady) {
            const words = textRef.current.querySelectorAll('.stagger-word');
            const desc = textRef.current.querySelector('.stagger-desc');

            gsap.set([words, desc], { y: 30, opacity: 0 });

            gsap.to([words, desc], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: "power3.out",
                delay: 0.1
            });
        }
    }, [currentIndex, slideReady]);

    const goToSlide = useCallback((newIndex: number, direction: 1 | -1 = 1) => {
        if (newIndex === currentIndex || isAnimating.current) return;
        isAnimating.current = true;
        setSlideReady(false);

        const currentSlide = slideRefs.current[currentIndex];
        const nextSlide = slideRefs.current[newIndex];

        const ctx = gsap.context(() => {
            // 1. Text Out & then update state
            if (textRef.current) {
                const words = textRef.current.querySelectorAll('.stagger-word');
                const desc = textRef.current.querySelector('.stagger-desc');
                gsap.to([desc, ...Array.from(words).reverse()], {
                    y: -20,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.02,
                    ease: "power2.in",
                    onComplete: () => {
                        setCurrentIndex(newIndex);
                    }
                });
            }

            // 2. Image Mask Transition (runs concurrently with text out/in)
            if (nextSlide && currentSlide) {
                gsap.set(nextSlide, { zIndex: 3 });
                gsap.set(currentSlide, { zIndex: 2 });

                const nextImg = nextSlide.querySelector('.slide-img');
                const currentImg = currentSlide.querySelector('.slide-img');

                // Reset next image start state
                gsap.set(nextSlide, {
                    clipPath: direction === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)"
                });
                gsap.set(nextImg, { scale: 1.15 });

                // Animate Next In
                gsap.to(nextSlide, {
                    clipPath: "inset(0 0 0 0%)",
                    duration: 1.4,
                    ease: "power4.inOut"
                });
                gsap.to(nextImg, {
                    scale: 1,
                    duration: 1.4,
                    ease: "power4.inOut"
                });

                // Animate Current Out (parallax)
                gsap.to(currentImg, {
                    scale: 1.05,
                    xPercent: direction === 1 ? -10 : 10,
                    duration: 1.4,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(currentSlide, { zIndex: 1 });
                        gsap.set(currentImg, { xPercent: 0 }); // reset
                        isAnimating.current = false;
                        setSlideReady(true);
                    }
                });
            } else {
                isAnimating.current = false;
                setSlideReady(true);
            }
        }, containerRef);
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        goToSlide((currentIndex + 1) % services.length, 1);
    }, [currentIndex, goToSlide]);

    const handlePrev = useCallback(() => {
        goToSlide((currentIndex - 1 + services.length) % services.length, -1);
    }, [currentIndex, goToSlide]);

    // Handle Autoplay Progression
    useEffect(() => {
        if (progressTween.current) progressTween.current.kill();
        gsap.set(progressRef.current, { scaleX: 0 });

        if (isAutoplaying && slideReady && !isAnimating.current) {
            progressTween.current = gsap.to(progressRef.current, {
                scaleX: 1,
                duration: AUTOPLAY_DELAY / 1000,
                ease: "none",
                onComplete: () => {
                    handleNext();
                }
            });
        }

        return () => {
            if (progressTween.current) progressTween.current.kill();
        };
    }, [slideReady, isAutoplaying, handleNext]);

    const toggleAutoplay = () => {
        setIsAutoplaying(!isAutoplaying);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[600px] md:h-[700px] bg-transparent grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            onMouseEnter={() => setIsAutoplaying(false)}
            onMouseLeave={() => setIsAutoplaying(true)}
        >
            {/* LEFT: Content & Controls */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center lg:justify-between py-6 lg:py-16 pr-0 lg:pr-8 z-20 order-2 lg:order-1 h-full max-h-[400px] lg:max-h-full">

                {/* Top: Index Indicator */}
                <div className="hidden lg:block font-mono text-sm tracking-widest text-[var(--color-clay)] font-bold">
                    {(currentIndex + 1).toString().padStart(2, '0')} / {services.length.toString().padStart(2, '0')}
                </div>

                {/* Middle: Typography */}
                <div className="flex flex-col gap-6" ref={textRef}>
                    <h3
                        className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white m-0 flex flex-wrap"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {services[currentIndex]?.title && services[currentIndex].title.split(" ").map((word, i, arr) => (
                            <span key={`${currentIndex}-${i}`} className="inline-flex items-center">
                                <span className="inline-block overflow-hidden pb-1 -mb-1">
                                    <span className="stagger-word inline-block translate-y-[110%] opacity-0 tracking-tight text-white">
                                        {word}
                                    </span>
                                </span>
                                {i !== arr.length - 1 && <span className="w-[0.25em]" />}
                            </span>
                        ))}
                    </h3>
                    <div className="overflow-hidden">
                        <p
                            className="stagger-desc text-lg md:text-xl text-white/70 max-w-md leading-relaxed translate-y-[30px] opacity-0"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {services[currentIndex].description}
                        </p>
                    </div>
                </div>

                {/* Bottom: Interactive Controls */}
                <div className="flex items-center gap-6 mt-8 lg:mt-0">
                    <button
                        onClick={toggleAutoplay}
                        className="text-white/50 hover:text-[var(--color-clay)] transition-colors w-6 flex items-center justify-center flex-shrink-0"
                        aria-label={isAutoplaying ? "Pause autoplay" : "Start autoplay"}
                    >
                        {isAutoplaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>

                    {/* Animated Progress Line */}
                    <div className="flex-1 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
                        <div ref={progressRef} className="absolute inset-0 bg-[var(--color-clay)] origin-left scale-x-0" />
                    </div>

                    {/* Next/Prev Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--color-clay)] transition-all duration-300 transform hover:scale-105"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--color-clay)] transition-all duration-300 transform hover:scale-105"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Mask Reveals Image Stage */}
            <div className="col-span-1 lg:col-span-7 relative w-full h-full min-h-[300px] lg:min-h-full rounded-[3rem] overflow-hidden order-1 lg:order-2 shadow-2xl border border-white/5">
                {services.map((service, idx) => (
                    <div
                        key={service.id}
                        ref={(el) => { slideRefs.current[idx] = el; }}
                        className="absolute inset-0 z-10 will-change-transform"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center slide-img will-change-transform"
                            style={{ backgroundImage: `url(${service.image})` }}
                        />
                        {/* Subtle Overlay to enhance cinematic feel */}
                        <div className="absolute inset-0 bg-[var(--color-charcoal)]/40 mix-blend-overlay" />
                    </div>
                ))}
            </div>
        </div>
    );
}
