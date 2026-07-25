"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word-by-word reveal for the manifesto text
            const words = sectionRef.current?.querySelectorAll("[data-word]");
            if (words) {
                gsap.from(words, {
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "center center",
                    },
                });
            }

            // Parallax on background texture
            const bg = sectionRef.current?.querySelector("[data-parallax-bg]");
            if (bg) {
                gsap.to(bg, {
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden section border-t border-b border-white/5 py-32 bg-[var(--color-charcoal)]">
            {/* Parallax Background Texture */}
            <div
                data-parallax-bg
                className="absolute inset-0 opacity-15 bg-cover bg-center scale-110"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=60&auto=format')`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-[var(--color-charcoal)] pointer-events-none" />

            <div className="relative z-10 container-main px-6 md:px-12 py-20 md:py-32">
                {/* Tag */}
                <div className="mb-8">
                    <span
                        data-word
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] font-semibold"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Our Manifesto
                    </span>
                </div>

                {/* Neutral statement */}
                <div className="max-w-4xl mb-10">
                    <p
                        className="text-[var(--color-cream)]/50 text-xl md:text-2xl leading-relaxed font-light"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {"Most healthcare initiatives measure success in spreadsheets and metrics."
                            .split(" ")
                            .map((word, i) => (
                                <span key={i} data-word className="inline-block mr-[0.3em]">
                                    {word}
                                </span>
                            ))}
                    </p>
                </div>

                {/* Bold manifesto contrast statement */}
                <div className="max-w-5xl">
                    <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
                        {"We measure it in"
                            .split(" ")
                            .map((word, i) => (
                                <span
                                    key={i}
                                    data-word
                                    className="inline-block mr-[0.3em] font-bold text-white tracking-tight"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {word}
                                </span>
                            ))}
                        <span
                            data-word
                            className="inline-block mr-[0.3em] font-drama text-[var(--color-clay)] italic"
                        >
                            lives
                        </span>
                        <span
                            data-word
                            className="inline-block font-drama text-[var(--color-clay)] italic"
                        >
                            healed.
                        </span>
                    </p>
                </div>

                {/* Supporting line */}
                <div className="max-w-2xl mt-12 pt-8 border-t border-white/10">
                    <p
                        data-word
                        className="text-[var(--color-cream)]/50 text-xs md:text-sm leading-relaxed uppercase tracking-widest font-semibold"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        600+ communities · 30+ years · Free Medical Missions
                    </p>
                </div>
            </div>
        </section>
    );
}
