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
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.08,
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
        <section ref={sectionRef} className="relative overflow-hidden section border-t border-white/5 py-32">
            {/* Parallax Background Texture */}
            <div
                data-parallax-bg
                className="absolute inset-0 opacity-10 bg-cover bg-center scale-110"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=60&auto=format')`,
                }}
            />

            <div className="relative z-10 container-main px-6 md:px-12 py-20 md:py-32">
                {/* Neutral statement */}
                <div className="max-w-4xl mb-8">
                    <p
                        className="text-[var(--color-cream)]/40 text-lg md:text-xl leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {"Most organizations measure impact in spreadsheets and annual reports."
                            .split(" ")
                            .map((word, i) => (
                                <span key={i} data-word className="inline-block mr-[0.3em]">
                                    {word}
                                </span>
                            ))}
                    </p>
                </div>

                {/* Bold manifesto */}
                <div className="max-w-5xl">
                    <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                        {"We measure it in"
                            .split(" ")
                            .map((word, i) => (
                                <span
                                    key={i}
                                    data-word
                                    className="inline-block mr-[0.3em] font-drama text-[var(--color-cream)] italic"
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
                <div className="max-w-2xl mt-12">
                    <p
                        data-word
                        className="text-[var(--color-cream)]/30 text-sm md:text-base leading-relaxed uppercase tracking-widest font-semibold"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        700+ communities · 6 countries · 30+ years of service
                    </p>
                </div>
            </div>
        </section>
    );
}
