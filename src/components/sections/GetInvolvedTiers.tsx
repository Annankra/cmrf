"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Globe, HandHeart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
    {
        name: "Pray",
        icon: Heart,
        description: "Join our prayer network and stay connected with our mission.",
        features: [
            "Monthly prayer guide",
            "Mission field updates",
            "Newsletter subscription",
            "Community prayer meetings",
        ],
        cta: "Join the Network",
        href: "/get-involved#pray",
        highlighted: false,
    },
    {
        name: "Give",
        icon: Globe,
        description: "Fund missions and sponsor communities in need of care.",
        features: [
            "Sponsor a medical outreach",
            "Fund community boreholes",
            "Supply medical equipment",
            "Support the CMRF Clinic",
            "Tax-deductible via CMMRF-USA 501(c)3",
        ],
        cta: "Donate Now",
        href: "/get-involved",
        highlighted: true,
    },
    {
        name: "Go",
        icon: HandHeart,
        description: "Volunteer your skills and join the next mission deployment.",
        features: [
            "Medical professionals welcome",
            "Non-medical roles available",
            "Short-term mission trips",
            "Training & development",
        ],
        cta: "Volunteer",
        href: "/get-involved#volunteer",
        highlighted: false,
    },
];

export function GetInvolvedTiers() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            if (headerRef.current) {
                gsap.from(headerRef.current, {
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 88%",
                        once: true,
                    },
                });
            }

            // Staggered card entrance
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                });

                // Icon rotation on reveal
                const icon = card.querySelector("[data-tier-icon]");
                if (icon) {
                    gsap.from(icon, {
                        rotation: -90,
                        scale: 0,
                        opacity: 0,
                        duration: 0.6,
                        delay: 0.3 + i * 0.15,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            once: true,
                        },
                    });
                }

                // Feature list items stagger
                const features = card.querySelectorAll("[data-feature]");
                if (features.length > 0) {
                    gsap.from(features, {
                        x: -20,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        stagger: 0.08,
                        delay: 0.5 + i * 0.15,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            once: true,
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section bg-transparent py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background texture for the section */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-charcoal-light)_0%,_transparent_50%)] opacity-30 pointer-events-none" />

            <div className="container-main px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <div className="section-divider bg-white/10" />
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-bold"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get Involved
                    </p>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Three ways to{" "}
                        <span className="font-drama text-[var(--color-clay)] italic pr-2">
                            make a difference.
                        </span>
                    </h2>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className={`rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:scale-[1.03] group relative overflow-hidden ${tier.highlighted
                                        ? "bg-gradient-to-br from-[var(--color-moss)] to-[var(--color-charcoal)] border border-[var(--color-clay)]/30 shadow-[0_20px_50px_rgba(204,88,51,0.15)]"
                                        : "bg-[var(--color-charcoal-light)]/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 hover:bg-[var(--color-charcoal-light)]/60"
                                    }`}
                            >
                                {/* Magnetic glow on hover */}
                                <div className="absolute -inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-clay)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div
                                    data-tier-icon
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${tier.highlighted
                                        ? "bg-[var(--color-clay)]"
                                        : "bg-white/5 border border-white/10"
                                        }`}
                                >
                                    <Icon
                                        size={26}
                                        className={
                                            tier.highlighted
                                                ? "text-white"
                                                : "text-[var(--color-clay)]"
                                        }
                                    />
                                </div>

                                <h3
                                    className="text-3xl font-bold mb-4 text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {tier.name}
                                </h3>

                                <p
                                    className={`text-base mb-8 min-h-[50px] ${tier.highlighted
                                        ? "text-[var(--color-cream)]/90"
                                        : "text-white/60"
                                        }`}
                                >
                                    {tier.description}
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {tier.features.map((feature) => (
                                        <li
                                            key={feature}
                                            data-feature
                                            className={`flex items-start gap-3 text-sm ${tier.highlighted
                                                ? "text-[var(--color-cream)]"
                                                : "text-white/80"
                                                }`}
                                        >
                                            <span
                                                className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor] ${tier.highlighted
                                                    ? "bg-[var(--color-clay)] text-[var(--color-clay)]"
                                                    : "bg-[var(--color-moss)] text-[var(--color-moss)]"
                                                    }`}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={tier.href}
                                    className={`block w-full text-center py-4 px-6 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${tier.highlighted
                                        ? "bg-[var(--color-clay)] text-[var(--color-charcoal)] hover:bg-white hover:text-[var(--color-charcoal)] shadow-lg"
                                        : "bg-white/10 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                                        }`}
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    <span className="relative z-10">{tier.cta}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
