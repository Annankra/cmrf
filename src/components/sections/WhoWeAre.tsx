"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HeartHandshake, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                    y: -12,
                    duration: 4.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }

            // Staggered reveal for text content
            if (contentRef.current) {
                const elements = contentRef.current.children;
                gsap.from(elements, {
                    y: 35,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.12,
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
        <section ref={sectionRef} className="section relative overflow-hidden bg-[var(--color-charcoal-light)]">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[60%] h-[100%] rounded-full bg-[var(--color-moss)]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-[15%] -mb-[10%] w-[50%] h-[80%] rounded-full bg-[var(--color-clay)]/5 blur-3xl pointer-events-none" />

            <div className="container-main px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

                    {/* Image / Logo Column */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
                        <div
                            ref={imageRef}
                            className="relative w-full max-w-lg aspect-square flex items-center justify-center p-8 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl group"
                        >
                            {/* Glowing accent behind the logo */}
                            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[var(--color-clay)]/20 via-[var(--color-moss)]/20 to-transparent -z-10 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96">
                                <Image
                                    src="/cmrflogo.png"
                                    alt="CMRF Logo - Christian Medical Missions Resource Foundation"
                                    fill
                                    className="object-contain filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-500"
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
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Who We Are
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Mobilizing Human and Material Resources{" "}
                                <span className="font-drama text-[var(--color-clay)] italic block mt-2 pr-4">
                                    Worldwide.
                                </span>
                            </h2>
                        </div>

                        <div
                            className="space-y-5 text-white/80 text-base md:text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <p className="font-semibold text-white">
                                CMRF (Christian Medical Missions Resource Foundation) exists to show God’s Love through word and positive acts of deed.
                            </p>

                            <p>
                                We provide free medical and humanitarian services to needy, heavily underserved communities—typically organizing <strong className="text-[var(--color-clay)] font-bold">10 medical outreaches every year</strong>.
                            </p>

                            <p>
                                Established in 1991, CMRF operates a permanent medical clinic and engages in community water projects, education support, and leadership development across Ghana and West Africa.
                            </p>
                        </div>

                        {/* Interactive Pill Badges */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-[1.25rem] border border-white/10 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                                <ShieldCheck size={18} className="text-[var(--color-clay)]" />
                                <span className="text-xs tracking-widest uppercase font-semibold text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                                    Est. 1991 · NGO Reg #G-1,540
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-[1.25rem] border border-white/10 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                                <Globe size={18} className="text-[var(--color-moss-light)]" />
                                <span className="text-xs tracking-widest uppercase font-semibold text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                                    10 Outreaches / Year
                                </span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link href="/about" className="btn btn-ghost">
                                <span className="btn-text">Read Our Story</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
