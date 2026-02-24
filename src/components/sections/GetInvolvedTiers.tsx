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
        <section ref={sectionRef} className="section bg-[var(--color-cream)]">
            <div className="container-main px-6 md:px-12">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <div className="section-divider" />
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get Involved
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-bold text-[var(--color-charcoal)] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Three ways to{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            make a difference.
                        </span>
                    </h2>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {tiers.map((tier, i) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className={`rounded-[2rem] p-8 transition-all duration-500 hover:translate-y-[-6px] ${tier.highlighted
                                    ? "bg-[var(--color-moss)] text-[var(--color-cream)] ring-2 ring-[var(--color-clay)] scale-[1.02] shadow-2xl"
                                    : "card"
                                    }`}
                            >
                                <div
                                    data-tier-icon
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${tier.highlighted
                                        ? "bg-[var(--color-clay)]"
                                        : "bg-[var(--color-moss)]/10"
                                        }`}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            tier.highlighted
                                                ? "text-white"
                                                : "text-[var(--color-moss)]"
                                        }
                                    />
                                </div>

                                <h3
                                    className="text-2xl font-bold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {tier.name}
                                </h3>

                                <p
                                    className={`text-sm mb-6 ${tier.highlighted
                                        ? "text-[var(--color-cream)]/70"
                                        : "text-[var(--color-muted)]"
                                        }`}
                                >
                                    {tier.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li
                                            key={feature}
                                            data-feature
                                            className={`flex items-start gap-2 text-sm ${tier.highlighted
                                                ? "text-[var(--color-cream)]/80"
                                                : "text-[var(--color-charcoal)]/70"
                                                }`}
                                        >
                                            <span
                                                className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${tier.highlighted
                                                    ? "bg-[var(--color-clay)]"
                                                    : "bg-[var(--color-moss)]/40"
                                                    }`}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={tier.href}
                                    className={`btn w-full text-center ${tier.highlighted ? "btn-primary" : "btn-secondary"
                                        }`}
                                >
                                    <span className="btn-text">{tier.cta}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
