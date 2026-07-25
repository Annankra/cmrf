"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Globe, HandHeart, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
    {
        name: "Pray",
        icon: Heart,
        description: "Join our global prayer network and stay connected with our mission field.",
        features: [
            "Monthly prayer guide & requests",
            "Mission outreach status reports",
            "Newsletter subscription",
            "Community prayer fellowships",
        ],
        cta: "Join Prayer Network",
        href: "/get-involved#pray",
        highlighted: false,
    },
    {
        name: "Give",
        icon: Globe,
        description: "Fund medical missions and sponsor communities in critical need of care.",
        features: [
            "Sponsor a full medical outreach",
            "Fund community boreholes & water",
            "Supply medical equipment to clinics",
            "Support the permanent CMRF Clinic",
            "Tax-deductible via CMMRF-USA 501(c)3",
        ],
        cta: "Donate Now",
        href: "/donate",
        highlighted: true,
    },
    {
        name: "Go",
        icon: HandHeart,
        description: "Volunteer your skills and deploy with us on our next outreach mission.",
        features: [
            "Medical & surgical professionals",
            "Non-medical logistics & support",
            "Short-term mission deployment",
            "Mentorship & training",
        ],
        cta: "Volunteer With Us",
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
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section bg-[var(--color-charcoal)] py-28 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-clay)_0%,_transparent_75%)] opacity-5 pointer-events-none" />

            <div className="container-main px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-20 max-w-2xl mx-auto">
                    <div className="section-divider" />
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {tiers.map((tier, i) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className={`rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:scale-[1.03] group relative overflow-hidden flex flex-col justify-between ${tier.highlighted
                                        ? "bg-gradient-to-b from-white/10 to-white/5 border-2 border-[var(--color-clay)] shadow-2xl shadow-[var(--color-clay)]/20 scale-[1.02]"
                                        : "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20"
                                    }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute top-0 right-0 bg-[var(--color-clay)] text-white text-[10px] uppercase tracking-widest font-mono font-bold px-4 py-1.5 rounded-bl-2xl">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${tier.highlighted
                                                ? "bg-[var(--color-clay)] text-white"
                                                : "bg-white/10 text-[var(--color-clay)] border border-white/10"
                                            }`}
                                    >
                                        <Icon size={26} />
                                    </div>

                                    <h3
                                        className="text-3xl font-bold mb-3 text-white"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {tier.name}
                                    </h3>

                                    <p className="text-white/70 text-sm mb-8 leading-relaxed">
                                        {tier.description}
                                    </p>

                                    <ul className="space-y-3.5 mb-10">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-white/85"
                                            >
                                                <CheckCircle2 size={16} className="text-[var(--color-clay)] flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={tier.href}
                                    className={`w-full btn ${tier.highlighted ? "btn-primary" : "btn-ghost"
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
