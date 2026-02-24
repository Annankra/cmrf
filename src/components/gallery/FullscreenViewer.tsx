"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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

export function FullscreenViewer({
    images,
    initialIndex,
    albumTitle,
    onClose,
}: FullscreenViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPlaying, setIsPlaying] = useState(true);
    const [barsVisible, setBarsVisible] = useState(true);

    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const barsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAnimatingRef = useRef(false);

    const SLIDE_DURATION = 5000; // 5 seconds

    // ---------------------------------------------------------------
    // Transition helper
    // ---------------------------------------------------------------
    const animateTransition = useCallback(
        (direction: "left" | "right") => {
            if (!imageRef.current) return;
            const img = imageRef.current;

            const xOut = direction === "left" ? -60 : 60;
            const xIn = direction === "left" ? 60 : -60;

            isAnimatingRef.current = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimatingRef.current = false;
                },
            });

            // Fade out + slide old image
            tl.to(img, {
                opacity: 0,
                x: xOut,
                scale: 1.04,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    // Switch image source
                    const nextIndex =
                        direction === "left"
                            ? currentIndex
                            : currentIndex; // already set by caller
                    // This is handled by react re-render via setCurrentIndex
                },
            });

            // Snap to start position of new image
            tl.set(img, { x: xIn, scale: 0.96 });

            // Fade in new image
            tl.to(img, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
            });
        },
        [currentIndex]
    );

    // ---------------------------------------------------------------
    // Navigation
    // ---------------------------------------------------------------
    const goTo = useCallback(
        (index: number, direction: "left" | "right") => {
            if (isAnimatingRef.current) return;
            if (index < 0 || index >= images.length) return;

            // Reset progress bar
            if (progressRef.current) {
                gsap.killTweensOf(progressRef.current);
                gsap.set(progressRef.current, { scaleX: 0 });
            }

            // Start transition animation
            if (imageRef.current) {
                const img = imageRef.current;
                const xOut = direction === "left" ? -60 : 60;
                const xIn = direction === "left" ? 60 : -60;

                isAnimatingRef.current = true;

                gsap.to(img, {
                    opacity: 0,
                    x: xOut,
                    scale: 1.04,
                    duration: 0.35,
                    ease: "power3.in",
                    onComplete: () => {
                        setCurrentIndex(index);
                        gsap.set(img, { x: xIn, scale: 0.96 });
                        gsap.to(img, {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: "power3.out",
                            onComplete: () => {
                                isAnimatingRef.current = false;
                            },
                        });
                    },
                });
            } else {
                setCurrentIndex(index);
            }
        },
        [images.length]
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
    // Entrance animation
    // ---------------------------------------------------------------
    useEffect(() => {
        if (!overlayRef.current) return;

        document.body.style.overflow = "hidden";

        gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { scale: 0.92, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.15 }
            );
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // ---------------------------------------------------------------
    // Auto-hide bars
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

    // ---------------------------------------------------------------
    // Keyboard navigation
    // ---------------------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    handleClose();
                    break;
                case "ArrowRight":
                    goNext();
                    break;
                case "ArrowLeft":
                    goPrev();
                    break;
                case " ":
                    e.preventDefault();
                    setIsPlaying((p) => !p);
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    // ---------------------------------------------------------------
    // Touch / swipe support
    // ---------------------------------------------------------------
    const touchStartX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goNext();
            else goPrev();
        }
    };

    // ---------------------------------------------------------------
    // Close with exit animation
    // ---------------------------------------------------------------
    const handleClose = useCallback(() => {
        if (!overlayRef.current) {
            onClose();
            return;
        }
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: onClose,
        });
    }, [onClose]);

    const current = images[currentIndex];

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-[var(--color-charcoal)] flex flex-col select-none"
            onMouseMove={resetBarsTimeout}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ opacity: 0 }}
        >
            {/* ─── Progress Bar ─── */}
            <div className="absolute top-0 left-0 right-0 h-[3px] z-50 bg-white/10">
                <div
                    ref={progressRef}
                    className="h-full bg-[var(--color-clay)] origin-left"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* ─── Top Nav Bar ─── */}
            <div
                className={`absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-8 py-4 bg-gradient-to-b from-black/60 to-transparent transition-all duration-500 ${barsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <h3
                        className="text-[var(--color-cream)] text-sm font-semibold tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {albumTitle}
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <span
                        className="text-[var(--color-cream)]/50 text-xs tabular-nums"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {currentIndex + 1} / {images.length}
                    </span>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[var(--color-cream)] transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-label="Close viewer"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* ─── Main Image ─── */}
            <div className="flex-1 flex items-center justify-center px-4 md:px-20 py-16 relative">
                {/* Left Arrow */}
                <button
                    onClick={goPrev}
                    className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-white/15 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] transition-all duration-300 hover:scale-110 backdrop-blur-sm cursor-pointer ${barsVisible ? "opacity-100" : "opacity-0"
                        }`}
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={imageRef}
                    src={current.url}
                    alt={current.alt}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                    draggable={false}
                    style={{ willChange: "transform, opacity" }}
                />

                {/* Right Arrow */}
                <button
                    onClick={goNext}
                    className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-white/15 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] transition-all duration-300 hover:scale-110 backdrop-blur-sm cursor-pointer ${barsVisible ? "opacity-100" : "opacity-0"
                        }`}
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* ─── Bottom Nav Bar ─── */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-40 px-5 md:px-8 py-5 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ${barsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* Caption */}
                    <div className="flex-1 mr-4">
                        {current.caption && (
                            <p
                                className="text-[var(--color-cream)]/80 text-sm md:text-base line-clamp-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {current.caption}
                            </p>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Play / Pause */}
                        <button
                            onClick={() => setIsPlaying((p) => !p)}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[var(--color-cream)] transition-all duration-300 hover:scale-110 cursor-pointer"
                            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                    </div>
                </div>

                {/* Thumbnail strip */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const dir = i > currentIndex ? "left" : "right";
                                goTo(i, dir);
                            }}
                            className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${i === currentIndex
                                    ? "ring-2 ring-[var(--color-clay)] opacity-100 scale-105"
                                    : "opacity-40 hover:opacity-70"
                                }`}
                            aria-label={`Go to image ${i + 1}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
