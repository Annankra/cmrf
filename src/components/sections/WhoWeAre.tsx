"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAre() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for the image card
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    y: -15,
                    duration: 4,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }

            // Staggered reveal for text content
            if (contentRef.current) {
                const elements = contentRef.current.children;
                gsap.from(elements, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[60%] h-[100%] rounded-full bg-[var(--color-moss)]/5 blur-3xl pointer-events-none" />

            <div className="container-main px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

                    {/* Image / Logo Column */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
                        <div
                            ref={imageRef}
                            className="relative w-full max-w-lg aspect-square flex items-center justify-center p-8 bg-black/20 backdrop-blur-md rounded-[3rem] border border-white/5 shadow-2xl"
                        >
                            {/* Glowing accent behind the logo */}
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[var(--color-clay)]/20 !via-[var(--color-moss)]/10 to-transparent -z-10 blur-2xl opacity-60" />

                            <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96">
                                <Image
                                    src="/cmrflogo.png"
                                    alt="CMMRF Logo - Christian Medical Missions Resource Foundation"
                                    fill
                                    className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div ref={contentRef} className="order-1 lg:order-2 max-w-2xl">
                        <div className="mb-6">
                            <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-clay)] to-[var(--color-moss)] rounded-full mb-6" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Who We Are
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Mobilizing Human and Material Resources{" "}
                                <span className="font-drama text-[var(--color-clay)] italic block mt-2 pr-4">
                                    Worldwide.
                                </span>
                            </h2>
                        </div>

                        <div
                            className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <p className="font-medium text-white/90">
                                CMRF - CMMRF (Christian Medical Missions Resource Foundation) exists to show God’s Love through Words and Actions.
                            </p>

                            <p>
                                CMRF provides medical and other humanitarian services to needy, heavily underserved communities—typically organizing <strong className="text-[var(--color-clay)] font-semibold">10 medical outreaches a year</strong>.
                            </p>

                            <p>
                                CMRF is involved in diverse activities all aimed at helping to alleviate the poverty level in deprived communities. It operates one permanent medical clinic which was established in 1991.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-black/20 px-5 py-3 rounded-[1rem] border border-white/5 shadow-sm transform transition-transform duration-300 hover:-translate-y-1">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-clay)] animate-pulse-dot" />
                                <span className="text-xs tracking-widest uppercase font-semibold text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                                    Est. 1991
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/20 px-5 py-3 rounded-[1rem] border border-white/5 shadow-sm transform transition-transform duration-300 hover:-translate-y-1">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-moss)] animate-pulse-dot" style={{ animationDelay: "1s" }} />
                                <span className="text-xs tracking-widest uppercase font-semibold text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                                    10 Outreaches / Year
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
