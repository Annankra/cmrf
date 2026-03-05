"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const barsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAnimatingRef = useRef(false);
    const kenBurnsRef = useRef<gsap.core.Timeline | null>(null);

    const SLIDE_DURATION = 8000; // 8s for cinematic experience

    // ---------------------------------------------------------------
    // Ken Burns Effect
    // ---------------------------------------------------------------
    const startKenBurns = useCallback(() => {
        if (!imageRef.current) return;

        if (kenBurnsRef.current) kenBurnsRef.current.kill();

        const zoomIn = Math.random() > 0.5;
        const startScale = zoomIn ? 1.05 : 1.25;
        const endScale = zoomIn ? 1.25 : 1.05;

        const xDir = (Math.random() - 0.5) * 50;
        const yDir = (Math.random() - 0.5) * 50;

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
        (index: number, direction: "left" | "right") => {
            if (isAnimatingRef.current) return;
            if (index < 0 || index >= images.length) return;

            if (progressRef.current) {
                gsap.killTweensOf(progressRef.current);
                gsap.set(progressRef.current, { scaleX: 0 });
            }

            if (imageRef.current) {
                const img = imageRef.current;
                isAnimatingRef.current = true;

                // Cinematic Weighted Cross-fade
                gsap.to(img, {
                    opacity: 0,
                    scale: 1.3,
                    filter: "blur(10px)",
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        setCurrentIndex(index);
                        startKenBurns();

                        gsap.fromTo(
                            img,
                            { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                            {
                                opacity: 1,
                                scale: 1.1,
                                filter: "blur(0px)",
                                duration: 1.2,
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

    const goNext = useCallback(() => {
        const next = (currentIndex + 1) % images.length;
        goTo(next, "left");
    }, [currentIndex, images.length, goTo]);

    const goPrev = useCallback(() => {
        const prev = (currentIndex - 1 + images.length) % images.length;
        goTo(prev, "right");
    }, [currentIndex, images.length, goTo]);

    // ---------------------------------------------------------------
    // Auto-play progress bar
    // ---------------------------------------------------------------
    useEffect(() => {
        if (!isPlaying || !progressRef.current) return;

        gsap.set(progressRef.current, { scaleX: 0 });
        gsap.to(progressRef.current, {
            scaleX: 1,
            duration: SLIDE_DURATION / 1000,
            ease: "none",
        });

        autoPlayRef.current = setInterval(() => {
            goNext();
        }, SLIDE_DURATION);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            if (progressRef.current) gsap.killTweensOf(progressRef.current);
        };
    }, [isPlaying, currentIndex, goNext]);

    // ---------------------------------------------------------------
    // Initial Entrance
    // ---------------------------------------------------------------
    useEffect(() => {
        if (!overlayRef.current) return;

        gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { filter: "blur(20px)", opacity: 0, scale: 1.4 },
                {
                    filter: "blur(0px)",
                    opacity: 1,
                    scale: 1.15,
                    duration: 2.5,
                    ease: "power2.out",
                    delay: 0.2,
                    onStart: startKenBurns,
                }
            );
        }

        return () => {
            if (kenBurnsRef.current) kenBurnsRef.current.kill();
        };
    }, [startKenBurns]);

    // ---------------------------------------------------------------
    // UI Helpers
    // ---------------------------------------------------------------
    const resetBarsTimeout = useCallback(() => {
        setBarsVisible(true);
        if (barsTimeoutRef.current) clearTimeout(barsTimeoutRef.current);
        barsTimeoutRef.current = setTimeout(() => {
            setBarsVisible(false);
        }, 3000);
    }, []);

    useEffect(() => {
        resetBarsTimeout();
        return () => {
            if (barsTimeoutRef.current) clearTimeout(barsTimeoutRef.current);
        };
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

    const touchStartX = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goNext();
            else goPrev();
        }
    };

    const handleClose = useCallback(() => {
        if (!overlayRef.current) {
            onClose();
            return;
        }
        gsap.to(overlayRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power3.in",
            onComplete: () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => { });
                }
                onClose();
            },
        });
    }, [onClose]);

    const toggleFullscreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement) {
                if (overlayRef.current) await overlayRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) { console.error(err); }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const current = images[currentIndex];

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[99999] bg-[var(--color-charcoal)] overflow-hidden select-none"
            onMouseMove={resetBarsTimeout}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ opacity: 0 }}
        >
            {/* ─── Cinematic Texture Layers ─── */}
            <div className="absolute inset-0 z-[12] bg-[radial-gradient(circle,transparent_20%,var(--color-charcoal)_130%)] pointer-events-none opacity-80" />

            {/* ─── Main Image (True Fullscreen) ─── */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={imageRef}
                    src={current.url}
                    alt={current.alt}
                    className="w-full h-full object-cover will-change-transform"
                    draggable={false}
                />
            </div>

            {/* ─── Progress Indicator ─── */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] z-[50] transition-opacity duration-700 ${barsVisible ? "opacity-100" : "opacity-0"}`}>
                <div
                    ref={progressRef}
                    className="h-full bg-[var(--color-clay)] origin-left shadow-[0_0_10px_var(--color-clay)]"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* ─── Navigation: Top Header ─── */}
            <div
                className={`absolute top-0 left-0 right-0 z-40 p-8 flex justify-between items-start transition-all duration-1000 ease-out ${barsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                    }`}
            >
                <div className="flex flex-col gap-2">
                    <h3 className="text-[var(--color-cream)] text-sm md:text-lg font-bold tracking-[0.3em] uppercase font-mono bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                        {albumTitle}
                    </h3>
                    <p className="text-[var(--color-clay)] text-[10px] md:text-xs uppercase tracking-[0.4em] ml-6 font-bold">
                        Archive No. 00{currentIndex + 1}
                    </p>
                </div>

                <div className="flex gap-4">
                    <MagneticButton
                        onClick={toggleFullscreen}
                        className="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl text-white/50 hover:text-white"
                        ariaLabel="Toggle Fullscreen"
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </MagneticButton>

                    <MagneticButton
                        onClick={handleClose}
                        className="w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl text-white/50 hover:text-red-400"
                        ariaLabel="Close Viewer"
                    >
                        <X size={20} />
                    </MagneticButton>
                </div>
            </div>

            {/* ─── Side Navigation ─── */}
            <div
                className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${barsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                    }`}
            >
                <MagneticButton
                    onClick={goPrev}
                    className="w-16 h-16 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-[var(--color-cream)]/70 hover:text-[var(--color-cream)]"
                >
                    <ChevronLeft size={32} strokeWidth={1} />
                </MagneticButton>
            </div>

            <div
                className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${barsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                    }`}
            >
                <MagneticButton
                    onClick={goNext}
                    className="w-16 h-16 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-[var(--color-cream)]/70 hover:text-[var(--color-cream)]"
                >
                    <ChevronRight size={32} strokeWidth={1} />
                </MagneticButton>
            </div>

            {/* ─── Bottom Console ─── */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-40 p-10 flex flex-col items-center gap-8 transition-all duration-1000 ease-out ${barsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
            >
                {/* Caption Mask */}
                {current.caption && (
                    <div className="overflow-hidden">
                        <p className="text-[var(--color-cream)] text-lg md:text-3xl font-drama italic text-center leading-relaxed drop-shadow-2xl max-w-4xl px-6">
                            "{current.caption}"
                        </p>
                    </div>
                )}

                {/* Main Control Dock */}
                <div className="bg-black/30 backdrop-blur-3xl border border-white/10 p-3 rounded-full flex items-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                    <MagneticButton
                        onClick={() => setIsPlaying((p) => !p)}
                        className="w-14 h-14 rounded-full bg-[var(--color-clay)] text-white shadow-lg"
                    >
                        {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                    </MagneticButton>

                    <div className="w-[1px] h-8 bg-white/20" />

                    <div className="flex gap-4 pr-6 pl-2 items-center">
                        <span className="text-[var(--color-cream)]/40 font-mono text-xs tracking-widest uppercase">
                            Index
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[var(--color-clay)] font-bold text-2xl font-mono tabular-nums">
                                {(currentIndex + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="text-white/20 font-mono text-sm">
                                / {images.length.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Thumb Strip */}
                <div className="flex gap-3 px-4 py-2 overflow-x-auto max-w-[90vw] scrollbar-hide snap-x">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const dir = i > currentIndex ? "left" : "right";
                                goTo(i, dir);
                            }}
                            className={`flex-shrink-0 w-20 h-10 md:w-28 md:h-14 rounded-lg overflow-hidden transition-all duration-700 snap-center border-2 ${i === currentIndex
                                ? "border-[var(--color-clay)] scale-110 shadow-2xl"
                                : "border-transparent opacity-30 grayscale hover:grayscale-0 hover:opacity-100"
                                }`}
                        >
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
