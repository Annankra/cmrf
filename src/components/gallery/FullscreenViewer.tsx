"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize } from "lucide-react";
import gsap from "gsap";

export interface GalleryImage {
    url: string;
    alt: string;
    caption?: string | null;
}

interface FullscreenViewerProps {
    images: GalleryImage[];
    initialIndex: number;
    albumTitle: string;
    onClose: () => void;
}

/**
 * MagneticButton component based on Creative Technologist guidelines
 */
function MagneticButton({
    children,
    onClick,
    className = "",
    ariaLabel = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    ariaLabel?: string;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btnRef.current, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.05,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group overflow-hidden ${className}`}
            aria-label={ariaLabel}
        >
            <span
                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            />
            <span className="relative z-10 flex items-center justify-center">
                {children}
            </span>
        </button>
    );
}

export function FullscreenViewer({
    images,
    initialIndex,
    albumTitle,
    onClose,
}: FullscreenViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPlaying, setIsPlaying] = useState(true);
    const [barsVisible, setBarsVisible] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const barsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAnimatingRef = useRef(false);
    const kenBurnsRef = useRef<gsap.core.Timeline | null>(null);

    const SLIDE_DURATION = 8000;

    // 1. Lifecycle: Body Scroll Lock
    useLayoutEffect(() => {
        setMounted(true);
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    // ---------------------------------------------------------------
    // Ken Burns Effect
    // ---------------------------------------------------------------
    const startKenBurns = useCallback(() => {
        if (!imageRef.current) return;

        if (kenBurnsRef.current) kenBurnsRef.current.kill();

        const zoomIn = Math.random() > 0.5;
        const startScale = zoomIn ? 1.05 : 1.25;
        const endScale = zoomIn ? 1.25 : 1.05;

        // Subtle pan targets
        const xDir = (Math.random() - 0.5) * 40;
        const yDir = (Math.random() - 0.5) * 40;

        kenBurnsRef.current = gsap.timeline({ repeat: -1, yoyo: true });
        kenBurnsRef.current.fromTo(
            imageRef.current,
            { scale: startScale, x: -xDir, y: -yDir },
            {
                scale: endScale,
                x: xDir,
                y: yDir,
                duration: SLIDE_DURATION / 1000 + 4,
                ease: "sine.inOut",
            }
        );
    }, []);

    // ---------------------------------------------------------------
    // Navigation
    // ---------------------------------------------------------------
    const goTo = useCallback(
        (index: number) => {
            if (isAnimatingRef.current) return;
            if (index < 0 || index >= images.length) return;

            if (progressRef.current) {
                gsap.killTweensOf(progressRef.current);
                gsap.set(progressRef.current, { scaleX: 0 });
            }

            if (imageRef.current) {
                const img = imageRef.current;
                isAnimatingRef.current = true;

                gsap.to(img, {
                    opacity: 0,
                    scale: 1.25,
                    filter: "blur(12px)",
                    duration: 0.7,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setCurrentIndex(index);
                        startKenBurns();

                        gsap.fromTo(
                            img,
                            { opacity: 0, scale: 0.95, filter: "blur(12px)" },
                            {
                                opacity: 1,
                                scale: 1.1,
                                filter: "blur(0px)",
                                duration: 1.1,
                                ease: "power2.out",
                                onComplete: () => {
                                    isAnimatingRef.current = false;
                                },
                            }
                        );
                    },
                });
            } else {
                setCurrentIndex(index);
            }
        },
        [images.length, startKenBurns]
    );

    const goNext = useCallback(() => goTo((currentIndex + 1) % images.length), [currentIndex, images.length, goTo]);
    const goPrev = useCallback(() => goTo((currentIndex - 1 + images.length) % images.length), [currentIndex, images.length, goTo]);

    // ---------------------------------------------------------------
    // Animations & Autoplay
    // ---------------------------------------------------------------
    useEffect(() => {
        if (!mounted || !overlayRef.current) return;

        const ctx = gsap.context(() => {
            // Entrance
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { filter: "blur(20px)", opacity: 0, scale: 1.4 },
                    {
                        filter: "blur(0px)",
                        opacity: 1,
                        scale: 1.15,
                        duration: 2,
                        ease: "power2.out",
                        delay: 0.1,
                        onStart: startKenBurns,
                    }
                );
            }
        }, overlayRef);

        return () => ctx.revert();
    }, [mounted, startKenBurns]);

    useEffect(() => {
        if (!isPlaying || !progressRef.current) return;

        gsap.set(progressRef.current, { scaleX: 0 });
        gsap.to(progressRef.current, {
            scaleX: 1,
            duration: SLIDE_DURATION / 1000,
            ease: "none",
        });

        autoPlayRef.current = setInterval(goNext, SLIDE_DURATION);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            if (progressRef.current) gsap.killTweensOf(progressRef.current);
        };
    }, [isPlaying, currentIndex, goNext]);

    // ---------------------------------------------------------------
    // UI Logic
    // ---------------------------------------------------------------
    const resetBarsTimeout = useCallback(() => {
        setBarsVisible(true);
        if (barsTimeoutRef.current) clearTimeout(barsTimeoutRef.current);
        barsTimeoutRef.current = setTimeout(() => setBarsVisible(false), 3000);
    }, []);

    useEffect(() => {
        resetBarsTimeout();
        return () => {
            if (barsTimeoutRef.current) clearTimeout(barsTimeoutRef.current);
        }
    }, [currentIndex, resetBarsTimeout]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape": handleClose(); break;
                case "ArrowRight": goNext(); break;
                case "ArrowLeft": goPrev(); break;
                case " ":
                    e.preventDefault();
                    setIsPlaying((p) => !p);
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    const handleClose = useCallback(() => {
        if (!overlayRef.current) {
            onClose();
            return;
        }
        gsap.to(overlayRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
                if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
                onClose();
            },
        });
    }, [onClose]);

    const toggleFullscreen = useCallback(async () => {
        if (!document.fullscreenElement) {
            if (overlayRef.current) await overlayRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const cb = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", cb);
        return () => document.removeEventListener("fullscreenchange", cb);
    }, []);

    if (!mounted) return null;

    const current = images[currentIndex];

    return createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100000] bg-[var(--color-charcoal)] overflow-hidden select-none touch-none"
            onMouseMove={resetBarsTimeout}
            style={{ opacity: 0 }} // Start invisible, animates in with GSAP
        >
            {/* ─── Layers ─── */}
            <div className="absolute inset-0 z-[12] bg-[radial-gradient(circle,transparent_20%,var(--color-charcoal)_130%)] pointer-events-none opacity-80" />

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={imageRef}
                    src={current.url}
                    alt={current.alt}
                    className="w-full h-full object-cover will-change-transform"
                />
            </div>

            {/* ─── UI: Header ─── */}
            <div className={`absolute top-0 left-0 right-0 z-50 p-6 pt-12 md:p-8 flex justify-between items-start transition-all duration-700 ${barsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
                <div className="flex flex-col gap-1 md:gap-2 max-w-[60%]">
                    <h3 className="text-[var(--color-cream)] text-[10px] md:text-lg font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase font-mono bg-black/40 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/10 truncate">
                        {albumTitle}
                    </h3>
                    <p className="text-[var(--color-clay)] text-[8px] md:text-xs uppercase tracking-[0.3em] ml-4 font-bold">
                        Archive {(currentIndex + 1).toString().padStart(3, '0')}
                    </p>
                </div>

                <div className="flex gap-2">
                    <MagneticButton onClick={toggleFullscreen} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-xl text-white/50 hover:text-white border border-white/10">
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </MagneticButton>
                    <MagneticButton onClick={handleClose} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-xl text-white/50 hover:text-red-400 border border-white/10">
                        <X size={18} />
                    </MagneticButton>
                </div>
            </div>

            {/* ─── UI: Navigation ─── */}
            <div className={`fixed left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ${barsVisible ? "opacity-100" : "opacity-0 translate-x-[-20px]"}`}>
                <MagneticButton onClick={goPrev} className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-xl text-cream/70 border border-white/10">
                    <ChevronLeft size={20} className="sm:w-7 sm:h-7" strokeWidth={1} />
                </MagneticButton>
            </div>
            <div className={`fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ${barsVisible ? "opacity-100" : "opacity-0 translate-x-[20px]"}`}>
                <MagneticButton onClick={goNext} className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-xl text-cream/70 border border-white/10">
                    <ChevronRight size={20} className="sm:w-7 sm:h-7" strokeWidth={1} />
                </MagneticButton>
            </div>

            {/* ─── UI: Footer ─── */}
            <div className={`absolute bottom-0 left-0 right-0 z-50 p-4 md:p-10 flex flex-col items-center gap-4 transition-all duration-1000 ${barsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                {current.caption && (
                    <p className="text-[var(--color-cream)] text-sm md:text-3xl font-drama italic text-center leading-relaxed drop-shadow-2xl max-w-4xl px-4">
                        "{current.caption}"
                    </p>
                )}

                <div className="bg-black/30 backdrop-blur-3xl border border-white/10 p-2 md:p-3 rounded-full flex items-center gap-4 md:gap-6 shadow-2xl">
                    <MagneticButton onClick={() => setIsPlaying((p) => !p)} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--color-clay)] text-white">
                        {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
                    </MagneticButton>
                    <div className="w-[1px] h-6 bg-white/20" />
                    <div className="flex items-center gap-3 px-2 md:px-4">
                        <span className="text-[var(--color-clay)] font-bold font-mono text-lg md:text-2xl">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                        <span className="text-white/20 font-mono text-[10px] md:text-sm">/ {images.length.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="flex gap-2 p-2 overflow-x-auto max-w-[90vw] scrollbar-hide">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => goTo(i)} className={`flex-shrink-0 w-16 h-8 md:w-24 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-500 ${i === currentIndex ? "border-[var(--color-clay)] scale-110" : "border-transparent opacity-40 hover:opacity-100"}`}>
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 left-0 right-0 h-[2px] z-[60] bg-[var(--color-clay)]/10">
                <div ref={progressRef} className="h-full bg-[var(--color-clay)] origin-left" style={{ transform: "scaleX(0)" }} />
            </div>
        </div>,
        document.body
    );
}
